
import React, { Component } from 'react'

export class AddPlan extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             planData:{},
             minPlan:'',minData:'',planMsg:'',dataMsg:'',errorMessage:'',successMessage:'',checkedMsg:'',btndisable:true,
        }
    }

    addPlan=(e)=>{
        e.preventDefault();
        console.log(this.state.planData)
        if(this.state.planMsg !='' || this.state.dataMsg !=''){
            this.setState({btndisable:true})
            alert('Please correct errors')
        }
        else if(this.state.terms==''){
            this.setState({btndisable:true})
            this.setState({checkedMsg:'Please accept terms and conditions'})

        }
        else{
            this.setState({successMessage:'Added Plan successfully !'})
            this.setState({btndisable:false})
        }
        
    }

    handleChange=(e)=>{
        const name = e.target.name;
        const value =e.target.type==='checkbox'?e.target.checked:e.target.value;
        
        if(name==='planType'){
            this.changeValues(value)
        }

       
        const plan = {...this.state.planData,[name]:value};

        this.setState({planData:plan})

        this.validate(name,value)

    }

    changeValues=(value)=>{
        if(value==='Postpaid'){
            this.setState({minPlan:399,minData:50})
        }
        if(value==='Prepaid'){
            this.setState({minPlan:199,minData:20})
        }
    }

    validate=(name,value)=>{
        console.log(name,value)
        console.log(this.state.planData.planType)
        if(this.state.planData.planType==='Postpaid'){
            if(name==='planValue' && value<399){
                this.setState({planMsg:'Planvalue should be 399 or more for postpaid'})
            }

            else if(name==='data' && value<50){
                this.setState({dataMsg:'Data should be 50 gb or more for postpaid'})
            }

            else{
                this.setState({planMsg:'',dataMsg:''})
            }
            
        }
        if(this.state.planData.planType==='Prepaid'){
            if(name==='planValue' && value<199){
                this.setState({planMsg:'Planvalue should be 199 or more for prepaid'})
            }

            else if(name==='data' && value<20){
                this.setState({dataMsg:'Data should be 20 gb or more for prepaid'})
            }

            else{
                this.setState({planMsg:'',dataMsg:''})
            }
            
        }

        if(name==='terms'){
            if(value===true){
                this.setState({checkedMsg:''})
                this.setState({btndisable:false})
            }
            else{
                this.setState({checkedMsg:'Please agree to terms and conditions'})
                this.setState({btndisable:true})
            }
        }

        

    }
    

    render() {
        return (
            <div>
                <div className='row'>
                    <div className='container-fluid'>
                        <div className='col-md-4 offset-4'>
                        
                           <form className='border p-4 mt-4' onSubmit={this.addPlan}>
                                <h4>Add plan</h4>
                                <div className='form-group' onChange={this.handleChange}>
                                   <span>Select Plan:  </span>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="planType" id="inlineRadio1" value="Postpaid" required/>
                                        <label className="form-check-label" htmlFor="inlineRadio1">Postpaid</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="planType" id="inlineRadio2" value="Prepaid" required/>
                                        <label className="form-check-label" htmlFor="inlineRadio2">Prepaid</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="planvalue">PlanValue:</label>
                                    <input type="number" className="form-control" name='planValue' id="planValue" onChange={this.handleChange} min={this.state.minPlan} required/>
                                </div>
                                <div className="text-danger">
                                    {this.state.planMsg}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="data">Data:</label>
                                    <input type="number" className="form-control" name='data' id="data" onChange={this.handleChange} min={this.state.minData} required/>
                                </div>
                                <div className="text-danger">
                                    {this.state.dataMsg}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addon">Addons</label>
                                    <textarea className="form-control" id="addon" name='addons' rows="3" onChange={this.handleChange} required></textarea>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="tmc" value="Agree" name='terms' onChange={this.handleChange}/>
                                    <label className="form-check-label" htmlFor="tmc">Agree to terms & conditions</label>
                                </div>
                                <div className="text-danger">
                                    {this.state.checkedMsg}
                                </div>
                                <div className='form-group'>
                                    <button type="submit" className="btn btn-primary mt-2" disabled={this.state.btndisable}>Add</button>
                                </div>
                                <div className="text-primary">
                                    {this.state.successMessage}
                                </div>
                           </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default AddPlan
