import React from 'react';
import Board from './Board';
import Zblock from '../Classes/Zblock';
import Sblock from '../Classes/Sblock';
import Iblock from '../Classes/Iblock';
import Tblock from '../Classes/Tblock';
import Jblock from '../Classes/Jblock';
import Lblock from '../Classes/Lblock';

import '../Styles/App.css';

const Z = new Zblock();
const S = new Sblock();
const I = new Iblock();
const T = new Tblock();
const J = new Jblock();
const L = new Lblock();

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
      startingPositionI: [[0,3],[0,4],[0,5],[0,6]],
      startingPositionT: [[1,4],[1,5],[1,6],[0,5]],
      startingPositionJ: [[1,4],[1,5],[1,6],[0,4]],
      startingPositionL: [[1,4],[1,5],[1,6],[0,6]]
    }
    this.generateBoard = this.generateBoard.bind(this);
    this.keyboard = this.keyboard.bind(this);
  }
  randomPiece(){
    const randomNum = Math.floor(Math.random() * 7)
    const position = [this.state.startingPositionSquare,this.state.startingPositionZ,this.state.startingPositionS,this.state.startingPositionI,this.state.startingPositionT,this.state.startingPositionJ,this.state.startingPositionL];
    const reset = [
      [[1,4],[1,5],[0,4],[0,5]], //O
      [[1,5],[1,6],[0,4],[0,5]], //Z
      [[1,4],[1,5],[0,5],[0,6]], //S
      [[0,3],[0,4],[0,5],[0,6]], //I
      [[1,4],[1,5],[1,6],[0,5]], //T
      [[1,4],[1,5],[1,6],[0,4]], //J
      [[1,4],[1,5],[1,6],[0,6]]  //L
    ];
    const blockType = ["startingPositionSquare","startingPositionZ","startingPositionS","startingPositionI","startingPositionT","startingPositionJ","startingPositionL"];
    const color = ["red","blue","orange","yellow","green","purple","aqua"];
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
    const run = [()=>this.nextPieceSquare(pos,board,move),()=>this.nextPieceZ(pos,board,move),()=>this.nextPieceS(pos,board,move),()=>this.nextPieceI(pos,board,move),()=>this.nextPieceT(pos,board,move),()=>this.nextPieceJ(pos,board,move),()=>this.nextPieceL(pos,board,move)];
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

nextPieceT(pos,board,move){
  let block;
  if (pos.p[1][0]+1 <= 19 && (this.state.rotate === 0 || this.state.rotate === 2)) {
    block = board[pos.p[1][0]+1][pos.p[1][1]].occupied;
  } else if (this.state.rotate === 1 && this.state.rotate === 3) {
    block = "true";
  }
  if (pos.p[0][0] === 19 || board[pos.p[0][0]+1][pos.p[0][1]].occupied === true || board[pos.p[2][0]+1][pos.p[2][1]].occupied === true || block === true) {
    clearInterval(move);
    this.setState({[pos.t]: pos.r,rotate:0});
    this.runGame();
  }
}

nextPieceJ(pos,board,move){
  let block;
  if (pos.p[1][0]+1 <= 19 && (this.state.rotate === 0 || this.state.rotate === 2)) {
    block = board[pos.p[2][0]+1][pos.p[2][1]].occupied;
  } else if (this.state.rotate === 1 || this.state.rotate === 3) {
    block = "true";
  }
  if (pos.p[0][0] === 19 || board[pos.p[0][0]+1][pos.p[0][1]].occupied === true || board[pos.p[1][0]+1][pos.p[1][1]].occupied === true || block === true) {
    clearInterval(move);
    this.setState({[pos.t]: pos.r,rotate:0});
    this.runGame();
  }
}

nextPieceL(pos,board,move){
  let block;
  if (this.state.rotate === 0 || this.state.rotate === 2) {
    block = board[pos.p[1][0]+1][pos.p[1][1]].occupied;
  } else if (this.state.rotate === 1 || this.state.rotate === 3) {
    block = "true";
  }
  if (pos.p[0][0] === 19 || board[pos.p[0][0]+1][pos.p[0][1]].occupied === true || board[pos.p[2][0]+1][pos.p[2][1]].occupied === true || block === true) {
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
    const position = [this.state.startingPositionSquare.slice(),this.state.startingPositionZ.slice(),this.state.startingPositionS.slice(),this.state.startingPositionI.slice(),this.state.startingPositionT.slice(),this.state.startingPositionJ.slice(),this.state.startingPositionL.slice()];
    const color = ["red","blue","orange","yellow","green","purple","aqua"];
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
   const rotatePiece = [()=>this.square(),()=>this.rotateZig(board,pos,color,this.state.numb),()=>this.rotateS(board,pos,color,this.state.numb),()=>this.rotateI(board,pos,color,this.state.numb),()=>this.rotateT(board,pos,color,this.state.numb),()=>this.rotateJ(board,pos,color,this.state.numb),()=>this.rotateL(board,pos,color,this.state.numb)];
   
   const rotatePieceReverse = [()=>this.square(),()=>this.rotateZig(board,pos,color,this.state.numb),()=>this.rotateS(board,pos,color,this.state.numb),()=>this.rotateI(board,pos,color,this.state.numb),()=>this.rotateRevereseT(board,pos,color,this.state.numb),()=>this.rotateRevereseJ(board,pos,color,this.state.numb),()=>this.rotateRevereseL(board,pos,color,this.state.numb)];

    if (event.key === "x") {
      console.log(pos);
      rotatePiece[this.state.numb]();
     this.setState({board: board,[position[this.state.numb]]: pos})
    } else if (event.key === "z") {
      rotatePieceReverse[this.state.numb]();
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

  rotateT(board,pos,color,numb){
    if (this.state.rotate === 0){
      this.setState({rotate: 1,board:T.rotateOne(board,pos,color,numb)[0](),[pos]:T.rotateOne(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 1) {
      this.setState({rotate: 2, board:T.rotateTwo(board,pos,color,numb)[0](),[pos]:T.rotateTwo(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 2) {
      this.setState({rotate: 3, board:T.rotateThree(board,pos,color,numb)[0](),[pos]:T.rotateThree(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 3) {
      this.setState({rotate: 0, board:T.rotateFour(board,pos,color,numb)[0](),[pos]:T.rotateFour(board,pos,color,numb)[1]()});
    }
  }
  rotateRevereseT(board,pos,color,numb){
    if (this.state.rotate === 0){
      this.setState({rotate: 3,board:T.rotateReverseOne(board,pos,color,numb)[0](),[pos]:T.rotateReverseOne(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 3) {
      this.setState({rotate: 2, board:T.rotateReverseTwo(board,pos,color,numb)[0](),[pos]:T.rotateReverseTwo(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 2) {
      this.setState({rotate: 1, board:T.rotateReverseThree(board,pos,color,numb)[0](),[pos]:T.rotateReverseThree(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 1) {
      this.setState({rotate: 0, board:T.rotateReverseFour(board,pos,color,numb)[0](),[pos]:T.rotateReverseFour(board,pos,color,numb)[1]()});
    }
  }

  rotateJ(board,pos,color,numb){
    if (this.state.rotate === 0){
      this.setState({rotate: 1,board:J.rotateOne(board,pos,color,numb)[0](),[pos]:J.rotateOne(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 1) {
      this.setState({rotate: 2, board:J.rotateTwo(board,pos,color,numb)[0](),[pos]:J.rotateTwo(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 2) {
      this.setState({rotate: 3, board:J.rotateThree(board,pos,color,numb)[0](),[pos]:J.rotateThree(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 3) {
      this.setState({rotate: 0, board:J.rotateFour(board,pos,color,numb)[0](),[pos]:J.rotateFour(board,pos,color,numb)[1]()});
    }
  }

  rotateRevereseJ(board,pos,color,numb){
    if (this.state.rotate === 0){
      this.setState({rotate: 3,board:J.rotateReverseOne(board,pos,color,numb)[0](),[pos]:J.rotateReverseOne(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 3) {
      this.setState({rotate: 2, board:J.rotateReverseTwo(board,pos,color,numb)[0](),[pos]:J.rotateReverseTwo(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 2) {
      this.setState({rotate: 1, board:J.rotateReverseThree(board,pos,color,numb)[0](),[pos]:J.rotateReverseThree(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 1) {
      this.setState({rotate: 0, board:J.rotateReverseFour(board,pos,color,numb)[0](),[pos]:J.rotateReverseFour(board,pos,color,numb)[1]()});
    }
  }

  rotateL(board,pos,color,numb){
    if (this.state.rotate === 0){
      this.setState({rotate: 1,board:L.rotateOne(board,pos,color,numb)[0](),[pos]:L.rotateOne(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 1) {
      this.setState({rotate: 2, board:L.rotateTwo(board,pos,color,numb)[0](),[pos]:L.rotateTwo(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 2) {
      this.setState({rotate: 3, board:L.rotateThree(board,pos,color,numb)[0](),[pos]:L.rotateThree(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 3) {
      this.setState({rotate: 0, board:L.rotateFour(board,pos,color,numb)[0](),[pos]:L.rotateFour(board,pos,color,numb)[1]()});
    }
  }

  rotateRevereseL(board,pos,color,numb){
    if (this.state.rotate === 0){
      this.setState({rotate: 3,board:L.rotateReverseOne(board,pos,color,numb)[0](),[pos]:L.rotateReverseOne(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 3) {
      this.setState({rotate: 2, board:L.rotateReverseTwo(board,pos,color,numb)[0](),[pos]:L.rotateReverseTwo(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 2) {
      this.setState({rotate: 1, board:L.rotateReverseThree(board,pos,color,numb)[0](),[pos]:L.rotateReverseThree(board,pos,color,numb)[1]()});
    } else if (this.state.rotate === 1) {
      this.setState({rotate: 0, board:L.rotateReverseFour(board,pos,color,numb)[0](),[pos]:L.rotateReverseFour(board,pos,color,numb)[1]()});
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
