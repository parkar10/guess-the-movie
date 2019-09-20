import React, { Component } from 'react'
import ChancesDisplay from './ChancesDisplay'
import ShowAlertWrong from './ShowAlertWrong'
import ShowAlertRight from './ShowAlertRight'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { faBullseye, faMehBlank, faLaughBeam} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class RenderQuestion extends Component {
    constructor(props) {
        super(props)
    

        this.state = {
            lostChances:-1,
            randomNumber: 0,
            hideAlertValRight:0,
            hideAlertValWrong:0,
            gameCard:"block",
            infoCardWon:"none",
            infoCardLost:"none",
            score:0,
            infoCardNewgameBtn:"none"
       }
       this.hideAlert = this.hideAlert.bind(this);
       this.callFillInputs = this.callFillInputs.bind(this);
       
    }




    callFillInputs = () => {
        var iparray = document.getElementsByClassName("inputBoxes")
          for(var i = 0; i < iparray.length; i++){
              iparray[i].value = iparray[i].id
        }
    }
    checkAnswer = event => {
        var c = event.target.id;
        if(event.target.value == c){
            this.setState({
                hideAlertValWrong: 0,
                hideAlertValRight: 1
            });
            event.target.readonly  = "true"
            event.target.disabled = "true"
            var won = true;
            var iparray = document.getElementsByClassName("inputBoxes")
            for(var i = 0; i < iparray.length; i++){
                if(iparray[i].value==""){
                  won = false;
                }
            }
            if(won){
                
                var score = this.state.lostChances
                score =  9 - score
                score *= 10
                
                this.setState({
                        hideAlertValRight:0,
                        gameCard: "block",
                        infoCardWon: "block",
                        score:score
                    });
            }
        }
        else{
            this.setState((prevState) => ({
                lostChances: prevState.lostChances + 1,
            }));
            if(this.state.lostChances==7){
                this.setState({
                    hideAlertValWrong:0,
                    gameCard: "block",
                    infoCardLost: "block"
                })
                var iparray = document.getElementsByClassName("inputBoxes")
                for(var i = 0; i < iparray.length; i++){
                    iparray[i].disabled = 'true'
                }
            }
            else{
                this.setState({
                    hideAlertValWrong: 1,
                    hideAlertValRight: 0
                });
            }
            event.target.value  = ""
        }
    }
    hideAlert = () => {
        this.setState({
            hideAlertValRight:0,
            hideAlertValWrong:0
        })
    } 
    sendData = () => {
        this.props.handler(this.state.score,Math.random());
        this.setState({
            infoCardNewgameBtn:"block"
        })
    }  
    render() {
        var movie_title = this.props.movie_title;
        var random_array = this.props.random_array;
        movie_title = movie_title.toLowerCase();
        var title_array = movie_title.split("")
        var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        const rendered = []
        for (var i = 0; i < title_array.length; i++) {
            var c = title_array[i]
            if(title_array[i]!==" "){
                if((!random_array.includes(i))||format.test(title_array[i])){
                    rendered.push(<span style={{verticalAlign:'top',width:'40px',marginLeft:"20px"}}>{title_array[i]} </span>)
                }
                else{
                    rendered.push(<input style={{display:'inline',width:'40px',border:'1px solid black',marginLeft:"10px",textAlign:'center',borderWidth: ' 0 0 2px'}} className="inputBoxes" id={c} onChange={this.checkAnswer} onClick={this.hideAlert} maxLength="1" ></input>)
                }
            }
            else{
                rendered.push(<span> &nbsp; &nbsp;</span>)
            }
        }
        return (
            <>
                <div style={{padding:'10px',fontSize : '30px', display: this.state.gameCard}} >
                    {rendered}
                    <br></br><br></br>
                    <ChancesDisplay lostChances = {this.state.lostChances}/>
                    {(this.state.hideAlertValWrong==0)?"":<ShowAlertWrong ></ShowAlertWrong>}
                    {(this.state.hideAlertValRight==0)?"":<ShowAlertRight ></ShowAlertRight>}
                </div>
                <Alert variant="success"  style={{padding:'10px',fontSize : '30px', display: this.state.infoCardWon}} >
                    
                    Hurray, You won the game!  <FontAwesomeIcon icon={faLaughBeam} /><br/>
                    <Button size="lg" variant="success" onClick={this.sendData}>Get Score</Button>
                </Alert>
                <Alert variant="danger"  style={{padding:'10px',fontSize : '30px', display: this.state.infoCardLost}} >
                    Sorry, You lost the game! <FontAwesomeIcon icon={faMehBlank} />
                    <br/><br/>
                    <Button size="lg" variant="danger" onClick={this.callFillInputs}>View Answers</Button> &nbsp;
                    <Button size="lg" variant="danger" onClick={this.sendData}>Play another one</Button>
                </Alert>
            </>
        )
    }
}

export default RenderQuestion