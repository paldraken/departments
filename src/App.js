import React, { Component } from 'react'
import { Grid, Col, Row, Alert } from 'react-bootstrap'
import { Route, Redirect } from 'react-router-dom'
import Departments from './components/departments/Departments'
import DepartmentForm from './components/department/DepartmentForm'
import Employees from './components/employees/Employees'
import EmployeeForm from './components/employee/EmployeeForm'
import Navigation from './components/nav/Navigation'
import './App.css'

class App extends Component {
  render () {
    return (
      <Grid className='App'>
        <Alert>
          <h2>Admin page</h2>
        </Alert>
        <Row>
          <Col md={3}>
            <Navigation />
          </Col>
          <Col md={9}>
            <Route exact path='/' render={() => (
              <Redirect to='/departmants'/>
            )}/>
            <Route exact path='/departments' component={Departments}/>
            <Route path='/departments/new' component={DepartmentForm}/>
            <Route path='/department/:id' component={DepartmentForm}/>
            <Route exact path='/employees' component={Employees}/>
            <Route path='/employees/new' component={EmployeeForm}/>
            <Route path='/employee/:id' component={EmployeeForm}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App
