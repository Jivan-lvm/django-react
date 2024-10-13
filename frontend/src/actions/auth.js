import axios from 'axios'
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	AUTHENTICATED_FAIL,
	AUTHENTICATED_SUCCESS,
	LOGOUT
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

export const logout = () => dispatch => {
	dispatch({
		type: LOGOUT
	})
}
