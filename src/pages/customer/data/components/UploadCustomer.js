import { Select } from 'antd';
import React from 'react';
import styles2 from './UploadCustomer.less';

const { Option } = Select;
const options = ["Email", "Mobile Number", "Full name", "DOB"]

function UploadCustomer() {

  return (
    <div className={styles2.mapping}>
      <h3 className={styles2.Inventory}>Customer Field Mapping</h3>
      <div>
        <div className={styles2.mappingscreen} style={{ marginTop: '35px' }}>
          <div className={styles2.selectfield}>
            <h4>System fields</h4>
          </div>
          <div className={styles2.selectfield}>
            <h4>CSV fields</h4>
          </div>
        </div>
        <div className={styles2.mappingscreen}>
          <div className={styles2.label}>
            <p>Email:</p>
          </div>
          <div className={styles2.selectfield}>
            <Select allowClear>
              {options.map((x) => (<Option key={x} value={x}>{x}</Option>))}
            </Select>
          </div>
        </div>
        <div className={styles2.mappingscreen}>
          <div className={styles2.label}>
            <p>Mobile Number:</p>
          </div>
          <div className={styles2.selectfield}>
            <Select allowClear>
              {options.map((x) => (<Option key={x} value={x}>{x}</Option>))}
            </Select>
          </div>
        </div>
        <div className={styles2.mappingscreen}>
          <div className={styles2.label}>
            <p>Full name:</p>
          </div>
          <div className={styles2.selectfield}>
            <Select allowClear>
              {options.map((x) => (<Option key={x} value={x}>{x}</Option>))}
            </Select>
          </div>
        </div>
        <div className={styles2.mappingscreen}>
          <div className={styles2.label}>
            <p>DOB:</p>
          </div>
          <div className={styles2.selectfield}>
            <Select allowClear>
              {options.map((x) => (<Option key={x} value={x}>{x}</Option>))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadCustomer
