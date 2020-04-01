import React, { useCallback, useState } from 'react'
import { 
    Input,
    message,
    Radio,
} from 'antd'

import TableManage from '../../components/tableManage'
import { userQuery, userAdd, userUpdate, userDele } from '../../services/'

const userManage = () => {
  const columns = [
    {
      title: '用户名',
      dataIndex: 'user_name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      sorter: (a, b) => a.sex - b.sex,
      render: (text, record) => record.sex?<span>男</span>:<span>女</span>
    },
    {
      title: '电话',
      dataIndex: 'telephone',
      key: 'address',
    },
    {
      title: 'QQ',
      key: 'qq',
      dataIndex: 'qq'
    }
  ];
  
  const modalConfig = [
    {
      name: 'user_name',
      label: '用户名',
      render: () => <Input />
    },
    {
      name: 'sex',
      label: '性别',
      render: () => 
      (
        <Radio.Group>
          <Radio value={1}>男</Radio>
          <Radio value={0}>女</Radio>
        </Radio.Group> 
      )
    },
    {
      name: 'telephone',
      label: '电话',
      render: () => <Input />
    },
    {
      name: 'qq',
      label: 'QQ',
      render: () => <Input />
    }
  ]
  const search = (query) => {
    return userQuery('user_name', query).then(({data}) => data.result)
  }
  return (
    <TableManage 
      columns={columns} 
      modalTitleS={'用户'}
      modalConfig={modalConfig} 
      search={search} 
      defaultVal={{
        Id:'',
        user_name: '',
        sex: 1,
        telephone: '',
        qq: ''
      }}
      edit={(entity) => (
        userUpdate(entity).then((res) => {
          res = res.data
          if(res.status === 200){
            console.log(res)
            message.info(res.msg)
          }
        })
      )}
      add={(entity) => (
        userAdd(entity).then((res) => {
          res = res.data
          if(res.status === 200){
            console.log(res)
            message.info(res.msg)
          }
        })
      )}
      dele={(Id) => (
        userDele(Id).then((res) => {
          res = res.data
          if(res.status === 200){
            message.info(res.msg)
          }
        })
      )} />
  )
}
export default userManage
