import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Form, Button, Alert, Spinner  } from 'react-bootstrap'
import { performSignup } from '../actions/loginAction'
import { validateEmail } from '../utils/auth'

const mapStateToProps = (state) => ({
  pending: state.login.pending,
  hasErrors: state.login.hasErrors,
  errorMsgs: state.login.errors
})

const mapDispatchToProps = (dispatch) => ({
  signup: (u, e, p) => dispatch(performSignup(u, e, p))
})

const Signup = ({pending, hasErrors, errorMsgs, signup}) => {
  const style = {
    height: '70vh'
  }
  const formSignStyle = {
    maxWidth: '330px'
  }

  useEffect(() => {
    setInputErrors([])
  }, [])
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [username, setUsername] = useState('')
  const [inputErrors, setInputErrors] = useState([])

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const onSubmit = (e) => {
    // console.log("[App] Trying to sign up...")
    e.preventDefault()

    let errorsList = []
    if(username.length < 3) errorsList = [...errorsList, "Username too short (<3)"]
    if(!validateEmail(email)) errorsList = [...errorsList, "Invalid email address"]
    if(password.length < 8) errorsList = [...errorsList, "Password should (<8)"]
    if(password !== passwordConfirm) errorsList = [...errorsList, "Password incorrect"]

    if(errorsList.length === 0) {
      setInputErrors([])
      signup(username, email, password)
    } else {
      setInputErrors(errorsList)
    }
  }

  return (
    <Row>
      <Col sm={12} style={style} className="d-flex justify-content-center align-items-center">
        <div style={formSignStyle} className="w-100">
          <Form className="p-3 border border-info rounded bg-info">
            <div className="d-flex align-items-center justify-content-center">
              <h3 className="text-center mt-3">Sign up</h3>
              { pending && (<Spinner animation="border" size="sm" className="ml-3 mt-2 align-items-center" />) }
            </div>
            { 
              (inputErrors.length > 0) && (<Alert variant="danger">
                <ul className="my-0 mx-0">
                  { inputErrors.map((e, id) => <li key={id}> {e} </li>) }
                </ul>
              </Alert>)
            }
            { hasErrors && (<Alert variant="danger">
                <ul className="my-0 mx-0">
                  { errorMsgs.map((e, id) => <li key={id}> {e} </li>) }
                </ul>
            </Alert>) }
            <Form.Control type="text" placeholder="Username *" name="username" className="mt-3" onChange={handleUsernameChange} value={username}/>
            <Form.Control type="email" placeholder="Email *" name="email" className="mt-3" onChange={handleEmailChange} value={email}/>
            <Form.Control type="password" placeholder="Password *" name="password"  className="mt-3" onChange={handlePasswordChange} value={password}/>
            <Form.Control type="password" placeholder="Confirm Password *" name="password-again"  className="mt-3" onChange={handlePasswordConfirmChange} value={passwordConfirm}/>
            <Button className="mt-3" variant="primary" block onClick={onSubmit}>Submit</Button>
          </Form>

          <div className="text-center mt-5"><Link to="/signin" className="text-dark"><h5>Sign-in</h5></Link></div>
          <div className="text-center mt-3"><Link to="/" className="text-dark"><h5>Home</h5></Link></div>
        </div>
      </Col>
    </Row>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
