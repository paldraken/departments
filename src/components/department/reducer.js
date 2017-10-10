export const GET_DEPARTMENT = 'departmentForm/GET_DEPARTMENT'
export const GET_DEPARTMENT_SUCCEEDED = 'departmentForm/GET_DEPARTMENT_SUCCEEDED'
export const CREATE_DEPARTMENT = 'departmentForm/CREATE_DEPARTMENT'
export const SAVE_DEPARTMENT = 'departmentForm/SAVE_DEPARTMENT'
export const SAVE_DEPARTMENT_SUCCEEDED = 'departmentForm/SAVE_DEPARTMENT_SUCCEEDED'
export const DEPARTMENT_FAILED = 'departmentForm/DEPARTMENT_FAILED'

const initState = {
  fireRedirect: false,
  isLoading: false,
  name: ''
}

export default (state = initState, action) => {
  switch (action.type) {
    case CREATE_DEPARTMENT:
      return initState
    case GET_DEPARTMENT:
      return {
        ...state,
        fireRedirect: false,
        isLoading: true
      }
    case GET_DEPARTMENT_SUCCEEDED:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      }
    case SAVE_DEPARTMENT:
      return {
        ...state,
        isLoading: true
      }
    case SAVE_DEPARTMENT_SUCCEEDED:
      return {
        ...state,
        ...action.payload,
        fireRedirect: true,
        isLoading: false
      }
    case DEPARTMENT_FAILED:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
