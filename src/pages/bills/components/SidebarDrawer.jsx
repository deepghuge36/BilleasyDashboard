import { getFormattedDate } from '@/utils/utils';
import { Button, Descriptions, Divider, Drawer, Empty, List, message, Popconfirm, Skeleton, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import styles from './SidebarDrawer.less';

function SidebarDrawer({ dispatch, data, loading }) {
  const [drawer, setDrawer] = useState({
    visible: false,
  });
  const { selectedBill = {} } = data || {};
  const [currentBill, setCurrentBill] = useState({});
  const { bill_particulars = [] } = currentBill || [];

  useEffect(() => {
    if (dispatch && selectedBill.id !== undefined) {
      dispatch({
        type: 'billsModel/getBillsByID',
        payload: selectedBill.id,
      }).then((res) => {
        if (res.id) {
          setDrawer({ visible: true });
        }
        setCurrentBill(res);
      });
    }
  }, [selectedBill.id]);

  const deleteBill = () => {
    if (currentBill.id) {
      dispatch({
        type: 'billsModel/deleteBillByID',
        payload: {
          client_bill_ids: [currentBill.id]
        }
      }).then((res) => {
        message.success('Bill deleted successfully.');
        window.location.reload();
      });
    }
  }

  return (
    <div>
      <Drawer
        placement="right"
        className={styles.mainDrawer}
        // closeIcon={<i className="far fa-times" />}
        title={
          <div className={styles.sidebarTitle}>
            <Skeleton loading={loading}>
              <div className={styles.headDetails}>
                <h2>
                  {(currentBill.name === ' ' || currentBill.name === '') ? 'Unknown Customer' : currentBill.name}
                </h2>
                <h3 style={{ lineHeight: '33px' }}><i className="fal fa-rupee-sign" /> {currentBill.grand_total || 0} </h3>
              </div>
              <div className={styles.infoDetails}>
                <div>
                  <p><i className="fas fa-comment-alt-lines" style={{ color: '#7285A8' }} /> {currentBill.contact || ''}</p>
                  <p><i className="fal fa-envelope" style={{ color: '#7285A8' }} /> {currentBill.email || ''}</p>
                </div>
                <div>
                  <p>&nbsp;</p>
                  {currentBill.payment_status === 'issued' && (
                    (currentBill.mode_of_payment === 'NA' || currentBill.mode_of_payment === 'CASH') ?
                      <p>
                        <Tag color="#7285A8" className={styles.otherpayment}>order created</Tag>
                      </p> :
                      <p>
                        <Tag color="#1DC728" className={styles.payment}>Paid</Tag>
                      </p>
                  )
                  }
                  {currentBill.payment_status === 'paid' &&
                    (currentBill.mode_of_payment === 'BALANCE CLEARED' ?
                      <p>
                        <Tag color="#7285A8" className={styles.otherpayment}>BALANCE CLEARED</Tag>
                      </p>
                      :
                      <p>
                        <Tag color="#1DC728" className={styles.payment}>
                          {currentBill.mode_of_payment === 'NA' ? 'Paid' : `Paid by ${currentBill.mode_of_payment}`}
                        </Tag>
                      </p>)
                  }
                  {currentBill.payment_status === 'partially paid' &&
                    <p>
                      <Tag color="#7285A8" className={styles.otherpayment}>Partially paid</Tag>
                    </p>
                  }
                </div>
              </div>
              <br />
              <h4>Basic Details</h4>
              <div className={styles.infoDetails}>
                <div>
                  <p><i className="fas fa-store-alt" style={{ color: '#7285A8' }} /> {currentBill.store_address || ''}</p>
                  <p><i className="fal fa-clock" style={{ color: '#7285A8' }} />&nbsp;{getFormattedDate(currentBill.created_at)}</p>
                </div>
                <div>
                  <p><i className="fas fa-receipt" style={{ color: '#7285A8' }} />  Bill Number {currentBill.bill_number || ''}</p>
                  <p><i className="fas fa-wallet" style={{ color: '#7285A8' }} /> {currentBill.grand_total || 0}</p>
                </div>
              </div>
            </Skeleton>
          </div>
        }
        visible={drawer.visible}
        // closable={false}
        //onClose={closeDrawer}
        onClose={() => { setDrawer({ visible: false }) }}
        width="35%"
        destroyOnClose
      >
        <Skeleton loading={loading}>
          <h4 style={{ color: '#5066d8', fontSize: '16px' }} >Bill Details</h4>
          <List
            className={styles.ListWrapper}
            itemLayout="horizontal"
            dataSource={bill_particulars || []}
            header={
              <List.Item
                className={styles.itemTitle}
              >
                <List.Item.Meta
                  title="Item"
                  description=""
                />
                <div className={styles.quantityTitle}>Qty</div>
                <div className={styles.amountTitle}>Price</div>
              </List.Item>}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  // title={item.attributes.article_name}
                  description={item.article_name}

                />
                <div className={styles.quantity}>{item.article_quantity}</div>
                <div className={styles.amount}>
                  <i style={{ fontSize: 10 }} className="fal fa-rupee-sign" />
                  {' '}
                  {` ${item.article_price}`}
                </div>
              </List.Item>
            )}
          />
          <div className={styles.particulrLeftOver}>
            <div className={styles.leftdata}>{`discount (${currentBill.discount_percentage}%)`}</div>
            <div className={styles.rightdata}>{currentBill.discount_amount}</div>
          </div>
          <div className={styles.particulrLeftOver}>
            <div className={styles.leftdata}>Subtotal</div>
            <div className={styles.rightdata}>
              <span><i style={{ fontSize: 12 }} className="far fa-rupee-sign" /></span>
              <span>{' '}{currentBill.total_amount}</span>
            </div>
          </div>
          <div className={styles.particulrLeftOver}>
            <div className={styles.leftdata}>Tax (%)</div>
            <div className={styles.rightdata}>{currentBill.tax_percentage}</div>
          </div>
          <div className={styles.particulrLeftOver} style={{ borderTop: '1px solid #7285A8' }}>
            <div className={styles.leftdata}>
              <div className={styles.title}>Total</div>
              <div className={styles.subTitle} />
            </div>
            <div className={styles.boldTotal}>
              <span><i className="fal fa-rupee-sign" /></span>
              <span>{' '}{currentBill.grand_total}</span>
            </div>
          </div>
          <div className={styles.drawerFooter}>
            <Space style={{ float: 'right' }} size={10} >
              <Popconfirm
                title="Are you sure delete this bill?"
                onConfirm={deleteBill}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="default" shape="round" className={styles.deletebtn} >Delete</Button>
              </Popconfirm>
              <a href={currentBill.original_bill_url} target="_blank">
                <Button type="primary" shape="round" className={styles.ogbillbtn}>View Original Bill</Button>
              </a>
            </Space>
          </div>
        </Skeleton>
      </Drawer>
    </div >
  )
}

export default connect(({ loading }) => ({
  loading: loading.effects['billsModel/getBillsByID']
}))(SidebarDrawer);
