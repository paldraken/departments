import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { GET_DEPARTMENT, SAVE_DEPARTMENT, CREATE_DEPARTMENT } from './reducer'
import Loader from 'react-loader'
import { Redirect } from 'react-router-dom'

class DepartmentForm extends Component {
  constructor ({match: {params: { id }}}) {
    super()
    this.state = {
      fireRedirect: false,
      validation: {},
      id,
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  validate () {
    let validation = {
      name: null
    }
    validation.name = this.state.name ? 'success' : 'error'
    this.setState({validation})
    return !Object.values(validation).find(el => el === 'error')
  }

  componentWillMount () {
    if (this.state.id) {
      this.props.getDepartment(this.state.id)
    } else {
      this.props.createDepartment()
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      fireRedirect: nextProps.fireRedirect,
      name: nextProps.name
    })
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    if (this.validate()) {
      this.props.saveDepartment({
        id: this.state.id,
        name: this.state.name
      })
    }
  }

  render () {
    if (this.state.fireRedirect) {
      return <Redirect to='/departments' />
    }
    return (
      <Loader loaded={!this.props.isLoading} color='#5cb85c'>
        <h3>{this.state.id ? 'Update department' : 'Create department'}</h3>
        <form onSubmit={this.handleSubmit}>
          <FormGroup validationState={this.state.validation.name}>
            <ControlLabel>Department name</ControlLabel>
            <FormControl
              type='text'
              name='name'
              value={this.state.name}
              placeholder='Name'
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button bsStyle='success' type="submit">Save</Button>
        </form>
      </Loader>
    )
  }
}

export default connect(
  (state) => ({
    ...state.departmentForm
  }),
  dispatch => ({
    getDepartment: (id) => {
      dispatch({ type: GET_DEPARTMENT, id })
    },
    saveDepartment: (data) => {
      dispatch({ type: SAVE_DEPARTMENT, ...data })
    },
    createDepartment: () => {
      dispatch({ type: CREATE_DEPARTMENT })
    }
  })
)(DepartmentForm)
