import React, {useState} from 'react';
import { Link, redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
			<div className='container mt-5'>
				<h1>Войти</h1>
				<p>Войти в аккаунт</p>
				<form onSubmit={e => onSubmit(e)}>
					<div className='form-group'>
						<input
							className='form-control'
							type='email'
							placeholder='Email'
							name='email'
							value={email}
							onChange={e => onChange(e)}
							required
						/>
					</div>
					<div className='form-group'>
						<input
							className='form-control'
							type='password'
							placeholder='password'
							name='password'
							value={password}
							onChange={e => onChange(e)}
							minLength='6'
							required
						/>
					</div>
					<button className='btn btn-primary' type='submit'>
						Войти
					</button>
				</form>
				<p className='mt-3'>
					Нет аккаунта? <Link to=' /signup'>Зарегистрироваться</Link>
				</p>
				<p className='mt-3'>
					Забыли пароль? <Link to=' /reset-password'>Сменить пароль</Link>
				</p>
			</div>
		)
};

export default connect(null, { }) (Login);
