/**
 * @format
 */

import {AppRegistry} from 'react-native'
import React, { Component } from 'react'
import App from './src/App'
import {name as appName} from './app.json'
import { Provider } from 'react-redux'
import store from './src/store/index'

function Root () {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Root);
