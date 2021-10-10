import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  token: null,
};

const addAuth = (state, action) => {
  return updateObject(state, {
    token: action.token,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_AUTH:
      return addAuth(state, action);
    default:
      return state;
  }
};
export default reducer;
