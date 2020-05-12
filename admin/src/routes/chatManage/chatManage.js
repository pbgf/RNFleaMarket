import React, { useCallback, useState } from 'react'
import { 
    Input,
    message,
    Select,
} from 'antd'
import TableManage from '../../components/tableManage'
import { chatAdd, chatDele, chatQuery,chatUpdate } from '../../services/'

const { TextArea } = Input;
const { Option } = Select;

const userManage = () => {
  
  const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: '内容',
        dataIndex: 'text',
        key: 'text',
        ellipsis: true,
        width: 400
    },
    {
        title: '被赞次数',
        dataIndex: 'like_cnt',
        key: 'like_cnt',
    },
    {
        title: '评论次数',
        key: 'comment_cnt',
        dataIndex: 'comment_cnt'
    },
    {
        title: '发布人',
        key: 'publish_user',
        dataIndex: 'publish_user'
    },
  ];
  
  const modalConfig = [
    {
      name: 'title',
      label: '标题',
      render: () => <Input />
    },
    {
      name: 'text',
      label: '内容',
      render: () => 
      (
        <TextArea rows={4} />
      )
    },
    {
      name: 'type',
      label: '类型',
      render: (form) => 
      (
        <Select defaultValue={0} style={{ width: 120 }} onChange={(value) => {
          form.current.setFieldsValue({type: value})
        }}>
          <Option value={0}>求助</Option>
          <Option value={1}>交友</Option>
        </Select>
      )
    },
    {
      name: 'like_cnt',
      label: '被赞次数',
      render: () => <Input disabled={true} />
    },
    {
      name: 'comment_cnt',
      label: '评论次数',
      render: () => <Input disabled={true} />
    },
    
  ]
  const search = (query) => {
    return chatQuery('title', query)
    .then(({data}) => 
      {
        if(data.status === 200){
          return data.result
        }else{
          console.log(data)
          throw new Error(data.msg||'出现错误')
        }
      }
    )
    .catch(err => {
      message.warning(err.toString())
    })
  }
  return (
    <TableManage 
      columns={columns} 
      modalTitleS={'帖子'}
      modalConfig={modalConfig} 
      search={search} 
      defaultVal={{
        Id:'',
        title: '',
        text: '',
        like_cnt: 0,
        comment_cnt: 0,
        publish_user: '',
        type: 0
      }}
      edit={(entity) => (
        chatUpdate(entity).then((res) => {
          res = res.data
          if(res.status === 200){
            console.log(res)
            message.info(res.msg)
          }
        })
      )}
      add={(entity) => (
        chatAdd(entity).then((res) => {
          res = res.data
          if(res.status === 200){
            console.log(res)
            message.info(res.msg)
          }
        })
      )}
      dele={(Id) => (
        chatDele(Id).then((res) => {
          res = res.data
          if(res.status === 200){
            message.info(res.msg)
          }
        })
      )} />
  )
}
export default userManage
