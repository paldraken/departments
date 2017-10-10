import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import Loader from 'react-loader'
import { Redirect } from 'react-router-dom'
import { GET_EMPLOYEE, PREPARE_CREATE_EMPLOYEE, SAVE_EMPLOYEE } from './reducer'

class EmployeeForm extends Component {
  constructor ({match: {params: { id }}}) {
    super()
    this.state = {
      fireRedirect: false,
      id,
      firstName: '',
      lastName: '',
      validation: { firstName: null, lastName: null },
      departmentsId: 0,
      departmentsList: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  validate () {
    let validation = {
      name: null
    }
    validation.firstName = this.state.firstName ? 'success' : 'error'
    validation.lastName = this.state.lastName ? 'success' : 'error'
    this.setState({validation})
    return !Object.values(validation).find(el => el === 'error')
  }

  componentWillMount () {
    if (this.state.id) {
      this.props.getEmployee(this.state.id)
    } else {
      this.props.createEmployee()
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      ...this.state,
      ...nextProps
    })
    if (
      this.state.departmentsId === 0 &&
      nextProps.departmentsList &&
      nextProps.departmentsList.length
    ) {
      this.setState({
        departmentsId: nextProps.departmentsList[0].id
      })
    }
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    if (this.validate()) {
      this.props.saveEmployee({
        ...this.state
      })
    }
  }

  departmentOptions (item) {
    return (
      <option
        key={item.id}
        value={item.id}
      >
        {item.name}
      </option>
    )
  }

  render () {
    if (this.state.fireRedirect) {
      return <Redirect to='/employees' />
    }
    const depOptions = this.state.departmentsList.map((item) => this.departmentOptions(item))
    return (
      <Loader loaded={!this.props.isLoading} color='#5cb85c'>
        <h3>{this.state.id ? 'Update employee' : 'New employee'}</h3>
        <form onSubmit={this.handleSubmit}>
          <FormGroup validationState={this.state.validation.firstName}>
            <ControlLabel>Firstname</ControlLabel>
            <FormControl
              type='text'
              name='firstName'
              value={this.state.firstName}
              placeholder='Firstname'
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup validationState={this.state.validation.lastName}>
            <ControlLabel>Lastname</ControlLabel>
            <FormControl
              type='text'
              name='lastName'
              value={this.state.lastName}
              placeholder='Lasttname'
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Department</ControlLabel>
            <FormControl
              componentClass='select'
              placeholder='Deaprtment'
              value={this.state.departmentsId}
              name='departmentsId'
              onChange={this.handleChange}
            >
              {depOptions}
            </FormControl>
          </FormGroup>

          <Button bsStyle='success' type='submit'>Save</Button>
        </form>
      </Loader>
    )
  }
}

export default connect(
  (state) => ({
    ...state.employeeForm
  }),
  dispatch => ({
    getEmployee: (id) => {
      dispatch({ type: GET_EMPLOYEE, id })
    },
    createEmployee: () => {
      dispatch({ type: PREPARE_CREATE_EMPLOYEE })
    },
    saveEmployee: (data) => {
      dispatch({ type: SAVE_EMPLOYEE, payload: data })
    }
  })
)(EmployeeForm)
