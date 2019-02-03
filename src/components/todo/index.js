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
import DeleteDialog from '../delete-dialog'

class TodoPage extends Component {
  state = {
    todoItems: [],
    newItem: '',
    isModalOpen: false,
    idItem: '',

  }

  _changeStatusCheckBox = (item) => {
    return this.setState({
      todoItems: this.state.todoItems.map(itm => { itm.id == item.id  ? itm.isCompleted = !itm.isCompleted : ''; return itm })
    })
  }

  _removeItems = (item) => {
    return this.setState({ todoItems: this.state.todoItems.filter(itm => itm.id !== this.state.idItem), isModalOpen: false})
  }

  render() {
    return (
      <Paper className={s.container}>
        <h1>To do List</h1>
        <DeleteDialog 
          open={this.state.isModalOpen} 
          title="Are you sure to delete?"
          content={`Are you sure to detele item "${this.state.title}" ?`}
          onClose={() => this.setState({isModalOpen: false})}
          onAccept={() => this._removeItems()}>
        </DeleteDialog>
        {this.state.todoItems.map(item => (
          <div key={item.id} className={s.todoItem}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.isCompleted}
                  onChange={() => this._changeStatusCheckBox(item)}
                  value={item.value}
                />
              }
              className={item.isCompleted ? s.completedItem : ``}
              label={item.value}
            />
            <IconButton
              variant="contained"
              color="secondary"
              onClick={() => this.setState({isModalOpen: true, title: item.value, idItem: item.id})}
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
            }}
            onKeyPress={(event) => { // when a keyboard is pressed
              if (event.key === 'Enter' && this.state.newItem) {
                this.setState({
                  todoItems: [
                    ...this.state.todoItems,
                    {
                      id: this.state.todoItems.length + 1,
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
