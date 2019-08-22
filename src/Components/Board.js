import React from 'react';



function Board(props){

  return <div id="moveBoard" onKeyDown={props.keyboard} tabIndex={0} >
    {props.generateBoard(props.board)}
    <div className="controls">
      <p>Controls</p>
      <p>Z - "Rotate Left</p>
      <p>X - "Rotate Right</p>
      <p>Arrow Keys - "Move Block</p>
    </div>
  </div>
}

export default Board