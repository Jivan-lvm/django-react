import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	AUTHENTICATED_FAIL,
	AUTHENTICATED_SUCCESS,
	LOGOUT,
	PASSWORD_RESET_CONFIRM_FAIL,
	PASSWORD_RESET_SUCCESS,
	PASSWORD_RESET_FAIL,
	PASSWORD_RESET_CONFIRM_SUCCESS,
	SIGNUP_FAIL,
	SIGNUP_SUCCESS,
	TOKEN_REFRESH_SUCCESS
} from '../actions/types'

const initialState = {
	access: localStorage.getItem('access'),
	refresh: localStorage.getItem('refresh'),
	user: null,
	isAuthenticated: false,
}

export default function(state = initialState, action){
    const { type, payload } = action;

    switch (type) {
			case AUTHENTICATED_SUCCESS:
				return {
					...state,
					isAuthenticated: true,
				}
			case LOGIN_SUCCESS:
				localStorage.setItem('access', payload.access)
				localStorage.setItem('refresh', payload.refresh)
				return {
					...state,
					access: payload.access,
					refresh: payload.refresh,
					isAuthenticated: true,
				}
			case SIGNUP_SUCCESS:
				return {
					...state,
					isAuthenticated: false,
				}
			case LOAD_USER_SUCCESS:
				return {
					...state,
					user: payload,
				}
			case AUTHENTICATED_FAIL:
				return {
					...state,
					isAuthenticated: false,
				}
			case LOAD_USER_FAIL:
				return {
					...state,
					user: null,
				}
			case TOKEN_REFRESH_SUCCESS:
				localStorage.setItem('access', payload.access)
				return {
					...state,
					access: payload.access,
				}
			case LOGIN_FAIL:
			case LOGOUT:
			case SIGNUP_FAIL:
				localStorage.removeItem('access')
				localStorage.removeItem('refresh')
				return {
					...state,
					access: null,
					refresh: null,
					user: null,
					isAuthenticated: false,
				}
			case PASSWORD_RESET_SUCCESS:
			case PASSWORD_RESET_FAIL:
			case PASSWORD_RESET_CONFIRM_SUCCESS:
			case PASSWORD_RESET_CONFIRM_FAIL:
			case SIGNUP_FAIL:
			case SIGNUP_SUCCESS:
				return {
					...state,
				}
			default:
				return state
		}
};