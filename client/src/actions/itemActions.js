import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

const ITEM_ENDPOINT = '/api/items'

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

export const addItem = (item) => dispatch => {
  console.log(item);
  axios.post('/api/items', item).then(res => 
    dispatch({
      type: ADD_ITEM, 
      payload: res.data
    })
  )
  // fetch(ITEM_ENDPOINT, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(item),
  // }).then((res) => res.json())
  // .then((json) => {
  //   console.log('json', json)
  //   dispatch({
  //     type: ADD_ITEM,
  //     payload: json
  //   })
  // })
};

export const deleteItem = (id) => dispatch => {
  axios.delete(`/api/items/${id}`).then(res => 
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    })
  )
  // fetch(ITEM_ENDPOINT, {
  //   method: 'DELETE',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(item),
  // }).then((res) => res.json())
  // .then((json) => {
  //   console.log('json', json)
  //   dispatch({
  //    type: DELETE_ITEM,
  //    payload: id,
  //  })
  // })
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}