import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export class ChancesDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lostChances:-1
        }
        
    }
    
    render() {
        var bollywood = ['B' , 'O' , 'L' , 'L' , 'Y' , 'W' , 'O' , 'O' , 'D']
        let x
        var lostChances_bollywood = bollywood.map((key,index) => (this.props.lostChances>=index)?<Button size="lg" style={{backgroundColor:'red',marginLeft:'5px'}} disabled id={index} key={index}>{key}</Button>:"")
        bollywood = bollywood.map((key,index) => (this.props.lostChances<index)?<Button size="lg" style={{marginLeft:'5px'}} className="primary" id={index} key={index}>{key}</Button>:"")

        return (
            <div style={{padding:'10px',fontSize : '30px'}}>
                {lostChances_bollywood}
                {bollywood}
            </div>
        )
    }
}

export default ChancesDisplay;
