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
				const response = await axios.get('/api/currency-history')
				const currencyData = response.data.results
				console.log('Currency History:', currencyData)
				setCurrencyData(currencyData)
			} catch (error) {
				console.error('Ошибка загрузки данных:', error)
			}
		}

		fetchCurrencyHistory()
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
