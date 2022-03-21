import { AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from "./types";
import { IUser } from "../../../models/IUser";
import { AppDispatch } from "../../index";
import axios from "axios";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
    setUser: (user:IUser): SetUserAction => ({
        type: AuthActionEnum.SET_USER,
        payload: user,
    }),
   setAuth: (auth: boolean): SetAuthAction => ({
       type: AuthActionEnum.SET_AUTH,
       payload: auth
   }),
   setError: (error: string): SetErrorAction => ({
        type: AuthActionEnum.SET_ERROR,
       payload: error
   }),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
        type: AuthActionEnum.SET_IS_LOADING,
        payload: isLoading
    }),
    login: (username: string, password: string) => async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
                const response = await UserService.getUsers();
                const mockUser = response.data.find((user) => user.username === username && user.password === password);
                console.log(mockUser)
                if (!!mockUser) {
                    console.log('here')
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', mockUser.username);
                    dispatch(AuthActionCreators.setAuth(true));
                    dispatch(AuthActionCreators.setUser(mockUser));
                } else {
                    dispatch(AuthActionCreators.setError('Invalid name or password!'));
                }
        } catch (e) {
            dispatch(AuthActionCreators.setError('Error while logging!'));
        } finally {
            dispatch(AuthActionCreators.setIsLoading(false));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            localStorage.setItem('auth', 'false');
            localStorage.removeItem('username');
            dispatch(AuthActionCreators.setUser({} as IUser));
            dispatch(AuthActionCreators.setAuth(false));
        } catch (e) {
            dispatch(AuthActionCreators.setError('Logout error'));
        }
    }
}
