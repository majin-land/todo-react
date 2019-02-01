import React, { Component } from 'react'

import { SnackbarContent, IconButton, Icon } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const variantIcon = {
  success: 'check_circle',
  error: 'error',
}

const styles = theme => ({
  success: {
    backgroundColor: '#00B7B2',
  },
  error: {
    backgroundColor: '#EA4B35',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

class BarContent extends Component {
  render() {
    const { classes, message, onClose, variant } = this.props
    return (
      <SnackbarContent
        className={classes[variant]}
        aria-describedby="client-snackbar"
        message={(
          <span className={classes.message}>
            <Icon className={classes.iconVariant}>{variantIcon[variant]}</Icon>
            {message}
          </span>
        )}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
          >
            <Icon>close</Icon>
          </IconButton>,
        ]}
      />
    )
  }
}

export default withStyles(styles)(BarContent)
