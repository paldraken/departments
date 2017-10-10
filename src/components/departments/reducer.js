export const GET_DEPARTMENTS = 'departmants/GET_DEPARTMENTS'
export const GET_DEPARTMENTS_SUCCEEDED = 'departmants/GET_DEPARTMENTS_SUCCEEDED'
export const GET_DEPARTMENTS_FAILED = 'departmants/GET_DEPARTMENTS_FAILED'
export const REMOVE_DEPARTMENT = 'departmants/REMOVE_DEPARTMENT'
export const REMOVE_DEPARTMENT_SUCCEEDED = 'departmants/REMOVE_DEPARTMENT_SUCCEEDED'

const initState = {
  isLoading: false,
  items: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
        ...state,
        isLoading: true
      }
    case GET_DEPARTMENTS_SUCCEEDED:
      return {
        ...state,
        items: action.payload,
        isLoading: false
      }
    case GET_DEPARTMENTS_FAILED:
      return {
        ...state,
        isLoading: false
      }
    case REMOVE_DEPARTMENT:
      return {
        ...state,
        isLoading: true
      }
    case REMOVE_DEPARTMENT_SUCCEEDED:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}

export default reducer
