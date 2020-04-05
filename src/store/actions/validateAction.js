import { SET_LOADING } from "../actionTypes"
import { Alert } from 'react-native'
import axios from 'axios'

export const setLoading = (status) => {
    return {
        type: SET_LOADING,
        payload: status
    }
}

export const encodeBoard = (board) => {
    return dispatch => {
        board.reduce((result, row, i) =>
            result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
    }
}


export const encodeParams = (params) => {
    return dispatch => {
        Object.keys(params)
            .map(key => key + '=' + `%5B${dispatch(encodeBoard(params[key]))}%5D`)
            .join('&');
    }
}

export const validateAnswer = (payload) => {
    console.log({board: payload})
    return dispatch => {
        dispatch(setLoading(true))
        axios
            .post(`https://sugoku.herokuapp.com/validate`, dispatch(encodeParams({ board: payload })))
            .then(({ data }) => {
                if (data.status === 'solved') Alert.alert('Status', 'Congratulation you solved the sudoku')
                else Alert.alert('Status', 'Wrong Answer, Please Retry')
                console.log(data)
            })
            .catch(({ response }) => {
                console.log(response)
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }
}