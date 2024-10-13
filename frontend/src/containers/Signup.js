import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { signup } from '../actions/auth'

const Signup = ({ signup, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
        re_password: ''
	})

	const { email, password, re_password } = formData

    const [accountCreated, setAccountCreated] = useState(false)

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = e => {
		e.preventDefault()

        if(password === re_password){
            signup(email, password, re_password)
            setAccountCreated(true)
        }
	}

	if (isAuthenticated) {
		return <Navigate to='/' />
	}
    if(accountCreated){
        return <Navigate to='/login' />
    }

	return (
		<div className='container mt-5'>
			<h1>Зарегистрировать аккаунт</h1>
			<p>Регистрация</p>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						className='form-control'
						type='email'
						placeholder='Email*'
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
						placeholder='Password*'
						name='password'
						value={password}
						onChange={onChange}
						minLength='6'
						required
					/>
				</div>
				<div className='form-group'>
					<input
						className='form-control'
						type='password'
						placeholder='Confirm Password*'
						name='re_password'
						value={re_password}
						onChange={onChange}
						minLength='6'
						required
					/>
				</div>
				<button className='btn btn-primary' type='submit'>
					Зарегистрироваться
				</button>
			</form>
			<p className='mt-3'>
				Есть аккаунт? <Link to='/login'>Войти</Link>
			</p>
		</div>
	)
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { signup })(Signup)
