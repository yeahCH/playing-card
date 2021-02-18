import axios from 'axios'

export const SCORE_UPLOAD_PENDING = 'SCORE_UPLOAD_PENDING'
export const SCORE_UPLOAD_COMPLETE = 'SCORE_UPLOAD_COMPLETE'
export const SCORE_UPLOAD_FAILED = 'SCORE_UPLOAD_FAILED'

export const uploadScoreStart = () => ({
  type: SCORE_UPLOAD_PENDING
})

export const uploadScoreDone = (scores) => ({
  type: SCORE_UPLOAD_COMPLETE,
  payload: scores
})

export const uploadScoreFailed = () => ({
  type: SCORE_UPLOAD_FAILED
})

export function uploadScore(point, tokens) {
  return async dispatch => {
    // console.log("[App] uploading ...")
    dispatch(uploadScoreStart())

    try {
      const params = {
        point: point
      }

      const resp = await axios.post('https://api60k.herokuapp.com/scores', params, {
        headers: tokens
      })

      // console.log("resp: ", resp.data)
      dispatch(uploadScoreDone(resp.data.scores))
    } catch(err) {
      dispatch(uploadScoreFailed())
    }
  }
}

export function downloadHighscore() {
  return async dispatch => {
    // console.log("[App] downloading ...")
    dispatch(uploadScoreStart())

    try {
      const resp = await axios.get('https://api60k.herokuapp.com/scores')

      // console.log("resp: ", resp.data)
      dispatch(uploadScoreDone(resp.data.scores))
    } catch(err) {
      dispatch(uploadScoreFailed())
    }
  }
}