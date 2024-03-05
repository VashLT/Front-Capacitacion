import { createReducer, on } from "@ngrx/store";
import { initialState } from "../layout-store.model";
import * as actions from "./person-data.actions";

const _personDataReducer = createReducer(
  initialState.person,
  on(actions.getPersonData, (state) => state),
  on(actions.getPersonDataSuccess, (_state, action) =>
    Object.assign({}, action.personData)
  ),
  on(actions.getPersonDataError, (_state) => null),
  on(actions.clearPersonData, (_state) => null),
  on(actions.editPersonData, (state, action) => {
    /**
     * revisa si los datos son iguales a los actuales
     */
    if (
      Object.keys(action.attributes).filter(
        (key) => state[key] !== action.attributes[key]
      ).length === 0
    ) {
      return state;
    }
    return Object.assign({}, state, action.attributes);
  })
);

export const personDataReducer = (state, action) =>
  _personDataReducer(state, action);
