import axios from 'axios'
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
	SIGNUP_SUCCESS
} from './types'

export const checkAuthenticated = () => async dispatch => {
	if (localStorage.getItem('access')){
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}

		const body = JSON.stringify({ token: localStorage.getItem('access') })

		try{
			const res = await axios.post(`${API_URL}/users/auth/token/verify/`, body, config)

			if (res.data.code !== 'token_not_valid'){
				dispatch({
                    type: AUTHENTICATED_SUCCESS,
                })
			} else{
				localStorage.removeItem('access')
				localStorage.removeItem('refresh')
				dispatch({
                    type: AUTHENTICATED_FAIL,
                })
			}
		} catch(err){
			localStorage.removeItem('access')
			localStorage.removeItem('refresh')
			dispatch({
                type: AUTHENTICATED_FAIL,
            })
		}

	} else{
		dispatch({
            type: AUTHENTICATED_FAIL,
        })
	}
}

const API_URL =
	process.env.REACT_APP_API_URL

console.log('API URL is:', API_URL)

export const load_user = () => async dispatch => {
	const token = localStorage.getItem('access')

	if (token) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
			},
		}

		try {
			const res = await axios.get(`${API_URL}/users/me/`, config)

			dispatch({
				type: LOAD_USER_SUCCESS,
				payload: res.data,
			})
		} catch (err) {
			dispatch({
				type: LOAD_USER_FAIL,
			})
		}
	} else {
		dispatch({
			type: LOAD_USER_FAIL,
		})
	}
}

export const login = (email, password) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}

	const body = JSON.stringify({ email, password })

	try {
		const res = await axios.post(`${API_URL}/jwt/create/`, body, config)

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		})

		dispatch(load_user())
	} catch (err) {
		dispatch({
			type: LOGIN_FAIL,
		})
	}
}

export const signup = (email, password, re_password) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}

	const body = JSON.stringify({ email, password, re_password })

	try {
		const res = await axios.post(`${API_URL}/users/`, body, config)

		dispatch({
			type: SIGNUP_SUCCESS,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: SIGNUP_FAIL,
		})
	}
}

export const reset_password = (email) => async dispatch => {
	const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const body = JSON.stringify({ email })

    try {
        await axios.post(`${API_URL}/users/reset_password/`, body, config)

        dispatch({
            type: PASSWORD_RESET_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL,
        })
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch =>{
	const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const body = JSON.stringify({ uid, token, new_password, re_new_password })

    try {
        await axios.post(`${API_URL}/users/reset_password_confirm/`, body, config)

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL,
        })
    }
}

export const logout = () => dispatch => {
	dispatch({
		type: LOGOUT
	})
}
