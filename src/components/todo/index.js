import React, { Component } from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import randomstring from 'randomstring'

import {
  Paper,
  IconButton,
  Icon,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@material-ui/core'

import s from './styles.scss'

@inject('todoStore', 'notificationStore') @observer
class TodoPage extends Component {
  @observable.ref todoItems = []
  @observable newItem = ''

  render() {
    return (
      <Paper className={s.container}>
        {/* {this.renderDelete()} */}
        <h1 style={{ textAlign: 'center' }}>Todo List</h1>
        {this.todoItems.map(item => (
          <div key={item.id} className={s.todoItem}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.isCompleted}
                  onChange={() => {
                    // TODO: set this todo item as completed
                  }}
                  value=""
                />
              }
              label={item.value}
            />
            <IconButton
              variant="contained"
              color="secondary"
              onClick={() => {
                // TODO: remove this item from the list
              }}
            >
              <Icon>delete</Icon>
            </IconButton>
          </div>
        ))}
        <div className={s.newItem}>
          <TextField
            fullWidth
            type="text"
            placeholder="Enter a new item here. Then press ENTER"
            value={this.newItem} // display @observable newItem in this textfield
            onChange={(event) => {
              // TODO: record the change when user update the textfield
            }}
            onKeyPress={(event) => { // when a keyboard is pressed
              // when 'ENTER' is pressed
              if (event.key === 'Enter') {
                // TODO: add the item user has enter into the list

                // TODO: reset new item text
              }
            }}
          />
        </div>
      </Paper>
    )
  }
}

export default TodoPage
