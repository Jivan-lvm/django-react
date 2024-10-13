import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {
    const guestLink = () => (
			<Fragment>
				<li className='nav-item'>
					<Link className='nav-link' to='/login'>
						Авторизация
					</Link>
				</li>
				<li className='nav-item'>
					<Link className='nav-link' to='/signup'>
						Регистрация
					</Link>
				</li>
			</Fragment>
		)

    const authLink = () => (
			<Fragment>
				<li className='nav-item'>
					<a className='nav-link' href='#!' onClick={logout}>
						Выход
					</a>
				</li>
			</Fragment>
		)

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Jivan's Birzha</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Главная</Link>
                        </li>
                        {isAuthenticated ? authLink():guestLink()}
                    </ul>
                </div>
            </div>
        </nav>
    )
};

const mapStateToProps = (state) =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar)