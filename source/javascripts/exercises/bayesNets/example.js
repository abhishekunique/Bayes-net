
var redraw, g, renderer;

/* only do all this when document has finished loading (needed for RaphaelJS) */
window.onload = function() {

    var width = $(document).width() - 20;
    var height = $(document).height() - 60;
    
    g = new Graph();
    thisGraph=g;

    /* layout the graph using the Spring layout implementation */
    var layouter = new Graph.Layout.Spring(g);
    thisLayouter=layouter;
    /* draw the graph using the RaphaelJS draw implementation */
    renderer = new Graph.Renderer.Raphael('canvas', g, 900, 500);
    thisRenderer=renderer;
    redraw = function() {
       
        thisLayouter.layout();
        thisRenderer.draw();
        var tablesKeys=Object.keys(tables);  

            for(var j=0;j<tablesKeys.length;j++){
                    tables[tablesKeys[j]].style.display="none";
            }
    };
    
    var modeClickTemp=0;
    var counterNode=65;
    createNode=function(){
        var tablesKeys=Object.keys(tables);  
        console.log(tablesKeys);
        for(var j=0;j<tablesKeys.length;j++){
            tables[tablesKeys[j]].style.display="none";
            flagTable[tablesKeys[j]]=true;  
        }
        console.log(nodesUsed);
        counterNode=65;
        counterafterZ=0;
        while(nodesUsed[String.fromCharCode(counterNode)]==1){
            counterNode++;
        }
        nodeName=String.fromCharCode(counterNode);
        if(counterNode>90){
            console.log("toy");
            while(nodesUsed["node"+counterafterZ]==1){
                counterafterZ++;
            }
            nodeName="node"+counterafterZ;
        }
        var nodeName=prompt("enter name of variable in node", nodeName);
        var flagger=0;
        if(nodeName && nodesUsed[nodeName]==1){
            flagger=1;
        }       
        nodesUsed[nodeName]=1;
        modeClick=0;
        if(nodeName && flagger==0){
            var temp=thisGraph.addNode(nodeName);
            counterNode++;
            console.log(temp);
            thisRenderer.drawNode(temp);
            return temp;
        }
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
        hideAllInstructions();
        $("#queriesInstruc").show();
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
        inferenceEnumerationButton.hide(); 
            variableEliminationButton.hide();
            variableEliminationVerboseButton.hide();
            samplingButton.hide();
        buttonCount=0;
        buttonCounter=0;
        modeClickTemp=modeClick;
        finalFactors=[];
        $("#variableElimination").show();
        $("#variableEliminationButtons").show();
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
         renderer1=new Graph.Renderer.Raphael('variableElimination', g1, 900, 500);
         renderer1.containingRect.attr({stroke:"white"});
         thisRenderer=renderer1;
         thisRenderer.trashCan.hide();
        modeClick=-1;
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
            /*var observesKeys=Object.keys(observesQueries);  

            for(var i=0;i<observesKeys.length;i++){
                    observesQueries[observesKeys[i]].style.display="none";
                    flagObservingQueries[observesKeys[i]]=true;  
            }*/
            console.log("SHOWING VARIABLE ELIMINATION");    
            for(var i=0;i<hiddenVars.length;i++){
                console.log("DRAWING SHIT");
                var rectHidden=paper.set().push(paper.rect(700,80+80*i,40,40).attr({fill:"yellow"})).push(paper.text(720,100+80*i,hiddenVars[i]));   
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
        hideAllButtons();
        hideAllInstructions();
        $("#variableEliminationInstructions").show();
        $("#loadNet").hide();
        $("#saveNet").hide();
    }
    //fix the big divs being added one after the other problem
//fix small ui things like what mode is called when variable elimination is hidden again
    hideVariableElimination=function(){
        //fix the redrawing error
        paper.clear();
        paper.text(720,60,"JOIN");
        paper.text(780,60,"SUM OUT");
        var tablesKeys=Object.keys(tablesVariable);  

            for(var i=0;i<tablesKeys.length;i++){
                    tablesVariable[tablesKeys[i]].style.display="none";
            }
        renderer1.r.remove();
        $("#variableElimination").hide();
        $("#variableEliminationButtons").hide();
        $("#canvas").show();
        thisGraph=g;
        thisRenderer=renderer;
        thisLayouter=layouter;
        showAllButtons();
        hideAllInstructions();
        $("#solvingInstructions").show();
        modeClick=4;
        inferenceEnumerationButton.show(); 
            variableEliminationButton.show();
            variableEliminationVerboseButton.show();
            samplingButton.show();
            $("#loadNet").show();
        $("#saveNet").show();
        //fix bugs with nodes going haywire sometimes and tables not hiding do error checks on this
    }

    $("#variableElimination").hide();
    $("#variableEliminationButtons").hide();
    paper=new Raphael(document.getElementById('variableEliminationButtons'),900,500);
    paper.text(720,60,"JOIN");
    paper.text(780,60,"SUM OUT");
    
};

