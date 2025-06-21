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

const START_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
const newBoard = {
  position: "start",
  draggable: true,
  sparePieces: false,
};

document.addEventListener("DOMContentLoaded", function () {
  const total = document.querySelector("#total");
  const shuffleBtn = document.getElementById("shuffle");
  const moveIndicator = document.getElementById("moveIndicator");
  const rotateBtn = document.getElementById("rotate");
  const nextPositionBtn = document.getElementById("nextPosition");

  const board = Chessboard("myBoard", newBoard);
  let positions = getPositions(tactics);
  let index = 0;
  let themes = Object.keys(tactics);

  loadThemeList(document.querySelector("#themeSelect"), tactics);
  loadNumberOfPositions(total, positions.length);
  shuffleBtn.addEventListener("click", () => {
    themes = getCheckedThemes(document.querySelector("#themeSelect"));
    positions = getShuffleSelected(tactics, themes);
    index = 0;
    loadBoard(positions[index], board);
    updateMoveIndicator(moveIndicator, positions[index]);
  });
  nextPositionBtn.addEventListener("click", () => {
    if (board.fen() === START_POSITION) {
      shuffleBtn.click();
    } else {
      index += 1;
      loadBoard(positions[index], board);
      updateMoveIndicator(moveIndicator, positions[index]);
    }
  });
  rotateBtn.addEventListener("click", () => board.flip());
  //TODO: make the code to load from many files (instead of just Polgar.js)
});
