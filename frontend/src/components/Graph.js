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
	const [data, setData] = useState([])

	useEffect(() => {
		axios
			.get('/api/currency-history')
			.then(response => {
				setData(response.data)
			})
			.catch(error => console.error(error))
	}, [])

	return (
		<ResponsiveContainer width='100%' height={400}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='timestamp' />
				<YAxis />
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
