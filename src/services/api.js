import { create } from 'apisauce'

const _api = create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  timeout: 30000,
})

// any 401 error means session expired or login info invalid, should set loggedIn false
const loginMonitor = (response) => {
  if (response.status === 401) {
    console.log('NOT AUTHORISED!')
  }
}
_api.addMonitor(loginMonitor)

export const setApiAuth = token => _api.setHeader('Authorization', token)
export const api = _api
