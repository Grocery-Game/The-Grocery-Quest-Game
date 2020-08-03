import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

const ITEM_ENDPOINT = '/api/items';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  fetch(ITEM_ENDPOINT)
    .then((res) => res.json())
    .then((json) =>
      dispatch({
        type: GET_ITEMS,
        payload: json,
      })
  );
};

export const addItem = (item) => (dispatch, getState) => {
  fetch(ITEM_ENDPOINT, {
    method: 'POST',
    headers: tokenConfig(getState),
    body: JSON.stringify(item),
  }).then((res) => res.json())
  .then((json) => {
    dispatch({
      type: ADD_ITEM,
      payload: json
    })
  })
  .catch(err => 
    dispatch(returnErrors(err.response.data, err.response.status))
  );
};

export const deleteItem = (id) => (dispatch, getState) => {
  fetch(`${ITEM_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: tokenConfig(getState),
  })
  .then((res) => res.json())
  .then((json) => {
    dispatch({
    type: DELETE_ITEM,
    payload: id,
    })
  })
  .catch(err =>
    dispatch(returnErrors(err.response.data, err.response.status))
  )
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}