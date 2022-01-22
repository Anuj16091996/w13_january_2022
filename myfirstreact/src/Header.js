import React from 'react'
import style from  './Header.module.css'

class Header extends React.Component{
    render () {
        if (this.props.name) {
            return (
                    <header>
                        <p className={style.p}> Some Text</p>
                         <h2> {this.props.name} </h2> </header>
            )
        }else {
                return(
                    <div>Error Link not provided</div>
                )
        }

    }
}

export default Header