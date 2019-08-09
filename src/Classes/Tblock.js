class Tblock {
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

    board[pos[0][0]+1][pos[0][1]+1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[0][0]][pos[0][1]] = Object.assign({},this.nonOccupiedSquare());

    return board;
  }
  
  rotatePositionReferenceOne(pos){
    pos[0][0] +=1;
    pos[0][1] +=1;
    return pos;
  }

  rotatePieceTwo(board,pos,color,numb){
    board[pos[1][0]][pos[1][1]-1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[1][0]][pos[1][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[3][0]+1][pos[3][1]] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[3][0]][pos[3][1]] = Object.assign({},this.nonOccupiedSquare());

    return board;
  }

  rotatePositionReferenceTwo(pos){
    pos[3][0] +=1;
    pos[1][1] -=1;
    return pos
  }
  
  rotatePieceThree(board,pos,color,numb){
    board[pos[3][0]-1][pos[3][1]] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[3][0]][pos[3][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[1][0]][pos[1][1]+1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[1][0]][pos[1][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[2][0]][pos[2][1]-2] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[2][0]][pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

    return board;
  }

  rotatePositionReferenceThree(pos){
    pos[3][0] -=1;
    pos[2][1] -=2;
    pos[1][1] +=1
    return pos
  }

  rotatePieceFour(board,pos,color,numb){

    board[pos[2][0]][pos[2][1]+2] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[2][0]][pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[0][0]-1][pos[0][1]-1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[0][0]][pos[0][1]] = Object.assign({},this.nonOccupiedSquare());

    return board;
  }

  rotatePositionReferenceFour(pos){
    pos[2][1] +=2;
    pos[0][0] -=1;
    pos[0][1] -=1;

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

  rotateThree(board,pos,color,numb){
    const rotate = [()=>this.rotatePieceThree(board,pos,color,numb),()=>this.rotatePositionReferenceThree(pos)];
    return rotate;
  }

  rotateFour(board,pos,color,numb){
    const rotate = [()=>this.rotatePieceFour(board,pos,color,numb),()=>this.rotatePositionReferenceFour(pos)];
    return rotate;
  }

}

export default Tblock;