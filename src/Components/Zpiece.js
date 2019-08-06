class Zpiece {
  // constructor(board,pos,color,numb){
  //   this.board = board;
  //   this.pos = pos;
  //   this.color = color;
  //   this.numb = numb;
  // }

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
  
  rotatePieceOne(board,pos,color,numb){
    console.log("first", pos);
    board[pos[2][0]][pos[2][1]+2] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[2][0]][pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[0][0]+1][pos[0][1]] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[0][0]][pos[0][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[3][0]+1][pos[3][1]] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[3][0]][pos[3][1]] = Object.assign({},this.nonOccupiedSquare());
    return board;
  }
  
  rotatePositionReferenceOne(pos){
    console.log("Z", pos);
    pos[2][1] = pos[2][1]+2;
    pos[3][0] = pos[3][0]+1;
    pos[0][0] = pos[0][0]+1;
    return pos;
  }

  rotatePieceTwo(board,pos,color,numb){
    board[pos[2][0]][pos[2][1]-2] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[2][0]][pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[3][0]-1][pos[3][1]] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[3][0]][pos[3][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[0][0]-1][pos[0][1]] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[0][0]][pos[0][1]] = Object.assign({},this.nonOccupiedSquare());
    return board;
  }
  rotatePositionReferenceTwo(pos){
    pos[2][1] = pos[2][1]-2;
    pos[3][0] = pos[3][0]-1;
    pos[0][0] = pos[0][0]-1;
    return pos
  }

  rotateOne(board,pos,color,numb){
    const rotate = [()=>this.rotatePieceOne(board,pos,color,numb),()=>this.rotatePositionReferenceOne(pos)];
    return rotate;
  }

  rotateTwo(board,pos,color,numb){
    const rotate = [()=>this.rotatePieceTwo(board,pos,color,numb),()=>this.rotatePositionReferenceTwo(pos)];
    return rotate;
  }
  

  //   occupiedSquare(){
  //   const square = {
  //     occupied: true,
  //     color: this.color
  //   }
  //   return square;
  // }
  // nonOccupiedSquare(){
  //   const square = {
  //     occupied: false,
  //     color: null
  //   }
  //   return square;
  // }
  
  // rotatePieceOne(){
  //   console.log("first", this.pos);
  //   this.board[this.pos[2][0]][this.pos[2][1]+2] = Object.assign({},this.occupiedSquare(this.color[this.numb]));
  //   this.board[this.pos[2][0]][this.pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

  //   this.board[this.pos[0][0]+1][this.pos[0][1]] = Object.assign({},this.occupiedSquare(this.color[this.numb]));
  //   this.board[this.pos[0][0]][this.pos[0][1]] = Object.assign({},this.nonOccupiedSquare());

  //   this.board[this.pos[3][0]+1][this.pos[3][1]] = Object.assign({},this.occupiedSquare(this.color[this.numb]));
  //   this.board[this.pos[3][0]][this.pos[3][1]] = Object.assign({},this.nonOccupiedSquare());
  //   return this.board;
  // }
  
  // rotatePositionReferenceOne(){
  //   console.log("Z", this.pos);
  //   this.pos[2][1] = this.pos[2][1]+2;
  //   this.pos[3][0] = this.pos[3][0]+1;
  //   this.pos[0][0] = this.pos[0][0]+1;
  //   return this.pos;
  // }

  // rotatePieceTwo(){
  //   this.board[this.pos[2][0]][this.pos[2][1]-2] = Object.assign({},this.occupiedSquare(this.color[this.numb]));
  //   this.board[this.pos[2][0]][this.pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

  //   this.board[this.pos[3][0]-1][this.pos[3][1]] = Object.assign({},this.occupiedSquare(this.color[this.numb]));
  //   this.board[this.pos[3][0]][this.pos[3][1]] = Object.assign({},this.nonOccupiedSquare());

  //   this.board[this.pos[0][0]-1][this.pos[0][1]] = Object.assign({},this.occupiedSquare(this.color[this.numb]));
  //   this.board[this.pos[0][0]][this.pos[0][1]] = Object.assign({},this.nonOccupiedSquare());
  //   return this.board;
  // }
  // rotatePositionReferenceTwo(){
  //   this.pos[2][1] = this.pos[2][1]-2;
  //   this.pos[3][0] = this.pos[3][0]-1;
  //   this.pos[0][0] = this.pos[0][0]-1;
  //   return this.pos
  // }

  // rotateOne(){
  //   const rotate = [()=>this.rotatePieceOne(this.board,this.pos,this.color,this.numb),()=>this.rotatePositionReferenceOne(this.pos)];
  //   return rotate;
  // }

  // rotateTwo(){
  //   const rotate = [()=>this.rotatePieceTwo(this.board,this.pos,this.color,this.numb),()=>this.rotatePositionReferenceTwo(this.pos)];
  //   return rotate;
  // }
}

export default Zpiece;