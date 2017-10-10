import { put, takeEvery } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import {
  GET_DEPARTMENTS,
  GET_DEPARTMENTS_SUCCEEDED,
  GET_DEPARTMENTS_FAILED,
  REMOVE_DEPARTMENT,
  REMOVE_DEPARTMENT_SUCCEEDED
} from './reducer'

export function * getDepartments () {
  const response = yield fetch('/departments?_embed=employees')
  if (response.status === 200) {
    const departments = yield response.json()
    yield put({ type: GET_DEPARTMENTS_SUCCEEDED, payload: departments })
  } else {
    yield put({ type: GET_DEPARTMENTS_FAILED })
  }
}

export function * removeDepartment (action) {
  const options = {
    method: 'DELETE'
  }
  yield fetch(`/departments/${action.id}`, options)
  yield put({ type: REMOVE_DEPARTMENT_SUCCEEDED })
  yield put({ type: GET_DEPARTMENTS })
}

export default [
  takeEvery(GET_DEPARTMENTS, getDepartments),
  takeEvery(REMOVE_DEPARTMENT, removeDepartment)
]
