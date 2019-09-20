import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import HeaderPart from './HeaderPart';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
class FrontPanel extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             score:0,
             hash:0
        }
    }
    
    callbackFunction = (score,hash) => {
        //console.log(score)
        this.setState({
            score: score,
            hash:hash
        })
    }  
    render() {
        return (
            <div className="App">
                <br/><br/>
                <Row>
                <Col sm={2}>
                    <LeftPanel hash={this.state.hash} score = {this.state.score}/>
                </Col>
                <Col sm={1}>
                </Col>
                <Col sm={8}>
                    <div><RightPanel  onWin = {this.callbackFunction} /></div>
                </Col>
                </Row>


            
            </div>
        )
    }
}

export default FrontPanel
