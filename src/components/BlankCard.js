import React from 'react'
import styles from "../styles/blank-card.module.css"
const cardImages = require.context('../imgs/cards')

export default () => {
  const imageFileName = () => {
    return "BLANK.png"
  }

  return (
    <div className={styles.blankCard + " flex-1"}>
      <img className={styles.cardImage} src={cardImages(`./${imageFileName()}`)} alt={imageFileName()} />
    </div>
  )
}