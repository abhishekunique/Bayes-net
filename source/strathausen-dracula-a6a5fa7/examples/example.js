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
        var nodeName=prompt("enter name of variable in node", nodeName).replace(/ /g,'');
        var flagger=0;
        if(nodeName && nodesUsed[nodeName]==1){
            flagger=1;
            if(nodesUsed[nodeName]){
                alert("A node of this name has already been used");
            }
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
        $("#instructionsshower").hide();
        $('#watermark').css("opacity", 0.1);
         $('#cssmenu').css("opacity", 0.1);
                      $('#inferenceMenuTop').css("opacity", 0.1); 
                      $('#top1').css("opacity", 0.1);
                      $('#showMenu').css("opacity", 0.1);
                      $('#top2').css("opacity", 0.1); 
                      $('#loadNet').css("opacity", 0.1);
                      $('#saveNet').css("opacity", 0.1); 
                      $('#loadNet1').css("opacity", 0.1);
                      $('#saveNet1').css("opacity", 0.1);
                      $('#dSepMenu').css("opacity", 0.1);
                      $('#reset').css("opacity", 0.1);        
                      $('#issues').css("opacity", 0.1);                 
                      $('#mode').attr("disabled", "disabled");                 
                      $('#loadNet').attr("disabled", "disabled");     
                      $('#clearCanvas').attr("disabled", "disabled");
                      $('#inferenceMenu').attr("disabled", "disabled");  
                      $('#getInferenceValue').attr("disabled", "disabled");               
                      $('#downloadify').hide();
                      $("#issues").hide(); 
                      modeClick=-1;
        $("#textOver").attr('disabled','disabled');
        inferenceInstructions.hide();
        tempinferenceInstructions=buttonPaperRaphael.text(445,40,inferenceInstructions.attr("text")).attr({"font-size": 40});
        var keysTemp=Object.keys(thisGraph.nodes);
        for(var i=0;i<keysTemp.length;i++){
            console.log(thisGraph.nodes[keysTemp[i]]);
        }
        var counter=0;
        $("#inferenceMenu").attr('disabled','disabled');
        $("#getInferenceValue").attr('disabled','disabled');
        finalFactors=[];
        var allTables=[];
        var boxes=[];
        var sumFlag=0;
        console.log("VARIABLE VERBOSE");
        $('#canvas').css("opacity", 0.1);
        $('#instructions').css("opacity", 0.1);
                      closeButtonBrief=document.createElement('input');
                      closeButtonBrief.type ="button";
                      closeButtonBrief.value=" X ";
                      closeButtonBrief.style.position='absolute';
                      closeButtonBrief.style.top="100px";
                      closeButtonBrief.style.left="50px";
                      closeButtonBrief.style.zIndex="800";
                      closeButtonBrief.id="closeButtonVariable";
                      closeButtonBrief.style.backgroundColor="red";
                      var my_div = document.getElementById("canvas");
                      
                      document.body.insertBefore(closeButtonBrief, my_div);
                      $(closeButtonBrief).click(function(){
                        console.log("CLOSE BUTTON");
                          $('#canvas').css("opacity",1);
                          $("#instructionsshower").show();
                           $('#watermark').css("opacity", 1);
                          $('#cssmenu').css("opacity", 1);
                          $('#inferenceMenuTop').css("opacity", 1); 
                          $('#top1').css("opacity", 1);
                          $('#showMenu').css("opacity", 1);
                          $('#top2').css("opacity", 1); 
                          $('#loadNet').css("opacity", 1);
                          $('#saveNet').css("opacity", 1); 
                          $('#loadNet1').css("opacity", 1);
                          $('#saveNet1').css("opacity", 1);
                          $('#dSepMenu').css("opacity", 1);
                          $('#reset').css("opacity", 1);        
                          $('#issues').css("opacity", 1);                 
                          $('#mode').attr("disabled", "");       
                          $('#inferenceMenu').attr("disabled", "");  
                          $('#getInferenceValue').attr("disabled", "");               
                          $("#issues").show(); 
                          modeClick=4;
                          $("#textOver").attr('disabled','');
                          $('#instructions').css("opacity", 1);
                          $("#nextButtonVariable").remove();
                                            
                          $("#closeButtonVariable").remove();
                          for(var i=0;i<allTables.length;i++){
                            for(var j=0;j<allTables[i].length;j++){
                                allTables[i][j].style.display="none";
                                $(allTables[i][j]).remove();
                            }
                          }

                          for(var j=0;j<boxes.length;j++){
                                $(boxes[j]).remove();
                            }

                          $(arrow1div).remove();
                          $(joiner).remove();
                           $("#inferenceMenu").attr('disabled','');
                           $("#getInferenceValue").attr('disabled','');
                           $("#textOver").hide();
                            inferenceInstructions.show();
                            tempinferenceInstructions.remove();
                      });

        var keysTemp=Object.keys(thisGraph.nodes); 
        var maxTable=0;
        for(var h=0;h<keysTemp.length;h++){
            if(thisGraph.nodes[keysTemp[h]].table.length>maxTable){
                maxTable=thisGraph.nodes[keysTemp[h]].table.length;
            }
        }
                    
        console.log(keysTemp);
        var xPos=100;
        allTables[0]=[];
        for(var i=0;i<keysTemp.length;i++){
                    var newDiv1 = document.createElement("div");
                    newDiv1.style.position='absolute';
                    newDiv1.style.top="150px";
                        console.log((150+thisGraph.nodes[keysTemp[i]].table[0].length*100));
                        if(i!=0){
                            xPos+=thisGraph.nodes[keysTemp[i-1]].table[0].length*50+50;
                            newDiv1.style.left=(xPos)+"px";
                            
                        }else{
                            newDiv1.style.left="100px";
                        }
                        console.log(xPos);  
                    newDiv1.style.zIndex="1000";
                    newDiv1.id="newDiv1";

                        var parentsOfThis="";
                        for(var j=0;j<thisGraph.nodes[keysTemp[i]].parents.length;j++){
                            if(j!=0){
                                parentsOfThis+=" ,";

                            }else{
                                parentsOfThis+=" |";
                            }
                            parentsOfThis+=thisGraph.nodes[keysTemp[i]].parents[j].id;
                        }
                         var newDiv2 = document.createElement("div");
                         newDiv2.style.fontSize="25";
                         newDiv2.style.fontWeight="bold";
                         newDiv2.style.position="relative";
                         newDiv2.style.top="-10px";

                         newDiv2.style.left=(thisGraph.nodes[keysTemp[i]].table[0].length*50/2)+"px";
                         cont=document.createTextNode("P("+keysTemp[i]+parentsOfThis+")");
                       
                         newDiv2.appendChild(cont);
                         newDiv1.appendChild(newDiv2);
                        row=new Array();
                        cell=new Array();

                        row_num=12; //edit this value to suit
                        cell_num=12; //edit this value to suit

                        tab=document.createElement('table');
                        tab.border="1";
                        tab.style.borderCollapse="collapse";
                        tab.style.cellPadding="10";
                        tab.setAttribute('id','newtable');

                        tbo=document.createElement('tbody');
                        row[0]=document.createElement('tr');
                        for(k=0;k<thisGraph.nodes[keysTemp[i]].table[0].length;k++) {
                                cell[k]=document.createElement('td');
                                cell[k].setAttribute("style","background-color: #003366; color:#ffffff; text-align:center;");

                                cont=document.createTextNode(thisGraph.nodes[keysTemp[i]].table[0][k]);
                                cell[k].appendChild(cont);
                                row[0].appendChild(cell[k]);
                        }
            
                        tbo.appendChild(row[0]);
                        for(c=1;c<thisGraph.nodes[keysTemp[i]].table.length;c++){
                            row[c]=document.createElement('tr');
                            for(k=0;k<thisGraph.nodes[keysTemp[i]].table[c].length;k++) {
                                cell[k]=document.createElement('td');
                                if(k==thisGraph.nodes[keysTemp[i]].table[c].length-1){
                                    cont=document.createTextNode(thisGraph.nodes[keysTemp[i]].table[c][k].toFixed(3));
                                }else{
                                    cont=document.createTextNode(thisGraph.nodes[keysTemp[i]].table[c][k]);
                                }

                                cell[k].appendChild(cont);
                                if(k==thisGraph.nodes[keysTemp[i]].table[c].length-1){
                                    cell[k].style.paddingLeft="10px";
                                    cell[k].style.paddingRight="10px";
                                }
                                row[c].appendChild(cell[k]);
                            }

                            tbo.appendChild(row[c]);
                        }
                        
                        tab.appendChild(tbo);
                        
                        
                        newDiv1.appendChild(tab);
                        
                      var my_div = document.getElementById("canvas");

                      document.body.insertBefore(newDiv1, my_div);
                      allTables[0].push(newDiv1);

        }  
        arrows=[];
        var indexCounter=0;
        var xPos=100;
        allTables[1]=[];
          temp=document.createElement('div');
                      temp.style.position='absolute';
                      temp.style.top=(170+maxTable*30)+"px";
                      temp.style.left="100px";
                      temp.style.zIndex="1400";
                      temp.id="temp"+indexCounter;
                      var my_div = document.getElementById("canvas");
                      document.body.insertBefore(temp, my_div);
                      var arrow1divPaper=new Raphael(("temp"+indexCounter), 300, 400);
                      var arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (30)+" "+90+"M"+(20)+" "+80+"L"+(30)+" "+90+"L"+(40)+" "+80).attr({'stroke-width': 3});
                      var text0=arrow1divPaper.text((90), 70, "SELECT").attr({"font-size":"15px"});
                      temp.style.display="none";
                      allTables[1].push(temp);
                      indexCounter++;
                      var maxTable1=0;
        for(var i=0;i<keysTemp.length;i++){

                        var a=new Object();
                        a.table=thisGraph.nodes[keysTemp[i]].table.slice();
                        a.vars=[thisGraph.nodes[keysTemp[i]].id];
                        a.parentNodes=[];
                        for(var j=0;j<thisGraph.nodes[keysTemp[i]].parents.length;j++){
                            a.parentNodes.push(thisGraph.nodes[keysTemp[i]].parents[j].id)
                        }
                        var evidenceSelected=(selectOnEvidence(a,inferenceObserved));           
                    
                    var newDiv1 = document.createElement("div");
                    
                    
                        if(evidenceSelected.table.length>maxTable1){
                            maxTable1=evidenceSelected.table.length;
                        }
                    
                    newDiv1.style.position='absolute';
                    newDiv1.style.top=(300+maxTable*30)+"px";
                        
                        var parentsOfThis="";
                        for(var j=0;j<thisGraph.nodes[keysTemp[i]].parents.length;j++){
                            if(j!=0){
                                parentsOfThis+=" ,";
                            }else{
                                parentsOfThis+=" |";
                            }
                            if(!inferenceObserved[thisGraph.nodes[keysTemp[i]].parents[j].id]){
                                parentsOfThis+=thisGraph.nodes[keysTemp[i]].parents[j].id;
                            }else{
                                 parentsOfThis+=inferenceObserved[thisGraph.nodes[keysTemp[i]].parents[j].id];
                            }
                        }
                         var newDiv2 = document.createElement("div");
                         newDiv2.style.fontSize="25";
                         newDiv2.style.fontWeight="bold";
                         newDiv2.style.position="relative";
                         newDiv2.style.top="-10px";
                         newDiv2.style.left=(thisGraph.nodes[keysTemp[i]].table[0].length*50/2)+"px";
                         if(!inferenceObserved[keysTemp[i]]){
                            cont=document.createTextNode("P("+keysTemp[i]+parentsOfThis+")");
                        }else{
                            cont=document.createTextNode("P("+inferenceObserved[keysTemp[i]]+parentsOfThis+")");
                        }
                       
                         newDiv2.appendChild(cont);
                         newDiv1.appendChild(newDiv2);

                        console.log((150+thisGraph.nodes[keysTemp[i]].table[0].length*100));
                        if(i!=0){
                            xPos+=thisGraph.nodes[keysTemp[i-1]].table[0].length*50+50;
                            newDiv1.style.left=(xPos)+"px";
                            
                        }else{
                            newDiv1.style.left="100px";
                        }
                        
                    newDiv1.style.zIndex="1000";
                    newDiv1.id="newDiv1";
                        row=new Array();
                        cell=new Array();

                        row_num=12; //edit this value to suit
                        cell_num=12; //edit this value to suit

                        tab=document.createElement('table');
                        tab.border="1";
                        tab.style.borderCollapse="collapse";
                        tab.style.cellPadding="10";
                        tab.setAttribute('id','newtable');

                        tbo=document.createElement('tbody');
                        row[0]=document.createElement('tr');
                        for(k=0;k<thisGraph.nodes[keysTemp[i]].table[0].length;k++) {
                                cell[k]=document.createElement('td');
                                cell[k].setAttribute("style","background-color: #003366; color:#ffffff; text-align:center;");

                                cont=document.createTextNode(thisGraph.nodes[keysTemp[i]].table[0][k]);
                                cell[k].appendChild(cont);
                                row[0].appendChild(cell[k]);
                        }
            
                        tbo.appendChild(row[0]);
                        for(c=1;c<evidenceSelected.table.length;c++){
                            row[c]=document.createElement('tr');
                            for(k=0;k<evidenceSelected.table[c].length;k++) {
                                cell[k]=document.createElement('td');
                                if(k==evidenceSelected.table[c].length-1){
                                    cont=document.createTextNode(evidenceSelected.table[c][k].toFixed(3));
                                }else{
                                    cont=document.createTextNode(evidenceSelected.table[c][k]);
                                }

                                cell[k].appendChild(cont);
                                if(k==thisGraph.nodes[keysTemp[i]].table[c].length-1){
                                    cell[k].style.paddingLeft="10px";
                                    cell[k].style.paddingRight="10px";
                                }
                                row[c].appendChild(cell[k]);
                            }

                            tbo.appendChild(row[c]);
                        }
                        
                        tab.appendChild(tbo);
                        
                        
                        newDiv1.appendChild(tab);
                        
                      var my_div = document.getElementById("canvas");

                      document.body.insertBefore(newDiv1, my_div);
                      
                      allTables[1].push(newDiv1);

                      newDiv1.style.display="none";
        }  
                        
                    



            var keysTemp=Object.keys(thisGraph.nodes); 
            var vars=[];
            for(var i=0;i<keysTemp.length;i++){
                vars.push(thisGraph.nodes[keysTemp[i]].id);
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
            //makeshift
            var posy=450+maxTable*30+maxTable1*30;
            var rowCounter=2;
            var hiddenVars=[];
            var remainingHidden=[];
            for(var i=0;i<vars.length;i++){
                if(!inferenceObserved[keysTemp[i]] && !inferenceObservedQueries[keysTemp[i]]){
                    hiddenVars.push(keysTemp[i]);
                    remainingHidden.push(keysTemp[i]);
                }
            }
            console.log(hiddenVars);

            nextButton=document.createElement('input');
            nextButton.type ="button";
            nextButton.style.backgroundColor="#CCCCCC";
            nextButton.value=" Next ";
            nextButton.style.position='absolute';
            nextButton.style.top=(230+maxTable*30)+"px";
            nextButton.style.left="10px";
            nextButton.style.zIndex="1500";
            nextButton.id="nextButtonVariable";

            arrow1div=document.createElement('div');

            arrow1div.style.position='absolute';
            arrow1div.style.top=(160+maxTable*30)+"px";
            arrow1div.style.left="250px";
            arrow1div.style.zIndex="1400";
           arrow1div.id="arrow1div"+counter;
            var my_div = document.getElementById("canvas");
            document.body.insertBefore(arrow1div, my_div);
            var arrow1divPaper=new Raphael(('arrow1div'+counter), 800, 400);
            arrow1divPaper.rect(30,50,640, 50);
            
            var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px","text-anchor":"start"});
            variables="HIDDEN : ";
            text1.attr("text", variables);
            for(var i=0;i<hiddenVars.length;i++){
                variables="";
                if(i!=0){
                    variables+=",";
                }
                variables+=hiddenVars[i];
                arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px","text-anchor":"start"});
            }
            
            var text2=arrow1divPaper.text((60),70, "").attr({"font-size":"25px", "text-anchor":"start"});
            
            text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
            counter++;
            boxes.push(arrow1div);
            var my_div = document.getElementById("canvas");
            var flagStagger=false;
            document.body.insertBefore(nextButton, my_div);

            /*for(var j=0;j<allTables.length;j++){
                for(var i=0;i<allTables[j].length;i++){
                                    allTables[j][i].style.display="none";
                }
            }*/
            eliminateCount=1;
            var flagJoin=false;
            var nextType="T";
            var arrowShow=true;
            var arrowCounter=1;
            var joinText;
                      var stepCount=0;
                      $(nextButton).click(function(){
                        if(nextType=="T"){
                            console.log("INSIDE T");
                            if(stepCount==0){
                                $("#temp0").show();
                                stepCount++;
                            }else if(stepCount==1){
                                for(var i=0;i<allTables[stepCount].length;i++){
                                    allTables[stepCount][i].style.display="block";
                                }
                                document.getElementById("nextButtonVariable").style.top=(posy-70)+"px";

                                stepCount++;
                                nextType="S";
                                //arrow1div.style.top=(posy+20)+"px"


                                arrow1div=document.createElement('div');
                                arrow1div.style.position='absolute';
                                arrow1div.style.top=(posy-125)+"px";
                                arrow1div.style.left="250px";
                                arrow1div.style.zIndex="1400";
                                arrow1div.id="arrow1div"+counter;
                                var my_div = document.getElementById("canvas");
                                document.body.insertBefore(arrow1div, my_div);
                                var arrow1divPaper=new Raphael('arrow1div'+counter, 800, 400);
                                counter++;
                                arrow1divPaper.rect(30,50,640, 50);
                        
                                 var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px","text-anchor":"start"});
                                variables="HIDDEN : ";
                                text1.attr("text", variables);
                                for(var i=0;i<hiddenVars.length;i++){
                                    variables="";
                                    if(i!=0){
                                        variables+=" ,";
                                    }
                                    variables+=hiddenVars[i];
                                    arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", "text-anchor":"start"});
                                }
                                var text2=arrow1divPaper.text((60),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                
                                text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
                                boxes.push(arrow1div);

                                if(hiddenVars.length==0){
                                    flagJoin=true;
                                    nextType="T";
                                    console.log("NO HIDDEN VARIABLES");
                                }








                            }else if(flagJoin){
                                for(var k=0;k<finalFactors.length;k++){
                                            
                                                console.log("FILLLING");
                                                for(var i=1;i<$($(allTables[rowCounter-1][k+1]).children()[1]).children().children().length;i++){
                                                   
                                                    for(var j=0;j<$($($(allTables[rowCounter-1][k+1]).children()[1]).children().children()[i]).children().length;j++){
                                                        $($($(allTables[rowCounter-1][k+1]).children()[1]).children().children()[i]).children()[j].style.backgroundColor="#CCCCCC";
                                                    }
                                                }
                                }
                                console.log(finalFactors.slice());
                                var inferenceKeys=Object.keys(inferenceObservedQueries);
                                console.log(inferenceKeys);
                                for(var i=0;i<inferenceKeys.length;i++){
                                    thisGraph.nodes[inferenceKeys[i]].variableJoin();
                                }

                                var inferenceKeys=Object.keys(inferenceObserved);
                                console.log(inferenceKeys);
                                for(var i=0;i<inferenceKeys.length;i++){
                                    thisGraph.nodes[inferenceKeys[i]].variableJoin();
                                }

                                //thisGraph.nodes["A"].variableJoin();
                                //thisGraph.nodes["C"].variableJoin();
                                console.log(finalFactors.slice());
                                console.log(finalFactors.length);
                                console.log(allTables);

                                while(finalFactors.length>1){
                                    first=finalFactors[0];
                                    second=finalFactors[1];
                                    finalFactors.splice(0,1);
                                    finalFactors.splice(0,1);
                                    var tempCombined=[];
                                    var firstTop=first.table[0].slice(0,first.table[0].length-1);
                                    var secondTop=second.table[0].slice(0,second.table[0].length-1);
                                    console.log(firstTop);
                                    console.log(secondTop);
                                    tempCombined.push(firstTop.concat(secondTop).concat(["P"]));
                                    
                                    for(var i=1;i<first.table.length;i++){
                                        for(j=1;j<second.table.length;j++){
                                            var valueEnd=first.table[i][first.table[i].length-1]*second.table[j][second.table[j].length-1];
                                            console.log(valueEnd);
                                            
                                            
                                            tempCombined.push(first.table[i].slice(0,first.table[i].length-1).concat(second.table[j].slice(0,second.table[j].length-1)).concat([valueEnd]));
                                        }
                                    }
                                    
                                    console.log(first);
                                    console.log(second);

                                    var finalJointObject=new Object();
                                    finalJointObject.table=tempCombined.slice();
                                    finalJointObject.vars=first.vars.concat(second.vars);
                                    finalFactors.push(finalJointObject);
                                }

                                consideredFactor=finalFactors[0];
                                allTables[rowCounter]=[];
                                          temp=document.createElement('div');
                                          temp.style.position='absolute';
                                          temp.style.top=(posy-130)+"px";
                                          temp.style.left="100px";
                                          temp.style.zIndex="1400";
                                          temp.id="temp"+indexCounter;
                                          var my_div = document.getElementById("canvas");
                                          document.body.insertBefore(temp, my_div);
                                          var arrow1divPaper=new Raphael(("temp"+indexCounter), 300, 400);
                                          var arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (30)+" "+90+"M"+(20)+" "+80+"L"+(30)+" "+90+"L"+(40)+" "+80).attr({'stroke-width': 3});
                                          var text0=arrow1divPaper.text((110), 70, "JOIN REMAINING").attr({"font-size":"15px"});
                                          allTables[rowCounter].push(temp);
                                          indexCounter++;

                                var newDiv1 = document.createElement("div");
                                newDiv1.style.position='absolute';
                                newDiv1.style.top=posy+"px";
                                
                                           
                                            //arrow1div.style.top=(posy+100+maxTable*30)+"px";


                                                arrow1div=document.createElement('div');
            






                                newDiv1.style.left="100px";
                                newDiv1.style.zIndex="1000";
                                newDiv1.id="newDiv1";


                        var variablesThis="";
                        for(var j=0;j<consideredFactor.vars.length;j++){
                            if(j!=0){
                                variablesThis+=" ,";

                            }
                            if(!inferenceObserved[consideredFactor.vars[j]]){
                                variablesThis+=consideredFactor.vars[j];
                            }else{
                                 variablesThis+=inferenceObserved[consideredFactor.vars[j]];
                            }
                        }
                         var newDiv2 = document.createElement("div");
                         newDiv2.style.fontSize="25";
                         newDiv2.style.fontWeight="bold";
                         newDiv2.style.position="relative";
                         newDiv2.style.top="-10px";
                         newDiv2.style.left=(consideredFactor.table[0].length*50/2)+"px";
    
                            cont=document.createTextNode("f("+variablesThis+")");
                       
                       
                         newDiv2.appendChild(cont);
                         newDiv1.appendChild(newDiv2);







                                    row=new Array();
                                    cell=new Array();

                                    row_num=12; //edit this value to suit
                                    cell_num=12; //edit this value to suit

                                    tab=document.createElement('table');
                                    tab.border="1";
                                    tab.style.borderCollapse="collapse";
                                    tab.style.cellPadding="10";
                                    tab.setAttribute('id','newtable');

                                    tbo=document.createElement('tbody');
                                    row[0]=document.createElement('tr');
                                    for(k=0;k<consideredFactor.table[0].length;k++) {
                                            cell[k]=document.createElement('td');
                                            cell[k].setAttribute("style","background-color: #003366; color:#ffffff; text-align:center;");

                                            cont=document.createTextNode(consideredFactor.table[0][k]);
                                            cell[k].appendChild(cont);
                                            row[0].appendChild(cell[k]);
                                    }
                        
                                    tbo.appendChild(row[0]);
                                    for(c=1;c<consideredFactor.table.length;c++){
                                        row[c]=document.createElement('tr');
                                        for(k=0;k<consideredFactor.table[c].length;k++) {
                                            cell[k]=document.createElement('td');
                                            cell[k].style.backgroundColor="#CCCCCC";
                                            if(k==consideredFactor.table[c].length-1){
                                                cont=document.createTextNode(consideredFactor.table[c][k].toFixed(3));
                                            }else{
                                                cont=document.createTextNode(consideredFactor.table[c][k]);
                                            }
                                            

                                            cell[k].appendChild(cont);
                                            if(k==consideredFactor.table[c].length-1){
                                                cell[k].style.paddingLeft="10px";
                                                cell[k].style.paddingRight="10px";
                                            }
                                            row[c].appendChild(cell[k]);
                                        }

                                        tbo.appendChild(row[c]);
                                    }
                                    
                                    tab.appendChild(tbo);
                                    
                                    
                                    newDiv1.appendChild(tab);
                                    document.getElementById("nextButtonVariable").style.top=(posy+consideredFactor.table.length*30)+"px";
                                  var my_div = document.getElementById("canvas");

                                  document.body.insertBefore(newDiv1, my_div);
                                  
                                  allTables[rowCounter].push(newDiv1);

                                  rowCounter++;
                                        flagJoin=false;
                            }else{
                                            for(var k=0;k<allTables[rowCounter-2].length;k++){
                                                
                                                    for(var i=1;i<$($(allTables[rowCounter-2][k+1]).children()[1]).children().children().length;i++){
                                                       
                                                        for(var j=0;j<$($($(allTables[rowCounter-2][k+1]).children()[1]).children().children()[i]).children().length;j++){
                                                            $($($(allTables[rowCounter-2][k+1]).children()[1]).children().children()[i]).children()[j].style.backgroundColor="white";
                                                        }
                                                    }
                                                
                                            }
                                            for(var i=1;i<$($(allTables[rowCounter-1][1]).children()[1]).children().children().length;i++){
                                                   
                                                    for(var j=0;j<$($($(allTables[rowCounter-1][1]).children()[1]).children().children()[i]).children().length;j++){
                                                        $($($(allTables[rowCounter-1][1]).children()[1]).children().children()[i]).children()[j].style.backgroundColor="white";
                                                    }
                                                }                                
                                var probSum=0;
                                for(var i=1;i<finalFactors[0].table.length;i++){
                                    probSum+=finalFactors[0].table[i][finalFactors[0].table[i].length-1];
                                }

                                for(var i=1;i<finalFactors[0].table.length;i++){
                                    finalFactors[0].table[i][finalFactors[0].table[i].length-1]=finalFactors[0].table[i][finalFactors[0].table[i].length-1]/probSum;
                                }

                                consideredFactor=finalFactors[0];
                                allTables[rowCounter]=[];
                                        temp=document.createElement('div');
                                          temp.style.position='absolute';
                                          temp.style.top=(posy)+"px";
                                          temp.style.left=(100+consideredFactor.table[0].length*100)+"px";
                                          temp.style.zIndex="1400";
                                          temp.id="temp"+indexCounter;
                                          var my_div = document.getElementById("canvas");
                                          document.body.insertBefore(temp, my_div);
                                          var arrow1divPaper=new Raphael(("temp"+indexCounter), 400, 400);
                                          var arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (70)+" "+50+"M"+(60)+" "+40+"L"+(70)+" "+50+"L"+(60)+" "+60).attr({'stroke-width': 3});
                                          var text0=arrow1divPaper.text((70), 90, "NORMALIZE").attr({"font-size":"15px"});
                                          var text4=arrow1divPaper.text((70), 110, "x(1/Z)").attr({"font-size":"15px"});
                                          allTables[rowCounter].push(temp);
                                          indexCounter++;

                                          temp=document.createElement('div');
                                          temp.style.position='absolute';
                                          temp.style.top=(posy+finalFactors[0].table.length*30+50)+"px";
                                          temp.style.left=(100)+"px";
                                          temp.style.zIndex="1400";
                                          temp.id="temp"+indexCounter;
                                          var my_div = document.getElementById("canvas");
                                          document.body.insertBefore(temp, my_div);
                                          var arrow1divPaper=new Raphael(("temp"+indexCounter), 400, 400);
                                          var text0=arrow1divPaper.text((10), 10, "+").attr({"font-size":"25px"});
                                          var arrow0=arrow1divPaper.path("M"+(0)+" "+30+"L"+ (40+finalFactors[0].table[0].length*50)+" "+30).attr({"stroke-width":3});
                                          var text0=arrow1divPaper.text((20), 50, "Z = ").attr({"font-size":"25px"});
                                          var text3=arrow1divPaper.text((20+finalFactors[0].table[0].length*50), 50, probSum).attr({"font-size":"25px"});
                                          allTables[rowCounter].push(temp);
                                          indexCounter++;

                                        var newDiv1 = document.createElement("div");
                                        newDiv1.style.position='absolute';
                                        newDiv1.style.top=posy+"px";
                                        newDiv1.style.left=(250+consideredFactor.table[0].length*100)+"px";
                                        posy+=50+finalFactors[0]*30;
                                        newDiv1.style.zIndex="1000";
                                        newDiv1.id="newDiv1";


                                         var newDiv2 = document.createElement("div");
                                         newDiv2.style.fontSize="25";
                                         newDiv2.style.fontWeight="bold";
                                         newDiv2.style.position="relative";
                                         newDiv2.style.top="-10px";
                                         newDiv2.style.left=(consideredFactor.table[0].length*50/2)+"px";
                    
                                            cont=document.createTextNode(inferenceInstructions.attr("text"));
                                       
                                       
                                         newDiv2.appendChild(cont);
                                         newDiv1.appendChild(newDiv2);
                                            row=new Array();
                                            cell=new Array();

                                            row_num=12; //edit this value to suit
                                            cell_num=12; //edit this value to suit

                                            tab=document.createElement('table');
                                            tab.border="1";
                                            tab.style.borderCollapse="collapse";
                                            tab.style.cellPadding="10";
                                            tab.setAttribute('id','newtable');

                                            tbo=document.createElement('tbody');
                                            row[0]=document.createElement('tr');
                                            for(k=0;k<consideredFactor.table[0].length;k++) {
                                                    cell[k]=document.createElement('td');
                                                    cell[k].setAttribute("style","background-color: #003366; color:#ffffff; text-align:center;");

                                                    cont=document.createTextNode(consideredFactor.table[0][k]);
                                                    cell[k].appendChild(cont);
                                                    row[0].appendChild(cell[k]);
                                            }
                                
                                            tbo.appendChild(row[0]);
                                            for(c=1;c<consideredFactor.table.length;c++){
                                                row[c]=document.createElement('tr');
                                                for(k=0;k<consideredFactor.table[c].length;k++) {
                                                    cell[k]=document.createElement('td');
                                                    if(k==consideredFactor.table[c].length-1){
                                                        cont=document.createTextNode(consideredFactor.table[c][k].toFixed(3));
                                                    }else{
                                                        cont=document.createTextNode(consideredFactor.table[c][k]);
                                                    }

                                                    cell[k].appendChild(cont);
                                                    if(k==consideredFactor.table[c].length-1){
                                                        cell[k].style.paddingLeft="10px";
                                                        cell[k].style.paddingRight="10px";
                                                    }
                                                    row[c].appendChild(cell[k]);
                                                }

                                                tbo.appendChild(row[c]);
                                            }
                                            
                                            tab.appendChild(tbo);
                                            
                                            
                                            newDiv1.appendChild(tab);
                                            
                                          var my_div = document.getElementById("canvas");

                                          document.body.insertBefore(newDiv1, my_div);
                                          
                                          allTables[rowCounter].push(newDiv1);

                                          rowCounter++;
                                          $(this).hide();
                                          $("#inferenceMenu").attr('disabled','');
                                          $("#getInferenceValue").attr('disabled','');
                            }
                            
                        }else{
                            console.log("NEXT STEPCOUNT= STEPPIN");

                            console.log(eliminateCount);
                            console.log(hiddenVars.length);
                            console.log(flagStagger);

                            if(arrowShow){
                                console.log("#temp"+arrowCounter);  
                                allTables[rowCounter]=[];
                                if(!flagStagger){
                                          temp=document.createElement('div');
                                          temp.style.position='absolute';
                                          temp.style.top=(posy-130)+"px";
                                          temp.style.left="100px";
                                          temp.style.zIndex="1400";
                                          temp.id="temp"+indexCounter;
                                          var my_div = document.getElementById("canvas");
                                          document.body.insertBefore(temp, my_div);
                                          var arrow1divPaper=new Raphael(("temp"+indexCounter), 300, 400);
                                          arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (30)+" "+90+"M"+(20)+" "+80+"L"+(30)+" "+90+"L"+(40)+" "+80).attr({'stroke-width': 3});
                                          text0=arrow1divPaper.text((90), 70, "JOIN ON ").attr({"font-size":"15px"});
                                          joinText=text0;
                                          $(joiner).show();
                                          joiner.style.top=(posy-80)+"px";
                                          $(joiner).val(remainingHidden[0]);
                                          $(joiner).focus();
                                          allTables[rowCounter].push(temp);
                                          indexCounter++;
                                }else{

                                          temp=document.createElement('div');
                                          temp.style.position='absolute';
                                          temp.style.top=(posy-130)+"px";
                                          temp.style.left="100px";
                                          temp.style.zIndex="1400";
                                          temp.id="temp"+indexCounter;
                                          var my_div = document.getElementById("canvas");
                                          document.body.insertBefore(temp, my_div);
                                          var arrow1divPaper=new Raphael(("temp"+indexCounter), 300, 400);
                                          
                                          var arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (30)+" "+90+"M"+(20)+" "+80+"L"+(30)+" "+90+"L"+(40)+" "+80).attr({'stroke-width': 3});
                                          var text0=arrow1divPaper.text((110), 70, "SUM OUT "+joinNode).attr({"font-size":"15px"});
                                          allTables[rowCounter].push(temp);
                                          indexCounter++;
                                }
                                
                                arrowShow=false;
                            }else if(eliminateCount<=hiddenVars.length || flagStagger){
                                console.log("KJBKJBNKJBKJBKJB"+eliminateCount);
                                
                                 //var joinNode=prompt("enter node to join on");
                                 joinNode=$(joiner).val();
                                 if(joinNode && !inferenceObserved[joinNode] && !inferenceObservedQueries[joinNode] && remainingHidden.indexOf(joinNode)!=-1){
                                    if(!flagStagger){
                                         for(var k=0;k<finalFactors.length;k++){
                                            if(finalFactors[k].vars.indexOf(joinNode)!=-1 || finalFactors[k].parentNodes.indexOf(joinNode)!=-1){
                                                console.log("FILLLING");
                                                for(var i=1;i<$($(allTables[rowCounter-1][k+1]).children()[1]).children().children().length;i++){
                                                   
                                                    for(var j=0;j<$($($(allTables[rowCounter-1][k+1]).children()[1]).children().children()[i]).children().length;j++){
                                                        $($($(allTables[rowCounter-1][k+1]).children()[1]).children().children()[i]).children()[j].style.backgroundColor="#CCCCCC";
                                                    }
                                                }
                                            }
                                         }

                                         joinText.attr("text", "JOIN ON "+joinNode);
                                         eliminateCount++;
                                         thisGraph.nodes[joinNode].variableJoin();
                                         consideredFactor=finalFactors[finalFactors.length-1];

                                          



                                            var newDiv1 = document.createElement("div");
                                            newDiv1.style.position='absolute';
                                            newDiv1.style.top=posy+"px";
                                            
                                            joiner.style.top=(posy+150+maxTable*30)+"px";
                                            
                                            newDiv1.style.left="100px";
                                            posy+=150+consideredFactor.table.length*30;
                                            document.getElementById("nextButtonVariable").style.top=(posy-70)+"px";
                                            //arrow1div.style.top=(posy+20)+"px";

                                            arrow1div=document.createElement('div');

            arrow1div.style.position='absolute';
            arrow1div.style.top=(posy-120)+"px";
            arrow1div.style.left="250px";
            arrow1div.style.zIndex="1400";
            arrow1div.id="arrow1div"+counter;
            var my_div = document.getElementById("canvas");
            document.body.insertBefore(arrow1div, my_div);
            var arrow1divPaper=new Raphael('arrow1div'+counter, 800, 400);
            arrow1divPaper.rect(30,50,640, 50);
             var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px","text-anchor":"start"});
            variables="HIDDEN : ";
            text1.attr("text", variables);
            for(var i=0;i<hiddenVars.length;i++){
                variables="";
                if(i!=0){
                    variables+=" ,";
                }
                variables+=hiddenVars[i];
                if(remainingHidden.indexOf(hiddenVars[i])==-1){
                    arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", fill:"#CCCCCC","text-anchor":"start"});
                }else{
                    arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px","text-anchor":"start"});
                }
            }
            var text2=arrow1divPaper.text((60),70, "").attr({"font-size":"25px","text-anchor":"start"});
            
            text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
            boxes.push(arrow1div);
            counter++;



                                            newDiv1.style.zIndex="1000";
                                            newDiv1.id="newDiv1";


                                            var parentsOfThis="";
                                            for(var j=0;j<consideredFactor.parentNodes.length;j++){
                                                if(j!=0){
                                                    parentsOfThis+=" ,";

                                                }
                                                if(!inferenceObserved[consideredFactor.parentNodes[j]]){
                                                    parentsOfThis+=consideredFactor.parentNodes[j];
                                                }else{
                                                     parentsOfThis+=inferenceObserved[consideredFactor.parentNodes[j]];
                                                }
                                            }
                                            var variablesThis="";
                                            for(var j=0;j<consideredFactor.vars.length;j++){
                                                if(j!=0){
                                                    variablesThis+=" ,";

                                                }
                                                if(!inferenceObserved[consideredFactor.vars[j]]){
                                                    variablesThis+=consideredFactor.vars[j];
                                                }else{
                                                     variablesThis+=inferenceObserved[consideredFactor.vars[j]];
                                                }
                                            }
                                             var newDiv2 = document.createElement("div");
                                             newDiv2.style.fontSize="25";
                                             newDiv2.style.fontWeight="bold";
                                             newDiv2.style.position="relative";
                                             newDiv2.style.top="-10px";
                                             newDiv2.style.left=(consideredFactor.table[0].length*50/2)+"px";
                                            if(consideredFactor.parentNodes.length>0){
                                                
                                                cont=document.createTextNode("f'("+variablesThis+" | "+ parentsOfThis+")");
                                            }else{
                                                cont=document.createTextNode("f'("+variablesThis+")");
                                            }
                                           
                                             newDiv2.appendChild(cont);
                                             newDiv1.appendChild(newDiv2);
                                                row=new Array();
                                                cell=new Array();

                                                row_num=12; //edit this value to suit
                                                cell_num=12; //edit this value to suit

                                                tab=document.createElement('table');
                                                tab.border="1";
                                                tab.style.borderCollapse="collapse";
                                                tab.style.cellPadding="10";
                                                tab.setAttribute('id','newtable');

                                                tbo=document.createElement('tbody');
                                                row[0]=document.createElement('tr');
                                                for(k=0;k<consideredFactor.table[0].length;k++) {
                                                        cell[k]=document.createElement('td');
                                                        cell[k].setAttribute("style","background-color: #003366; color:#ffffff; text-align:center;");

                                                        cont=document.createTextNode(consideredFactor.table[0][k]);
                                                        cell[k].appendChild(cont);
                                                        row[0].appendChild(cell[k]);
                                                }
                                    
                                                tbo.appendChild(row[0]);
                                                for(c=1;c<consideredFactor.table.length;c++){
                                                    row[c]=document.createElement('tr');
                                                    for(k=0;k<consideredFactor.table[c].length;k++) {
                                                        cell[k]=document.createElement('td');
                                                        cell[k].setAttribute("style","background-color: #CCCCCC;");
                                                        if(k==consideredFactor.table[c].length-1){
                                                            cont=document.createTextNode(consideredFactor.table[c][k].toFixed(3));
                                                        }else{
                                                            cont=document.createTextNode(consideredFactor.table[c][k]);
                                                        }

                                                        cell[k].appendChild(cont);
                                                        if(k==consideredFactor.table[c].length-1){
                                                            cell[k].style.paddingLeft="10px";
                                                            cell[k].style.paddingRight="10px";
                                                        }
                                                        row[c].appendChild(cell[k]);
                                                    }

                                                    tbo.appendChild(row[c]);
                                                }
                                                
                                                tab.appendChild(tbo);
                                                
                                                
                                                newDiv1.appendChild(tab);
                                                
                                              var my_div = document.getElementById("canvas");

                                              document.body.insertBefore(newDiv1, my_div);
                                              allTables[rowCounter].push(newDiv1);
                                              
                                              rowCounter++;
                                              stepCount++;
                                              flagStagger=true;
                                              $(joiner).hide();
                                              arrowShow=true;

                                        }else if(sumFlag==0){
                                            for(var k=0;k<allTables[rowCounter-2].length;k++){
                                                
                                                    for(var i=1;i<$($(allTables[rowCounter-2][k+1]).children()[1]).children().children().length;i++){
                                                       
                                                        for(var j=0;j<$($($(allTables[rowCounter-2][k+1]).children()[1]).children().children()[i]).children().length;j++){
                                                            $($($(allTables[rowCounter-2][k+1]).children()[1]).children().children()[i]).children()[j].style.backgroundColor="white";
                                                        }
                                                    }
                                                
                                             }
                                            for(var i=1;i<$($(allTables[rowCounter-1][1]).children()[1]).children().children().length;i++){
                                                   
                                                    for(var j=0;j<$($($(allTables[rowCounter-1][1]).children()[1]).children().children()[i]).children().length;j++){
                                                        $($($(allTables[rowCounter-1][1]).children()[1]).children().children()[i]).children()[j].style.backgroundColor="white";
                                                    }
                                                }
                                            thisGraph.nodes[joinNode].variableSum();
                                            console.log(finalFactors); 
                                            xPos=100;
                



                                          var maxLength=0;
                                            for(looper=0;looper<finalFactors.length;looper++){
                                                var newDiv1 = document.createElement("div");
                                                newDiv1.style.position='absolute';
                                                newDiv1.style.top=posy+"px";
                                                     
                                                newDiv1.style.left="100px";
                                                if(looper!=0){
                                                    console.log("INSIDE FIRsT");
                                                    xPos+=finalFactors[looper-1].table[0].length*50+50;
                                                    newDiv1.style.left=(xPos)+"px";
                                                }else{
                                                    console.log("INSIDE SECOND");
                                                    newDiv1.style.left="100px";
                                                }
                                                console.log(xPos);
                                                newDiv1.style.zIndex="1000";





                                            var parentsOfThis="";
                                            for(var j=0;j<finalFactors[looper].parentNodes.length;j++){
                                                if(j!=0){
                                                    parentsOfThis+=" ,";

                                                }
                                                if(!inferenceObserved[finalFactors[looper].parentNodes[j]]){
                                                    parentsOfThis+=finalFactors[looper].parentNodes[j];
                                                }else{
                                                     parentsOfThis+=inferenceObserved[finalFactors[looper].parentNodes[j]];
                                                }
                                            }
                                            var variablesThis="";
                                            for(var j=0;j<finalFactors[looper].vars.length;j++){
                                                if(j!=0){
                                                    variablesThis+=" ,";

                                                }
                                                if(!inferenceObserved[finalFactors[looper].vars[j]]){
                                                    variablesThis+=finalFactors[looper].vars[j];
                                                }else{
                                                     variablesThis+=inferenceObserved[finalFactors[looper].vars[j]];
                                                }
                                            }
                                             var newDiv2 = document.createElement("div");
                                             newDiv2.style.fontSize="25";
                                             newDiv2.style.fontWeight="bold";
                                             newDiv2.style.position="relative";
                                             newDiv2.style.top="-10px";
                                             newDiv2.style.left=(finalFactors[looper].table[0].length*50/2)+"px";
                                            if(finalFactors[looper].parentNodes.length>0){
                                                cont=document.createTextNode("f("+variablesThis+" | "+ parentsOfThis+")");
                                            }else{
                                                cont=document.createTextNode("f("+variablesThis+")");
                                            }
                                                
                                           
                                            if(finalFactors[looper].table.length>maxLength){
                                                maxLength=finalFactors[looper].table.length;
                                            }
                                             newDiv2.appendChild(cont);
                                             newDiv1.appendChild(newDiv2);


                                                    row=new Array();
                                                    cell=new Array();

                                                    row_num=12; //edit this value to suit
                                                    cell_num=12; //edit this value to suit

                                                    tab=document.createElement('table');
                                                    tab.border="1";
                                                    tab.style.borderCollapse="collapse";
                                                    tab.style.cellPadding="10";
                                                    tab.setAttribute('id','newtable');

                                                    tbo=document.createElement('tbody');
                                                    row[0]=document.createElement('tr');
                                                    for(k=0;k<finalFactors[looper].table[0].length;k++) {
                                                            cell[k]=document.createElement('td');
                                                            cell[k].setAttribute("style","background-color: #003366; color:#ffffff; text-align:center;");

                                                            cont=document.createTextNode(finalFactors[looper].table[0][k]);
                                                            cell[k].appendChild(cont);
                                                            row[0].appendChild(cell[k]);
                                                    }
                                        
                                                    tbo.appendChild(row[0]);
                                                    for(c=1;c<finalFactors[looper].table.length;c++){
                                                        row[c]=document.createElement('tr');
                                                        for(k=0;k<finalFactors[looper].table[c].length;k++) {
                                                            cell[k]=document.createElement('td');
                                                            if(k==finalFactors[looper].table[c].length-1){
                                                                cont=document.createTextNode(finalFactors[looper].table[c][k].toFixed(3));
                                                            }else{
                                                                cont=document.createTextNode(finalFactors[looper].table[c][k]);
                                                            }
                                                            

                                                            cell[k].appendChild(cont);
                                                            if(k==finalFactors[looper].table[c].length-1){
                                                                cell[k].style.paddingLeft="10px";
                                                                cell[k].style.paddingRight="10px";

                                                            }
                                                            row[c].appendChild(cell[k]);
                                                        }

                                                        tbo.appendChild(row[c]);
                                                    }
                                                    
                                                    tab.appendChild(tbo);
                                                    
                                                    
                                                    newDiv1.appendChild(tab);
                                                    
                                                  var my_div = document.getElementById("canvas");

                                                  document.body.insertBefore(newDiv1, my_div);
                                                  $(newDiv1).hide();
                                                  allTables[rowCounter].push(newDiv1);
                                            }
                                            $(allTables[rowCounter][allTables[rowCounter].length-1]).show();
                                            if(finalFactors.length>1){
                                                
                                                sumFlag=1;
                                            }else{

                                                flagStagger=false;
                                                remainingHidden.splice(remainingHidden.indexOf(joinNode),1);
                                                arrowShow=true;
                                                if(eliminateCount>hiddenVars.length){
                                                    console.log("LEAVING");
                                                    nextType="T";
                                                    joiner.style.display="none";
                                                    flagJoin=true;
                                                }

                                                arrow1div=document.createElement('div');
                                                arrow1div.style.position='absolute';
                                                arrow1div.style.top=(posy+20+maxLength*32)+"px";
                                                arrow1div.style.left="250px";
                                                arrow1div.style.zIndex="1400";
                                                arrow1div.id="arrow1div"+counter;
                                                var my_div = document.getElementById("canvas");
                                                document.body.insertBefore(arrow1div, my_div);
                                                var arrow1divPaper=new Raphael('arrow1div'+counter, 800, 400);
                                                arrow1divPaper.rect(30,50,640, 50);
                                                var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px","text-anchor":"start"});
                                                variables="HIDDEN : ";
                                                text1.attr("text", variables);
                                                for(var i=0;i<hiddenVars.length;i++){
                                                    variables="";
                                                    if(i!=0){
                                                        variables+=" ,";
                                                    }
                                                    variables+=hiddenVars[i];
                                                    if(remainingHidden.indexOf(hiddenVars[i])==-1){
                                                        arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", fill:"#CCCCCC", "text-anchor":"start"});
                                                    }else{
                                                        arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", "text-anchor":"start"});
                                                    }
                                                }
                                                var text2=arrow1divPaper.text((60),70, "").attr({"font-size":"25px","text-anchor":"start"});
                                                counter++;
                                                text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
                                                boxes.push(arrow1div);
                                            }
                                            rowCounter++;
                                            posy+=150+maxLength*30;
                                            document.getElementById("nextButtonVariable").style.top=(posy-70)+"px";
                                            //arrow1div.style.top=(posy+20)+"px";  








                                            stepCount++;
                                            

                                        }else if(sumFlag==1){
                                            for(var i=0;i<allTables[rowCounter-1].length;i++){
                                                 $(allTables[rowCounter-1][i]).show();
                                            }
                                            flagStagger=false;
                                            remainingHidden.splice(remainingHidden.indexOf(joinNode),1);
                            
                                            arrowShow=true;
                                            if(eliminateCount>hiddenVars.length){
                                                console.log("LEAVING");
                                                nextType="T";
                                                joiner.style.display="none";
                                                flagJoin=true;
                                            }
                                            sumFlag=0;

                                            arrow1div=document.createElement('div');
                                            arrow1div.style.position='absolute';
                                            arrow1div.style.top=(posy-120)+"px";
                                            arrow1div.style.left="250px";
                                            arrow1div.style.zIndex="1400";
                                            arrow1div.id="arrow1div"+counter;
                                            var my_div = document.getElementById("canvas");
                                            document.body.insertBefore(arrow1div, my_div);
                                            var arrow1divPaper=new Raphael('arrow1div'+counter, 800, 400);
                                            arrow1divPaper.rect(30,50,640, 50);
                                            var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                            variables="HIDDEN : ";
                                            text1.attr("text", variables);
                                            for(var i=0;i<hiddenVars.length;i++){
                                                variables="";
                                                if(i!=0){
                                                    variables+=" ,";
                                                }
                                                variables+=hiddenVars[i];
                                                if(remainingHidden.indexOf(hiddenVars[i])==-1){
                                                        arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", fill:"#CCCCCC", "text-anchor":"start"});
                                                    }else{
                                                        arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", "text-anchor":"start"});
                                                    }
                                            }
                                            var text2=arrow1divPaper.text((60),70, "").attr({"font-size":"25px","text-anchor":"start"});
                                            counter++;
                                            text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
                                            boxes.push(arrow1div);
                                        }
                                        
                                    }
                            }
                                

                            
                            //step through the numbers till the table is done, then return to typeT
                            //nextStep();
                        }
                      });
           

            joiner=document.createElement('input');
            joiner.type ="text";
            joiner.style.backgroundColor="#CCCCCC";
            joiner.style.position='absolute';
            joiner.style.top="150px";
            joiner.style.left="230px";
            joiner.style.width="30px";
            joiner.style.zIndex="1500";
            joiner.id="joiner";
               var my_div = document.getElementById("canvas");
            joiner.style.display="none";
            document.body.insertBefore(joiner, my_div);


    }


    showVariableEliminationBrief=function(){
        $("#instructionsshower").hide();
         $('#cssmenu').css("opacity", 0.1);
         $('#watermark').css("opacity", 0.1);
                      $('#inferenceMenuTop').css("opacity", 0.1); 
                      $('#top1').css("opacity", 0.1);
                      $('#showMenu').css("opacity", 0.1);
                      $('#top2').css("opacity", 0.1); 
                      $('#loadNet').css("opacity", 0.1);
                      $('#saveNet').css("opacity", 0.1); 
                      $('#loadNet1').css("opacity", 0.1);
                      $('#saveNet1').css("opacity", 0.1);
                      $('#dSepMenu').css("opacity", 0.1);
                      $('#reset').css("opacity", 0.1);        
                      $('#issues').css("opacity", 0.1);                 
                      $('#mode').attr("disabled", "disabled");                 
                      $('#loadNet').attr("disabled", "disabled");     
                      $('#clearCanvas').attr("disabled", "disabled");
                      $('#inferenceMenu').attr("disabled", "disabled");  
                      $('#getInferenceValue').attr("disabled", "disabled");               
                      $('#downloadify').hide();
                      $("#issues").hide(); 
                      modeClick=-1;
        $("#textOver").attr('disabled','disabled');        
        inferenceInstructions.hide();
        tempinferenceInstructions=buttonPaperRaphael.text(445,40,inferenceInstructions.attr("text")).attr({"font-size": 40});
        var counter=0;
        $("#inferenceMenu").attr('disabled','disabled');
        $("#getInferenceValue").attr('disabled','disabled');
        finalFactors=[];
        var allTables=[];
        var boxes=[];
        var surroundingBoxes=[];
        var sumFlag=0;
        console.log("VARIABLE VERBOSE");
        $('#canvas').css("opacity", 0.1);
        $('#instructions').css("opacity", 0.1);
                      closeButtonBrief=document.createElement('input');
                      closeButtonBrief.type ="button";
                      closeButtonBrief.value=" X ";
                      closeButtonBrief.style.position='absolute';
                      closeButtonBrief.style.top="100px";
                      closeButtonBrief.style.left="50px";
                      closeButtonBrief.style.zIndex="800";
                      closeButtonBrief.id="closeButtonVariable";
                      closeButtonBrief.style.backgroundColor="red";
                      var my_div = document.getElementById("canvas");
                      
                      document.body.insertBefore(closeButtonBrief, my_div);
                      $(closeButtonBrief).click(function(){
                        console.log("CLOSE BUTTON");
                          $('#canvas').css("opacity",1);
                          $("#instructionsshower").show();
                           $('#watermark').css("opacity", 1);
                          $('#cssmenu').css("opacity", 1);
                          $('#inferenceMenuTop').css("opacity", 1); 
                          $('#top1').css("opacity", 1);
                          $('#showMenu').css("opacity", 1);
                          $('#top2').css("opacity", 1); 
                          $('#loadNet').css("opacity", 1);
                          $('#saveNet').css("opacity", 1); 
                          $('#loadNet1').css("opacity", 1);
                          $('#saveNet1').css("opacity", 1);
                          $('#dSepMenu').css("opacity", 1);
                          $('#reset').css("opacity", 1);        
                          $('#issues').css("opacity", 1);                 
                          $('#mode').attr("disabled", "");       
                          $('#inferenceMenu').attr("disabled", "");  
                          $('#getInferenceValue').attr("disabled", "");               
                          $("#issues").show(); 
                          modeClick=4;
                          $('#instructions').css("opacity", 1);
                          $("#nextButtonVariable").remove();
                          $("#textOver").attr('disabled','');
                          $("#closeButtonVariable").remove();
                          for(var i=0;i<allTables.length;i++){
                            for(var j=0;j<allTables[i].length;j++){
                                allTables[i][j].style.display="none";
                                $(allTables[i][j]).remove();
                            }
                          }

                          for(var j=0;j<boxes.length;j++){
                                $(boxes[j]).remove();
                            }

                          $(arrow1div).remove();
                          $(joiner).remove();
                          $("#inferenceMenu").attr('disabled','');
                           $("#getInferenceValue").attr('disabled','');
                           $("#textOver").hide();
                            inferenceInstructions.show();
                            tempinferenceInstructions.remove();
                      });

        var keysTemp=Object.keys(thisGraph.nodes); 
        var maxTable=0;
        for(var h=0;h<keysTemp.length;h++){
            if(thisGraph.nodes[keysTemp[h]].table.length>maxTable){
                maxTable=thisGraph.nodes[keysTemp[h]].table.length;
            }
        }
                    
        console.log(keysTemp);
        var xPos=100;
        allTables[0]=[];
        var surroundCounter=0;
                      
        for(var i=0;i<keysTemp.length;i++){
                    var newDiv1 = document.createElement("div");
                    newDiv1.style.position='absolute';
                    newDiv1.style.top="150px";
                        console.log((150+thisGraph.nodes[keysTemp[i]].table[0].length*100));
                        if(i!=0){
                            xPos+=thisGraph.nodes[keysTemp[i-1]].table[0].length*50+50;
                            newDiv1.style.left=(xPos)+"px";
                            
                        }else{
                            newDiv1.style.left="100px";
                        }
                        console.log(xPos);  
                    newDiv1.style.zIndex="1000";
                    newDiv1.id="newDiv1";

                        var parentsOfThis="";
                        for(var j=0;j<thisGraph.nodes[keysTemp[i]].parents.length;j++){
                            if(j!=0){
                                parentsOfThis+=" ,";

                            }else{
                                parentsOfThis+=" |";
                            }
                            parentsOfThis+=thisGraph.nodes[keysTemp[i]].parents[j].id;
                        }
                         var newDiv2 = document.createElement("div");
                         newDiv2.style.fontSize="25";
                         newDiv2.style.fontWeight="bold";
                         newDiv2.style.position="relative";
                         newDiv2.style.top="-10px";

                         newDiv2.style.left=(thisGraph.nodes[keysTemp[i]].table[0].length*50/2)+"px";
                         cont=document.createTextNode("P("+keysTemp[i]+parentsOfThis+")");
                       
                         newDiv2.appendChild(cont);
                         newDiv1.appendChild(newDiv2);
                        
                        
                      var my_div = document.getElementById("canvas");

                      document.body.insertBefore(newDiv1, my_div);
                      allTables[0].push(newDiv1);

        }  
        arrows=[];
        var indexCounter=0;
        var xPos=100;
        allTables[1]=[];
          temp=document.createElement('div');
                      temp.style.position='absolute';
                      temp.style.top=(170)+"px";
                      temp.style.left="100px";
                      temp.style.zIndex="1400";
                      temp.id="temp"+indexCounter;
                      var my_div = document.getElementById("canvas");
                      document.body.insertBefore(temp, my_div);
                      var arrow1divPaper=new Raphael(("temp"+indexCounter), 300, 400);
                      var arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (30)+" "+90+"M"+(20)+" "+80+"L"+(30)+" "+90+"L"+(40)+" "+80).attr({'stroke-width': 3});
                      var text0=arrow1divPaper.text((90), 70, "SELECT").attr({"font-size":"15px"});
                      temp.style.display="none";
                      allTables[1].push(temp);
                      indexCounter++;
        for(var i=0;i<keysTemp.length;i++){

                        var a=new Object();
                        a.table=thisGraph.nodes[keysTemp[i]].table.slice();
                        a.vars=[thisGraph.nodes[keysTemp[i]].id];
                        a.parentNodes=[];
                        for(var j=0;j<thisGraph.nodes[keysTemp[i]].parents.length;j++){
                            a.parentNodes.push(thisGraph.nodes[keysTemp[i]].parents[j].id)
                        }
                        var evidenceSelected=(selectOnEvidence(a,inferenceObserved));           
                    
                    var newDiv1 = document.createElement("div");
                    var maxTable=0;
                    for(var h=0;h<keysTemp.length;h++){
                        if(thisGraph.nodes[keysTemp[h]].table.length>maxTable){
                            maxTable=thisGraph.nodes[keysTemp[h]].table.length;
                        }
                    }
                    newDiv1.style.position='absolute';
                    newDiv1.style.top=(300)+"px";
                        
                        var parentsOfThis="";
                        for(var j=0;j<thisGraph.nodes[keysTemp[i]].parents.length;j++){
                             if(j!=0){
                                parentsOfThis+=" ,";
                            }else{
                                parentsOfThis+=" |";
                            }
                            if(!inferenceObserved[thisGraph.nodes[keysTemp[i]].parents[j].id]){
                                parentsOfThis+=thisGraph.nodes[keysTemp[i]].parents[j].id;
                            }else{
                                 parentsOfThis+=inferenceObserved[thisGraph.nodes[keysTemp[i]].parents[j].id];
                            }
                        }
                         var newDiv2 = document.createElement("div");
                         newDiv2.style.fontSize="25";
                         newDiv2.style.fontWeight="bold";
                         newDiv2.style.position="relative";
                         
                         newDiv2.style.left=(thisGraph.nodes[keysTemp[i]].table[0].length*50/2)+"px";
                         if(!inferenceObserved[keysTemp[i]]){
                            cont=document.createTextNode("P("+keysTemp[i]+parentsOfThis+")");
                        }else{
                            cont=document.createTextNode("P("+inferenceObserved[keysTemp[i]]+parentsOfThis+")");
                        }
                       
                         newDiv2.appendChild(cont);
                         newDiv1.appendChild(newDiv2);

                        console.log((150+thisGraph.nodes[keysTemp[i]].table[0].length*100));
                        if(i!=0){
                            xPos+=thisGraph.nodes[keysTemp[i-1]].table[0].length*50+50;
                            newDiv1.style.left=(xPos)+"px";
                            
                        }else{
                            newDiv1.style.left="100px";
                        }
                        
                    newDiv1.style.zIndex="1000";
                    newDiv1.id="newDiv1";
                        
                        
                      var my_div = document.getElementById("canvas");

                      document.body.insertBefore(newDiv1, my_div);
                      
                      allTables[1].push(newDiv1);

                      newDiv1.style.display="none";
        }  
                        //drawArrow(0,(250+maxTable*30), "SELECT", ("temp"+indexCounter), false);
                        
                    



            var keysTemp=Object.keys(thisGraph.nodes); 
            var vars=[];
            for(var i=0;i<keysTemp.length;i++){
                vars.push(thisGraph.nodes[keysTemp[i]].id);
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
            //makeshift
            var posy=450;
            var rowCounter=2;
            var hiddenVars=[];
            var remainingHidden=[];
            for(var i=0;i<vars.length;i++){
                if(!inferenceObserved[keysTemp[i]] && !inferenceObservedQueries[keysTemp[i]]){
                    hiddenVars.push(keysTemp[i]);
                    remainingHidden.push(keysTemp[i]);
                }
            }
            console.log(hiddenVars);

            nextButton=document.createElement('input');
            nextButton.type ="button";
            nextButton.style.backgroundColor="#CCCCCC";
            nextButton.value=" Next ";
            nextButton.style.position='absolute';
            nextButton.style.top=(230)+"px";
            nextButton.style.left="10px";
            nextButton.style.zIndex="1500";
            nextButton.id="nextButtonVariable";

            arrow1div=document.createElement('div');

            arrow1div.style.position='absolute';
            arrow1div.style.top=(160)+"px";
            arrow1div.style.left="250px";
            arrow1div.style.zIndex="1400";
           arrow1div.id="arrow1div"+counter;
            var my_div = document.getElementById("canvas");
            document.body.insertBefore(arrow1div, my_div);
            var arrow1divPaper=new Raphael(('arrow1div'+counter), 800, 400);
            arrow1divPaper.rect(30,50,640, 50);
            
            var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px", "text-anchor":"start"});
            variables="HIDDEN : ";
            text1.attr("text", variables);
            for(var i=0;i<hiddenVars.length;i++){
                variables="";
                if(i!=0){
                    variables+=" ,";
                }
                variables+=hiddenVars[i];
                arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", "text-anchor":"start"});
            }
            
            var text2=arrow1divPaper.text((60),70, "").attr({"font-size":"25px", "text-anchor":"start"});
            
            text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
            counter++;
            boxes.push(arrow1div);
            var my_div = document.getElementById("canvas");
            var flagStagger=false;
            document.body.insertBefore(nextButton, my_div);

            /*for(var j=0;j<allTables.length;j++){
                for(var i=0;i<allTables[j].length;i++){
                                    allTables[j][i].style.display="none";
                }
            }*/
            eliminateCount=1;
            var flagJoin=false;
            var nextType="T";
            var arrowShow=true;
            var arrowCounter=1;
            var joinText;
                      var stepCount=0;
                      $(nextButton).click(function(){
                        if(nextType=="T"){
                            console.log("INSIDE T");
                            if(stepCount==0){
                                $("#temp0").show();
                                stepCount++;
                            }else if(stepCount==1){
                                for(var i=0;i<allTables[stepCount].length;i++){
                                    allTables[stepCount][i].style.display="block";
                                }
                                document.getElementById("nextButtonVariable").style.top=(posy-70)+"px";

                                stepCount++;
                                nextType="S";
                                //arrow1div.style.top=(posy+20)+"px"


                                arrow1div=document.createElement('div');
                                arrow1div.style.position='absolute';
                                arrow1div.style.top=(posy-140)+"px";
                                arrow1div.style.left="250px";
                                arrow1div.style.zIndex="1400";
                                arrow1div.id="arrow1div"+counter;
                                var my_div = document.getElementById("canvas");
                                document.body.insertBefore(arrow1div, my_div);
                                var arrow1divPaper=new Raphael(('arrow1div'+counter), 800, 400);
                                arrow1divPaper.rect(30,50,640, 50);
                                
                                var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                variables="HIDDEN : ";
                                text1.attr("text", variables);
                                for(var i=0;i<hiddenVars.length;i++){
                                    variables="";
                                    if(i!=0){
                                        variables+=" ,";
                                    }
                                    variables+=hiddenVars[i];
                                    arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", "text-anchor":"start"});
                                }
                                
                                var text2=arrow1divPaper.text((60),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                
                                text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
                                counter++;
                                boxes.push(arrow1div);


                                if(hiddenVars.length==0){
                                    flagJoin=true;
                                    nextType="T";
                                    console.log("NO HIDDEN VARIABLES");
                                }





                            }else if(flagJoin){
                                // for(var k=0;k<finalFactors.length;k++){
                                            
                                //                 console.log("FILLLING");
                                //                 for(var i=1;i<$($(allTables[rowCounter-1][k+1]).children()[1]).children().children().length;i++){
                                                   
                                //                     for(var j=0;j<$($($(allTables[rowCounter-1][k+1]).children()[1]).children().children()[i]).children().length;j++){
                                //                         $($($(allTables[rowCounter-1][k+1]).children()[1]).children().children()[i]).children()[j].style.backgroundColor="#CCCCCC";
                                //                     }
                                //                 }
                                // }
                                console.log(finalFactors.slice());
                                var inferenceKeys=Object.keys(inferenceObservedQueries);
                                console.log(inferenceKeys);
                                for(var i=0;i<inferenceKeys.length;i++){
                                    thisGraph.nodes[inferenceKeys[i]].variableJoin();
                                }

                                var inferenceKeys=Object.keys(inferenceObserved);
                                console.log(inferenceKeys);
                                for(var i=0;i<inferenceKeys.length;i++){
                                    thisGraph.nodes[inferenceKeys[i]].variableJoin();
                                }

                                //thisGraph.nodes["A"].variableJoin();
                                //thisGraph.nodes["C"].variableJoin();
                                console.log(finalFactors.slice());
                                console.log(finalFactors.length);
                                console.log(allTables);

                                while(finalFactors.length>1){
                                    first=finalFactors[0];
                                    second=finalFactors[1];
                                    finalFactors.splice(0,1);
                                    finalFactors.splice(0,1);
                                    var tempCombined=[];
                                    var firstTop=first.table[0].slice(0,first.table[0].length-1);
                                    var secondTop=second.table[0].slice(0,second.table[0].length-1);
                                    console.log(firstTop);
                                    console.log(secondTop);
                                    tempCombined.push(firstTop.concat(secondTop).concat(["P"]));
                                    
                                    for(var i=1;i<first.table.length;i++){
                                        for(j=1;j<second.table.length;j++){
                                            var valueEnd=first.table[i][first.table[i].length-1]*second.table[j][second.table[j].length-1];
                                            console.log(valueEnd);
                                            
                                            
                                            tempCombined.push(first.table[i].slice(0,first.table[i].length-1).concat(second.table[j].slice(0,second.table[j].length-1)).concat([valueEnd]));
                                        }
                                    }
                                    
                                    console.log(first);
                                    console.log(second);

                                    var finalJointObject=new Object();
                                    finalJointObject.table=tempCombined.slice();
                                    finalJointObject.vars=first.vars.concat(second.vars);
                                    finalFactors.push(finalJointObject);
                                }

                                consideredFactor=finalFactors[0];
                                allTables[rowCounter]=[];
                                          temp=document.createElement('div');
                                          temp.style.position='absolute';
                                          temp.style.top=(posy-130)+"px";
                                          temp.style.left="100px";
                                          temp.style.zIndex="1400";
                                          temp.id="temp"+indexCounter;
                                          var my_div = document.getElementById("canvas");
                                          document.body.insertBefore(temp, my_div);
                                          var arrow1divPaper=new Raphael(("temp"+indexCounter), 300, 400);
                                          var arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (30)+" "+90+"M"+(20)+" "+80+"L"+(30)+" "+90+"L"+(40)+" "+80).attr({'stroke-width': 3});
                                          var text0=arrow1divPaper.text((110), 70, "JOIN REMAINING").attr({"font-size":"15px"});
                                          allTables[rowCounter].push(temp);
                                          indexCounter++;



                                var newDiv1 = document.createElement("div");
                                newDiv1.style.position='absolute';
                                newDiv1.style.top=posy+"px";
                                document.getElementById("nextButtonVariable").style.top=(posy)+"px";
                                           
                                            //arrow1div.style.top=(posy+100+maxTable*30)+"px";




                                newDiv1.style.left="100px";
                                newDiv1.style.zIndex="1000";
                                newDiv1.id="newDiv1";


                        var variablesThis="";
                        for(var j=0;j<consideredFactor.vars.length;j++){
                            if(j!=0){
                                variablesThis+=" ,";

                            }
                            if(!inferenceObserved[consideredFactor.vars[j]]){
                                variablesThis+=consideredFactor.vars[j];
                            }else{
                                 variablesThis+=inferenceObserved[consideredFactor.vars[j]];
                            }
                        }
                         var newDiv2 = document.createElement("div");
                         newDiv2.style.fontSize="25";
                         newDiv2.style.fontWeight="bold";
                         newDiv2.style.position="relative";
                         newDiv2.style.left=(consideredFactor.table[0].length*50/2)+"px";
    
                            cont=document.createTextNode("f("+variablesThis+")");
                       
                       
                         newDiv2.appendChild(cont);
                         newDiv1.appendChild(newDiv2);




                                    
                                  var my_div = document.getElementById("canvas");

                                  document.body.insertBefore(newDiv1, my_div);
                                  
                                  allTables[rowCounter].push(newDiv1);

                                  rowCounter++;
                                        flagJoin=false;


                            }else{
                                                                
                                var probSum=0;
                                for(var i=1;i<finalFactors[0].table.length;i++){
                                    probSum+=finalFactors[0].table[i][finalFactors[0].table[i].length-1];
                                }

                                for(var i=1;i<finalFactors[0].table.length;i++){
                                    finalFactors[0].table[i][finalFactors[0].table[i].length-1]=finalFactors[0].table[i][finalFactors[0].table[i].length-1]/probSum;
                                }

                                consideredFactor=finalFactors[0];
                                allTables[rowCounter]=[];
                                        temp=document.createElement('div');
                                          temp.style.position='absolute';
                                          temp.style.top=(posy-40)+"px";
                                          temp.style.left=(100+consideredFactor.table[0].length*100)+"px";
                                          temp.style.zIndex="1400";
                                          temp.id="temp"+indexCounter;
                                          var my_div = document.getElementById("canvas");
                                          document.body.insertBefore(temp, my_div);
                                          var arrow1divPaper=new Raphael(("temp"+indexCounter), 400, 400);
                                          var arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (70)+" "+50+"M"+(60)+" "+40+"L"+(70)+" "+50+"L"+(60)+" "+60).attr({'stroke-width': 3});
                                          var text0=arrow1divPaper.text((70), 90, "NORMALIZE").attr({"font-size":"15px"});
                                          var text4=arrow1divPaper.text((70), 110, "x(1/Z)").attr({"font-size":"15px"});
                                          allTables[rowCounter].push(temp);
                                          indexCounter++;

                                        var newDiv1 = document.createElement("div");
                                        newDiv1.style.position='absolute';
                                        newDiv1.style.top=posy+"px";
                                        newDiv1.style.left=(250+consideredFactor.table[0].length*100)+"px";
                                        
                                        newDiv1.style.zIndex="1000";
                                        newDiv1.id="newDiv1";


                                         var newDiv2 = document.createElement("div");
                                         newDiv2.style.fontSize="25";
                                         newDiv2.style.fontWeight="bold";
                                         newDiv2.style.position="relative";
                                         newDiv2.style.left=(consideredFactor.table[0].length*50/2)+"px";
                    
                                            cont=document.createTextNode(inferenceInstructions.attr("text"));
                                       
                                       
                                         newDiv2.appendChild(cont);
                                         newDiv1.appendChild(newDiv2);
                                            
                                            
                                          var my_div = document.getElementById("canvas");

                                          document.body.insertBefore(newDiv1, my_div);
                                          
                                          allTables[rowCounter].push(newDiv1);

                                          rowCounter++;
                                          $(this).hide();
                                          $("#inferenceMenu").attr('disabled','');
                                          $("#getInferenceValue").attr('disabled','');
                            }
                            
                        }else{
                            console.log("NEXT STEPCOUNT= STEPPIN");

                            console.log(eliminateCount);
                            console.log(hiddenVars.length);
                            console.log(flagStagger);

                            if(arrowShow){
                                console.log("#temp"+arrowCounter);  
                                allTables[rowCounter]=[];
                                if(!flagStagger){
                                          temp=document.createElement('div');
                                          temp.style.position='absolute';
                                          temp.style.top=(posy-130)+"px";
                                          temp.style.left="100px";
                                          temp.style.zIndex="1400";
                                          temp.id="temp"+indexCounter;
                                          var my_div = document.getElementById("canvas");
                                          document.body.insertBefore(temp, my_div);
                                          var arrow1divPaper=new Raphael(("temp"+indexCounter), 300, 400);
                                          arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (30)+" "+90+"M"+(20)+" "+80+"L"+(30)+" "+90+"L"+(40)+" "+80).attr({'stroke-width': 3});
                                          text0=arrow1divPaper.text((90), 70, "JOIN ON ").attr({"font-size":"15px"});
                                          joinText=text0;
                                          $(joiner).show();
                                          joiner.style.top=(posy-80)+"px";
                                          $(joiner).val(remainingHidden[0]);
                                          $(joiner).focus();
                                          allTables[rowCounter].push(temp);
                                          indexCounter++;
                                }else{

                                          temp=document.createElement('div');
                                          temp.style.position='absolute';
                                          temp.style.top=(posy-130)+"px";
                                          temp.style.left="100px";
                                          temp.style.zIndex="1400";
                                          temp.id="temp"+indexCounter;
                                          var my_div = document.getElementById("canvas");
                                          document.body.insertBefore(temp, my_div);
                                          var arrow1divPaper=new Raphael(("temp"+indexCounter), 300, 400);
                                          
                                          var arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (30)+" "+90+"M"+(20)+" "+80+"L"+(30)+" "+90+"L"+(40)+" "+80).attr({'stroke-width': 3});
                                          var text0=arrow1divPaper.text((110), 70, "SUM OUT "+joinNode).attr({"font-size":"15px"});
                                          allTables[rowCounter].push(temp);
                                          indexCounter++;
                                }
                                
                                arrowShow=false;
                            }else if(eliminateCount<=hiddenVars.length || flagStagger){
                                console.log("KJBKJBNKJBKJBKJB"+eliminateCount);
                                
                                 //var joinNode=prompt("enter node to join on");
                                 joinNode=$(joiner).val();
                                 if(joinNode && !inferenceObserved[joinNode] && !inferenceObservedQueries[joinNode] && remainingHidden.indexOf(joinNode)!=-1){
                                    if(!flagStagger){
                                         
                                         joinText.attr("text", "JOIN ON "+joinNode);
                                         eliminateCount++;
                                         thisGraph.nodes[joinNode].variableJoin();
                                         consideredFactor=finalFactors[finalFactors.length-1];

                                          



                                            var newDiv1 = document.createElement("div");
                                            newDiv1.style.position='absolute';
                                            newDiv1.style.top=posy+"px";
                                            
                                            joiner.style.top=(posy+150+maxTable*30)+"px";
                                            
                                            newDiv1.style.left="100px";
                                            posy+=150;
                                            document.getElementById("nextButtonVariable").style.top=(posy-70)+"px";
                                            //arrow1div.style.top=(posy+20)+"px";

                                            arrow1div=document.createElement('div');

            arrow1div.style.position='absolute';
            arrow1div.style.top=(posy-140)+"px";
            arrow1div.style.left="250px";
            arrow1div.style.zIndex="1400";
            arrow1div.id="arrow1div"+counter;
            var my_div = document.getElementById("canvas");
            document.body.insertBefore(arrow1div, my_div);
            var arrow1divPaper=new Raphael('arrow1div'+counter, 800, 400);
            arrow1divPaper.rect(30,50,640, 50);
             var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px", "text-anchor":"start"});
            variables="HIDDEN : ";
            text1.attr("text", variables);
            for(var i=0;i<hiddenVars.length;i++){
                variables="";
                if(i!=0){
                    variables+=" ,";
                }
                variables+=hiddenVars[i];
                if(remainingHidden.indexOf(hiddenVars[i])==-1){
                    arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", fill:"#CCCCCC", "text-anchor":"start"});
                }else{
                    arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", "text-anchor":"start"});
                }
            }
            var text2=arrow1divPaper.text((200),70, "").attr({"font-size":"25px", "text-anchor":"start"});
            
            text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
            boxes.push(arrow1div);
            counter++;



                                            newDiv1.style.zIndex="1000";
                                            newDiv1.id="newDiv1";


                                            var parentsOfThis="";
                                            for(var j=0;j<consideredFactor.parentNodes.length;j++){
                                                if(j!=0){
                                                    parentsOfThis+=" ,";

                                                }
                                                if(!inferenceObserved[consideredFactor.parentNodes[j]]){
                                                    parentsOfThis+=consideredFactor.parentNodes[j];
                                                }else{
                                                     parentsOfThis+=inferenceObserved[consideredFactor.parentNodes[j]];
                                                }
                                            }
                                            var variablesThis="";
                                            for(var j=0;j<consideredFactor.vars.length;j++){
                                                if(j!=0){
                                                    variablesThis+=" ,";

                                                }
                                                if(!inferenceObserved[consideredFactor.vars[j]]){
                                                    variablesThis+=consideredFactor.vars[j];
                                                }else{
                                                     variablesThis+=inferenceObserved[consideredFactor.vars[j]];
                                                }
                                            }
                                             var newDiv2 = document.createElement("div");
                                             newDiv2.style.fontSize="25";
                                             newDiv2.style.fontWeight="bold";
                                             newDiv2.style.position="relative";
                                             newDiv2.style.left=(consideredFactor.table[0].length*50/2)+"px";
                                            if(consideredFactor.parentNodes.length>0){
                                                cont=document.createTextNode("f'("+variablesThis+" | "+ parentsOfThis+")");
                                            }else{
                                                cont=document.createTextNode("f'("+variablesThis+")");
                                            }
                                           
                                             newDiv2.appendChild(cont);
                                             newDiv1.appendChild(newDiv2);
                                                
                                                
                                              var my_div = document.getElementById("canvas");

                                              document.body.insertBefore(newDiv1, my_div);
                                              allTables[rowCounter].push(newDiv1);
                                              
                                              rowCounter++;
                                              stepCount++;
                                              flagStagger=true;
                                              $(joiner).hide();
                                              arrowShow=true;

                                        }else if(sumFlag==0){
                                            // for(var k=0;k<allTables[rowCounter-2].length;k++){
                                                
                                            //         for(var i=1;i<$($(allTables[rowCounter-2][k+1]).children()[1]).children().children().length;i++){
                                                       
                                            //             for(var j=0;j<$($($(allTables[rowCounter-2][k+1]).children()[1]).children().children()[i]).children().length;j++){
                                            //                 $($($(allTables[rowCounter-2][k+1]).children()[1]).children().children()[i]).children()[j].style.backgroundColor="white";
                                            //             }
                                            //         }
                                                
                                            //  }
                                            // for(var i=1;i<$($(allTables[rowCounter-1][1]).children()[1]).children().children().length;i++){
                                                   
                                            //         for(var j=0;j<$($($(allTables[rowCounter-1][1]).children()[1]).children().children()[i]).children().length;j++){
                                            //             $($($(allTables[rowCounter-1][1]).children()[1]).children().children()[i]).children()[j].style.backgroundColor="white";
                                            //         }
                                            //     }
                                            thisGraph.nodes[joinNode].variableSum();
                                            console.log(finalFactors); 
                                            xPos=100;
                



                                          var maxLength=0;
                                            for(looper=0;looper<finalFactors.length;looper++){
                                                var newDiv1 = document.createElement("div");
                                                newDiv1.style.position='absolute';
                                                newDiv1.style.top=posy+"px";
                                                     
                                                newDiv1.style.left="100px";
                                                if(looper!=0){
                                                    console.log("INSIDE FIRsT");
                                                    xPos+=finalFactors[looper-1].table[0].length*50+50;
                                                    newDiv1.style.left=(xPos)+"px";
                                                }else{
                                                    console.log("INSIDE SECOND");
                                                    newDiv1.style.left="100px";
                                                }
                                                console.log(xPos);
                                                newDiv1.style.zIndex="1000";





                                            var parentsOfThis="";
                                            for(var j=0;j<finalFactors[looper].parentNodes.length;j++){
                                                if(j!=0){
                                                    parentsOfThis+=" ,";

                                                }
                                                if(!inferenceObserved[finalFactors[looper].parentNodes[j]]){
                                                    parentsOfThis+=finalFactors[looper].parentNodes[j];
                                                }else{
                                                     parentsOfThis+=inferenceObserved[finalFactors[looper].parentNodes[j]];
                                                }
                                            }
                                            var variablesThis="";
                                            for(var j=0;j<finalFactors[looper].vars.length;j++){
                                                if(j!=0){
                                                    variablesThis+=" ,";

                                                }
                                                if(!inferenceObserved[finalFactors[looper].vars[j]]){
                                                    variablesThis+=finalFactors[looper].vars[j];
                                                }else{
                                                     variablesThis+=inferenceObserved[finalFactors[looper].vars[j]];
                                                }
                                            }
                                             var newDiv2 = document.createElement("div");
                                             newDiv2.style.fontSize="25";
                                             newDiv2.style.fontWeight="bold";
                                             newDiv2.style.position="relative";
                                             newDiv2.style.left=(finalFactors[looper].table[0].length*50/2)+"px";
                                            if(finalFactors[looper].parentNodes.length>0){
                                                cont=document.createTextNode("f("+variablesThis+" | "+ parentsOfThis+")");
                                            }else{
                                                cont=document.createTextNode("f("+variablesThis+")");
                                            }
                                                
                                           
                                            if(finalFactors[looper].table.length>maxLength){
                                                maxLength=finalFactors[looper].table.length;
                                            }
                                             newDiv2.appendChild(cont);
                                             newDiv1.appendChild(newDiv2);


                                                    
                                                    
                                                  var my_div = document.getElementById("canvas");

                                                  document.body.insertBefore(newDiv1, my_div);
                                                  $(newDiv1).hide();
                                                  allTables[rowCounter].push(newDiv1);
                                            }
                                            $(allTables[rowCounter][allTables[rowCounter].length-1]).show();
                                            if(finalFactors.length>1){
                                                
                                                sumFlag=1;

                                            }else{

                                                flagStagger=false;
                                                remainingHidden.splice(remainingHidden.indexOf(joinNode),1);
                                                variables="REMAINING HIDDEN : ";
                                                for(var i=0;i<remainingHidden.length;i++){
                                                    if(i!=0){
                                                        variables+=" ,";
                                                    }
                                                    variables+=remainingHidden[i];
                                                }
                                                //text1.attr("text", variables);
                                                arrowShow=true;
                                                if(eliminateCount>hiddenVars.length){
                                                    console.log("LEAVING");
                                                    nextType="T";
                                                    joiner.style.display="none";
                                                    flagJoin=true;
                                                }
                                                arrow1div=document.createElement('div');
                                                arrow1div.style.position='absolute';
                                                arrow1div.style.top=(posy+20)+"px";
                                                arrow1div.style.left="250px";
                                                arrow1div.style.zIndex="1400";
                                                arrow1div.id="arrow1div"+counter;
                                                var my_div = document.getElementById("canvas");
                                                document.body.insertBefore(arrow1div, my_div);
                                                var arrow1divPaper=new Raphael('arrow1div'+counter, 800, 400);
                                                arrow1divPaper.rect(30,50,640, 50);
                                                 var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                                variables="HIDDEN : ";
                                                text1.attr("text", variables);
                                                for(var i=0;i<hiddenVars.length;i++){
                                                    variables="";
                                                    if(i!=0){
                                                        variables+=" ,";
                                                    }
                                                    variables+=hiddenVars[i];
                                                    if(remainingHidden.indexOf(hiddenVars[i])==-1){
                                                        arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", fill:"#CCCCCC", "text-anchor":"start"});
                                                    }else{
                                                        arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", "text-anchor":"start"});
                                                    }
                                                }
                                                var text2=arrow1divPaper.text((60),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                                
                                                text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
                                                boxes.push(arrow1div);
                                                counter++;
                                            }
                                            rowCounter++;
                                            posy+=150;
                                            document.getElementById("nextButtonVariable").style.top=(posy-70)+"px";
                                            //arrow1div.style.top=(posy+20)+"px";  








                                            stepCount++;
                                            

                                        }else if(sumFlag==1){
                                            for(var i=0;i<allTables[rowCounter-1].length;i++){
                                                 $(allTables[rowCounter-1][i]).show();
                                            }
                                            flagStagger=false;
                                            remainingHidden.splice(remainingHidden.indexOf(joinNode),1);
                                            variables="REMAINING HIDDEN : ";
                                            for(var i=0;i<remainingHidden.length;i++){
                                                if(i!=0){
                                                    variables+=" ,";
                                                }
                                                variables+=remainingHidden[i];
                                            }
                                            //text1.attr("text", variables);
                                            arrowShow=true;
                                            if(eliminateCount>hiddenVars.length){
                                                console.log("LEAVING");
                                                nextType="T";
                                                joiner.style.display="none";
                                                flagJoin=true;
                                            }
                                            sumFlag=0;

                                            arrow1div=document.createElement('div');
                                            arrow1div.style.position='absolute';
                                            arrow1div.style.top=(posy-130)+"px";
                                            arrow1div.style.left="250px";
                                            arrow1div.style.zIndex="1400";
                                            arrow1div.id="arrow1div"+counter;
                                            var my_div = document.getElementById("canvas");
                                            document.body.insertBefore(arrow1div, my_div);
                                            var arrow1divPaper=new Raphael('arrow1div'+counter, 800, 400);
                                            arrow1divPaper.rect(30,50,640, 50);
                                             var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                            variables="HIDDEN : ";
                                            text1.attr("text", variables);
                                            for(var i=0;i<hiddenVars.length;i++){
                                                variables="";
                                                if(i!=0){
                                                    variables+=" ,";
                                                }
                                                variables+=hiddenVars[i];
                                                if(remainingHidden.indexOf(hiddenVars[i])==-1){
                                                    arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", fill:"#CCCCCC", "text-anchor":"start"});
                                                }else{
                                                    arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", "text-anchor":"start"});
                                                }
                                            }
                                            var text2=arrow1divPaper.text((60),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                            
                                            text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
                                            boxes.push(arrow1div);
                                            counter++;
                                        }
                                        
                                    }
                            }
                            
                        }
                      });
           

            joiner=document.createElement('input');
            joiner.type ="text";
            joiner.style.backgroundColor="#CCCCCC";
            joiner.style.position='absolute';
            joiner.style.top="150px";
            joiner.style.left="230px";
            joiner.style.width="30px";
            joiner.style.zIndex="1500";
            joiner.id="joiner";
               var my_div = document.getElementById("canvas");
            joiner.style.display="none";
            document.body.insertBefore(joiner, my_div);


    }

  





showVariableEliminationSuper=function(){
    var joinDivs=[];
    $("#instructionsshower").hide();
     $('#cssmenu').css("opacity", 0.1);
     $('#watermark').css("opacity", 0.1);
                      $('#inferenceMenuTop').css("opacity", 0.1); 
                      $('#top1').css("opacity", 0.1);
                      $('#showMenu').css("opacity", 0.1);
                      $('#top2').css("opacity", 0.1); 
                      $('#loadNet').css("opacity", 0.1);
                      $('#saveNet').css("opacity", 0.1); 
                      $('#loadNet1').css("opacity", 0.1);
                      $('#saveNet1').css("opacity", 0.1);
                      $('#dSepMenu').css("opacity", 0.1);
                      $('#reset').css("opacity", 0.1);        
                      $('#issues').css("opacity", 0.1);                 
                      $('#mode').attr("disabled", "disabled");                 
                      $('#loadNet').attr("disabled", "disabled");     
                      $('#clearCanvas').attr("disabled", "disabled");
                      $('#inferenceMenu').attr("disabled", "disabled");  
                      $('#getInferenceValue').attr("disabled", "disabled");               
                      $('#downloadify').hide();
                      $("#issues").hide(); 
                      modeClick=-1;
        $("#textOver").attr('disabled','disabled');        
        inferenceInstructions.hide();
        tempinferenceInstructions=buttonPaperRaphael.text(445,40,inferenceInstructions.attr("text")).attr({"font-size": 40});
        var divStorer;
        var factorStorer;
        var joinStorer;
        console.log("SUPERING");
        function clearDivRows(divConsidered){
            for(var i=1;i<$($(divConsidered).children()[1]).children().children().length;i++){
               
                for(var j=0;j<$($($(divConsidered).children()[1]).children().children()[i]).children().length;j++){
                    $($($(divConsidered).children()[1]).children().children()[i]).children()[j].style.backgroundColor="white";
                }
            }
        }
        function highlightRow(divConsidered,rowNumber, rowParent, joinVariable){
            console.log(divConsidered);
            console.log(rowParent); 
            console.log(rowNumber);
            var td1=$($(divConsidered).children()[1]).children().children()[rowNumber];
            for(var i=1;i<$($(divConsidered).children()[1]).children().children().length;i++){
               
                for(var j=0;j<$($($(divConsidered).children()[1]).children().children()[i]).children().length;j++){
                    $($($(divConsidered).children()[1]).children().children()[i]).children()[j].style.backgroundColor="white";
                }
            }
            for(var k=0;k<factorStorer.length;k++){
                for(var i=1;i<$($(allTables[rowParent-1][k+1]).children()[1]).children().children().length;i++){
                   
                    for(var j=0;j<$($($(allTables[rowParent-1][k+1]).children()[1]).children().children()[i]).children().length;j++){
                        $($($(allTables[rowParent-1][k+1]).children()[1]).children().children()[i]).children()[j].style.backgroundColor="white";
                    }
                }
            }
            console.log(td1);
            console.log(factorStorer);
            console.log(joinStorer);
            console.log($(allTables[rowParent-1]));
            for(var i=0;i<$(td1).children().length;i++){
                $(td1).children()[i].style.backgroundColor="#CCCCCC";
            }
            console.log(joinStorer.table[rowNumber]);
            for(var i=0;i<factorStorer.length;i++){
                if(factorStorer[i].vars.indexOf(joinVariable)!=-1 || factorStorer[i].parentNodes.indexOf(joinVariable)!=-1 ){
                    console.log(factorStorer[i]);
                    for(var j=1;j<factorStorer[i].table.length;j++){
                        var flag=true;
                        for(var k=0;k<factorStorer[i].table[j].length-1;k++){
                            if(joinStorer.table[0].indexOf(factorStorer[i].table[0][k])!=-1){
                                if(joinStorer.table[rowNumber][joinStorer.table[0].indexOf(factorStorer[i].table[0][k])]!=factorStorer[i].table[j][k]){
                                    flag=false;
                                    break;
                                }
                            }
                        }
                        if(flag){
                            console.log(factorStorer[i].table[j]);
                            console.log($(allTables[rowParent-1][i+1]));
                            console.log(i);
                            var td2=$($(allTables[rowParent-1][i+1]).children()[1]).children().children()[j];
                            console.log(td2);
                            for(var k=0;k<$(td2).children().length;k++){
                                $(td2).children()[k].style.backgroundColor="#CCCCCC";
                            }
                        }
                    }
                }
            }

                            
        }

        function highlightSelect(){
            console.log("highlightSelect");
            var initialFactors=Object.keys(thisGraph.nodes);
            for(var i=0;i<initialFactors.length;i++){
                    for(var j=1;j<thisGraph.nodes[initialFactors[i]].table.length;j++){
                        var flag=true;
                        for(var k=0;k<thisGraph.nodes[initialFactors[i]].table[j].length-1;k++){
                            if(inferenceObserved[thisGraph.nodes[initialFactors[i]].table[0][k]]){
                                if(inferenceObserved[thisGraph.nodes[initialFactors[i]].table[0][k]]!=thisGraph.nodes[initialFactors[i]].table[j][k]){
                                    flag=false;
                                    break;
                                }
                            }
                        }
                        if(flag){
                            var td2=$($(allTables[0][i]).children()[1]).children().children()[j];
                            console.log(td2);
                            for(var k=0;k<$(td2).children().length;k++){
                                $(td2).children()[k].style.backgroundColor="#CCCCCC";
                            }
                        }
                    }
            }
            
        }

        var counter=0;
        $("#inferenceMenu").attr('disabled','disabled');
        $("#getInferenceValue").attr('disabled','disabled');
        finalFactors=[];
        var allTables=[];
        var boxes=[];
        var sumFlag=0;
        console.log("VARIABLE VERBOSE");
        $('#canvas').css("opacity", 0.1);
        $('#instructions').css("opacity", 0.1);
                      closeButtonBrief=document.createElement('input');
                      closeButtonBrief.type ="button";
                      closeButtonBrief.value=" X ";
                      closeButtonBrief.style.position='absolute';
                      closeButtonBrief.style.top="100px";
                      closeButtonBrief.style.left="50px";
                      closeButtonBrief.style.zIndex="800";
                      closeButtonBrief.id="closeButtonVariable";
                      closeButtonBrief.style.backgroundColor="red";
                      var my_div = document.getElementById("canvas");
                      
                      document.body.insertBefore(closeButtonBrief, my_div);
                      $(closeButtonBrief).click(function(){
                        console.log("CLOSE BUTTON");
                          $('#canvas').css("opacity",1);
                          $("#instructionsshower").show();
                           $('#watermark').css("opacity", 1);
                          $('#cssmenu').css("opacity", 1);
                          $('#inferenceMenuTop').css("opacity", 1); 
                          $('#top1').css("opacity", 1);
                          $('#showMenu').css("opacity", 1);
                          $('#top2').css("opacity", 1); 
                          $('#loadNet').css("opacity", 1);
                          $('#saveNet').css("opacity", 1); 
                          $('#loadNet1').css("opacity", 1);
                          $('#saveNet1').css("opacity", 1);
                          $('#dSepMenu').css("opacity", 1);
                          $('#reset').css("opacity", 1);        
                          $('#issues').css("opacity", 1);                 
                          $('#mode').attr("disabled", "");       
                          $('#inferenceMenu').attr("disabled", "");  
                          $('#getInferenceValue').attr("disabled", "");               
                          $("#issues").show(); 
                          modeClick=4;
                          $('#instructions').css("opacity", 1);
                          $("#nextButtonVariable").remove();
                          $("#textOver").attr('disabled','');                
                          $("#closeButtonVariable").remove();
                          for(var i=0;i<allTables.length;i++){
                            for(var j=0;j<allTables[i].length;j++){
                                allTables[i][j].style.display="none";
                                $(allTables[i][j]).remove();
                            }
                          }

                          for(var j=0;j<boxes.length;j++){
                                $(boxes[j]).remove();
                            }

                          $(arrow1div).remove();
                          $(joiner).remove();
                           $("#inferenceMenu").attr('disabled','');
                           $("#getInferenceValue").attr('disabled','');
                           $("#textOver").hide();
                            inferenceInstructions.show();
                            tempinferenceInstructions.remove();
                      });

        var keysTemp=Object.keys(thisGraph.nodes); 
        var maxTable=0;
        for(var h=0;h<keysTemp.length;h++){
            if(thisGraph.nodes[keysTemp[h]].table.length>maxTable){
                maxTable=thisGraph.nodes[keysTemp[h]].table.length;
            }
        }
                    
        console.log(keysTemp);
        var xPos=100;
        allTables[0]=[];
        for(var i=0;i<keysTemp.length;i++){
                    var newDiv1 = document.createElement("div");
                    newDiv1.style.position='absolute';
                    newDiv1.style.top="150px";
                        console.log((150+thisGraph.nodes[keysTemp[i]].table[0].length*100));
                        if(i!=0){
                            xPos+=thisGraph.nodes[keysTemp[i-1]].table[0].length*50+50;
                            newDiv1.style.left=(xPos)+"px";
                            
                        }else{
                            newDiv1.style.left="100px";
                        }
                        console.log(xPos);  
                    newDiv1.style.zIndex="1000";
                    newDiv1.id="newDiv1";

                        var parentsOfThis="";
                        for(var j=0;j<thisGraph.nodes[keysTemp[i]].parents.length;j++){
                            if(j!=0){
                                parentsOfThis+=" ,";

                            }else{
                                parentsOfThis+=" |";
                            }
                            parentsOfThis+=thisGraph.nodes[keysTemp[i]].parents[j].id;
                        }
                         var newDiv2 = document.createElement("div");
                         newDiv2.style.fontSize="25";
                         newDiv2.style.fontWeight="bold";
                         newDiv2.style.position="relative";
                         newDiv2.style.top="-10px";

                         newDiv2.style.left=(thisGraph.nodes[keysTemp[i]].table[0].length*50/2)+"px";
                         cont=document.createTextNode("P("+keysTemp[i]+parentsOfThis+")");
                       
                         newDiv2.appendChild(cont);
                         newDiv1.appendChild(newDiv2);
                        row=new Array();
                        cell=new Array();

                        row_num=12; //edit this value to suit
                        cell_num=12; //edit this value to suit

                        tab=document.createElement('table');
                        tab.border="1";
                        tab.style.borderCollapse="collapse";
                        tab.style.cellPadding="10";
                        tab.setAttribute('id','newtable');

                        tbo=document.createElement('tbody');
                        row[0]=document.createElement('tr');
                        for(k=0;k<thisGraph.nodes[keysTemp[i]].table[0].length;k++) {
                                cell[k]=document.createElement('td');
                                cell[k].setAttribute("style","background-color: #003366; color:#ffffff; text-align:center;");

                                cont=document.createTextNode(thisGraph.nodes[keysTemp[i]].table[0][k]);
                                cell[k].appendChild(cont);
                                row[0].appendChild(cell[k]);
                        }
            
                        tbo.appendChild(row[0]);
                        for(c=1;c<thisGraph.nodes[keysTemp[i]].table.length;c++){
                            row[c]=document.createElement('tr');
                            for(k=0;k<thisGraph.nodes[keysTemp[i]].table[c].length;k++) {
                                cell[k]=document.createElement('td');
                                if(k==thisGraph.nodes[keysTemp[i]].table[c].length-1){
                                    cont=document.createTextNode(thisGraph.nodes[keysTemp[i]].table[c][k].toFixed(3));
                                }else{
                                    cont=document.createTextNode(thisGraph.nodes[keysTemp[i]].table[c][k]);
                                }

                                cell[k].appendChild(cont);
                                if(k==thisGraph.nodes[keysTemp[i]].table[c].length-1){
                                    cell[k].style.paddingLeft="10px";
                                    cell[k].style.paddingRight="10px";
                                }
                                row[c].appendChild(cell[k]);
                            }

                            tbo.appendChild(row[c]);
                        }
                        
                        tab.appendChild(tbo);
                        
                        
                        newDiv1.appendChild(tab);
                        
                      var my_div = document.getElementById("canvas");

                      document.body.insertBefore(newDiv1, my_div);
                      allTables[0].push(newDiv1);

        }  
        
        arrows=[];
        var indexCounter=0;
        var xPos=100;
        allTables[1]=[];
          temp=document.createElement('div');
                      temp.style.position='absolute';
                      temp.style.top=(170+maxTable*30)+"px";
                      temp.style.left="100px";
                      temp.style.zIndex="1400";
                      temp.id="temp"+indexCounter;
                      var my_div = document.getElementById("canvas");
                      document.body.insertBefore(temp, my_div);
                      var arrow1divPaper=new Raphael(("temp"+indexCounter), 300, 400);
                      var arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (30)+" "+90+"M"+(20)+" "+80+"L"+(30)+" "+90+"L"+(40)+" "+80).attr({'stroke-width': 3});
                      var text0=arrow1divPaper.text((90), 70, "SELECT").attr({"font-size":"15px"});
                      temp.style.display="none";
                      allTables[1].push(temp);
                      indexCounter++;
                      var maxTable1=0;
        for(var i=0;i<keysTemp.length;i++){

                        var a=new Object();
                        a.table=thisGraph.nodes[keysTemp[i]].table.slice();
                        a.vars=[thisGraph.nodes[keysTemp[i]].id];
                        a.parentNodes=[];
                        for(var j=0;j<thisGraph.nodes[keysTemp[i]].parents.length;j++){
                            a.parentNodes.push(thisGraph.nodes[keysTemp[i]].parents[j].id)
                        }
                        var evidenceSelected=(selectOnEvidence(a,inferenceObserved));           
                    
                    var newDiv1 = document.createElement("div");
                    
                    if(evidenceSelected.table.length>maxTable1){
                            maxTable1=evidenceSelected.table.length;
                    }
                    newDiv1.style.position='absolute';
                    newDiv1.style.top=(300+maxTable*30)+"px";
                        
                        var parentsOfThis="";
                        for(var j=0;j<thisGraph.nodes[keysTemp[i]].parents.length;j++){
                            if(j!=0){
                                parentsOfThis+=" ,";
                            }else{
                                parentsOfThis+=" |";
                            }
                            if(!inferenceObserved[thisGraph.nodes[keysTemp[i]].parents[j].id]){
                                parentsOfThis+=thisGraph.nodes[keysTemp[i]].parents[j].id;
                            }else{
                                 parentsOfThis+=inferenceObserved[thisGraph.nodes[keysTemp[i]].parents[j].id];
                            }
                        }
                         var newDiv2 = document.createElement("div");
                         newDiv2.style.fontSize="25";
                         newDiv2.style.fontWeight="bold";
                         newDiv2.style.position="relative";
                         newDiv2.style.top="-10px";
                         newDiv2.style.left=(thisGraph.nodes[keysTemp[i]].table[0].length*50/2)+"px";
                         if(!inferenceObserved[keysTemp[i]]){
                            cont=document.createTextNode("f("+keysTemp[i]+parentsOfThis+")");
                        }else{
                            cont=document.createTextNode("f("+inferenceObserved[keysTemp[i]]+parentsOfThis+")");
                        }
                       
                         newDiv2.appendChild(cont);
                         newDiv1.appendChild(newDiv2);

                        console.log((150+thisGraph.nodes[keysTemp[i]].table[0].length*100));
                        if(i!=0){
                            xPos+=thisGraph.nodes[keysTemp[i-1]].table[0].length*50+50;
                            newDiv1.style.left=(xPos)+"px";
                            
                        }else{
                            newDiv1.style.left="100px";
                        }
                        
                    newDiv1.style.zIndex="1000";
                    newDiv1.id="newDiv1";
                        row=new Array();
                        cell=new Array();

                        row_num=12; //edit this value to suit
                        cell_num=12; //edit this value to suit

                        tab=document.createElement('table');
                        tab.border="1";
                        tab.style.borderCollapse="collapse";
                        tab.style.cellPadding="10";
                        tab.setAttribute('id','newtable');

                        tbo=document.createElement('tbody');
                        row[0]=document.createElement('tr');
                        for(k=0;k<thisGraph.nodes[keysTemp[i]].table[0].length;k++) {
                                cell[k]=document.createElement('td');
                                cell[k].setAttribute("style","background-color: #003366; color:#ffffff; text-align:center;");

                                cont=document.createTextNode(thisGraph.nodes[keysTemp[i]].table[0][k]);
                                cell[k].appendChild(cont);
                                row[0].appendChild(cell[k]);
                        }
            
                        tbo.appendChild(row[0]);
                        for(c=1;c<evidenceSelected.table.length;c++){
                            row[c]=document.createElement('tr');
                            for(k=0;k<evidenceSelected.table[c].length;k++) {
                                cell[k]=document.createElement('td');
                                if(k==evidenceSelected.table[c].length-1){
                                    cont=document.createTextNode(evidenceSelected.table[c][k].toFixed(3));
                                }else{
                                    cont=document.createTextNode(evidenceSelected.table[c][k]);
                                }

                                cell[k].appendChild(cont);
                                if(k==thisGraph.nodes[keysTemp[i]].table[c].length-1){
                                    cell[k].style.paddingLeft="10px";
                                    cell[k].style.paddingRight="10px";
                                }
                                row[c].appendChild(cell[k]);
                            }

                            tbo.appendChild(row[c]);
                        }
                        
                        tab.appendChild(tbo);
                        
                        
                        newDiv1.appendChild(tab);
                        
                      var my_div = document.getElementById("canvas");

                      document.body.insertBefore(newDiv1, my_div);
                      
                      allTables[1].push(newDiv1);

                      newDiv1.style.display="none";
        }  
                        //drawArrow(0,(250+maxTable*30), "SELECT", ("temp"+indexCounter), false);
                        
                    



            var keysTemp=Object.keys(thisGraph.nodes); 
            var vars=[];
            for(var i=0;i<keysTemp.length;i++){
                vars.push(thisGraph.nodes[keysTemp[i]].id);
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
            //makeshift
            var posy=450+maxTable*30+maxTable1*30;
            var rowCounter=2;
            var hiddenVars=[];
            var remainingHidden=[];
            for(var i=0;i<vars.length;i++){
                if(!inferenceObserved[keysTemp[i]] && !inferenceObservedQueries[keysTemp[i]]){
                    hiddenVars.push(keysTemp[i]);
                    remainingHidden.push(keysTemp[i]);
                }
            }
            console.log(hiddenVars);

            nextButton=document.createElement('input');
            nextButton.type ="button";
            nextButton.style.backgroundColor="#CCCCCC";
            nextButton.value=" Next ";
            nextButton.style.position='absolute';
            nextButton.style.top=(230+maxTable*30)+"px";
            nextButton.style.left="10px";
            nextButton.style.zIndex="1500";
            nextButton.id="nextButtonVariable";

            arrow1div=document.createElement('div');

            arrow1div.style.position='absolute';
            arrow1div.style.top=(160+maxTable*30)+"px";
            arrow1div.style.left="250px";
            arrow1div.style.zIndex="1400";
           arrow1div.id="arrow1div"+counter;
            var my_div = document.getElementById("canvas");
            document.body.insertBefore(arrow1div, my_div);
            var arrow1divPaper=new Raphael('arrow1div'+counter, 800, 400);
            arrow1divPaper.rect(30,50,640, 50);
             var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px", "text-anchor":"start"});
            variables="HIDDEN : ";
            text1.attr("text", variables);
            for(var i=0;i<hiddenVars.length;i++){
                variables="";
                if(i!=0){
                    variables+=" ,";
                }
                variables+=hiddenVars[i];
                
                    arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", "text-anchor":"start"});
            }
            var text2=arrow1divPaper.text((60),70, "").attr({"font-size":"25px", "text-anchor":"start"});
            
            text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
            boxes.push(arrow1div);
            counter++;
            var my_div = document.getElementById("canvas");
            var flagStagger=false;
            document.body.insertBefore(nextButton, my_div);

            /*for(var j=0;j<allTables.length;j++){
                for(var i=0;i<allTables[j].length;i++){
                                    allTables[j][i].style.display="none";
                }
            }*/
            eliminateCount=1;
            var flagJoin=false;
            var nextType="T";
            var arrowShow=true;
            var arrowCounter=1;
            var counterJoin=0;
            var joinText;
                      var stepCount=0;
                      $(nextButton).click(function(){
                        if(nextType=="T"){
                            console.log("INSIDE T");
                            if(stepCount==0){
                                $("#temp0").show();
                                stepCount++;
                            }else if(stepCount==1){
                                for(var i=0;i<allTables[stepCount].length;i++){
                                    allTables[stepCount][i].style.display="block";
                                }
                                document.getElementById("nextButtonVariable").style.top=(posy-70)+"px";
                                highlightSelect();
                                stepCount++;
                                nextType="S";
                                //arrow1div.style.top=(posy+20)+"px"


                                arrow1div=document.createElement('div');
                                arrow1div.style.position='absolute';
                                arrow1div.style.top=(posy-140)+"px";
                                arrow1div.style.left="250px";
                                arrow1div.style.zIndex="1400";
                                arrow1div.id="arrow1div"+counter;
                                var my_div = document.getElementById("canvas");
                                document.body.insertBefore(arrow1div, my_div);
                                var arrow1divPaper=new Raphael('arrow1div'+counter, 800, 400);
                                arrow1divPaper.rect(30,50,640, 50);
                                 var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                variables="HIDDEN : ";
                                text1.attr("text", variables);
                                for(var i=0;i<hiddenVars.length;i++){
                                    variables="";
                                    if(i!=0){
                                        variables+=" ,";
                                    }
                                    variables+=hiddenVars[i];
                                    
                                        arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", "text-anchor":"start"});
                                    
                                }
                                var text2=arrow1divPaper.text((60),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                
                                text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
                                boxes.push(arrow1div);
                                counter++;


                                if(hiddenVars.length==0){
                                    flagJoin=true;
                                    nextType="T";
                                    console.log("NO HIDDEN VARIABLES");
                                }





                                factorStorer=finalFactors.slice();
                            }else if(flagJoin){
                                for(var k=0;k<finalFactors.length;k++){
                                            
                                                console.log("FILLLING");
                                                for(var i=1;i<$($(allTables[rowCounter-1][k+1]).children()[1]).children().children().length;i++){
                                                   
                                                    for(var j=0;j<$($($(allTables[rowCounter-1][k+1]).children()[1]).children().children()[i]).children().length;j++){
                                                        $($($(allTables[rowCounter-1][k+1]).children()[1]).children().children()[i]).children()[j].style.backgroundColor="#CCCCCC";
                                                    }
                                                }
                                }
                                console.log(finalFactors.slice());
                                var inferenceKeys=Object.keys(inferenceObservedQueries);
                                console.log(inferenceKeys);
                                for(var i=0;i<inferenceKeys.length;i++){
                                    thisGraph.nodes[inferenceKeys[i]].variableJoin();
                                }

                                var inferenceKeys=Object.keys(inferenceObserved);
                                console.log(inferenceKeys);
                                for(var i=0;i<inferenceKeys.length;i++){
                                    thisGraph.nodes[inferenceKeys[i]].variableJoin();
                                }

                                //thisGraph.nodes["A"].variableJoin();
                                //thisGraph.nodes["C"].variableJoin();
                                console.log(finalFactors.slice());
                                console.log(finalFactors.length);
                                console.log(allTables);

                                while(finalFactors.length>1){
                                    first=finalFactors[0];
                                    second=finalFactors[1];
                                    finalFactors.splice(0,1);
                                    finalFactors.splice(0,1);
                                    var tempCombined=[];
                                    var firstTop=first.table[0].slice(0,first.table[0].length-1);
                                    var secondTop=second.table[0].slice(0,second.table[0].length-1);
                                    console.log(firstTop);
                                    console.log(secondTop);
                                    tempCombined.push(firstTop.concat(secondTop).concat(["P"]));
                                    
                                    for(var i=1;i<first.table.length;i++){
                                        for(j=1;j<second.table.length;j++){
                                            var valueEnd=first.table[i][first.table[i].length-1]*second.table[j][second.table[j].length-1];
                                            console.log(valueEnd);
                                            
                                            
                                            tempCombined.push(first.table[i].slice(0,first.table[i].length-1).concat(second.table[j].slice(0,second.table[j].length-1)).concat([valueEnd]));
                                        }
                                    }
                                    
                                    console.log(first);
                                    console.log(second);

                                    var finalJointObject=new Object();
                                    finalJointObject.table=tempCombined.slice();
                                    finalJointObject.vars=first.vars.concat(second.vars);
                                    finalFactors.push(finalJointObject);
                                }

                                consideredFactor=finalFactors[0];
                                allTables[rowCounter]=[];
                                          temp=document.createElement('div');
                                          temp.style.position='absolute';
                                          temp.style.top=(posy-130)+"px";
                                          temp.style.left="100px";
                                          temp.style.zIndex="1400";
                                          temp.id="temp"+indexCounter;
                                          var my_div = document.getElementById("canvas");
                                          document.body.insertBefore(temp, my_div);
                                          var arrow1divPaper=new Raphael(("temp"+indexCounter), 300, 400);
                                          var arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (30)+" "+90+"M"+(20)+" "+80+"L"+(30)+" "+90+"L"+(40)+" "+80).attr({'stroke-width': 3});
                                          var text0=arrow1divPaper.text((110), 70, "JOIN REMAINING").attr({"font-size":"15px"});
                                          allTables[rowCounter].push(temp);
                                          indexCounter++;

                                var newDiv1 = document.createElement("div");
                                newDiv1.style.position='absolute';
                                newDiv1.style.top=posy+"px";
                                
                                           
                                            //arrow1div.style.top=(posy+100+maxTable*30)+"px"




                                newDiv1.style.left="100px";
                                newDiv1.style.zIndex="1000";
                                newDiv1.id="newDiv1";


                        var variablesThis="";
                        for(var j=0;j<consideredFactor.vars.length;j++){
                            if(j!=0){
                                variablesThis+=" ,";

                            }
                            if(!inferenceObserved[consideredFactor.vars[j]]){
                                variablesThis+=consideredFactor.vars[j];
                            }else{
                                 variablesThis+=inferenceObserved[consideredFactor.vars[j]];
                            }
                        }
                         var newDiv2 = document.createElement("div");
                         newDiv2.style.fontSize="25";
                         newDiv2.style.fontWeight="bold";
                         newDiv2.style.position="relative";
                         newDiv2.style.top="-10px";
                         newDiv2.style.left=(consideredFactor.table[0].length*50/2)+"px";
    
                            cont=document.createTextNode("f("+variablesThis+")");
                       
                       
                         newDiv2.appendChild(cont);
                         newDiv1.appendChild(newDiv2);







                                    row=new Array();
                                    cell=new Array();

                                    row_num=12; //edit this value to suit
                                    cell_num=12; //edit this value to suit

                                    tab=document.createElement('table');
                                    tab.border="1";
                                    tab.style.borderCollapse="collapse";
                                    tab.style.cellPadding="10";
                                    tab.setAttribute('id','newtable');

                                    tbo=document.createElement('tbody');
                                    row[0]=document.createElement('tr');
                                    for(k=0;k<consideredFactor.table[0].length;k++) {
                                            cell[k]=document.createElement('td');
                                            cell[k].setAttribute("style","background-color: #003366; color:#ffffff; text-align:center;");

                                            cont=document.createTextNode(consideredFactor.table[0][k]);
                                            cell[k].appendChild(cont);
                                            row[0].appendChild(cell[k]);
                                    }
                        
                                    tbo.appendChild(row[0]);
                                    for(c=1;c<consideredFactor.table.length;c++){
                                        row[c]=document.createElement('tr');
                                        for(k=0;k<consideredFactor.table[c].length;k++) {
                                            cell[k]=document.createElement('td');
                                            cell[k].style.backgroundColor="#CCCCCC";
                                            if(k==consideredFactor.table[c].length-1){
                                                cont=document.createTextNode(consideredFactor.table[c][k].toFixed(3));
                                            }else{
                                                cont=document.createTextNode(consideredFactor.table[c][k]);
                                            }
                                            

                                            cell[k].appendChild(cont);
                                            if(k==consideredFactor.table[c].length-1){
                                                cell[k].style.paddingLeft="10px";
                                                cell[k].style.paddingRight="10px";
                                            }
                                            row[c].appendChild(cell[k]);
                                        }

                                        tbo.appendChild(row[c]);
                                    }
                                    
                                    tab.appendChild(tbo);
                                    
                                    
                                    newDiv1.appendChild(tab);
                                    document.getElementById("nextButtonVariable").style.top=(posy+consideredFactor.table.length*30)+"px";
                                  var my_div = document.getElementById("canvas");

                                  document.body.insertBefore(newDiv1, my_div);
                                  
                                  allTables[rowCounter].push(newDiv1);

                                  rowCounter++;
                                        flagJoin=false;
                            }else{
                                            for(var k=0;k<allTables[rowCounter-2].length;k++){
                                                
                                                    for(var i=1;i<$($(allTables[rowCounter-2][k+1]).children()[1]).children().children().length;i++){
                                                       
                                                        for(var j=0;j<$($($(allTables[rowCounter-2][k+1]).children()[1]).children().children()[i]).children().length;j++){
                                                            $($($(allTables[rowCounter-2][k+1]).children()[1]).children().children()[i]).children()[j].style.backgroundColor="white";
                                                        }
                                                    }
                                                
                                            }
                                            for(var i=1;i<$($(allTables[rowCounter-1][1]).children()[1]).children().children().length;i++){
                                                   
                                                    for(var j=0;j<$($($(allTables[rowCounter-1][1]).children()[1]).children().children()[i]).children().length;j++){
                                                        $($($(allTables[rowCounter-1][1]).children()[1]).children().children()[i]).children()[j].style.backgroundColor="white";
                                                    }
                                                }                                
                                var probSum=0;
                                for(var i=1;i<finalFactors[0].table.length;i++){
                                    probSum+=finalFactors[0].table[i][finalFactors[0].table[i].length-1];
                                }

                                for(var i=1;i<finalFactors[0].table.length;i++){
                                    finalFactors[0].table[i][finalFactors[0].table[i].length-1]=finalFactors[0].table[i][finalFactors[0].table[i].length-1]/probSum;
                                }

                                consideredFactor=finalFactors[0];
                                allTables[rowCounter]=[];
                                        temp=document.createElement('div');
                                          temp.style.position='absolute';
                                          temp.style.top=(posy)+"px";
                                          temp.style.left=(100+consideredFactor.table[0].length*100)+"px";
                                          temp.style.zIndex="1400";
                                          temp.id="temp"+indexCounter;
                                          var my_div = document.getElementById("canvas");
                                          document.body.insertBefore(temp, my_div);
                                          var arrow1divPaper=new Raphael(("temp"+indexCounter), 400, 400);
                                          var arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (70)+" "+50+"M"+(60)+" "+40+"L"+(70)+" "+50+"L"+(60)+" "+60).attr({'stroke-width': 3});
                                          var text0=arrow1divPaper.text((70), 90, "NORMALIZE").attr({"font-size":"15px"});
                                          var text4=arrow1divPaper.text((70), 110, "x(1/Z)").attr({"font-size":"15px"});
                                          allTables[rowCounter].push(temp);
                                          indexCounter++;

                                          temp=document.createElement('div');
                                          temp.style.position='absolute';
                                          temp.style.top=(posy+finalFactors[0].table.length*50-10)+"px";
                                          temp.style.left=(100)+"px";
                                          temp.style.zIndex="1400";
                                          temp.id="temp"+indexCounter;
                                          var my_div = document.getElementById("canvas");
                                          document.body.insertBefore(temp, my_div);
                                          var arrow1divPaper=new Raphael(("temp"+indexCounter), 400, 400);
                                          var text0=arrow1divPaper.text((10), 10, "+").attr({"font-size":"25px"});
                                          var arrow0=arrow1divPaper.path("M"+(0)+" "+30+"L"+ (40+finalFactors[0].table[0].length*50)+" "+30).attr({"stroke-width":3});
                                          var text0=arrow1divPaper.text((20), 50, "Z = ").attr({"font-size":"25px"});
                                          var text3=arrow1divPaper.text((20+finalFactors[0].table[0].length*50), 50, probSum).attr({"font-size":"25px"});
                                          allTables[rowCounter].push(temp);
                                          indexCounter++;

                                        var newDiv1 = document.createElement("div");
                                        newDiv1.style.position='absolute';
                                        newDiv1.style.top=posy+"px";
                                        newDiv1.style.left=(250+consideredFactor.table[0].length*100)+"px";
                                        posy+=50+finalFactors[0]*30;
                                        newDiv1.style.zIndex="1000";
                                        newDiv1.id="newDiv1";


                                         var newDiv2 = document.createElement("div");
                                         newDiv2.style.fontSize="25";
                                         newDiv2.style.fontWeight="bold";
                                         newDiv2.style.position="relative";
                                         newDiv2.style.top="-10px";
                                         newDiv2.style.left=(consideredFactor.table[0].length*50/2)+"px";
                    
                                            cont=document.createTextNode(inferenceInstructions.attr("text"));
                                       
                                       
                                         newDiv2.appendChild(cont);
                                         newDiv1.appendChild(newDiv2);
                                            row=new Array();
                                            cell=new Array();

                                            row_num=12; //edit this value to suit
                                            cell_num=12; //edit this value to suit

                                            tab=document.createElement('table');
                                            tab.border="1";
                                            tab.style.borderCollapse="collapse";
                                            tab.style.cellPadding="10";
                                            tab.setAttribute('id','newtable');

                                            tbo=document.createElement('tbody');
                                            row[0]=document.createElement('tr');
                                            for(k=0;k<consideredFactor.table[0].length;k++) {
                                                    cell[k]=document.createElement('td');
                                                    cell[k].setAttribute("style","background-color: #003366; color:#ffffff; text-align:center;");

                                                    cont=document.createTextNode(consideredFactor.table[0][k]);
                                                    cell[k].appendChild(cont);
                                                    row[0].appendChild(cell[k]);
                                            }
                                
                                            tbo.appendChild(row[0]);
                                            for(c=1;c<consideredFactor.table.length;c++){
                                                row[c]=document.createElement('tr');
                                                for(k=0;k<consideredFactor.table[c].length;k++) {
                                                    cell[k]=document.createElement('td');
                                                    if(k==consideredFactor.table[c].length-1){
                                                        cont=document.createTextNode(consideredFactor.table[c][k].toFixed(3));
                                                    }else{
                                                        cont=document.createTextNode(consideredFactor.table[c][k]);
                                                    }

                                                    cell[k].appendChild(cont);
                                                    if(k==consideredFactor.table[c].length-1){
                                                        cell[k].style.paddingLeft="10px";
                                                        cell[k].style.paddingRight="10px";
                                                    }
                                                    row[c].appendChild(cell[k]);
                                                }

                                                tbo.appendChild(row[c]);
                                            }
                                            
                                            tab.appendChild(tbo);
                                            
                                            
                                            newDiv1.appendChild(tab);
                                            
                                          var my_div = document.getElementById("canvas");

                                          document.body.insertBefore(newDiv1, my_div);
                                          
                                          allTables[rowCounter].push(newDiv1);

                                          rowCounter++;
                                          $(this).hide();
                                          $("#inferenceMenu").attr('disabled','');
                                          $("#getInferenceValue").attr('disabled','');
                            }
                            
                        }else{
                            console.log("NEXT STEPCOUNT= STEPPIN");

                            console.log(eliminateCount);
                            console.log(hiddenVars.length);
                            console.log(flagStagger);
                            console.log(counterJoin);
                            console.log(eliminateCount);
                            console.log(hiddenVars.length);
                            console.log(sumFlag);
                            if(arrowShow){
                                console.log("#temp"+arrowCounter);  
                                allTables[rowCounter]=[];
                                if(!flagStagger){
                                          temp=document.createElement('div');
                                          temp.style.position='absolute';
                                          temp.style.top=(posy-130)+"px";
                                          temp.style.left="100px";
                                          temp.style.zIndex="1400";
                                          temp.id="temp"+indexCounter;
                                          var my_div = document.getElementById("canvas");
                                          document.body.insertBefore(temp, my_div);
                                          var arrow1divPaper=new Raphael(("temp"+indexCounter), 300, 400);
                                          arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (30)+" "+90+"M"+(20)+" "+80+"L"+(30)+" "+90+"L"+(40)+" "+80).attr({'stroke-width': 3});
                                          text0=arrow1divPaper.text((90), 70, "JOIN ON ").attr({"font-size":"15px"});
                                          joinText=text0;
                                          $(joiner).show();
                                          joiner.style.top=(posy-80)+"px";
                                          $(joiner).val(remainingHidden[0]);
                                          $(joiner).focus();
                                          allTables[rowCounter].push(temp);
                                          indexCounter++;
                                }else{

                                          temp=document.createElement('div');
                                          temp.style.position='absolute';
                                          temp.style.top=(posy-130)+"px";
                                          temp.style.left="100px";
                                          temp.style.zIndex="1400";
                                          temp.id="temp"+indexCounter;
                                          var my_div = document.getElementById("canvas");
                                          document.body.insertBefore(temp, my_div);
                                          var arrow1divPaper=new Raphael(("temp"+indexCounter), 300, 400);
                                          
                                          var arrow0=arrow1divPaper.path("M"+(30)+" "+50+"L"+ (30)+" "+90+"M"+(20)+" "+80+"L"+(30)+" "+90+"L"+(40)+" "+80).attr({'stroke-width': 3});
                                          var text0=arrow1divPaper.text((110), 70, "SUM OUT "+joinNode).attr({"font-size":"15px"});
                                          allTables[rowCounter].push(temp);
                                          indexCounter++;
                                }
                                
                                arrowShow=false;
                            }else if(eliminateCount<=hiddenVars.length || flagStagger){
                                console.log("KJBKJBNKJBKJBKJB"+eliminateCount);
                                
                                 //var joinNode=prompt("enter node to join on");
                                 joinNode=$(joiner).val();
                                 if(joinNode && !inferenceObserved[joinNode] && !inferenceObservedQueries[joinNode] && remainingHidden.indexOf(joinNode)!=-1){
                                    if(!flagStagger){
                                      if(counterJoin==0){
                                        
                                        console.log("INSIDE COUNTERJOIN=0");
                                         joinText.attr("text", "JOIN ON "+joinNode);
                                         
                                         thisGraph.nodes[joinNode].variableJoin();
                                         consideredFactor=finalFactors[finalFactors.length-1];

                                          



                                            var newDiv1 = document.createElement("div");
                                            newDiv1.style.position='absolute';
                                            newDiv1.style.top=posy+"px";
                                            
                                            joiner.style.top=(posy+150+maxTable*30)+"px";
                                            
                                            newDiv1.style.left="100px";
                                            posy+=150+consideredFactor.table.length*30;
                                            document.getElementById("nextButtonVariable").style.top=(posy-70)+"px";
                                            //arrow1div.style.top=(posy+20)+"px";

                                            arrow1div=document.createElement('div');

                                            arrow1div.style.position='absolute';
                                            arrow1div.style.top=(posy-130)+"px";
                                            arrow1div.style.left="250px";
                                            arrow1div.style.zIndex="1400";
                                            arrow1div.id="arrow1div"+counter;
                                            var my_div = document.getElementById("canvas");
                                            document.body.insertBefore(arrow1div, my_div);
                                            var arrow1divPaper=new Raphael('arrow1div'+counter, 800, 400);
                                            arrow1divPaper.rect(30,50,640, 50);
                                             var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px"});
                                            variables="HIDDEN : ";
                                            text1.attr("text", variables);
                                            for(var i=0;i<hiddenVars.length;i++){
                                                variables="";
                                                if(i!=0){
                                                    variables+=" ,";
                                                }
                                                variables+=hiddenVars[i];
                                                if(remainingHidden.indexOf(hiddenVars[i])==-1){
                                                    arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", fill:"#CCCCCC", "text-anchor":"start"});
                                                }else{
                                                    arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", "text-anchor":"start"});
                                                }
                                            }
                                            var text2=arrow1divPaper.text((60),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                            
                                            text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
                                            boxes.push(arrow1div);
                                            counter++;



                                            newDiv1.style.zIndex="1000";
                                            newDiv1.id="newDiv1";


                                            var parentsOfThis="";
                                            for(var j=0;j<consideredFactor.parentNodes.length;j++){
                                                if(j!=0){
                                                    parentsOfThis+=" ,";

                                                }
                                                if(!inferenceObserved[consideredFactor.parentNodes[j]]){
                                                    parentsOfThis+=consideredFactor.parentNodes[j];
                                                }else{
                                                     parentsOfThis+=inferenceObserved[consideredFactor.parentNodes[j]];
                                                }
                                            }
                                            var variablesThis="";
                                            for(var j=0;j<consideredFactor.vars.length;j++){
                                                if(j!=0){
                                                    variablesThis+=" ,";

                                                }
                                                if(!inferenceObserved[consideredFactor.vars[j]]){
                                                    variablesThis+=consideredFactor.vars[j];
                                                }else{
                                                     variablesThis+=inferenceObserved[consideredFactor.vars[j]];
                                                }
                                            }
                                             var newDiv2 = document.createElement("div");
                                             newDiv2.style.fontSize="25";
                                             newDiv2.style.fontWeight="bold";
                                             newDiv2.style.position="relative";
                                             newDiv2.style.top="-10px";
                                             newDiv2.style.left=(consideredFactor.table[0].length*50/2)+"px";
                                            if(consideredFactor.parentNodes.length>0){
                                                cont=document.createTextNode("f'("+variablesThis+" | "+ parentsOfThis+")");
                                            }else{
                                                cont=document.createTextNode("f'("+variablesThis+")");
                                            }
                                           
                                             newDiv2.appendChild(cont);
                                             newDiv1.appendChild(newDiv2);
                                                row=new Array();
                                                cell=new Array();

                                                row_num=12; //edit this value to suit
                                                cell_num=12; //edit this value to suit

                                                tab=document.createElement('table');
                                                tab.border="1";
                                                tab.style.borderCollapse="collapse";
                                                tab.style.cellPadding="10";
                                                tab.setAttribute('id','newtable');

                                                tbo=document.createElement('tbody');
                                                row[0]=document.createElement('tr');
                                                for(k=0;k<consideredFactor.table[0].length;k++) {
                                                        cell[k]=document.createElement('td');
                                                        cell[k].setAttribute("style","background-color: #003366; color:#ffffff; text-align:center;");

                                                        cont=document.createTextNode(consideredFactor.table[0][k]);
                                                        cell[k].appendChild(cont);
                                                        row[0].appendChild(cell[k]);
                                                }
                                    
                                                tbo.appendChild(row[0]);
                                                for(c=1;c<consideredFactor.table.length;c++){
                                                    row[c]=document.createElement('tr');
                                                    for(k=0;k<consideredFactor.table[c].length;k++) {
                                                        cell[k]=document.createElement('td');
                                                        // cell[k].setAttribute("style","background-color: #CCCCCC;");
                                                        if(k==consideredFactor.table[c].length-1){
                                                            cont=document.createTextNode(consideredFactor.table[c][k].toFixed(3));
                                                            cell[k].setAttribute("style","color: white");      
                                                            joinDivs.push(cell[k]);                                                     
                                                        }else{
                                                            cont=document.createTextNode(consideredFactor.table[c][k]);
                                                        }

                                                        cell[k].appendChild(cont);
                                                        if(k==consideredFactor.table[c].length-1){
                                                            cell[k].style.paddingLeft="10px";
                                                            cell[k].style.paddingRight="10px";
                                                        }
                                                        row[c].appendChild(cell[k]);
                                                    }

                                                    tbo.appendChild(row[c]);
                                                }
                                                
                                                tab.appendChild(tbo);
                                                
                                                
                                                newDiv1.appendChild(tab);
                                                
                                              var my_div = document.getElementById("canvas");

                                              document.body.insertBefore(newDiv1, my_div);
                                              allTables[rowCounter].push(newDiv1);
                                              
                                              rowCounter++;
                                              stepCount++;
                                              // flagStagger=true;
                                              $(joiner).hide();
                                              // arrowShow=true;
                                              counterJoin++;
                                              divStorer=newDiv1;
                                              joinStorer=consideredFactor;
                                          }else{
                                                console.log("INSIDE SECOND TIME");
                                                if(counterJoin<consideredFactor.table.length){
                                                    highlightRow(divStorer,counterJoin, rowCounter-1, joinNode);
                                                    joinDivs[0].style.color="black";
                                                    joinDivs.splice(0,1);
                                                    counterJoin++;
                                                    if(counterJoin==consideredFactor.table.length){
                                                        joinDivs=[];
                                                        counterJoin=0;
                                                        flagStagger=true;
                                                        arrowShow=true;
                                                        
                                                    }
                                                }
                                            }
                                        }else if(sumFlag==0){
                                            clearDivRows(divStorer);
                                                        for(var i=1;i<allTables[rowCounter-2].length;i++){
                                                            clearDivRows(allTables[rowCounter-2][i]);
                                                        }
                                            
                                            thisGraph.nodes[joinNode].variableSum();
                                            console.log(finalFactors); 
                                            xPos=100;
                



                                          var maxLength=0;
                                            for(looper=0;looper<finalFactors.length;looper++){
                                                var newDiv1 = document.createElement("div");
                                                newDiv1.style.position='absolute';
                                                newDiv1.style.top=posy+"px";
                                                     
                                                newDiv1.style.left="100px";
                                                if(looper!=0){
                                                    console.log("INSIDE FIRsT");
                                                    xPos+=finalFactors[looper-1].table[0].length*50+50;
                                                    newDiv1.style.left=(xPos)+"px";
                                                }else{
                                                    console.log("INSIDE SECOND");
                                                    newDiv1.style.left="100px";
                                                }
                                                console.log(xPos);
                                                newDiv1.style.zIndex="1000";





                                            var parentsOfThis="";
                                            for(var j=0;j<finalFactors[looper].parentNodes.length;j++){
                                                if(j!=0){
                                                    parentsOfThis+=" ,";

                                                }
                                                if(!inferenceObserved[finalFactors[looper].parentNodes[j]]){
                                                    parentsOfThis+=finalFactors[looper].parentNodes[j];
                                                }else{
                                                     parentsOfThis+=inferenceObserved[finalFactors[looper].parentNodes[j]];
                                                }
                                            }
                                            var variablesThis="";
                                            for(var j=0;j<finalFactors[looper].vars.length;j++){
                                                if(j!=0){
                                                    variablesThis+=" ,";

                                                }
                                                if(!inferenceObserved[finalFactors[looper].vars[j]]){
                                                    variablesThis+=finalFactors[looper].vars[j];
                                                }else{
                                                     variablesThis+=inferenceObserved[finalFactors[looper].vars[j]];
                                                }
                                            }
                                             var newDiv2 = document.createElement("div");
                                             newDiv2.style.fontSize="25";
                                             newDiv2.style.fontWeight="bold";
                                             newDiv2.style.position="relative";
                                             newDiv2.style.top="-10px";
                                             newDiv2.style.left=(finalFactors[looper].table[0].length*50/2)+"px";
                                            if(finalFactors[looper].parentNodes.length>0){
                                                cont=document.createTextNode("f("+variablesThis+" | "+ parentsOfThis+")");
                                            }else{
                                                cont=document.createTextNode("f("+variablesThis+")");
                                            }
                                                
                                           
                                            if(finalFactors[looper].table.length>maxLength){
                                                maxLength=finalFactors[looper].table.length;
                                            }
                                             newDiv2.appendChild(cont);
                                             newDiv1.appendChild(newDiv2);


                                                    row=new Array();
                                                    cell=new Array();

                                                    row_num=12; //edit this value to suit
                                                    cell_num=12; //edit this value to suit

                                                    tab=document.createElement('table');
                                                    tab.border="1";
                                                    tab.style.borderCollapse="collapse";
                                                    tab.style.cellPadding="10";
                                                    tab.setAttribute('id','newtable');

                                                    tbo=document.createElement('tbody');
                                                    row[0]=document.createElement('tr');
                                                    for(k=0;k<finalFactors[looper].table[0].length;k++) {
                                                            cell[k]=document.createElement('td');
                                                            cell[k].setAttribute("style","background-color: #003366; color:#ffffff; text-align:center;");

                                                            cont=document.createTextNode(finalFactors[looper].table[0][k]);
                                                            cell[k].appendChild(cont);
                                                            row[0].appendChild(cell[k]);
                                                    }
                                        
                                                    tbo.appendChild(row[0]);
                                                    for(c=1;c<finalFactors[looper].table.length;c++){
                                                        row[c]=document.createElement('tr');
                                                        for(k=0;k<finalFactors[looper].table[c].length;k++) {
                                                            cell[k]=document.createElement('td');
                                                            if(k==finalFactors[looper].table[c].length-1){
                                                                cont=document.createTextNode(finalFactors[looper].table[c][k].toFixed(3));
                                                            }else{
                                                                cont=document.createTextNode(finalFactors[looper].table[c][k]);
                                                            }
                                                            

                                                            cell[k].appendChild(cont);
                                                            if(k==finalFactors[looper].table[c].length-1){
                                                                cell[k].style.paddingLeft="10px";
                                                                cell[k].style.paddingRight="10px";

                                                            }
                                                            row[c].appendChild(cell[k]);
                                                        }

                                                        tbo.appendChild(row[c]);
                                                    }
                                                    
                                                    tab.appendChild(tbo);
                                                    
                                                    
                                                    newDiv1.appendChild(tab);
                                                    
                                                  var my_div = document.getElementById("canvas");

                                                  document.body.insertBefore(newDiv1, my_div);
                                                  $(newDiv1).hide();
                                                  allTables[rowCounter].push(newDiv1);
                                            }
                                            $(allTables[rowCounter][allTables[rowCounter].length-1]).show();
                                            if(finalFactors.length>1){
                                                
                                                sumFlag=1;
                                            }else{
                                                eliminateCount++;

                                                flagStagger=false;
                                                remainingHidden.splice(remainingHidden.indexOf(joinNode),1);
                                                variables="REMAINING HIDDEN : ";
                                                for(var i=0;i<remainingHidden.length;i++){
                                                    if(i!=0){
                                                        variables+=" ,";
                                                    }
                                                    variables+=remainingHidden[i];
                                                }
                                                //text1.attr("text", variables);
                                                arrowShow=true;
                                                if(eliminateCount>hiddenVars.length){
                                                    console.log("LEAVING");
                                                    nextType="T";
                                                    joiner.style.display="none";
                                                    flagJoin=true;
                                                    counterJoin=0;
                                                }
                                                arrow1div=document.createElement('div');
                                                arrow1div.style.position='absolute';
                                                arrow1div.style.top=(posy+20+maxLength*30)+"px";
                                                arrow1div.style.left="250px";
                                                arrow1div.style.zIndex="1400";
                                                arrow1div.id="arrow1div"+counter;
                                                var my_div = document.getElementById("canvas");
                                                document.body.insertBefore(arrow1div, my_div);
                                                var arrow1divPaper=new Raphael('arrow1div'+counter, 800, 400);
                                                arrow1divPaper.rect(30,50,640, 50);
                                                 var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                                variables="HIDDEN : ";
                                                text1.attr("text", variables);
                                                for(var i=0;i<hiddenVars.length;i++){
                                                    variables="";
                                                    if(i!=0){
                                                        variables+=" ,";
                                                    }
                                                    variables+=hiddenVars[i];
                                                    if(remainingHidden.indexOf(hiddenVars[i])==-1){
                                                        arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", fill:"#CCCCCC", "text-anchor":"start"});
                                                    }else{
                                                        arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", "text-anchor":"start"});
                                                    }
                                                }
                                                var text2=arrow1divPaper.text((60),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                                
                                                text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
                                                boxes.push(arrow1div);
                                                counter++;
                                            }
                                            rowCounter++;
                                            posy+=150+maxLength*30;
                                            document.getElementById("nextButtonVariable").style.top=(posy-70)+"px";
                                            //arrow1div.style.top=(posy+20)+"px";  








                                            stepCount++;
                                            

                                        }else if(sumFlag==1){
                                            for(var i=0;i<allTables[rowCounter-1].length;i++){
                                                 $(allTables[rowCounter-1][i]).show();
                                            }
                                           eliminateCount++;
                                            flagStagger=false;
                                            remainingHidden.splice(remainingHidden.indexOf(joinNode),1);
                                            variables="REMAINING HIDDEN : ";
                                            for(var i=0;i<remainingHidden.length;i++){
                                                if(i!=0){
                                                    variables+=" ,";
                                                }
                                                variables+=remainingHidden[i];
                                            }
                                            //text1.attr("text", variables);
                                            arrowShow=true;
                                            if(eliminateCount>hiddenVars.length){
                                                console.log("LEAVING");
                                                nextType="T";
                                                joiner.style.display="none";
                                                flagJoin=true;
                                            }
                                            sumFlag=0;

                                            arrow1div=document.createElement('div');
                                            arrow1div.style.position='absolute';
                                            arrow1div.style.top=(posy-130)+"px";
                                            arrow1div.style.left="250px";
                                            arrow1div.style.zIndex="1400";
                                            arrow1div.id="arrow1div"+counter;
                                            var my_div = document.getElementById("canvas");
                                            document.body.insertBefore(arrow1div, my_div);
                                            var arrow1divPaper=new Raphael('arrow1div'+counter, 800, 400);
                                            arrow1divPaper.rect(30,50,640, 50);
                                             var text1=arrow1divPaper.text((350),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                            variables="HIDDEN : ";
                                            text1.attr("text", variables);
                                            for(var i=0;i<hiddenVars.length;i++){
                                                variables="";
                                                if(i!=0){
                                                    variables+=" ,";
                                                }
                                                variables+=hiddenVars[i];
                                                if(remainingHidden.indexOf(hiddenVars[i])==-1){
                                                    arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", fill:"#CCCCCC", "text-anchor":"start"});
                                                }else{
                                                    arrow1divPaper.text((480+i*hiddenVars.length*10),70, variables).attr({"font-size":"25px", "text-anchor":"start"});
                                                }
                                            }
                                            var text2=arrow1divPaper.text((60),70, "").attr({"font-size":"25px", "text-anchor":"start"});
                                            
                                            text2.attr("text", "QUERY: " + inferenceInstructions.attr("text"));
                                            boxes.push(arrow1div);
                                            counter++;
                                            factorStorer=finalFactors.slice();
                                        }
                                        
                                    }
                            }
                                

                            
                            //step through the numbers till the table is done, then return to typeT
                            //nextStep();
                        }
                      });
           

            joiner=document.createElement('input');
            joiner.type ="text";
            joiner.style.backgroundColor="#CCCCCC";
            joiner.style.position='absolute';
            joiner.style.top="150px";
            joiner.style.left="230px";
            joiner.style.width="30px";
            joiner.style.zIndex="1500";
            joiner.id="joiner";
               var my_div = document.getElementById("canvas");
            joiner.style.display="none";
            document.body.insertBefore(joiner, my_div);


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

