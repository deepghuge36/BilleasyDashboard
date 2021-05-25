/* eslint-disable no-underscore-dangle */
import { Select, Space } from 'antd'
import React from 'react'
import Cookies from 'js-cookie';
import styles from './StoreViewer.less';

const { Option } = Select;
const _store = Cookies.get('StoreId');
export default function StoreViewer({ data = [], onChange, selected = 'All Store' }) {
  return (
    <div>
      <Space>
        <span style={{ color: '#475A7A' }}>Currently Viewing For </span>
        <Select
          // loading={loading}
          showSearch
          style={{ minWidth: '150px', margin: 0, padding: 0 }}
          placeholder="Select store"
          bordered={false}
          optionFilterProp="children"
          onChange={onChange}
          value={_store !== 'all' ? _store : selected}
          className={styles.store}
          disabled={_store !== 'all'}
        // dropdownMatchSelectWidth={false}
        >
          <Option value="all">
            All Stores
            </Option>
          {data.map(str => (<Option value={str.id} key={str.id} >{str.name}</Option>))}
        </Select>
      </Space>
    </div>
  )
}
