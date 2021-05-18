import React, { Component } from 'react'
import Axios from 'axios'

import './covid.css'
import { Link } from 'react-router-dom';
import covidlogo from './logo-icononly.png'
import cardimg from './covid19-main-645x465.jpg'

export class CovidDashboard extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             rawdata:''
        }
    }

    

    componentDidMount=()=>{
        Axios.get('https://api.covid19india.org/v4/min/data.min.json')
        .then(res=>{this.setState({rawdata:res.data});
        console.log(res.data)})
        .catch(error=>console.log(error.info))
    }

    handlecardClick=(name)=>{
        console.log(name)
        this.props.history.push(`/covid19/state/${name}`)
    }
    

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <img src={covidlogo} className='logo col-sm-2'/>
                        <p className='text-center display-5 m-4 pb-md-4 col-sm-8'>Covid19 India Dashboard</p>
                    </div>
                    <div className='row'>

                        {
                            Object.keys(this.state.rawdata).map((state)=>{
                                const stateData=this.state.rawdata[state];
                                const timeStamp = new Date().toLocaleString();
                                return(
                                    <div className='col-md-3 mb-4' key={state}>
                                        <div className="card border-dark cardhover" onClick={(e)=>this.handlecardClick(state,e)}>
                                          
                                          
                                            <div className='card-header text-lg-center'><h5>{state}</h5></div>
                                            <div className="card-body">
                                                <h6 className="card-text text-info">Confirmed : {stateData.total.confirmed} </h6>
                                                <h6 className="card-text text-warning">Active : {stateData.total.confirmed-stateData.total.recovered}</h6>
                                                <h6 className="card-text text-success">Recovered : {stateData.total.recovered} </h6>
                                                <h6 className="card-text text-danger">Deceased : {stateData.total.deceased} </h6>
                                                <h6 className="card-text text-primary">Vaccinated : {stateData.total.vaccinated}</h6>
                                            </div>
                                           
                                            <div className="card-footer">
                                                <small className="text-muted">Last updated at {timeStamp}</small>
                                            </div>
                                        </div>
                                     
                                    </div>
                                )
                            })
                        }




                        {/*<div className='col-sm-3'>
                            <div class="card border-primary">
                                <div className='card-header text-lg-center'><h5>Andhra Pradesh</h5></div>
                                <div className="card-body">
                                    <h6 className="card-text text-info">Confirmed : </h6>
                                    <h6 className="card-text text-warning">Active : </h6>
                                    <h6 className="card-text text-success">Recovered : </h6>
                                    <h6 className="card-text text-danger">Deceased : </h6>
                                    <h6 className="card-text text-primary">Vaccinated : </h6>
                                </div>
                                <div class="card-footer">
                                    <small class="text-muted">Last updated 3 mins ago</small>
                                </div>
                            </div>
                        </div>*/}
                    </div>
                    <div className='footer'>
                    All rights reserved @Ashok
                </div>
                </div>
                
            </div>
        )
    }
}

export default CovidDashboard
