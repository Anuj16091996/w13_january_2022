import React from 'react'


class SelectList extends React.Component{
    render () {

        if (!this.props.array) {
            return <p>Error in SelectList Component: Array Not Passed</p>
        }
        function MappingElements(array,index){
            return  < option key={index} value={array.code}> {array.name} </option>
        }

        let arrayItems=this.props.array.map(MappingElements)
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