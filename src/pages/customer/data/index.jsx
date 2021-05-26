import { SearchOutlined } from '@ant-design/icons';
import { Button, Tabs, Input, Modal, Space, Table, Tag, Row, Col, DatePicker, Select, Divider } from 'antd';
import { connect } from 'umi';
import React, { useState, useRef, useEffect } from 'react';
import { getMenuData, PageContainer } from '@ant-design/pro-layout';
import { commonFormattedDate } from '@/utils/utils';
import moment from 'moment';
import StoreViewer from '@/components/StoreViewer/StoreViewer';
import { isArray } from 'lodash';
import Cookies from 'js-cookie';
import ExpanedTable from './components/expanedTable';
import UploadCustomer from './components/UploadCustomer';
import styles from './customerData.less';
import styles2 from './components/UploadCustomer.less';
import DownloadCsv from './components/DownloadCsv';

// import DualAxesChart from '@/components/Charts/DualAxes/Index';
// import LineChart from '@/components/Charts/Line';
import SideDrawer from './components/SideDrawer';
import { value } from 'numeral';

const { TabPane } = Tabs;

const TableList = (props) => {
  const [visible, setVisible] = useState(false);
  const [opendrawer, setOpendrawer] = useState(false);
  const [csv, setcsv] = useState(false);
  const [upload, setupload] = useState(false);
  const [store, setStore] = useState('All Store');
  const [cookieStore, setCookieStore] = useState(Cookies.get('pageStoreID'));
  const [state, setstate] = useState({
    page: 1,
    size: 10,
    keyword: '',
    sort: {
      field: '',
      order: '',
    },
    category: '',
    search_in: 'name',
    searchedColumn: '',
  });
  const [key, setKey] = useState({
    tab: '0',
    selectedCol: 'Name',
  });
  const { dispatch, customerModel, loading, storeModel } = props;
  const { stores = [] } = storeModel;
  const { customers, meta = {} } = customerModel;
  const { total_count } = meta || 0;
  // useEffect(() => {
  //   if (dispatch) {
  //     dispatch({
  //       type: 'customerModel/getCustomerList',
  //       payload: {
  //         size: 10,
  //         page: 1,
  //       },
  //     });
  //   }
  // }, []);

// customer page api integration old api
  // useEffect(() => {
  //   // console.log('current state', state);
  //   dispatch({
  //     type: 'customerModel/getCustomerList',
  //     payload: state,
  //   });
  // }, [state, cookieStore]);


// customer page api integration new api
  useEffect(() => {
    console.log(state)
    // console.log('current state', state);
    dispatch({
      type: 'customerModel/getCustomerListV2',
      payload:state ,
    });
  }, [state, cookieStore]);

  useEffect(() => {
    // console.log('current state', state);
    dispatch({
      type: 'customerModel/getCustomerCount',
    });
  }, [state, cookieStore]);


  // reset pageStore to 'all'
  useEffect(() => {
    return () => {
      Cookies.set('pageStoreID', 'all');
    }
  }, []);

  const searchKeyword = (e) => {
    console.log(searchCol)
    console.log(e.target.value)
    setstate(prevState => ({
      ...prevState,
      keyword: e.target.value,
    }));
  }
  const handleSelect = (e) => {
    const selectedValue = e === "Mobile" ? "mobile_number" : e === "Name" ? "name" : "email";
    console.log(selectedValue)
    setstate(prevState => ({
      ...prevState,
      search_in:selectedValue
    }));
  }

  const tableChangeHandler = (pagination, filters, sorter, extra) => {
    // console.log('pagination, ', pagination);
    // console.log('filters,', filters);
    // console.log('sorter', sorter);
    setstate(prevState => ({
      ...prevState,
      size: pagination.pageSize,
      page: pagination.current,
      category: filters.category !== null && filters ? filters.category[0] : '',
      sort: {
        // eslint-disable-next-line no-nested-ternary
        field: sorter.field === undefined ? '' : sorter.order === undefined ? '' : sorter.field,
        // eslint-disable-next-line no-nested-ternary
        order: sorter.order === undefined ? '' : sorter.order === 'ascend' ? 'asc' : 'desc',
      },
    }));
  }

  const uploadCustomer = () => {
    setVisible(true);
  };

  const downloadscv = () => {
    setcsv(true);
  }

  const handleOk = () => {
    setVisible(false);
    setupload(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const mapping = () => {
    setupload(false);
  };

  const onStoreChange = (id) => {
    Cookies.set('pageStoreID', id);
    setTimeout(() => {
      setCookieStore(id);
      if (isArray(stores) && id !== 'all') {
        const selectedStore = stores.filter(item => item.id === id)[0];
        setStore(selectedStore.name);
      } else {
        setStore(id);
      }
    }, 100);
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={node => {
          //   searchInput = node;
          // }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setstate({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    // onFilterDropdownVisibleChange: visible => {
    //   if (visible) {
    //     setTimeout(() => searchInput.select(), 100);
    //   }
    // },
    render: text =>
      state.searchedColumn === dataIndex ? (
        // <Highlighter
        //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //   searchWords={[state.searchText]}
        //   autoEscape
        //   textToHighlight={text ? text.toString() : ''}
        // />
        text
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setstate({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setstate({ searchText: '' });
  };

  const callback = (e) => {
    setKey({
      tab: e,
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      // sortDirections: ['asc', 'desc'],
      // render: (x) => {
      //   if (x === '') {
      //     return (<i>Unknown Customer</i>);
      //   } return (<span>{x}</span>);
      // },
      // ...getColumnSearchProps('name'),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_no',
      sorter: true,
      hideInForm: true,
      // renderText: (val) => `${val}`,
      // ...getColumnSearchProps('phone_no'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
      hideInForm: true,
      render: (x) => {
        if (x === '') {
          return (<i>Email not found</i>);
        } return (<span>{x}</span>);
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: true,
      filters: [
        {
          text: 'Gold',
          value: 'gold',
        },
        {
          text: 'Executive',
          value: 'executive',
        },
        {
          text: 'Locked',
          value: 'locked',
        },
      ],
      filterMultiple: false,

      render: (x) => {
        if (x === 'gold') {
          return (
            <Tag className={styles.myTag} style={{ background: '#f4ae3a' }}>
              {x}
            </Tag>
          );
        } if (x === 'executive') {
          return (
            <Tag className={styles.myTag} style={{ background: '#9163ff' }}>
              {x}
            </Tag>
          );
        }
        return (
          <Tag className={styles.myTag} style={{ background: '#fc5656' }}>
            {x}
          </Tag>
        );
      },
    },
    {
      title: 'No of Bills',
      dataIndex: 'number_off_bills',
      sorter: true,
      hideInForm: true,
      // renderText: (val) => `${val}`,
    },
    {
      title: 'LTV',
      dataIndex: 'ltv',
      sorter: true,
      align: 'right',
      render: (x) => (
        <b>
          <i className="far fa-inr" />
          {' '}
          {x}
        </b>
      ),
    },
    {
      title: 'Last Bill Amount',
      dataIndex: 'last_bill_amount',
      sorter: true,
      align: 'right',
      render: (x) => (
        <b>
          <i className="far fa-inr" />
          {' '}
          {x}
        </b>
      ),
    },
    {
      title: 'Last Bill Date',
      dataIndex: 'last_bill_date',
      sorter: true,
      render: (x) => (
        <span>
          {/* {moment(x).locale('en').fromNow()} */}
          {/* {commonFormattedDate(x)} */}
        </span>
      ),
    },
  ];

  const searchCol = ['Name', 'Mobile', 'Email'];

  return (
    <div className={styles.CustomerPage}>
      <Row gutter={[12]} >
        <Col md={24}>
          <StoreViewer data={stores || []} onChange={onStoreChange} selected={store} />
        </Col>
      </Row>
      <Tabs
        onChange={callback}
        activeKey={key.tab}
        type="card"
        destroyInactiveTabPane
      // defaultActiveKey={1}
      // onSelect={(value) => setKey({ selectedCol: value })}
      >
        <TabPane tab="Customer" key="0">
          <div className={styles.CustomerControlsWrapper}>
            <Space>
              <Input.Group compact>
                <Select defaultValue="Name" onSelect={handleSelect} style={{ width: 90 }} >
                  {searchCol.map(str => (<Select.Option defaultValue={searchCol[0]} value={str} key={str} >{str}</Select.Option>))}
                </Select>
                <Input style={{ width: '200px', color:"black" }} placeholder={key.selectedCol} onPressEnter={searchKeyword} className={styles.inputSearch} />
              </Input.Group>
              <Button type="primary" shape="round" className={styles.upload} onClick={uploadCustomer}>
                <i className="fas fa-arrow-to-top" />
                 &nbsp;
                Upload Customer
               </Button>
              <Button type="primary" shape="round" className={styles.download} onClick={downloadscv}>
                <i className="fas fa-arrow-to-bottom" />
                 &nbsp;
                Export CSV
               </Button>
            </Space>
          </div>
          <Table
            className={styles.Customertable}
            loading={loading}
            size="small"
            dataSource={customers}
            columns={columns}
            rowKey="customer_id"
            // rowSelection={() => { console.log('selected'); }}
            pagination={{
              position: ["bottomCenter"],
              size: "small",
              total:total_count
            }}
            expandable={{
              expandedRowRender: (record) =>{
                console.log("Record:",record.ltv)
              return(
                record.ltv?<ExpanedTable data={record} />:<div style={{textAlign:"center"}}>no data found</div>
              )
              }
                
              // rowExpandable: record => record.name !== 'Not Expandable',
            }}
            onChange={tableChangeHandler}
            // rowSelection={{
            //   ...rowSelection,
            // }}
            scroll={{ x: 1500, y: 570 }}
          />
        </TabPane>
        <TabPane tab="Analytics" key="1" disabled>
          {/* <DualAxesChart /> */}
          <Button onClick={() => setOpendrawer(true)}>Add Charts</Button>
          <SideDrawer visible={opendrawer} />
          <Row gutter={24}>
            <Col md={10} lg={10}>
              <div className={styles.LineChart}>
                <h4>CUSTOMER SPEND DISTRIBUTION</h4>    
                {/* <LineChart /> */}
              </div>
            </Col>
            <Col md={14} lg={14}>
              <div className={styles.LineChart}>
                <h4>LIFETIME VALUE COMPARISON</h4>
                {/* <DualAxesChart /> */}
              </div>
            </Col>
          </Row>

        </TabPane>
      </Tabs>
      <Modal
        visible={visible}
        closable={false}
        className={styles2.custModal}
        footer={[
          <Button key="back" onClick={handleCancel} className={styles2.cancelbtn}>
            Cancel
              </Button>,
          <Button key="submit" type="primary" onClick={handleOk} className={styles2.submitbtn}>
            Next
              </Button>,
        ]}
      >
        <Row>
          <Col span={18} style={{ padding: '30px' }}>
            <h3 className={styles2.import}>Import Customers</h3>
            <div style={{ display: 'flex', flex: '50%' }}>
              <div style={{ flexGrow: '1' }}>
                <p className={styles2.header1}>Choose file</p>
                <Button className={styles2.selectfile}>Select File</Button>
              </div>
              <div style={{ flexGrow: '1' }}>
                <p className={styles2.header1}>File Details</p>
                <p>Customer-Dec.csv</p>
                <p>128kb</p>
              </div>
            </div>
          </Col>
          <Col span={6} style={{ background: '#1C283A', padding: '20px', borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }} >
            <h4 className={styles2.summary}>Summary</h4>
            <h4 className={styles2.header2}>Columns </h4>
            <p>5</p>
            <h4 className={styles2.header2}>Record Count</h4>
            <p>1233554</p>
            <h4 className={styles2.header2}>IMPORT TIME</h4>
            <p>2.5 Seconds</p>
          </Col>
        </Row>
      </Modal>
      <Modal
        visible={upload}
        closable={false}
        className={styles2.mappingModal}
        footer={[
          <Button key="back" className={styles2.cancelbtn} onClick={mapping}>
            Cancel
              </Button>,
          <Button key="submit" type="primary" className={styles2.submitbtn} onClick={mapping}>
            Submit
              </Button>,
        ]}
      >
        <UploadCustomer />
      </Modal>
      <Modal
        visible={csv}
        closable={false}
        className={styles2.custModal}
        footer={[
          <Button key="back" onClick={() => setcsv(false)} className={styles2.cancelbtn}>
            Cancel
              </Button>,
          <Button key="submit" type="primary" onClick={() => setcsv(false)} className={styles2.submitbtn}>
            Email Export
          </Button>,
        ]}
      >
        <DownloadCsv />
      </Modal>
    </div>
  );
};

export default connect(({ global, settings, customerModel, storeModel, loading }) => ({
  collapsed: global.collapsed,
  settings,
  customerModel,
  storeModel,
  // loading: loading.effects['customerModel/getCustomerList'],
  loading: loading.effects['customerModel/getCustomerListV2']
}))(TableList);
