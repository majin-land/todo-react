import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { Snackbar } from '@material-ui/core'

import { errorMsgDuration } from '../../../config'
import BarContent from './bar-content'

@inject('notificationStore') @observer
class BarError extends Component {
  render() {
    if (!this.props.notificationStore.error) return null
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!!this.props.notificationStore.error}
        onClose={() => this.props.notificationStore.clearError()}
        autoHideDuration={errorMsgDuration}
      >
        <BarContent
          onClose={() => this.props.notificationStore.clearError()}
          variant="error"
          message={this.props.notificationStore.error}
        />
      </Snackbar>
    )
  }
}

export default BarError
