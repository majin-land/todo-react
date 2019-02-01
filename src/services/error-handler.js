export default (response, action, ...rest) => {
  switch (response.problem) {
  case 'CLIENT_ERROR':
  case 'SERVER_ERROR':
    if (response.data.meta != null) {
      if (response.data.meta.type == null && response.data.meta.message != null) {
        return action({
          code: 400,
          type: response.data.meta.type,
          message: response.data.meta.message,
        })
      }
      return action(response.data.meta, ...rest)
    }
    if (response.data && response.data.message) {
      return action({
        code: 400,
        type: 'externalError',
        message: response.data.message,
      })
    }
    return action({
      code: 400,
      type: 'externalError',
      message: 'External Error, please try again later',
    })
  case 'TIMEOUT_ERROR':
    return action({
      code: 0,
      type: 'connectionTimeout',
      message: 'Connection timeout, please check your network connection',
    })
  case 'CONNECTION_ERROR':
    return action({
      code: 0,
      type: 'dnsError',
      message: 'Cannot connect to server, please try again later',
    })
  case 'NETWORK_ERROR':
    return action({
      code: 0,
      type: 'networkUnavailable',
      message: 'Network unavailable, please check your network connection',
    })
  default:
    return action({
      code: 0,
      type: 'uncategorized',
      message: 'Unknown Error, please try again later',
    })
  }
}
