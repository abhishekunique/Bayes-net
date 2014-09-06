window.onload=function(){
	
	var paper = new Raphael(document.getElementById('canvas_container'), 2000, 2000);  
	
	var paperHeight = 50;
    var paperWidth = 50;
    var paperPosx=400;
    var paperPosy=40;
    var squareSize = 10;
    var cols = paperWidth / squareSize;
    var rows = paperHeight / squareSize;
    var countPress=0,screen1=0,screen2=0,screen3=0,screen4=0,pacDeath=0;
    var circleList=[],circleListC=0,scoreList=[],scoreListC=0,codeList=[0],codeC=1,stackList=[],stackC=0,cSize=640,startIndex=0,startFunc=0,valueList=[],valueC=0,arrowList=[],iconList=[];
   //====================
	var movesList=[], movesListC=0;
   //====================
   		var xPosFood=[];
   	 	var yPosFood=[];
   	 	var numFood=2;
		for ( var j=0; j<numFood;j++){
			xPosFood[j]=Math.floor(Math.random()*(cols));			//Randomizing food
			yPosFood[j]=Math.floor(Math.random()*(rows));			//
			
		}
		
		var pPosx,gPosx,pPosy,gPosy,cCount=1;
		while(cCount!=0){
        	cCount=0;
        	pPosx=Math.floor(Math.random()*(cols));
			pPosy=Math.floor(Math.random()*(rows));
			gPosx=Math.floor(Math.random()*(cols));
			gPosy=Math.floor(Math.random()*(rows));
			for(var i=0;i<numFood; i++){															//randomizing pacman and ghost positions
				if(xPosFood[i]==pPosx && yPosFood[i]==pPosy) {
					cCount++;
				}
				if(xPosFood[i]==gPosx && yPosFood[i]==gPosy){
					cCount++;
				}
				if(gPosx==pPosx && gPosy==pPosy){
					cCount++;
				}
			}		
		}
		
		////================
		var next=paper.circle(100,50,30).attr({fill:"yellow"});
		var nextText=paper.text(100,50,"NEXT");
		var utilC=0;
		var nextNode=next.node;
		nextNode.id="next";
		var board=paper.image("/images/exercises/minimax/emptyboard.png",1250,360, 200,200);
		var boardNode=board.node;
		boardNode.id="board";
		
		var pacman=paper.image("/images/exercises/minimax/pacman.png", pPosx*40 + 1250,pPosy*40 +360, 40,40).toFront();
		var pacmanNode=pacman.node;
		
		pacmanNode.id="pacman";
		
		var ghost=paper.image("/images/exercises/minimax/ghost.png", gPosx*40+ 1250,gPosy*40+360, 40,40).toFront();
		var ghostNode=ghost.node;
		ghostNode.id="ghost";
		
		var food=new Array(5);
		for(var i=0;i <numFood;i++){
    		food[i]=paper.image("/images/exercises/minimax/food.png",xPosFood[i]*40 + 1250,yPosFood[i]*40+360, 40, 40);	
   		}
		var stackFinal=[],stackFinalRect=[];
		var valueFinal=[],valueFinalRect=[];
		var depthFinal=[],depthFinalRect=[];
		var tempFinal=[], tempFinalRect=[];
		var valFinal=[],valFinalRect=[];
		var boardFinal=[];
		var pacmanFinal=[];
		var ghostFinal=[];
   		var lines=[],linesCount=19;
   		
   		lines[0]="def value(state):";
		lines[1]="if(terminal_test(state)== true)";
		lines[2]="compute val=utility(state)";
		lines[3]="return val";
		lines[4]="If the next agent is MAX:" ;
		lines[5]="compute m=max-value(state)";
		lines[6]="return m";
		lines[7]="If the next agent is MIN:";
		lines[8]="compute m= min-value(state)";
		lines[9]="return m";
		lines[10]="end";
		lines[11]="def max-value(state):";
		lines[12]="Initialize v = -infinity";
		lines[13]="For a in successors(state):";
		lines[14]="temp=value(a)";
		lines[15]="v=max(v, temp) ";
		lines[16]="Return v";
		lines[17]="end";
   		lines[18]="def min-value(state):";
		lines[19]="Initialize v = infinity";
		lines[20]="For a in successors(state):";
		lines[21]="temp=value(a)";
		lines[22]="v=min(v,temp)";
		lines[23]="Return v";
		lines[24]="end";
   		var r=[],rCount=19;
		
		r[0]=paper.rect(1200,85,300,10).attr({stroke:"white"});
		r[1]=paper.rect(1200,95,300,10).attr({stroke:"white"});
		r[2]=paper.rect(1200,105,300,10).attr({stroke:"white"});
		r[3]=paper.rect(1200,115,300,10).attr({stroke:"white"});
		r[4]=paper.rect(1200,125,300,10).attr({stroke:"white"});
		r[5]=paper.rect(1200,135,300,10).attr({stroke:"white"});
		r[6]=paper.rect(1200,145,300,10).attr({stroke:"white"});
		r[7]=paper.rect(1200,155,300,10).attr({stroke:"white"});
		r[8]=paper.rect(1200,165,300,10).attr({stroke:"white"});
		r[9]=paper.rect(1200,175,300,10).attr({stroke:"white"});
		r[10]=paper.rect(1200,185,300,10).attr({stroke:"white"});
		r[11]=paper.rect(1200,205,300,10).attr({stroke:"white"});
		r[12]=paper.rect(1200,215,300,10).attr({stroke:"white"});
   		r[13]=paper.rect(1200,225,300,10).attr({stroke:"white"});
		r[14]=paper.rect(1200,235,300,10).attr({stroke:"white"});
		r[15]=paper.rect(1200,245,300,10).attr({stroke:"white"});
		r[16]=paper.rect(1200,255,300,10).attr({stroke:"white"});
		r[17]=paper.rect(1200,265,300,10).attr({stroke:"white"});
		r[18]=paper.rect(1200,285,300,10).attr({stroke:"white"});
		r[19]=paper.rect(1200,295,300,10).attr({stroke:"white"});
		r[20]=paper.rect(1200,305,300,10).attr({stroke:"white"});
		r[21]=paper.rect(1200,315,300,10).attr({stroke:"white"});
		r[22]=paper.rect(1200,325,300,10).attr({stroke:"white"});
		r[23]=paper.rect(1200,335,300,10).attr({stroke:"white"});
		r[24]=paper.rect(1200,345,300,10).attr({stroke:"white"});

		var box1=paper.rect(1200,85,301,110);
		var box2=paper.rect(1200,205,301,70);	
		var box3=paper.rect(1200,285,301,70);
		var box4=paper.rect(750,60,440,500);
		var stackText=paper.text(970,70,"Stack");
		var l=[],lCount=19;
		
		l[0]=paper.text(1350,90,lines[0]);
		l[1]=paper.text(1350,100,lines[1]);
		l[2]=paper.text(1350,110,lines[2]);
		l[3]=paper.text(1350,120,lines[3]);
		l[4]=paper.text(1350,130,lines[4]);
		l[5]=paper.text(1350,140,lines[5]);
		l[6]=paper.text(1350,150,lines[6]);
		l[7]=paper.text(1350,160,lines[7]);
		l[8]=paper.text(1350,170,lines[8]);
		l[9]=paper.text(1350,180,lines[9]);
		l[10]=paper.text(1350,190,lines[10]);
		l[11]=paper.text(1350,210,lines[11]);
		l[12]=paper.text(1350,220,lines[12]);
   		l[13]=paper.text(1350,230,lines[13]);
		l[14]=paper.text(1350,240,lines[14]);
		l[15]=paper.text(1350,250,lines[15]);
		l[16]=paper.text(1350,260,lines[16]);
		l[17]=paper.text(1350,270,lines[17]);
		l[18]=paper.text(1350,290,lines[18]);
		l[19]=paper.text(1350,300,lines[19]);
		l[20]=paper.text(1350,310,lines[20]);
		l[21]=paper.text(1350,320,lines[21]);
		l[22]=paper.text(1350,330,lines[22]);
		l[23]=paper.text(1350,340,lines[23]);
		l[24]=paper.text(1350,350,lines[24]);
	///==================
		
		var infinityMin=-10000,infinityMax=10000,dTop=2;
		
		function terminalTest(pPosx,pPosy,gPosx,gPosy,numFood,depth){
			var a;
			if(numFood==0 || (pPosx==gPosx && pPosy==gPosy) || depth==0){
				a= true;
			}else{
				a= false;
			}
			return a;
		}
		
		function utility(xPosFood,yPosFood,pPosx,pPosy,gPosx,gPosy,numFood,depth){
			console.log("utility" +xPosFood);
			if(gPosx==pPosx && gPosy==pPosy){
				return -100;
			}else  if(numFood==0){
				return 100;
			}else{
				utilC++;
				var foodSum=0,ghostSum=0;
				
				for(var l=0;l<numFood;l++){
					foodSum=foodSum+dist(xPosFood[l],yPosFood[l],pPosx,pPosy);
				}
				ghostSum=dist(pPosx,pPosy,gPosx,gPosy);
				return ghostSum - foodSum -	 numFood*3;
			}
		}
		
		function dist(a,b,c,d){
			return Math.sqrt((a-c)*(a-c) + (b-d)*(b-d));
		}
		
		function legalMoves(xPosFood,yPosFood,pPosx,pPosy,gPosx,gPosy,numFood,agent){
			//up=0,left=1,down=2,right=3
			var posArray=[0,1,2,3],index=0;
			if(agent==0){
				if(pPosx==cols-1){
					index = posArray.indexOf(3);
					posArray.splice(index,1);
				}
				if(pPosx==0){
					index = posArray.indexOf(1);
					posArray.splice(index,1);
				}
				if(pPosy==0){
					index = posArray.indexOf(0);
					posArray.splice(index,1);
				}
				if(pPosy==rows-1){
					index = posArray.indexOf(2);
					posArray.splice(index,1);
				}
			}else if(agent==1){
				if(gPosx==cols-1){
					index = posArray.indexOf(3);
					posArray.splice(index,1);
				}
				if(gPosx==0){
					index = posArray.indexOf(1);
					posArray.splice(index,1);
				}
				if(gPosy==0){
					index = posArray.indexOf(0);
					posArray.splice(index,1);
				}
				if(gPosy==rows-1){
					index = posArray.indexOf(2);
					posArray.splice(index,1);
				}
			}
			return posArray;
		}
		
	
			
		var xTemp=[],yTemp=[];

		
		function max_value(xPosFood,yPosFood,pPosx,pPosy,gPosx,gPosy,numFood,agent,depth,topPos,st,valueL){
			movesList[movesListC]=10;
			movesListC++;
			movesList[movesListC]=11;
			movesListC++;
			stackList[stackC]=st.concat([1]);
			stackC++;
			valueList[valueC]=valueL.concat([[depth,pPosx,pPosy,gPosx,gPosy,1, "v: "+ infinityMin, ""]]);
			valueC++;
			var mT=-1;
			var max=infinityMin,movesLegal=legalMoves(xPosFood,yPosFood,pPosx,pPosy,gPosx,gPosy,numFood,agent),moves;
		 	for(var k=0; k< movesLegal.length; k++){
		 		
		 		movesList[movesListC]=12;
				movesListC++;
				
		 	 	var moves=movesLegal[k];
		 	 	//var xPosFoodTemp=xPosFood.slice(0);
		 	 	//var yPosFoodTemp=yPosFood.slice(0);
		 	 			xTemp=[],yTemp=[];
						for(var p=0;p<xPosFood.length;p++){
							xTemp[p]=xPosFood[p];
							yTemp[p]=yPosFood[p];
					
							
					
						
						}
		 	 	
		 	 	
		 	 	var pPosxTemp=pPosx;
		 	 	var pPosyTemp=pPosy;
		 	 	var gPosxTemp=gPosx;
		 	 	var gPosyTemp=gPosy;
		 	 	var numFoodTemp=numFood;
				if(moves==0){
					pPosy=pPosy-1;
				}else if(moves==1){
					
					pPosx=pPosx-1;
				}else if(moves==2){
					
					pPosy=pPosy+1;
				}else if(moves==3){
					
					pPosx=pPosx+1;
				}
				
				for(var i=0;i< numFood;i++){
					if(xPosFood[i]==pPosx && yPosFood[i]==pPosy){
						console.log("food eaten");
						
						xPosFood.splice(i,1);
						yPosFood.splice(i,1);
						numFood--;	
						console.log(xPosFood+"food eaten thing"+ numFood);
						break;
					}
				}
				
				valueList[valueC]=valueL.concat([[depth,pPosx,pPosy,gPosx,gPosy,1,"v: "+max,""]]);
				valueC++;
				
				movesList[movesListC]=13;
				movesListC++;
				//console.log((topPos-(300/(dTop-depth))+k*(200/(dTop-depth)))+","+(90+(dTop-depth)*70) +"max");
				var arpos=Math.atan(70/((k-1.5)*(cSize/(Math.pow(4,(dTop-depth))))));
				//console.log(arpos);
				var xM=Math.cos(arpos)*(((cSize/(Math.pow(4,dTop)))/2));
				var yM=Math.sin(Math.abs(arpos))*(((cSize/(Math.pow(4,dTop)))/2));
				if((k==0) || (k==1)){
					xM=-xM;
				}
				
				arrowList[circleListC]= paper.path("M"+(topPos+xM)+" "+ (20+(dTop-depth)*70 + yM)+"L" + (topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,(dTop-depth)))))+  " "+ (90+(dTop-depth)*70));

				circleList[circleListC]=paper.circle(topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,(dTop-depth)))),90+(dTop-depth)*70,((cSize/(Math.pow(4,dTop)))/2)).attr({fill:"white"});
				iconList[circleListC]=paper.image("/images/exercises/minimax/pacman.png",topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,(dTop-depth))))- 5  -  (((cSize/(Math.pow(4,dTop)))/2)), 90+(dTop-depth)*70 -5 -(((cSize/(Math.pow(4,dTop)))/2)-2)	, 10,10).toFront();
				iconList[circleListC].hide();
				circleList[circleListC].hide();
				arrowList[circleListC].hide();

				circleListC++;

				codeList[codeC]=0;
				codeC++;
				
				//console.log(numFood + "= numfood");
				
				var t=minimax(xPosFood,yPosFood,pPosx,pPosy,gPosx,gPosy,numFood,1,depth,topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,(dTop-depth)))),st.concat([1]),valueL.concat([[depth,pPosx,pPosy,gPosx,gPosy,1,"v: "+max,""]]))[0];
		 		
		 		t=Math.floor(t* 100) / 100;
		 		
		 		movesList[movesListC]=14;
				movesListC++;
				
		 		max=Math.max(max,t);
				if(max==t){
					mT=moves;
				}
		 		scoreList[scoreListC]=paper.text(topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,(dTop-depth)))),90+(dTop-depth)*70, t);
		 		scoreList[scoreListC].hide();
		 		scoreListC++;
		 		valueList[valueC]=valueL.concat([[depth,pPosx,pPosy,gPosx,gPosy,1,"v: "+max,""]]);
				valueC++;
		 		
		 		
						for(var p=0;p<xTemp.length;p++){
							xPosFood[p]=xTemp[p];
							yPosFood[p]=yTemp[p];
					
							
					
						
						}
		 	 	
		 		//xPosFood=xPosFoodTemp;
		 	 	//yPosFood=yPosFoodTemp;
		 	 	pPosx=pPosxTemp;
		 	 	pPosy=pPosyTemp;
		 	 	gPosx=gPosxTemp;
		 	 	gPosy=gPosyTemp;
		 	 	numFood=numFoodTemp;
		 	 	console.log(numFood +"numfood" +xPosFood);
		 	 	
		 	}
		 	stackList[stackC]=st;
			stackC++;
			var x=[];
				for(var p=0;p<valueL.length;p++){
					var y;
					
					y=valueL[p].slice(0);
					
					x[p]=y;
				}
				x[x.length-1][7]="m: " +max;
			valueList[valueC]=x;
			valueC++;
		 	movesList[movesListC]=15;
			movesListC++;
			console.log(numFood + "max" + xPosFood);
			return [max,mT];
			
		}
				
		function min_value(xPosFood,yPosFood,pPosx,pPosy,gPosx,gPosy,numFood,agent,depth,topPos,st,valueL){
			
			movesList[movesListC]=16;
			movesListC++;
			movesList[movesListC]=17;
			movesListC++;
			stackList[stackC]=st.concat([2]);
			stackC++;
			valueList[valueC]=valueL.concat([[depth,pPosx,pPosy,gPosx,gPosy,2,"v: "+infinityMax,""]]);
			valueC++;
			var mT=-1;
			var min=infinityMax,movesLegal=legalMoves(xPosFood,yPosFood,pPosx,pPosy,gPosx,gPosy,numFood,agent),moves;
		 	for(var k=0; k< movesLegal.length; k++){
		 		
		 		movesList[movesListC]=18;
				movesListC++;
		 	 	var moves=movesLegal[k];
		 	 	var xPosFoodTemp=xPosFood.slice(0);
		 	 	var yPosFoodTemp=yPosFood.slice(0);
		 	 	var pPosxTemp=pPosx;
		 	 	var pPosyTemp=pPosy;
		 	 	var gPosxTemp=gPosx;
		 	 	var gPosyTemp=gPosy;
		 	 	var numFoodTemp=numFood;
		 	 
				if(moves==0){
					
					gPosy=gPosy-1;
				}else if(moves==1){
					
					gPosx=gPosx-1;
				}else if(moves==2){
					
					gPosy=gPosy+1;
				}else if(moves==3){
					gPosx=gPosx+1;
				}
				
				
				valueList[valueC]=valueL.concat([[depth,pPosx,pPosy,gPosx,gPosy,2,"v: "+min,""]]);
				valueC++;
				
				movesList[movesListC]=19;
				movesListC++;
				//console.log((topPos-(300/(dTop-depth))+k*(200/(dTop-depth)))+","+(90+(dTop-depth)*70) +"min");
				var arpos=Math.atan(70/((k-1.5)*(cSize/(Math.pow(4,(dTop-depth))))));
				//console.log(arpos);
				var xM=Math.cos(arpos)*(((cSize/(Math.pow(4,dTop)))/2));
				var yM=Math.sin(Math.abs(arpos))*(((cSize/(Math.pow(4,dTop)))/2));
				if((k==0) || (k==1)){
					xM=-xM;
				}
				
				
				
				arrowList[circleListC]= paper.path("M"+(topPos+xM)+" "+ (20+(dTop-depth)*70+yM)+"L" + (topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,(dTop-depth)))))+  " "+ (90+(dTop-depth)*70));

				circleList[circleListC]=paper.circle(topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,(dTop-depth)))),90+(dTop-depth)*70,((cSize/(Math.pow(4,dTop)))/2)).attr({fill:"white"});
				iconList[circleListC]=paper.image("/images/exercises/minimax/ghost.png", topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,(dTop-depth))))-5 -(((cSize/(Math.pow(4,dTop)))/2)), 90+(dTop-depth)*70 -5- (((cSize/(Math.pow(4,dTop)))/2)), 10,10).toFront();
				iconList[circleListC].hide();
				arrowList[circleListC].hide();

				circleList[circleListC].hide();
				circleListC++;
				codeList[codeC]=0;
				codeC++;
				
				
		 		var t=minimax(xPosFood,yPosFood,pPosx,pPosy,gPosx,gPosy,numFood,0,depth,topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,(dTop-depth)))),st.concat([2]),valueL.concat([[depth,pPosx,pPosy,gPosx,gPosy,2,"v: "+min,""]]))[0];
		 		t=Math.floor(t * 100) / 100;
		 		
		 		movesList[movesListC]=20;
				movesListC++;
		 		min=Math.min(min,t);
		 		if(min==t){
					mT=moves;
				}
		 		scoreList[scoreListC]=paper.text(topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,(dTop-depth)))),90+(dTop-depth)*70, t);
		 		scoreList[scoreListC].hide();
		 		scoreListC++;
		 		valueList[valueC]=valueL.concat([[depth,pPosx,pPosy,gPosx,gPosy,2,"v: "+min,""]]);
				valueC++;
				
		 		xPosFood=xPosFoodTemp;
		 	 	yPosFood=yPosFoodTemp;
		 	 	pPosx=pPosxTemp;
		 	 	pPosy=pPosyTemp;
		 	 	gPosx=gPosxTemp;
		 	 	gPosy=gPosyTemp;
		 	 	numFood=numFoodTemp;
		 	 	//console.log(numFood);
		 	 	
		 	}
		 	//console.log(pacDeath);
		 	stackList[stackC]=st;
			stackC++;
			var x=[];
			for(var p=0;p<valueL.length;p++){
				var y;
					
				y=valueL[p].slice(0);
					
				x[p]=y;
			}
			x[x.length-1][7]="m: " +min;
			
			valueList[valueC]=x;
			valueC++;
		 	movesList[movesListC]=21;
			movesListC++;
			console.log(numFood + "min" + xPosFood);
			return [min,mT];
			
		}
	
		function minimax(xPosFood,yPosFood,pPosx,pPosy,gPosx,gPosy,numFood, agent,depth,topPos,stackL,valueL){
			stackList[stackC]=stackL.concat([0]);
			stackC++;
			
			valueList[valueC]=valueL.concat([[depth,pPosx,pPosy,gPosx,gPosy,0,"agent: "+ agent," "]]);
			//console.log(valueList[valueC]);
			valueC++;
			movesList[movesListC]=0;
			movesListC++;
			movesList[movesListC]=1;
			movesListC++;
			if(terminalTest(pPosx,pPosy,gPosx,gPosy,numFood,depth)){
				movesList[movesListC]=2;
				movesListC++;
				stackList[stackC]=stackL;
				stackC++;
				
				
				
				var c= utility(xPosFood,yPosFood,pPosx,pPosy,gPosx,gPosy,numFood,depth);
				//console.log(valueL + "val");
				valueList[valueC]=valueL.concat([[depth,pPosx,pPosy,gPosx,gPosy,0,"agent: "+ agent, "val: "+c]]);	
				valueC++;
				
				var x=[];
				for(var p=0;p<valueL.length;p++){
					var y;
					
					y=valueL[p].slice(0);
					
					x[p]=y;
				}
				x[x.length-1][7]="temp: " +c;

				valueList[valueC]=x;
				valueC++;
				
				movesList[movesListC]=3;
				movesListC++;
				
				return 	[c,0];
				
			}else{
				movesList[movesListC]=4;
				movesListC++;
				if(agent==0){
					movesList[movesListC]=5;
					movesListC++;
					codeList[codeC]=1;
					codeC++;
					console.log("before max thing"+xPosFood+"numFOod" +numFood);
					var m= max_value(xPosFood,yPosFood,pPosx,pPosy,gPosx,gPosy,numFood,0,depth-1,topPos,stackL.concat([0]),valueL.concat([[depth,pPosx,pPosy,gPosx,gPosy,0,"agent: "+agent,""]]));
					console.log("after max thing" + xPosFood+"numfood"+numFood);
					movesList[movesListC]=6;
					movesListC++;
					stackList[stackC]=stackL;
					stackC++;
					if(valueL.length!=0){
						var x=[];
						for(var p=0;p<valueL.length;p++){
							var y;
					
							y=valueL[p].slice(0);
					
							x[p]=y;
						}
						x[x.length-1][7]="temp: " +m[0];
						valueList[valueC]=x;
					}else{	
						valueList[valueC]=valueL;
					}
					valueC++;
					
					return m;
				}else{
					movesList[movesListC]=7;
					movesListC++;
					movesList[movesListC]=8;
					movesListC++;
					codeList[codeC]=2;
					codeC++;
					console.log("before min thing"+xPosFood+"numFood"+numFood);

					var l= min_value(xPosFood,yPosFood,pPosx,pPosy,gPosx,gPosy,numFood,1,depth-1,topPos,stackL.concat([0]),valueL.concat([[depth,pPosx,pPosy,gPosx,gPosy,0,"agent: "+agent,""]]));
					console.log("after min thing"+xPosFood+"numFOod"+numFood);

					
					movesList[movesListC]=9;
					movesListC++;
					stackList[stackC]=stackL;
					stackC++;
					if(valueL.length!=0){
						var x=[];
						for(var p=0;p<valueL.length;p++){
							var y;
					
							y=valueL[p].slice(0);
					
							x[p]=y;
						}
						x[x.length-1][7]="temp: " +l[0];
						valueList[valueC]=x;
					}else{
						valueList[valueC]=valueL;
					}
					valueC++;
					
					return l;
				}
				
			}

		}
		
		function uncolourAll(){
			for(var i=0;i<r.length;i++){
				r[i].attr({fill:"white"});
			}
		}
		
//=======================		
		var topC,topCtext,minimaxTemp=[-1,-1];
				
		//console.log(valueList);
		//console.log(stackList);

		
		function generateStack(cList,vList,startX,startY){
			var rC=0,lC=0,sC=0;
			//console.log(vList);
			for(var i=0;i<stackFinal.length;i++){
				stackFinal[i].hide();
				valueFinal[i].hide();
				stackFinalRect[i].hide();
				valueFinalRect[i].hide();
				boardFinal[i].hide();
				pacmanFinal[i].hide();
				ghostFinal[i].hide();
				depthFinal[i].hide();
				depthFinalRect[i].hide();
				valFinal[i].hide();
				valFinalRect[i].hide();
			}
			for( var i=0;i<cList.length;i++){	
				if(vList[i][5]==0){
					valueFinalRect[sC]=paper.rect(startX+150,startY-5+sC*70,300,10).attr({stroke:"white"});
					valueFinal[sC]=paper.text(startX+300,startY+ sC*70,vList[i][6]);
					depthFinalRect[sC]=paper.rect(startX+150,startY+5+sC*70,300,10).attr({stroke:"white"});
					depthFinal[sC]=paper.text(startX+300,startY+10+ sC*70,"Depth: "+ (dTop-vList[i][0]));
					
				}else if(vList[i][5]==1){
					valueFinalRect[sC]=paper.rect(startX+150,startY-5+sC*70,300,10).attr({stroke:"white"});
					valueFinal[sC]=paper.text(startX+300,startY+ sC*70,vList[i][6]);
					depthFinalRect[sC]=paper.rect(startX+150,startY+5+sC*70,300,10).attr({stroke:"white"});
					depthFinal[sC]=paper.text(startX+300,startY+10+ sC*70,"Depth: "+(dTop-vList[i][0]));
					
				}else if(vList[i][5]==2){
					valueFinalRect[sC]=paper.rect(startX+150,startY-5+sC*70,300,10).attr({stroke:"white"});
					valueFinal[sC]=paper.text(startX+300,startY+ sC*70,vList[i][6]);
					depthFinalRect[sC]=paper.rect(startX+150,startY+5+sC*70,300,10).attr({stroke:"white"});
					depthFinal[sC]=paper.text(startX+300,startY+10+ sC*70,"Depth: "+(dTop-vList[i][0]));
				}
				valFinalRect[sC]=paper.rect(startX+150,startY+15+sC*70,300,10).attr({stroke:"white"});
				valFinal[sC]=paper.text(startX+300,startY+20+ sC*70,vList[i][7]);
				boardFinal[sC]=paper.image("/images/exercises/minimax/emptyboard.png",startX+100,startY+sC*70,paperWidth,paperHeight);
				pacmanFinal[sC]=paper.image("/images/exercises/minimax/pacman.png", vList[i][1]*squareSize + startX+100,vList[i][2]*squareSize +startY + sC*70, squareSize,squareSize).toFront();
				ghostFinal[sC]=paper.image("/images/exercises/minimax/ghost.png", vList[i][3]*squareSize + startX+100,vList[i][4]*squareSize +startY + sC*70, squareSize,squareSize).toFront();

				if(cList[i]==0){
					
						stackFinalRect[sC]=paper.rect(startX-150,startY-5+sC*70,300,10).attr({stroke:"white"});
						stackFinal[sC]=paper.text(startX,startY+ sC*70, "value");
						sC++;
						
					
				}else if(cList[i]==1){
					
						stackFinalRect[sC]=paper.rect(startX-150,startY-5+sC*70,300,10).attr({stroke:"white"});
						stackFinal[sC]=paper.text(startX,startY+ sC*70,"max_value");
						sC++;
				}else if(cList[i]==2){
					
						stackFinalRect[sC]=paper.rect(startX-150,startY-5+sC*70,300,10).attr({stroke:"white"});
						stackFinal[sC]=paper.text(startX,startY+ sC*70,"min_value");
						sC++;
					
				}
				
			}
			
		}
		

		var movesCount=0,stackCount=0,valueCount=0,circleCount=0,scoreCount=0,agentTemp=0,runThis=0,exitFlag=0,agentText;
		//console.log(pacDeath);
		
		nextNode.onclick=function(){
		//console.log(numFood);	
		if(exitFlag==0){		

			var interval = setInterval(function(){
			if(movesCount==0){
				console.log("move0" + xPosFood +"numFood"+numFood);
				 if(minimaxTemp[1]==0){
					if(agentTemp==1){
						pPosy=pPosy-1;
					}else{
						gPosy=gPosy-1;
					}
				}else if(minimaxTemp[1]==1){
					if(agentTemp==1){
						pPosx=pPosx-1;
					}else{
						gPosx=gPosx-1;
					}
				}else if(minimaxTemp[1]==2){
					
					if(agentTemp==1){
						pPosy=pPosy+1;
					}else{
						gPosy=gPosy+1;
					}
				}else if(minimaxTemp[1]==3){
					
					if(agentTemp==1){
						pPosx=pPosx+1;
					}else{
						gPosx=gPosx+1;
					}
				}
				
				for(var i=0;i< numFood;i++){
					if(xPosFood[i]==pPosx && yPosFood[i]==pPosy){
						console.log("reached here");
						xPosFood.splice(i,1);
						yPosFood.splice(i,1);
						numFood--;	
						break;
					}
				}
				board.hide();
				pacman.hide();
				ghost.hide();
				
				for(var i=0;i <numFood;i++){
    				food[i].hide();	
   				}


				board=paper.image("/images/exercises/minimax/emptyboard.png",1250,360, 200,200);
		
		
				pacman=paper.image("/images/exercises/minimax/pacman.png", pPosx*40 + 1250,pPosy*40 +360, 40,40).toFront();
			
				ghost=paper.image("/images/exercises/minimax/ghost.png", gPosx*40+ 1250,gPosy*40+360, 40,40).toFront();
				if(gPosx==pPosx && pPosy==gPosy){
					exitFlag=1;
					clearInterval(interval);
					return;
				}
				if(numFood==0){
					exitFlag=1;
					clearInterval(interval);
					return;	
				}
				
				food=new Array(5);
				for(var i=0;i <numFood;i++){
    				food[i]=paper.image("/images/exercises/minimax/food.png",xPosFood[i]*40 + 1250,yPosFood[i]*40+360, 40, 40);	
   				}
				console.log("after food thing"+xPosFood+"numfood"+numFood);
				runThis++;
				 //console.log(runThis);
				 
				for(var i=0;i<circleList.length;i++){
					topC.hide();
					topCtext.hide();
					topCmove.hide();
					circleList[i].hide();
					iconList[i].hide();
					arrowList[i].hide();
					scoreList[i].hide();
				}

				movesCount=0;
				stackCount=0;
				valueCount=0;
				circleCount=0;
				scoreCount=0;
				circleList=[];
				circleListC=0;
				scoreList=[];
				scoreListC=0;
				codeList=[0];
				codeC=1;
				stackList=[];
				stackC=0;
				cSize=640;
				startIndex=0;
				startFunc=0;
				valueList=[];
				valueC=0;
				arrowList=[];
				iconList=[];
				movesList=[];
				 movesListC=0;
				
				topC=paper.circle(cSize/2+50,90,((cSize/(Math.pow(4,dTop)))/2)).attr({fill:"white"});
				console.log("before minimax" + xPosFood +"numFoo"+numFood);
				minimaxTemp=minimax(xPosFood,yPosFood,pPosx,pPosy,gPosx,gPosy,numFood, agentTemp,dTop,cSize/2 + 50,[],[]);
				console.log("after minimax" + xPosFood+"numFood"+numFood);
				
				if(agentTemp==0){
					agentTemp=1;
				}else{
					agentTemp=0;
				}
				//console.log(minimaxTemp[0]);
				topCtext=paper.text(cSize/2+50,90,minimaxTemp[0]);
				if(agentTemp==0){
					agentText="ghost";
				}else{
					agentText="pacman";
				}
				if(minimaxTemp[1]==0){
					topCmove=paper.text(100,100, "Selected move: move " + agentText+ " up");
				}else if(minimaxTemp[1]==1){
					topCmove=paper.text(100,100, "Selected move: move " + agentText+ " left");
				}else if(minimaxTemp[1]==2){
					topCmove=paper.text(100,100, "Selected move: move " + agentText+ " down");
				}else if(minimaxTemp[1]==3){
					topCmove=paper.text(100,100, "Selected move: move " + agentText+ " right");
				}
				topCmove.hide();
				//console.log(minimaxTemp[1]);
				topCtext.hide();
			}
			generateStack(stackList[stackCount],valueList[valueCount],800,90);
			var box4=paper.rect(750,60,440,500);
			//generateState(valueList[valueCount],1400,90);
			//console.log(valueList[stackCount].length);
			
			
			if(movesList[movesCount]==0){
				uncolourAll();
				r[0].attr({fill:"yellow"});		
			}else if(movesList[movesCount]==1){
				uncolourAll();
				r[1].attr({fill:"yellow"});
			}else if(movesList[movesCount]==2){
				uncolourAll();
				r[2].attr({fill:"yellow"});
				//console.log(valueList[valueCount] + "ka");
				valueCount++;
				
			}else if(movesList[movesCount]==3){
				uncolourAll();
				r[3].attr({fill:"yellow"});
				//console.log(valueList[valueCount] + "bla");
				stackCount++;
				valueCount++;
							//	console.log(valueList[valueCount] + "bla");
							//	console.log(movesList[movesCount+1]);
			}else if(movesList[movesCount]==4){
				uncolourAll();
				r[4].attr({fill:"yellow"});
			}else if(movesList[movesCount]==5){
				uncolourAll();
				r[5].attr({fill:"yellow"});	
				stackCount++;
				valueCount++;
			}else if(movesList[movesCount]==6){
				uncolourAll();
				r[6].attr({fill:"yellow"});
				stackCount++;
				valueCount++;
			}else if(movesList[movesCount]==7){
				uncolourAll();
				r[7].attr({fill:"yellow"});
			}else if(movesList[movesCount]==8){
				uncolourAll	();
				r[8].attr({fill:"yellow"});	
				stackCount++;
				valueCount++;
			}else if(movesList[movesCount]==9){
				uncolourAll();
				r[9].attr({fill:"yellow"});
				stackCount++;
				valueCount++;
			}else if(movesList[movesCount]==10){
				uncolourAll();
				r[11].attr({fill:"yellow"});			
			}else if(movesList[movesCount]==11){
				uncolourAll();
				r[12].attr({fill:"yellow"});
			}else if(movesList[movesCount]==12){
				uncolourAll();
				r[13].attr({fill:"yellow"});
				
				valueCount++;
			}else if(movesList[movesCount]==13){
				uncolourAll();
				r[14].attr({fill:"yellow"});
				circleList[circleCount].show();
				iconList[circleCount].show();
				arrowList[circleCount].show();

				circleCount++;
				stackCount++;
				valueCount++;
			}else if(movesList[movesCount]==14){
				uncolourAll();
				r[15].attr({fill:"yellow"});
				scoreList[scoreCount].show();
				scoreCount++;
				valueCount++;
			}else if(movesList[movesCount]==15){
				uncolourAll();
				r[16].attr({fill:"yellow"});
				stackCount++;
				valueCount++;
			}else if(movesList[movesCount]==16){
				uncolourAll();
				r[18].attr({fill:"yellow"});
			}else if(movesList[movesCount]==17){
				uncolourAll();
				r[19].attr({fill:"yellow"});			
			}else if(movesList[movesCount]==18){
				uncolourAll();
				r[20].attr({fill:"yellow"});
				
				valueCount++;
			}else if(movesList[movesCount]==19){
				uncolourAll();
				r[21].attr({fill:"yellow"});
				circleList[circleCount].show();
				iconList[circleCount].show();

				arrowList[circleCount].show();

				circleCount++;
				stackCount++;
				valueCount++;
			}else if(movesList[movesCount]==20){
				uncolourAll();
				r[22].attr({fill:"yellow"});
				scoreList[scoreCount].show();
				scoreCount++;
				valueCount++;
			}else if(movesList[movesCount]==21){
				uncolourAll();
				r[23].attr({fill:"yellow"});
				stackCount++;
				valueCount++;
			}
			movesCount++;
			if(movesCount==movesList.length){
				topCtext.show();
				topCmove.show();
				uncolourAll();
				movesCount=-2;
				nextText.attr({text:"Implement move and go on to next step"})
				console.log(xPosFood +" nfood" + numFood);
				//clearInterval(interval);
				//movesCount=0;
			}

			if(movesCount==-1){
				
				
				clearInterval(interval);
				 return;
			}


		},40);
	}

		
	};
//========================	
	//	nextNode.onclick=function(){
			
			
	//};
//==================		
};