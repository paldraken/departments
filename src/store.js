import { createStore, applyMiddleware, combineReducers } from 'redux'
import departmentReducers from './components/departments/reducer'
import departmentFormReducers from './components/department/reducer'
import employeesReducers from './components/employees/reducer'
import employeeFormReducer from './components/employee/reducer'
import createSagaMiddleware from 'redux-saga'
import saga from './sagas'

const appReducers = combineReducers({
  departments: departmentReducers,
  departmentForm: departmentFormReducers,
  employees: employeesReducers,
  employeeForm: employeeFormReducer
})

const sagaMiddleware = createSagaMiddleware()

export default createStore(
  appReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(saga)
