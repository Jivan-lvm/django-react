import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Activate from './containers/Activate'
import ResetPassword from './containers/ResetPassword'
import ResetPasswordConfirm from './containers/ResetPasswordConfirm'
import Trade from './containers/Trade'
import Layout from './hocs/Layout'
import { Provider } from 'react-redux'
import store from './Store'

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/activate/:token' element={<Activate />} />
          <Route exact path='/reset_password' element={<ResetPassword />} />
          <Route exact path='/trade' element={<Trade />} />
          <Route
            exact
            path='password/reset/confirm/:uid/:token'
            element={<ResetPasswordConfirm />}
          />
        </Routes>
      </Layout>
    </Router>
  </Provider>
)

export default App
