/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, message, Popover, Space, Table, Tag, Modal, Tabs, Row, Col, Menu, Dropdown, Select, Switch, Checkbox } from 'antd';
import { connect } from 'umi';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { getFilterDate, getFormattedDate } from '@/utils/utils';
import moment from 'moment';
import { isArray, lowerCase } from 'lodash';
import StoreViewer from '@/components/StoreViewer/StoreViewer';
import { Parser } from 'json2csv';
import Cookies from 'js-cookie';
import styles from './bills.less';
import SidebarDrawer from '../components/SidebarDrawer';

const saveAs = require('file-saver');

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { confirm } = Modal;

const BillsTable = (props) => {
  const [bill, setbill] = useState({
    selectedBill: {},
  })
  const [state, setstate] = useState({
    page: 1,
    size: 10,
    filters: {
      keyword: '',
      bill_creation_method: '',
      meal_type: '',
      search_in: 'full_name',
      date: {
        gte: moment().days(-15).format('MM/DD/YYYY'),
        lte: moment().format('MM/DD/YYYY'),
      },
    },
    sort: {
      field: '',
      order: '',
    },
  });
  const [metrix, setmetrix] = useState({
    popup: false,
    popStartDate: '',
    popEndDate: '',
    popStoreID: '',
    popMetrics: 'Bills Export',
  });
  const [key, setKey] = useState({
    tab: '0',
  });
  const { dispatch, billsModel, loading, user, exportLoading, storeModel } = props;
  const { stores = [] } = storeModel;
  const { currentUser } = user;
  const { user_type, user_client_id } = currentUser;
  const { bills = [], meta = [], aggrClientBill } = billsModel;
  const { total_count } = meta || 0;
  console.log("sum_of_grand_total", aggrClientBill);
  // const { sum_of_grand_total||0, total_sales_count||0 } = aggrClientBill

  // console.log(billsModel.meta.total_count, "total_count")
  // console.log(total_count, "count")

  // const { total } = meta[0] || 0;
  // console.log("total",meta[0].total_count)
  const [store, setStore] = useState('All Store');
  const [cookieStore, setCookieStore] = useState(Cookies.get('pageStoreID'));
  // console.log("loading",exportLoading)

  // useEffect(() => {
  //   dispatch({
  //     type: 'billsModel/getBills',
  //     payload: state,
  //   });
  // }, [state, cookieStore]);
  //v2 api integration
  // useEffect(() => {

  // }, [state, cookieStore]);

  // useEffect(() => {

  // }, [state, cookieStore]);

  useEffect(() => {
    dispatch({
      type: 'billsModel/getBillsv2',
      payload: state,
    });
    dispatch({
      type: 'billsModel/getBillsPagesCount',
      payload: state,
    });
    dispatch({
      type: 'billsModel/getMin_Max_Amount_v2',
      payload: state,
    });
    dispatch({
      type: 'billsModel/getAggClientBills_v2',
      payload: state,
    });
  }, [state, cookieStore]);
  // useEffect(() => {

  // }, [state, cookieStore]);


  // reset pageStore to 'all'
  useEffect(() => {
    return () => {
      Cookies.set('pageStoreID', 'all');
    }
  }, []);
  const searchKeyword = (e) => {
    e.persist();
    setstate(prevState => ({
      ...prevState,
      filters: {
        search_in: prevState.filters.search_in,
        keyword: e.target.value,
      }
    }));
  }

  const searchDate = (e) => {
    if (e) {
      setstate(prevState => ({
        ...prevState,
        filters: {
          date: {
            gte: moment(e[0]).format('MM/DD/YYYY'),
            lte: moment(e[1]).format('MM/DD/YYYY'),
          },
        }
      }));
    }
  }

  const resetTable = () => {
    setstate({
      page: 1,
      size: 10,
      filters: {
        keyword: null,
        bill_creation_method: null,
        meal_type: null,
        date: {
          gte: moment().format('MM/DD/YYYY'),
          lte: moment().format('MM/DD/YYYY'),
        },
      },
      sort: {
        field: null,
        order: null,
      },
    })
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={() => setmetrix({ popup: true })}>
        Bill Metrics
      </Menu.Item>
      <Menu.Item onClick={resetTable}>
        Reset
      </Menu.Item>
    </Menu>
  );

  const toggle = ["Bills Export", "Bills Metrics"];
  const searchCol = ['Name', 'Mobile', 'Bill'];

  const checkdata = ['Date', 'Bills', 'Order', 'Name', 'Contac1t', 'Date1', 'Bills1', 'Order1', 'Name1', 'Contact2', 'Date2', 'Bills2', 'Order2', 'Name2', 'Contact3', 'Date3', 'Bills3', 'Order3', 'Name3', 'Contact4', 'Date4', 'Bills4', 'Order4', 'Name4', 'Contact5'];

  const n = 3
  const result = [[], [], []]

  const wordsPerLine = Math.ceil(checkdata.length / 3)

  for (let line = 0; line < n; line++) {
    for (let i = 0; i < wordsPerLine; i++) {
      const value = checkdata[i + line * wordsPerLine]
      if (!value) continue
      result[line].push(value)
    }
  }

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }


  const tableChangeHandler = (pagination, filters, sorter) => {
    setstate(prevState => ({
      ...prevState,
      size: pagination.pageSize,
      page: pagination.current,
      filters: {
        bill_creation_method: filters.bill_creation_method !== null && filters ? filters.bill_creation_method[0] : '',
        meal_type: currentUser === 8 && filters.meal_type !== null && filters ? filters.meal_type[0] : '',
      },
      // category: filters.category !== null && filters ? filters.category[0] : '',
      sort: {
        // eslint-disable-next-line no-nested-ternary
        field: sorter.field === undefined ? '' : sorter.order === undefined ? '' : sorter.field,
        // eslint-disable-next-line no-nested-ternary
        order: sorter.order === undefined ? '' : sorter.order === 'ascend' ? 'asc' : 'desc',
      },
    }));
  }

  const { company_name } = billsModel;
  const fiveAsecStatus = [{ text: 'B2B - CHECK', value: 'B2B - CHECK' }, { text: 'CASH', value: 'CASH' }, { text: 'CREDIT CARD', value: 'CREDIT CARD' }, { text: 'GIFT VOUCHER', value: 'GIFT VOUCHER' }, { text: 'PAYTM', value: 'PAYTM' }, { text: 'QUICK WALLET', value: 'QUICK WALLET' }, { text: 'RAZORPAY - BILLEASY', value: 'RAZORPAY - BILLEASY' }, { text: 'BALANCE CLEARED', value: 'BALANCE CLEARED' }, { text: 'AMEX CARD', value: 'AMEX CARD' }];
  const otherStatus = [{ text: 'Order Created', value: 'issued' }, { text: 'Paid', value: 'paid' }];

  const operatorColumn = [{
    title: 'Operator',
    dataIndex: 'operator_name',
    key: 'operator_name',
    align: 'center',
    // fixed: 'right',
  }, {
    title: 'Meal Type',
    dataIndex: 'meal_type',
    key: 'meal_type',
    sorter: true,
    // fixed: 'right',
    align: 'center',
    filterMultiple: false,
    filters: [
      {
        text: 'Customer meal',
        value: 'Customer meal',
      },
      {
        text: 'Employee meal',
        value: 'Employee meal',
      },
      {
        text: 'Manager meal',
        value: 'Manager meal',
      },
      {
        text: 'NA',
        value: '-',
      },
    ],
  }];
  const columns = [
    // {
    //   title: <div><i className="fas fa-bell" /></div>,
    //   sorter: false,
    //   width: '4%',
    //   // hideMGR: user_type == 'manager',
    //   hideCMS: user_type == 'cms',
    //   render: (record) => {
    //     let notify = '';
    //     const content = (
    //       <div>
    //         <p>
    //           {record.sms_status}
    //           {' '}
    //           {' '}
    //             at
    //             {' '}
    //           {' '}
    //           {moment(record.sms_delivery_time).locale('en').format('DD-MMM-YYYY hh:mm:ss A')}
    //             .
    //           </p>
    //       </div>
    //     );
    //     if (lowerCase(record.sms_status) === 'failed') {
    //       notify = (
    //         <Popover content={content} style={{ backgroundColor: 'red' }}>
    //           <i
    //             className="far fa-comment-alt-lines"
    //             style={{
    //               opacity: record.message_notification ? '1' : '0.2',
    //               color: 'red',
    //             }}
    //           />
    //         </Popover>
    //       );
    //     } else if (record.sms_status !== '') {
    //       notify = (
    //         <Popover content={content}>
    //           <i
    //             className="far fa-comment-alt-lines"
    //             style={{
    //               opacity: record.message_notification ? '1' : '0.2',
    //             }}
    //           />
    //         </Popover>
    //       );
    //     } else {
    //       notify = (
    //         <i
    //           className="far fa-comment-alt-lines"
    //           style={{
    //             opacity: record.message_notification ? '1' : '0.2',
    //           }}
    //         />
    //       );
    //     }
    //     let renderStyle = (
    //       <span
    //       // className={styles.deliveryIconWrapper}
    //       >
    //         {notify}
    //         {currentUser.is_email_notification_enabled && (
    //           <i
    //             className="far fa-envelope"
    //             style={{
    //               width: '1.05em',
    //               height: '1.3em',
    //               opacity: record.email_notification ? '1' : '0.2',
    //             }}
    //           />
    //         )}
    //       </span>
    //     );
    //     if (record.id === 'yesterday' || record.id === 'today') {
    //       renderStyle = '';
    //     }
    //     return renderStyle;
    //   },

    // },
    {
      title: 'Date',
      sorter: true,
      // width: '150px',
      render: (record) => {
        let dateDesign = (
          <span
          // className={styles.billRowText}
          >
            {getFormattedDate(record.created_at)}
          </span>
        );
        if (record.id === 'yesterday' || record.id === 'today') {
          dateDesign = (
            <span
            // className={`${styles.billRowText} ${styles.dateHilghlight}`}
            >
              {getFilterDate(record.attributes.created_at)}
            </span>
          );
        }
        return dateDesign;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      key: 'name',
      // sortOrder: state.columnKey === 'name' && state.sort.order,
      hideMGR: user_type == 'manager',
      hideCMS: user_type == 'cms',
      // filters: this.filterWithField(data)(i => i.attributes.name),
      render: (name) => {
        let renderStyle = (
          <span
          // className={`${styles.billRowText} ${styles.billRowTitledText}`}
          >
            {`${name}`}

          </span>
        );
        if (name === ' ' || name === '') {
          renderStyle = (
            <span
            // className={`${styles.billRowText} ${styles.billRowTitledText}`}
            >
              Unknown Customer
            </span>
          );
        }
        return renderStyle;
      },
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      sorter: true,
      hideMGR: user_type == 'manager',
      hideCMS: user_type == 'cms',
      align: 'center',
      render: (contact) => {
        let renderStyle = (
          <span
          // className={styles.billRowText}
          >{`${contact}`}</span>
        );
        if (contact === '') {
          renderStyle = '';
        }
        return renderStyle;
      },

    },
    {
      title: 'Bill Number',
      sorter: false,
      align: 'center',
      render: (record) => {
        const { bill_number } = record; // eslint-disable-line
        let renderStyle = (
          <span
          // className={styles.billRowText}
          >
            {`${bill_number || record.id
              }`}
          </span> // eslint-disable-line
        );
        if (record.id === 'yesterday' || record.id === 'today') {
          renderStyle = '';
        }
        return renderStyle;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'grand_total',
      sorter: true,
      hideCMS: user_type == 'cms',
      align: 'center',
      render: (grandTotal) => {
        let renderStyle = (
          <span
          // className={styles.billRowGrandTotal}
          >
            <i style={{ paddingRight: 5 }} className="far fa-rupee-sign" />
            {grandTotal}
          </span>
        );
        if (grandTotal === '') {
          renderStyle = '';
        }
        return renderStyle;
      },
    },
    {
      title: 'Bill Delivery',
      dataIndex: 'bill_creation_method',
      key: 'bill_creation_method',
      sorter: true,
      filterMultiple: false,
      align: 'center',
      filters: [
        {
          text: 'Sent',
          value: 'Send',
        },
        {
          text: 'Print & Sent',
          value: 'PrintAndSend',
        },
        {
          text: 'Skip',
          value: 'Skip',
        },
        {
          text: 'Delivered',
          value: 'DELIVERED',
        },
        {
          text: 'NA',
          value: 'NA',
        },
      ],
      // render: (bill_creation_method) => {
      //   if (bill_creation_method === "Send") {
      //     let renderStyle = (
      //       <Tag>
      //         color = "#24aa67"
      //       </Tag>
      //     )
      //   }
      //   return renderStyle
      // }
      render: (bill_creation_method) => {
        // const { bill_creation_method } = record.attributes; // eslint-disable-line

        let renderStyle = (
          <Tag
            color="#a5a5a7"
            style={{
              fontWeight: 'bold', textAlign: 'center', background: "#dedee0",
              border: "1px solid #a5a5a7",
              borderRadius: "2px", color: "#a5a5a7"
            }}
          >
            NA
          </Tag >
        );
        // if sent
        if (bill_creation_method) {
          // eslint-disable-line
          if (bill_creation_method == 'Send') {
            // eslint-disable-line
            renderStyle = (
              <Tag
                color="#52C41A"
                style={{
                  color: "#52C41A", fontWeight: 'normal', textAlign: 'center', padding: "1px 15px", background: "#F6FFED",
                  border: "1px solid #B7EB8F",
                  borderRadius: "2px"
                }}
              >
                Sent
              </Tag>
            );
          }
          // if sent and print then yellow
          if (bill_creation_method == 'PrintAndSend') {
            // eslint-disable-line
            renderStyle = (
              <Tag
                color="#fcd307"
                style={{
                  fontWeight: 'bold', textAlign: 'center', textTransform: 'none', padding: "1px 15px", background: "#FFFFE0",
                  border: "1px solid #fcd307",
                  borderRadius: "2px", color: "#fcd307"
                }}
              >
                Print &amp; Sent
                {' '}
              </Tag>
            );
          }
          if (bill_creation_method == 'Skip') {
            // eslint-disable-line
            renderStyle = (
              <Tag
                color="#F5222D"
                style={{
                  fontWeight: 'bold', textAlign: 'center', textTransform: 'none', padding: "1px 15px", background: "#FFF1F0",
                  border: "1px solid #FFA39E",
                  borderRadius: "2px", color: "#F5222D"
                }}
              >
                Skipped
              </Tag>
            );
          }
          if (bill_creation_method == 'DELIVERED') {
            // eslint-disable-line
            renderStyle = (
              <Tag
                color="#1890FF"
                style={{
                  fontWeight: 'bold', textAlign: 'center', textTransform: 'none', padding: "1px 15px", background: "#E6F7FF",
                  border: "1px solid #91D5FF",
                  borderRadius: "2px", color: "#1890FF"
                }}
              >
                Delivered
              </Tag>
            );
          }
        }
        return renderStyle;
      },
    },
    {
      title: 'Source',
      key: 'source', // update the key here
      dataIndex: 'source',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Payment Status',
      key: 'payment_status', // update the key here
      sorter: true,
      filterMultiple: false,
      hideMGR: user_type == 'manager',
      hideCMS: user_type == 'cms',
      filters: company_name === '5asec' ? fiveAsecStatus : otherStatus,
      render: (record) => {
        const { payment_status } = record; // eslint-disable-line
        let renderStyle = (
          <Tag color="#7285A8" className={styles.otherpaymentstatus}>
            NA
          </Tag>
        );
        if (payment_status) {
          // eslint-disable-line
          const {
            razorpay_invoice_id,
            razorpay_order_id,
          } = record; // eslint-disable-line
          const { mode_of_payment } = record || '';
          if (payment_status !== 'paid') {
            if (razorpay_invoice_id && razorpay_order_id) {
              renderStyle = (
                <Tag color="#7285A8" className={styles.otherpaymentstatus}>
                  Order Created
                </Tag>
              );
            }
            // if (razorpay_payment_id) { // eslint-disable-line
            //   renderStyle = (
            //     <Tag color="#f2ce59" style={{fontWeight: 'bold', textTransform: 'none' }}>
            //       Paid Online
            //     </Tag>
            //   );
            // }
          }
          if (payment_status === 'issued') {
            if (mode_of_payment === 'NA' || mode_of_payment === 'CASH') {
              renderStyle = (
                <Tag color="#7285A8" className={styles.otherpaymentstatus}>
                  Order Created
                </Tag>
              );
            }
          }
          if (payment_status === 'paid') {
            // eslint-disable-line
            if (company_name === '5asec') { // validate 5asec case!
              if (mode_of_payment === 'BALANCE CLEARED') {
                renderStyle = (
                  <Tag color="#24aa67" className={styles.paymentstatus}>
                    BALANCE CLEARED
                  </Tag>
                );
              } else {
                renderStyle = (
                  <Tag color="#24aa67" className={styles.paymentstatus}>
                    {mode_of_payment === 'NA' ? 'Paid' : `Paid by ${mode_of_payment}`}
                  </Tag>
                );
              }
            } else {
              renderStyle = (
                <Tag color="#24aa67" className={styles.paymentstatus}>
                  Paid
                </Tag>
              );
            }
          }
          if (payment_status === 'partially paid') {
            // eslint-disable-line
            renderStyle = (
              <Tag color="#24aa67" className={styles.paymentstatus}>
                Partially paid
              </Tag>
            );
          }
        }
        return renderStyle;
      },
    },
  ];

  const mgrColumn = columns.filter((col) => {
    if (col.hideMGR !== true) {
      return col;
    }
  });
  const cmsColumn = columns.filter((col) => {
    if (col.hideCMS !== true) {
      return col;
    }
  });
  const rmColPaymentMCD = columns.filter((col) => {
    if (col.key !== 'payment_status') {
      return col;
    }
  });

  const mcdlogin = user_type === 'manager' ? [...mgrColumn, ...operatorColumn] : user_type === 'cms' ? [...cmsColumn, ...operatorColumn] : [...rmColPaymentMCD, ...operatorColumn];

  // const suffix = state.filters.keyword ? <i className="fal fa-times-circle" onClick={() => setstate({
  //   ...state,
  //   filters: {
  //     keyword: '',
  //   },
  // })} /> : <span />;
  const { filters = {} } = state;
  const { keyword = '' } = filters;

  const exportBill = () => {
    confirm({
      title: 'Export bills',
      content: 'click ok to export this csv file or cancel',
      onOk() {
        dispatch({
          type: 'billsModel/exportBillCSV',
          payload: state,
        }).then((res) => {
          if (res.success === false) {
            console.error(res.msg);
            message.error('Unable to Exports bills!');
            return false;
          }
          if (res.success && res.data.bills.length < 1) {
            message.error('No records found!');
            return false;
          }
          const fieldsHeader = Object.keys(res.data.bills[0]);
          const json2csvParser = new Parser({ fieldsHeader });
          const _bills = res.data.bills.map((b) => {
            b.created_at = moment(b.created_at).locale('en').format('DD-MM-YYYY hh:mm:ss A');
            b.sms_delivery_time = b.sms_delivery_time.toLowerCase() === 'not delivered' ? b.sms_delivery_time : moment(b.sms_delivery_time).locale('en').format('DD-MM-YYYY hh:mm:ss A');
            return b;
          });
          const csv = json2csvParser.parse(_bills);
          const blob = new Blob(['\ufeff', csv]);
          saveAs.saveAs(blob, 'export-bills.csv');
        }).catch((err) => {
          console.log('error while exporting bills contact');
        });
        const ClientIDCHeck = [335, 317, 344];
        // if (ClientIDCHeck.includes(parseInt(currentUser.id, 10))) {
        //   dispatch({
        //     type: 'billsModel/getPurchaseOrder',
        //     payload: state,
        //   }).then((res) => {
        //     if (res.success === false) {
        //       console.error(res.msg);
        //       message.error('Unable to Exports bills!');
        //       return false;
        //     }
        //     const fieldsHeader = Object.keys(res.data[0]);
        //     const json2csvParser = new Parser({ fieldsHeader });
        //     const _bills = res.data.map((b) => {
        //       b.created_at = moment(b.created_at).locale('en').format('DD-MM-YYYY hh:mm:ss A');
        //       return b;
        //     });
        //     const csv = json2csvParser.parse(_bills);
        //     const blob = new Blob(['\ufeff', csv]);
        //     saveAs.saveAs(blob, 'po-export.csv');
        //   }).catch((err) => {
        //     console.log('error while exporting bills contact');
        //   });
        // }
      },
      onCancel() {
      },
    });
  }

  const popStoreChange = (id) => {
    setmetrix(prevState => ({
      ...prevState,
      popStoreID: id,
    }));
  }

  const popMetricsChange = (id) => {
    console.log('popMetricsChange', id)
    setmetrix(prevState => ({
      ...prevState,
      popMetrics: id,
    }));
  }

  const Storeselect = stores.filter(item => metrix.popStoreID == item.id)[0] || 'All store';

  const popStart = (selectedDate) => {
    setmetrix(prevState => ({
      ...prevState,
      popStartDate: moment(selectedDate).format('YYYY-MM-DD'),
    }));
    console.log('selectedDate', selectedDate);
  }

  const popEnd = (selectedDate2) => {
    setmetrix(prevState => ({
      ...prevState,
      popEndDate: moment(selectedDate2).format('YYYY-MM-DD'),
    }));
    console.log('selectedDate', selectedDate2);
  }

  const disabledDateForExp = (current) => {
    return current && current < moment('01-31-2021').endOf('day');
  }

  const handleCancel = () => {
    setmetrix(prevState => ({
      ...prevState,
      popup: false,
      popStartDate: '',
      popEndDate: '',
      popStoreID: '',
    }));
  };

  const exportBillmatrix = () => {
    const { popStartDate, popEndDate, popStoreID } = metrix;
    if (popStartDate === undefined || popStartDate === '') {
      message.info('Select start date');
      return false;
    }
    if (popEndDate === undefined || popEndDate === '') {
      message.info('Select end date');
      return false;
    }
    dispatch({
      type: 'billsModel/BillsMetrix',
      payload: {
        start_date: popStartDate,
        end_date: popEndDate,
        user_client_id: user.currentUser.user_client_id,
        type: 'skip_analytics',
        store_id: popStoreID === 'all' ? undefined : popStoreID,
      },
    }).then((res) => {
      if (res.success === true) {
        message.success('Bill Metrics request has been sent.');
        setTimeout(() => {
          handleCancel();
        }, 500);
      } else {
        message.error('Unable to send request.');
      }
    });
  }

  const callback = (e) => {
    setKey({
      tab: e,
    });
  };

  const onStoreChange = (id) => {
    // console.log('selected store id', id);
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

  const searchBy = (selected) => {
    // console.log('selected', selected);
    setstate(prevState => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        search_in: selected,
      }
    }));
  }



  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    // this.setState({ selectedRowKeys });
  };
  const rowSelection = {
    // selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div className={styles.billsPage}>
      {/* <PageContainer fixedHeader title={false} > */}
      <Row gutter={[12]} >
        <Col md={24}>
          <StoreViewer data={stores || []} onChange={onStoreChange} selected={store} />
        </Col>
        {/* <Col md={24} >
          <div className={styles.headerControl}>
            <h4 className={styles.title}>Bills</h4>
            <Space>
              <RangePicker
                allowClear={false}
                onChange={searchDate}
                className={styles.billSearch}
              />
              <Input.Group compact>
                <Select defaultValue="Name" >
                  <Select.Option value="Name">Name</Select.Option>
                  <Select.Option value="Mobile">Mobile</Select.Option>
                </Select>
                <Input style={{ width: '200px' }} placeholder="Quick Search" onPressEnter={searchKeyword} onChange={searchKeyword} className={styles.inputSearch} />
              </Input.Group>
              <Button loading={exportLoading} type="primary" shape="round"
                //onClick={() => setcsv(true)}
                onClick={exportBill}
                className={styles.exportCSV}>
                <i className="fas fa-arrow-to-bottom" />
                 &nbsp;
                 Export
               </Button>
              <Dropdown arrow overlay={menu} placement="bottomCenter" trigger={['click']} getPopupContainer={trigger => trigger.parentNode}>
                <Button style={{ borderRadius: '50px' }}>
                  <i className="far fa-ellipsis-v" />
                </Button>
              </Dropdown>
            </Space>
          </div>
        </Col> */}
      </Row>
      <Tabs
        onChange={callback}
        activeKey={key.tab}
        type="card"
        destroyInactiveTabPane
      // defaultActiveKey={1}
      >
        <TabPane tab="Bill Details" key="0">
          <div className={styles.BillControlsWrapper}>
            <Space>
              <RangePicker
                allowClear={false}
                onChange={searchDate}
                className={styles.billSearch}
              />
              {/* <Input
                placeholder="Quick Search"
                value={keyword}
                className={styles.billSearch}
                prefix={<SearchOutlined />}
                onPressEnter={searchKeyword}
                onChange={searchKeyword}
                suffix={suffix}
              /> */}
              <Input.Group compact>
                <Select defaultValue="full_name" onChange={searchBy}>
                  <Select.Option value="full_name">Name</Select.Option>
                  <Select.Option value="mobile_number">Mobile</Select.Option>
                  <Select.Option value="invoice_number">Invoice No</Select.Option>
                </Select>
                <Input
                  style={{ width: '200px' }}
                  placeholder="Quick Search"
                  onPressEnter={searchKeyword}
                  // onChange={searchKeyword}
                  className={styles.inputSearch}
                />
              </Input.Group>
              <Button loading={exportLoading} type="primary" shape="round"
                onClick={exportBill}
                className={styles.exportCSV}>
                <i className="fas fa-arrow-to-bottom" />
                 &nbsp;
                 Export
               </Button>
              {/* <Button type="default" shape="round" onClick={resetTable} className={styles.billSearch}>
                Reset
               </Button> */}
              <Dropdown arrow overlay={menu} placement="bottomCenter" trigger={['click']} getPopupContainer={trigger => trigger.parentNode}>
                <Button style={{ borderRadius: '50px' }}>
                  <i className="far fa-ellipsis-v" />
                </Button>
              </Dropdown>
            </Space>
          </div>
          <Table
            rowSelection={rowSelection}
            loading={loading}
            className={styles.billsTable}
            size="middle"
            dataSource={bills}
            columns={(currentUser.id == 8 || currentUser.id == 285) ? mcdlogin : columns}
            rowKey={record => record.id}
            onRow={(record) => {
              return {
                onClick: () => {
                  setbill({
                    selectedBill: record,
                  });
                },
              };
            }}
            pagination={{
              position: ["bottomCenter"],
              size: "small",
              total: total_count
            }}
            scroll={{ x: 1500, y: 570 }}
            // expandable={{
            //   expandedRowRender: (record) => <ExpanedTable data={record} />,
            //   // rowExpandable: record => record.name !== 'Not Expandable',
            // }}
            onChange={tableChangeHandler}
          />
          {/* <div className={styles.avgCount} >
            <div>Average: {parseInt(sum_of_grand_total / total_sales_count).toFixed(2)}</div>
            <div>Count:{total_sales_count}</div>
            <div>Sum:{sum_of_grand_total}</div>
          </div> */}
        </TabPane>
        <TabPane tab="History Reports" key="1" >
          <p>Analytics</p>
        </TabPane>
      </Tabs>
      <Modal
        visible={metrix.popup}
        closable={false}
        className={styles.exportmodal}
        footer={[
          <Button key="back" onClick={handleCancel} className={styles.cancelbtn}>
            Cancel
              </Button>,
          <Button key="submit" type="primary" onClick={exportBillmatrix} className={styles.submitbtn}>
            Email Export
              </Button>,
        ]}
      >
        <Row>
          <Col span={16} style={{ padding: '30px 40px' }}>
            <h3 className={styles.import}>Export CSV</h3>
            <div style={{ display: 'flex', marginBottom: '30px' }}>
              <div style={{ flexGrow: '1' }}>
                <p className={styles.header1}>Date Range</p>
                <p className={styles.header3}>From</p>
                <DatePicker
                  onChange={popStart}
                  disabledDate={disabledDateForExp}
                />
                <p className={styles.header3} style={{ margin: '25px 0 13px' }}>To</p>
                <DatePicker
                  onChange={popEnd}
                  disabledDate={disabledDateForExp}
                />
              </div>
              <div style={{ flexGrow: '1', marginLeft: '70px' }}>
                <p className={styles.header1}>Stores information</p>
                <p className={styles.header3}>Choose Store  </p>
                <Select
                  showSearch
                  style={{ width: 230 }}
                  placeholder="Select store"
                  optionFilterProp="children"
                  onChange={popStoreChange}
                  value={metrix.popStoreID || 'All Store'}
                >
                  {stores.length > 1 && (
                    <Select.Option value="all">
                      All Stores
                    </Select.Option>
                  )}
                  {stores.map(str => (<Select.Option value={str.id} key={str.id} >{str.name}</Select.Option>))}
                </Select>

                {/* <Select
                  style={{ marginTop: '57px' }}
                  placeholder={toggle[0]}
                  optionFilterProp="children"
                  onChange={popMetricsChange}
                  value={metrix.popMetrics}
                >
                  {toggle.map(str => (<Select.Option defaultValue={toggle[0]} value={str} key={str} >{str}</Select.Option>))}
                </Select> */}
              </div>
            </div>
            {/* {metrix.popMetrics !== 'Bills Metrics' &&
              <div>
                <h4>DATA COLUMNS</h4>
                <p className={styles.header3}>Choose the data column to be exported</p>
                <div className={styles.datacols}>
                  <Checkbox.Group onChange={onChange} >
                    {result.map((item) => (
                      <div>
                        {item.map((m) => (
                          <Checkbox value={m} key={m} >{m}</Checkbox>
                        ))}
                      </div>

                    ))}
                  </Checkbox.Group>
                </div>
              </div>} */}
          </Col>
          <Col
            span={8}
            style={{ background: '#1C283A', padding: '20px', borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}
          >
            <h4 className={styles.summary}>Summary</h4>
            <h4 className={styles.header2}>Date Range </h4>
            <p>{metrix.popStartDate} -  {metrix.popEndDate}</p>
            <h4 className={styles.header2}>Stores selected</h4>
            <p>{!Storeselect || Storeselect.name || 'All Store'}</p>
            <div>
              {/* <h4 className={styles.header2}>Export Time</h4>
              <p>Columns 6</p> */}
            </div>
          </Col>
        </Row>
      </Modal>
      {
        bills.length > 0 && (
          <SidebarDrawer
            data={bill}
          />
        )
      }
    </div>
  );
};

export default connect(({ global, settings, billsModel, loading, user, storeModel }) => ({
  collapsed: global.collapsed,
  settings,
  billsModel,
  user,
  storeModel,
  loading: loading.effects['billsModel/getBillsv2'],
  exportLoading: loading.effects['billsModel/exportBillCSV'],
}))(BillsTable);
