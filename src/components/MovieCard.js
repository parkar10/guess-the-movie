import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import RenderQuestion from './RenderQuestion'
import { faPlay, faArrowAltCircleRight, faAngleDoubleRight, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class MovieCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie:{},
            base_url:"https://ukowhbd3o4.execute-api.us-east-1.amazonaws.com/dev/movies",
            movies:[],
            movie_title:"",
            isPlaying: 0,
            startBtn:"block",
            confirmCard: "none",
            questionCard: "none",
            blank_indices: [],
            score: 0,
            getDeductedScore:0,
            hash:0
            

        }
        this.grabresponse = this.grabresponse.bind(this);
        this.displayQuestionCard = this.displayQuestionCard.bind(this);
        this.displayConfirmCard = this.displayConfirmCard.bind(this);
    }
    grabresponse = response => {
        this.setState({
            movies: response.data,
        })
        this.getMovieTitle()
    }
    componentDidMount(){
        axios.get('https://ukowhbd3o4.execute-api.us-east-1.amazonaws.com/dev/movies')
        .then(this.grabresponse)
        .catch(error => console.log(error))
    }
    getMovieTitle(){
        var movies = this.state.movies
        let movie_title, movie
        if(movies.length!==0){
            var indx =  Math.floor(Math.random() * 170)
            movie = movies[indx]
            movie_title = movie.title
        }
        console.log(movie_title)
        for (var random_array = [], i=0;i<movie_title.length;i++) random_array[i]=2*i+1;
        var current = this.shuffleRandomEvenNumber(movie_title.length,1)
        random_array.push(this.shuffleRandomEvenNumber(movie_title.length,current))
        this.setState({
            movie:((movie!==null)?movie:null),
            movie_title:((movie_title!==null)?movie_title:null),
            blank_indices:((random_array!==null)?random_array:null)
        })
        return movie_title
    }
    shuffleRandomEvenNumber(Max,lastrandomNumber) {
        var current = Math.floor(Math.random() * (Max));
        while(lastrandomNumber==current){
            current = Math.floor(Math.random() * (Max));
        }
        if(current%2!=0){
            current++;
        }
        return current;
    } 
    reloadpage = (score,hash) => {
        this.props.onWin(score,hash)
        this.setState({
            confirmCard:"block",
            questionCard:"none",
            movie_title: this.getMovieTitle(),
            score: score,

        })
    }
    displayConfirmCard = () => {
        this.setState({
            confirmCard:"block",
            startBtn:"none"
        })

        
    }
    displayQuestionCard(){
        this.setState({
            questionCard:"block",
            confirmCard:"none"
        })
        this.props.getMovieObj(this.state.movie)
    }
    
    render() {
        return (
            <center>
            {(this.state.startBtn !=="none")?<Button variant="dark" size='lg' style={{margin:'60px'}} onClick = {this.displayConfirmCard}>Lets Play  &nbsp; <FontAwesomeIcon  icon={faChevronCircleRight}  /></Button>:""}
            {(this.state.confirmCard !=="none")?
            <Card style={{ width: '100%'}}>
                <Card.Body>
                    <Card.Title>
                        Click on play button to start playing!
                    </Card.Title>
                    <Button size='lg' variant="primary" onClick = {this.displayQuestionCard}> Play &nbsp; <FontAwesomeIcon  icon={faArrowAltCircleRight}  /></Button>
                </Card.Body>
            </Card>
            :""}
            {(this.state.questionCard !=="none")?
            <Card style={{ width: '90%'}}>
                <Card.Body>
                    <Card.Text>
                        <RenderQuestion handler={this.reloadpage} movieObj={this.state.movie} random_array={this.state.blank_indices} movie_title={this.state.movie_title} />
                    </Card.Text>
                </Card.Body>
            </Card>
            :""}
                
                
            </center>
        )
    }
}

export default MovieCard
