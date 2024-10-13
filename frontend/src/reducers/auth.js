import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOGOUT
} from '../actions/types';

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
			case LOGIN_FAIL:
            case LOGOUT:
				localStorage.removeItem('access')
				localStorage.removeItem('refresh')
				return {
					...state,
					access: null,
					refresh: null,
					user: null,
					isAuthenticated: false,
				}
			default:
				return state
		}
};