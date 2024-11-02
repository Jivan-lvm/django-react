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
	SIGNUP_SUCCESS,
	TOKEN_REFRESH_SUCCESS
} from './types'

export const handleRefreshToken = async dispatch => {
	const refresh = localStorage.getItem('refresh')
	if (!refresh) {
		dispatch({ type: AUTHENTICATED_FAIL })
		return false
	}

	try {
		const res = await axios.post(`${process.env.REACT_APP_API_REFRESH_URL}`, {
			refresh,
		})
		if (res.status === 200) {
			localStorage.setItem('access', res.data.access)
			dispatch({ type: TOKEN_REFRESH_SUCCESS, payload: res.data })
			dispatch({ type: AUTHENTICATED_SUCCESS })
			return true
		} else {
			dispatch({ type: AUTHENTICATED_FAIL })
			return false
		}
	} catch (err) {
		console.error('Ошибка при обновлении токена:', err.response?.data)
		dispatch({ type: AUTHENTICATED_FAIL })
		return false
	}
}

export const checkAuthenticated = () => async dispatch => {
	const accessToken = localStorage.getItem('access')

	if (accessToken) {
		try {
			const res = await axios.post(
				'http://127.0.0.1:8000/api/v1/auth/jwt/verify/',
				{
					token: accessToken,
				}
			)
			if (res.status === 200) {
				dispatch({ type: AUTHENTICATED_SUCCESS })
				return true
			} else {
				return await handleRefreshToken(dispatch)
			}
		} catch (err) {
			console.error('Ошибка проверки токена:', err.response?.data)
			return await handleRefreshToken(dispatch)
		}
	} else {
		dispatch({ type: AUTHENTICATED_FAIL })
		return false
	}
}

const API_URL =
	'http://127.0.0.1:8000/api/v1/auth'

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
