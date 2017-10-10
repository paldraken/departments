import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, ButtonGroup, Panel } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { GET_DEPARTMENTS, REMOVE_DEPARTMENT } from './reducer'
import Loader from 'react-loader'

class Departments extends Component {
  componentWillMount () {
    this.props.getDepartments()
  }

  handleRemove (id) {
    this.props.removeDepartment(id)
  }

  renderItem (row) {
    return (
      <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>
          <ButtonGroup>
            <LinkContainer to={`department/${row.id}`}>
              <Button bsStyle='info' bsSize='xsmall'>Edit</Button>
            </LinkContainer>
            <Button
              bsStyle='danger'
              bsSize='xsmall'
              onClick={this.props.removeDepartment.bind(this, row.id)}
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
          <LinkContainer to='departments/new'>
            <Button bsStyle='primary' bsSize='small'>Create department</Button>
          </LinkContainer>
        </Panel>
        <Loader loaded={!this.props.isLoading}>
          <Table responsive condensed>
            <thead>
              <tr>
                <th className='col-md-1'>#</th>
                <th>Name</th>
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
    items: state.departments.items,
    isLoading: state.departments.isLoading
  }),
  dispatch => ({
    getDepartments: () => {
      dispatch({ type: GET_DEPARTMENTS })
    },
    removeDepartment: (id) => {
      dispatch({ type: REMOVE_DEPARTMENT, id })
    }
  })
)(Departments)
