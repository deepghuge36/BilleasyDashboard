import { Row, Col, DatePicker, Select, Checkbox, List } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';
import styles2 from './UploadCustomer.less';

const places = ["Bandra", "Andheri"];
const data = ['Date', 'Bills', 'Order', 'Name', 'Contac1t', 'Date1', 'Bills1', 'Order1', 'Name1', 'Contact2', 'Date2', 'Bills2', 'Order2', 'Name2', 'Contact3', 'Date3', 'Bills3', 'Order3', 'Name3', 'Contact4', 'Date4', 'Bills4', 'Order4', 'Name4', 'Contact5'];

function DownloadCsv() {
  const [state, setstate] = useState({
    popup: false,
    popStartDate: '',
    popEndDate: '',
    popStoreID: '',
  });
  const popStoreChange = (id) => {
    console.log('id', id);
    setstate(prevState => ({
      ...prevState,
      popStoreID: id,
    }));
  }
  const popStart = (selectedDate) => {
    setstate(prevState => ({
      ...prevState,
      popStartDate: moment(selectedDate).format('YYYY-MM-DD'),
    }));
    console.log('selectedDate', selectedDate);
  }

  const popEnd = (selectedDate2) => {
    setstate(prevState => ({
      ...prevState,
      popEndDate: moment(selectedDate2).format('YYYY-MM-DD'),
    }));
    console.log('selectedDate', selectedDate2);
  }

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }

  const n = 3
  const result = [[], [], []]

  const wordsPerLine = Math.ceil(data.length / 3)

  for (let line = 0; line < n; line++) {
    for (let i = 0; i < wordsPerLine; i++) {
      const value = data[i + line * wordsPerLine]
      if (!value) continue
      result[line].push(value)
    }
  }
  console.log(result);

  return (
    <Row>
      <Col span={16} style={{ padding: '30px 40px' }}>
        <h3 className={styles2.import}>Export CSV</h3>
        <div className={styles2.Divwrapper} >
          <div style={{ flexGrow: '1' }}>
            <p className={styles2.header1}>Date Range</p>
            <p className={styles2.header3}>From</p>
            <DatePicker
              onChange={popStart}
            />
            <p className={styles2.header3} style={{ margin: '25px 0 13px' }}>To</p>
            <DatePicker
              onChange={popEnd}
            />
          </div>
          <div className={styles2.Storeselect} >
            <p className={styles2.header1}>Stores information</p>
            <p className={styles2.header3}>Choose Store  </p>
            <Select
              showSearch
              style={{ width: 230 }}
              placeholder="Select store"
              optionFilterProp="children"
              onChange={popStoreChange}
              value={state.popStoreID || 'All Store'}
            >
              {places.length > 1 && (
                <Select.Option value="all">
                  All Stores
                </Select.Option>
              )}
              {places.map(str => (<Select.Option value={str} key={str} >{str}</Select.Option>))}
            </Select>
          </div>
        </div>
        <div>
          <h4>DATA COLUMNS</h4>
          <p className={styles2.header3}>Choose the data column to be exported</p>
          <div className={styles2.datacols}>
            <Checkbox.Group onChange={onChange} >
              {result.map((item, i) => (
                <div>
                  {item.map((m, a) => (
                    <Checkbox value={m} key={m} >{m}</Checkbox>
                  ))}
                </div>

              ))}
            </Checkbox.Group>
          </div>
        </div>
      </Col>
      <Col span={8} className={styles2.summaryCol} >
        <h4 className={styles2.summary}>Summary</h4>
        <h4 className={styles2.header2}>Date Range </h4>
        <p>{state.popStartDate} -  {state.popEndDate}</p>
        <h4 className={styles2.header2}>Stores selected</h4>
        <p>{state.popStoreID || 'All Store'}</p>
        {/* <div>
          <h4 className={styles2.header2}>Export Time</h4>
          <p>Columns 6</p>
        </div> */}
      </Col>
    </Row>
  )
}

export default DownloadCsv
