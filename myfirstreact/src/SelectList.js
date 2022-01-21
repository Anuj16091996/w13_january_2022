import React from 'react'


class SelectList extends React.Component{
    render () {

        if (!this.props.array) {
            return <p>Error in SelectList Component: Array Not Passed</p>
        }

        let arrayItems=this.props.array.map((data,index) => {
            return  < option key={index} value={data.code}> {data.name} </option>
        })
        if (this.props.array) {
            return (
                <div>
                    <select> {arrayItems} </select></div>
            )
        }else {
                return(
                    <div>Error Link not provided</div>
                )
        }

    }
}

export default SelectList