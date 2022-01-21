import React from 'react'


class Footer extends React.Component{
    render () {
        if (this.props.name) {
            return (
                    <footer> {this.props.name} </footer>
            )
        }else {
                return(
                    <div>Error Link not provided</div>
                )
        }

    }
}

export default Footer