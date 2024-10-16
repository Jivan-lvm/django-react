import React from 'react'
import BuyCryptoComponent from '../components/BuyCryptoComponent'
import SellCryptoComponent from '../components/SellCryptoComponent'
import BalanceComponent from '../components/BalanceComponent'
import CurrencyChart from '../components/CurrencyChart'

const TradePage = () => {
	return (
		<div>
			<h1>Торговля криптовалютой</h1>
			<BalanceComponent />
			<CurrencyChart />
			<BuyCryptoComponent />
			<SellCryptoComponent />
		</div>
	)
}

export default TradePage
