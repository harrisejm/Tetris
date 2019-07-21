import React from 'react';



function Board(props){

  return <div id="moveBoard" onKeyDown={props.keyboard} tabIndex={0} >
    {props.generateBoard(props.board)}
  </div>
}

export default Board