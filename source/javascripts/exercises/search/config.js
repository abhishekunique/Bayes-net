function Config(CELL_SIZE, WALL_SIZE, SHOW_INFO) {
    this.CELL_SIZE = CELL_SIZE;
    this.WALL_SIZE = WALL_SIZE;
    this.CAPSULE_SIZE = CELL_SIZE*0.25;
    this.FOOD_SIZE = CELL_SIZE*0.10;
    this.OFFSET = (CELL_SIZE - WALL_SIZE)/2;
    this.RADIUS = WALL_SIZE/2;
    this.PANE_SIZE = CELL_SIZE*1.5;
    this.TEAM_COLORS = ["red", "blue","green"];
    this.GENERIC_COLOR="blue";
    this.AGENT_COLORS = ["yellow", "blue", "red","green"];
    this.CAPSULE_COLOR = "white";
    this.BACKGROUND_COLOR = "black";
    this.SCARED_COLOR = "ghostwhite";
    this.FONT = "bold 15pt sans-serif";
    this.SHOW_INFO = SHOW_INFO;

    return this;
}

function Rules() {
    this.SCARED_TIME = 40;
    this.KILL_POINTS = 0;
    this.FOOD_VALUE = 1;
    this.MIN_FOOD = 2;
    this.GAME_LENGTH = 1200;
    this.TURN_DELAY = 60;

    return this;
}

//Default CS188-style config
//var config = new Config(15, 5, true);
var rules = new Rules();

var PACMAN = "Pacman";
var GHOST = "Ghost";
var RED = 0;
var BLUE = 1;
var WHITE = 2;
var GREEN = 3;
var NORTH = "North";
var SOUTH = "South";
var EAST = "East";
var WEST = "West";
var STOP = "Stop";
var ACTIONS=[NORTH,SOUTH,EAST,WEST];
