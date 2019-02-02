import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Router } from 'react-router'
import { syncHistoryWithStore } from 'mobx-react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { MuiThemeProvider } from '@material-ui/core/styles'

import theme from './theme'

import { appRoot } from './utils/helper'
import { rootStore } from './stores'
import Application from './application'

const browserHistory = createBrowserHistory()
const history = syncHistoryWithStore(browserHistory, rootStore.routing)

ReactDOM.render(
  (
    <MuiThemeProvider theme={theme}>
      <Provider {...rootStore}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>
    </MuiThemeProvider>
  ), appRoot,
)
