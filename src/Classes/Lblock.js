class Lblock {

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

    board[pos[3][0]][pos[3][1]-1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[3][0]][pos[3][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[2][0]+1][pos[2][1]] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[2][0]][pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[0][0]+1][pos[0][1]+1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[0][0]][pos[0][1]] = Object.assign({},this.nonOccupiedSquare());

    return board;
  }
  
  rotatePositionReferenceOne(pos){
    pos[3][1] -=1;

    pos[2][0] +=1;

    pos[0][0] +=1;
    pos[0][1] +=1;
    
    return pos;
  }

  rotatePieceTwo(board,pos,color,numb){
    board[pos[3][0]][pos[3][1]-1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[3][0]][pos[3][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[2][0]-2][pos[2][1]] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[2][0]][pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[1][0]-1][pos[1][1]] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[1][0]][pos[1][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[0][0]-1][pos[0][1]-1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[0][0]][pos[0][1]] = Object.assign({},this.nonOccupiedSquare());

    return board;
  }

  rotatePositionReferenceTwo(pos){
    pos[3][1] -=1;

    pos[2][0] -=2;

    pos[1][0] -=1;

    pos[0][0] -=1;
    pos[0][1] -=1;
    return pos
  }
  
  rotatePieceThree(board,pos,color,numb){
    board[pos[1][0]+1][pos[1][1]+1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[1][0]][pos[1][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[0][0]+1][pos[0][1]+2] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[0][0]][pos[0][1]] = Object.assign({},this.nonOccupiedSquare());
 
    board[pos[2][0]][pos[2][1]-1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[2][0]][pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[3][0]][pos[3][1]+2] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[3][0]][pos[3][1]] = Object.assign({},this.nonOccupiedSquare());

    return board;
  }

  rotatePositionReferenceThree(pos){
    pos[1][0] +=1;
    pos[1][1] +=1;

    pos[0][0] +=1;
    pos[0][1] +=2;

    pos[2][1] -=1;

    pos[3][1] +=2;

    return pos
  }

  rotatePieceFour(board,pos,color,numb){
    board[pos[0][0]-1][pos[0][1]-2] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[0][0]][pos[0][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[1][0]][pos[1][1]-1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[1][0]][pos[1][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[2][0]+1][pos[2][1]+1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[2][0]][pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

    return board;
  }

  rotatePositionReferenceFour(pos){
    pos[0][0] -=1;
    pos[0][1] -=2;

    pos[1][1] -=1;

    pos[2][0] +=1;
    pos[2][1] +=1;
    
    return pos;
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


  ////////
  rotatePieceReverseOne(board,pos,color,numb){
    board[pos[2][0]-1][pos[2][1]-1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[2][0]][pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[0][0]+1][pos[0][1]+2] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[0][0]][pos[0][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[1][0]][pos[1][1]+1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[1][0]][pos[1][1]] = Object.assign({},this.nonOccupiedSquare());

    return board;
  }
  
  rotatePositionReferenceReverseOne(pos){
    pos[0][0] +=1;
    pos[0][1] +=2;

    pos[1][1] +=1;

    pos[2][0] -=1;
    pos[2][1] -=1;
    return pos;
  }

  rotatePieceReverseTwo(board,pos,color,numb){
    board[pos[3][0]][pos[3][1]-2] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[3][0]][pos[3][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[2][0]][pos[2][1]+1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[2][0]][pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[1][0]-1][pos[1][1]-1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[1][0]][pos[1][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[0][0]-1][pos[0][1]-2] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[0][0]][pos[0][1]] = Object.assign({},this.nonOccupiedSquare());
 
    return board;
  }

  rotatePositionReferenceReverseTwo(pos){
    pos[1][0] -=1;
    pos[1][1] -=1;

    pos[0][0] -=1;
    pos[0][1] -=2;

    pos[2][1] +=1;

    pos[3][1] -=2;
    return pos
  }
  
  rotatePieceReverseThree(board,pos,color,numb){
    board[pos[1][0]+1][pos[1][1]] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[1][0]][pos[1][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[2][0]+2][pos[2][1]] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[2][0]][pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[3][0]][pos[3][1]+1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[3][0]][pos[3][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[0][0]+1][pos[0][1]+1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[0][0]][pos[0][1]] = Object.assign({},this.nonOccupiedSquare());


    return board;
  }

  rotatePositionReferenceReverseThree(pos){
    pos[3][1] +=1;

    pos[2][0] +=2;

    pos[1][0] +=1;

    pos[0][0] +=1;
    pos[0][1] +=1;

    return pos
  }

  rotatePieceReverseFour(board,pos,color,numb){
    board[pos[3][0]][pos[3][1]+1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[3][0]][pos[3][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[2][0]-1][pos[2][1]] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[2][0]][pos[2][1]] = Object.assign({},this.nonOccupiedSquare());

    board[pos[0][0]-1][pos[0][1]-1] = Object.assign({},this.occupiedSquare(color[numb]));
    board[pos[0][0]][pos[0][1]] = Object.assign({},this.nonOccupiedSquare());

    return board;
  }

  rotatePositionReferenceReverseFour(pos){
    pos[3][1] +=1;

    pos[2][0] -=1;

    pos[0][0] -=1;
    pos[0][1] -=1;
    
    return pos
  }

  rotateReverseOne(board,pos,color,numb){
    const rotate = [()=>this.rotatePieceReverseOne(board,pos,color,numb),()=>this.rotatePositionReferenceReverseOne(pos)];
    return rotate;
  }

  rotateReverseTwo(board,pos,color,numb){
    const rotate = [()=>this.rotatePieceReverseTwo(board,pos,color,numb),()=>this.rotatePositionReferenceReverseTwo(pos)];
    return rotate;
  }

  rotateReverseThree(board,pos,color,numb){
    const rotate = [()=>this.rotatePieceReverseThree(board,pos,color,numb),()=>this.rotatePositionReferenceReverseThree(pos)];
    return rotate;
  }

  rotateReverseFour(board,pos,color,numb){
    const rotate = [()=>this.rotatePieceReverseFour(board,pos,color,numb),()=>this.rotatePositionReferenceReverseFour(pos)];
    return rotate;
  }

}

export default Lblock;