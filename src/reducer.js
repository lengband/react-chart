// 合并所以reducer
import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatuser } from './redux/chartuser.redux'

export default combineReducers({ user, chatuser })
