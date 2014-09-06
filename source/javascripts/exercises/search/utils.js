function hexc(colorval) {
    console.log("col is: " + colorval);
    var parts = colorval.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(0\.\d+))?\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
}

var RGBtoHEX = function(color) {
  return "#"+$.map(color.match(/\b(\d+)\b/g),function(digit){
    return ('0' + parseInt(digit).toString(16)).slice(-2)
  }).join('');
};




function tree_search(problem)
    {
    var graph_conf = problem.graph_conf;
    var alg = problem.alg;
    var path = new Array;
    var fringe = new PriorityQueue({low: true});
    var priority = 0;
    var maxspace = 0;
    var maxcontent = [];
    fringe.push(graph_conf.nodes[0], priority);
    problem.pathcost[graph_conf.nodes[0]] = 0;

    while (fringe.size())
        {
        if (fringe.size() > maxspace)
            {
            maxspace = fringe.size();
            maxcontent = fringe.get_nodes();
            }
        var node = fringe.pop();
        alpha = 0;
        if (alg=="DFS")
            priority = 0;
            
        path.push(node);
        if (node.charAt(node.length-1) == "G")
            {
            return [path,maxcontent,node];
            }
        
        for (var i = 0; i < graph_conf.edges.length; i++)
            {
            if (graph_conf.edges[i][0] == node.charAt(node.length-1))
                {
                priority++;
                var new_node = node+"-"+graph_conf.edges[i][1];
                problem.pathcost[new_node] = problem.pathcost[node]+graph_conf.costs[i];
                if (alg=='UCS')
                    {
                    priority = problem.pathcost[new_node]+alpha;
                    //alpha+=0.1;
                    }
                    
                else if (alg=='Greedy')
                    {
                    priority = graph_conf.heuristic[graph_conf.edges[i][1]]+alpha;
                    //alpha+=0.1;
                    }
                else if (alg=='A*')
                    {
                    priority = problem.pathcost[new_node]+graph_conf.heuristic[graph_conf.edges[i][1]]+alpha;
                    //alpha+=0.1;   
                    }
                fringe.push(new_node,priority);
                }
            }
        }
    return path;
    }
    
function search_problem()
    {
    this.demo=1;
    this.alg='DFS';
    this.alg_state="init_fringe";
    this.fringe = new Array;
    this.current_node="";
    this.current_node_last_state="";
    this.successor="";
    this.node_stage=0;
    this.explored_edges = new Array;
    this.explored_set = new Array;
    this.add_next="";
    this.last_x = 3;
    this.last_y = 250;
    this.paper_width = 500;
    this.paper_height=2000;
    this.treenode_width=100;
    this.stree_x = (this.paper_width-this.treenode_width)/2;
    this.stree_y = 250;
    this.graph_height=200;
    this.graph_width= 500;
    this.node_radius = 20;
    this.pseudocode = [];
    this.firstpass=1;
    this.hedges = new Array;
    this.hnodes = new Array;
    this.exp_x = 105;
    this.exp_y = curr_cons_y+40;
    this.nodes = null;
    this.labels = null;
    this.pqset = null;
    this.draw_graph = draw_search_graph;
    this.draw_tree_node = draw_tree_node;
    this.stree_last_node = null;
    this.stree_obj = new Array;
    this.stree_node_placement = new Array;
    this.pathcost = new Array;
    this.positions = new Array;
    this.debug = new debug;
    this.interval_id = 0;
    this.stree_nodes = null;
    this.stree_labels = null;
    this.hint_coord = [];
    this.hint_obj = null;
    }
    

function exercise()
    {
    this.answers = new Array();
    
    this.clear_answers = function()
        {
        this.answers=[];  
        };
        
    this.add_answer = function(id)
        {
        for (var i = 0; i< this.answers.length;i++)
            if (this.answers[i] == id)
                return -1;
        
        this.answers.push(id)
        };
        
    this.find_answer = function(id)
        {
        for (var i = 0; i< this.answers.length;i++)
            if (this.answers[i] == id)
                return 1;
        return 0;
        };
    this.del_answer = function(id)
        {
        for (var i = this.answers.length-1; i >= 0; i--)
            {
            if (this.answers[i] == id)
                {
                this.answers.splice(i, 1);
                return 1;
                }
            }
        };
        
    this.verify_answers = function(key)
        {
        for (var i = 0; i< key.length; i++)
            {
            if (!this.find_answer(key[i]))
                return 0;
            }
        return (this.answers.length == key.length);
        };
    
    this.correct_so_far = function(key)
        {
        for (var i=0; i < this.answers.length; i++)
            if (!this.is_correct(key,this.answers[i]))
                return 0;
            
        return 1;
        }
    
    this.is_correct = function(key, selection)
        {
        for (var i = 0; i < key.length; i++)
            if (selection==key[i])
                return 1;
             
        return 0;
        
        }
        
    }

function debug()
    {
    this.breakpoints = new Array;
    
    this.clear_breakpoints = function()
        {
        this.breakpoints=[];  
        };
    this.add_breakpoint = function(id)
        {
        for (var i = 0; i< this.breakpoints.length;i++)
            if (this.breakpoints[i] == id)
                return -1;
        
        this.breakpoints.push(id)
        };
    this.find_breakpoint = function(id)
        {
        for (var i = 0; i< this.breakpoints.length;i++)
            if (this.breakpoints[i] == id)
                return 1;
        return 0;
        };
    this.del_breakpoint = function(id)
        {
        for (var i = this.breakpoints.length-1; i >= 0; i--)
            {
            if (this.breakpoints[i] == id)
                {
                this.breakpoints.splice(i, 1);
                return 1;
                }
            }
        };
    }
