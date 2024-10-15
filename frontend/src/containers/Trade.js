import React from 'react'
import BuyCryptoComponent from '../components/Buy'
import SellCryptoComponent from '../components/Sell'
import BalanceComponent from '../components/Balance'
import CurrencyChart from '../components/Graph'

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
