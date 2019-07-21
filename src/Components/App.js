import React from 'react';
import Board from './Board'

import '../Styles/App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      block: [],
      startingPositionSquare: [[1,4],[1,5],[0,4],[0,5]],
      startingPositionZigOne: [[1,5],[1,6],[0,5],[0,6]]
    }
    this.generateBoard = this.generateBoard.bind(this);
    this.keyboard = this.keyboard.bind(this);
  }

  straitPiece(){
    let board = this.state.board.slice();
    let pos = this.state.startingPositionSquare.slice();
    this.squarePiece();
    const move = setInterval(()=> {
      for (let i=0; i<4; i++) {
        board[pos[i][0]+1][pos[i][1]] = Object.assign({},this.occupiedSquare());
        board[pos[i][0]][pos[i][1]] = Object.assign({},this.nonOccupiedSquare());
        pos[i][0] = pos[i][0]+1;
        this.setState({board: board, startingPositionSquare: pos});
      }
      if (pos[0][0] === 19 || board[pos[0][0]+1][pos[0][1]].occupied === true || board[pos[1][0]+1][pos[1][1]].occupied === true) {
        clearInterval(move);
        this.setState({startingPositionSquare: [[1,4],[1,5],[0,4],[0,5]]});
        this.straitPiece();
      }
    }, 200);
  }

  occupiedSquare(){
    const square = {
      occupied: true,
      // border: "solid",
      color: "red"
    }
    return square;
  }
  nonOccupiedSquare(){
    const square = {
      occupied: false,
      // border: null,
      color: null
    }
    return square;
  }

  squarePiece(){
    let board = this.state.board.slice();
    board[0][4] = Object.assign({},this.occupiedSquare());
    board[0][5] = Object.assign({},this.occupiedSquare());
    board[1][4] = Object.assign({},this.occupiedSquare());
    board[1][5] = Object.assign({},this.occupiedSquare());
    return board;
  }

  tPiece(){
    let board = this.state.board.slice();
    board[0][5] = Object.assign({},this.occupiedSquare());
    board[1][4] = Object.assign({},this.occupiedSquare());
    board[1][5] = Object.assign({},this.occupiedSquare());
    board[1][6] = Object.assign({},this.occupiedSquare());
    return board;
  }
  lpieceOne(){

  }
  lpieceTwo(){

  }
  zigzagPieceOne(){
    let board = this.state.board.slice();
    board[0][5] = Object.assign({},this.occupiedSquare());
    board[0][6] = Object.assign({},this.occupiedSquare());
    board[1][5] = Object.assign({},this.occupiedSquare());
    board[1][6] = Object.assign({},this.occupiedSquare());
    return board;
  }
  zigzagePieceTwo(){

  }

  componentWillMount(){
    this.setState({board: this.createBoard()});
  }
  componentDidMount(){
    this.setState({board: this.squarePiece()});
  }

  createBoard(){
    let completeBoard = [];
    let row = [];
    const square = {
      occupied: false,
      // border: null,
      color: null
    }
    for (let i =0; i<20; i++) {
      for (let j=0; j<10; j++) {
        row.push(Object.assign({},square));
      }
      completeBoard.push(row);
      row = [];
    }
    console.log(completeBoard);
    return completeBoard;
  }

  test(y,x){
    const currentSquare = this.state.board[y][x];
    const style = {
      // borderStyle: currentSquare.border,
      backgroundColor: currentSquare.color
    }
    return style;
  }

  generateBoard(board){
    return(
      <table>
        <tbody>
        {board.map((row,indexY)=>{
          return <tr key={indexY}>
                   {row.map((square,indexX)=>{
                     return <td style={this.test(indexY,indexX)} key={indexX}></td>
                   })}
                 </tr>
        })}
        </tbody>
      </table>
    ) 
  }
  clone(){
    let arr = [];
    for (let i=0; i<4; i++) {
      arr.push(this.state.startingPositionSquare[i].slice());
    }
    return arr;
  }

  keyboard(event){
    let board = this.state.board.slice();
    let pos = this.state.startingPositionSquare.slice();
    console.log("first",pos);
    if (event.key === "ArrowLeft") {
      pos.sort((a,b)=>{
        return a[1] - b[1];
      });
      for (let i=0; i<4; i++) {
        board[pos[i][0]][pos[i][1]-1] = Object.assign({},this.occupiedSquare());
        board[pos[i][0]][pos[i][1]] = Object.assign({},this.nonOccupiedSquare());
        pos[i][1] = pos[i][1]-1;
        this.setState({board: board, startingPositionSquare: pos});
      }
    }
    if (event.key === "ArrowRight") {
      pos.sort((a,b)=>{
        return b[1] - a[1];
      });
       for (let i=0; i<4; i++) {
         board[pos[i][0]][pos[i][1]+1] = Object.assign({},this.occupiedSquare());
         board[pos[i][0]][pos[i][1]] = Object.assign({},this.nonOccupiedSquare());
         pos[i][1] = pos[i][1]+1;
        console.log("second",pos);
        this.setState({board: board, startingPositionSquare: pos});
      }
    }
  }

  render(){
    return (
      <div>
        <p onClick={()=>{this.straitPiece()}}>Click ME</p>
        <Board 
          generateBoard={this.generateBoard}
          board={this.state.board}
          keyboard={this.keyboard}/> 
      </div>
    );
  }
}

export default App;
