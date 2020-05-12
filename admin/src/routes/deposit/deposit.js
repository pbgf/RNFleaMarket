import React, { useEffect, useState, useRef } from 'react';
import { getPayUrl, isSucc } from '../../services/';
import { 
    Modal, 
    Form,
    InputNumber,
    message
 } from 'antd';
import { connect } from 'dva';
import { guid } from '../../common/';
let run = true;
function depositPage({userInfo}) {
  const [result, setResult] = useState();
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(1);
  const [deposit_id] = useState(guid());
  const [succ, setSucc] = useState(false);
  const ref = useRef()
  const onFinish = ({amount}) => {
    console.log(userInfo)
    getPayUrl(amount,deposit_id,userInfo.Id)
    .then(res => {
        console.log(res)
        if(res.err){
            message.info(res.err);
            return;
        }
        res = res.data
        setStep(2);
        setResult(res.result)
    })
  }
  async function poll () {
    while(run){
        console.log('poll...')
        let tasks = []
        tasks.push(new Promise((resolve) => {
            isSucc(deposit_id)
            .then(res => {
                res = res.data
                if(res.status == 200){
                    run = false;
                    setSucc(true);
                }
                resolve()
            })
        }).catch(err => {
            run = false;
        }))
        tasks.push(new Promise((resolve) => {
            setTimeout(() => resolve(), 1000)
        }))
        await Promise.all(tasks)
    }
  }
  useEffect(() => {
    run = true;
    return function cleanup () {
        run = false
    }
  },[])
  useEffect(() => {
    if(succ){
        message.success('充值完成,请到app查看', 10);
        setVisible(false);
    }
  },[succ])
  return (
    <Modal
    visible={visible}
    maskClosable={false}
    onOk={() => ref.current.submit()}
    onCancel={() => {
        setVisible(false);
        run = false;
    }}>
        {
            step===1?(
                <Form ref={ref} onFinish={onFinish}>
                    <Form.Item 
                        label={'充值金额'} 
                        name="amount">
                        <InputNumber min={0} max={99999} defaultValue={0} />
                    </Form.Item>
                </Form>
            ):step===2?(
                <a target="_blank" onClick={() => {
                    setStep(3);
                    poll()
                }} href={result?result:'#'}>前往充值</a>
            ):step===3?(<div>交易中，交易完成后再回到该页面确认</div>):null
        }
        
    </Modal>
  );
}

depositPage.propTypes = {
};

export default connect(({ user }) => ({
    userInfo: user
}))(depositPage);
