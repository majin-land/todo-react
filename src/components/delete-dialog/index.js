import React, { Component } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core'

import Modal from '../modal'

class DeleteDialog extends Component {
  render() {
    return (
      <Modal>
        <Dialog
          open={this.props.open}
          onClose={(event) => {
            event.preventDefault()
            this.props.onClose()
          }}
          maxWidth="sm"
        >
          <DialogTitle>
            {this.props.title}
          </DialogTitle>
          <DialogContent>
            {this.props.content}
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              onClick={this.props.onClose}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={(event) => {
                event.preventDefault()
                this.props.onAccept()
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Modal>
    )
  }
}

export default DeleteDialog
