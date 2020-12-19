import { combineReducers, Reducer } from 'redux';
import { IUser } from "./user/UserTypes";
import { userReducer } from './user/UserReducer';

export interface IHomeState {
  user: IUser,
  friendList: string[]
}

export const rootReducer: Reducer<IHomeState> = combineReducers<IHomeState>({
  user: userReducer
} as any);
