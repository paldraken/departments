export const GET_EMPLOYEES = 'employees/GET_EMPLOYEES'
export const GET_EMPLOYEES_SUCCEEDED = 'employees/GET_EMPLOYEES_SUCCEEDED'
export const GET_EMPLOYEES_FAILED = 'employees/GET_EMPLOYEES_FAILED'
export const REMOVE_EMPLOYEE = 'employees/REMOVE_EMPLOYEE'
export const REMOVE_EMPLOYEE_SUCCEEDED = 'employees/REMOVE_EMPLOYEE_SUCCEEDED'

const initState = {
  isLoading: false,
  items: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        isLoading: true
      }
    case GET_EMPLOYEES_SUCCEEDED:
      return {
        ...state,
        items: action.payload,
        isLoading: false
      }
    case REMOVE_EMPLOYEE:
      return {
        ...state,
        isLoading: true
      }
    case REMOVE_EMPLOYEE_SUCCEEDED:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
