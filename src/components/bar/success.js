import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { Snackbar } from '@material-ui/core'

import { successMsgDuration } from '../../../config'
import BarContent from './bar-content'

@inject('notificationStore') @observer
class BarSuccess extends Component {
  render() {
    if (!this.props.notificationStore.success) return null
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!!this.props.notificationStore.success}
        onClose={() => this.props.notificationStore.clearSuccess()}
        autoHideDuration={successMsgDuration}
      >
        <BarContent
          onClose={() => this.props.notificationStore.clearSuccess()}
          variant="success"
          message={this.props.notificationStore.success}
        />
      </Snackbar>
    )
  }
}

export default BarSuccess
