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
          error : null ,      // no errors yet !
          server_messgae:''


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

Increasevalue=()=>{

    this.setState({office_index:this.state.office_index+1})

}

Decreasevalue=()=>{

    this.setState({office_index:this.state.office_index-1})
}

DeleteData=()=>{
    let officeCode=Number(this.state.office_data[this.state.office_index].officecode);

    let url='http://localhost:8000/offices/'+ officeCode
    console.log(url)
    fetch(url,
        {
            method: 'delete',
        }
    )
    .then((response)=>{
        if (response.ok) {
            this.setState({server_messgae:'Data Deleted'})
            this.componentDidMount()
        }else{
            this.setState({server_messgae:'Data can not be deleted'})
        }
    })

}

ChangeData=(event)=>{
     const i=this.state.office_index
     this.setState(state => {
        const list = state.office_data.map((office, j)=>{
                if (j=== i) {
                office[event.target.name]=event.target.value
                return office;
                } else {
                 return office;
         }
         });

         return {
            list,
         };
    });
}

UpdateData=()=>{

let office =Number(this.state.office_data[this.state.office_index].officecode)
let addressline1=this.state.office_data[this.state.office_index].addressline1
let addressline2=this.state.office_data[this.state.office_index].addressline2
let city=this.state.office_data[this.state.office_index].city
let state=this.state.office_data[this.state.office_index].state
let country=this.state.office_data[this.state.office_index].country
let postalcode=this.state.office_data[this.state.office_index].postalcode
let phone=this.state.office_data[this.state.office_index].phone
let territory=this.state.office_data[this.state.office_index].territory


let userData = {
    officecode: office,
    addressline1: addressline1,
    addressline2: addressline2,
    city: city,
    state: state,
    country: country,
    postalcode: postalcode,
    phone: phone,
    territory: territory
}

let url = 'http://localhost:8000/offices/' + office
console.log(url)

fetch(url,
    {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(userData)
    }
)
.then((response) => {
    if (response.status === 200) {
        this.setState({server_messgae:'Data Updated/Inserted'})
        this.componentDidMount()

    } else {
        let office =Number(document.getElementById("one").value)
        let addressline1=document.getElementById("two").value
        let addressline2=document.getElementById("three").value
        let city=document.getElementById("four").value
        let state=document.getElementById("five").value
        let country=document.getElementById("six").value
        let postalcode=document.getElementById("seven").value
        let phone=document.getElementById("eight").value
        let territory=document.getElementById("nine").value


        let userData = {
            officecode: office,
            addressline1: addressline1,
            addressline2: addressline2,
            city: city,
            state: state,
            country: country,
            postalcode: postalcode,
            phone: phone,
            territory: territory
        }
        fetch('http://localhost:8000/offices',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
                //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(userData)
        }

        .then((response) => {
            if (response.status === 202) {
            this.setState({server_messgae:'Data Inserted'})
            this.componentDidMount()
        }else{
                this.setState({server_messgae:'Data Already Exists'})
            }
        })
    )


    }
})

}



ClearForm=()=>{
document.getElementById("one").value=''
document.getElementById("two").value=''
document.getElementById("three").value=''
document.getElementById("four").value=''
document.getElementById("five").value=''
document.getElementById("six").value=''
document.getElementById("seven").value=''
document.getElementById("eight").value=''
document.getElementById("nine").value=''

}

render() {

    if(this.state.error){ return <div><b>{this.state.error.message}</b></div>}
    else if(this.state.isLoaded){
        if(this.state.office_count!==0){

            return (
                <div>
                 <b>List of offices from server localhost:8000/Offices</b>
                {/* Spacer Css */}
                <div>
                    <pre style={{backgroundcolor: "white", border: "whitesmoke"}}>

                </pre>
                 </div>
                    <p>{this.state.server_messgae}</p>


                     <table>
                           <tbody>
                           <tr><th>office code</th><td> <input type='number' id='one' name='officecode'  value={this.state.office_data[this.state.office_index].officecode} onChange={(event)=>this.ChangeData(event)} /></td></tr>
                           <tr><th>City</th><td><input type='text' id='two' name='city'  value={this.state.office_data[this.state.office_index].city} onChange={(event)=>this.ChangeData(event)} /></td></tr>
                           <tr><th>Phone</th><td><input type='tel' id='three' name='phone'  value={this.state.office_data[this.state.office_index].phone} onChange={(event)=>this.ChangeData(event)} /></td></tr>
                           <tr><th>Address line 1</th><td><input type='text' id='four' name='addressline1'  value={this.state.office_data[this.state.office_index].addressline1} onChange={(event)=>this.ChangeData(event)} /></td></tr>
                           <tr><th>Address line 2</th><td><input type='text' id='five' name='addressline2'  value={this.state.office_data[this.state.office_index].addressline2} onChange={(event)=>this.ChangeData(event)} /></td></tr>
                           <tr><th>Country</th><td><input type='text' name='country' id='six'  value={this.state.office_data[this.state.office_index].country} onChange={(event)=>this.ChangeData(event)} /></td></tr>
                           <tr><th>Postal Code</th><td><input type='text' name='postalcode' id='seven' value={this.state.office_data[this.state.office_index].postalcode} onChange={(event)=>this.ChangeData(event)} /></td></tr>
                           <tr><th>State</th><td><input type='text' name='state' id='eight'  value={this.state.office_data[this.state.office_index].state} onChange={(event)=>this.ChangeData(event)} /></td></tr>
                           <tr><th>Territory</th><td><input type='text' name='territory' id='nine'  value={this.state.office_data[this.state.office_index].territory} onChange={(event)=>this.ChangeData(event)} /></td></tr>

                        </tbody>
                    </table>


                    <div className={'inlineDisplay'}>
                    <pre> <button className={this.state.office_index === 0 ? 'displyNone':''} onClick={()=>this.Decreasevalue()}>Previous</button> {this.state.office_index+1} out of {this.state.office_count}  <button className={this.state.office_index === this.state.office_count-1 ? 'displyNone':''}  onClick={()=>this.Increasevalue()}>Next</button>  </pre>
                    </div><br/>
                    <pre> <button className={this.state.isActive ? 'displyNone':''} onClick={()=>this.DeleteData()}>Delete</button>  <button onClick={()=>this.UpdateData()} > Save </button> <button onClick={()=>this.ClearForm()} > Clear Form to add new data </button> </pre>



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