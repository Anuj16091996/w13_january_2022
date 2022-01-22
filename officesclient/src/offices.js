import React from 'react'

class offices extends React.Component{
    constructor(props) {
        super(props)
          // set initial state
        // do not use setState in constructor, write state directly
        this.state = {
          office_data : [], // will contain dresses data array from server
          office_index : 0, // the index of the dress currently shown, start at first in array
          office_count : 0, // how many dresses in data array from server
          isLoaded : false,  // will be true after data have been received from server
          error : null       // no errors yet !
        }
}

componentDidMount() {
    fetch('http://localhost:8000/offices')
    .then(
        (response)=> {
            console.log(response)
            if (response.ok) {
                response.json().then(json_response =>{
                    console.log(json_response.offices)
                    this.setState({
                        office_data:json_response.offices,
                        office_count: Object.keys(json_response.offices).length,
                        office_index : 0,
                        isLoaded : true,
                        error : null
                    })
                })
            }else{
                response.json().then(json_response => {
                    this.setState({
                        isLoaded: false,
                        error:json_response,
                        office_data :{},
                        office_index : 0,
                        office_count:0
                    })
                })
            }
        }
    )
}

render() {
    if(this.state.error){ return <div><b>{this.state.error.message}</b></div>}
    else if(this.state.isLoaded){
        if(this.state.dresses_count!==0){
            return (
                <div>


                <b>List of offices from server localhost:8000/Offices</b>

                {/* Spacer Css */}
                <div>
                    <pre style={{backgroundcolor: "white", border: "whitesmoke"}}>

                </pre>
                 </div>
                   <table>
                           <tbody>
                           <tr><th>office code</th><td>{this.state.office_data[this.state.office_index].officecode}</td></tr>
                           <tr><th>City</th><td>{this.state.office_data[this.state.office_index].city}</td></tr>
                           <tr><th>Phone</th><td>{this.state.office_data[this.state.office_index].phone}</td></tr>
                           <tr><th>addressline1</th><td>{this.state.office_data[this.state.office_index].addressline1}</td></tr>
                           <tr><th>addressline2</th><td>{this.state.office_data[this.state.office_index].addressline2}</td></tr>
                           <tr><th>Country</th><td>{this.state.office_data[this.state.office_index].country}</td></tr>
                           <tr><th>Postalcode</th><td>{this.state.office_data[this.state.office_index].postalcode}</td></tr>
                           <tr><th>state</th><td>{this.state.office_data[this.state.office_index].state}</td></tr>
                           <tr><th>Territory</th><td>{this.state.office_data[this.state.office_index].territory}</td></tr>
                           </tbody>
                    </table>
                </div>
            )
        }else{
            return(<div><b>Dress table is empty</b></div>)
        }
    }else{
        return (<div><b>Waiting for server ...</b></div>)
    }
}

}


export default offices