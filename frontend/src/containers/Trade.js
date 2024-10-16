import React, { useState, useEffect } from 'react'
import BuyCryptoComponent from '../components/BuyCryptoComponent'
import SellCryptoComponent from '../components/SellCryptoComponent'
import BalanceComponent from '../components/BalanceComponent'
import CurrencyChart from '../components/CurrencyChart'
import axios from 'axios'

const TradePage = () => {
	const [balanceUSDT, setBalanceUSDT] = useState(0)
	const [balanceCrypto, setBalanceCrypto] = useState(0)

	const fetchBalance = async () => {
		try {
			const token = localStorage.getItem('access')
			const response = await axios.get(
				`${process.env.REACT_APP_API_BALANCE_URL}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			setBalanceUSDT(response.data.balance_usdt)
			setBalanceCrypto(response.data.balance_crypto)
		} catch (error) {
			console.error('Ошибка при получении баланса:', error)
		}
	}

	const handleTransactionComplete = async (usdtChange, cryptoChange) => {
		setBalanceUSDT(prev => prev + usdtChange)
		setBalanceCrypto(prev => prev + cryptoChange)
		await fetchBalance()
	}

	useEffect(() => {
		fetchBalance()
	}, [])

	return (
		<div>
			<h1>Торговля криптовалютой</h1>
			<BalanceComponent
				balanceUSDT={balanceUSDT}
				balanceCrypto={balanceCrypto}
			/>
			<CurrencyChart />
			<BuyCryptoComponent onTransactionComplete={handleTransactionComplete} />
			<SellCryptoComponent onTransactionComplete={handleTransactionComplete} />
		</div>
	)
}

export default TradePage
