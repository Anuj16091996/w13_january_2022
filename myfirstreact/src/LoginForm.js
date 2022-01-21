import React from 'react'


class LoginForm extends React.Component{
    constructor(props){
        super(props)
        //saving intial value in state
        this.state={'username':this.props.username,'pw':this.props.pw}
    }

    ChangeData=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    render (){
        return(
        <form style={{border:"2px solid blue"}}>
               Username: <input type="text" name='username' value={this.state.username} onChange={(event)=>this.ChangeData(event)}/> <br />
                Password :<input type="text" name='pw' value={this.state.pw} onChange={(event)=>this.ChangeData(event)} /><br/>
                <button >Continue</button>
        </form>
    )}
}



export default LoginForm