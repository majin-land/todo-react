import qs from 'qs'
import { api } from './api'

export default {
  fetchTodo: query => api.get(`/todo?${qs.stringify(query)}`),
  fetchTodoInfo: id => api.get(`/todo/${id}`),
  addTodo: todo => api.post('/todo', todo),
  updateTodo: todo => api.put(`/todo/${todo.id}`, todo),
  deleteTodo: id => api.delete(`/todo/${id}`),
}
