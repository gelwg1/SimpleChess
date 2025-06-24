export function createHandlers(getGame, getBoard, moveList, moveIndicator) {
  let moveNumber = 1;
  let solutionIndex = 0;
  let solutionMoves = [];
  let selfMove = (game, board, s, t) => {
    if(!s) return;
    const turn = game.turn();
    const move = game.move({ from: s, to: t });
    board.position(game.fen());

    solutionIndex ++ ;

    const newMove = turn === "w"
      ? `${moveNumber++}.${move.san} `
      : (moveNumber === 1 ? `${moveNumber}...${move.san} ` : `${move.san} `);
    moveList.textContent += newMove;
  };
  return {
    setSolution: (solution) => {
      solutionMoves = solution.split(" ").map((item) => {
        const s = item.substring(0, 2);
        const t = item.substring(2, 4);
        return { s, t };
      });
    },
    onDragStart: function (source, piece, position, orientation) {
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
      const board = getBoard();
      const game = getGame();
      
      // if (solutionIndex > solutionMoves.length - 1) return "snapback";
      
      // const isCorrectMove = source === solutionMoves[solutionIndex].s && 
      //                     target === solutionMoves[solutionIndex].t;
      
      // if (!isCorrectMove) {
      //   // const move = game.move({ from: source, to: target, promotion: "q" });
      //   // if (!move) return "snapback";
      //   // const moves = game.moves();
      //   moveIndicator.textContent = "Wrong move";
      //   moveIndicator.style.color = "#cc3333";
      //   return "snapback";
      // }

      // solutionIndex++;
      // if (solutionIndex > solutionMoves.length - 1) {
      //   moveIndicator.textContent = "Success";
      //   moveIndicator.style.color = "#629924";
      // }

      const turn = game.turn();
      const move = game.move({ from: source, to: target, promotion: "q" });
      if (!move) return "snapback";
      
      moveList.textContent += move.san + " ";

      // const newMove = turn === "w" ? `${moveNumber++}.${move.san} ` : moveNumber === 1 
      //     ? `${moveNumber}...${move.san} ` : `${move.san} `;
      // moveList.textContent += newMove;

      // if (solutionIndex <= solutionMoves.length - 1) {
      //   window.setTimeout(() => {
      //     selfMove(game, board, solutionMoves[solutionIndex].s, solutionMoves[solutionIndex].t);
      //   }, 250);
      // }
    },

    onSnapEnd: function () {
      let game = getGame();
      getBoard().position(game.fen());
    },
    loadBoard: (currentPosition) => {
      let board = getBoard();
      board.orientation("white");
      board.position(currentPosition);
      moveNumber = 1;
      solutionIndex = 0;
      moveList.textContent = "";
    },
  };
}