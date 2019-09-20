import React, { Component } from 'react'
import MovieCard from './MovieCard';
import BottomPanel from './BottomPanel';
import Jumbotron from 'react-bootstrap/Jumbotron';
class RightPanel extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             score:0,
             movie:{},
             finalScore : 0 ,
             hash:0
        }
    }
    callbackFunction = (score,hash) => {
        this.setState({
            score: score,
            hash:hash
        })
    }
    getMovieObj = (movie) => {
        this.setState({
            movie:movie
        })
    }
    getFinalScore = (finalScore) => {
        this.setState({
            finalScore:(finalScore<0)?0:finalScore
        },() => {
            this.props.onWin(this.state.finalScore,Math.random())
        })
    

    }
    render() {
        return (

            <Jumbotron>
                <h1>Guess the Movie:</h1>
                <p>
                    
                    <MovieCard  onWin = {this.callbackFunction} getMovieObj={this.getMovieObj}/>
                     <br/>
                     <BottomPanel hash={this.state.hash} score={this.state.score}  movieObj={this.state.movie} getFinalScore = {this.getFinalScore}/>
                </p>
            </Jumbotron>
        )
    }
}

export default RightPanel
