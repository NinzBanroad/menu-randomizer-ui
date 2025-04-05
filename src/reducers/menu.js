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
} from '../actions/types';

const initialState = {
  menus: [],
  menus_with_meat: [],
  menus_without_meat: [],
  loading: true,
};

function menuReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_RANDOMIZE_MENUS_SUCCESS:
      return {
        ...state,
        menus_with_meat: payload.filter((menu) => menu.hasMeat),
        menus_without_meat: payload.filter((menu) => !menu.hasMeat),
        loading: false,
      };
    case GET_ALL_RANDOMIZE_MENUS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_ALL_MENUS_SUCCESS:
      return {
        ...state,
        menus: payload,
        loading: false,
      };
    case GET_ALL_MENUS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_MENU_SUCCESS:
      return {
        ...state,
        menus: [payload, ...state.menus],
        loading: false,
      };
    case ADD_MENU_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_MENU_SUCCESS:
      return {
        ...state,
        menus: state.menus.map((menu) =>
          menu._id === payload.id ? payload.menu : menu
        ),
        loading: false,
      };
    case UPDATE_MENU_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_MENU_SUCCESS:
      return {
        ...state,
        menus: state.menus.filter((menu) => menu._id !== payload),
        loading: false,
      };
    case DELETE_MENU_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default menuReducer;
