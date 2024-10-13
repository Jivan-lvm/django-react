import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => (
	<div className='container'>
		<div class='jumbotron mt-5'>
			<h1 class='display-4'>Jivan's Birzha</h1>
			<hr class='my-4' />
			<p>Авторизация</p>
			<Link class='btn btn-primary btn-lg'  to='/login' role='button'>
				Login
			</Link>
		</div>
	</div>
)

export default Home;
