export function createHandlers(getGame, getBoard, moveList) {
  let moveNumber = 1;
  return {
    onDragStart: function(source, piece, position, orientation) {
      let game = getGame();
      if (game.game_over()) return false;
      if (
        (game.turn() === "w" && piece.search(/^b/) !== -1) ||
        (game.turn() === "b" && piece.search(/^w/) !== -1)
      ) {
        return false;
      }
    },
    
    onDrop: function (source, target) {
      let game = getGame();
      const turn = game.turn();
      const move = game.move({ from: source, to: target, promotion: "q" });
      if (!move) return "snapback";
      const newMove = turn === "w"
        ? `${moveNumber++}.${move.san} `
        : (moveNumber === 1 ? `${moveNumber}...${move.san} ` : `${move.san} `);
      moveList.textContent += newMove;
    },
    
    onSnapEnd: function() {
      let game = getGame();
      getBoard().position(game.fen());
    },
    loadBoard : (currentPosition) => {
      let board = getBoard();
      board.orientation("white");
      board.position(currentPosition);
      moveNumber = 1;
      moveList.textContent = "";
    }
  };
}