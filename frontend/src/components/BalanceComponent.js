import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const BalanceComponent = () => {
	const [balanceUSDT, setBalanceUSDT] = useState(0)
	const [balanceCrypto, setBalanceCrypto] = useState(0)

	const fetchBalance = useCallback(async () => {
		try {
			const token = localStorage.getItem('access')
			if (!token) {
				console.log('Токен не найден')
				return
			}

			console.log('Токен:', token)

			const response = await axios.get(
				`${process.env.REACT_APP_API_BALANCE_URL}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			setBalanceUSDT(response.data.balance_usdt)
			setBalanceCrypto(response.data.balance_crypto)
		} catch (error) {
			console.log('Ошибка при получении баланса:', error)
		}
	}, [])

	useEffect(() => {
		fetchBalance()
	}, [fetchBalance])

	return (
		<div>
			<h3>Баланс USDT: {balanceUSDT}</h3>
			<h3>Баланс криптовалюты Jivan: {balanceCrypto}</h3>
		</div>
	)
}

export default BalanceComponent
