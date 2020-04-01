import React from 'react';
import { connect } from 'dva';
import { Route, Switch, Redirect } from 'dva/router';
import { Layout } from 'antd';
import Index from './index/index'
import UserManage from './userManage/userManage'
import ChatManage from './chatManage/chatManage'
import SecondHandManage from './secondHandManage/secondHandManage'
import JobManage from './jobManage/jobManage'
import SideBar from '../components/sideBar'
import MyHeader from '../components/header'
import styles from './IndexPage.css';
import Cookies from 'js-cookie'
const { Header,  Sider, Content } = Layout;

function IndexPage() {
  if(!Cookies.get('userSession')){
    return <Redirect to="/login" />
  }
  return (
    <Layout className={styles.container}>
      <Header className={styles.header}>
        <MyHeader />
      </Header>
      <Layout>
        <Sider>
          <SideBar />
        </Sider>
        <Content>
          <Switch>
            <Route path={'/app'} exact component={Index} />
            <Route path={'/app/userManage'} exact component={UserManage} />
            <Route path={'/app/chatManage'} exact component={ChatManage} />
            <Route path={'/app/secondHandManage'} exact component={SecondHandManage} />
            <Route path={'/app/jobManage'} exact component={JobManage} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
    // <div className={styles.normal}>
    //   <h1 className={styles.title}>Yay! Welcome to dva!</h1>
    //   <div className={styles.welcome} />
    //   <ul className={styles.list}>
    //     <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
    //     <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
    //   </ul>
    // </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
