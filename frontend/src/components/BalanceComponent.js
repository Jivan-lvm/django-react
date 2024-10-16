const BalanceComponent = ({ balanceUSDT, balanceCrypto }) => {
	return (
		<div>
			<h3>Баланс USDT: {balanceUSDT}</h3>
			<h3>Баланс криптовалюты Jivan: {balanceCrypto}</h3>
		</div>
	)
}

export default BalanceComponent
