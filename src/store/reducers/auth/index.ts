import { AuthActionEnum, AuthActions, IAuthState } from "./types";


const initialState: IAuthState = {
    isAuth: false,
    isLoading: false,
    isError: '',
    user: {
        password: '',
        username: ''
    }
}

function authReducer(state = initialState, action: AuthActions): IAuthState {
    switch (action.type) {
        case AuthActionEnum.SET_AUTH:
            return {...state, isAuth: action.payload, isLoading: false}
        case AuthActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload} as IAuthState
        case AuthActionEnum.SET_ERROR:
            return {...state, isError: action.payload, isLoading: false}
        case AuthActionEnum.SET_USER:
            return {...state, user: action.payload}
        default:
            return state;
    }
}

export default authReducer;