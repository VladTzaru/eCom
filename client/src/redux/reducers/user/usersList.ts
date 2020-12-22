import { UserDispatchTypes } from '../../actions/user/userTypes';
import { ErrorT, UserI } from '../../../customTypes';

import {
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USERS_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from '../../constants/user';

export interface UserListInitialStateI {
  users: UserI[];
  loading?: boolean;
  error?: ErrorT<string>;
}

const initialState: UserListInitialStateI = {
  users: [],
};

const usersList = (
  state: UserListInitialStateI = initialState,
  action: UserDispatchTypes
): UserListInitialStateI => {
  switch (action.type) {
    case USERS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case USERS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case USER_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default usersList;
