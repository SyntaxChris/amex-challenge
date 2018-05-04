import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware'
import {
  FETCHING,
  HANDLE_FETCH_ERROR,
  REQUEST
} from './types'

// export const clearCharacter = () => ({
//   type: CLEAR_CHARACTER,
//   payload: null
// })

// export const clearError = () => ({
//   type: CLEAR_ERROR,
//   payload: null
// })

// export const clearFilms = () => ({
//   type: CLEAR_FILMS,
//   payload: null
// })

// export const fetchCharacter = url => dispatch => {
//   // show table loader
//   dispatch(fetchingFilms(true))
//   // fetch character url
//   return dispatch({
//     [CALL_API] : {
//       endpoint : url,
//       method   : 'GET',
//       types    : [REQUEST, FETCH_CHARACTER, HANDLE_FETCH_ERROR]
//     }
//   }).then((res) => {
//     if (res.payload.name !== 'ApiError') {
//       // clear last characters films
//       dispatch(clearFilms())
      
//       return res.payload.films
//     }
//   }).then((films) => {
//     if (films) { fetchFilms(films, dispatch) }
//   })
// }

// export const fetchingFilms = fetching => ({
//   type: FETCHING_FILMS,
//   payload: fetching
// })

// export const fetchFilms = (filmUrls, dispatch) => {  
//   const filmsToFetch = []

//   filmUrls.forEach(filmUrl => dispatch({
//     [CALL_API] : {
//       endpoint : filmUrl,
//       method   : 'GET',
//       types    : [REQUEST, ADD_FILM, HANDLE_FETCH_ERROR]
//     }
//   }))

//   return Promise.all(filmsToFetch)
//     .then(() => dispatch(fetchingFilms(false))) // hide table loader after all films are fetched
// }
