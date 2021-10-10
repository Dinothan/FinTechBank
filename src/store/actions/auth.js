import * as actionTypes from './actionTypes';

export const auth = res => {
  return dispatch => {
    dispatch({
      type: actionTypes.ADD_AUTH,
      token: res,
    });
  };
};
