$(document).ready(function(){

  var turnNum = 0;
  var winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  var o = [];
  var x = [];
  var playerTurn = $(".playerTurn");

  //Add o,x
  function playerMove(e) {
    var e =$(event.target);
    var n =parseInt(e.data('num'));

    if (e.text().length === 0) {
      //alternate between x or o
      if (turnNum % 2 === 0 ) {
        e.text('x').addClass('x');
        playerTurn.text("It is O's turn");
        x.push(n);
        checkMove(x,"X");
      } else {
        e.text('o').addClass('o');
        playerTurn.text("It is X's turn");
        o.push(n);
        checkMove(o,"O");
      }
      turnNum ++;
    }


    if(turnNum > 9) {
      playerTurn.text('Game Over!');
      var popup = confirm("Play again?");
      if (popup == true) {
        clearBoard();
      }
    }
  };

  //Check Move
  function checkMove (moves, name) {
    for(var i=0; i<winningCombinations.length; i++) {
      var match = 0;
      for(var j=0; j<winningCombinations[i].length; j++) {
        if(moves.indexOf(winningCombinations[i][j]) !== -1) {
          match++;
        }
        if (match === 3) {
          alert("Game over! "+ name + " wins!");
          clearBoard();
        }
      }
    }
  };

  //Clear Board
  function clearBoard() {
    $('td').each(function(){
      $(this).text('').attr('class','');
    });
    playerTurn.text("It is X's turn");
    turnNum = 1;
    o = [];
    x = [];
  };

  //apply playerMove for each cell
  function bindCells () {
    $('td').each(function(){
      $(this).on('click', playerMove);
    });
  };

  //init
  var init = function() {
    $('#reset').off().on('click', clearBoard);
    bindCells();
  };

  init();

});