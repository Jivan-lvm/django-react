import React, { useState } from 'react'
import axios from 'axios'

const SellCryptoComponent = () => {
	const [crypto, setCrypto] = useState('')
	const [message, setMessage] = useState('')

	const handleSell = async () => {
		try {
			const response = await axios.post('/api/sell', {
				jivan: crypto,
			})
			setMessage(response.data.success || response.data.error)
		} catch (error) {
			setMessage('Ошибка при продаже')
		}
	}

	return (
		<div>
			<h2>Продажа криптовалюты</h2>
			<input
				type='number'
				value={crypto}
				onChange={e => setCrypto(e.target.value)}
				placeholder='Введите количество криптовалюты'
			/>
			<button onClick={handleSell}>Продать</button>
			{message && <p>{message}</p>}
		</div>
	)
}

export default SellCryptoComponent
