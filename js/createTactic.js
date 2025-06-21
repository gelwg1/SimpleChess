export const loadThemeList = (themeSelectEl, tactics) => {
  for (const key in tactics) {
    if (Array.isArray(tactics[key])) {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "theme";
      checkbox.value = key;
      checkbox.checked = true;
      const text = document.createTextNode(
        key.charAt(0).toUpperCase() + key.slice(1)
      );
      label.appendChild(checkbox);
      label.appendChild(text);

      themeSelectEl.appendChild(label);
    }
  }
};

export const getCheckedThemes = (el) => {
  const checkedInputs = el.querySelectorAll('input[type="checkbox"]:checked');
  const checkedValues = Array.from(checkedInputs).map((input) => input.value);
  return checkedValues;
};

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const loadBoard = (currentPosition, board) => {
  board.orientation("white");
  board.position(currentPosition);
};

export const getPositions = (tactics) => {
  if (!tactics || typeof tactics !== "object") {
    alert("There's no tactics detected!");
    return [];
  }
  return Object.values(tactics).filter(Array.isArray).flat();
};

export const loadNumberOfPositions = (el, noOfPos) => {
  el.textContent = `There's a total of ${noOfPos} tactics`;
};

export const getShuffleSelected = (tactics, themes) => {
  let selectedPositions = [];
  for (let key in tactics) {
    if (themes.includes(key)) {
      selectedPositions = selectedPositions.concat(tactics[key]);
    }
  }
  return shuffle(selectedPositions);
};

export const updateMoveIndicator = (moveIndicator, fen) => {
  const turn = fen.split(" ")[1];
  moveIndicator.textContent = turn === "w" ? "White to move" : "Black to move";
  moveIndicator.style.color = turn === "w" ? "azure" : "black";
};
