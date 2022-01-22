import React from 'react'
import './Footer.css'


class Footer extends React.Component{
    render () {
        if (this.props.name) {
            return (
                   <p> <footer> {this.props.name} </footer></p>
            )
        }else {
                return(
                    <div>Error Link not provided</div>
                )
        }

    }
}

export default Footer