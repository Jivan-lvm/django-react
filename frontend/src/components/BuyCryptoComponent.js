import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { checkAuthenticated } from '../actions/auth'

const BuyCryptoComponent = ({ onTransactionComplete }) => {
	const [usdt, setUsdt] = useState('')
	const [message, setMessage] = useState('')
	const [authenticated, setAuthenticated] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		const verifyToken = async () => {
			const isAuthenticated = await dispatch(checkAuthenticated())
			setAuthenticated(isAuthenticated)
		}

		verifyToken()
	}, [dispatch])

	const handleBuy = async () => {
		if (!authenticated) {
			setMessage('Недействительный токен. Пожалуйста, войдите снова.')
			return
		}

		try {
			const token = localStorage.getItem('access')
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}

			const response = await axios.post(
				'http://127.0.0.1:8000/api/buy',
				{ usdt: usdt },
				config
			)

			setMessage(response.data.success || response.data.error)

			if (response.data.success) {
				onTransactionComplete()
			}
		} catch (error) {
			console.error('Ошибка при покупке:', error)
			setMessage(error.response?.data?.error || 'Ошибка при покупке')
		}
	}

	const handleInputChange = e => {
		const value = e.target.value
		if (value === '' || (/^\d+$/.test(value) && Number(value) > 0)) {
			setUsdt(value)
		}
	}

	return (
		<div>
			<h2>Покупка криптовалюты</h2>
			<input
				type='number'
				value={usdt}
				onChange={handleInputChange}
				placeholder='Введите сумму USDT'
			/>
			<button onClick={handleBuy}>Купить</button>
			{message && <p>{message}</p>}
		</div>
	)
}

export default BuyCryptoComponent
