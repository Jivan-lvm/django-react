import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/auth'

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const { email, password } = formData

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = e => {
		e.preventDefault()
		login(email, password)
	}

	if (isAuthenticated) {
		return <Navigate to='/' />
	}

	return (
		<div className='container mt-5'>
			<h1>Войти</h1>
			<p>Войти в аккаунт</p>
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
				<div className='form-group'>
					<input
						className='form-control'
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={onChange}
						minLength='6'
						required
					/>
				</div>
				<button className='btn btn-primary' type='submit'>
					Войти
				</button>
			</form>
			<p className='mt-3'>
				Нет аккаунта? <Link to='/signup'>Зарегистрироваться</Link>
			</p>
			<p className='mt-3'>
				Забыли пароль? <Link to='/reset-password'>Сменить пароль</Link>
			</p>
		</div>
	)
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login)
