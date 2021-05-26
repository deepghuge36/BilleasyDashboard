import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, Link } from 'umi';
import moment from 'moment';


const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',

    render: (x) => (
      <span>
        {moment(x).locale('en').fromNow()}
        {/* {commonFormattedDate(x)} */}
      </span>
    ),
  },
  {
    title: 'Bill',
    dataIndex: 'bill_number',
    key: 'bill_number',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Bill Delivery',
    dataIndex: 'bill_delivery',
    key: 'bill_delivery',
  },
  {
    title: 'Payment Status',
    dataIndex: '',
    key: 'payment_status',
  },
];
function ExpanedTable({ dispatch, data, loading }) {
  const [customerBill, setCustomerBill] = useState([]);
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'customerModel/getCustomerBill',
        payload: data.customer_id,
      }).then((res) => {
        setCustomerBill(res);
      });
    }
  }, [])
  return (
    <div>
      <Table
        loading={loading}
        size="small"
        rowKey="bill_id"
        dataSource={customerBill || []}
        columns={columns}
        pagination={false}
        bordered
        footer={() =>
        (<div style={{ display: 'flex', justifyContent: 'flex-start', background: '#EAF2FF' }}>
          <Link to="/bills">
            <Button type="link" >See All Bill</Button>
          </Link>
        </div>)
        }
      />
    </div>
  )
}

export default connect(({ loading }) => ({
  loading: loading.effects['customerModel/getCustomerBill']
}))(ExpanedTable);
