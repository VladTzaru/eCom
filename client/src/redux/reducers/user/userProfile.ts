import { UserDispatchTypes } from '../../actions/user/userTypes';
import { ErrorT, UserI } from '../../../customTypes';

import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from '../../constants/user';

export interface UserProfileInitialStateI {
  userProfileInformation: UserI;
  loading?: boolean;
  error?: ErrorT<string>;
}

const initialState: UserProfileInitialStateI = {
  userProfileInformation: {},
};

const userProfileInformation = (
  state: UserProfileInitialStateI = initialState,
  action: UserDispatchTypes
): UserProfileInitialStateI => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfileInformation: action.payload,
      };

    case USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userProfileInformation;
