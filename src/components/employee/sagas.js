import { put, takeEvery } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'

import {
  GET_EMPLOYEE,
  GET_EMPLOYEE_SUCCEEDED,
  EMPLOYEE_FAILED,
  SAVE_EMPLOYEE,
  SAVE_EMPLOYEE_SUCCEEDED,
  PREPARE_CREATE_EMPLOYEE,
  PREPARE_CREATE_EMPLOYEE_END
} from './reducer'

export function * prepareCreateEmployee () {
  const departments = yield departmentList()
  yield put({ type: PREPARE_CREATE_EMPLOYEE_END, payload: departments })
}

export function * getEmployee (action) {
  const departments = yield departmentList()

  const response = yield fetch(`/employees/${action.id}`)
  if (response.status === 200) {
    const employee = {
      ...yield response.json(),
      departmentsList: departments
    }

    yield put({ type: GET_EMPLOYEE_SUCCEEDED, payload: employee })
  } else {
    yield put({ type: EMPLOYEE_FAILED })
  }
}

export function * saveEmployee (action) {
  let url = action.payload.id ? `/employees/${action.payload.id}` : '/employees'
  let options = {
    method: action.payload.id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: action.payload.id,
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      departmentsId: parseInt(action.payload.departmentsId, 10)
    })
  }
  const response = yield fetch(url, options)
  if (response.status >= 200 || response.status < 300) {
    const department = yield response.json()
    yield put({ type: SAVE_EMPLOYEE_SUCCEEDED, payload: department })
  } else {
    yield put({ type: EMPLOYEE_FAILED })
  }
}

function departmentList () {
  return fetch(`/departments`).then(res => res.json())
}

export default [
  takeEvery(GET_EMPLOYEE, getEmployee),
  takeEvery(PREPARE_CREATE_EMPLOYEE, prepareCreateEmployee),
  takeEvery(SAVE_EMPLOYEE, saveEmployee)
]
