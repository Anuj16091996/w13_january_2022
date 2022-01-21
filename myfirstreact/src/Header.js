import React from 'react'


class Header extends React.Component{
    render () {
        if (this.props.name) {
            return (
                    <header> {this.props.name} </header>
            )
        }else {
                return(
                    <div>Error Link not provided</div>
                )
        }

    }
}

export default Header