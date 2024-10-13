import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { reset_password } from '../actions/auth'

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false)
	const [formData, setFormData] = useState({
		email: ''
	})

	const { email } = formData

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = e => {
		e.preventDefault()
		reset_password(email)
        setRequestSent(true)
	}

	if (requestSent) {
		return <Navigate to='/' />
	}

	return (
		<div className='container mt-5'>
			<h1>Смена пароля</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						className='form-control'
						type='email'
						placeholder='Email'
						name='email'
						value={email}
						onChange={onChange}
						required
					/>
				</div>
				<button className='btn btn-primary' type='submit'>
					Сменить пароль
				</button>
			</form>
		</div>
	)
}

export default connect(null, { reset_password })(ResetPassword)
