import { SET_LOADING } from "../actionTypes"

let InitialState = {
    loading: false
}

export const validate = (state = InitialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.payload }
        default:
            return state
    }
}