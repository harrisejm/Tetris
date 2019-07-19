import React from 'react';
import '../Styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: []
    }
  }
  componentWillMount(){
    this.setState({board: this.board()});
  }

  board(){
    let completeBoard = [];
    let row = [];
    const square = {
      occupied: false,
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

  generateBoard(board){
    
  }


  render(){
  return (
    <div>
    

    </div>
  );
  }
}

export default App;
