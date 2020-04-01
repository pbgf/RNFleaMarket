import React, { useCallback, useState } from 'react'
import { 
    Input,
    message,
} from 'antd'
import TableManage from '../../components/tableManage'
import { jobQuery, jobAdd, jobUpdate, jobDele } from '../../services/'

const { TextArea } = Input;

const userManage = () => {
  
  const columns = [
    {
        title: '职位名字',
        dataIndex: 'job_name',
        key: 'job_name'
    },
    {
        title: '薪水',
        dataIndex: 'job_pay',
        key: 'job_pay',
    },
    {
        title: '详细',
        dataIndex: 'job_detail',
        key: 'job_detail',
    },
    {
        title: '发布人',
        key: 'user_name',
        dataIndex: 'user_name'
    },
    {
        title: '发布时间',
        dataIndex: 'publish_time',
        key: 'publish_time',
    },
  ];
  
  const modalConfig = [
    {
        name: 'job_name',
        label: '职位名字',
        render: () => <Input />
    },
    {
        name: 'job_detail',
        label: '详细',
        render: () => 
        (
            <TextArea rows={4} />
        )
    },
    {
        name: 'job_pay',
        label: '薪水',
        render: () => <Input addonAfter="/月" />
    },
  ]
  const search = (query) => {
    return jobQuery('job_name', query).then(({data}) => data.result)
  }
  return (
    <TableManage 
      columns={columns} 
      modalTitleS={'招聘'}
      modalConfig={modalConfig} 
      search={search} 
      defaultVal={{
        Id:'1',
        job_name: '',
        job_pay: 0,
        job_detail: '',
        publish_user: '',
        user_name:'',
        publish_time: ''
      }}
      edit={(entity) => (
        jobUpdate(entity).then((res) => {
          res = res.data
          if(res.status === 200){
            console.log(res)
            message.info(res.msg)
          }
        })
      )}
      add={(entity) => (
        jobAdd(entity).then((res) => {
          res = res.data
          if(res.status === 200){
            console.log(res)
            message.info(res.msg)
          }
        })
      )}
      dele={(Id) => (
        jobDele(Id).then((res) => {
          res = res.data
          if(res.status === 200){
            message.info(res.msg)
          }
        })
      )} />
  )
}
export default userManage
