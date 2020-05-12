import React, {  useState, useEffect, useReducer } from 'react'
import { 
    Row, 
    Col,
    Input,
    Table,
    Button,
    Modal,
} from 'antd'
import {
  SearchOutlined,
  PlusCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import MyModal from './myModal'

const { confirm } = Modal;
const tableManage = (props) => {
    const { columns, modalConfig, modalTitleS, search, edit, add, dele, defaultVal } = props
    const [tableCol, setTableCol] = useState(columns)
    const [visible,setVisible] = useState(false)
    const [fieldsValue, setFieldsValue] = useState()
    const [status, setStatus] = useState('add') //add || edit
    const [modalTitle, setModalTitle] = useState('modal')
    const [data, setData] = useState([])
    const [record, setRecord] = useState({})
    const [query, setQuery] = useState('')
    useEffect(() => {
        columns.push({
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                <a onClick={handlerEdit.bind(null,record)} style={{ marginRight: 16 }}>编辑</a>
                <a onClick={() => {
                    confirm({
                        title: '你确定要删除吗?',
                        icon: <ExclamationCircleOutlined />,
                        content: '点击确定按钮后将会删除此项',
                        onOk() {
                            handlerDelete(record).then(() => {
                                _search()
                            })
                        },
                        onCancel() {},
                    });
                    
                }}>删除</a>
              </span>
            ),
        })
        setTableCol(columns)
        _search()
    },[])
    const handlerCancel = () => {
        setVisible(false)
    }
    const handleOk = (ref) => () => {
        ref.current.submit()
    }
    const _onKeyDown = (event) => {
        if(event.keyCode == 13){
            _search()
        }
    }
    const _search = async () => {
        const data = await search(query)
        setData(data)
    }
    const handlerAdd = () => {
        setFieldsValue(defaultVal)
        setModalTitle(`${modalTitleS}新增`)
        setStatus('add')
        setVisible(true)
    }
    const handlerEdit = (record) => {
        setFieldsValue(record)
        setRecord(record)
        setModalTitle(`${modalTitleS}编辑`)
        setStatus('edit')
        setVisible(true)
    }
    const handlerDelete = ({Id}) => dele(Id)
    const handlerSubmit = values => {
        if(status == 'edit'){
            edit(Object.assign({Id: record.Id},values)).then(() => {
                setVisible(false)
                _search()
            })
        }else if(status == 'add'){
            add(values).then(() => {
                setVisible(false)
                _search()
            })
        }
        
    };
    return (
        <div style={{padding: '20px'}}>
            <Row>
                <Col span={1}>
                    <Button onClick={handlerAdd} icon={<PlusCircleOutlined />} type="primary">新增</Button>
                </Col>
                <Col offset={16} span={6}>
                    <Input value={query} onChange={(e) => {setQuery(e.currentTarget.value)}} onKeyDown={_onKeyDown} placeholder="输入搜索内容" />
                </Col>
                <Col span={1}>
                    <Button onClick={_search} icon={<SearchOutlined />} style={{float:"right"}} type="primary" >
                        搜索
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table rowKey="Id" style={{marginTop: '20px'}} columns={tableCol} dataSource={data} />
                </Col>
            </Row>
            <MyModal
                title={modalTitle}
                handlerSubmit={handlerSubmit} 
                fields={modalConfig} 
                handleOk={handleOk} 
                visible={visible} 
                handlerCancel={handlerCancel}
                fieldsValue={fieldsValue}
            />
        </div>
    )
}
export default tableManage
