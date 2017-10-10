import { put, takeEvery } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import {
  GET_EMPLOYEES,
  GET_EMPLOYEES_SUCCEEDED,
  GET_EMPLOYEES_FAILED,
  REMOVE_EMPLOYEE,
  REMOVE_EMPLOYEE_SUCCEEDED
} from './reducer'

export function * getElployees () {
  const response = yield fetch('/employees?_expand=departments')
  if (response.status === 200) {
    const items = yield response.json()
    yield put({ type: GET_EMPLOYEES_SUCCEEDED, payload: items })
  } else {
    yield put({ type: GET_EMPLOYEES_FAILED })
  }
}

export function * removeElployee (action) {
  const options = {
    method: 'DELETE'
  }
  yield fetch(`/employees/${action.id}`, options)
  yield put({ type: REMOVE_EMPLOYEE_SUCCEEDED })
  yield put({ type: GET_EMPLOYEES })
}

export default [
  takeEvery(GET_EMPLOYEES, getElployees),
  takeEvery(REMOVE_EMPLOYEE, removeElployee)
]
