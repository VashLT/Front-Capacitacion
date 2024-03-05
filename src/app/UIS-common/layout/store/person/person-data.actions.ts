import { createAction, props } from "@ngrx/store";
import { EditPersonData, PersonData } from "./person-data.model";

export const getPersonData = createAction("[Person] Get Data");

export const getPersonDataSuccess = createAction(
  "[Person] Get Data Success",
  props<{ personData: PersonData }>()
);

export const getPersonDataError = createAction("[Person] Get Data Error");

export const clearPersonData = createAction("[Person] Clear Data");

export const editPersonData = createAction(
  "[Person] Edit Data",
  props<{ attributes: EditPersonData }>()
);
