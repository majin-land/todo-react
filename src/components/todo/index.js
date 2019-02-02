import React, { Component } from 'react'

import {
  Paper,
  IconButton,
  Icon,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@material-ui/core'

import s from './styles.scss'

class TodoPage extends Component {
  state = {
    todoItems: [],
    newItem: '',
  }

  name = 'donnt todo'

  render() {
    return (
      <Paper className={s.container}>
        {/* {this.renderDelete()} */}
        <h1>To do List</h1>
        {this.state.todoItems.map(item => (
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
            value={this.state.newItem} // display @observable newItem in this textfield
            onChange={(event) => {
              // TODO: record the change when user update the textfield
              this.setState({ newItem: event.target.value })
              console.log('this.state.newItem', this.state.newItem)
            }}
            onKeyPress={(event) => { // when a keyboard is pressed
              // when 'ENTER' is pressed
              if (event.key === 'Enter' && this.state.newItem) {
                // TODO: add the item user has enter into the list
                this.setState({
                  todoItems: [
                    ...this.state.todoItems,
                    {
                      id: this.state.newItem,
                      value: this.state.newItem,
                      isCompleted: false,
                    },
                  ],
                  newItem: '',
                })
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
