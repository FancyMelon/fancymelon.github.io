import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}
// passing a function as the onClick prop, React only call this function after a click
// To store the value, use "state"
// change the value when the square is "clicked"
// need to always call "super" when defining the constructor of a subclass
// Call this.setState from an onclick handler in render method 
//-> re-render it when the button is clicked. The state value would change to 'X'
// we no longer need Square to keep track of game's state
// change class to function component: this.props -> props, shorten the onClick
class Board extends React.Component {

// in handleClick, xIsNext is flipped when one turn is finished
  renderSquare(i) {
      return (
      <Square 
        value={this.props.squares[i]}
        onClick={()=>this.props.onClick(i)}
      />
      );
  }
    // define the array with null first
    //renderSquare to read from it
    // pass down the renderSquare function from Board to Square
    // call the function when clicked
    // on[Event] represent events, handle[Event] for the methods which handle the event
    // handleClick: .slice() to create a copy of squares to modify
    // to pass the locaction of each square into the onClick builder

  render() {
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
      };
    }
    // remove the squares state from its child Board component
    // lift state up

    handleClick(i){
      const history = this.state.history;
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i])){
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        xIsNext: !this.state.xIsNext,
      });
    }
    // concatenate new history entries onto history


    render() {
      const history = this.state.history;
      const current = history[history.length - 1];
      const winner = calculateWinner(current.squares);
      
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move:
          'Go to game start';
        return (
          <li>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )；
      });
      // use of map method to map history of moves to React elements representing buttons
      // for each move in the history, create a list item which contains a button
      // the onClick handler in button calls a method called this.jumpTo
      let status;
      if (winner){
        status = 'Winner' + winner;
      }
      else{
        status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  // to use the most recent history entry to determine and display the game's status
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
function calculateWinner(squares) 
{
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}
// a function to calculate the winner, return 'X' or 'O' or null
