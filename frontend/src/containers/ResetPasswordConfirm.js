import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { reset_password_confirm } from '../actions/auth'

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
	const [requestSent, setRequestSent] = useState(false)
	const [formData, setFormData] = useState({
		new_password: '',
        re_new_password: ''
	})

	const { new_password, re_new_password } = formData

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = e => {
		e.preventDefault()

        const uid = match.uid
        const token = match.token

		reset_password_confirm(uid, token, new_password, re_new_password)
		setRequestSent(true)
	}

	if (requestSent) {
		return <Navigate to='/' />
	}

	return (
		<div className='container mt-5'>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						className='form-control'
						type='password'
						placeholder='New password'
						name='new_password'
						value={new_password}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						className='form-control'
						type='password'
						placeholder='Confirm New Password'
						name='re_new_password'
						value={re_new_password}
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm)
