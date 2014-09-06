var canvas_width=500;
var canvas_height=200;
var node_radius=20;
var arrow_size=8;

            
window.onload = function () 
    {
    var r = Raphael("holder", canvas_width, canvas_height);
    var transp = r.rect(0, 0, canvas_width, canvas_height);
    transp.attr({fill: "white", stroke: "none"});
    $('div#holder').find('> svg,div').css({'border': '1px solid black'});
    $('#node').button();
    $('#edge').button()
    var nodes = r.set();
    
    $('#node').click(
    function(e)
        {
        var posx = e.pageX - $(document).scrollLeft() - $('#holder').offset().left;
        var posy = e.pageY - $(document).scrollTop() - $('#holder').offset().top;
        var new_node =nodes.push(r.circle(posx,posy,node_radius));
        new_node.attr({"stroke-width": 3});
        
        var move_node = function(e)
                {
                var posx = e.pageX - $(document).scrollLeft() - $('#holder').offset().left;
                var posy = e.pageY - $(document).scrollTop() - $('#holder').offset().top;
                nodes[nodes.length-1].attr({'cx': posx, 'cy': posy});
                };
        transp.mousemove(move_node);
        transp.click(function(){transp.unmousemove(move_node);});
        }
    );
    
    $('#edge').click(
    function (e)
        {
        nodes.attr({'fill': 'white'});
        var new_edge = new Array;
        var end_path = function(e)
            {
            this.attr({'fill': 'orange'});
            new_edge.push(this);
            draw_edge(r,new_edge[0],new_edge[1]);
            /*var from_coord = new_edge[0].attr('cx') + ' ' + new_edge[0].attr('cy');
            var to_coord = new_edge[1].attr('cx') + ' ' + new_edge[1].attr('cy');
            var connect = r.path('M'+from_coord+'L'+to_coord);
            connect.attr({'stroke': 'none'});
            var arrow_from = connect.getPointAtLength(node_radius);
            var arrow_to = connect.getPointAtLength(connect.getTotalLength()-node_radius-3);
            r.arrow(arrow_from.x, arrow_from.y, arrow_to.x,arrow_to.y,arrow_size);*/
            
            nodes.unclick(end_path);
            nodes.attr({'fill': 'white'});
            }
        var start_path = function(e)
            {
            this.attr({'fill': 'blue'});
            new_edge.push(this);
            nodes.unclick(start_path);
            nodes.click(end_path);
            }
        nodes.click(start_path);
        }
    
    );
    
    }