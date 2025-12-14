import {API_URL} from "../config";

//selectors
export const getAllTables = state => state.tables;
export const getTableById = (state, id) => {
  return state.tables.find(table => table.id === Number(id));
};

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const LOAD_TABLES = createActionName('LOAD_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

//action creators
export const loadTables = payload => ({ type: LOAD_TABLES, payload });
export const updateTable = payload => ({ type: UPDATE_TABLE, payload });

// Thunks
export const fetchTables = () => {
  return dispatch => {
    fetch(API_URL + '/tables')
      .then(res => res.json())
      .then(data => dispatch(loadTables(data)));
  };
};

export const updateTableRequest = table => {
  console.log(table)
  return (dispatch) => {
    fetch(API_URL + `/tables/${table.id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(table)
    })
      .then(res => res.json())
      .then(updated => dispatch(updateTable(updated)))
      .catch(err => console.log('err', err));
  };
};

// reducer
const tablesReducer = (statePart = [], action) => {
  console.log('statePart ->', statePart);
  console.log('action ->', action);
  switch (action.type) {
    case LOAD_TABLES:
      return [...action.payload];
    case UPDATE_TABLE:
      return statePart.map(table =>
        table.id === action.payload.id ? action.payload : table
      );
    default:
      return statePart;
  }
};

export default tablesReducer;