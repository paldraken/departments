export const GET_EMPLOYEE = 'departmentForm/GET_EMPLOYEE'
export const GET_EMPLOYEE_SUCCEEDED = 'departmentForm/GET_EMPLOYEE_SUCCEEDED'
export const PREPARE_CREATE_EMPLOYEE = 'departmentForm/PREPARE_CREATE_EMPLOYEE'
export const PREPARE_CREATE_EMPLOYEE_END = 'departmentForm/PREPARE_CREATE_EMPLOYEE_END'
export const SAVE_EMPLOYEE = 'departmentForm/SAVE_EMPLOYEE'
export const SAVE_EMPLOYEE_SUCCEEDED = 'departmentForm/SAVE_EMPLOYEE_SUCCEEDED'
export const EMPLOYEE_FAILED = 'departmentForm/EMPLOYEE_FAILED'

const initState = {
  isLoading: false,
  firstName: '',
  lastName: '',
  departmentsId: 0,
  departmentList: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case PREPARE_CREATE_EMPLOYEE:
      return {
        ...initState,
        fireRedirect: false,
        isLoading: true
      }
    case PREPARE_CREATE_EMPLOYEE_END:
      return {
        ...initState,
        isLoading: false,
        fireRedirect: false,
        departmentsList: action.payload
      }
    case GET_EMPLOYEE:
      return {
        ...state,
        fireRedirect: false,
        isLoading: true
      }
    case GET_EMPLOYEE_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        ...action.payload
      }
    case SAVE_EMPLOYEE:
      return {
        ...state,
        isLoading: true
      }
    case SAVE_EMPLOYEE_SUCCEEDED:
      return {
        ...state,
        ...action.payload,
        fireRedirect: true,
        isLoading: false
      }
    case EMPLOYEE_FAILED:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
