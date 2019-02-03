import React, { Component } from 'react'

import {
  Paper,
  IconButton,
  Icon,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@material-ui/core'
import DeleteDialog from '../delete-dialog/index'
import s from './styles.scss'

class TodoPage extends Component {
  state = {
    todoItems: [],
    newItem: '',
    modal: false,
    title: '',
    actionItem: ''
  }

  render() {
    return (
      <Paper className={s.container}>
        {/* {this.renderDelete()} */}
        <DeleteDialog open={this.state.modal} title={this.state.title} content={ `Anda akan menghapus ${this.state.title}`} onClose={() => {
            this.setState({modal:false})
        }}
        onAccept={
          () => {
            this.state.todoItems.splice(this.state.todoItems.indexOf(this.state.actionItem),1)
            this.setState({todoItems:this.state.todoItems})
            this.setState({modal:false})
          }
        }></DeleteDialog>
        <h1 style={{ textAlign: 'center' }}>Todo List</h1>
        {this.state.todoItems.map(item => (
          <div key={item.id} className={s.todoItem}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.isCompleted}
                  onChange={() => {
                    this.state.todoItems[this.state.todoItems.indexOf(item)].isCompleted = 
                    this.state.todoItems[this.state.todoItems.indexOf(item)].isCompleted ? false : true
                    this.setState({todoItems:this.state.todoItems})
                    // TODO: set this todo item as completed
                  }}
                  value = {item.value}
                />
              }
              label={item.value}
            />
            <IconButton
              variant="contained"
              color="secondary"
              onClick={() => {
                // TODO: remove this item from the list
                this.setState({modal:true, title: item.value, actionItem: item})
               
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
              this.setState({newItem: event.target.value})
              // TODO: record the change when user update the textfield
            }}

            onKeyPress={(event) => { // when a keyboard is pressed
              // when 'ENTER' is pressed
              if (event.key === 'Enter') {
                this.state.todoItems.push({
                  id: this.state.newItem,
                  value: this.state.newItem,
                  isCompleted: false
                })

                this.setState({
                  todoItems : this.state.todoItems,
                })
                // TODO: add the item user has enter into the list

                this.state.newItem =  ''
                // console.log(event.target.value)
                // TODO: reset new item text
                this.setState({
                  newItem : this.state.newItem
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
