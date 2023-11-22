import axios from 'axios'
import { FETCH_USER, FETCH_SURVEYS} from './types'

//action creator for getting the user
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/curr_user')
    dispatch({ type: FETCH_USER, payload: res.data})
}

//action creator for checking given strip token
export const handelToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token)
    dispatch({ type: FETCH_USER, payload: res.data})
}

//action creator for submitting the survey
export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values)

    //this takes the user back to the dashboard component 
    history.push('/surveys')

    dispatch({ type: FETCH_USER, payload: res.data})
}

//action creator for retrieving survey from the Data base 
export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys')

    dispatch({type: FETCH_SURVEYS, payload: res.data})
}
