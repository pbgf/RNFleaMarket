import React from 'react';
import { connect } from 'dva';
import { Route, Switch, Redirect } from 'dva/router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Layout } from 'antd';
import Index from './index/index'
import Deposit from './deposit/deposit'
import UserManage from './userManage/userManage'
import ChatManage from './chatManage/chatManage'
import SecondHandManage from './secondHandManage/secondHandManage'
import JobManage from './jobManage/jobManage'
import SideBar from '../components/sideBar'
import MyHeader from '../components/header'
import styles from './IndexPage.css';
import Cookies from 'js-cookie'
const { Header,  Sider, Content } = Layout;

const routes = [
  {path:'/app', Component: Index},
  {path:'/app/userManage', Component: UserManage},
  {path:'/app/chatManage', Component: ChatManage},
  {path:'/app/secondHandManage', Component: SecondHandManage},
  {path:'/app/jobManage', Component: JobManage},
  {path:'/app/deposit', Component: Deposit},
]

function IndexPage(props) {
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
          {routes.map(({ path, Component }) => (
              <Route key={path} exact path={path}>
               {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="tra"
                  unmountOnExit
                >
                    <Component />
                </CSSTransition>
              )}
              </Route>
            ))}
              {/* <CSSTransition
                key={props.location.pathname}
                timeout={500}
                classNames={'tra'}
              >
                <Switch>
                  <Route path={'/app'} exact component={Index} />
                  <Route path={'/app/userManage'} exact component={UserManage} />
                  <Route path={'/app/chatManage'} exact component={ChatManage} />
                  <Route path={'/app/secondHandManage'} exact component={SecondHandManage} />
                  <Route path={'/app/jobManage'} exact component={JobManage} />
                </Switch>
              </CSSTransition> */}
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
