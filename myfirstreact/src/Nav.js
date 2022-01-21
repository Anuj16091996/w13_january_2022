import React from 'react'

class Nav extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        if (this.props.mylink) {
            return (
                <nav>
                    <li> <a href="/">Home</a>   </li>
                    <li> <a href={this.props.mylink}>Variable Link</a> </li>
                </nav>
            )
        }else {
                return(
                    <div>Error Link not provided</div>
                )
        }

    }
}

export default Nav
