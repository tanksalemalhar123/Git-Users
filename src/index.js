import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


const Card = (props) => {
return(
    <div style={{margin: '1em'}}>
    
        <img src={props.avatar} width="75em"/>
   
    <div style={{display:'inline-block', marginLeft: 10}}>
        <div style={{fontSize:'1.25em', fontWeight:'bold'}}> {props.name}</div>
        <div> {props.company}</div>
    </div>
    </div>
);
}

const CardList = (props) =>{
    return(
        <div>
         {props.cards.map(card => <Card name={card.name}  company={card.company} avatar={card.avatar}/>)} 
        </div>
    );
}

class Form extends React.Component{
    state={
        userName : ' '
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('test');
        axios.get(`https://api.github.com/users/${this.state.userName}`)
        .then(resp => {
            this.props.Submit(resp.data);
        })
    }
    
    
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Github username" required value={this.state.userName} onChange={(event) => this.setState({userName: event.target.value})}/>
                <button type="submit">Add Card</button>
            </form>
        );  
    }
}



class App extends React.Component{
 state={
     cards: [ {name:'Paul O’Shannessy', company:'Facebook', avatar:'https://avatars1.githubusercontent.com/u/8445?v=4'},
     {name: 'Malhar Palkar' , company:'Palm' ,avatar:'https://avatars2.githubusercontent.com/u/2237277?v=4'}]
 }

addNewCard = (cardInfo) =>{
   this.setState(prevState =>  ({
       cards: prevState.cards.concat(cardInfo)
   }))
   console.log(cardInfo);
}


    render(){
        return(
            <div>
            <Form Submit={this.addNewCard}/>
            <CardList cards={this.state.cards}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));