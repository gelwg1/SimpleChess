export function createHandlers(getGame, getBoard) {
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
    
    onDrop: function(source, target) {
      let game = getGame();
      const move = game.move({
        from: source,
        to: target,
        promotion: "q",
      });
      if (move === null) return "snapback";
    },
    
    onSnapEnd: function() {
      let game = getGame();
      getBoard().position(game.fen());
    }
  };
}