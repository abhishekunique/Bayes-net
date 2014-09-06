
var redraw, g, renderer;

/* only do all this when document has finished loading (needed for RaphaelJS) */
window.onload = function() {

    var width = $(document).width() - 20;
    var height = $(document).height() - 60;
    
    g = new Graph();
    thisGraph=g;
    /* add a simple node */
   // g.addNode("strawberry");
    //g.addNode("cherry");

    /* add a node with a customized label */
   // g.addNode("1", { label : "Tomato" });

	
    /* add a node with a customized shape 
       (the Raphael graph drawing implementation can draw this shape, please 
       consult the RaphaelJS reference for details http://raphaeljs.com/) */
//    var render = function(r, n) {
//        var label = r.text(0, 30, n.label).attr({opacity:0});
        /* the Raphael set is obligatory, containing all you want to display */
//        var set = r.set().push(
//            r.rect(-30, -13, 62, 86).attr({"fill": "#fa8", "stroke-width": 2, r : "9px"}))
//            .push(label);
        /* make the label show only on hover */
//        set.hover(function(){ label.animate({opacity:1,"fill-opacity":1}, 500); }, function(){ label.animate({opacity:0},300); });

//        tooltip = r.set()
//            .push(
//                r.rect(0, 0, 90, 30).attr({"fill": "#fec", "stroke-width": 1, r : "9px"})
//            ).push(
//                r.text(25, 15, "overlay").attr({"fill": "#000000"})
//            );
//        for(i in set.items) {
//            set.items[i].tooltip(tooltip);
//        };
//	//            set.tooltip(r.set().push(r.rect(0, 0, 30, 30).attr({"fill": "#fec", "stroke-width": 1, r : "9px"})).hide());
//        return set;
//    };
	
    //g.addNode("id35", {
    //    label : "meat\nand\ngreed" //,
        /* filling the shape with a color makes it easier to be dragged */
        /* arguments: r = Raphael object, n : node object */
//        render : render
    //});
    //    g.addNode("Wheat", {
    /* filling the shape with a color makes it easier to be dragged */
    /* arguments: r = Raphael object, n : node object */
    //        shapes : [ {
    //                type: "rect",
    //                x: 10,
    //                y: 10,
    //                width: 25,
    //                height: 25,
    //                stroke: "#f00"
    //            }, {
    //                type: "text",
    //                x: 30,
    //                y: 40,
    //                text: "Dump"
    //            }],
    //        overlay : "<b>Hello <a href=\"http://wikipedia.org/\">World!</a></b>"
    //    });

    //st = { directed: true, label : "Label",
//            "label-style" : {
 //               "font-size": 20
  //          }
   //     };
    //g.addEdge("kiwi", "penguin", st);

    /* connect nodes with edges */
    //g.addEdge("strawberry", "cherry");
    //g.addEdge("cherry", "apple");
    //g.addEdge("cherry", "apple")
    //g.addEdge("1", "id35");
    //g.addEdge("penguin", "id35");
    //g.addEdge("penguin", "apple");
    //g.addEdge("kiwi", "id35");

    /* a directed connection, using an arrow */
    //g.addEdge("1", "cherry", { directed : true } );
    
    /* customize the colors of that edge */
    //g.addEdge("id35", "apple", { stroke : "#bfa" , fill : "#56f", label : "Meat-to-Apple" });
    
    /* add an unknown node implicitly by adding an edge */
    //g.addEdge("strawberry", "apple");

    //g.removeNode("1");

    /* layout the graph using the Spring layout implementation */
    var layouter = new Graph.Layout.Spring(g);
    thisLayouter=layouter;
    /* draw the graph using the RaphaelJS draw implementation */
    renderer = new Graph.Renderer.Raphael('canvas', g, 900, 800);
    thisRenderer=renderer;
    redraw = function() {
        thisLayouter.layout();
        thisRenderer.draw();
    };
    
    var modeClickTemp=0;
    var i=0;
    createNode=function(){
        modeClick=0;
        var temp=thisGraph.addNode("bla" +i);
        i++;
        console.log(temp);
         //var layouter = new Graph.Layout.Spring(g);
        //renderer = new Graph.Renderer.Raphael('canvas', g,    200, 400);
        //layouter.layout();

        thisRenderer.drawNode(temp);
    }
    createEdge=function(){
        modeClick=1;
    }
    showTable=function(){
        modeClick=2;
    }
    selectTool=function(){
        modeClick=0;
        flagEdge=-1;
    }
    checkDS=function(){
        modeClick=3;
    }
    observe=function(){
        modeClick=4;
    }

    queryInference=function(){
        modeClick=5;
    }
    
    showVariableElimination=function(){
        //fix the redrawing error
        buttonCount=0;
        buttonCounter=0;
        modeClickTemp=modeClick;
        finalFactors=[];
        $("#variableElimination").show();
        console.log( $("#variableElimination"));
        $("#canvas").hide();
        g1 = new Graph();
        keysTemp=(Object.keys(g.nodes));
        for(var i=0;i<keysTemp.length;i++){
            g1.addNode(keysTemp[i]);
            console.log(keysTemp[i]);   
        }
        for(var i=0;i<keysTemp.length;i++){
            for(var j=0;j<g.nodes[keysTemp[i]].edges.length;j++){
                console.log(g.nodes[keysTemp[i]].edges);
                if(g.nodes[keysTemp[i]]==g.nodes[keysTemp[i]].edges[j].source){
                    g1.addEdge(g.nodes[keysTemp[i]].id, g.nodes[keysTemp[i]].edges[j].target.id, { directed : true });
                }
            }
        }//fix bugs in self
        for(var i=0;i<keysTemp.length;i++){
            for(var j=0;j<g.nodes[keysTemp[i]].table.length;j++){
                g1.nodes[keysTemp[i]].table[j][g1.nodes[keysTemp[i]].table[j].length-1]=g.nodes[keysTemp[i]].table[j][g.nodes[keysTemp[i]].table[j].length-1];  
            }
        }
        console.log(g1);
        console.log(g);
         layouter1 = new Graph.Layout.Spring(g1);
         thisLayouter=layouter1;
         renderer1=new Graph.Renderer.Raphael('variableElimination', g1, 900, 800);
         thisRenderer=renderer1;
        modeClick=0;
        thisGraph=g1;
        showAllTables(thisGraph);
        //really fix the redrawing error and fix global variables problems, maybe store them all and make tables move with nodes remove everything from the old paper
        var keysTemp=Object.keys(thisGraph.nodes); 
        var vars=[];
        for(var i=0;i<keysTemp.length;i++){
            vars.push(thisGraph.nodes[keysTemp[i]].id);
        }  
        var hiddenVars=[];
        
        for(var i=0;i<vars.length;i++){
            
                hiddenVars.push(vars[i]);
            
        }  
         var observesKeys=Object.keys(observes);  

            for(var i=0;i<observesKeys.length;i++){
                    observes[observesKeys[i]].style.display="none";
                    flagObserving[observesKeys[i]]=true;  
            }
            var observesKeys=Object.keys(observesQueries);  

            for(var i=0;i<observesKeys.length;i++){
                    observesQueries[observesKeys[i]].style.display="none";
                    flagObservingQueries[observesKeys[i]]=true;  
            }
            for(var i=0;i<hiddenVars.length;i++){
                var rectHidden=thisRenderer.r.set().push(thisRenderer.r.rect(700,80+80*i,40,40).attr({fill:"yellow"})).push(thisRenderer.r.text(720,100+80*i,hiddenVars[i]));   
                rectHidden.click(thisGraph.nodes[hiddenVars[i]].variableJoin);
                if(!inferenceObservedQueries[hiddenVars[i]] && !inferenceObserved[hiddenVars[i]]){ 
                    buttonCount+=2;
                }else{
                    buttonCount+=1;
                }
            }   
            
            for(var i=0;i<vars.length;i++){
                var a=new Object();
                a.table=thisGraph.nodes[keysTemp[i]].table.slice();
                a.vars=[thisGraph.nodes[keysTemp[i]].id];
                a.parentNodes=[];
                for(var j=0;j<thisGraph.nodes[keysTemp[i]].parents.length;j++){
                    a.parentNodes.push(thisGraph.nodes[keysTemp[i]].parents[j].id)
                }
                finalFactors.push(selectOnEvidence(a,inferenceObserved));           
            }
            console.log(finalFactors);
        console.log(hiddenVars);
    }
//fix small ui things like what mode is called when variable elimination is hidden again
    hideVariableElimination=function(){
        //fix the redrawing error
        var tablesKeys=Object.keys(tablesVariable);  

            for(var i=0;i<tablesKeys.length;i++){
                    tablesVariable[tablesKeys[i]].style.display="none";
            }
        renderer1.r.remove();
        $("#variableElimination").hide();
        $("#canvas").show();
        modeClick=modeClickTemp;
        thisGraph=g;
        thisRenderer=renderer;
        thisLayouter=layouter;

        //fix bugs with nodes going haywire sometimes and tables not hiding do error checks on this
    }

    $("#variableElimination").hide();

    $("#dSeparationCheck").hide();
    $("#inferenceByEnumeration").hide();
    //    console.log(g.nodes["kiwi"]);
};

