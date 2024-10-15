import React, { useState } from 'react'
import axios from 'axios'

const BuyCryptoComponent = () => {
	const [usdt, setUsdt] = useState('')
	const [message, setMessage] = useState('')

	const handleBuy = async () => {
		try {
			const response = await axios.post('/api/buy', {
				usdt: usdt,
			})
			setMessage(response.data.success || response.data.error)
		} catch (error) {
			setMessage('Ошибка при покупке')
		}
	}

	return (
		<div>
			<h2>Покупка криптовалюты</h2>
			<input
				type='number'
				value={usdt}
				onChange={e => setUsdt(e.target.value)}
				placeholder='Введите сумму USDT'
			/>
			<button onClick={handleBuy}>Купить</button>
			{message && <p>{message}</p>}
		</div>
	)
}

export default BuyCryptoComponent
