import { observable, action } from 'mobx'

export default class NotificationStore {
  @observable success = null
  @observable error = null

  @action setError = (message) => {
    this.error = message
  }

  @action clearError = () => {
    this.error = ''
  }

  @action setSuccess = (message) => {
    this.success = message
  }

  @action clearSuccess = () => {
    this.success = ''
  }
}
