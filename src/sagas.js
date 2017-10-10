import { all } from 'redux-saga/effects'

import employeesSaga from './components/employees/sagas'
import emploeeyFormSaga from './components/employee/sagas'
import departmentsSaga from './components/departments/sagas'
import departmentFormSaga from './components/department/sagas'

export default function * rootSaga () {
  yield all([].concat(
    employeesSaga,
    emploeeyFormSaga,
    departmentsSaga,
    departmentFormSaga
  ))
}
