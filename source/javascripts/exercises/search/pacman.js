
var m_single = function() {
        if (this.i >= this.length)
            return true;
        
        var tuple = this.actions[this.i];
        this.game.execute_action(0, tuple);
        draw(this.canvas, this.game);
        this.i += 1;
        return false;
    };
    
var m_step = function() {
        done = this.pacman_play.step_single();
        if (done) {
            $("#reset1").removeAttr("disabled");
            $("#reset2").removeAttr("disabled");
            $("#reset3").removeAttr("disabled");
            
            clearInterval(this.pacmaninterval_id);
            for (var i = 0; i < window.interval1.length; i++)
                clearInterval(window.interval1[i]);
            this.pacmaninterval_id = null;
            //if (replay.on_game_over != null)
            //    replay.on_game_over(replay);
            return;
        }
    };

function hash_position(x,y) {
    return x + y*65535;
}

function setCharAt(str,index,chr) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + chr + str.substr(index+1);
}

function check_kills(agent1, agent2) {
    if (agent1.type == PACMAN) {
        if (agent2.type == GHOST)
            return (agent2.scaredTimer > 0);
    } else {
        if (agent2.type == PACMAN)
            return (agent1.scaredTimer == 0);
    }
    return false;
}

function MazeNode(coords)
    {
    this.coords = coords;
    this.dist = 0;
    this.prev = null;
    return this;
    }

function mstCalc(inNodes)
    {
    var mstEdges = [];
    var nodes = [];
    var restNodes = [];
    var minDistance, curridx, node0, node1;
    
    for (var i = 0; i< inNodes.length; i++)
        nodes[i] = new MazeNode(inNodes[i]);
    node0 = nodes[0];
    
    restNodes = nodes.slice();
    restNodes.splice(0,1);
    for (var i = 0; i < restNodes.length; i++)
        {
        restNodes[i].dist = manhattan_distance(restNodes[i].coords[0],
                                               restNodes[i].coords[1],
                                               node0.coords[0],
                                               node0.coords[1]);
        restNodes[i].prev = node0;
        }
   
    while (restNodes.length)
        {
        minDistance = 999999;
        
        for (var i = 0; i < restNodes.length; i++)
            {
            if (restNodes[i].dist < minDistance)
                {
                minDistance = restNodes[i].dist;
                curridx = i;
                }
            }
        
        node0 = restNodes[curridx];
        node1 = restNodes[curridx].prev;
        restNodes.splice(curridx,1);
        var tmparr = [node0, node1, minDistance];
        mstEdges.push(tmparr);
        
        for (var i = 0; i < restNodes.length; i++)
            {
            dist = manhattan_distance(restNodes[i].coords[0],
                                               restNodes[i].coords[1],
                                               node0.coords[0],
                                               node0.coords[1]);
            if (dist < restNodes[i].dist)
                {
                restNodes[i].dist = dist;
                restNodes[i].prev = node0;
                }
            }
        }
    calcPath = 0;
    for (var i = 0; i < mstEdges.length; i++)
        calcPath += mstEdges[i][2];
    return calcPath;
    }
    
function Food(team, x, y) {
    //Team always refers to the team that can't use this/owns this
    this.team = team;
    this.x = x;
    this.y = y;
    this.scariness = 0;
    if (team == RED)
        this.value = -rules.FOOD_VALUE;
    else
        this.value = rules.FOOD_VALUE;
    this.draw = function method_draw(ctx, layout, config) {
                    draw_food(ctx, this, layout, config);
                };
    return this;
}

function Capsule(team, x, y) {
    this.team = team;
    this.x = x;
    this.y = y;
    this.scariness = rules.SCARED_TIME;
    this.value = 0;
    this.draw = function method_draw(ctx, layout, config) {
                    draw_capsule(ctx, this, layout, config);
                };
    return this;
}

function Agent(index, x, y) {
    this.index = index;
    if (index==0)
        this.type=PACMAN;
    else
        this.type=GHOST;
    if (index % 2 == 0)
        this.team = RED;
    else
        this.team = BLUE;
    this.start = {x: x, y: y};
    this.facing = EAST;
    
    this.draw = function method_draw(ctx, layout, config) {
                    draw_agent(ctx, this, layout, config);
                };
    this.defeats = function method_defeats(other) {
                    return check_kills(this, other);
                };
    this.reset = function method_reset() {
                    this.x = this.start.x;
                    this.y = this.start.y;
                    this.scaredTimer = 0;
                };

    this.getClosestFood = function (game)
        {
        var minDist = 999999;
        var closestFood = [];
        var layout = game.layout;
        
        if (game.food_eaten)
            return 0;
        
        for (i = 0; i < layout.height; i++)
            for (j = 0; j < layout.width; j++)
                {
                var ch = layout[layout.height-i-1][j];
                /*if (layout[i][j]=='1')
                    console.log(j,i);*/
                if (ch == "." && manhattan_distance(this.x, this.y, j, i) < minDist)
                    {
                    minDist = manhattan_distance(this.x, this.y, j, i);
                    closestFood = [j,layout.height-i-1];
                    if (minDist==0)
                        console.log(layout[i]);
                    }
                }
        return minDist;
        }

    this.getLegalActions = function (layout)
        {
        var actions = new Array;
        for (idx in ACTIONS)
            {
            var illegal=0;
            switch (ACTIONS[idx]) 
                {
                case NORTH:
                    var dx = 0; var dy = 1; break;
                case SOUTH:
                    var dx = 0; var dy = -1; break;
                case EAST:
                    var dx = 1; var dy = 0;
                    break;
                case WEST:
                    var dx = -1; var dy = 0;
                    break;
                case STOP:
                    var dx = dy = 0;
                    break;
                default:
                    var dx = 0; var dy = 0;
                }
        
        
            if (this.x + dx < 0 || this.x + dx >= layout.width)
                illegal=1;
            if (this.y + dy < 0 || this.y + dy >= layout.height)
                illegal=1;
            if (layout[layout.height-this.y-dy-1][this.x + dx] == "%")
                illegal=1;

            if(!illegal)
                actions.push(ACTIONS[idx]);
            }
        return actions;
        }

    this.move = function method_move(direction, layout) {
        var changed = false;
        switch (direction) {
            case NORTH:
                var dx = 0; var dy = 1; break;
            case SOUTH:
                var dx = 0; var dy = -1; break;
            case EAST:
                var dx = 1; var dy = 0;
                var changed = (this.x == layout.width/2 - 1);
                break;
            case WEST:
                var dx = -1; var dy = 0;
                var changed = (this.x == layout.width/2);
                break;
            case STOP:
                var dx = dy = 0;
                break;
            default:
                var dx = 0; var dy = 0;
                //console.log("Unknown direction: " + direction);
        }
        if (direction != STOP)
            this.facing = direction;
        
        if (this.x + dx < 0 || this.x + dx >= layout.width)
            return {x: this.x, y: this.y};
        if (this.y + dy < 0 || this.y + dy >= layout.height)
            return {x: this.x, y: this.y};

       
        if (layout[layout.height-this.y-dy-1][this.x + dx] == "%") {
            //console.log("Agent " + this.index + " attempted an illegal action");
            return {x: this.x, y: this.y};
        }
        this.x += dx;
        this.y += dy;
        return {x: this.x, y: this.y};
    };
    this.reset();
    return this;
}


function Game(layout) {
    this.layout=layout;
    this.layout.width = layout[0].length;
    this.layout.height = layout.length;
    this.items = {};
    this.agents = {};
    this.food_left = 0;
    this.score = 0;
    this.nNodes = 0;
    this.food_eaten = 0;
    this.overlay_visited = 0;
    this.slow_squares = 0;
    this.alg="DFS";
    this.actions = new Array;
    this.delay_start=0;
    this.get_width = function method_width() {
        return this.layout.width * this.config.CELL_SIZE;
    };

    this.get_height = function method_height() {
        return this.layout.height * this.config.CELL_SIZE;
    };

    this.resize = function method_resize() {
        this.canvas.width = this.get_width();
        if (this.config.SHOW_INFO)
            this.canvas.height = this.get_height() + this.config.PANE_SIZE;
        else
            this.canvas.height = this.get_height();
    };

    this.execute_action = function method_execute(agent_index, action) {
        var agent = this.agents[agent_index];
        var pos = agent.move(action, this.layout);
        this.pickup_consumable(agent, pos.x, pos.y);
        
        for (index in this.agents) {
            var other = this.agents[index];
            if (index==agent_index)
                continue;
            if (agent.defeats(other)) {
                if (agent_index > 1)
                    this.score -= rules.KILL_POINTS;
                else
                    this.score += rules.KILL_POINTS;
                other.reset();
            } else {
                if (agent_index==1)
                    this.score -= rules.KILL_POINTS;
                else
                    this.score += rules.KILL_POINTS;
                agent.reset();
            }
        }
        if (agent.scaredTimer > 0)
            agent.scaredTimer -= 1;
        this.time_left -= 1;
        this.update_layout();
    };

    this.pickup_consumable = function method_pickup(agent, x, y) {
        var hash = hash_position(x,y);
        if (hash in this.items) {
            var item = this.items[hash];
            
            this.score += item.value;
            if (item.value != 0)
                {
                this.food_left -= 1;
                this.food_eaten = 1;
                }

            if (item.scariness > 0)
                for (index in this.agents)
                    if (index > 1)
                        this.agents[index].scaredTimer = item.scariness;
            delete this.items[hash];
        }
    };

    this.update_layout = function() {
        
        for (var x=0; x < this.layout.width; x++)
            for (var y=0; y < this.layout.height; y++)
                {
                var char = this.layout[this.layout.height-y-1][x];
                if (char == "*" || char == "." || char == "o")
                    {
                    this.layout[this.layout.height-y-1] = setCharAt(this.layout[this.layout.height-y-1],x, char);
                    }
                else if (char == "1")
                    {
                    //console.log("removing from ", x);
                    this.layout[this.layout.height-y-1]  = setCharAt(this.layout[this.layout.height-y-1],x, " ");
                    //console.log(this.layout[this.layout.height-y-1]);
                    }
                }
        for (var x=0; x < this.layout.width; x++) 
            {
            for (var y=0; y < this.layout.height; y++) 
                {
                for (var item in this.items)
                    {
                    if (this.items[item].x == x && this.layout.height-this.items[item].y-1 == y)
                        {
                        //console.log(x,y,this.items[item].x,this.items[item].y);
                        this.layout[y] = setCharAt(this.layout[y],x,".");
                        }                            
                    }
                for (var agent_index in this.agents)
                    {
                    if (this.agents[agent_index].x == x && this.agents[agent_index].y == this.layout.height-y-1)
                        {
                        agent_index++;
                        this.layout[y] = setCharAt(this.layout[y],x,agent_index);
                        }
                    }
                }
            }

    };
    
    this.food_grid = function()
        {
        var fgrid = new Array;
        for (var x=0; x < this.layout.width; x++)
            {
            for (var y=0; y < this.layout.height; y++)
                {
                var char = this.layout[this.layout.height-y-1][x];
                if (char == ".")
                    {
                    var tmparr = new Array;
                    tmparr = [x,y];
                    fgrid.push(tmparr);
                    }
                }
            }
        return fgrid;
        }


    var agentPattern = new RegExp("[1-9]");
    for (var x=0; x < this.layout.width; x++) {
        for (var y=0; y < this.layout.height; y++) {
            var char = this.layout[this.layout.height-y-1][x];
            if (agentPattern.test(char)) {
                var index = Number(char) - 1;
                this.agents[index] = new Agent(index, x, y);
            } else if (char == ".") {
                this.items[hash_position(x,y)] = new Food(WHITE, x, y);
                this.food_left++;
            } else if (char == "o") {
                this.items[hash_position(x,y)] = new Capsule(WHITE, x, y);
            }
        }
    }


    }

function draw(canvas, game) {
    
    var ctx = canvas.getContext("2d");
    //var config = game.config;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "black";
    
    var layout = game.layout;

    drawWalls(ctx, layout, config);

    ctx.globalCompositeOperation = "source-atop";

    ctx.fillStyle = config.GENERIC_COLOR;
    ctx.fillRect(0,0, canvas.width, canvas.height);
   

    ctx.globalCompositeOperation = "destination-over";


    ctx.fillStyle = config.BACKGROUND_COLOR;
    ctx.fillRect(0,0, canvas.width, canvas.height);
    //ctx.restore();

    if (game.config.SHOW_INFO) {
        ctx.save();
        ctx.translate(0, (game.layout.height + 0.5) * config.CELL_SIZE);
        draw_info(ctx, game, canvas.width, config.PANE_SIZE - 0.5*config.CELL_SIZE);
        ctx.restore();
    }

    if (game.overlay_visited)
        for (var i in game.expanded_positions)
            {
            fill_visited(ctx,game.expanded_positions[i], game.layout,
                                                        game.config,
                                                        parseInt((80/game.expanded_positions.length)*i), "#D88C11")
            }
    for (var i in game.items) {
        game.items[i].draw(ctx, game.layout, game.config);
    }

    if (game.slow_squares)
        draw_slow_squares(ctx, layout, config);
        /*for (var i in game.slow_squares)
            {
            game.slow_squares[i].draw(ctx, game.layout, game.config);
            }*/
    
    for (i in game.agents) {
        game.agents[i].draw(ctx, game.layout, game.config);
    }

    return game;
}

function draw_slow_squares(ctx, layout, config)
    {
    for (var y=0; y < layout.height; y++) 
        for (var x=0; x < layout.width; x++)
            {
            if (layout[y][x] == "*")
                {
                ctx.save();
                ctx.globalCompositeOperation = "source-atop";
                ctx.beginPath();
                ctx.translate(x*config.CELL_SIZE, (y)*config.CELL_SIZE);
                ctx.strokeStyle = "red";
                ctx.strokeRect(0,0,config.CELL_SIZE, config.CELL_SIZE); 
                ctx.restore();
                }
            }
    }

function drawWalls(ctx, layout, config) {
    var CELL_SIZE = config.CELL_SIZE;
    var OFFSET = config.OFFSET;
    var RADIUS = config.RADIUS;
    function free(x,y) {
        if (0 > x || x >= layout.width)
            return 1;
        if (0 > y || y >= layout.height)
            return 1;
        return layout[y][x] != "%";
    }

    function occupied(x,y) {
        return !free(x,y);
    }
    ctx.beginPath();
    for (var y=-1; y <= layout.height; y++) {
        for (var x=-1; x <= layout.width; x++) {
            if (occupied(x,y)) {
                continue;
            }
            var A = occupied(x-1, y-1); var B = occupied(x, y-1); var C = occupied(x+1, y-1);
            var D = occupied(x-1, y);                             var F = occupied(x+1, y);
            var G = occupied(x-1, y+1); var H = occupied(x, y+1); var I = occupied(x+1, y+1);
            
            if (A) {
                var Xs = x*CELL_SIZE;
                var Ys = y*CELL_SIZE;
                if (B && D) {
                    ctx.moveTo(Xs-OFFSET,Ys+CELL_SIZE/2);
                    ctx.arc(Xs-OFFSET+RADIUS,Ys-OFFSET+RADIUS,
                            RADIUS, -Math.PI, -Math.PI/2, false);
                    ctx.lineTo(Xs+CELL_SIZE/2,Ys-OFFSET);
                } else if (B) {
                    ctx.moveTo(Xs, Ys-OFFSET);
                    ctx.lineTo(Xs+CELL_SIZE/2,Ys-OFFSET);
                } else if (D) {
                    ctx.moveTo(Xs-OFFSET, Ys);
                    ctx.lineTo(Xs-OFFSET, Ys+CELL_SIZE/2);
                } else {
                    ctx.moveTo(Xs-OFFSET, Ys-OFFSET-RADIUS);
                    ctx.arc(Xs-OFFSET-RADIUS, Ys-OFFSET-RADIUS,
                            RADIUS, 0, Math.PI/2, false);
                }
            }

            if (C) {
                var Xs = (x+1)*CELL_SIZE;
                var Ys = y*CELL_SIZE;
                if (F && B) {
                    ctx.moveTo(Xs-CELL_SIZE/2,Ys-OFFSET);
                    ctx.arc(Xs+OFFSET-RADIUS,Ys-OFFSET+RADIUS,
                            RADIUS, -Math.PI/2, 0, false);
                    ctx.lineTo(Xs+OFFSET,Ys+CELL_SIZE/2);
                } else if (F) {
                    ctx.moveTo(Xs+OFFSET, Ys);
                    ctx.lineTo(Xs+OFFSET, Ys+CELL_SIZE/2);
                } else if (B) {
                    ctx.moveTo(Xs-CELL_SIZE/2, Ys-OFFSET);
                    ctx.lineTo(Xs, Ys-OFFSET);
                } else {
                    ctx.moveTo(Xs+OFFSET+RADIUS, Ys-OFFSET);
                    ctx.arc(Xs+OFFSET+RADIUS, Ys-OFFSET-RADIUS,
                            RADIUS, Math.PI/2, Math.PI, false);
                }
            }
            if (I) {
                var Xs = (x+1)*CELL_SIZE;
                var Ys = (y+1)*CELL_SIZE;
                if (F && H) {
                    ctx.moveTo(Xs+OFFSET,Ys-CELL_SIZE/2);
                    ctx.arc(Xs+OFFSET-RADIUS,Ys+OFFSET-RADIUS,
                            RADIUS, 0, Math.PI/2, false);
                    ctx.lineTo(Xs-CELL_SIZE/2,Ys+OFFSET);
                } else if (F) {
                    ctx.moveTo(Xs+OFFSET, Ys-CELL_SIZE/2);
                    ctx.lineTo(Xs+OFFSET, Ys);
                } else if (H) {
                    ctx.moveTo(Xs-CELL_SIZE/2, Ys+OFFSET);
                    ctx.lineTo(Xs, Ys+OFFSET);
                } else {
                    ctx.moveTo(Xs+OFFSET, Ys+OFFSET+RADIUS);
                    ctx.arc(Xs+OFFSET+RADIUS, Ys+OFFSET+RADIUS,
                            RADIUS, -Math.PI, -Math.PI/2, false);
                }
            }
            if (G) {
                var Xs = x*CELL_SIZE;
                var Ys = (y+1)*CELL_SIZE;
                if (D && H) {
                    ctx.moveTo(Xs+CELL_SIZE/2,Ys+OFFSET);
                    ctx.arc(Xs-OFFSET+RADIUS,Ys+OFFSET-RADIUS,
                            RADIUS, Math.PI/2, Math.PI, false);
                    ctx.lineTo(Xs-OFFSET,Ys-CELL_SIZE/2);
                    
                } else if (D && G) {
                    ctx.moveTo(Xs-OFFSET, Ys-CELL_SIZE/2);
                    ctx.lineTo(Xs-OFFSET, Ys);
                } else if (H && G) {
                    ctx.moveTo(Xs+CELL_SIZE/2, Ys+OFFSET);
                    ctx.lineTo(Xs, Ys+OFFSET);
                } else if (G) {
                    ctx.moveTo(Xs-OFFSET-RADIUS, Ys+OFFSET);
                    ctx.arc(Xs-OFFSET-RADIUS, Ys+OFFSET+RADIUS,
                            RADIUS, -Math.PI/2, 0, false);
                }
            }
        }
    }
    ctx.stroke();
}


function draw_food(ctx, consumable, layout, config) {
    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    ctx.beginPath();
    ctx.translate(consumable.x*config.CELL_SIZE, (layout.height-consumable.y-1)*config.CELL_SIZE);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";

    ctx.translate(config.CELL_SIZE/2, config.CELL_SIZE/2);
    ctx.arc(0,0, config.FOOD_SIZE, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function draw_capsule(ctx, consumable, layout, config) {
    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    ctx.beginPath();
    ctx.translate(consumable.x*config.CELL_SIZE, (layout.height-consumable.y-1)*config.CELL_SIZE);
    ctx.fillStyle = config.CAPSULE_COLOR;
    ctx.strokeStyle = config.CAPSULE_COLOR;

    ctx.translate(config.CELL_SIZE/2, config.CELL_SIZE/2);
    ctx.arc(0,0, config.CAPSULE_SIZE, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}



function fill_visited(ctx, coords, layout, config, gradience, initial_color) {
    //console.log(gradience);
    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    ctx.beginPath();
    //console.log(coords[0]);
    ctx.translate(coords[0]*config.CELL_SIZE, (layout.height-coords[1]-1)*config.CELL_SIZE);
    //var p = ctx.getImageData(0, 0, 1, 1).data;  
    //var hex = ("000000" + rgbToHex2(p[0], p[1], p[2])).slice(-6);
    
    //if (hex == "000000")
      //  {
        ctx.fillStyle= increase_brightness(initial_color,gradience);
        ctx.fillRect(0,0,config.CELL_SIZE, config.CELL_SIZE);
        //}
        
    ctx.restore();
}


function draw_agent(ctx, agent, layout, config) {
    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    ctx.beginPath();
    ctx.translate(agent.x*config.CELL_SIZE, (layout.height-agent.y-1)*config.CELL_SIZE)
    ctx.fillStyle = config.AGENT_COLORS[agent.index];
    ctx.strokeStyle = config.AGENT_COLORS[agent.index];
    ctx.translate(config.CELL_SIZE/2, config.CELL_SIZE/2);
    if (agent.type == PACMAN) {
        var start = Math.PI/10;
        var end = -Math.PI/10;
        if (agent.facing == NORTH)
            ctx.rotate(-Math.PI/2);
        if (agent.facing == SOUTH)
            ctx.rotate(Math.PI/2);
        if (agent.facing == WEST)
            ctx.rotate(Math.PI);
        ctx.arc(0,0, config.CELL_SIZE/2, start, end, false);
        ctx.lineTo(0,0);
        ctx.stroke();
        ctx.fill();
    } else {
        if (agent.scaredTimer > 0) {
            ctx.fillStyle = config.SCARED_COLOR;
            ctx.strokeStyle = config.SCARED_COLOR;
        }
        scale = config.CELL_SIZE*0.65;
        ctx.moveTo( 0.00*scale,  0.30*scale);
        ctx.lineTo( 0.25*scale,  0.75*scale);
        ctx.lineTo( 0.50*scale,  0.30*scale);
        ctx.lineTo( 0.75*scale,  0.75*scale);
        ctx.lineTo( 0.75*scale, -0.50*scale);
        ctx.lineTo( 0.50*scale, -0.75*scale);
        ctx.lineTo(-0.50*scale, -0.75*scale);
        ctx.lineTo(-0.75*scale, -0.50*scale);
        ctx.lineTo(-0.75*scale,  0.75*scale);
        ctx.lineTo(-0.50*scale,  0.30*scale);
        ctx.lineTo(-0.25*scale,  0.75*scale);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.strokeStyle = "";

        ctx.beginPath();
        ctx.moveTo(0.35*scale, 0.30*scale);
        ctx.arc(0.35*scale, -0.30*scale, 0.30*scale, 0, 2*Math.PI, false);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(-0.35*scale, 0.30*scale);
        ctx.arc(-0.35*scale, -0.30*scale, 0.30*scale, 0, 2*Math.PI, false);

        ctx.fill();

        switch (agent.facing) {
            case NORTH:
                var dx = 0; var dy = -1; break;
            case SOUTH:
                var dx = 0; var dy = 1; break;
            case EAST:
                var dx = 1; var dy = 0;
                break;
            case WEST:
                var dx = -1; var dy = 0; break;
            case STOP:
                var dx = dy = 0; break;
        }

        ctx.translate(0.08*scale*dx, 0.08*scale*dy);
        
        ctx.fillStyle = "black";
        ctx.strokeStyle = "";

        ctx.beginPath();
        ctx.moveTo(0.35*scale, 0.30*scale);
        ctx.arc(0.35*scale, -0.30*scale, 0.15*scale, 0, 2*Math.PI, false);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(-0.35*scale, 0.30*scale);
        ctx.arc(-0.35*scale, -0.30*scale, 0.15*scale, 0, 2*Math.PI, false);

        ctx.fill();
        
            
    }
    ctx.restore();
}


function draw_info(ctx, game, width, height) {
    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = game.config.FONT;
    ctx.fillStyle = "yellow";
    ctx.fillText("NODES EXPANDED: " + game.nNodes, 0, 0, width);
 

    //ctx.fillStyle = config.TEAM_COLORS[0];
    //ctx.fillText("RED: " + game.team_names[RED], width/4, 0, 3*width/8);

    //ctx.fillStyle = config.TEAM_COLORS[1];
    //ctx.fillText("BLUE: " + game.team_names[BLUE], 5*width/8, 0, 3*width/8);

    ctx.restore();
}

function canvas_arrow(canvas, fromx, fromy, tox, toy){
    var context = canvas.getContext("2d");
    //context.clearRect(0,0, canvas.width, canvas.height);
    //ctx.save();
    
    context.strokeStyle = "black";
    context.fillStyle= "black";
    
    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(toy-fromy,tox-fromx);
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
    context.closePath();
    context.stroke();
}

function manhattan_distance(x1,y1,x2,y2)
    {
    dist = Math.abs(x1-x2)+Math.abs(y1-y2);
    return dist;
    }
    
function increase_brightness(hex, percent){
    var r = parseInt(hex.substr(1, 2), 16),
        g = parseInt(hex.substr(3, 2), 16),
        b = parseInt(hex.substr(5, 2), 16);

    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}

function findPos(obj) { 
    var curleft = 0, curtop = 0; 
    if (obj.offsetParent) { 
        do { 
            curleft += obj.offsetLeft; 
            curtop += obj.offsetTop; 
        } while (obj = obj.offsetParent); 
        return { x: curleft, y: curtop }; 
    } 
    return undefined; 
} 
 
function rgbToHex2(r, g, b) { 
    if (r > 255 || g > 255 || b > 255) 
        throw "Invalid color component"; 
    return ((r << 16) | (g << 8) | b).toString(16); 
} 

