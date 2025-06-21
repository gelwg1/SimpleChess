document.addEventListener('DOMContentLoaded', function () {
  let loadThemeList = () =>{
    let themeSelect  = document.querySelector("#themeSelect")  ;

    for (const key in window.tactics) {
      if (Array.isArray(window.tactics[key])) {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "theme";
        checkbox.value = "key";
        checkbox.checked = true;
        const text = document.createTextNode(key.charAt(0).toUpperCase() + key.slice(1));
        label.appendChild(checkbox);
        label.appendChild(text);

        themeSelect.appendChild(label);
      }
    }
  }
  const board = Chessboard('myBoard', {
    draggable: true,  
    sparePieces: false
  });
  
  const moveIndicator = document.getElementById('moveIndicator');
  const newPositionBtn = document.getElementById('newPosition');
  const shuffleBtn = document.getElementById('shuffle');
  const rotateBtn = document.getElementById('rotate');

  let allPositions = [];
  let currentPosition = 0;

  function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
    }
    return shuffled;
  }
  
  let loadBoard = () => {
    let newPosition = allPositions[currentPosition];
    board.orientation('white')
    board.position(newPosition);
    updateMoveIndicator(newPosition);
  }

  function getSelectedThemes() {
    const checkboxes = document.querySelectorAll('input[name="theme"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
  }
  
  function getRandomPosition() {
    const selectedThemes = getSelectedThemes();
    if (selectedThemes.length === 0) return null;
    
    for (const key in window.tactics) {
      if (Array.isArray(window.tactics[key])) {
        allPositions.push(...window.tactics[key]);
      }
    }
  }
  
  function loadRandomPosition() {
    if(!allPositions.length){
      getRandomPosition();
      currentPosition = 0;
    }
    allPositions = shuffle(allPositions);
    loadBoard();
  }

  let loadNextPosition = () => {
    currentPosition += 1;
    if(currentPosition >= allPositions.length){
      alert("NO MORE PROBLEMS")
    } else {
      loadBoard();
    }
  }

  let shuffleSelected = () => {
    // TODO: scrape all the checkboxed themes and filter.
    if(!allPositions.length){
      getRandomPosition();
    } else {
      allPositions = shuffle(allPositions);
    }
    currentPosition = 0;
    loadBoard();
  }

  let rotateBoard = () => {
    if(board.orientation()==="white"){
      board.orientation('black')
    }
    else {
      board.orientation('white')
    }
  }
  
  function updateMoveIndicator(fen) {
    const turn = fen.split(' ')[1];
    moveIndicator.textContent = turn === 'w' ? "White to move" : "Black to move";
    moveIndicator.className = turn === 'w' ? 'white-move' : 'black-move';
  }

  loadThemeList();
  loadRandomPosition();
  newPositionBtn.addEventListener('click', loadNextPosition);
  shuffleBtn.addEventListener('click', shuffleSelected);
  rotateBtn.addEventListener('click', rotateBoard);
});