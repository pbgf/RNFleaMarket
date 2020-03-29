/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './login.css';
import Cookies from 'js-cookie'

const layout = {
    labelCol: { offset: 1, span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};

export default (props) => {
    const onFinish = values => {
        console.log('Success:', values);
        if(values.username == 'admin' && values.password == 'admin123'){
            if(values.remember){
                Cookies.set('user', values, { expires: 2 })
            }
            Cookies.set('userSession', values.username, { expires: 1 })
            props.history.push('/app')
            //cookie save
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={styles.container}>
            <h1>后台管理系统</h1>
            <div className={styles.logincard}>
                <Form 
                    initialValues={
                        JSON.parse(Cookies.get('user') || `{}`)
                    }
                    className={styles.loginform}
                    {...layout}
                    name="basic"
                    //initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
