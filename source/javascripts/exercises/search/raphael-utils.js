Raphael.el.unbindAll = function(){
            while(this.events.length){          
                var e = this.events.pop();
                e.unbind();
            }
        }
        
        
Raphael.fn.arrow = function (x1, y1, x2, y2, size) {
		    var angle = Math.atan2(x1-x2,y2-y1);
		    angle = (angle / (2 * Math.PI)) * 360;
		    var arrowPath = this.path("M" + x2 + " " + y2 + " L" + (x2  - size) + " " + (y2  - size) + " L" + (x2  - size)  + " " + (y2  + size) + " L" + x2 + " " + y2 ).attr("fill","black").rotate((90+angle),x2,y2);
		    var linePath = this.path("M" + x1 + " " + y1 + " L" + x2 + " " + y2);
		    return [linePath,arrowPath];
        
	    };

Raphael.fn.smarrow = function (x1, y1, x2, y2, size)
    {
    var color="#000"
    angle = Math.atan2(x1-x2,y2-y1)
    angle = (angle / (2 * Math.PI)) * 360
    pct = .90
    startX = (x1 * (1 - pct) + x2 * pct)
    startY = (y1 * (1 - pct) + y2 * pct)
    linePath = this.path("M" + x1 + " " + y1 + " L" + x2 + " " + y2)
    arrowPath = this.path("M" + startX + " " + startY + " L" + (startX - size) + " " + (startY - size) + " L" + (startX - size) + " " + (startY + size) + " L" + startX + " " + startY ).attr("fill",color).rotate((90+angle),startX,startY)
    return [linePath,arrowPath]
    }
        
Raphael.el.addCursor = function () {
            var a, b = this;
            return this.rotation != null && this.rotate(-this.rotation), this.cursor = this.paper.text(0, 0, "|"), this.updateCursor(), this.rotation != null && (this.rotate(this.rotation), this.cursor.rotate(this.rotation, this.attrs.x, this.attrs.y)), this.cursor.attr({
                "font-size": 24,
                "font-family": "Trebuchet MS"
            }), this.cursor.visible = !0, a = function () {
                var a;
                return b.cursor.visible = !b.cursor.visible, a = b.cursor.visible ? "|" : "", b.cursor.attr({
                    text: a
                }), b.updateCursor()
            }, this.cursor.blinker = setInterval(function () {
                return a()
            }, 500)
        };

Raphael.el.updateCursor = function () {
            var a;
            if (this.cursor == null) return;
            return this.attr("text") === "" ? a = 0 : a = this.getBBox(!0).width / 2, this.cursor.attr({
                x: this.attrs.x + a + 2,
                y: this.attrs.y - 2
            })
        };

Raphael.el.removeCursor = function () {
            if (this.cursor == null) return;
            return clearInterval(this.cursor.blinker), $(this.cursor.node).remove(), delete this.cursor
        };

var draw_tree_node = function(r,node,root,depth)
    {
    var pos_x, pos_y,nodes,parent;
    parent="";
    if (this.stree_last_node && node==this.stree_last_node.attr('text'))
        return -1;
    
    if (root)
        {
        pos_x = this.stree_x;
        pos_y = this.stree_y;
        this.stree_node_placement[node] = [50,pos_y+100];
        this.hint_coord = [pos_x+220,pos_y];
        this.hint_obj = r.text(pos_x+220,pos_y,"");
        this.hint_obj.attr({'stroke': 'red','stroke-width': 0.5});
        }
    else
        {
        if (node.length>1)
            parent=node.substring(0,node.length-2);
            
        pos_x = this.stree_node_placement[parent][0];
        if (!this.positions[depth])
            this.positions[depth] = 50;
        if (this.positions[depth] > pos_x)
            {
            pos_x = this.positions[depth];
            }
        
        this.positions[depth] += node_width+10;
        pos_y = this.stree_node_placement[parent][1];
        this.stree_node_placement[parent] = [pos_x+node_width+10,pos_y];
        this.stree_node_placement[node] = [pos_x,pos_y+2*node_height];
        if (pos_y+2*node_height > this.stree_y)
            this.stree_y = pos_y+2*node_height;
        r.smarrow(this.stree_obj[parent].attrs.x+node_width/2,this.stree_obj[parent].attrs.y+node_height,pos_x+node_width/2,pos_y-3,arrow_size-3);
        }
    var newholder = r.rect(pos_x, pos_y, node_width, node_height, 10);
    newholder.attr({'fill': white, 'stroke-width': 3});
    var newtxt = r.text(pos_x+50,pos_y+22);  
    newtxt.attr({text: node, font: "14px Fontin-Sans, Arial", cursor: 'default'});
    newholder.pair = newtxt;
    newtxt.pair = newholder;
    this.stree_obj[node] = newholder;
    this.stree_last_node = newtxt;
    if (this.stree_nodes)
        {
        this.stree_nodes.push(newholder);
        this.stree_labels.push(newtxt);
        }
    
    if (this.alg == 'Greedy')
        {
        var h_txt = r.text(pos_x+node_width-15,pos_y+10,"h: " + this.graph_conf.heuristic[node.charAt(node.length-1)]);
        }
    if (this.alg == 'UCS')
        {
        var g_txt = r.text(pos_x+node_width-15,pos_y+10,"g: " + this.pathcost[node]);
        }
    if (this.alg == 'A*')
        {
        var g_txt = r.text(pos_x+node_width-15,pos_y+10,"g: " + this.pathcost[node]);
        var h_txt = r.text(pos_x+node_width-15,pos_y+23,"h: " + this.graph_conf.heuristic[node.charAt(node.length-1)]);
        var f_val = parseInt(this.pathcost[node])+parseInt(this.graph_conf.heuristic[node.charAt(node.length-1)]);
        var f_txt = r.text(pos_x+node_width-15,pos_y+36,"f: " + f_val);
        }
    }



var draw_search_graph = function (r,nodes,labels)
    {
    var node_label = new Array;
    
    for (i=0; i<this.graph_conf.nodes.length; i++)
        {
        node_label[i] = this.graph_conf.nodes[i];
        if (this.alg=='Greedy' || this.alg == 'A*')
            node_label[i] += ": "+this.graph_conf.heuristic[this.graph_conf.nodes[i]];
        }
        
    // Starting node always in the left middle
    nodes.push(r.circle(3+this.node_radius,this.graph_height/2,this.node_radius));
    labels.push(r.text(nodes[0].attr('cx'),nodes[0].attr('cy'),node_label[0]));
    this.hnodes[this.graph_conf.nodes[0]] = nodes[0];
    
    var num_interm_nodes = this.graph_conf.nodes.length - 2;
    var interm_nodes_startx = 3+2*this.node_radius;
    var interm_nodes_endx = this.graph_width-2*this.node_radius-3;
    var space_avail = interm_nodes_endx-interm_nodes_startx;
    var num_bottom_nodes = parseInt(num_interm_nodes/2);
    var num_top_nodes = num_interm_nodes-num_bottom_nodes;
    var space_between_bottom = (space_avail+num_bottom_nodes*this.node_radius)/(num_bottom_nodes+1);
    var space_between_top = space_avail/(num_top_nodes+1);
    
    var curr_x = interm_nodes_startx+space_between_bottom;
    var curr_y = this.graph_height-this.node_radius-3;
    var pos = 0; // 0 - bottom, 1 - top
    
    
    for (i = 1; i <num_interm_nodes+1; i++)
        {
        if (pos)
            curr_y = this.node_radius+3;
        else
            {
            curr_y = this.graph_height-this.node_radius-3;
            if (i == 3 && num_bottom_nodes > 2)
                curr_y -= 2*this.node_radius+3;
            }
          
        nodes.push(r.circle(curr_x,curr_y,this.node_radius));
        labels.push(r.text(nodes[i].attr('cx'),nodes[i].attr('cy'),node_label[i]));
        this.hnodes[this.graph_conf.nodes[i]] = nodes[nodes.length-1];
        pos = pos == 1 ? 0 : 1;
        if (!pos)
            curr_x += space_between_bottom;
        }
    
    // Goal node in the right middle
    nodes.push(r.circle(this.graph_width-this.node_radius-3,this.graph_height/2,this.node_radius));
    labels.push(r.text(nodes[nodes.length-1].attr('cx'),nodes[nodes.length-1].attr('cy'),node_label[nodes.length-1]));
    this.hnodes[this.graph_conf.nodes[nodes.length-1]] = nodes[nodes.length-1];
    
    //nodes.attr({fill: "#000", stroke: "#fff", "stroke-dasharray": "- ", opacity: .2});
    nodes.attr({"fill": white, "stroke-width": 3});
    labels.attr({font: "14px Fontin-Sans, Arial", cursor: "default"});
    
    // Draw the edges

    for (i=0;i<this.graph_conf.edges.length;i++)
        {
        var s_node = this.graph_conf.edges[i].charAt(0);
        var e_node = this.graph_conf.edges[i].charAt(1);
        var new_edge = draw_edge(r,this.hnodes[s_node],this.hnodes[e_node]);
        if (this.alg=="UCS" || this.alg=='A*')
            {
            var cost_pt = new_edge[0].getPointAtLength(new_edge[0].getTotalLength()/3);
            var cost_box = r.rect(cost_pt.x,cost_pt.y,20,10);
            cost_box.attr({'fill': 'white'});
            var cost_text = r.text(cost_pt.x+10, cost_pt.y+5,this.graph_conf.costs[i]);
            cost_text.attr({'font-weight': 'bold'});
            }
        this.hedges[this.graph_conf.edges[i]]=new_edge;
        }
    
    }
    
function draw_edge(r,from_node,to_node)
    {
    var arrow_size=8;
    var from_coord = from_node.attr('cx') + ' ' + from_node.attr('cy');
    var to_coord = to_node.attr('cx') + ' ' + to_node.attr('cy');
    var connect = r.path('M'+from_coord+'L'+to_coord);
    connect.attr({'stroke': 'none'});
    var arrow_from = connect.getPointAtLength(from_node.attr('r'));
    var arrow_to = connect.getPointAtLength(connect.getTotalLength()-to_node.attr('r')-3);
    return r.arrow(arrow_from.x, arrow_from.y, arrow_to.x,arrow_to.y,arrow_size);
    }

function clear_canvas(paper)
    {
    var bot = paper.bottom, res = [];
    //Store or grab your objects
    while (bot) {
        res.push(bot);
        bot = bot.next;
        
    }
    //Hide all objects
    for(var i=0; i<res.length;i++)
    {
        res[i].remove();
    }
    }