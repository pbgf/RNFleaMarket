import React, { useRef, useState, useEffect } from 'react'
import { 
    Modal, 
    Form,
 } from 'antd';

const myModal = (props) => {
    //const state = { visible: false };
    const {fields, fieldsValue, visible} = props
    const [initialValues, setInitialValues] = useState()
    const ref = useRef(null)
    useEffect(() => {
        if(ref.current){
            ref.current.setFieldsValue(fieldsValue)
        }else{
            setInitialValues(fieldsValue)
        }
    },[fieldsValue])
    return (
        <Modal
            title={props.title}
            visible={visible}
            onOk={props.handleOk(ref)}
            onCancel={props.handlerCancel}
        >
            <Form
                ref={ref}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                initialValues={initialValues}
                layout="horizontal"
                size='middle'
                onFinish={props.handlerSubmit}
            >
                {
                    fields.map(item => (
                        <Form.Item 
                            key={item.name}
                            label={item.label} 
                            name={item.name}
                            rules={item.rules}>
                            {item.render()}
                        </Form.Item>
                    ))
                }
                {/* <Form.Item label="Input">
                <Input />
                </Form.Item>
                <Form.Item label="Select">
                <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
                </Form.Item>
                <Form.Item label="TreeSelect">
                <TreeSelect
                    treeData={[
                    { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                    ]}
                />
                </Form.Item>
                <Form.Item label="Cascader">
                <Cascader
                    options={[
                    {
                        value: 'zhejiang',
                        label: 'Zhejiang',
                        children: [
                        {
                            value: 'hangzhou',
                            label: 'Hangzhou',
                        },
                        ],
                    },
                    ]}
                />
                </Form.Item>
                <Form.Item label="DatePicker">
                <DatePicker />
                </Form.Item>
                <Form.Item label="InputNumber">
                <InputNumber />
                </Form.Item>
                <Form.Item label="Switch">
                <Switch />
                </Form.Item>
                <Form.Item label="Button">
                <Button>Button</Button>
                </Form.Item> */}
            </Form>
        </Modal>
    );
}

export default myModal