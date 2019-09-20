import React, { Component } from 'react';
import { faBullseye, faArrowAltCircleRight, faAngleDoubleRight, faFire, faStar, faAward, faFireAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card';
export class LeftPanel extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             timesPlayed:0,
             timesWon:0,
             score:0,
             scoreInThisRound:0
        }
    }
    updateScore = () => {
        this.setState( prevState => {
            return {
                scoreInThisRound:this.props.score,
                timesWon: prevState.timesWon + 1,
                timesPlayed: prevState.timesPlayed + 1,
                score: prevState.score + this.props.score
            }

        })
    }

    componentDidUpdate(prevProps) {
        //console.log(this.props.hash+" "+prevProps.hash)
        if(this.props.hash!=prevProps.hash)
            this.updateScore()
        
    }
    render() {
        console.log()
        return (
            <center>  
                <Card style={{ width: '28rem',margin:'30px' }}>
                    <Card.Body>
                        <Card.Title><h2>Your Score <FontAwesomeIcon icon={faBullseye} /></h2></Card.Title>
                        <Card.Text><br/>
                            <h5><b>Games Won:</b> {this.state.timesWon}</h5><br/>
                            <h5><b>Total Score:</b> {this.state.score} {(this.state.scoreInThisRound==500)? <FontAwesomeIcon icon={faAward} />:""}</h5><br/>
                            <h5><b>Score in last round:</b> {this.state.scoreInThisRound} {(this.state.scoreInThisRound==100)? <FontAwesomeIcon icon={faFireAlt} />:""}</h5>
                        </Card.Text>
                    </Card.Body>
                </Card>
                    
                    
            </center>
        )
    }
}

export default LeftPanel
