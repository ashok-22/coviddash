import React, { Component } from 'react'
import Axios from 'axios';

import './covid.css'
import { Link } from 'react-router-dom';
import covidlogo from './logo-icononly.png'


export class StateDashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             districts:{}
        }
    }

    componentDidMount=()=>{
        const state= this.props.match.params.stateName;
        Axios.get('https://api.covid19india.org/v4/min/data.min.json')
        .then(res=>{
            this.setState({districts:res.data[state].districts})
        })
        .catch(error=>console.log(error.info))
    }
    
    render() {
        return (
            <div>
            <div className='container'>
                <div className='row'>
                    <img src={covidlogo} className='logo col-sm-2'/>
                    <div className='text-center display-5 m-4 pb-md-4 col-sm-8'>{this.props.match.params.stateName} Covid19 Statistics</div>
                </div>
                <div className='row'>
                    <Link className='text-center goback mb-4 p-0' to='/covid19'><h6>Go back to India Dashboard</h6></Link>
                </div>
                
                <div className='row'>
                {Object.keys(this.state.districts).map((district)=>{
                    const districtData = this.state.districts[district];
                    const timeStamp = new Date().toLocaleString().slice(11,21);
                    return(
                        <div className='col-md-3 mb-4' key={district}>
                            <div className="card border-dark cardhover" >
                                <div className='card-header text-lg-center'><h5>{district}</h5></div>
                                <div className="card-body">
                                    <h6 className="card-text text-info">Confirmed : {districtData.total.confirmed} </h6>
                                    <h6 className="card-text text-warning">Active : {districtData.total.confirmed-districtData.total.recovered}</h6>
                                    <h6 className="card-text text-success">Recovered : {districtData.total.recovered} </h6>
                                    <h6 className="card-text text-danger">Deceased : {districtData.total.deceased} </h6>
                                    <h6 className="card-text text-primary">Vaccinated : {districtData.total.vaccinated}</h6>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Last updated at {timeStamp}</small>
                                </div>
                            </div>
                            
                        </div>
                    )
                })}
                </div>
                
            </div>
            <div className='footer'>
            All rights reserved @Ashok
            </div>
            </div>
        )
    }
}

export default StateDashboard
