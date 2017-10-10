import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, ButtonGroup, Panel } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { GET_EMPLOYEES, REMOVE_EMPLOYEE } from './reducer'
import Loader from 'react-loader'

class Employees extends Component {
  componentWillMount () {
    this.props.getEmployees()
  }

  renderItem (row) {
    return (
      <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row.firstName}</td>
        <td>{row.lastName}</td>
        <td>{row.departments.name}</td>
        <td>
          <ButtonGroup>
            <LinkContainer to={`employee/${row.id}`}>
              <Button bsStyle='info' bsSize='xsmall'>Edit</Button>
            </LinkContainer>
            <Button
              bsStyle='danger'
              bsSize='xsmall'
              onClick={this.props.removeElployee.bind(this, row.id)}
            >
              Remove
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    )
  }

  render () {
    const items = this.props.items.map((row) => this.renderItem(row))
    return (
      <div>
        <Panel bsSize='small'>
          <LinkContainer to='employees/new'>
            <Button bsStyle='primary' bsSize='small'>Add employee</Button>
          </LinkContainer>
        </Panel>
        <Loader loaded={!this.props.isLoading}>
          <Table responsive condensed>
            <thead>
              <tr>
                <th className='col-md-1'>#</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Department</th>
                <th className='col-md-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </Table>
        </Loader>
      </div>
    )
  }
}

export default connect(
  state => ({
    items: state.employees.items,
    isLoading: state.employees.isLoading
  }),
  dispatch => ({
    getEmployees: () => {
      dispatch({ type: GET_EMPLOYEES })
    },
    removeElployee: (id) => {
      dispatch({ type: REMOVE_EMPLOYEE, id })
    }
  })
)(Employees)
