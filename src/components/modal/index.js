import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'

import theme from '../../theme'
import { modalRoot } from '../../utils/helper'

class Modal extends PureComponent {
  render() {
    return ReactDOM.createPortal(
      (
        <MuiThemeProvider theme={theme}>
          {this.props.children}
        </MuiThemeProvider>
      ),
      modalRoot,
    )
  }
}

export default Modal
