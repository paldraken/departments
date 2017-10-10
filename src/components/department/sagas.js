import { put, takeEvery } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'

import {
  GET_DEPARTMENT,
  GET_DEPARTMENT_SUCCEEDED,
  DEPARTMENT_FAILED,
  SAVE_DEPARTMENT,
  SAVE_DEPARTMENT_SUCCEEDED
} from './reducer'

export function * getDepartment (action) {
  const response = yield fetch(`/departments/${action.id}`)
  if (response.status === 200) {
    const department = yield response.json()
    yield put({ type: GET_DEPARTMENT_SUCCEEDED, payload: department })
  } else {
    yield put({ type: DEPARTMENT_FAILED })
  }
}

export function * saveDepartment (action) {
  let url = action.id ? `/departments/${action.id}` : '/departments'
  let options = {
    method: action.id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: action.id,
      name: action.name
    })
  }
  const response = yield fetch(url, options)
  if (response.status >= 200 || response.status < 300) {
    const department = yield response.json()
    yield put({ type: SAVE_DEPARTMENT_SUCCEEDED, payload: department })
  } else {
    yield put({ type: DEPARTMENT_FAILED })
  }
}

export default [
  takeEvery(GET_DEPARTMENT, getDepartment),
  takeEvery(SAVE_DEPARTMENT, saveDepartment)
]
