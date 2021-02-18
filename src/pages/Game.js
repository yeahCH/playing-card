import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, DropdownButton, Dropdown, Spinner } from 'react-bootstrap'
import CardHolder from "../components/CardHolder"
import CardSpare from "../components/CardSpare"
import Help from "../components/Help"
import Score from "../components/Score"

import { signOut } from '../actions/loginAction'
import { resetCardsStatus, appendScoreHistory, clearScoreHistory } from "../actions/logicActions"
import { uploadScore } from '../actions/scoreAction'

import initCardArray from "../utils/card"
import "../styles/app.css"

const mapStateToProps = (state) => ({
  score: state.logic.score,
  holdersState: state.logic.holdersState,
  gameOver: state.logic.gameOver,
  scoreHistory: state.logic.scoreHistory,
  isSignedIn: state.login.isAuthUser,
  authTokens: state.login.tokens,
  remoteScores: state.score.scores,
  scoreLoading: state.score.uploading
})

const mapDispatchToProps = (dispatch) => ({
  resetAllCardsStatus: (cardArray) => dispatch(resetCardsStatus(cardArray)),
  appendScore: (item) => dispatch(appendScoreHistory(item)),
  clearLocalScores: () => dispatch(clearScoreHistory()),
  uploadScoreToServer: (p, t) => dispatch(uploadScore(p, t)),
  signout: () => dispatch(signOut())
})

const Game60K = ({holdersState, score, gameOver, scoreHistory, resetAllCardsStatus, 
  appendScore, clearLocalScores, uploadScoreToServer, 
  isSignedIn, authTokens, signout,
  remoteScores, scoreLoading}) => {

  useEffect(() => {
    resetAllCardsStatus(initCardArray());
    // // console.log("[App] loading scores.");
  }, [])

  useEffect(() => {
    if(gameOver === true) {
      // append game history
      // // console.log("[App] saving score.")
      var scoreNewItem = {
        date: new Date(),
        score: score
      };
      appendScore(scoreNewItem);
      // upload score into backend
      uploadScoreToServer(score, authTokens);

      setShowGameOverModal(true);
    }
  }, [gameOver])

  const onClickResetHistory = () => {
    if(window.confirm("Are you sure to clear local history?") === true) {
      // // console.log("[App] clear history.");
      clearLocalScores();
    }
  }

  const onClickRestart = () => {
    if(window.confirm("Are you sure to restart this game?") === true) {
      resetAllCardsStatus(initCardArray());
    }
  }

  const onClickLogout = () => {
    if(window.confirm("Are you sure to sign out?") === true) {
      signout()
    }
  }

  const [showGameOverModal, setShowGameOverModal] = useState(false)
  const onCloseModal = () => setShowGameOverModal(false)

  const [showHelpModal, setShowHelpModal] = useState(false)
  const onCloseHelpModal = () => setShowHelpModal(false)

  return (
    <div>
      <Score score show={showGameOverModal} onClose={onCloseModal} />
      <Help show={showHelpModal} onClose={onCloseHelpModal} />

      <Row>
        <Col sm="12" md="10" lg="10" className="bg-info mt-2 rounded">
          <div className="d-flex justify-content-between align-items-center border-bottom border-primary mb-2 pt-2">
            <h1 className="text-warning">60K</h1>

            <div className="d-flex">
              { isSignedIn ?  <Button variant="warning" onClick={() => onClickLogout()}>Sign out</Button> : <Link to="/signin"><Button variant="warning">Sign-in</Button></Link> }
              
              <DropdownButton variant="primary" title="Game" className="px-2">
                <Dropdown.Item onClick={() => onClickRestart()}>New Game</Dropdown.Item>
                <Dropdown.Item onClick={() => onClickResetHistory()}>Clear history</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => setShowHelpModal(true)}>Help</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          
          {
            (holdersState.length > 0) && (
              <div>
                <Row className="mt-1">
                  <CardHolder id={0} key={0}/>
                  <CardHolder id={1} key={1}/>
                  <CardHolder id={2} key={2}/>
                  <CardHolder id={3} key={3}/>
                  <CardHolder id={4} key={4}/>
                </Row>
                <Row className="mt-1">
                  <CardHolder id={10} key={10}/>
                  <CardHolder id={11} key={11}/>
                  <CardHolder id={12} key={12}/>
                  <CardHolder id={13} key={13}/>
                  <CardHolder id={14} key={14}/>
                </Row>
                <Row className="mt-1">
                  <CardHolder id={5} key={5}/>
                  <CardHolder id={6} key={6}/>
                  <CardHolder id={7} key={7}/>
                  <CardHolder id={8} key={8}/>
                  <CardHolder id={9} key={9}/>
                </Row>
                <Row className="mt-3">
                  <CardSpare />
                  <Col className="mx-lg-4"></Col>
                  <CardHolder id={15} key={15} />
                  <Col className="mx-lg-4"></Col>
                  <Col className="mx-lg-4"></Col>
                </Row>
              </div>
            )
          }
        
        </Col>
        <Col sm="12" md="2" lg="2" className="mt-3 h-full">
          <h4 className="text-info">Score: </h4>
          <h2 className="text-white text-center">{score}</h2>
          <hr/>
          <h5 className="text-info">Remote Scores</h5>
          { scoreLoading && (
            <Spinner animation="border" variant="warning" className="ml-3 mt-2 align-items-center" />
          )
          }
          {
            remoteScores.filter((item, id) => id<3).map( (item, id) => (
              <div key={id}>
                <p>{item.username}</p>
                <h3 className="text-center">{item.point}</h3>
                <p>{new Date(item.at).toDateString()}</p>
              </div>
            ))
          }

          <hr/>
          <h5 className="text-info">Local Scores</h5>
          {
            scoreHistory.sort((a, b) => {
              return b.score - a.score
            }).filter((item, id) => id<3).map( (item, id) => (
              <div key={id}>
                <h3 className="text-center">{item.score}</h3>
                <p>{new Date(item.date).toDateString()}</p>
              </div>
            ))
          }
        </Col>
      </Row>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Game60K)
