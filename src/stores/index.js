import { create } from 'mobx-persist'
import { RouterStore } from 'mobx-react-router'

import NotificationStore from './notification'
import TodoStore from './todo'

class RootStore {
  constructor() {
    this.routing = new RouterStore()
    this.notificationStore = new NotificationStore()
    this.todoStore = new TodoStore()
  }
}

const hydrate = create({
  storage: localStorage,
  jsonify: true,
})

export const hydrateAll = (rootStore) => {
  return Promise.all([
    hydrate('todoItems', rootStore.todoStore),
  ])
}

export const rootStore = new RootStore()
