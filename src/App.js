
import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Link,Route} from 'react-router-dom'
import { AddPlan } from './AddPlan';
import { ViewPlans } from './ViewPlans';
import { CovidDashboard } from './CovidDashboard';
import { StateDashboard } from './StateDashboard';
import './covid.css';

export class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-primary sticky-top">
            <span ><Link className="navbar-brand mb-0 h1" to='/'>Navbar</Link></span>
              <ul className="nav navbar-nav">
                  <li className="nav-item active">
                      <Link className="nav-link"to='/addPlan'>Add Plan</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/viewPlans">View Plans</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/covid19">Covid19</Link>
                  </li>
              </ul>
          </nav>
        </div>
        <Switch>
          <Route path='/' exact component={AddPlan}/>
          <Route path='/addPlan' component={AddPlan}/>
          <Route path='/viewPlans' component={ViewPlans}/>
          <Route exact path='/covid19' component={CovidDashboard}/>
          <Route path='/covid19/state/:stateName' component={StateDashboard}/>
        </Switch>
      </Router>  
    )
  }
}

export default App
