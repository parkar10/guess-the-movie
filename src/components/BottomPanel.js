import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShowHint from './ShowHint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLightbulb, faLaughBeam, faHandPeace, faMehBlank } from '@fortawesome/free-solid-svg-icons'
import Alert from 'react-bootstrap/Alert';


const component = {
    width:'100%',
    height:'1000px'
}
 
export class BottomPanel extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            displayHintBox:0,
            pointsLost:0,
            hints:["actors","directors","genre","releaseYear"],
            displayHints:1,
            currentHint:0,
            currentHintvalue:'',
            movie:{},
            imdbId:"",
            hintsUsed:0,
            score:0,
            displayWonBox:false,
            displayHintbtn:true
        }
    }
    
    selectHint = (event) => {
        var selectedHint = this.state.hints[this.state.currentHint]
        var movie = this.state.movie
        var hintValue = movie[selectedHint]
        this.setState( prevState => {
            return {
                pointsLost: (this.state.pointsLost==40)?40:prevState.pointsLost + 10,
                currentHint: (prevState.currentHint + 1)%4,
                hintsUsed:(this.state.hintsUsed==4)?4:prevState.hintsUsed + 1
            }
        })

        var currentHint = ''
        if(selectedHint != "releaseYear"){
            hintValue = hintValue[0]
            if(selectedHint=='actors'){
                currentHint = hintValue+" was featured in this movie"
            }
            else if(selectedHint=='directors'){
                currentHint = "This movie was directed by in "+hintValue
            }
            else{
                currentHint = "This was a "+hintValue+" movie"
            }
        }
        else{
            currentHint = "This movie was released in "+hintValue
        }
        this.setState({
            currentHintvalue:currentHint
        })
        document.getElementById("showHintModal").click()
    }
    componentDidUpdate(prevProps) {
        if(this.props.movieObj!=prevProps.movieObj)
        {
          this.setState({
              movie:this.props.movieObj,
              pointsLost:0,
              currentHint:0,
              hintsUsed:0,
              displayWonBox:false,
              displayHintbtn:true,
              hash:0
          });
        }
        if(this.props.hash!=prevProps.hash)
        { 
            this.props.getFinalScore(this.props.score-this.state.pointsLost)
            this.setState({
                displayWonBox:true,
                score:this.props.score-this.state.pointsLost
            })
            
        }
    }
    toggleHintBox = () => {
        this.setState( prevState => {
            return {
                displayHintBox: (prevState.displayHintBox + 1)%2
            }

        })
    }
    render() {
        return (
            <>
                {
                    (this.state.displayHintbtn)?
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                
                                {
                                    (this.state.displayWonBox && (this.state.score>0))?
                                        <Alert variant="success"  style={{padding:'10px',fontSize : '30px', display: this.state.infoCardWon}} >
                                            Hurray! Your score is {this.state.score} &nbsp; <FontAwesomeIcon icon={faHandPeace} />
                                        </Alert>
                                        :
                                        ""
                                }
                            <Row>
                                <Col>
                                <Button variant="dark" onClick={this.toggleHintBox}> &nbsp;
                                    <FontAwesomeIcon icon={faLightbulb} />
                                </Button>
                                </Col>
                                
                                {
                                    (this.state.displayHintBox!=0 && 'imdbId' in this.state.movie)?
                                        <>
                                            <Col>
                                                <center><h5><b>Points Lost </b></h5> <h2>{ this.state.pointsLost}</h2> </center>
                                                                            
                                            </Col>
                                            <Col>
                                                <center>
                                                    <h5><b>Hints Used </b></h5>  <h2>{this.state.hintsUsed}</h2>
                                                </center>
                                            
                                            </Col>
                                            <Col>
                                                <center>
                                                    <h5><b>Max Hints </b></h5>   <h2>4</h2>  
                                                </center>                        
                                            </Col>
                                            <Col>
                                                <center>
                                                    <Button onClick={this.selectHint} variant="danger">Get a hint <FontAwesomeIcon icon={faLightbulb} /></Button>
                                                </center>
                                                <ShowHint hint={this.state.currentHintvalue}/>
                                            </Col>
                                        </>
                                    :
                                        "" 
                                }
                            </Row>
                            
                            
                            </Card.Text>
                        </Card.Body>
                    </Card>
                        
                    :
                        "" 
                }
                
            </>
        )
    }
}

export default BottomPanel
