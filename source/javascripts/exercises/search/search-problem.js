
var anspath_coord_x = 420;
var anspath_coord_y= 20;
var curr_cons_x = 230;
var curr_cons_y = 410;
var arrow_size=10;
var node_width=130;
var node_height=50;
var green = "#01df01";
var orange= "#ff9000";
var white = "#fff";
var black = "#000";
var gray = "#E6E6E6";
var pqsearch_hintbox = "#pqsearch_showhints";
var pqsearch_area = "#hintbox";
var pqsearch_next_btn = '#next_step';
var pqsearch_alg_select = '#alg_select';
var pqsearch_explored_set='#explored_set_val';
var pq_search_cont_btn='#continue';
var pq_search_clear_btn='#clear_all';
var pq_search_stop_btn='#stop';
var pq_search_interval_fld = '#interval_length';

var tree_search_code=['function tree-search(problem,strategy) returns solution, or failure',
                                '<br>',
                                '&nbsp;&nbsp;&nbsp;&nbsp;initialize the fringe with the initial state of problem',
                                '&nbsp;&nbsp;&nbsp;&nbsp;loop do',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if fringe is empty',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;then return failure',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;current_node <- select_node(fringe,strategy)',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if current_node ends in a goal state',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;then return current_node',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else current_node_last_state <- get_state',
                                '<br>',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for successor in successors(current_node_last_state)',
                                '<br>',                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;add(fringe,append(current_node,successor))',
                                '&nbsp;&nbsp;&nbsp;&nbsp;end'
                                ];


var graph_search_code=['function graph-search(problem,strategy) returns solution, or failure',
                                '&nbsp;&nbsp;&nbsp;&nbsp;initialize explored_set <- empty',
                                '&nbsp;&nbsp;&nbsp;&nbsp;initialize the fringe with the initial state of problem',
                                '&nbsp;&nbsp;&nbsp;&nbsp;loop do',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if fringe is empty',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;then return failure',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;current_node <- select_node(fringe,strategy)',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if current_node ends in a goal state',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;then return current_node',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else current_node_last_state <- get_state',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;add(explored_set,current_node)',
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for successor in successors(current_node_last_state)',
'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if not successor in explored_set',
'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;add(fringe,append(current_node,successor))',
                                '&nbsp;&nbsp;&nbsp;&nbsp;end'
                                ];

var _states = { 'tree_search' : {
                'alg_init' : [2],
                'init_fringe' : [4], 
                'chk_empty' : [6], 
                'select_node' : [7], 
                'goal_test' : [8,9], 
                'get_last_state' : [11],
                'loop_successors' : [13,4],
                'add_to_fringe' : [11],
                'goal_reached' : [8],
                'failure' : [5] },
                
                
                'graph_search' : {
                'alg_init' : [1],
                'init_explored' : [2],
                'init_fringe' : [4], 
                'chk_empty' : [6], 
                'select_node' : [7], 
                'goal_test' : [8,9], 
                'get_last_state' : [10],
                'loop_successors' : [12,4],
                'add_explored' : [11],
                'check_explored' : [13],
                'add_to_fringe' : [11],
                'goal_reached' : [8],
                'failure' : [5] }

              };


function rect_node_cl(r,x,y,problem,txt)
    {
    var newholder = r.rect(x, y, 100, 30, 10);
    newholder.attr({'fill': white, 'stroke-width': 3});
    var newtxt = r.text(x+50,y+15);
    problem.exp_x += 120;
    if (problem.exp_x >= problem.paper_width-120)
        {
        problem.exp_x = 3;
        problem.exp_y += 50;
        }
    newtxt.attr({text: txt, font: "14px Fontin-Sans, Arial",
                cursor: 'default'});
    }
    
function highlight_path(problem,path,color)
    {
    for (i = 0; i < problem.nodes.length; i++)
        problem.nodes[i].attr({fill: white});
    
    for (i = 0; i < problem.graph_conf.edges.length; i++)
        color_arrow(problem.hedges[problem.graph_conf.edges[i]],black);
    
    for (i = 0; i < path.length; i++)
        {
        if (path[i] && path[i+1]
            && problem.hedges[path[i]+ path[i+1]])
            color_arrow(problem.hedges[path[i]+ path[i+1]],color);
        
        for (j = 0; j < problem.nodes.length; j++)
            if (problem.labels[j].attr('text') == path[i])
                problem.nodes[j].attr({fill: color});
        }
    }
    


function color_arrow(arrow,color)
    {
    arrow[0].attr({"stroke": color});
    arrow[1].attr({"fill": color});
    }
    
function toggle_hints(code)
    {
    for (i = 0; i < code.length; i++)
        if (RGBtoHEX($("#pqguide"+i).css('background-color')) == gray)
            $('#pqguide' + i + ' a:eq(0)').trigger('click.cluetip');
    }

function clear_highlight(problem)
    {
    var code = problem.pseudocode;
    for (i = 0; i < code.length; i++)
        {
        var codeline = 'pqguide' +i;
        if (problem.debug.find_breakpoint(codeline) &&
            $('#'+codeline).css("list-style-image").match(/breakpt-reach/g))
            {
            $('#'+codeline).css("list-style-image","url('/images/exercises/search/breakpt.gif')");
            }
        $("#pqguide" + i).css('background-color',white);
        //$("#pqguide" + i).css('list-style-type','none');
        }
    }
    
function highlight_line(problem,id)
    {
    clear_highlight(problem);
    $("#pqguide"+id).css('background-color',gray);
    var codeline = 'pqguide'+id;
    if (problem.interval_id && problem.debug.find_breakpoint(codeline))
        {
        codeline = '#' + codeline;
        $(codeline).css("list-style-image","url('/images/exercises/search/breakpt-reached.gif')");
        clearInterval(problem.interval_id);
        }
    //$("#pqguide"+id).css('list-style-type','circle');
    }

function show_hint(id)
    {
    if (id > -1 && $(pqsearch_hintbox).attr('checked'))
        $('#pqguide' + id + ' a:eq(0)').trigger('click.cluetip');
    }

function search_tree()
    {
    this.node = new String;
    this.children = new Array;
    this.coord_x=0;
    this.coord_y=0;
    }


function goal_test(obj)
    {
    var html = 'Goal State?';

    var search_done = function() {
        var r = obj.paper;
        //var ans_highlight = r.rect(anspath_coord_x-50, anspath_coord_y-12, 100, 30, 10);
        //ans_highlight.attr({stroke: green});
        $(this).dialog("close");
    }
    var $dialog = $('<div id="goaltest"></div>')
        .html(html)
        .dialog({autoOpen: false,
	    modal: true,
	    title: 'Goal Test',
	    buttons: {"No": function() {$(this).dialog("close");},
                  "Yes": search_done}
	});
    $dialog.dialog('open');
    }
    
function set_priority(obj)
    {
    var curr_txt = obj.attr('text');
    var new_txt = obj.paper.text(obj.pair.attrs.x+93,obj.attrs.y,"");
    var handle_key = function (event) {
        if (event.which == 8)
            new_txt.attr({"text": ""});
        else if (event.which == 13)
            {
            new_txt.removeCursor();
            $(document).unbind('keyup');
            if (obj.pair.problem.firstpass)
                {
                clear_highlight(obj.pair.problem);
                //$("#pqguide3").css('background-color',green);
                highlight_line(obj.pair.problem,3);
                show_hint(3);
                obj.pair.problem.firstpass = 0;
                }
            
            }
        else if (event.which >= 48 && event.which <= 57)
              {
              var tmptxt = new_txt.attr("text");
              new_txt.attr({"text": tmptxt+String.fromCharCode(event.which)});           
              }
        };
    
    var edit_fld = function() {
        new_txt.addCursor();
        $(document).keyup( handle_key);
    };
    
    new_txt.addCursor();
    new_txt.click(edit_fld);
    $(document).keyup( handle_key);
    
    new_txt.attr({"font": "14px Fontin-Sans, Arial", "font-weight": "bold"});
    }

            
            
window.onload = function () 
    {
    var pq_search = new search_problem();
    if (pq_search.demo && !tree_search_debugger)
        pq_search.pseudocode = graph_search_code;
    else if (tree_search_debugger)
        pq_search.pseudocode = tree_search_code;
    else
        pq_search.pseudocode = ['initialize priority queue<a href="" title="|click on the start node, S, and then enter 0 for its priority"></a>',
                            "loop do",
                            "&nbsp;&nbsp;&nbsp;&nbsp;if there are no nodes for expansion return failure",
                            '&nbsp;&nbsp;&nbsp;&nbsp;pop node from the priority queue for expansion<a href="" title="|Click on the partial|unxpanded plan with the top priority"></a>',
                            '&nbsp;&nbsp;&nbsp;&nbsp;if the node contains a goal state return the solution<a href="" title="|If the node contains a goal state click on the Reached Goal button below. Otherwise click the Not A Goal button"></a>',
                            '&nbsp;&nbsp;&nbsp;&nbsp;else expand the node<a  href="" title="Click on each node|you want to add,|enter priority.|Click the Continue|button after all nodes are added."></a>',
                            "end loop"];
        
    for (i = 0; i < pq_search.pseudocode.length; i++)
        {
        $("#codeguide").append("<li id='pqguide" + i + "' class='pqguide'>" + pq_search.pseudocode[i] + "</li>");
        if (!pq_search.demo)
            $('#pqguide' + i + ' a:eq(0)').cluetip({arrows: true, sticky: true, splitTitle: '|', cluetipClass: 'rounded', showTitle: false, activation: 'click'});
        }
        
    $("#reached_goal").button();
    $("#not_goal").button();
    $("#buttons").hide();
    $("#continue_alg").button();
    $("#continue_alg").hide();
    
    if (hide_search_code)
        {
        $("#codeguide").hide();
        $("#variables").hide();
        $("#flow_buttons").hide();
        $("#pseudocode").css('border', 'none');
        }
        
    if (tree_search_debugger)
        {
        $('.pqguide').hover(function()
            {
            $(this).css('cursor','pointer');
            }, function() {
                $(this).css('cursor','auto');
            });
        
        $(pq_search_interval_fld).change(function()
            {
            if (pq_search.interval_id)
                clearInterval(pq_search.interval_id);
            pq_search.interval_id = setInterval(search_fsm, $(pq_search_interval_fld).val());
            }                                 
        );
        $(pq_search_stop_btn).click(function()
            {
            if (pq_search.interval_id)
                clearInterval(pq_search.interval_id);   
            }
                                    );
            
        $(pq_search_clear_btn).click(function()
            {
            for (var i = 0; i < pq_search.pseudocode.length; i++)
                {
                $('#pqguide'+i).css("list-style-image","none");
                }
            pq_search.debug.clear_breakpoints();
            });
        $(pq_search_cont_btn).click(function()
            {
            if (pq_search.interval_id)
                clearInterval(pq_search.interval_id);
            pq_search.interval_id = setInterval(search_fsm,  $(pq_search_interval_fld).val());
            });
        $(".pqguide").click(
            function(e)
                {
                var codeline = '#' + this.id;
                $(codeline).css("list-style-image","url('/images/exercises/search/breakpt.gif')");
                if (pq_search.debug.find_breakpoint(this.id))
                    {
                    $(codeline).css("list-style-image","none");
                    pq_search.debug.del_breakpoint(this.id);
                    return 0;
                    }
                pq_search.debug.add_breakpoint(this.id);
                }
                              
                              );
        }
        if (!tree_search_debugger && !hide_search_code)
            {
            $(pq_search_cont_btn).click(function()
            {
            if (pq_search.interval_id)
                clearInterval(pq_search.interval_id);
            pq_search.interval_id = setInterval(search_fsm,  $(pq_search_interval_fld).val());
            });
            
            $(pq_search_stop_btn).click(function()
            {
            if (pq_search.interval_id)
                clearInterval(pq_search.interval_id);   
            }
                                    );
            }
    
    var mk_fringe = function () {
        var choose_path = function () {
            var obj = this.type == 'rect' ? this : this.pair;
            var myTxt = obj.pair.attr('text');
            var graph_conf = obj.problem.graph_conf;
            
            obj.pathFld.attr({text: myTxt});
            obj.problem.curr_fld.attr({text: myTxt});
            var txtNodes = myTxt.split("-");
            for (i = 0; i < nodes.length; i++)
                nodes[i].attr({fill: white});
            
            for (i = 0; i < graph_conf.edges.length; i++)
                color_arrow(pq_search.hedges[graph_conf.edges[i]],black);
            
            for (i = 0; i < txtNodes.length; i++)
                {
                if (txtNodes[i] && txtNodes[i+1]
                    && pq_search.hedges[txtNodes[i]+ txtNodes[i+1]])
                    color_arrow(pq_search.hedges[txtNodes[i]+ txtNodes[i+1]],green);
                
                for (j = 0; j < nodes.length; j++)
                    if (labels[j].attr('text') == txtNodes[i])
                        nodes[j].attr({fill: green});
                }

            highlight_line(obj.problem, 4);
            show_hint(4);
            $("#reached_goal").click(function() {
                var r = obj.paper;
                //var ans_highlight = r.rect(anspath_coord_x-50, anspath_coord_y-12, 100, 30, 10);
                //ans_highlight.attr({stroke: green});
                $("#buttons").hide();
                $("#reached_goal").unbind("click");
                clear_highlight(obj.problem);
                show_hint(-1);
                });
            $("#not_goal").click(function() {
                $("#buttons").hide();
                $("#continue_alg").click(function() {
                    highlight_line(obj.problem,3);
                    show_hint(3);
                    obj.attr({fill: gray});
                    obj.unclick(choose_path);
                    rect_node_cl(obj.paper,obj.problem.exp_x,obj.problem.exp_y,obj.problem,obj.pair.attr('text'));
                    obj.problem.curr_fld.attr({'text': ""});
                    $("#continue_alg").hide();
                    $("#continue_alg").unbind('click');  
                });
                $("#continue_alg").show();
                highlight_line(obj.problem,5);
                show_hint(5);
                $("#not_goal").unbind("click");
                $("#reached_goal").unbind("click");
                obj.problem.nodes.click(mk_fringe);
                obj.problem.labels.click(mk_fringe); 
                });
            $("#buttons").show();
            obj.problem.nodes.unclick(mk_fringe);
            obj.problem.labels.unclick(mk_fringe);
            console.log(obj.problem.pqset.length);
            obj.problem.pqset.unclick(choose_path);
        }
        
            
        var obj = this.type == 'circle' ? this : this.pair;
        var newholder = r.rect(pq_search.last_x, pq_search.last_y, 110, 30, 10);
        newholder.attr({'fill': white, 'stroke-width': 3});
        var newtxt = r.text(pq_search.last_x+50,pq_search.last_y+15);
        pq_search.last_x += 130;
        if (pq_search.last_x >= pq_search.paper_width-120)
            {
            pq_search.last_x = 3;
            pq_search.last_y += 50;
            }
        var fldTxt = obj.fld.attr('text');
        if (fldTxt)
            fldTxt += '-';
        fldTxt += obj.pair.attr('text');
        newholder.pair = newtxt;
        newtxt.pair = newholder;
        newholder.pathFld = obj.fld;
        newtxt.attr({text: fldTxt, font: "14px Fontin-Sans, Arial",
                    cursor: 'default'});
        newholder.problem = obj.problem;
        
        set_priority(newtxt);
        newtxt.pair.click(choose_path);
        newtxt.click(choose_path);
        pq_search.pqset.push(newholder,newtxt);
        obj.attr({fill: orange});
        
    }
    
    var graph_conf = { "nodes": ["S","A","B","C","D","G"],
                       "heuristic": {"S":4,"A":3,"B":6,"C":1,"D":2,"G":0},
                       "edges": ["SA","SB","AD","DB","DC","CG","BC"],
                       "costs": [1,1,1,1,1,1,5],
                       "alg" : []
                    };

    pq_search.alg = $("#alg_select").val();
    var stype;
    if (tree_search_debugger)
        stype = "tree_search";
    else
        stype = $('#stype').val();
    pq_search.graph_conf = graph_conf;
    var rt_res = tree_search(pq_search);
    graph_conf.alg[pq_search.alg] = rt_res[0];
        
    var r = Raphael("holder", pq_search.paper_width, pq_search.paper_height);
     
    pq_search.curr_fld = r.text(curr_cons_x,curr_cons_y,"");
    pq_search.curr_fld.attr({font: "14px Fontin-Sans, Arial"});
    var nodes = r.set();
    var labels = r.set();
 
    // draw graph
    pq_search.draw_graph(r,nodes,labels);
    
   
    for (var i = 0, ii = nodes.length; i < ii; i++)
        {
        nodes[i].pair = labels[i];
        labels[i].pair = nodes[i];
        nodes[i].fld = pq_search.curr_fld;
        nodes[i].hnd = mk_fringe;
        nodes[i].problem = pq_search;
        }

    var restart_problem = function ()
                {
                if (pq_search.interval_id)
                    clearInterval(pq_search.interval_id);
                pq_search.alg = $(pqsearch_alg_select).val();
                pq_search.graph_conf = graph_conf;
                if (tree_search_debugger)
                    {
                    stype = "tree_search";
                    }
                else
                    stype = $('#stype').val();
                    
                if (stype=='tree_search')
                    {
                    pq_search.pseudocode = tree_search_code;
                    $('#explored_set').hide();
                    }
                else
                    {
                    pq_search.pseudocode = graph_search_code;
                    pq_search.alg_state = 'init_explored';
                    $('#explored_set').show();
                    }
                    
                $("#codeguide").html('');
                for (i = 0; i < pq_search.pseudocode.length; i++)
                    {
                    $("#codeguide").append("<li id='pqguide" + i + "'>" + pq_search.pseudocode[i] + "</li>");
                    }
                highlight_line(pq_search,_states[stype]['alg_init'][0]);
                clear_canvas(r);
                $("#fringe").html("");
                $("#current_node").html("");
                $("#successor").html("");
                $("#current_node_last_state").html("");
                $("#current_node").css('background-color',white);
                $(pqsearch_explored_set).html('');
                pq_search.explored_edges = [];
                pq_search.explored_set = [];
                pq_search.successor="";
                pq_search.add_next = "";
                pq_search.current_node = "";
                pq_search.current_node_last_state = "";
                pq_search.fringe = [];
                pq_search.positions = [];
                pq_search.stree_node_placement = [];
                pq_search.hint_coord = [];
                pq_search.hint_obj = null;
                pq_search.alg_state = "init_fringe";
                pq_search.stree_x = 200;
                pq_search.stree_y = 250;
                pq_search.stree_obj = [];
                pq_search.stree_node_placement = [];
                pq_search.node_stage = 0;
                pq_search.curr_fld = r.text(curr_cons_x,curr_cons_y,"");
                pq_search.curr_fld.attr({font: "14px Fontin-Sans, Arial"});
                nodes = r.set();
                labels = r.set();
                positions = [];
                pqlbl = r.text(260,230,"Search Tree:");
                pqlbl.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
                rt_res = tree_search(pq_search);
                graph_conf.alg[pq_search.alg] = rt_res[0];
                pq_search.draw_graph(r,nodes,labels);
                };    
    
    if (pq_search.demo)
        {
        var positions = new Array;
        var pqlbl = r.text(260,230,"Search Tree:");
        var init_pq;
        pqlbl.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
        $(pqsearch_area).hide();
        $(pqsearch_next_btn).button();
        if (tree_search_debugger)
            {
            $(pq_search_cont_btn).button();
            $(pq_search_clear_btn).button();
            $(pq_search_stop_btn).button();
            }
        if (!tree_search_debugger && !hide_search_code)
            {
            $(pq_search_cont_btn).button();
            $(pq_search_stop_btn).button();
            }
        $(pqsearch_alg_select).change(restart_problem);
        if (stype=="tree_search")
            $('#explored_set').hide();
        $('#stype').change(restart_problem);
        var search_fsm = function()
            {
            if (pq_search.alg_state=="init_explored")
                {
                highlight_line(pq_search,_states[stype][pq_search.alg_state][0]);
                pq_search.alg_state="init_fringe";
                }
            else if (pq_search.alg_state=="init_fringe")
                {
                pq_search.fringe.push(graph_conf.alg[pq_search.alg][0]);
                highlight_line(pq_search,_states[stype][pq_search.alg_state][0]);
                pq_search.alg_state="chk_empty";
                pq_search.draw_tree_node(r,pq_search.fringe[pq_search.fringe.length-1],1,0);
                }
            else if(pq_search.alg_state=="chk_empty")
                {
                highlight_line(pq_search,_states[stype][pq_search.alg_state][0]);
                pq_search.alg_state="select_node";
                }
            else if (pq_search.alg_state=="select_node")
                {
                pq_search.current_node=graph_conf.alg[pq_search.alg][pq_search.node_stage];
                pq_search.explored_edges = new Array;
                highlight_line(pq_search,_states[stype][pq_search.alg_state][0]);
                pq_search.alg_state="goal_test";
                var idx_del=0;
                for (i=0;i<pq_search.fringe.length;i++)
                    {
                    if (pq_search.fringe[i]==pq_search.current_node)
                        {
                        idx_del=i;
                        break;
                        }
                    }
                pq_search.fringe.splice(idx_del,1);
                pq_search.stree_obj[pq_search.current_node].attr({'fill': gray});
                }
            else if (pq_search.alg_state=="goal_test")
                {
                if (pq_search.current_node.charAt(pq_search.current_node.length-1) == "G")
                    {
                    highlight_line(pq_search,_states[stype][pq_search.alg_state][0]);
                    $("#current_node").css('background-color',green);
                    pq_search.alg_state="goal_reached";
                    }
                else
                    {
                    highlight_line(pq_search,_states[stype][pq_search.alg_state][1]);
                    pq_search.alg_state="get_last_state";
                    }
                }
            else if(pq_search.alg_state=="get_last_state")
                {
                pq_search.current_node_last_state = pq_search.current_node.charAt(pq_search.current_node.length-1);
                highlight_line(pq_search,_states[stype][pq_search.alg_state][0]);
                if (stype=='tree_search')
                    pq_search.alg_state="loop_successors";
                else
                    pq_search.alg_state="add_explored";
                }
            else if(pq_search.alg_state=="add_explored")
                {
                // add to explored set
                pq_search.explored_set.push(pq_search.current_node);
                highlight_line(pq_search,_states[stype][pq_search.alg_state][0]);
                pq_search.alg_state="loop_successors";
                }
            else if(pq_search.alg_state=="loop_successors")
                {
                pq_search.successor="";
                pq_search.add_next="";
                for (i=0; i < graph_conf.edges.length;i++)
                    {
                    if (graph_conf.edges[i].charAt(0)== pq_search.current_node_last_state
                        && !pq_search.explored_edges[graph_conf.edges[i]])
                        {
                        pq_search.explored_edges[graph_conf.edges[i]]=1;
                        pq_search.successor=graph_conf.edges[i].charAt(1);
                        pq_search.add_next = pq_search.current_node + "-" + pq_search.successor;
                        highlight_line(pq_search,_states[stype][pq_search.alg_state][0]);
                        if (stype == "tree_search")
                            {
                            pq_search.alg_state="add_to_fringe";
                            }
                        else pq_search.alg_state="check_explored";
                        break;
                        }
                    }
                if (!pq_search.successor)
                    {
                    highlight_line(pq_search,_states[stype][pq_search.alg_state][1]);
                    pq_search.node_stage++;
                    pq_search.alg_state="chk_empty";
                    }
                }
            else if(pq_search.alg_state=="check_explored")
                {
                highlight_line(pq_search,_states[stype][pq_search.alg_state][0]);
                pq_search.alg_state="add_to_fringe";
                }
            else if(pq_search.alg_state=="add_to_fringe")
                {
                pq_search.fringe.push(pq_search.add_next);
                highlight_line(pq_search,_states[stype][pq_search.alg_state][0]);
                pq_search.alg_state="loop_successors";
                positions = pq_search.draw_tree_node(r,pq_search.fringe[pq_search.fringe.length-1],0,
                                         pq_search.fringe[pq_search.fringe.length-1].length
                                         );
                }
            else
                {
                //shouldn't be here?
                }
            
            var fringe_display = new Array;
            for (i = 0; i < pq_search.fringe.length; i++)
                {
                fringe_display[i] = pq_search.fringe[i];
                if (pq_search.alg == 'UCS' || pq_search.alg=='A*')
                    fringe_display[i] += ', g: ' + pq_search.pathcost[pq_search.fringe[i]];
                if (pq_search.alg=='A*' || pq_search.alg=='Greedy')
                    fringe_display[i] += ', h: ' + pq_search.graph_conf.heuristic[pq_search.fringe[i].charAt(pq_search.fringe[i].length-1)];
                }
            var cnode_display = pq_search.current_node;
            if (pq_search.alg == 'UCS' || pq_search.alg=='A*')
                    cnode_display += ', g: ' + pq_search.pathcost[pq_search.current_node];
                if (pq_search.alg=='A*' || pq_search.alg=='Greedy')
                    cnode_display += ', h: ' + pq_search.graph_conf.heuristic[pq_search.current_node.charAt(pq_search.current_node.length-1)];
            $("#fringe").html(fringe_display.join("<br>"));
            if (pq_search.current_node)
                $("#current_node").html(cnode_display);
            $("#successor").html(pq_search.successor);
            $("#current_node_last_state").html(pq_search.current_node_last_state);
            if (stype=="graph_search")
                $(pqsearch_explored_set).html(pq_search.explored_set.join("<br>"));
            };
            
        if (hide_search_code)
                {
                $(pqsearch_next_btn).click(function()
                    {
                    setInterval(search_fsm, 300);
                    $(pqsearch_next_btn).attr("disabled", "disabled");
                    });
                }
        else
            {
            $(pqsearch_next_btn).click(search_fsm);
            highlight_line(pq_search,_states[stype]['alg_init'][0]);
            }
        
        }
    else
        {
        nodes.click(mk_fringe);
        labels.click(mk_fringe);
        highlight_line(pq_search,0);
        
        var pqlbl = r.text(60,230,"Priority Queue:");
        pqlbl.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
        
        var currlbl = r.text(curr_cons_x-145,curr_cons_y,"Node currently considered:");
        currlbl.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
        
        var explbl = r.text(pq_search.exp_x,pq_search.exp_y,"Nodes that have been expanded:");
        explbl.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
        pq_search.exp_x = 3;
        pq_search.exp_y += 20;
        
        var curr_highlight = r.rect(curr_cons_x-50, curr_cons_y-12, 110, 30, 10);
        curr_highlight.attr({'stroke-width': 3});
        }
        
    pq_search.nodes = nodes;
    pq_search.labels = labels;
    pq_search.pqset = r.set();
    
    $(pqsearch_hintbox).click(function() {
        if($(pqsearch_hintbox).prop('checked'))
            {
            for (i = 0; i < pq_search.pseudocode.length; i++)
                {
                if (RGBtoHEX($("#pqguide"+i).css('background-color')) == gray)
                    show_hint(i);
                }
            }
        else
            toggle_hints(pq_search.pseudocode);
    });
    
    show_hint(0);
    };
