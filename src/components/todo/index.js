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

  _changeStatusCheckBox = (item) => {
    return this.setState({
      todoItems: this.state.todoItems.map(itm => {
        if (itm.id == item.id) {
          itm.isCompleted = !itm.isCompleted
        }
        return itm
      })
    })
  }

  _removeItems = (item) => {
    return this.setState({
      todoItems: this.state.todoItems.filter(itm => {
        return itm.id !== item.id;
      })
    })
  }

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
                  onChange={() => this._changeStatusCheckBox(item)}
                  value=""
                />
              }
              className={item.isCompleted ? s.completedItem : ``}
              label={item.value}
            />
            <IconButton
              variant="contained"
              color="secondary"
              onClick={() => this._removeItems(item)}
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
              this.setState({ newItem: event.target.value })
              console.log('this.state.newItem', this.state.newItem)
            }}
            onKeyPress={(event) => { // when a keyboard is pressed
              if (event.key === 'Enter' && this.state.newItem) {
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
              }
            }}
          />
        </div>
      </Paper>
    )
  }
}

export default TodoPage
