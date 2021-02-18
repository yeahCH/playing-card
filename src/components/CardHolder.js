import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Fade, Col } from "react-bootstrap"

import Card from "./Card"
import BlankCard from "./BlankCard"
import BackCard from "./BackCard"

import styles from "../styles/card-holder.module.css"

import { resetPickupCard, 
  pickupFirstCard, 
  pickupSecondCard, 
  removeFirstCard, 
  removeSecondCard,
  openCenterCard,
  checkGameOver,
} from "../actions/logicActions"

const mapStateToProps = (state) => ({
  holdersState: state.logic.holdersState,
  firstId: state.logic.firstSelectedId,
  secondId: state.logic.secondSelectedId
})

const mapDispatchToProps = (dispatch) => ({
  resetPickup: () => dispatch(resetPickupCard()),
  pickupFirst: (id) => dispatch(pickupFirstCard(id)),
  pickupSecond: (id) => dispatch(pickupSecondCard(id)),
  removeFirst: (id) => dispatch(removeFirstCard(id)),
  removeSecond: (id) => dispatch(removeSecondCard(id)),
  changeCenterState: () => dispatch(openCenterCard()),
  checkOver: () => dispatch(checkGameOver()),
})

const CardHolder = ({id, holdersState, firstId, secondId, 
  resetPickup, pickupFirst, pickupSecond, removeFirst, removeSecond, changeCenterState, checkOver}) => {
  const cardsCount = holdersState[id].cardsData.length;
  const topCard = cardsCount > 0 ? holdersState[id].cardsData[cardsCount-1] : null;
  const active = ((id === firstId) || (id === secondId));
  const [fadeCardIn, setFadeCardIn] = useState(true);

  useEffect(() => {
    if((firstId !== -1) && (secondId !== -1) && (secondId === id)) {
      var firstCard = holdersState[firstId].cardsData[holdersState[firstId].cardsData.length-1];
      var secondCard = holdersState[secondId].cardsData[holdersState[secondId].cardsData.length-1];
      if(firstCard.number !== secondCard.number) {
        resetPickup();
        return;
      }
      setTimeout(() => {
        removeFirst(firstId);
        removeSecond(secondId);
        changeCenterState();
        checkOver();
     }, 300);
    }
  }, [firstId, secondId]);

  useEffect(() => {
    // start fade-out, to update card
    setFadeCardIn(false);
  }, [topCard]);

  const compareCards = (lastSelectedId) => {
      if(firstId === -1) {
        pickupFirst(lastSelectedId);
        return;
      }
      pickupSecond(lastSelectedId);
  }
  
  return(
    <Fade in={fadeCardIn} timeout={3000} onExited={() => setFadeCardIn(true)}>
      <Col className={styles.cardHolder + "d-flex mb-1 mx-0 px-1 mx-lg-2 flex-1"}>
        {((holdersState[id].enable === true) && (cardsCount > 0)) && (
          <Card card={topCard} active={active} id={id} pickup={compareCards}/>
        )}
        {(holdersState[id].enable === false) && (cardsCount > 0) && (
          <BackCard />
        )}
        {(cardsCount === 0) && (
          <BlankCard />
        )}
      </Col>
    </Fade>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CardHolder)
