import { tactics } from "../positions/Polgar.js";
import {
  loadThemeList,
  getPositions,
  loadNumberOfPositions,
  getShuffleSelected,
  getCheckedThemes,
  loadBoard,
  updateMoveIndicator,
} from "./createTactic.js";
import { createHandlers } from "./onlyLegalMoves.js";

const START_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
let board;
let game = new Chess();

document.addEventListener("DOMContentLoaded", function () {
  const total = document.querySelector("#total");
  const shuffleBtn = document.getElementById("shuffle");
  const moveIndicator = document.getElementById("moveIndicator");
  const rotateBtn = document.getElementById("rotate");
  const nextPositionBtn = document.getElementById("nextPosition");

  const getBoard = () => board;
  const getGame = () => game;
  const handlers = createHandlers(getGame, getBoard);
  const config = {
    position: "start",
    draggable: true,
    sparePieces: false,
    onDragStart: handlers.onDragStart,
    onDrop: handlers.onDrop,
    onSnapEnd: handlers.onSnapEnd
  };
  board = Chessboard("myBoard", config);

  let positions = getPositions(tactics);
  let index = 0;
  let themes = Object.keys(tactics);

  loadThemeList(document.querySelector("#themeSelect"), tactics);
  loadNumberOfPositions(total, positions.length);
  shuffleBtn.addEventListener("click", () => {
    themes = getCheckedThemes(document.querySelector("#themeSelect"));
    positions = getShuffleSelected(tactics, themes);
    index = 0;
    game = new Chess();
    game.load(positions[index]);
    loadBoard(positions[index], board);
    updateMoveIndicator(moveIndicator, positions[index]);
  });
  nextPositionBtn.addEventListener("click", () => {
    if (board.fen() === START_POSITION) {
      shuffleBtn.click();
    } else {
      index += 1;
      if(index >= positions.length){
        alert("No more problem!");
        return;
      }
      console.log("FEN: "+positions[index]);
      game = new Chess();
      game.load(positions[index]);
      loadBoard(positions[index], board);
      updateMoveIndicator(moveIndicator, positions[index]);
    }
  });
  rotateBtn.addEventListener("click", () => board.flip());
  //TODO: make the code to load from many files (instead of just Polgar.js)
});


