function child_states(game)
    {
    var childstates = new Array;
    var legalActions = game.agents[0].getLegalActions(game.layout);
    
     for (var i = 0; i < legalActions.length; i++)
        {
        var action = legalActions[i];
        newgame = new Game(game.layout.slice());
        newgame.config = config;
        newgame.score = game.score;
        newgame.food_left = game.food_left;
        newgame.execute_action(0,action);
        if (newgame.score > game.score)
            childstates.push(newgame.layout);
        }
        
    return childstates;
    }

function greedy_agent(game)
    {
    var numActions = 0;
    var maxScore = 0;
    var nextAction="";
    var actions = new Array;
    var newgame;
    var legalActions = game.agents[0].getLegalActions(game.layout);
    
    for (var i = 0; i < legalActions.length; i++)
        {
        var action = legalActions[i];
        newgame = new Game(game.layout.slice());
        newgame.config = config;
        newgame.score = game.score;
        newgame.food_left = game.food_left;
        newgame.execute_action(0,action);
        if (newgame.score >= maxScore)
            {
            maxScore = newgame.score;
            nextAction = action;
            }
        }
    return nextAction;
    }

function closest_food_agent(game)
    {
    var numActions = 0;
    var maxScore = 0;
    var nextAction="";
    var actions = new Array;
    var newgame, res, minDist;
    var legalActions = game.agents[0].getLegalActions(game.layout);
    minDist = 999999;
    for (var i = 0; i < legalActions.length; i++)
        {
        var action = legalActions[i];
        newgame = new Game(game.layout.slice());
        newgame.config = config;
        newgame.score = game.score;
        newgame.food_left = game.food_left;
        newgame.execute_action(0,action);
        res = newgame.agents[0].getClosestFood(newgame);
        if (res < minDist)
            {
            minDist = res;
            nextAction = action;
            //console.log(minDist,nextAction);
            }
        /*if (newgame.score >= maxScore)
            {
            maxScore = newgame.score;
            nextAction = action;
            }*/
        }
    return nextAction;
    }

function tree_search(game)
    {
    var layout = game.layout;
    var alg = game.alg;
    var history = new Array;
    var pathcost = new Array;
    var actions = new Array;
    var expanded_positions = new Array;
    var coord_cache = new Array;
    var fringe = new PriorityQueue({low: true});
    var priority = 0;
    var nNodes = 0;
    var counter = 0;
    fringe.push(game, priority);
    pathcost[game.layout.toString()] = 0;

    function do_search()
        {
        var node = fringe.pop();
        var coord = node.agents[0].x+ "," + node.agents[0].y;
        if (!coord_cache[coord])
            {
            coord_cache[coord] = 1;
            expanded_positions.push([node.agents[0].x,node.agents[0].y]);
            }
        history[node.layout.toString()]=1;
        nNodes++;

        if (alg=="DFS")
            priority = 0;
        if (isGoalState(node))
            {
            game.expanded_positions = expanded_positions;
            actions = node.actions.slice();
            var play = new Object();
            play.actions = actions;
            play.length = play.actions.length;
            play.game = game;
            play.canvas = game.canvas;
            play.i = 0;
            play.interval_id = null;
            play.step_single = m_single;
            play.step = m_step;
            window.pacman_play=play;
            draw(game.canvas,game);
            window.pacman_play = play;
            if (game.delay_start)
                {
                jQuery("#start_moving").show();
                return 0;
                }
            window.interval1[window.interval1.length] = setInterval(play.step, rules.TURN_DELAY);
            return 0;
            }
        var legalActions = node.agents[0].getLegalActions(node.layout);
        
        for (var i = 0; i < legalActions.length; i++)
            {
            var action = legalActions[i];
            //var newgame = jQuery.extend(true, {}, game);
            var newgame = new Game(node.layout.slice());
            newgame.food_left = node.food_left;
            newgame.config = config;
            //console.log(newgame.execute_action);
            newgame.execute_action(0,action);
            //console.log(newgame.layout);
            if (node.restore_square)
                {
                newgame.layout[node.layout.height-1-node.agents[0].y] =
                setCharAt(this.layout[node.layout.height-1-node.agents[0].y],node.agents[0].x, "*");
                //console.log(newgame.layout);
                }

            newgame.actions = node.actions.slice();
            newgame.actions.push(action);
            if (node.layout[newgame.layout.height-1-newgame.agents[0].y][newgame.agents[0].x] == "*")
               {
               //console.log(newgame.agents[0].y, newgame.agents[0].x);
               newgame.restore_square = 1;
               cost_move = 10;
               }
            else
                cost_move = 1;
            pathcost[newgame.layout.toString()] = pathcost[node.layout.toString()]+cost_move;
            if (!history[newgame.layout.toString()])
                {
                if (alg=="A*")
                    {
                    var graph_data = newgame.food_grid();
                    var tmparr = [newgame.agents[0].x,newgame.agents[0].y];
                    graph_data.push(tmparr);
                    //console.log(graph_data);
                    var heur = mstCalc(graph_data);
                    priority = pathcost[newgame.layout.toString()]+heur;
                    //console.log(nNodes);
                    }
                else if (alg=="UCS")
                    priority = pathcost[newgame.layout.toString()];
                else if (alg=="Greedy")
                    priority=newgame.food_left;
                else
                    priority++;
                fringe.push(newgame,priority);
                }
                     
           

            }
        jQuery(game.status_bar).html("<b>NODES EXPANDED: "+ nNodes + "</b>");
        if (fringe.size())
            setTimeout(do_search,0);
             
        }
    setTimeout(do_search,0);
    }

function isGoalState(game)
    {
     /*for (var x=0; x < game.layout.width; x++) {
        for (var y=0; y < game.layout.height; y++) {
            var char = game.layout[y][x];
            if (char=='.')
                return 0;
        }
     }*/
    if (game.food_left==0)
        return 1;
    return 0;
    }
    
    
