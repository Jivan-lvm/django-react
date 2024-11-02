import React, { useState, useEffect } from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts'
import axios from 'axios'

const CurrencyChart = () => {
	const [data, setCurrencyData] = useState([])

	useEffect(() => {
		const fetchCurrencyHistory = async () => {
			try {
				const response = await axios.get(
					'http://127.0.0.1:8000/api/currency-history'
				)
				const currencyData = response.data.results
				setCurrencyData(currencyData)
			} catch (error) {
				console.error('Ошибка загрузки данных:', error)
			}
		}

		fetchCurrencyHistory()
		const interval = setInterval(fetchCurrencyHistory, 1000)

		return () => clearInterval(interval)
	}, [])

	return (
		<ResponsiveContainer width='100%' height={400}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='timestamp' />
				<YAxis domain={[0, 10]} />
				<Tooltip />
				<Legend />
				<Line
					type='monotone'
					dataKey='price_usdt'
					stroke='#8884d8'
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}

export default CurrencyChart
