import React, { useCallback, useState } from 'react'
import { 
    Row, 
    Col,
    Input,
    Table,
    Button,
    message,
    Radio,
    InputNumber
} from 'antd'
import TableManage from '../../components/tableManage'
import { sQuery, sAdd, sUpdate, sDele } from '../../services/'

const { TextArea } = Input;

const userManage = () => {
  
  const columns = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: '详细',
        dataIndex: 'detail',
        key: 'detail',
        ellipsis: true,
        width: 400
    },
    {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: '发布人',
        key: 'publish_user',
        dataIndex: 'publish_user'
    },
    {
        title: '发布时间',
        key: 'publish_time',
        dataIndex: 'publish_time'
    },
  ];
  
  const modalConfig = [
    {
        name: 'title',
        label: '标题',
        render: () => <Input />
    },
    {
        name: 'detail',
        label: '详细',
        render: () => 
        (
            <TextArea rows={4} />
        )
    },
    {
        name: 'price',
        label: '价格',
        render: () => <InputNumber />
    },
  ]
  const search = (query) => {
    return sQuery('title', query).then(({data}) => data.result).catch(({err}) => err)
    // return [
    //   {
    //     Id:'1',
    //     title: 'test',
    //     price: 100,
    //     detail: `2020届四川省普通高等学校优秀毕业生的评选推荐工作已结束。经各普通高校及研究生培养单位评选推荐，教育厅组织评审，
    //     现对通过评审拟表彰的4769名2020届四川省普通高等学校优秀毕业生名单予以公示。公示期为5个工作日（3月9日—13日）。`,
    //     publish_user: 'admin',
    //     publish_time: '2020/3/25'
    //   }
    // ]
  }
  return (
    <TableManage 
      columns={columns} 
      modalTitleS={'二手商品'}
      modalConfig={modalConfig} 
      search={search} 
      defaultVal={{
        Id:'1',
        title: '',
        price: 0,
        detail: ``,
        publish_user: '',
        publish_time: ''
      }}
      edit={(entity) => (
          sUpdate(entity).then(res => {
            res = res.data
            console.log(res)
          })
        )
      }
      add={(entity) => 
        (
          sAdd(entity).then((res) => {
            res = res.data
            if(res.status == 200){
              console.log(res)
              message.info(res.msg)
            }
          })
        )
      }
      dele={(Id) => 
        sDele(Id).then((res) => {
          res = res.data
          if(res.status == 200){
            message.info(res.msg)
          }
        })
      } />
  )
}
export default userManage
