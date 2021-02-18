import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { downloadHighscore } from './actions/scoreAction'

import Game60K from './pages/Game'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

import githubIcon from "./imgs/github.png"
import "./styles/app.css"

const mapStateToProps = (state) => ({
  isSignedIn: state.login.isAuthUser,
})

const mapDispatchToProps = (dispatch) => ({
  downloadScores: () => dispatch(downloadHighscore()),
})

const App = ({isSignedIn, downloadScores}) => {
  
  useEffect(() => {
    // download history
    // console.log("[App] download scores ...")
    downloadScores()
  }, [downloadScores])

  return (
    <BrowserRouter>
      <Container fluid>
        <Switch>
          <Route exact path="/signin">
            {
              isSignedIn ?  <Redirect to="/" /> : <Signin /> 
            }
          </Route>
          <Route exact path="/signup">
            {
              isSignedIn ?  <Redirect to="/" /> : <Signup /> 
            }
          </Route>
          <Route path="/">
            <Game60K />
          </Route>
        </Switch>
        <footer className="border-top border-info pt-3 my-md-5">
          <Row>
            <Col className="text-center" sm={6}>
              <h5>
                <a href="https://github.com/yeahCH/playing-card" target="_blank"><img src={githubIcon} alt="github.com/yeahch/playing-card" style={{width: '36px', marginRight: '10px'}}/></a>
                @yeahch : 2020
              </h5>
            </Col>

            <Col className="text-left" sm={3}>
              <h5>Features</h5>
              <ul className="list-unstyled">
                <li>ReactJS</li>
                <li>Redux</li>
                <li>PWA</li>
                <li>RestAPI</li>
              </ul>
            </Col>

            <Col className="text-left" sm={3}>
              <h5>Pages</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-dark">Home</Link></li>
                <li><Link to="/signup" className="text-dark">Sign-up</Link></li>
                <li><Link to="/signin" className="text-dark">Sign-in</Link></li>
                <li>Score board</li>
              </ul>
            </Col>
          </Row>
        </footer>
      </Container>
    </BrowserRouter>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
