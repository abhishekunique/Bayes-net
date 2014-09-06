/*
 *  Dracula Graph Layout and Drawing Framework 0.0.3alpha
 *  (c) 2010 Philipp Strathausen <strathausen@gmail.com>, http://strathausen.eu
 *  Contributions by Jake Stothard <stothardj@gmail.com>.
 *
 *  based on the Graph JavaScript framework, version 0.0.1
 *  (c) 2006 Aslak Hellesoy <aslak.hellesoy@gmail.com>
 *  (c) 2006 Dave Hoover <dave.hoover@gmail.com>
 *
 *  Ported from Graph::Layouter::Spring in
 *    http://search.cpan.org/~pasky/Graph-Layderer-0.02/
 *  The algorithm is based on a spring-style layouter of a Java-based social
 *  network tracker PieSpy written by Paul Mutton <paul@jibble.org>.
 *
 *  This code is freely distributable under the MIT license. Commercial use is
 *  hereby granted without any cost or restriction.
 *
 *  Links:
 *
 *  Graph Dracula JavaScript Framework:
 *      http://graphdracula.net
 *
 /*--------------------------------------------------------------------------*/

/*
 * Edge Factory
 */
 var startEdgex, startEdgey;
 var edgePath;
 var edgeStart;
 olddx=0;
 olddy=0;
 var positionsx={}, positionsy={};
var DSeparationText="";
var tableFill={};
var flagObservedNode=false;
var inferenceObserved={};
var inferenceObservedQueries={};
var finalFactors=[];
var flagObserving={};
var flagObservingQueries={};

 var flagEdge=-1;
 var flagTable={};
 var node1,node2,dSepSource,dSepTarget,flagSeparation=0,observedNodes=[];
 var nodeSelected;
 var elementOfNode=-1;
 tables={};
 tablesVariable={};
 observes={};
  observesQueries={};

 var currentNode;
 var paths=[];
var AbstractEdge = function() {
}
AbstractEdge.prototype = {
    hide: function() {
        this.connection.fg.hide();
        this.connection.bg && this.bg.connection.hide();
    }
};
var EdgeFactory = function() {  
    this.template = new AbstractEdge();
    this.template.style = new Object();
    this.template.style.directed = false;
    this.template.weight = 1;
};
EdgeFactory.prototype = {
    build: function(source, target) {
        var e = jQuery.extend(true, {}, this.template);
        e.source = source;
        e.target = target;
        return e;
    }
};

/*
 * Graph
 */
var Graph = function() {
    this.nodes = {};
    this.edges = [];
    this.snapshots = []; // previous graph states TODO to be implemented
    this.edgeFactory = new EdgeFactory();
};
Graph.prototype = {
    /* 
     * add a node
     * @id          the node's ID (string or number)
     * @content     (optional, dictionary) can contain any information that is
     *              being interpreted by the layout algorithm or the graph
     *              representation
     */
    addNode: function(id, content) {
        /* testing if node is already existing in the graph */
        if(this.nodes[id] == undefined) {
            this.nodes[id] = new Graph.Node(id, content);
        }
        return this.nodes[id];
    },

    addEdge: function(source, target, style) {
        var s = this.addNode(source);
        var t = this.addNode(target);
        var edge = this.edgeFactory.build(s, t);
        jQuery.extend(edge.style,style);
        s.edges.push(edge);
        this.edges.push(edge);
        // NOTE: Even directed edges are added to both nodes.
        t.edges.push(edge);
        t.tableUpdate();    
        console.log(edge);
    },
    
    /* TODO to be implemented
     * Preserve a copy of the graph state (nodes, positions, ...)
     * @comment     a comment describing the state
     */
    snapShot: function(comment) {
        /* FIXME
        var graph = new Graph();
        graph.nodes = jQuery.extend(true, {}, this.nodes);
        graph.edges = jQuery.extend(true, {}, this.edges);
        this.snapshots.push({comment: comment, graph: graph});
        */
    },
    removeNode: function(id) {
        delete this.nodes[id];
        for(var i = 0; i < this.edges.length; i++) {
            if (this.edges[i].source.id == id || this.edges[i].target.id == id) {
                this.edges.splice(i, 1);
                i--;
            }
        }
    }
};

/*
 * Node
 */
Graph.Node = function(id, node){
    node = node || {};
    node.id = id;
    node.edges = [];
    node.table=new Array();
    node.domain=["+"+id.toLowerCase(),"-"+id.toLowerCase()];
    node.table[0]=[id, "P"];
    node.table[1]=["+"+id.toLowerCase(),0.5];
    node.table[2]=["-"+id.toLowerCase(),0.5];
    node.parents=[];
    node.sources=[node];
    node.observed =false;
    node.targeted=false;
    node.tableUpdate=function(){
        var t1;
        var totalRows=node.domain.length;
        var countersMods=[], sources=[],parents=[];
        for(var i=0;i<node.edges.length;i++){
            if(node==node.edges[i].target){
                totalRows*=node.edges[i].source.domain.length;
                countersMods.push(node.edges[i].source.domain.length);
                sources.push(node.edges[i].source);
                parents.push(node.edges[i].source);
            }   
        }
        countersMods.push(node.domain.length);
        sources.push(node);
        var counters=new Array(countersMods.length);
        for(var i=0;i<counters.length;i++){
            counters[i]=1;
            for(var j=i+1;j<countersMods.length;j++){
                counters[i]*=countersMods[j];
            }
        }
        node.table=new Array();
        for(var i=0;i<totalRows+1;i++){
            node.table[i]=new Array();
        }
        for(var i=0;i<counters.length;i++){
            node.table[0][i]=sources[i].id;
            var flag=0,tempCounter=0;
            for(var j=0;j<totalRows;j++){
                  node.table[j+1][i]=sources[i].domain[flag];
                  tempCounter++;
                  if((tempCounter%counters[i])==0){
                    flag=(flag+1)%countersMods[i];
                  }
            }

        }
        node.table[0].push("P");
        for(var i=0;i<totalRows;i++){
            node.table[i+1].push((Math.floor(1/(node.domain.length)*100)/100));
        }
        node.parents=parents.slice();
        node.sources=sources.slice();
        
    }

    node.children=function(traversedPath,directedTrue){
        var sourceTemp=[];
        for(var i=0;i<this.edges.length;i++){
            if(this==this.edges[i].source){
                if(traversedPath.indexOf(this.edges[i].target)==-1){
                    sourceTemp.push(this.edges[i].target);
                }
            }else{
                if(!directedTrue){
                    if(traversedPath.indexOf(this.edges[i].source)==-1){
                        sourceTemp.push(this.edges[i].source);
                    }
                }
            }
        }
        return sourceTemp;
    }

    node.observeUpdateQueries=function(){
        
        if($(this).val()=="-"){
            delete inferenceObservedQueries[node.id];
            node.shape[0].attr({stroke:"black", 'stroke-width':2});
            $(this).hide();
        }else{
            inferenceObservedQueries[node.id]=$(this).val();
            node.shape[0].attr({stroke:"blue", 'stroke-width':5});
        }
        var keysTemp=Object.keys(inferenceObservedQueries); 
        if(keysTemp.length!=0){
            $("#currentP").show();
            inferenceEnumerationButton.show(); 
            variableEliminationButton.show();
            variableEliminationVerboseButton.show();
            samplingButton.show();
            inferenceEnumerationButton.click(inferenceByEnumeration);
            samplingButton.click(callSampling);

            variableEliminationButton.click(finalVariableEliminationQuery);
            variableEliminationVerboseButton.click(showVariableElimination);
            $("#probInstructions").show();
        }else{
            inferenceEnumerationButton.hide(); 
            variableEliminationButton.hide();
            variableEliminationVerboseButton.hide();
            samplingButton.hide();
        }
        updateInferenceQuery();
    }

    node.observeUpdate=function(){
        if($(this).val()=="-"){
            delete inferenceObserved[node.id];
            node.shape[0].attr({fill:"white", 'stroke-width':2});
            $(this).hide();
        }else{
            inferenceObserved[node.id]=$(this).val();
            node.shape[0].attr({fill:"#99CCCC", 'stroke-width':5});
        }
        updateInferenceQuery();
    }

    node.valueUpdate=function(){
        var temp1=$(this).children().children();
        for(var i=1;i<temp1.length;i++){
            var thisRow=temp1[i];
            var tds=$($($(thisRow).children()[$(thisRow).children().length-1]).children()[0]).val();
            if(node.table[i][node.table[i].length-1]!=tds){
                node.table[i][node.table[i].length-1]=parseFloat(tds);
                if(!tableFill[node.id]){
                    if(node.table[i][node.table[i].length-2][0]=="-"){
                        node.table[i-1][node.table[i-1].length-1]=1-tds;
                        $($($(temp1[i-1]).children()[$(thisRow).children().length-1]).children()[0]).val((1-tds).toString());
                    }else{
                        // fix the resetting of the values with new things
                        node.table[i+1][node.table[i+1].length-1]=1-tds;
                        $($($(temp1[i+1]).children()[$(thisRow).children().length-1]).children()[0]).val((1-tds).toString());
                    }
                }
            }
        }
    }

    node.extendNode = function(e) {
        //fix the fact that only A is appended
        var newValue=node.domain[0];;
        while(node.domain.indexOf(newValue)!=-1){
            newValue=prompt("enter new value in domain");
        }
        if(newValue){
            node.domain=node.domain.concat([newValue]);
            node.tableUpdate();
            for(var i=0;i<node.edges.length;i++){
                if(node==node.edges[i].source){
                    node.edges[i].target.tableUpdate();
                }   
            }
                var tablesKeys=Object.keys(tables);  

                for(var i=0;i<tablesKeys.length;i++){
                        tables[tablesKeys[i]].style.display="none";
                        flagTable[tablesKeys[i]]=true;  
                }

                    
                            tables[node.id].style.display="none";
                            

                   var tempNode=node;
                    tableFill[tempNode.id]=true;
                   createTable(node, node.domain[node.domain.length-1], node.id);
                   for(var i=0;i<node.edges.length;i++){
                        if(node==node.edges[i].source){
                            createTable(node.edges[i].target,node.domain[node.domain.length-1],node.id);
                        }   
                    }
                            
        }
        
    };

    node.spliceNode = function(e) {
         //fix the fact that only A is appended
        var newValue=node.domain[0];;
       
            newValue=prompt("enter value to be deleted");
        
        if(newValue){
            console.log(node.domain);
            var flag=true;
            if(node.domain.indexOf(newValue)==-1){
                flag=false;
            } 
            if(flag){


                node.domain.splice(node.domain.indexOf(newValue),1);
                node.tableUpdate();

                for(var i=0;i<node.edges.length;i++){
                    if(node==node.edges[i].source){
                        node.edges[i].target.tableUpdate();
                    }   
                }
                    var tablesKeys=Object.keys(tables);  

                    for(var i=0;i<tablesKeys.length;i++){
                            tables[tablesKeys[i]].style.display="none";
                            flagTable[tablesKeys[i]]=true;  
                    }

                        
                                tables[node.id].style.display="none";
                                

                       var tempNode=node;
                        tableFill[tempNode.id]=true;
                       createTable(node, node.domain[node.domain.length-1], node.id);
                       for(var i=0;i<node.edges.length;i++){
                            if(node==node.edges[i].source){
                                createTable(node.edges[i].target,node.domain[node.domain.length-1],node.id);
                            }   
                        }
                        console.log(node.table);
            }
                            
        }

        
    };


    node.hide = function() {
        this.hidden = true;
        this.shape && this.shape.hide(); /* FIXME this is representation specific code and should be elsewhere */
        for(i in this.edges)
            (this.edges[i].source.id == id || this.edges[i].target == id) && this.edges[i].hide && this.edges[i].hide();
    };
    node.show = function() {
        this.hidden = false;
        this.shape && this.shape.show();
        for(i in this.edges)
            (this.edges[i].source.id == id || this.edges[i].target == id) && this.edges[i].show && this.edges[i].show();
    };

    node.variableJoin=function(){
        console.log("reached variable join"+ node.id);  
        console.log("checking");

        
            var consideredVar=node.id;
            var toJoin=[];
            var first_factor;
            var toSplice=[];
            console.log(finalFactors.slice());
            for(var j=0;j<finalFactors.length;j++){

                if(finalFactors[j].parentNodes.indexOf(consideredVar)!=-1){
                    toJoin.push(finalFactors[j]);
                    toSplice.push(finalFactors[j]);
                }
                if(finalFactors[j].vars.indexOf(consideredVar)!=-1){
                    first_factor=finalFactors[j];
                    toSplice.push(finalFactors[j]);

                }
                
            }
            toJoin=[first_factor].concat(toJoin);
            console.log(toJoin);
            var multiplier=first_factor;
            console.log(toJoin.slice());
            for(var j=1;j<toJoin.length;j++){
                console.log("inside");
                multiplier=jointCompute(toJoin[j],multiplier,consideredVar);
            }   
                console.log(multiplier);
                var tempFinalFactors=[];
                for(var j=0;j<finalFactors.length;j++){
                    if(toSplice.indexOf(finalFactors[j])==-1){
                        tempFinalFactors.push(finalFactors[j]);
                    }
                }
                finalFactors=tempFinalFactors.slice();
                finalFactors.push(multiplier);
                console.log(finalFactors);  
                if(!inferenceObservedQueries[node.id] && !inferenceObserved[node.id]){    
                    var tempSummer=paper.set().push(paper.rect(760,this.attr("y"),40,40).attr({fill:"yellow"})).push(paper.text(780,this.attr("y")+20,node.id));
                    tempSummer.click(node.variableSum);
                }
                //error in finalFactorsdict
                console.log(this);
                buttonCounter++;
                if(buttonCounter==buttonCount){
                                console.log("FINISHED");

                    var normalizer=paper.set().push(paper.rect(700,20,100,40).attr({fill:"yellow"})).push(paper.text(750,40,"Normalize"));
                    normalizer.click(normalize);
                }
                paper.rect(700,this.attr("y"), 41, 41).attr({fill:"white",stroke:"white"});
                //fixing graph combinations


                
                thisRenderer.r.clear();
                thisRenderer.r.remove();
                var tablesKeys=Object.keys(tablesVariable);  

                for(var i=0;i<tablesKeys.length;i++){
                        tablesVariable[tablesKeys[i]].style.display="none";  
                }
                tablesVariable={};
                //make separate div for the buttons
                g1 = new Graph();
                //keysTemp=(Object.keys(thisGraph.nodes));
                for(var i=0;i<finalFactors.length;i++){
                    var tempId=finalFactors[i].vars[0];
                    for(var j=1;j<finalFactors[i].vars.length;j++){
                        tempId=tempId+" , "+finalFactors[i].vars[j];
                    }
                    g1.addNode(tempId);
                    console.log(tempId);   
                }
                var fKeys=Object.keys(g1.nodes);  
                
                for(var i=0;i<fKeys.length;i++){
                    var thisNode=fKeys[i];
                    for(var j=0;j<finalFactors[i].parentNodes.length;j++){
                        console.log(finalFactors[i].parentNodes[j]);
                        for(var k=0;k<fKeys.length;k++){
                            if(fKeys[k].indexOf(finalFactors[i].parentNodes[j])!=-1){
                                g1.addEdge(fKeys[k], fKeys[i], { directed : true });
                            }
                        }
                    }
                }
                //manual override of the attribute
                //fix redrawing error
                console.log(fKeys);
                
                for(var i=0;i<finalFactors.length;i++){
                    var tempId=finalFactors[i].vars[0];
                    for(var j=1;j<finalFactors[i].vars.length;j++){
                        tempId=tempId+" , "+finalFactors[i].vars[j];
                    }
                    g1.nodes[tempId].table=[];
                    for(var j=0;j<finalFactors[i].table.length;j++){
                        g1.nodes[tempId].table[j]=finalFactors[i].table[j].slice();
                    }
                    console.log(g1.nodes[tempId]);
                }
                
                layouter1 = new Graph.Layout.Spring(g1);
                 thisLayouter=layouter1;
                renderer1=new Graph.Renderer.Raphael('variableElimination', g1, 900, 600);
                renderer1.containingRect.attr({stroke:"white"});
                thisRenderer=renderer1;
                thisRenderer.trashCan.hide();
                showAllTables(g1);
                thisGraph=g1;
                

                //fixing graph combinations






    }
    node.variableSum=function(){
        var tempSplicer,tempSplicerPos;
        for(var i=0;i<finalFactors.length;i++){
            if(finalFactors[i].vars.indexOf(node.id)!=-1){
                tempSplicer=finalFactors[i];
                tempSplicerPos=i;
                break;
            }
        }
        finalFactors.splice(tempSplicerPos,1);
        tempSplicer= jointSum(tempSplicer,node.id);

        if(tempSplicer.vars.length>0){
            finalFactors.push(tempSplicer);
        }
        console.log(tempSplicer);
        console.log(finalFactors);
        buttonCounter++;
        paper.rect(760,this.attr("y"), 41, 41).attr({fill:"white",stroke:"white"});
        if(buttonCounter==buttonCount){
            console.log("FINISHED");
            var normalizer=paper.set().push(paper.rect(700,20,100,40).attr({fill:"yellow"})).push(paper.text(750,40,"Normalize"));
            thisRenderer.trashCan.hide();
                    normalizer.click(normalize);
        }

                
                thisRenderer.r.clear();
                thisRenderer.r.remove();
                var tablesKeys=Object.keys(tablesVariable);  

                for(var i=0;i<tablesKeys.length;i++){
                        tablesVariable[tablesKeys[i]].style.display="none";  
                }
                tablesVariable={};
                //make separate div for the buttons
                g1 = new Graph();
                //keysTemp=(Object.keys(thisGraph.nodes));
                for(var i=0;i<finalFactors.length;i++){
                    var tempId=finalFactors[i].vars[0];
                    for(var j=1;j<finalFactors[i].vars.length;j++){
                        tempId=tempId+" , "+finalFactors[i].vars[j];
                    }
                    g1.addNode(tempId);
                    console.log(tempId);   
                }
                var fKeys=Object.keys(g1.nodes);  
                
                for(var i=0;i<fKeys.length;i++){
                    var thisNode=fKeys[i];
                    for(var j=0;j<finalFactors[i].parentNodes.length;j++){
                        console.log(finalFactors[i].parentNodes[j]);
                        for(var k=0;k<fKeys.length;k++){
                            if(fKeys[k].indexOf(finalFactors[i].parentNodes[j])!=-1){
                                g1.addEdge(fKeys[k], fKeys[i], { directed : true });
                            }
                        }
                    }
                }
                //manual override of the attribute
                //fix redrawing error
                console.log(fKeys);
                
                for(var i=0;i<finalFactors.length;i++){
                    var tempId=finalFactors[i].vars[0];
                    for(var j=1;j<finalFactors[i].vars.length;j++){
                        tempId=tempId+" , "+finalFactors[i].vars[j];
                    }
                    g1.nodes[tempId].table=[];
                    for(var j=0;j<finalFactors[i].table.length;j++){
                        g1.nodes[tempId].table[j]=finalFactors[i].table[j].slice();
                    }
                    console.log(g1.nodes[tempId]);
                }
                
                layouter1 = new Graph.Layout.Spring(g1);
                 thisLayouter=layouter1;
                renderer1=new Graph.Renderer.Raphael('variableElimination', g1, 900, 600);
                renderer1.containingRect.attr({stroke:"white"});
                
                thisRenderer=renderer1;
                thisRenderer.trashCan.hide();
                showAllTables(g1);  


    }
    return node;
};
function hideAllButtons(){
    
    $("#create").hide();
    $("#solve").hide();
    $("#radios").hide();


}

function showAllButtons(){
   
    $("#create").hide();
    $("#solve").show();
    $("#radios").show(); 

}

function normalize(){
                        var keysTempe=Object.keys(inferenceObserved); 
                        var keysTempx=Object.keys(inferenceObservedQueries);
                        var selectedValue;
                        var sumProbs=0;
                        for(var i=1;i<finalFactors[0].table.length;i++){
                            sumProbs+=finalFactors[0].table[i][finalFactors[0].table[i].length-1];
                            var flag=true;
                            
                            for(var j=0;j<keysTempe.length;j++){
                                if(inferenceObserved[keysTempe[j]]!=finalFactors[0].table[i][finalFactors[0].table[0].indexOf(keysTempe[j])]){
                                    flag=false;
                                    break;
                                }
                            }
                            for(var j=0;j<keysTempx.length;j++){
                                if(inferenceObservedQueries[keysTempx[j]]!=finalFactors[0].table[i][finalFactors[0].table[0].indexOf(keysTempx[j])]){
                                    flag=false;
                                    break;
                                }
                            }
                            if(flag){
                                selectedValue=finalFactors[0].table[i][finalFactors[0].table[i].length-1];
                            }

                        }
                        
                        alert(selectedValue/sumProbs);
                        hideVariableElimination();
}


function updateDSeparationQuery(){
    var tempText="Are ";
    if(dSepSource){
        tempText+=dSepSource.id;
    }else{
        tempText+=" .... "
    }
    tempText+=" and "; 
    if(dSepTarget){
        tempText+=dSepTarget.id;

        tempText+=" conditionally independent ";
    }else{
        tempText+=" ..... ";
    }
    for(var i=0;i<observedNodes.length;i++){
        if(i==0){
            tempText+=" given ";
        }else{
            tempText+=" , ";
        }
        tempText+=observedNodes[i].id;
    }
    tempText+="?";
    textInstructions.attr('text',tempText);
    console.log(tempText);
    if(dSepSource && dSepTarget){
        queryButton.show();
    }else{
        queryButton.hide();
    }
}


function updateInferenceQuery(){
    var tempText="P( ";
    var inferenceObservedQueriesKeys=Object.keys(inferenceObservedQueries);
    for(var i=0;i<inferenceObservedQueriesKeys.length;i++){
        if(i==0){
            tempText+=inferenceObservedQueriesKeys[i];
        }else{
            tempText+=" , "+inferenceObservedQueriesKeys[i];
        }
    }
    tempText+=" | "
    var inferenceObservedKeys=Object.keys(inferenceObserved);
    for(var i=0;i<inferenceObservedKeys.length;i++){
        if(i==0){
            tempText+= inferenceObserved[inferenceObservedKeys[i]];
        }else{
            tempText+=" , "+ inferenceObserved[inferenceObservedKeys[i]];
        }
    }
    tempText+=" )";
    inferenceInstructions.attr('text',tempText);
    console.log(tempText);
}

function createTable(node,highlightValue,highlightVar){
                    tempNode=node;
                    var startX=node.shape[0].attr("cx")+50;
                    var startY=node.shape[0].attr("cy")+60;
                    flagTable[tempNode.id]=false;
                    var newDiv = document.createElement("div");
                    newDiv.style.position='absolute';
                    newDiv.style.top=startY+"px";
                    newDiv.style.left=startX+"px";
                    newDiv.style.zIndex="50";
                   

                        row=new Array();
                        cell=new Array();

                        row_num=12; //edit this value to suit
                        cell_num=12; //edit this value to suit

                        tab=document.createElement('table');
                        tab.border="1";
                        tab.style.borderCollapse="collapse";
                        tab.style.borderColor="yellow";
                        tab.setAttribute('id','newtable');

                        tbo=document.createElement('tbody');
                        row[0]=document.createElement('tr');
                        for(k=0;k<tempNode.table[0].length;k++) {
                                cell[k]=document.createElement('td');
                                cell[k].setAttribute("style","background-color: #003366; color:#ffffff");

                                cont=document.createTextNode(tempNode.table[0][k]);
                                cell[k].appendChild(cont);
                                row[0].appendChild(cell[k]);
                        }
                        tbo.appendChild(row[0]);
                        for(c=1;c<tempNode.table.length;c++){
                            row[c]=document.createElement('tr');
                            for(k=0;k<tempNode.table[c].length-1;k++) {
                                cell[k]=document.createElement('td');
                                if(Math.floor((c-1)/2)%2==0){
                                    cell[k].style.backgroundColor="#99CCCC";
                                }else{
                                    cell[k].style.backgroundColor="white";                        
                                }
                                cont=document.createTextNode(tempNode.table[c][k].toLowerCase());
                                cell[k].appendChild(cont);
                                row[c].appendChild(cell[k]);
                            }
                            cell[k]=document.createElement('td');
                            cont=document.createElement("input");
                            cont.id="input"+tempNode.id+""+c;
                            $(cont).val(tempNode.table[c][k]);
                            cont.style.width="50px";
                            cell[k].appendChild(cont);
                            row[c].appendChild(cell[k]);
                            tbo.appendChild(row[c]);
                            if(tempNode.table[c][tempNode.table[0].indexOf(highlightVar)]==highlightValue){
                                row[c].style.backgroundColor="yellow";
                            }
                        }
                        
                        tab.appendChild(tbo);
                       
                            $(tab).bind('change',tempNode.valueUpdate);
                        
                        newDiv.appendChild(tab);
                        var tempPaper=new Raphael(newDiv, 40, 10);
                        var extendButton=tempPaper.rect(0,0,10,10).attr({fill:"yellow"}); //extending the domain
                        var spliceButton=tempPaper.rect(20,0,10,10).attr({fill:"red"}); //splicing the domain
                        spliceButton.click(tempNode.spliceNode);
                        extendButton.click(tempNode.extendNode);

                      var my_div = document.getElementById("canvas");
                      document.body.insertBefore(newDiv, my_div);
                      tables[tempNode.id]=newDiv;

}


Graph.Node.prototype = {
};


   function pathGenerator() {
    //make the query more verbose
      paths=[];
      generatePaths(dSepSource,[],dSepTarget);
      dSepSource.shape[0].attr({stroke:"black", 'stroke-width':2});
      dSepTarget.shape[0].attr({stroke:"black", 'stroke-width':2});
      for(var i=0;i<observedNodes.length;i++){
        observedNodes[i].shape[0].attr({stroke:"black", 'stroke-width':2, fill:"white"});      
      }
      alert("The nodes are d-separated: "+ checkDSeparation(paths));
      $("#dSeparationCheck").hide();
      dSepSource=undefined;
      dSepTarget=undefined;
      paths=[];
      observedNodes=[];
      flagSeparation=0;
      flagObservedNode=false;
      
      hideAllInstructions();
      $("#queriesInstruc").show();
      textInstructions.attr('text',"");
      queryButton.hide();
            var keysTemp=Object.keys(thisGraph.nodes);                    
            for(var i=0;i<keysTemp.length;i++){
                thisGraph.nodes[keysTemp[i]].targeted=false;
                thisGraph.nodes[keysTemp[i]].observed=false;
            }
           
      //have checks for  boundary cases and check errors
    }

      function generatePaths(node, traversedPath, target){
        //remember to reset paths to [] everytime generatePaths is called initially
        traversedPath.push(node);
        if(node==target){
            paths.push(traversedPath);
            return;
        }else if(node.children(traversedPath,false).length==0){
            return; 
        }else{
            for(var i=0;i<node.children(traversedPath,false).length;i++){
                generatePaths(node.children(traversedPath,false)[i], traversedPath.slice(), target);
            }
            return;
        }
    }
    function checkDSeparation(paths){
        var flagDSeparated=true;
        for(var i=0;i<paths.length;i++){
            if(checkActivePath(paths[i])==0){
                console.log(paths[i]);
                flagDSeparated=false;
            }
        }
        return flagDSeparated;
    }

    function checkActivePath(path){
        flagObservedNode=false;
        var flagActive=0;
        for(var i=0;(i+2)<path.length;i++){
            var node1=path[i];
            var node2=path[i+1];
            var node3=path[i+2];
            var link1,link2;
            for(var j=0;j<node1.edges.length;j++){
                if(node2==node1.edges[j].target){
                    link1=0;
                }else if(node2==node1.edges[j].source){
                    link1=1;
                }
            }
            for(var j=0;j<node2.edges.length;j++){
                if(node3==node2.edges[j].target){
                    link2=1;
                }else if(node3==node2.edges[j].source){
                    link2=0;
                }
            }
            //link=0, towards middle node, link=1 away from middle node
            
            if(node2.observed && link1!=link2){
                flagActive=1;
                break;
            }
            if(node2.observed && (link1==1) && (link2==1)){
                flagActive=1;
                break;
            }
            checkObservedChildren(node2, [node1, node3]);
            if(!node2.observed && (link1==0) && (link2==0) && !flagObservedNode){
                flagActive=1;
                break;
                //implement the tree searching thing in the dseparation
            }
        }

        return flagActive;

    }

    function checkObservedChildren(node, traversedPath){
        if(node.observed){
            flagObservedNode=true;
            return;
        }
        traversedPath.push(node);
        if(node.children(traversedPath,false).length==0){
            return; 
        }else{
            for(var i=0;i<node.children(traversedPath,false).length;i++){
                checkObservedChildren(node.children(traversedPath,false)[i], traversedPath.slice());
            }
            return;
        }
    }
/*variable elimination
*
*/

function showActiveTriples(){
    paths=[];
    generatePaths(dSepSource,[],dSepTarget);
    console.log(paths);
    if(showActiveFlag){
        for(var i=0;i<paths.length;i++){
            console.log(paths[i]);
            
                flagObservedNode=false;
                var flagActive=0;
                for(var j=0;(j+2)<paths[i].length;j++){
                    var node1=paths[i][j];
                    var node2=paths[i][j+1];
                    var node3=paths[i][j+2];
                    var link1,link2;
                    for(var k=0;k<node1.edges.length;k++){
                        if(node2==node1.edges[k].target){
                            link1=0;
                        }else if(node2==node1.edges[k].source){
                            link1=1;
                        }
                    }
                    for(var k=0;k<node2.edges.length;k++){
                        if(node3==node2.edges[k].target){
                            link2=1;
                        }else if(node3==node2.edges[k].source){
                            link2=0;
                        }
                    }
                    //link=0, towards middle node, link=1 away from middle node
                    
                    if(node2.observed && link1!=link2){
                        flagActive=1;
                        
                    }
                    if(node2.observed && (link1==1) && (link2==1)){
                        flagActive=1;
                        
                    }
                    checkObservedChildren(node2, [node1, node3]);
                    if(!node2.observed && (link1==0) && (link2==0) && !flagObservedNode){
                        flagActive=1;
                        
                        //implement the tree searching thing in the dseparation
                    }
                    if(flagActive==0){
                        node2.shape[0].attr({fill:"red"});
                    }
                }

        }
        showActiveFlag=false;
    }else{
        console.log("undoing");
        var keysTemp=Object.keys(thisGraph.nodes); 
        for(var i=0;i<keysTemp.length;i++){
            if(!thisGraph.nodes[keysTemp[i]].targeted && !(thisGraph.nodes[keysTemp[i]]).observed){
                thisGraph.nodes[keysTemp[i]].shape[0].attr({fill:"white"});
            }else if(thisGraph.nodes[keysTemp[i]].targeted){
                thisGraph.nodes[keysTemp[i]].shape[0].attr({stroke:"blue", 'stroke-width':5});
            }else{
                thisGraph.nodes[keysTemp[i]].shape[0].attr({fill:"#99CCCC", 'stroke-width':5});
            }
        } 
        showActiveFlag=true;
    }
}







function selectOnEvidence(a,evidence){
    var finalTempTable=[];
    finalTempTable[0]=a.table[0].slice();
    var keysTemp=Object.keys(evidence); 
    for(var i=1;i<a.table.length;i++){
        var flag=0;
        for(var j=0;j<keysTemp.length;j++){
            var varPos=a.table[0].indexOf(keysTemp[j]);

            if((varPos!=-1) && evidence[keysTemp[j]]!=a.table[i][varPos]){
                flag=1;
                break;
            }
        }

        if(flag==0){
            finalTempTable.push(a.table[i]);
        }
    } 
    var finalJointObject=new Object();
    finalJointObject.table=finalTempTable.slice();
    finalJointObject.vars=[];
    for(var i=0;i<a.vars.length;i++){
            finalJointObject.vars.push(a.vars[i]);       
    }
    finalJointObject.parentNodes=[];
    for(var i=0;i<a.parentNodes.length;i++){
            finalJointObject.parentNodes.push(a.parentNodes[i]);
    }
    return finalJointObject;
}

function jointCompute(a,b,common){
    //problem with the joint
    var commonVariables=[];
    console.log(a.parentNodes);
    console.log(a.table[0]);
    console.log(a);
    console.log(b);
    var commonPosa=[];
    var commonPosb=[];
    for(var i=0;i<a.table[0].length-1;i++){
        if(b.table[0].indexOf(a.table[0][i])!=-1){
            commonVariables.push(a.table[0][i]);
            commonPosa.push(i);
            commonPosb.push(b.table[0].indexOf(a.table[0][i]));
        }
    }
    console.log(commonVariables);
    console.log(commonPosa);
    console.log(commonPosb);
    //var commonPosa=a.table[0].indexOf(common);
    //var commonPosb=b.table[0].indexOf(common);
    finalJoint=[];
    finalJoint[0]=[];
    for(var i=0;i<a.table[0].length-1;i++){
        if(commonVariables.indexOf(a.table[0][i])==-1){
            finalJoint[0].push(a.table[0][i]);
        }
    }
    for(var i=0;i<b.table[0].length-1;i++){
        if(commonVariables.indexOf(b.table[0][i])==-1){
            finalJoint[0].push(b.table[0][i]);
        }
    }
    for(var i=0;i<commonPosa.length;i++){
        finalJoint[0].push(a.table[0][commonPosa[i]]);
    }
    finalJoint[0].push("P");
    console.log(finalJoint[0]);

    for(var i=1;i<a.table.length;i++){
        for(var j=1;j<b.table.length;j++){
            var tempRow=a.table[i].slice(0,a.table[i].length-1);
            for(var k=commonPosa.length-1;k>=0;k--){
                tempRow.splice(commonPosa[k],1);
            }
            console.log(tempRow.slice());
            var flagTrue=true;
            for(var m=0;m<commonPosa.length;m++){
                if(a.table[i][commonPosa[m]]!=b.table[j][commonPosb[m]]){
                    console.log(a.table[i][commonPosa[m]]+"===="+b.table[j][commonPosb[m]])
                    flagTrue=false;
                }
            }
                if(flagTrue){
                    for(var k=0;k<b.table[j].length-1;k++){
                        if(commonPosb.indexOf(k)==-1 ){
                            tempRow.push(b.table[j][k]);
                        }
                    }
                    for(var k=0;k<commonPosa.length;k++){
                        tempRow.push(a.table[i][commonPosa[k]]);
                    }
                    tempRow.push(parseFloat(a.table[i][a.table[i].length-1])*parseFloat(b.table[j][b.table[j].length-1]))
                    console.log(tempRow.slice());
                    finalJoint.push(tempRow);
                }

            
        }
    } 
    console.log(finalJoint);
    var finalJointObject=new Object();
    finalJointObject.table=finalJoint;
    finalJointObject.vars=[];
    for(var i=0;i<a.vars.length;i++){
        finalJointObject.vars.push(a.vars[i]);
    }
    for(var i=0;i<b.vars.length;i++){
        finalJointObject.vars.push(b.vars[i]);
    }
    finalJointObject.parentNodes=[];
    
    var tempNodesArray=[];/*
    for(var i=0;i<a.parentNodes.length;i++){
        var t=a.parentNodes[i];
        if(commonVariables.indexOf(t)==-1){
            tempNodesArray.push(t);
        }
    }
    for(var i=0;i<b.parentNodes.length;i++){
        var t=b.parentNodes[i];
        if(commonVariables.indexOf(t)==-1){
            tempNodesArray.push(t);
        }
    }*/
    for(var i=0;i<finalJoint[0].length-1;i++){
        if(finalJointObject.vars.indexOf(finalJoint[0][i])==-1){
            tempNodesArray.push(finalJoint[0][i]);
        }
    }
    finalJointObject.parentNodes=tempNodesArray.slice();
    console.log(finalJointObject);
    return finalJointObject;
}


/*
function jointCompute(a,b,common){
    //problem with the joint
    var commonPosa=a.table[0].indexOf(common);
    var commonPosb=b.table[0].indexOf(common);
    finalJoint=[];
    finalJoint[0]=[];
    for(var i=0;i<a.table[0].length-1;i++){
        if(i!=commonPosa){
            finalJoint[0].push(a.table[0][i]);
        }
    }
    for(var i=0;i<b.table[0].length-1;i++){
        if(i!=commonPosb){
            finalJoint[0].push(b.table[0][i]);
        }
    }
    finalJoint[0].push(a.table[0][commonPosa]);
    finalJoint[0].push("P");


    for(var i=1;i<a.table.length;i++){
        for(var j=1;j<b.table.length;j++){
            var tempRow=a.table[i].slice(0,a.table[i].length-1);
            tempRow.splice(commonPosa,1);
            if(a.table[i][commonPosa]==b.table[j][commonPosb]){
                for(var k=0;k<b.table[j].length-1;k++){
                    if(k!=commonPosb){
                        tempRow.push(b.table[j][k]);
                    }
                }
                tempRow.push(a.table[i][commonPosa]);
                tempRow.push(parseFloat(a.table[i][a.table[i].length-1])*parseFloat(b.table[j][b.table[j].length-1]))
                finalJoint.push(tempRow);
            }
            
        }
    } 
    console.log(finalJoint);
    var finalJointObject=new Object();
    finalJointObject.table=finalJoint;
    finalJointObject.vars=[];
    for(var i=0;i<a.vars.length;i++){
        finalJointObject.vars.push(a.vars[i]);
    }
    for(var i=0;i<b.vars.length;i++){
        finalJointObject.vars.push(b.vars[i]);
    }
    finalJointObject.parentNodes=[];
    
    var tempNodesArray=[];
    for(var i=0;i<a.parentNodes.length;i++){
        var t=a.parentNodes[i];
        if(t!=common){
            tempNodesArray.push(t);
        }
    }
    for(var i=0;i<b.parentNodes.length;i++){
        var t=b.parentNodes[i];
        if(t!=common){
            tempNodesArray.push(t);
        }
    }
    finalJointObject.parentNodes=tempNodesArray.slice();
    console.log(finalJointObject);
    return finalJointObject;
}*/

function jointSum(a, varToSum){
   var tempTable=[];
   console.log(a);  
   var flagTemp=new Array();
   var varPos=a.table[0].indexOf(varToSum);
   for(var i=0;i<a.table.length;i++){
      tempTable[i]=new Array();
      for(var j=0;j<a.table[i].length;j++){
        if(j!=varPos){
            tempTable[i].push(a.table[i][j]);
        }  
      }
      flagTemp[i]=false;
   }
   var finalTempTable=[];
   finalTempTable[0]=tempTable[0].slice();
   for(var i=1;i<a.table.length;i++){
        if(!flagTemp[i]){
            var tempSum=0;
            for(var j=1;j<a.table.length;j++){
                if(!flagTemp[j]){
                    var width=tempTable[j].length;
                    var flag=0;
                    for(var k=0;k<width-1;k++){   
                        if(tempTable[j][k]!=tempTable[i][k]){
                            flag=1;
                        }
                    }
                    if(flag==0){
                        tempSum+=tempTable[j][tempTable[j].length-1];
                        flagTemp[j]=true;
                    }
                }
            }
            var tempRow=tempTable[i].slice();
            tempRow[tempRow.length-1]=tempSum;
            finalTempTable.push(tempRow.slice());
        }
   }
   var finalJointObject=new Object();
    finalJointObject.table=finalTempTable.slice();
    finalJointObject.vars=[];
    for(var i=0;i<a.vars.length;i++){
        if(a.vars[i]!=varToSum){
            finalJointObject.vars.push(a.vars[i]);
        }
    }
    finalJointObject.parentNodes=[];
    for(var i=0;i<a.parentNodes.length;i++){
        
            finalJointObject.parentNodes.push(a.parentNodes[i]);
        
    }
    console.log(finalJointObject);  
    return finalJointObject;
    

}

function variableElem( e, x,graph){
    //look if all variables can be iterated over not just hidden
    var keysTemp=Object.keys(graph.nodes); 
    var vars=[];
    for(var i=0;i<keysTemp.length;i++){
        vars.push(graph.nodes[keysTemp[i]].id);
    }  
    var hiddenVars=[];

    for(var i=0;i<vars.length;i++){
        if(!(e[vars[i]]) && !(x[vars[i]])){
            hiddenVars.push(vars[i]);
        }
    }  
    var initialFactors=[];
    for(var i=0;i<vars.length;i++){
         var a=new Object();
        a.table=graph.nodes[keysTemp[i]].table.slice();
        a.vars=[graph.nodes[keysTemp[i]].id];
        a.parentNodes=[];
        for(var j=0;j<graph.nodes[keysTemp[i]].parents.length;j++){
            a.parentNodes.push(graph.nodes[keysTemp[i]].parents[j].id)
        }
        
        initialFactors.push(selectOnEvidence(a,e));
    }
    console.log(initialFactors);
    console.log(hiddenVars);
    
    for(var i=0;i<hiddenVars.length;i++){
        var consideredVar=hiddenVars[i];
        var toJoin=[];
        var first_factor;
        var toSplice=[];
        console.log(initialFactors.slice());
        for(var j=0;j<initialFactors.length;j++){

            if(initialFactors[j].parentNodes.indexOf(consideredVar)!=-1){
                toJoin.push(initialFactors[j]);
                toSplice.push(initialFactors[j]);
            }
            if(initialFactors[j].vars.indexOf(consideredVar)!=-1){
                first_factor=initialFactors[j];
                toSplice.push(initialFactors[j]);

            }
            
        }
        toJoin=[first_factor].concat(toJoin);
        var multiplier=first_factor;
        console.log(toJoin.slice());
        for(var j=1;j<toJoin.length;j++){
            console.log("inside");
            multiplier=jointCompute(toJoin[j],multiplier,consideredVar);
        }       
        console.log(multiplier);
        if(toJoin.length>1){
            multiplier=jointSum(multiplier,consideredVar);
        }
            console.log(multiplier);
            var tempInitialFactors=[];
            for(var j=0;j<initialFactors.length;j++){
                if(toSplice.indexOf(initialFactors[j])==-1){
                    tempInitialFactors.push(initialFactors[j]);
                }
            }
            initialFactors=tempInitialFactors.slice();
            if(toJoin.length>1){
                initialFactors.push(multiplier);
            }
        
    }
    console.log(initialFactors);
        
    
    var xVars=[];

    for(var i=0;i<vars.length;i++){
        if(x[vars[i]] || e[vars[i]]){
            xVars.push(vars[i]);
        }
    }
    
    for(var i=0;i<xVars.length;i++){
        var consideredVar=xVars[i];
        var toJoin=[];
        var first_factor;
        var toSplice=[];
        for(var j=0;j<initialFactors.length;j++){
            if(initialFactors[j].parentNodes.indexOf(consideredVar)!=-1){
                toJoin.push(initialFactors[j]);
                toSplice.push(initialFactors[j]);
            }
            if(initialFactors[j].vars.indexOf(consideredVar)!=-1){
                first_factor=initialFactors[j];
                toSplice.push(initialFactors[j]);

            }
            
        }
        toJoin=[first_factor].concat(toJoin);
        console.log(toJoin);
        var multiplier=first_factor;
        for(var j=1;j<toJoin.length;j++){
            multiplier=jointCompute(toJoin[j],multiplier,consideredVar);
        }
        console.log(multiplier);
        var tempInitialFactors=[];
        for(var j=0;j<initialFactors.length;j++){
            if(toSplice.indexOf(initialFactors[j])==-1){
                tempInitialFactors.push(initialFactors[j]);
            }
        }
        initialFactors=tempInitialFactors.slice();
        initialFactors.push(multiplier);
    }
    console.log(initialFactors);
    var keysTempe=Object.keys(e); 
    var keysTempx=Object.keys(x);
    var selectedValue;
    var sumProbs=0;
    for(var i=1;i<initialFactors[0].table.length;i++){
        sumProbs+=initialFactors[0].table[i][initialFactors[0].table[i].length-1];
        var flag=true;
        
        for(var j=0;j<keysTempe.length;j++){
            if(e[keysTempe[j]]!=initialFactors[0].table[i][initialFactors[0].table[0].indexOf(keysTempe[j])]){
                flag=false;
                break;
            }
        }
        for(var j=0;j<keysTempx.length;j++){
            if(x[keysTempx[j]]!=initialFactors[0].table[i][initialFactors[0].table[0].indexOf(keysTempx[j])]){
                flag=false;
                break;
            }
        }
        if(flag){
            selectedValue=initialFactors[0].table[i][initialFactors[0].table[i].length-1];
        }

    }
    
    return (selectedValue/sumProbs);
    
}

finalVariableEliminationQuery=function(){
            var tablesKeys=Object.keys(tables);  

            for(var i=0;i<tablesKeys.length;i++){
                    tables[tablesKeys[i]].style.display="none";
                    flagTable[tablesKeys[i]]=true;  
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
            var x=variableElem(inferenceObserved,inferenceObservedQueries,thisGraph);
            alert(x);
            //$("#currentP").hide();
            $("#probInstructions").hide();
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
          
};


/* inference by enumeration
*/

function enumerationTest(e,x,graph){
    var vars=[];
    var keysTemp=Object.keys(graph.nodes); 
    for(var i=0;i<keysTemp.length;i++){
        vars.push(graph.nodes[keysTemp[i]].id);
    }  
    var hiddenVars=[];

    for(var i=0;i<vars.length;i++){
        if(!(e[vars[i]]) && !(x[vars[i]])){
            hiddenVars.push(vars[i]);
        }
    }  
        var t1;
        var totalRows=1;
        var countersMods=[], sources=[];
        for(var i=0;i<hiddenVars.length;i++){
                totalRows*=graph.nodes[hiddenVars[i]].domain.length;
                countersMods.push(graph.nodes[hiddenVars[i]].domain.length);
                sources.push(graph.nodes[hiddenVars[i]]);
        }
        var counters=new Array(countersMods.length);
        for(var i=0;i<counters.length;i++){
            counters[i]=1;
            for(var j=i+1;j<countersMods.length;j++){
                counters[i]*=countersMods[j];
            }
        }
        var Q=new Array();
        for(var i=0;i<totalRows;i++){
            Q[i]=new Array();
        }
        for(var i=0;i<counters.length;i++){
            var flag=0,tempCounter=0;
            for(var j=0;j<totalRows;j++){
                  Q[j][i]=sources[i].domain[flag];
                  tempCounter++;
                  if((tempCounter%counters[i])==0){
                    flag=(flag+1)%countersMods[i];
                  }
            }

        }
        var keysTemp=Object.keys(e); 
        for(var i=0;i<keysTemp.length;i++){
            sources.push(graph.nodes[keysTemp[i]]);
        }
        for(var j=0;j<totalRows;j++){
            for(var i=0;i<keysTemp.length;i++){
                Q[j].push(e[keysTemp[i]]);
                
            } 
        }
        var keysTemp=Object.keys(x); 
        for(var i=0;i<keysTemp.length;i++){
            sources.push(graph.nodes[keysTemp[i]]);
        }
        for(var j=0;j<totalRows;j++){
            for(var i=0;i<keysTemp.length;i++){
                Q[j].push(x[keysTemp[i]]);
            } 
        }
        var probTotal=0;
        for(i=0;i<Q.length;i++){
            var tempProduct=1;
            console.log("==========");
            var tempEvidences={};
            for(var j=0;j<Q[0].length;j++){
                tempEvidences[sources[j].id]=Q[i][j];
            }
            for(var j=0;j<vars.length;j++){
                tempProduct*=getProb(vars[j],Q[i],graph,sources.slice(),tempEvidences);
               //console.log(tempProduct);
            }
            console.log("==========");

            probTotal+=tempProduct;                    
        }
        console.log(probTotal);
        return probTotal;

}

function getProb(varsConsidered, evidences,graph,sources, evidencesDict){
    var node=graph.nodes[varsConsidered];
    console.log(node.parents);
    var flag=true;
    for(var i=0;i<node.table.length;i++){
        flag=true;
        for(j=0;j<(node.sources.length);j++){
            if(evidencesDict[(node.sources[j]).id]){
                if(node.table[i][j]!=evidencesDict[node.sources[j].id]){
                    flag=false;
                    break;
                }
            }
        }
        if(flag){
            console.log(node.table[i]);
            return node.table[i][node.table[i].length-1];
        }
    }
    
}


function showAllTables(graph){

                var keysTemp=Object.keys(graph.nodes),tempNode;  
            
                for(var i=0;i<keysTemp.length;i++){
                    var tempNode=graph.nodes[keysTemp[i]];
                    var startX=tempNode.shape[0].attr("cx")+50;
                    var startY=tempNode.shape[0].attr("cy")+10;
                    var newDiv = document.createElement("div");
                    newDiv.style.position='absolute';
                    newDiv.style.top=startY+"px";
                    newDiv.style.left=startX+"px";
                    newDiv.style.zIndex="50";
                   

                        row=new Array();
                        cell=new Array();

                        row_num=12; //edit this value to suit
                        cell_num=12; //edit this value to suit

                        tab=document.createElement('table');
                        tab.border="1";
                        tab.style.borderCollapse="collapse";
                        tab.setAttribute('id','newtable');

                        tbo=document.createElement('tbody');
                        row[0]=document.createElement('tr');
                        for(k=0;k<tempNode.table[0].length;k++) {
                                cell[k]=document.createElement('td');
                                cell[k].setAttribute("style","background-color: #003366; color:#ffffff");
                                cont=document.createTextNode(tempNode.table[0][k]);
                                cell[k].appendChild(cont);
                                row[0].appendChild(cell[k]);
                        }
                        tbo.appendChild(row[0]);
                        for(c=1;c<tempNode.table.length;c++){
                            row[c]=document.createElement('tr');
                            for(k=0;k<tempNode.table[c].length-1;k++) {
                                cell[k]=document.createElement('td');
                                if(Math.floor((c-1)/2)%2==0){
                                    cell[k].style.backgroundColor="#99CCCC";
                                }else{
                                    cell[k].style.backgroundColor="white";                        
                                }
                                cont=document.createTextNode(tempNode.table[c][k].toLowerCase());
                                cell[k].appendChild(cont);
                                row[c].appendChild(cell[k]);
                            }
                            cell[k]=document.createElement('td');
                            cont=document.createTextNode(tempNode.table[c][k]);
                            
                            cell[k].appendChild(cont);
                            row[c].appendChild(cell[k]);
                            tbo.appendChild(row[c]);
                        }
                        
                        tab.appendChild(tbo);
                        
                        
                        newDiv.appendChild(tab);
                      var my_div = document.getElementById("canvas");
                      document.body.insertBefore(newDiv, my_div);
                      tablesVariable[tempNode.id]=newDiv;

                }
}



function getFinalInference(e,x,graph){
    var vars=[];
    var keysTemp=Object.keys(x); 
    for(var i=0;i<keysTemp.length;i++){
        vars.push(graph.nodes[keysTemp[i]].id);
    }
    var t1;
    var totalRows=1;
    var countersMods=[], sources=[];
    for(var i=0;i<vars.length;i++){
        totalRows*=graph.nodes[vars[i]].domain.length;
        countersMods.push(graph.nodes[vars[i]].domain.length);
        sources.push(graph.nodes[vars[i]]);
    }
    var counters=new Array(countersMods.length);
        for(var i=0;i<counters.length;i++){
            counters[i]=1;
            for(var j=i+1;j<countersMods.length;j++){
                counters[i]*=countersMods[j];
            }
        }
        //console.log(counters);
        var Q=new Array();
        for(var i=0;i<totalRows;i++){
            Q[i]=new Array();
        }
        for(var i=0;i<counters.length;i++){
            var flag=0,tempCounter=0;
            for(var j=0;j<totalRows;j++){
                  Q[j][i]=sources[i].domain[flag];
                  tempCounter++;
                  if((tempCounter%counters[i])==0){
                    flag=(flag+1)%countersMods[i];
                  }
            }

        }
        var reqdVal=enumerationTest(e,x,graph);
        var sumVals=0;
        console.log(Q);
        for(var i=0;i<Q.length;i++){
            var tempEvidencesFinal={};
            for(var j=0;j<Q[i].length;j++){
                tempEvidencesFinal[sources[j].id]=Q[i][j];
            }
            sumVals+=enumerationTest(e,tempEvidencesFinal,graph);
        }
        return (reqdVal/sumVals);
}

inferenceByEnumeration=function(){
            var tablesKeys=Object.keys(tables);  

            for(var i=0;i<tablesKeys.length;i++){
                    tables[tablesKeys[i]].style.display="none";
                    flagTable[tablesKeys[i]]=true;  
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
            alert(getFinalInference(inferenceObserved,inferenceObservedQueries,thisGraph));
            //$("#currentP").hide();
            $("probInstructions").hide();
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
           
           
            }

    

/*
sampling
*/


function samplingQuery(e,x,graph,N,storeSamples){
    var vars=[],evidenceVars=[];
    var keysTemp=Object.keys(graph.nodes); 
    for(var i=0;i<keysTemp.length;i++){
        vars.push(graph.nodes[keysTemp[i]].id);
        if(e[graph.nodes[keysTemp[i]].id]){
            evidenceVars.push(graph.nodes[keysTemp[i]])
        }
    }  
    var nodeCounter=0;
    var nodeLayers=[],nodeList=[];
    nodeLayers[0]=new Array();
    for(var i=0;i<keysTemp.length;i++){
        if(graph.nodes[keysTemp[i]].parents.length==0){
            nodeLayers[0].push(graph.nodes[keysTemp[i]]);
            nodeList.push(graph.nodes[keysTemp[i]]);
            nodeCounter++;
        }
    }
    console.log(nodeLayers[0]);
    
    var checkFlag=true, layerCounter=1;;
    while(nodeCounter!=keysTemp.length){
        nodeLayers[layerCounter]=new Array();
        for(var i=0;i<keysTemp.length;i++){
            for(var j=0;j<nodeLayers[layerCounter-1].length;j++){
                if(graph.nodes[keysTemp[i]].parents.indexOf(nodeLayers[layerCounter-1][j])!=-1 && nodeList.indexOf(graph.nodes[keysTemp[i]])==-1){
                    nodeLayers[layerCounter].push(graph.nodes[keysTemp[i]]);
                    nodeList.push(graph.nodes[keysTemp[i]]);
                    nodeCounter++;
                }
            }
        }
        console.log(nodeLayers[layerCounter]);
        console.log(nodeCounter+'==='+keysTemp.length);
        layerCounter++;
    }
    var samples=[];
    for(var k=0;k<N;k++){
        var w=1;
        var sampled={}
        for(var i=0;i< nodeList.length;i++){
            if(e[nodeList[i].id]){
                sampled[nodeList[i].id]=e[nodeList[i].id];
                w*=selectProb(sampled, nodeList[i]);
            }else{
                var t=Math.random();
                var cumulativeSum=0;
                for(var j=1;j<nodeList[i].table.length;j++){

                    if(rowMatch(nodeList[i],j,sampled)){
                        cumulativeSum+=nodeList[i].table[j][nodeList[i].table[j].length-1];
                        if(t<cumulativeSum){
                            sampled[nodeList[i].id]=nodeList[i].table[j][nodeList[i].table[0].indexOf(nodeList[i].id)];
                            break;
                        }
                    }
                }

            }
        }
        
        sampled["weight"]=w;
        samples.push(sampled);
    }
    var consideredWeight=0;
    var totalWeight=0;
    var xKeys=Object.keys(x);
    for(var i=0;i<samples.length;i++){
         for(var j=0;j<xKeys.length;j++){
            var flag=true;
            if(samples[i][xKeys[j]]!=x[xKeys[j]]){
                flag=false;
            }
            if(flag){
                consideredWeight+=samples[i]["weight"];
            }
            totalWeight+=samples[i]["weight"];
        }
    }

    if(!storeSamples){
        alert(consideredWeight/totalWeight);
    }else{
        return samples.slice();
    }
}



function rowMatch(node, rowNumber, sampled){
    var sampledKeys=Object.keys(sampled);
    
        var flag=true;
        for(var j=0;j<sampledKeys.length;j++){
            if(node.table[0].indexOf(sampledKeys[j])!=-1 &&  sampled[sampledKeys[j]]!=node.table[rowNumber][node.table[0].indexOf(sampledKeys[j])]){
                flag=false;
                break;
            }
        }
        if(flag==true){
            return true;
        }else{
            return false;
        }
    
}
function selectProb(sampled, node){
    var sampledKeys=Object.keys(sampled);
    for(var i=1;i<node.table.length;i++){
        var flag=true;
        for(var j=0;j<sampledKeys.length;j++){
            if(node.table[0].indexOf(sampledKeys[j])!=-1 &&  sampled[sampledKeys[j]]!=node.table[i][node.table[0].indexOf(sampledKeys[j])]){
                flag=false;
                break;
            }
        }
        if(flag==true){
            return node.table[i][node.table[i].length-1];
        }
    }
}
function callSampling(e){
    samplingQuery(inferenceObserved,inferenceObservedQueries,thisGraph,10000,false);
}

function generateSamplerText(){
    var samples=samplingQuery({},{},thisGraph,1000,true);
    var order=Object.keys(samples[0]);
    order.splice(order.indexOf("weight"),1);
    function makeSamples(samples, order){
        
        var samplesArray=[];
        for(var i=0;i<samples.length;i++){
            samplesArray[i]=[];
            for(var j=0;j<order.length;j++){
                samplesArray[i].push(samples[i][order[j]]);
            }
        }
        return samplesArray;
    }
    var sampleArray=makeSamples(samples, order);
    var finalText="";
    for(var i=0;i<order.length;i++){
        finalText+=order[i];
        if(i!=order.length-1){
            finalText+=",";
        }
    }
    finalText+="%";
    for(var i=0;i<sampleArray.length;i++){
        for(var j=0; j< sampleArray[i].length;j++){
            finalText+=sampleArray[i][j];
            if(j!=sampleArray[i].length-1){
                finalText+=",";
            }
            
        }
        finalText+="%";
    }
    return finalText;
}


/*
 * Renderer base class
 */
Graph.Renderer = {};

/*
 * Renderer implementation using RaphaelJS
 */
Graph.Renderer.Raphael = function(element, graph, width, height) {
    this.width = width || 400;
    this.height = height || 400;
    var selfRef = this;
    this.r = Raphael(element, this.width, this.height);
    this.containingRect=this.r.rect(0,0,this.width-5,this.height-5).attr({'stroke-width':3});
    this.trashCan=this.r.image('../../images/exercises/minimax/trash.png',width-65,0,60,60);
                 
    this.radius = 40; 
    /* max dimension of a node */
    this.graph = graph;
    this.mouse_in = false;
    /* TODO default node rendering function */
    if(!this.graph.render) {
        this.graph.render = function() {
            return;
        }
    }
    
    /*
     * Dragging
     */
    this.isDrag = false;

    this.edgeDrop=function(e){
        if(modeClick==1){
                var keysTemp=Object.keys(graph.nodes);
                for(var i=0;i<keysTemp.length;i++){
                    if(this.set==graph.nodes[keysTemp[i]].shape){
                        node1=(graph.nodes[keysTemp[i]]);
                        break;
                    }
                }
                if(node1!=edgeStart){
                     var tablesKeys=Object.keys(tables);  

                    for(var i=0;i<tablesKeys.length;i++){
                            tables[tablesKeys[i]].style.display="none";
                            flagTable[tablesKeys[i]]=true;  
                    }
                    graph.addEdge(edgeStart.id, node1.id,{ directed : true });   
                    /*edgeStart.shape[2].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();
                    edgeStart.shape[3].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();
                    edgeStart.shape[4].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();
                    edgeStart.shape[5].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();  
                    */
                    edgeStart.shape[2].hide();
                    edgeStart=null;
                    node1.shape[0].attr({'stroke-width':2, stroke:"black"});
                    modeClick=0; 
                    edgePath.hide();
                }
                

                selfRef.draw();
        }
    }


        // check the click operation, its buggy
        this.mouseUpFunction=function(e){
            console.log("mouseup");
            if(modeClick==0){
            prevmodeClick=0;    
            console.log(olddx);
            console.log(olddy);
            console.log(e.clientX);
            console.log(e.clientY);
            selfRef.dx=e.clientX;
            selfRef.dx=e.clientY;

            if((Math.abs(olddx-e.clientX)<10 && Math.abs(olddy-e.clientY)<10)){
                console.log("clicked");
                var keysTemp=Object.keys(graph.nodes),tempNode;  
                for(var i=0;i<keysTemp.length;i++){
                    if(this.set==graph.nodes[keysTemp[i]].shape){
                        tempNode=graph.nodes[keysTemp[i]];
                        
                        break;
                    }
                }
                console.log(flagTable[tempNode.id]);

                if(flagTable[tempNode.id]==false){
                    console.log("falsed");
                    tables[tempNode.id].style.display="none";
                    flagTable[tempNode.id]=true;
                }else{
                    console.log("trued");
                    var startX=this.set[0].attr("cx")+50;
                    var startY=this.set[0].attr("cy")+60;
                    flagTable[tempNode.id]=false;
                    var newDiv = document.createElement("div");
                    newDiv.style.position='absolute';
                    newDiv.style.top=startY+"px";
                    newDiv.style.left=startX+"px";
                    newDiv.style.zIndex="50";
                   

                        row=new Array();
                        cell=new Array();

                        row_num=12; //edit this value to suit
                        cell_num=12; //edit this value to suit

                        tab=document.createElement('table');
                        tab.border="1";
                        tab.style.borderCollapse="collapse";

                        tab.setAttribute('id','newtable');

                        tbo=document.createElement('tbody');
                        row[0]=document.createElement('tr');
                        for(k=0;k<tempNode.table[0].length;k++) {
                                cell[k]=document.createElement('td');
                                cell[k].setAttribute("style","background-color: #003366; color:#ffffff");

                                cont=document.createTextNode(tempNode.table[0][k]);
                                cell[k].appendChild(cont);
                                row[0].appendChild(cell[k]);
                        }
                        tbo.appendChild(row[0]);
                        for(c=1;c<tempNode.table.length;c++){
                            row[c]=document.createElement('tr');
                            for(k=0;k<tempNode.table[c].length-1;k++) {
                                cell[k]=document.createElement('td');
                                if(Math.floor((c-1)/2)%2==0){
                                    cell[k].style.backgroundColor="#99CCCC";
                                }else{
                                    cell[k].style.backgroundColor="white";                        
                                }
                                cont=document.createTextNode(tempNode.table[c][k].toLowerCase());
                                cell[k].appendChild(cont);
                                row[c].appendChild(cell[k]);
                            }
                            cell[k]=document.createElement('td');
                            cont=document.createElement("input");
                            cont.id="input"+tempNode.id+""+c;
                            $(cont).val(tempNode.table[c][k]);
                            cont.style.width="50px";
                            cell[k].appendChild(cont);
                            row[c].appendChild(cell[k]);
                            tbo.appendChild(row[c]);
                        }
                        
                        tab.appendChild(tbo);
                        
                            $(tab).bind('change',tempNode.valueUpdate);
                        
                        newDiv.appendChild(tab);
                         var tempPaper=new Raphael(newDiv, 40, 10);
                        var extendButton=tempPaper.rect(0,0,10,10).attr({fill:"yellow"}); //extending the domain
                        var spliceButton=tempPaper.rect(20,0,10,10).attr({fill:"red"}); //splicing the domain
                        spliceButton.click(tempNode.spliceNode);
                        extendButton.click(tempNode.extendNode);
                      var my_div = document.getElementById("canvas");
                      document.body.insertBefore(newDiv, my_div);
                      tables[tempNode.id]=newDiv;
                       
                }
            }
        }
        };
        //this.mouseup(mouseUpFunction);
    this.dragger = function (e) { 
        console.log("dragging");
        var selfReference=this;
       
        //fix the clicking thing
        if(modeClick==0){
                prevmodeClick=0;
                
            this.dx = e.clientX;
            olddx=this.dx;
            this.dy = e.clientY;
            olddy=this.dy;
            console.log(this.dx);
            selfRef.isDrag = this;
            this.set && this.set[0].animate({fill: "white", "fill-opacity":0.5}   , 50).toBack() && this.set.toFront();
            e.preventDefault && e.preventDefault();
        }else if(modeClick==1){
                var keysTemp=Object.keys(graph.nodes);
                for(var i=0;i<keysTemp.length;i++){
                    if(this.set==graph.nodes[keysTemp[i]].shape){
                        node1=(graph.nodes[keysTemp[i]]);
                        break;
                    }
                }
                if(node1!=edgeStart){
                     var tablesKeys=Object.keys(tables);  

                    for(var i=0;i<tablesKeys.length;i++){
                            tables[tablesKeys[i]].style.display="none";
                            flagTable[tablesKeys[i]]=true;  
                    }
                    graph.addEdge(edgeStart.id, node1.id,{ directed : true });   
                    /*
                    edgeStart.shape[2].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();
                    edgeStart.shape[3].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();
                    edgeStart.shape[4].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();
                    edgeStart.shape[5].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();  
                    */
                    edgeStart.shape[2].hide();
                    edgeStart=null;
                    node1.shape[0].attr({'stroke-width':2, stroke:"black"});
                    modeClick=0; 
                    edgePath.hide();
                }
                

                selfRef.draw();


        }else if(modeClick==2){
                
                var keysTemp=Object.keys(graph.nodes),tempNode;  
                for(var i=0;i<keysTemp.length;i++){
                    if(this.set==graph.nodes[keysTemp[i]].shape){
                        tempNode=graph.nodes[keysTemp[i]];
                        
                        break;
                    }
                }
                if(flagTable[tempNode.id]==false){
                    tables[tempNode.id].style.display="none";
                    flagTable[tempNode.id]=true;
                }else{
                    var startX=this.set[0].attr("cx")+50;
                    var startY=this.set[0].attr("cy")+60;
                    flagTable[tempNode.id]=false;
                    var newDiv = document.createElement("div");
                    newDiv.style.position='absolute';
                    newDiv.style.top=startY+"px";
                    newDiv.style.left=startX+"px";
                    newDiv.style.zIndex="50";
                   

                        row=new Array();
                        cell=new Array();

                        row_num=12; //edit this value to suit
                        cell_num=12; //edit this value to suit

                        tab=document.createElement('table');
                        tab.border="1";
                        tab.style.borderCollapse="collapse";

                        tab.setAttribute('id','newtable');

                        tbo=document.createElement('tbody');
                        row[0]=document.createElement('tr');
                        for(k=0;k<tempNode.table[0].length;k++) {
                                cell[k]=document.createElement('td');
                                cell[k].setAttribute("style","background-color: #003366; color:#ffffff");

                                cont=document.createTextNode(tempNode.table[0][k]);
                                cell[k].appendChild(cont);
                                row[0].appendChild(cell[k]);
                        }
                        tbo.appendChild(row[0]);
                        for(c=1;c<tempNode.table.length;c++){
                            row[c]=document.createElement('tr');
                            for(k=0;k<tempNode.table[c].length-1;k++) {
                                cell[k]=document.createElement('td');
                                if(Math.floor((c-1)/2)%2==0){
                                    cell[k].style.backgroundColor="#99CCCC";
                                }else{
                                    cell[k].style.backgroundColor="white";                        
                                }
                                cont=document.createTextNode(tempNode.table[c][k].toLowerCase());
                                cell[k].appendChild(cont);
                                row[c].appendChild(cell[k]);
                            }
                            cell[k]=document.createElement('td');
                            cont=document.createElement("input");
                            cont.id="input"+tempNode.id+""+c;
                            $(cont).val(tempNode.table[c][k]);
                            cont.style.width="50px";
                            cell[k].appendChild(cont);
                            row[c].appendChild(cell[k]);
                            tbo.appendChild(row[c]);
                        }
                        
                        tab.appendChild(tbo);
                       
                            $(tab).bind('change',tempNode.valueUpdate);
                        
                        newDiv.appendChild(tab);
                        var tempPaper=new Raphael(newDiv, 40, 10);
                        var extendButton=tempPaper.rect(0,0,10,10).attr({fill:"yellow"}); //extending the domain
                        extendButton.click(tempNode.extendNode);
                        var spliceButton=tempPaper.rect(20,0,10,10).attr({fill:"red"}); //splicing the domain
                        spliceButton.click(tempNode.spliceNode);
                      var my_div = document.getElementById("canvas");
                      document.body.insertBefore(newDiv, my_div);
                      tables[tempNode.id]=newDiv;

                }
                
        }else if(modeClick==3){
            
                        clickCount++;
                        var thisClicked=this;
                        console.log("inside clicker");
                        function clickCounter(){
                            if(clickCount>1){
                                console.log("double click");
                                clickCount=0;
                                clearTimeout(clicktimer);
                                var keysTemp=Object.keys(thisGraph.nodes),thisNode;
                                
                                for(var i=0;i<keysTemp.length;i++){
                                    if(thisClicked==thisGraph.nodes[keysTemp[i]].shape[0] || thisClicked==thisGraph.nodes[keysTemp[i]].shape[1]){
                                        thisNode=thisGraph.nodes[keysTemp[i]];
                                        break;
                                    }
                                }
                                if(thisNode.targeted){
                                    if(dSepSource==thisNode){
                                        dSepSource=null;
                                        thisGraph.nodes[keysTemp[i]].shape[0].animate({"stroke-width": 2, stroke:"black"}   , 200) ;
                                    }else{
                                        dSepTarget=null;
                                        thisGraph.nodes[keysTemp[i]].shape[0].animate({"stroke-width": 2, stroke:"black"}   , 200);
                                    }
                                    thisNode.targeted=false;
                                }else{
                                    if(!dSepSource && !dSepTarget){
                                        dSepSource=thisNode;
                                        thisGraph.nodes[keysTemp[i]].shape[0].animate({"stroke-width": 5, stroke:"blue"}   , 200);
                                        thisNode.targeted=true;
                                    }else if(dSepSource && !dSepTarget){
                                        dSepTarget=thisNode;
                                        thisGraph.nodes[keysTemp[i]].shape[0].animate({"stroke-width": 5, stroke:"blue"}   , 200) ;
                                        thisNode.targeted=true;
                                    }else if(!dSepSource && dSepTarget){
                                        dSepSource=thisNode;
                                        thisGraph.nodes[keysTemp[i]].shape[0].animate({"stroke-width": 5, stroke:"blue"}   , 200) ;
                                        thisNode.targeted=true;
                                    }
                                }
                              
                            }else{
                                console.log("click");

                                var keysTemp=Object.keys(thisGraph.nodes);  
                                for(var i=0;i<keysTemp.length;i++){
                                    if((thisClicked==thisGraph.nodes[keysTemp[i]].shape[0] || thisClicked==thisGraph.nodes[keysTemp[i]].shape[1] ) && thisGraph.nodes[keysTemp[i]].observed==false){
                                        thisGraph.nodes[keysTemp[i]].observed=true;
                                        observedNodes.push(thisGraph.nodes[keysTemp[i]]);
                                        
                                        thisGraph.nodes[keysTemp[i]].shape[0].animate({"stroke-width": 5, fill:"#99CCCC"}   , 200) ;
                                        break;
                                    }else if((thisClicked==thisGraph.nodes[keysTemp[i]].shape[0] || thisClicked==thisGraph.nodes[keysTemp[i]].shape[1] ) && thisGraph.nodes[keysTemp[i]].observed){
                                        thisGraph.nodes[keysTemp[i]].observed=false;
                                        observedNodes.splice(observedNodes.indexOf(thisGraph.nodes[keysTemp[i]]),1);
                                        thisGraph.nodes[keysTemp[i]].shape[0].animate({"stroke-width": 2, fill:"white"}   , 200);
                                        break;
                                    }
                                }
                                clickCount=0;
                            }
                            updateDSeparationQuery();
                        }
                        if(clickCount==1){
                            var clicktimer=setTimeout(clickCounter, 250);
                        }
                    
        }else if(modeClick==4){

                        clickCount++;
                        var thisClicked=this;
                        console.log("inside clicker");
                        function clickCounterSolve(){
                            if(clickCount>1){
                                console.log("double click");
                                clickCount=0;
                                clearTimeout(clicktimer);
                                var keysTemp=Object.keys(graph.nodes),tempNode;  
                                for(var i=0;i<keysTemp.length;i++){
                                    if((thisClicked==thisGraph.nodes[keysTemp[i]].shape[0] || thisClicked==thisGraph.nodes[keysTemp[i]].shape[1] )){
                                        tempNode=graph.nodes[keysTemp[i]];
                                        
                                        break;
                                    }
                                }
                                if(flagObservingQueries[tempNode.id]==false){
                                    observesQueries[tempNode.id].style.display="none";
                                    flagObservingQueries[tempNode.id]=true;
                                }else{
                                    var startX=tempNode.shape[0].attr("cx")-80;
                                    var startY=tempNode.shape[0].attr("cy")+130;
                                    flagObservingQueries[tempNode.id]=false;
                                    var newDiv = document.createElement("div");
                                    newDiv.style.position='absolute';
                                    newDiv.style.top=startY+"px";
                                    newDiv.style.left=startX+"px";
                                    newDiv.style.zIndex="50";
                                    var optionButton1=document.createElement('select');
                                    var option1=document.createElement('option');
                                    option1.text="-";
                                    optionButton1.appendChild(option1);
                                    for(var i=0;i<tempNode.domain.length;i++){
                                        var option1=document.createElement('option');
                                        option1.text=tempNode.domain[i];
                                        optionButton1.appendChild(option1);
                                    }
                                    if(inferenceObservedQueries[tempNode.id]){
                                        $(optionButton1).val(inferenceObservedQueries[tempNode.id]);
                                    }
                                    $(optionButton1).bind('change',tempNode.observeUpdateQueries);

                                    newDiv.appendChild(optionButton1);

                                        

                                      var my_div = document.getElementById("canvas");
                                      observesQueries[tempNode.id]=newDiv;
                                      document.body.insertBefore(newDiv, my_div);
                                }
                              
                            }else{
                                console.log("click");

                                var keysTemp=Object.keys(graph.nodes),tempNode;  
                                for(var i=0;i<keysTemp.length;i++){
                                    if((thisClicked==thisGraph.nodes[keysTemp[i]].shape[0] || thisClicked==thisGraph.nodes[keysTemp[i]].shape[1] )){
                                        tempNode=graph.nodes[keysTemp[i]];
                                        
                                        break;
                                    }
                                }
                                if(flagObserving[tempNode.id]==false){
                                    observes[tempNode.id].style.display="none";
                                    flagObserving[tempNode.id]=true;
                                }else{
                                    var startX=tempNode.shape[0].attr("cx")+50;
                                    var startY=tempNode.shape[0].attr("cy")+130;
                                    flagObserving[tempNode.id]=false;
                                    var newDiv = document.createElement("div");
                                    newDiv.style.position='absolute';
                                    newDiv.style.top=startY+"px";
                                    newDiv.style.left=startX+"px";
                                    newDiv.style.zIndex="50";
                                    var optionButton1=document.createElement('select');
                                    var option1=document.createElement('option');
                                    option1.text="-";
                                    optionButton1.appendChild(option1);
                                    for(var i=0;i<tempNode.domain.length;i++){
                                        var option1=document.createElement('option');
                                        option1.text=tempNode.domain[i];
                                        optionButton1.appendChild(option1);
                                    }
                                    if(inferenceObserved[tempNode.id]){
                                        $(optionButton1).val(inferenceObserved[tempNode.id]);
                                    }
                                    $(optionButton1).bind('change',tempNode.observeUpdate);

                                    newDiv.appendChild(optionButton1);

                                        

                                      var my_div = document.getElementById("canvas");
                                      observes[tempNode.id]=newDiv;
                                      document.body.insertBefore(newDiv, my_div);
                                } 
                                clickCount=0;
                            }
                            
                        }
                        if(clickCount==1){
                            var clicktimer=setTimeout(clickCounterSolve, 250);
                        }
        }
    };
    
    
    

    var d = document.getElementById(element);
    d.onmousemove = function (e) {
        e = e || window.event;
            console.log("inside");
            if (selfRef.isDrag) {

                var tablesKeys=Object.keys(tables);  

                for(var i=0;i<tablesKeys.length;i++){
                        tables[tablesKeys[i]].style.display="none";
                        flagTable[tablesKeys[i]]=true;  
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
                var bBox = selfRef.isDrag.set.getBBox();
                // TODO round the coordinates here (eg. for proper image representation)
                var newX = e.clientX - selfRef.isDrag.dx + (bBox.x + bBox.width / 2);
                var newY = e.clientY - selfRef.isDrag.dy + (bBox.y + bBox.height / 2);
                /* prevent shapes from being dragged out of the canvas */
                var clientX = e.clientX - (newX < 20 ? newX - 20 : newX > selfRef.width - 20 ? newX - selfRef.width + 20 : 0);
                var clientY = e.clientY - (newY < 20 ? newY - 20 : newY > selfRef.height - 20 ? newY - selfRef.height + 20 : 0);
                selfRef.isDrag.set.translate(clientX - Math.round(selfRef.isDrag.dx), clientY - Math.round(selfRef.isDrag.dy));
                //            console.log(clientX - Math.round(selfRef.isDrag.dx), clientY - Math.round(selfRef.isDrag.dy));
                for (var i in selfRef.graph.edges) {
                    selfRef.graph.edges[i].connection && selfRef.graph.edges[i].connection.draw();
                }
                //selfRef.r.safari();
                selfRef.isDrag.dx = clientX;
                selfRef.isDrag.dy = clientY;
                
                console.log(selfRef.isDrag.set[0].attr("cx"));
                console.log(selfRef.isDrag.set[0].attr("cy"));
                if(selfRef.isDrag.set[0].attr("cx")>width-65 && selfRef.isDrag.set[0].attr("cy")<65){
                    selfRef.isDrag.set.hide();
                    var keysGraph=Object.keys(selfRef.graph.nodes),tempNode;
                    for(var i=0;i<keysGraph.length;i++){
                        if(selfRef.graph.nodes[keysGraph[i]].shape==selfRef.isDrag.set){
                            tempNode=selfRef.graph.nodes[keysGraph[i]];
                            break;
                        }
                    }
                    console.log(tempNode);
                    selfRef.isDrag=false;
                    var toBeUpdated=[];
                    var tempIdStore=tempNode.id;
                    for(var i=0;i<tempNode.edges.length;i++){
                        console.log(tempNode.edges[i].connection.fg);
                        if(tempNode.edges[i].source==tempNode){
                            toBeUpdated.push(tempNode.edges[i].target);
                        }
                        tempNode.edges[i].connection.fg.remove();
                    }
                    delete nodesUsed[tempNode.id];
                    tableFill[tempNode.id] && delete tableFill[tempNode.id];

                    inferenceObserved[tempNode.id] && delete inferenceObserved[tempNode.id];
                    inferenceObservedQueries[tempNode.id] && delete inferenceObservedQueries[tempNode.id];
                    updateInferenceQuery();
                    var keysTemp=Object.keys(inferenceObservedQueries); 
                    if(keysTemp.length==0){
                        inferenceEnumerationButton.hide(); 
                        variableEliminationButton.hide();
                        variableEliminationVerboseButton.hide();
                        samplingButton.hide();
                    }
                    flagObserving[tempNode.id] && delete flagObserving[tempNode.id];
                    flagObservingQueries[tempNode.id] && delete flagObservingQueries[tempNode.id];
                    if(dSepSource==tempNode){
                        dSepSource=undefined;
                        updateDSeparationQuery();
                    }
                    if(dSepTarget==tempNode){
                        dSepTarget=undefined;
                        updateDSeparationQuery();
                    }
                    flagTable[tempNode.id] && delete flagTable[tempNode.id];
                    observedNodes.indexOf(tempNode)!=-1 && observedNodes.splice(observedNodes.indexOf(tempNode),1);
                     tables[tempNode.id] && delete tables[tempNode.id];
                      observes[tempNode.id] && delete tables[tempNode.id];
                       observesQueries[tempNode.id] && delete observesQueries[tempNode.id];

                    console.log(toBeUpdated);
                    for(var i=0;i<toBeUpdated.length;i++){
                        toBeUpdated[i].parents.splice(toBeUpdated.indexOf(tempIdStore),1);
                        for(var j=0;j<toBeUpdated[i].edges.length;j++){
                            if(toBeUpdated[i].edges[j].target==toBeUpdated[i]){
                                toBeUpdated[i].edges.splice(j,1);
                                break;
                            }
                        }
                        toBeUpdated[i].tableUpdate();
                    }

                    selfRef.graph.removeNode(tempNode.id);
                }
            }
            if(modeClick==1){
                edgePath && edgePath.hide();
                var clientX = e.clientX ;
                var clientY = e.clientY -105;
                edgePath=selfRef.r.path("M"+startEdgex+" "+ startEdgey+"L" + clientX+ " "+ clientY).attr({'stroke-width':2});
            }
        
    };
    d.ondblclick = function (e) {
        e = e || window.event;
        console.log(e.clientX);
        console.log(e.clientY);
        if(!selfRef.isDrag && modeClick==0 && prevmodeClick!=1 && (e.clientX<width-70 ||  e.clientY>200) && (e.clientX<900 && e.clientY<700)){
                var thisNode=createNode();
                if(thisNode){
                    console.log(e);
                    
                    var bBox = thisNode.shape.getBBox();
                    console.log(bBox);
                    // TODO round the coordinates here (eg. for proper image representation)
                    
                    console.log(e.clientX);
                    console.log(e.clientY);
                    
                    thisNode.shape.translate(e.clientX -60, e.clientY -150);
                    
                    for (var i in selfRef.graph.edges) {
                        selfRef.graph.edges[i].connection && selfRef.graph.edges[i].connection.draw();
                    }
                    tempNode=thisNode;
                    var startX=thisNode.shape[0].attr("cx")+50;
                    var startY=thisNode.shape[0].attr("cy")+60;
                    flagTable[tempNode.id]=false;
                    console.log(flagTable[tempNode.id]);
                    var newDiv = document.createElement("div");
                    newDiv.style.position='absolute';
                    newDiv.style.top=startY+"px";
                    newDiv.style.left=startX+"px";
                    newDiv.style.zIndex="50";
                   

                        row=new Array();
                        cell=new Array();

                        row_num=12; //edit this value to suit
                        cell_num=12; //edit this value to suit

                        tab=document.createElement('table');
                        tab.border="1";
                        tab.style.borderCollapse="collapse";
                        tab.setAttribute('id','newtable');

                        tbo=document.createElement('tbody');
                        row[0]=document.createElement('tr');
                        for(k=0;k<tempNode.table[0].length;k++) {
                                cell[k]=document.createElement('td');
                                cell[k].setAttribute("style","background-color: #003366; color:#ffffff");

                                cont=document.createTextNode(tempNode.table[0][k]);
                                console.log(cont);
                                cell[k].appendChild(cont);
                                row[0].appendChild(cell[k]);
                        }
                        tbo.appendChild(row[0]);
                        for(c=1;c<tempNode.table.length;c++){
                            row[c]=document.createElement('tr');
                            for(k=0;k<tempNode.table[c].length-1;k++) {
                                cell[k]=document.createElement('td');
                                if(Math.floor((c-1)/2)%2==0){
                                    cell[k].style.backgroundColor="#99CCCC";
                                }else{
                                    cell[k].style.backgroundColor="white";                        
                                }
                                cont=document.createTextNode(tempNode.table[c][k].toLowerCase());
                                cell[k].appendChild(cont);
                                row[c].appendChild(cell[k]);
                            }
                            cell[k]=document.createElement('td');
                            cont=document.createElement("input");
                            cont.id="input"+tempNode.id+""+c;
                            $(cont).val(tempNode.table[c][k]);
                            cont.style.width="50px";
                            cell[k].appendChild(cont);
                            row[c].appendChild(cell[k]);
                            tbo.appendChild(row[c]);
                            
                        }
                        
                        tab.appendChild(tbo);
                       
                            $(tab).bind('change',tempNode.valueUpdate);
                        
                        newDiv.appendChild(tab);
                        
                        var tempPaper=new Raphael(newDiv, 40, 10);
                        var extendButton=tempPaper.rect(0,0,10,10).attr({fill:"yellow"}); //extending the domain
                        extendButton.click(tempNode.extendNode);
                        var spliceButton=tempPaper.rect(20,0,10,10).attr({fill:"red"}); //splicing the domain
                        spliceButton.click(tempNode.spliceNode);
                      var my_div = document.getElementById("canvas");
                      document.body.insertBefore(newDiv, my_div);
                      tables[tempNode.id]=newDiv;
                    //selfRef.r.safari();
                }
            
        }else if(!selfRef.isDrag && modeClick==1){
            console.log("clicking to remove");
            modeClick=0;
             var keysTemp=Object.keys(thisGraph.nodes),tempNode;  
                    for(var i=0;i<keysTemp.length;i++){
                        tempNode=thisGraph.nodes[keysTemp[i]];/*
                        tempNode.shape[2].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();
                        tempNode.shape[3].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();
                        tempNode.shape[4].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();
                        tempNode.shape[5].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();*/
                        tempNode.shape[2].hide();
                    }     
                    edgeStart=null; 
                    edgePath && edgePath.hide();

        }
        
    };
    d.onmouseup = function () {
        selfRef.isDrag && selfRef.isDrag.set[0].animate({fill:"white", "fill-opacity": 1}, 50).toBack();
        selfRef.isDrag = false;
    };

    this.draw();
};


function hoverin(e){
                if(modeClick==0){
                    var keysTemp=Object.keys(thisGraph.nodes),tempNode;  
                    for(var i=0;i<keysTemp.length;i++){
                        if(this==thisGraph.nodes[keysTemp[i]].shape[0] || this==thisGraph.nodes[keysTemp[i]].shape[1] || this==thisGraph.nodes[keysTemp[i]].shape[2]){
                            tempNode=thisGraph.nodes[keysTemp[i]];
                            tempNode.shape[2].show();
                            break;
                        }/*
                        if(this==thisGraph.nodes[keysTemp[i]].shape[2] || this==thisGraph.nodes[keysTemp[i]].shape[3] || this==thisGraph.nodes[keysTemp[i]].shape[4] || this==thisGraph.nodes[keysTemp[i]].shape[5]){
                            this.attr({'stroke-width':4});
                            tempNode=thisGraph.nodes[keysTemp[i]];
                            
                            break;

                        }*/

                    }/*
                    tempNode.shape[2].attr({stroke:"black", fill:"yellow"}).toFront();
                    tempNode.shape[3].attr({stroke:"black", fill:"yellow"}).toFront();
                    tempNode.shape[4].attr({stroke:"black", fill:"yellow"}).toFront();
                    tempNode.shape[5].attr({stroke:"black", fill:"yellow"}).toFront();*/
                }else if(modeClick==1){ 
                    var keysTemp=Object.keys(thisGraph.nodes),tempNode;  
                    for(var i=0;i<keysTemp.length;i++){
                        if(this==thisGraph.nodes[keysTemp[i]].shape[0] || this==thisGraph.nodes[keysTemp[i]].shape[1] || this==thisGraph.nodes[keysTemp[i]].shape[2]){
                            tempNode=thisGraph.nodes[keysTemp[i]];
                            
                            break;
                        }/*
                        if(this==thisGraph.nodes[keysTemp[i]].shape[2] || this==thisGraph.nodes[keysTemp[i]].shape[3] || this==thisGraph.nodes[keysTemp[i]].shape[4] || this==thisGraph.nodes[keysTemp[i]].shape[5]){
                            this.attr({'stroke-width':4});
                            tempNode=thisGraph.nodes[keysTemp[i]];
                            
                            break;

                        }*/

                    }
                    tempNode!=edgeStart && tempNode.shape[0].attr({'stroke-width':4, stroke:"blue"});
                    
                }   
        }

 
        function hoverout(e){
                if(modeClick==0){
                    var keysTemp=Object.keys(thisGraph.nodes),tempNode;  
                    for(var i=0;i<keysTemp.length;i++){
                        if(this==thisGraph.nodes[keysTemp[i]].shape[0] || this==thisGraph.nodes[keysTemp[i]].shape[1] || this==thisGraph.nodes[keysTemp[i]].shape[2]){
                            tempNode=thisGraph.nodes[keysTemp[i]];
                            tempNode.shape[2].hide();
                            break;
                        }/*
                        if(this==thisGraph.nodes[keysTemp[i]].shape[2] || this==thisGraph.nodes[keysTemp[i]].shape[3] || this==thisGraph.nodes[keysTemp[i]].shape[4] || this==thisGraph.nodes[keysTemp[i]].shape[5]){
                            tempNode=thisGraph.nodes[keysTemp[i]];
                            
                            break;

                        }*/

                    }
                    /*                    
                    tempNode.shape[2].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();
                    tempNode.shape[3].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();
                    tempNode.shape[4].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();
                    tempNode.shape[5].attr({stroke:"white", fill:"white", 'stroke-width':2}).toBack();*/
                }else if(modeClick==1){ 
                    var keysTemp=Object.keys(thisGraph.nodes),tempNode;  
                    for(var i=0;i<keysTemp.length;i++){
                        if(this==thisGraph.nodes[keysTemp[i]].shape[0] || this==thisGraph.nodes[keysTemp[i]].shape[1] || this==thisGraph.nodes[keysTemp[i]].shape[2]){
                            tempNode=thisGraph.nodes[keysTemp[i]];
                            
                            break;
                        }/*
                        if(this==thisGraph.nodes[keysTemp[i]].shape[2] || this==thisGraph.nodes[keysTemp[i]].shape[3] || this==thisGraph.nodes[keysTemp[i]].shape[4] || this==thisGraph.nodes[keysTemp[i]].shape[5]){
                            this.attr({'stroke-width':4});
                            tempNode=thisGraph.nodes[keysTemp[i]];
                            
                            break;

                        }*/

                    }
                    tempNode.shape[0].attr({'stroke-width':2, stroke:"black"});
                    
                } 
        }


Graph.Renderer.Raphael.prototype = {
    translate: function(point) {
        return [
            (point[0] - this.graph.layoutMinX) * this.factorX + this.radius,
            (point[1] - this.graph.layoutMinY) * this.factorY + this.radius
        ];
    },

    rotate: function(point, length, angle) {
        var dx = length * Math.cos(angle);
        var dy = length * Math.sin(angle);
        return [point[0]+dx, point[1]+dy];
    },

    draw: function() {
        console.log("DRAWING");
        this.factorX = (this.width - 2 * this.radius) / (this.graph.layoutMaxX - this.graph.layoutMinX);
        this.factorY = (this.height - 2 * this.radius) / (this.graph.layoutMaxY - this.graph.layoutMinY);
        for (i in this.graph.nodes) {
            this.drawNode(this.graph.nodes[i]);
        }
        for (var i = 0; i < this.graph.edges.length; i++) {
            this.drawEdge(this.graph.edges[i]);
        }
    },

    drawNode: function(node) {
        var point = this.translate([node.layoutPosX, node.layoutPosY]);
        node.point = point;

        /* if node has already been drawn, move the nodes */
        if(node.shape) {
            var oBBox = node.shape.getBBox();
            var opoint = { x: oBBox.x + oBBox.width / 2, y: oBBox.y + oBBox.height / 2};
            node.shape.translate(Math.round(point[0] - opoint.x), Math.round(point[1] - opoint.y));
            this.r.safari();
            return node;
        }/* else, draw new nodes */

        var shape;

        /* if a node renderer function is provided by the user, then use it 
           or the default render function instead */
        if(!node.render) {
            node.render = function(r, node) {
                /* the default node drawing */
                var color = "white";
                var ellipse = r.circle(50, 50,30).attr({fill: color, stroke: "black", "stroke-width": 2}).toBack();
                var circleSurround=r.circle(50,50,30).attr({stroke:"blue", 'stroke-width':5}).hide();
                /* set DOM node ID */
                ellipse.node.id = node.label || node.id;
                shape = r.set().
                    push(ellipse).
                    push(r.text(50, 50, node.label || node.id).attr({"font": "22px Fontin-Sans, Arial", "font-weight": "bold"})).push(circleSurround); //push(r.circle(80,50,6).attr({stroke:"white"})).push(r.circle(20,50,6).attr({stroke:"white"})).push(r.circle(50,80,6).attr({stroke:"white"})).push(r.circle(50,20,6).attr({stroke:"white"}));
                return shape;
            }
        }
        /* or check for an ajax representation of the nodes */
        if(node.shapes) {
            // TODO ajax representation evaluation
        }

        shape = node.render(this.r, node).hide();
        shape.attr({"fill-opacity": .6});
        /* re-reference to the node an element belongs to, needed for dragging all elements of a node */
        shape.items.forEach(function(item){ item.set = shape; item.node.style.cursor = "move"; });
        shape[2].node.style.cursor="crosshair";
        shape[1].node.style.cursor="text";
        shape[0].mousedown(this.dragger);
        shape[1].mousedown(this.dragger);
        shape[0].mouseup(this.mouseUpFunction);
        shape[1].mouseup(this.mouseUpFunction);
        shape[0].mouseup(this.edgeDrop);
        shape[2].mousedown(function(e){
            modeClick=1;
            startEdgex=e.clientX-10;
            startEdgey=e.clientY-100;
            var keysTemp=Object.keys(thisGraph.nodes);
                    for(var i=0;i<keysTemp.length;i++){
                        if(this==thisGraph.nodes[keysTemp[i]].shape[2]){
                            edgeStart=thisGraph.nodes[keysTemp[i]];
                            
                            break;
                        }
                    

                    }
                    console.log("drawing edge clicker");
        });/*
        shape[3].mousedown(function(){
            modeClick=1;
            startEdge=3;
                var keysTemp=Object.keys(thisGraph.nodes);

                for(var i=0;i<keysTemp.length;i++){
                        if(this==thisGraph.nodes[keysTemp[i]].shape[0] || this==thisGraph.nodes[keysTemp[i]].shape[1]){
                            edgeStart=thisGraph.nodes[keysTemp[i]];
                            
                            break;
                        }
                        if(this==thisGraph.nodes[keysTemp[i]].shape[2] || this==thisGraph.nodes[keysTemp[i]].shape[3] || this==thisGraph.nodes[keysTemp[i]].shape[4] || this==thisGraph.nodes[keysTemp[i]].shape[5]){
                            edgeStart=thisGraph.nodes[keysTemp[i]];
                            
                            break;

                        }

                    }
        });
        shape[4].mousedown(function(){
            modeClick=1;
            startEdge=4;
                var keysTemp=Object.keys(thisGraph.nodes);

               for(var i=0;i<keysTemp.length;i++){
                        if(this==thisGraph.nodes[keysTemp[i]].shape[0] || this==thisGraph.nodes[keysTemp[i]].shape[1]){
                            edgeStart=thisGraph.nodes[keysTemp[i]];
                            
                            break;
                        }
                        if(this==thisGraph.nodes[keysTemp[i]].shape[2] || this==thisGraph.nodes[keysTemp[i]].shape[3] || this==thisGraph.nodes[keysTemp[i]].shape[4] || this==thisGraph.nodes[keysTemp[i]].shape[5]){
                            edgeStart=thisGraph.nodes[keysTemp[i]];
                            
                            break;

                        }

                    }
        });
        shape[5].mousedown(function(){
            modeClick=1;
            startEdge=5;
                var keysTemp=Object.keys(thisGraph.nodes);

                for(var i=0;i<keysTemp.length;i++){
                        if(this==thisGraph.nodes[keysTemp[i]].shape[0] || this==thisGraph.nodes[keysTemp[i]].shape[1]){
                            edgeStart=thisGraph.nodes[keysTemp[i]];
                            
                            break;
                        }
                        if(this==thisGraph.nodes[keysTemp[i]].shape[2] || this==thisGraph.nodes[keysTemp[i]].shape[3] || this==thisGraph.nodes[keysTemp[i]].shape[4] || this==thisGraph.nodes[keysTemp[i]].shape[5]){
                            edgeStart=thisGraph.nodes[keysTemp[i]];
                            
                            break;

                        }

                    }
        });
        */
        shape.hover(hoverin,hoverout);
        
        var box = shape.getBBox();
        shape.translate(Math.round(point[0]-(box.x+box.width/2)),Math.round(point[1]-(box.y+box.height/2)))
        //console.log(box,point);
        node.hidden || shape.show();
        shape[2].hide();
        node.shape = shape;
    },
    drawEdge: function(edge) {
        console.log("DRAWING EDGE");
        /* if this edge already exists the other way around and is undirected */
        if(edge.backedge)
            return;
        if(edge.source.hidden || edge.target.hidden) {
            edge.connection && edge.connection.fg.hide() | edge.connection.bg && edge.connection.bg.hide();
            return;
        }

        /* if edge already has been drawn, only refresh the edge */
        if(!edge.connection) {
            edge.style && edge.style.callback && edge.style.callback(edge); // TODO move this somewhere else
            edge.connection = this.r.connection(edge.source.shape, edge.target.shape, edge.style);
            console.log(edge.connection.draw());
            return;
        }
        //FIXME showing doesn't work well
        edge.connection.fg.show();
        edge.connection.bg && edge.connection.bg.show();
        edge.connection.draw();
        
    }
};
Graph.Layout = {};

Graph.Layout.Spring = function(graph) {
    this.graph = graph;
    this.iterations = 500;
    this.maxRepulsiveForceDistance = 6;
    this.k = 2;
    this.c = 0.01;
    this.maxVertexMovement = 0.5;
    this.layout();
};
Graph.Layout.Spring.prototype = {
    layout: function() {
        this.layoutPrepare();
        for (var i = 0; i < this.iterations; i++) {
            this.layoutIteration();
        }
        this.layoutCalcBounds();
    },
    
    layoutPrepare: function() {
        for (i in this.graph.nodes) {
            var node = this.graph.nodes[i];
            node.layoutPosX = 0;
            node.layoutPosY = 0;
            node.layoutForceX = 0;
            node.layoutForceY = 0;
        }
        
    },
    
    layoutCalcBounds: function() {
        var minx = Infinity, maxx = -Infinity, miny = Infinity, maxy = -Infinity;

        for (i in this.graph.nodes) {
            var x = this.graph.nodes[i].layoutPosX;
            var y = this.graph.nodes[i].layoutPosY;
            
            if(x > maxx) maxx = x;
            if(x < minx) minx = x;
            if(y > maxy) maxy = y;
            if(y < miny) miny = y;
        }

        this.graph.layoutMinX = minx;
        this.graph.layoutMaxX = maxx;
        this.graph.layoutMinY = miny;
        this.graph.layoutMaxY = maxy;
    },
    
    layoutIteration: function() {
        // Forces on nodes due to node-node repulsions

        var prev = new Array();
        for(var c in this.graph.nodes) {
            var node1 = this.graph.nodes[c];
            for (var d in prev) {
                var node2 = this.graph.nodes[prev[d]];
                this.layoutRepulsive(node1, node2);
                
            }
            prev.push(c);
        }
        
        // Forces on nodes due to edge attractions
        for (var i = 0; i < this.graph.edges.length; i++) {
            var edge = this.graph.edges[i];
            this.layoutAttractive(edge);             
        }
        
        // Move by the given force
        for (i in this.graph.nodes) {
            var node = this.graph.nodes[i];
            var xmove = this.c * node.layoutForceX;
            var ymove = this.c * node.layoutForceY;

            var max = this.maxVertexMovement;
            if(xmove > max) xmove = max;
            if(xmove < -max) xmove = -max;
            if(ymove > max) ymove = max;
            if(ymove < -max) ymove = -max;
            
            node.layoutPosX += xmove;
            node.layoutPosY += ymove;
            node.layoutForceX = 0;
            node.layoutForceY = 0;
        }
    },

    layoutRepulsive: function(node1, node2) {
        if (typeof node1 == 'undefined' || typeof node2 == 'undefined')
            return;
        var dx = node2.layoutPosX - node1.layoutPosX;
        var dy = node2.layoutPosY - node1.layoutPosY;
        var d2 = dx * dx + dy * dy;
        if(d2 < 0.01) {
            dx = 0.1 * Math.random() + 0.1;
            dy = 0.1 * Math.random() + 0.1;
            var d2 = dx * dx + dy * dy;
        }
        var d = Math.sqrt(d2);
        if(d < this.maxRepulsiveForceDistance) {
            var repulsiveForce = this.k * this.k / d;
            node2.layoutForceX += repulsiveForce * dx / d;
            node2.layoutForceY += repulsiveForce * dy / d;
            node1.layoutForceX -= repulsiveForce * dx / d;
            node1.layoutForceY -= repulsiveForce * dy / d;
        }
    },

    layoutAttractive: function(edge) {
        var node1 = edge.source;
        var node2 = edge.target;
        
        var dx = node2.layoutPosX - node1.layoutPosX;
        var dy = node2.layoutPosY - node1.layoutPosY;
        var d2 = dx * dx + dy * dy;
        if(d2 < 0.01) {
            dx = 0.1 * Math.random() + 0.1;
            dy = 0.1 * Math.random() + 0.1;
            var d2 = dx * dx + dy * dy;
        }
        var d = Math.sqrt(d2);
        if(d > this.maxRepulsiveForceDistance) {
            d = this.maxRepulsiveForceDistance;
            d2 = d * d;
        }
        var attractiveForce = (d2 - this.k * this.k) / this.k;
        if(edge.attraction == undefined) edge.attraction = 1;
        attractiveForce *= Math.log(edge.attraction) * 0.5 + 1;
        
        node2.layoutForceX -= attractiveForce * dx / d;
        node2.layoutForceY -= attractiveForce * dy / d;
        node1.layoutForceX += attractiveForce * dx / d;
        node1.layoutForceY += attractiveForce * dy / d;
    }
};

Graph.Layout.Ordered = function(graph, order) {
    this.graph = graph;
    this.order = order;
    this.layout();
};
Graph.Layout.Ordered.prototype = {
    layout: function() {
        this.layoutPrepare();
        this.layoutCalcBounds();
    },
    
    layoutPrepare: function(order) {
        for (i in this.graph.nodes) {
            var node = this.graph.nodes[i];
            node.layoutPosX = 0;
            node.layoutPosY = 0;
        }
            var counter = 0;
            for (i in this.order) {
                var node = this.order[i];
                node.layoutPosX = counter;
                node.layoutPosY = Math.random();
                counter++;
            }
    },
    
    layoutCalcBounds: function() {
        var minx = Infinity, maxx = -Infinity, miny = Infinity, maxy = -Infinity;

        for (i in this.graph.nodes) {
            var x = this.graph.nodes[i].layoutPosX;
            var y = this.graph.nodes[i].layoutPosY;
            
            if(x > maxx) maxx = x;
            if(x < minx) minx = x;
            if(y > maxy) maxy = y;
            if(y < miny) miny = y;
        }

        this.graph.layoutMinX = minx;
        this.graph.layoutMaxX = maxx;

        this.graph.layoutMinY = miny;
        this.graph.layoutMaxY = maxy;
    }
};


function hideAllInstructions(){
    $("#gettingStarted").hide();
    $("#queriesInstruc").hide();
    $("#solvingInstructions").hide();
    $("#variableEliminationInstructions").hide();
}



/*
 * usefull JavaScript extensions, 
 */

function log(a) {console.log&&console.log(a);}

/*
 * Raphael Tooltip Plugin
 * - attaches an element as a tooltip to another element
 *
 * Usage example, adding a rectangle as a tooltip to a circle:
 *
 *      paper.circle(100,100,10).tooltip(paper.rect(0,0,20,30));
 *
 * If you want to use more shapes, you'll have to put them into a set.
 *
 */
Raphael.el.tooltip = function (tp) {
    this.tp = tp;
    this.tp.o = {x: 0, y: 0};
    this.tp.hide();
    this.hover(
        function(event){ 
            this.mousemove(function(event){ 
                this.tp.translate(event.clientX - 
                                  this.tp.o.x,event.clientY - this.tp.o.y);
                this.tp.o = {x: event.clientX, y: event.clientY};
            });
            this.tp.show().toFront();
        }, 
        function(event){
            this.tp.hide();
            this.unmousemove();
        });
    return this;
};

/* For IE */
if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        fun.call(thisp, this[i], i, this);
    }
  };
}