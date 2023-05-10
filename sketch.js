/*  Michael Steenkamp
*   04/05/2023
*   Game Of Life
*
*   Language: 
*           JavaScript
*   Library:
*           p5.js
*   Sources:
*           https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
*           https://www.youtube.com/watch?v=FWSR_7kZuYg
*   Description:
*              This program is a personal remake of the popular algorithms/game
*              known as 'The Game Of Life'. The user is able to choose which cells
*              should be alive and which ones should be left dead, then they can press
*              play and see the game in action.
*/

/* GLOBAL VARIABLES */

//HTML Objects
const BTN_PLAYBACK = document.getElementById("button_playback");
const BTN_RANDOM = document.getElementById("button_random");
const BTN_CLEAR = document.getElementById("button_clear");
const INP_COLOR = document.getElementById("input_color");

//Playback Control
const PLAY = "Play";
const PAUSE = "Pause";
let _play = false;
  
//Update Rate (ms)
const MIN_DELAY = 0;
const MAX_DELAY = 1000;
let _delay = MAX_DELAY;

let _timeInterval = null;

//Cell Size
const MIN_SIZE = 10;
const MAX_SIZE = 250;
let _size = 20;

//Cell Coloured
let _colorCells = false;

/*
* Keep track of cell selected.
* Used for toggling cells
*/
let _currSelectedCell = null;
let _prevSelectedCell = null;

/* EVENT HANDLING */
  /* EVENT LISTENER */
  BTN_PLAYBACK.addEventListener("click", () => { this.event_playback() });
  BTN_PLAYBACK.addEventListener("keypress", () => { BTN_PLAYBACK.blur(); });

  BTN_RANDOM.addEventListener("click", () => { this.event_random() });
  BTN_RANDOM.addEventListener("keydown", () => { BTN_RANDOM.blur(); });

  BTN_CLEAR.addEventListener("click", () => { this.event_clear() });
  BTN_CLEAR.addEventListener("keydown", () => { BTN_CLEAR.blur(); });

  INP_COLOR.addEventListener("input", () => { this.event_color() });
  INP_COLOR.addEventListener("keydown", () => { INP_COLOR.blur(); });

  /* EVENT FUNCTIONS */

    function event_playback() { _play? BTN_PLAYBACK.textContent = PLAY : BTN_PLAYBACK.textContent = PAUSE; _play = !_play; }

    function event_random() { this.grid.Random(); }

    function event_clear() { this.grid.clear(); }

    function event_color() { _colorCells = INP_COLOR.checked; }

      /* OVERLOADED FUNCTIONS */

      function mousePressed() {

        if(winMouseY <= height) {
      
          _currSelectedCell = this.grid.getCellAtPos(winMouseX, winMouseY);
          _currSelectedCell.toggle();

          _prevSelectedCell = _currSelectedCell;
        }
      }
      
      function mouseReleased() {
      
        if(_currSelectedCell) {
      
          _currSelectedCell.setToggled(false);
          _currSelectedCell = null;
          
          _prevSelectedCell = null;
        }
      }

      function mouseDragged() {

        if((winMouseX > 0 && winMouseX < width) && (winMouseY > 0 && winMouseY < height)) {
          
          _currSelectedCell = this.grid.getCellAtPos(winMouseX, winMouseY);

          if(_currSelectedCell != _prevSelectedCell) {

            _currSelectedCell.toggle();

            _prevSelectedCell.setToggled(false);
            _prevSelectedCell = _currSelectedCell;
          }
        }
      }

      function keyPressed() {
        switch(key) {
          case ' ': this.event_playback();
          break;

          case 'r': this.event_random();
          break;

          case 'c': this.event_clear();
          break;
        }
      }

      function windowResized() {

        clear();
        createCanvas(windowWidth, windowHeight * _canvasDivHeightMultiplier).parent("div_canvas");
        
        document.getElementById("label_delay").textContent = _delay;
        document.getElementById("label_size").textContent = _size;
      
        delete this.grid;
        this.grid = new Grid();
        
        draw();
      }

/* UPDATE FUNCTIONS */

/*
* Name: Update Delay
* Parameters: bool
* Return: N/A
*
* Description: This function increases or decreases the delay count
*              and performs a wrap around if the value goes out of
*              the range of MIN DELAY or MAX DELAY. It then updates
*              the html label for delay.
*/
function updateDelay(increase) {

  increase? _delay >= MAX_DELAY? _delay = MIN_DELAY : _delay += 5 
          : _delay <= MIN_DELAY? _delay = MAX_DELAY : _delay -= 5;

  document.getElementById("label_delay").textContent = _delay;
}

/*
* Name: Update Size
* Parameters: bool
* Return: N/A
*
* Description: This function increases or decreases the grid size
*              and performs a wrap around if the value goes out of
*              the range of MIN GRID SIZE or MAX GRID SIZE. It then
*              updates the html label for size.
*/
function updateSize(increase) { 

  increase? _size >= MAX_SIZE? _size = MIN_SIZE : _size++ 
          : _size <= MIN_SIZE? _size = MAX_SIZE : _size--;

  this.grid.initialize();

  document.getElementById("label_size").textContent = _size;
}

/* P5.JS FUNCTIONS */

function setup() {

  this._canvasDivHeightMultiplier = 0.9;
  
  createCanvas(windowWidth, windowHeight * _canvasDivHeightMultiplier).parent("div_canvas");
  
  document.getElementById("label_delay").textContent = _delay;
  document.getElementById("label_size").textContent = _size;

  this.grid = new Grid();
}

function draw() {

  background(0);
  this.grid.draw();

  //UPDATE GRID AFTER SET DELAY
  if(_play) {

    if(!_timeInterval) {

      _delay >= 10? _timeInterval = setInterval(function() { this.grid.update(); }, _delay)
                  : this.grid.update();
    }
  } else {

    if(_timeInterval) { clearInterval(_timeInterval); _timeInterval = null; }
  }

  //UPDATE DELAY
  if(keyIsDown(RIGHT_ARROW)) {
    clearInterval(_timeInterval);
    _timeInterval = null;
    this.updateDelay(true);
  }
  if(keyIsDown(LEFT_ARROW)) {
    clearInterval(_timeInterval);
    _timeInterval = null;
    this.updateDelay(false);
  }

  //UPDATE SIZE
  if(keyIsDown(UP_ARROW)) {
    this.updateSize(true);
  }
  if(keyIsDown(DOWN_ARROW)) {
    this.updateSize(false);
  }

  // noLoop();

}