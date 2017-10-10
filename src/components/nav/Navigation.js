import React, { Component } from 'react'
import { NavItem, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Navigation extends Component {
  render () {
    return (
      <div className='sidebar-nav'>
        <Nav>
          <LinkContainer to='/departments'>
            <NavItem activeHref='/departments'>Departments</NavItem>
          </LinkContainer>
          <LinkContainer to='/employees'>
            <NavItem activeHref='/employees'>Employees</NavItem>
          </LinkContainer>
        </Nav>
      </div>
    )
  }
}
