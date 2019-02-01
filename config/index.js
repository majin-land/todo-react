import moment from 'moment'
import 'moment/locale/id'

moment.locale('id')

console.info(`version: ${__VERSION__} (${__ENV__})`)

export const errorMsgDuration = 10000 // in ms
export const successMsgDuration = 5000 // in ms
