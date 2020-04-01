import React from 'react';
import { Router, Route, Switch, Redirect, withRouter } from 'dva/router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import IndexPage from './routes/IndexPage';
import Login from './routes/login/login'
import Example from './components/Example'
import './router.css'

const Routes = withRouter(({history, location}) => {
  console.log(location)
  return (
    <TransitionGroup 
      className={'container'}>
      <CSSTransition
        // key={location.pathname}
        // timeout={500}
        // classNames={'fade'}
      >
        <Switch location={location}>
          <Route path="/" exact render={() => <Redirect to="/login"/>} />
          <Route path="/app" component={IndexPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/example" exact component={Example} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
})

function RouterConfig({ history }) {
  return (
      <Router history={history}>
        <Routes />
      </Router>
  );
}

export default RouterConfig;
