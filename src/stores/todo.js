import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

import randomstring from 'randomstring'

export default class TodoStore {
  @persist('list') @observable.ref todoItems = []

  @action setCompleted = (item) => {
    this.todoItems = this.todoItems.map((listItem) => {
      if (listItem.id === item.id) listItem.isCompleted = !item.isCompleted
      return listItem
    })
  }

  @action remove = (item) => {
    this.todoItems = this.todoItems.filter(listItem => listItem.id !== item.id)
  }

  @action add = (newItem) => {
    this.todoItems = [
      ...this.todoItems,
      {
        id: randomstring.generate(), // generate unique identifier
        value: newItem,
        isCompleted: false,
      },
    ]
  }
}
