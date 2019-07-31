import React from 'react';
import Board from './Board'

import '../Styles/App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      block: [],
      numb: 0,
      rotate: 1,
      startingPositionSquare: [[1,4],[1,5],[0,4],[0,5]],
      startingPositionZigOne: [[1,5],[1,6],[0,4],[0,5]],
      startingPositionZigTwo: [[1,4],[1,5],[0,5],[0,6]]
    }
    this.generateBoard = this.generateBoard.bind(this);
    this.keyboard = this.keyboard.bind(this);
  }
  randomPiece(){
    const randomNum = 1//Math.floor(Math.random() * 3)
    const position = [this.state.startingPositionSquare,this.state.startingPositionZigOne,this.state.startingPositionZigTwo];
   // const block = [this.squarePiece,this.zigzagPieceOne];
    const reset = [
      [[1,4],[1,5],[0,4],[0,5]],
      [[1,5],[1,6],[0,4],[0,5]],
      [[1,4],[1,5],[0,5],[0,6]]
    ];
    const blockType = ["startingPositionSquare","startingPositionZigOne","startingPositionZigTwo"];
    const color = ["red","blue","orange"];
    const obj = {
      p: position[randomNum],
    //  b: block[randomNum],
      r: reset[randomNum],
      t: blockType[randomNum],
      n: randomNum,
      c: color[randomNum],
    }
    this.setState({numb: randomNum});
    return obj;
  }

  runGame(){
    let board = this.state.board.slice();
    let pos = this.randomPiece();
  //  const run = [()=>this.nextPieceSquare(pos,board,move),()=>this.nextPieceZigOne(pos,board,move),()=>this.nextPieceZigTwo(pos,board,move)];
    const move = setInterval(()=> {

      for (let i=0; i<4; i++) {
        board[pos.p[i][0]+1][pos.p[i][1]] = Object.assign({},this.occupiedSquare(pos.c));
        board[pos.p[i][0]][pos.p[i][1]] = Object.assign({},this.nonOccupiedSquare());
        pos.p[i][0] = pos.p[i][0]+1;
        this.setState({board: board, [pos.t]: pos.p});
      }
      //run[this.state.numb]();
      this.nextPieceZigOne(pos,board,move);

    }, 200);
  }
///

nextPieceSquare(pos,board,move){
  if (pos.p[0][0] === 19 || board[pos.p[0][0]+1][pos.p[0][1]].occupied === true || board[pos.p[1][0]+1][pos.p[1][1]].occupied === true) {
    clearInterval(move);
    this.setState({[pos.t]: pos.r});
    this.runGame();
  }
}
nextPieceZigOne(pos,board,move){
  let block;
  if (this.state.rotate === 1) {
    block = board[pos.p[2][0]+1][pos.p[2][1]].occupied;
  } else if (this.state.rotate === 2) {
    block = "true";
  }
  if (pos.p[0][0] === 19 || board[pos.p[0][0]+1][pos.p[0][1]].occupied === true || board[pos.p[1][0]+1][pos.p[1][1]].occupied === true || block === true) {
    clearInterval(move);
    this.setState({[pos.t]: pos.r,rotate:1});
    this.runGame();
  }
}
nextPieceZigTwo(pos,board,move){
  if (pos.p[0][0] === 19 || board[pos.p[0][0]+1][pos.p[0][1]].occupied === true || board[pos.p[1][0]+1][pos.p[1][1]].occupied === true || board[pos.p[3][0]+1][pos.p[3][1]].occupied === true) {
    clearInterval(move);
    this.setState({[pos.t]: pos.r});
    this.runGame();
  }
}


////
  rotateRightZigOne(position){
    const rotate = position//.slice();
    console.log(rotate);
    rotate[2][1] = rotate[2][1]+2;
    rotate[3][0] = rotate[3][0]+2;
    return rotate;
  }
  rotateLeftZigOne(position){
    const rotate = position.slice();
    rotate[2][1] = rotate[2][1]-2;

    rotate[3][0] = rotate[3][0]+1;
    rotate[3][1] = rotate[3][1]-1;

    rotate[1][0] = rotate[1][0]+1;
    rotate[1][1] = rotate[1][1]+1;
  }

  occupiedSquare(color){
    const square = {
      occupied: true,
      color: color
    }
    return square;
  }
  nonOccupiedSquare(){
    const square = {
      occupied: false,
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
    board[0][4] = Object.assign({},this.occupiedSquare());
    board[0][5] = Object.assign({},this.occupiedSquare());
    board[1][5] = Object.assign({},this.occupiedSquare());
    board[1][6] = Object.assign({},this.occupiedSquare());
    return board;
  }
  zigzagePieceTwo(){

  }

  componentWillMount(){
  //  this.randomPiece();
    this.setState({board: this.createBoard()});
  }
  componentDidMount(){
//    this.setState({board: this.zigzagPieceOne()});
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
  cloneArr(startingPosition){
    let arr = [];
    for (let i=0; i<4; i++) {
      arr.push(startingPosition[i].slice());
    }
    return arr;
  }

  keyboard(event){
    console.log(
      event.key)
    let board = this.state.board.slice();
    let pos;
    const position = [this.state.startingPositionSquare.slice(),this.state.startingPositionZigOne.slice(),this.state.startingPositionZigTwo.slice()];
    const color = ["red","blue","orange"];
    pos = position[this.state.numb];
    if (event.key === "ArrowLeft") {
      pos.sort((a,b)=>{
        return a[1] - b[1];
      });
      for (let i=0; i<4; i++) {
        board[pos[i][0]][pos[i][1]-1] = Object.assign({},this.occupiedSquare(color[this.state.numb]));
        board[pos[i][0]][pos[i][1]] = Object.assign({},this.nonOccupiedSquare());
        pos[i][1] = pos[i][1]-1;
        this.setState({board: board, [position[this.state.numb]]: pos});
      }
    }
    if (event.key === "ArrowRight") {
      pos.sort((a,b)=>{
        return b[1] - a[1];
      });
       for (let i=0; i<4; i++) {
         board[pos[i][0]][pos[i][1]+1] = Object.assign({},this.occupiedSquare(color[this.state.numb]));
         board[pos[i][0]][pos[i][1]] = Object.assign({},this.nonOccupiedSquare());
         pos[i][1] = pos[i][1]+1;
        this.setState({board: board, [position[this.state.numb]]: pos});
      }
    }
    if (event.key === "z") {
      // pos.sort((a,b)=>{
      //   return b[0] - a[0];
      // });
      console.log(pos);
       board[pos[2][0]][pos[2][1]+2] = Object.assign({},this.occupiedSquare(color[this.state.numb]));
       board[pos[2][0]][pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

       board[pos[0][0]+1][pos[0][1]] = Object.assign({},this.occupiedSquare(color[this.state.numb]));
       board[pos[0][0]][pos[0][1]] = Object.assign({},this.nonOccupiedSquare());

       board[pos[3][0]+1][pos[3][1]] = Object.assign({},this.occupiedSquare(color[this.state.numb]));
       board[pos[3][0]][pos[3][1]] = Object.assign({},this.nonOccupiedSquare());

      pos[2][1] = pos[2][1]+2;
      pos[3][0] = pos[3][0]+1;
      pos[0][0] = pos[0][0]+1;

     this.setState({board: board,[position[this.state.numb]]: pos,rotate:2})

    }
    
  }

  render(){
    return (
      <div>
        <p onClick={()=>{this.runGame()}}>Click ME</p>
        <Board 
          generateBoard={this.generateBoard}
          board={this.state.board}
          keyboard={this.keyboard}/> 
      </div>
    );
  }
}

export default App;
