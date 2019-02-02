import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { hot } from 'react-hot-loader'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'

import { rootStore, hydrateAll } from './stores'

import Loader from './components/loader'
import BarError from './components/bar/error'
import BarSuccess from './components/bar/success'

import TodoPage from './components/todo/index'

import s from './application.scss'


@withRouter
@observer
class App extends Component {
  componentDidMount() {
    hydrateAll(rootStore).then(() => {
      setTimeout(this.persistComplete, 300)
    })
  }

  @observable persisted = false

  @action persistComplete = () => {
    this.persisted = true
  }

  renderRoute = () => {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" component={TodoPage} />
        </Switch>
      </React.Fragment>
    )
  }

  render() {
    if (!this.persisted) return (<Loader />)
    return (
      <div className={s.rootContainer}>
        <BarSuccess />
        <BarError />
        <div className={s.contentContainer}>
          {this.renderRoute()}
        </div>
      </div>
    )
  }
}

export default hot(module)(App)
