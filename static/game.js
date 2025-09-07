/* 1024 game (4x4) -- simple implementation */
const SIZE = 4;
let grid = [];
let score = 0;

function newGrid(){
  grid = Array.from({length: SIZE}, ()=> Array.from({length: SIZE}, ()=>0));
  score = 0;
  addRandomTile();
  addRandomTile();
  update();
}

function addRandomTile(){
  let empties = [];
  for (let r=0;r<SIZE;r++){
    for (let c=0;c<SIZE;c++){
      if(grid[r][c]===0) empties.push([r,c]);
    }
  }
  if(empties.length===0) return;
  let [r,c] = empties[Math.floor(Math.random()*empties.length)];
  grid[r][c] = (Math.random() < 0.9) ? 2 : 4;
}

function update(){
  drawGrid();
  document.getElementById('score').textContent = score;
}

function drawGrid(){
  const board = document.getElementById('board');
  board.innerHTML = '';
  for (let r=0;r<SIZE;r++){
    for (let c=0;c<SIZE;c++){
      const cell = document.createElement('div');
      cell.classList.add('cell');
      const v = grid[r][c];
      if(v !== 0){
        cell.classList.add('tile-'+v);
        cell.textContent = v;
      } else {
        cell.textContent = '';
      }
      board.appendChild(cell);
    }
  }
}

function transpose(a){
  const b = Array.from({length: SIZE}, ()=> Array.from({length: SIZE}, ()=>0));
  for(let i=0;i<SIZE;i++) for(let j=0;j<SIZE;j++) b[i][j]=a[j][i];
  return b;
}

function reverseRows(a){
  return a.map(row => row.slice().reverse());
}

function moveLeft(){
  let moved = false;
  for(let r=0;r<SIZE;r++){
    let row = grid[r].filter(x=>x!==0);
    for(let i=0;i<row.length-1;i++){
      if(row[i]===row[i+1]){
        row[i] = row[i]*2;
        score += row[i];
        row.splice(i+1,1);
      }
    }
    while(row.length < SIZE) row.push(0);
    for(let c=0;c<SIZE;c++){
      if(grid[r][c] !== row[c]) moved = true;
      grid[r][c] = row[c];
    }
  }
  return moved;
}

function moveRight(){
  grid = grid.map(row => row.slice().reverse());
  let moved = moveLeft();
  grid = grid.map(row => row.slice().reverse());
  return moved;
}

function moveUp(){
  grid = transpose(grid);
  let moved = moveLeft();
  grid = transpose(grid);
  return moved;
}

function moveDown(){
  grid = transpose(grid);
  grid = grid.map(row => row.slice().reverse());
  let moved = moveLeft();
  grid = grid.map(row => row.slice().reverse());
  grid = transpose(grid);
  return moved;
}

function canMove(){
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      if(grid[r][c]===0) return true;
      let v = grid[r][c];
      if(c+1<SIZE && grid[r][c+1]===v) return true;
      if(r+1<SIZE && grid[r+1][c]===v) return true;
    }
  }
  return false;
}

function checkWin(){
  for(let r=0;r<SIZE;r++) for(let c=0;c<SIZE;c++) if(grid[r][c] >= 1024) return true;
  return false;
}

function handleMove(direction){
  let moved = false;
  if(direction==='left') moved = moveLeft();
  if(direction==='right') moved = moveRight();
  if(direction==='up') moved = moveUp();
  if(direction==='down') moved = moveDown();

  if(moved){
    addRandomTile();
    update();
    if(checkWin()){
      document.getElementById('message').textContent = "You reached 1024! 🎉";
    } else if(!canMove()){
      document.getElementById('message').textContent = "Game over — no moves left.";
    } else {
      document.getElementById('message').textContent = "";
    }
  }
}

document.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowLeft')  handleMove('left');
  if(e.key === 'ArrowRight') handleMove('right');
  if(e.key === 'ArrowUp')    handleMove('up');
  if(e.key === 'ArrowDown')  handleMove('down');
});

document.getElementById('newGame').addEventListener('click', ()=>{
  newGrid();
  document.getElementById('message').textContent = "";
});

window.onload = function(){
  // ensure button exists in DOM
  if(!document.getElementById('newGame')){
    setTimeout(()=>{ window.onload(); }, 100);
    return;
  }
  newGrid();
};
