import React from 'react';
import Board from './Board';
import Zblock from '../Classes/Zblock';
import Sblock from '../Classes/Sblock';
import Iblock from '../Classes/Iblock';

import '../Styles/App.css';

const Z = new Zblock();
const S = new Sblock();
const I = new Iblock();


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      block: [],
      numb: 0,
      rotate: 0,
      startingPositionSquare: [[1,4],[1,5],[0,4],[0,5]],
      startingPositionZ: [[1,5],[1,6],[0,4],[0,5]],
      startingPositionS: [[1,4],[1,5],[0,5],[0,6]],
      startingPositionI: [[0,3],[0,4],[0,5],[0,6]]
    }
    this.generateBoard = this.generateBoard.bind(this);
    this.keyboard = this.keyboard.bind(this);
  }
  randomPiece(){
    const randomNum = Math.floor(Math.random() * 4)
    const position = [this.state.startingPositionSquare,this.state.startingPositionZ,this.state.startingPositionS,this.state.startingPositionI];
    const reset = [
      [[1,4],[1,5],[0,4],[0,5]],
      [[1,5],[1,6],[0,4],[0,5]],
      [[1,4],[1,5],[0,5],[0,6]],
      [[0,3],[0,4],[0,5],[0,6]]
    ];
    const blockType = ["startingPositionSquare","startingPositionZ","startingPositionS","startingPositionI"];
    const color = ["red","blue","orange","yellow"];
    const obj = {
      p: position[randomNum],
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
    const run = [()=>this.nextPieceSquare(pos,board,move),()=>this.nextPieceZ(pos,board,move),()=>this.nextPieceS(pos,board,move),()=>this.nextPieceI(pos,board,move)];
    const move = setInterval(()=> {
      for (let i=0; i<4; i++) {
        board[pos.p[i][0]+1][pos.p[i][1]] = Object.assign({},this.occupiedSquare(pos.c));
        board[pos.p[i][0]][pos.p[i][1]] = Object.assign({},this.nonOccupiedSquare());
        pos.p[i][0] = pos.p[i][0]+1;
        this.setState({board: board, [pos.t]: pos.p});
      }
      run[this.state.numb]();
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
nextPieceZ(pos,board,move){
  let block;
  if (this.state.rotate === 0) {
    block = board[pos.p[2][0]+1][pos.p[2][1]].occupied;
  } else if (this.state.rotate === 1) {
    block = "true";
  }
  if (pos.p[0][0] === 19 || board[pos.p[0][0]+1][pos.p[0][1]].occupied === true || board[pos.p[1][0]+1][pos.p[1][1]].occupied === true || block === true) {
    clearInterval(move);
    this.setState({[pos.t]: pos.r,rotate:0}); //reset rotate to 0
    this.runGame();
  }
}

nextPieceS(pos,board,move){
  let block;
  if (this.state.rotate === 0) {
    block = board[pos.p[3][0]+1][pos.p[3][1]].occupied;
  } else if (this.state.rotate === 1) {
    block = "true";
  }
  if (pos.p[1][0] === 19 || board[pos.p[1][0]+1][pos.p[1][1]].occupied === true || board[pos.p[0][0]+1][pos.p[0][1]].occupied === true || block === true) {
    clearInterval(move);
    this.setState({[pos.t]: pos.r,rotate:0});
    this.runGame();
  }
}

nextPieceI(pos,board,move){
  let blockOne;
  let blockTwo;
  let blockThree;

  if (this.state.rotate === 0 && pos.p[1][0]+1 <= 19) {
    blockOne = board[pos.p[1][0]+1][pos.p[1][1]].occupied;
    blockTwo = board[pos.p[2][0]+1][pos.p[2][1]].occupied;
    blockThree = board[pos.p[3][0]+1][pos.p[3][1]].occupied;
  } else if (this.state.rotate === 1) {
    blockOne = "true";
    blockTwo = "true";
    blockThree = "true";
  }

  if (pos.p[0][0] === 19 || board[pos.p[0][0]+1][pos.p[0][1]].occupied === true || blockOne === true || blockTwo === true || blockThree === true) {
    clearInterval(move);
    this.setState({[pos.t]: pos.r,rotate:0});
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
    console.log(event.key)
    let board = this.state.board.slice();
    let pos;
    const position = [this.state.startingPositionSquare.slice(),this.state.startingPositionZ.slice(),this.state.startingPositionS.slice(),this.state.startingPositionI.slice()];
    const color = ["red","blue","orange","yellow"];
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
   const rotatePiece = [()=>this.square(),()=>this.rotateZig(board,pos,color,this.state.numb),()=>this.rotateS(board,pos,color,this.state.numb),()=>this.rotateI(board,pos,color,this.state.numb)];
    if (event.key === "z") {
      console.log(pos);
      rotatePiece[this.state.numb]();
  //  this.rotateI(board,pos,color,this.state.numb);
     this.setState({board: board,[position[this.state.numb]]: pos})
    }
  }

  square(){
    return null;
  }

  rotateZig(board,pos,color,numb){
    if (this.state.rotate === 0){
      this.setState({rotate: 1,board:Z.rotateOne(board,pos,color,numb)[0](),[pos]:Z.rotateOne(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 1) {
      this.setState({rotate: 0, board:Z.rotateTwo(board,pos,color,numb)[0](),[pos]:Z.rotateTwo(board,pos,color,numb)[1]()});
    }
  }

  rotateS(board,pos,color,numb){
    if (this.state.rotate === 0){
      this.setState({rotate: 1,board:S.rotateOne(board,pos,color,numb)[0](),[pos]:S.rotateOne(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 1) {
      this.setState({rotate: 0, board:S.rotateTwo(board,pos,color,numb)[0](),[pos]:S.rotateTwo(board,pos,color,numb)[1]()});
    }
  }

  rotateI(board,pos,color,numb){
    if (this.state.rotate === 0){
      this.setState({rotate: 1,board:I.rotateOne(board,pos,color,numb)[0](),[pos]:I.rotateOne(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 1) {
      this.setState({rotate: 0, board:I.rotateTwo(board,pos,color,numb)[0](),[pos]:I.rotateTwo(board,pos,color,numb)[1]()});
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
