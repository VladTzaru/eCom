import { UserDispatchTypes } from '../../actions/user/userTypes';
import { ErrorT, UserI } from '../../../customTypes';

import {
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from '../../constants/user';

export interface UpdatedUserProfileInitialStateI {
  updatedUserProfile: UserI;
  success: boolean;
  loading?: boolean;
  error?: ErrorT<string>;
}

const initialState: UpdatedUserProfileInitialStateI = {
  updatedUserProfile: {},
  success: false,
};

const updatedUserProfileInformation = (
  state: UpdatedUserProfileInitialStateI = initialState,
  action: UserDispatchTypes
): UpdatedUserProfileInitialStateI => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedUserProfile: action.payload,
        success: true,
      };

    case USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default updatedUserProfileInformation;
