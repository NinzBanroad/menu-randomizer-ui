import api from '../utils/api';
import { toast } from 'react-toastify';
import {
  GET_ALL_RANDOMIZE_MENUS_SUCCESS,
  GET_ALL_RANDOMIZE_MENUS_ERROR,
  GET_ALL_MENUS_SUCCESS,
  GET_ALL_MENUS_ERROR,
  ADD_MENU_SUCCESS,
  ADD_MENU_ERROR,
  UPDATE_MENU_SUCCESS,
  UPDATE_MENU_ERROR,
  DELETE_MENU_SUCCESS,
  DELETE_MENU_ERROR,
} from './types';

// Get All Menus and then randomize them
export const getAllRandomizeMenus = () => async (dispatch) => {
  try {
    const res = await api.get('/menu/randomize-menu');
    dispatch({
      type: GET_ALL_RANDOMIZE_MENUS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: GET_ALL_RANDOMIZE_MENUS_ERROR,
      payload: errors[0].msg,
    });
    toast.error(errors[0].msg, {
      position: 'top-right',
    });
  }
};

// Get All Menus
export const getAllMenus = () => async (dispatch) => {
  try {
    const res = await api.get('/menu');
    dispatch({
      type: GET_ALL_MENUS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: GET_ALL_MENUS_ERROR,
      payload: errors[0].msg,
    });
    toast.error(errors[0].msg, {
      position: 'top-right',
    });
  }
};

// Add Menu
export const addMenu = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/menu/add-menu', formData);
    dispatch({
      type: ADD_MENU_SUCCESS,
      payload: res.data.menu,
    });
    toast.success(res.data.msg, {
      position: 'top-right',
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: ADD_MENU_ERROR,
      payload: errors[0].msg,
    });
    toast.error(errors[0].msg, {
      position: 'top-right',
    });
  }
};

// Update Menu
export const updateMenu = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/menu/update-menu/${id}`, formData);
    dispatch({
      type: UPDATE_MENU_SUCCESS,
      payload: { id, menu: res.data.menu },
    });
    toast.success(res.data.msg, {
      position: 'top-right',
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: UPDATE_MENU_ERROR,
      payload: errors[0].msg,
    });
    toast.error(errors[0].msg, {
      position: 'top-right',
    });
  }
};

// Delete Menu
export const deleteMenu = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/menu/delete-menu/${id}`);
    dispatch({
      type: DELETE_MENU_SUCCESS,
      payload: id,
    });
    toast.success(res.data.msg, {
      position: 'top-right',
    });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: DELETE_MENU_ERROR,
      payload: errors[0].msg,
    });
    toast.error(errors[0].msg, {
      position: 'top-right',
    });
  }
};
