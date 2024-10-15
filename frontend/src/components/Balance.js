import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BalanceComponent = () => {
	const [balanceUSDT, setBalanceUSDT] = useState(0)
	const [balanceCrypto, setBalanceCrypto] = useState(0)

	useEffect(() => {
		const fetchBalance = async () => {
			try {
				const response = await axios.get('/api/user-balance')
				setBalanceUSDT(response.data.balance_usdt)
				setBalanceCrypto(response.data.balance_crypto)
			} catch (error) {
				console.log('Ошибка при получении баланса')
			}
		}

		fetchBalance()
	}, [])

	return (
		<div>
			<h3>Баланс USDT: {balanceUSDT}</h3>
			<h3>Баланс криптовалюты Jivan: {balanceCrypto}</h3>
		</div>
	)
}

export default BalanceComponent
