var nextButton;
var prevButton;
var runThrough;
var scalingFactor=1;
var play, interval, pause, ask;
var pauseOn=true;
var nexted;
assigner=(function () { 
	$("#speedup").val(1);
	$("#prevButton").attr("disabled", true);
	var colors = { "a": "#00f", "b": "#f00", "c": "#339933" };
	var radius=50;
	var startX=50;
	var startY=50;
	var distGrid=150;
	pauseOn=true;
	var drawDiagram = function (paper, graph) {
		if(graph==0){	
			scalingFactor=1;
			var radius=50/scalingFactor;
			var startX=50/scalingFactor;
			var startY=350/scalingFactor;
			var distGrid=150/scalingFactor;
			var x = startX;
			var y = startY;
			var r = radius;
			var toReturn = [];
			for (var i = 1; i < 10; i++) {
				toReturn.push(paper.circle(x, y, r));
				if (i%3 == 0) {
					x = startX;
					y -= distGrid;
				} else {
					x += distGrid;
				}
			}
			return toReturn;
		}else if(graph==1){
			scalingFactor=0.87;
			radius=20/scalingFactor;
			startX=20/scalingFactor;
			startY=320/scalingFactor;
			distGrid=60/scalingFactor;
			var x = startX;
			var y = startY;
			var r = radius;
			var toReturn = [];
			for(var i=1;i<7;i++){
				if(i!=5){
					toReturn.push(paper.circle(x, y, r));
				}
				x+=distGrid;
			}
			x=startX+2*distGrid;
			y-=distGrid;
			for(var i=1;i<5;i++){
				toReturn.push(paper.circle(x, y, r));
				x+=distGrid;
			}
			x=startX+distGrid;
			y-=distGrid;
			toReturn.push(paper.circle(x, y, r));
			
			x=startX+2*distGrid;
			toReturn.push(paper.circle(x, y, r));

			x=startX+4*distGrid;
			toReturn.push(paper.circle(x, y, r));

			x=startX+5*distGrid;
			toReturn.push(paper.circle(x, y, r));

			x=startX+distGrid;
			y-=distGrid;
			toReturn.push(paper.circle(x, y, r));

			x=startX+3*distGrid;
			toReturn.push(paper.circle(x, y, r));

			x=startX+4*distGrid;
			toReturn.push(paper.circle(x, y, r));

			x=startX+5*distGrid;
			toReturn.push(paper.circle(x, y, r));

			x=startX+2*distGrid;
			y-=distGrid;
			toReturn.push(paper.circle(x, y, r));

			x=startX+3*distGrid;
			toReturn.push(paper.circle(x, y, r));

			x=startX+4*distGrid;
			toReturn.push(paper.circle(x, y, r));

			x=startX+5*distGrid;
			toReturn.push(paper.circle(x, y, r));

			x=startX;
			y-=distGrid;
			for(var i=1;i<7;i++){
				toReturn.push(paper.circle(x, y, r));
				x+=distGrid;
			}
			
			return toReturn;

		}
	}
	var drawLines = function (paper, n, graph) {
		if(graph==0){
			toReturn = {};
			for (var i = 0; i < 9; i++) { toReturn[i] = []; }

			var i = 0;
			while (i < 9) { 
				if ((i+1)%3==0) {
					i++;
					continue;
				}
				var one = n[i];
				var two = n[i+1];
				var pathString = "M"+(one.attr("cx")+one.attr("r"))+","+one.attr("cy")+
								 "L"+(two.attr("cx")-two.attr("r"))+","+two.attr("cy")+
								 "Z";
				paper.path(pathString);
				toReturn[i].push(i+1);
				toReturn[i+1].push(i);
				i++;
			}
			i = 0;
			while (i < 6) {
				var one = n[i];
				var two = n[i+3];
				var pathString = "M"+one.attr("cx")+","+(one.attr("cy")-one.attr("r"))+
								 "L"+two.attr("cx")+","+(two.attr("cy")+one.attr("r"))+
								 "Z";
				paper.path(pathString);
				toReturn[i].push(i+3);
				toReturn[i+3].push(i);
				i++;
			}
			var f = function(k, j) {	
				var AO = n[k].attr("r")/Math.sqrt(2);
				var a = n[k];
				var b = n[j];
				paper.path("M"+(a.attr("cx")+AO)+","+(a.attr("cy")-AO)+
						   "L"+(b.attr("cx")-AO)+","+(b.attr("cy")+AO)+
						   "Z");
				toReturn[k].push(j);
				toReturn[j].push(k);
			}
			f(0, 4);
			f(1, 5);
			f(3, 7);
			f(4, 8);
			return toReturn;
		}else{
			toReturn = {};
			for (var i = 0; i < 27; i++) { toReturn[i] = []; }

			var i = 0;
			while (i < 4) { 
				if(i!=3 && i!=1){
					var one = n[i];
					var two = n[i+1];
					var pathString = "M"+(one.attr("cx")+one.attr("r"))+","+one.attr("cy")+
									 "L"+(two.attr("cx")-two.attr("r"))+","+two.attr("cy")+
									 "Z";
					paper.path(pathString);
					toReturn[i].push(i+1);
					toReturn[i+1].push(i);
				}
				i++;
			}
			i=9;
			while (i < 10) { 
				
				var one = n[i];
				var two = n[i+1];
				var pathString = "M"+(one.attr("cx")+one.attr("r"))+","+one.attr("cy")+
								 "L"+(two.attr("cx")-two.attr("r"))+","+two.attr("cy")+
								 "Z";
				paper.path(pathString);
				toReturn[i].push(i+1);
				toReturn[i+1].push(i);
				i++;
			}

			i=17;
			while (i < 18) { 
				
				var one = n[i];
				var two = n[i+1];
				var pathString = "M"+(one.attr("cx")+one.attr("r"))+","+one.attr("cy")+
								 "L"+(two.attr("cx")-two.attr("r"))+","+two.attr("cy")+
								 "Z";
				paper.path(pathString);
				toReturn[i].push(i+1);
				toReturn[i+1].push(i);
				i++;
			}
			i=19;
			while (i < 20) { 
				
				var one = n[i];
				var two = n[i+1];
				var pathString = "M"+(one.attr("cx")+one.attr("r"))+","+one.attr("cy")+
								 "L"+(two.attr("cx")-two.attr("r"))+","+two.attr("cy")+
								 "Z";
				paper.path(pathString);
				toReturn[i].push(i+1);
				toReturn[i+1].push(i);
				i++;
			}
			i++;
			while (i < 26) { 
				
					var one = n[i];
					var two = n[i+1];
					var pathString = "M"+(one.attr("cx")+one.attr("r"))+","+one.attr("cy")+
									 "L"+(two.attr("cx")-two.attr("r"))+","+two.attr("cy")+
									 "Z";
					paper.path(pathString);
					toReturn[i].push(i+1);
					toReturn[i+1].push(i);
				
				i++;
			}

				var vert=function(a,b){
					var one = n[a];
					var two = n[b];
					var pathString = "M"+one.attr("cx")+","+(one.attr("cy")+one.attr("r"))+
									 "L"+two.attr("cx")+","+(two.attr("cy")-one.attr("r"))+
									 "Z";
					paper.path(pathString);
					toReturn[a].push(b);
					toReturn[b].push(a);
				}
				vert(21,0);
				vert(5,2);
				vert(6,3);
				vert(8,4);
				vert(10,5);
				vert(12,8);
				vert(13,9);
				vert(15,11);
				vert(16,12);
				vert(19,15);
				vert(23,17);
				vert(24,18);
				vert(25,19);
				vert(26,20);

				var f = function(k, j) {	
					var AO = n[k].attr("r")/Math.sqrt(2);
					var a = n[k];
					var b = n[j];
					paper.path("M"+(a.attr("cx")+AO)+","+(a.attr("cy")+AO)+
							   "L"+(b.attr("cx")-AO)+","+(b.attr("cy")-AO)+
							   "Z");
					toReturn[k].push(j);
					toReturn[j].push(k);
				}

				var g = function(k, j) {	
					var AO = n[k].attr("r")/Math.sqrt(2);
					var a = n[k];
					var b = n[j];
					paper.path("M"+(a.attr("cx")-AO)+","+(a.attr("cy")+AO)+
							   "L"+(b.attr("cx")+AO)+","+(b.attr("cy")-AO)+
							   "Z");
					toReturn[k].push(j);
					toReturn[j].push(k);
				}
				f(10,6);
				f(18,15);
				f(22,17);
				f(23,18);
				f(21,7);
				g(7,3);
				g(12,7);
				g(14,10);
				g(16,11);
				g(20,15);
				g(25,18);
				g(26,19);
					var Ax = n[1].attr("r")/Math.sqrt(26);
					var Ay = n[1].attr("r")*5/Math.sqrt(26);
					var a = n[21];
					var b = n[1];
					paper.path("M"+(a.attr("cx")+Ax)+","+(a.attr("cy")+Ay)+
							   "L"+(b.attr("cx")-Ax)+","+(b.attr("cy")-Ay)+
							   "Z");
					toReturn[1].push(21);
					toReturn[21].push(1);

					var Ax = n[2].attr("r")*2/Math.sqrt(5);
					var Ay = n[2].attr("r")/Math.sqrt(5);
					var a = n[7];
					var b = n[2];
					paper.path("M"+(a.attr("cx")-Ax)+","+(a.attr("cy")+Ay)+
							   "L"+(b.attr("cx")+Ax)+","+(b.attr("cy")-Ay)+
							   "Z");
					toReturn[7].push(2);
					toReturn[2].push(7);

			return toReturn;
		}
	}

	function isComplete(assn) {
		for (var i = 0; i < numNodes; i++) {
			if (assn[i] == null) { return false; }
		}
		return true;
	}

	function copyDomains(domains) {
		var temp = {}
		for (var i = 0; i < numNodes; i++) {
			temp[i] = [];
			for (var j = 0; j < domains[i].length; j++) {
				temp[i].push(domains[i][j]);
			}
		}
		return temp;
	}
	function copyAssignment(assn) {
		var temp = {};
		for (var i = 0; i < numNodes; i++) {
			temp[i] = assn[i];
		}
		return temp;
	}

	function removeValue(domains, variable, value) {
		var domain = domains[variable];
		if (domain.length == 0) { return domains; }
		var x = domain.indexOf(value);
		if (x == -1) { return domains; }
		var a = domain.slice(0, x);
		var b = domain.slice(x+1, domain.length);
		domain = a.concat(b);
		if (domain.length == 0) { return false; }
		domains[variable] = domain;
		return domains;
	}

	function pruneDomains(domains, toPrune, value) {
		for (var i = 0; i < toPrune.length; i++) {
			var result = removeValue(domains, toPrune[i], value);
			if (!result) { return false; }
		}
		return domains;
	}

	function isConsistent(assn, edges) {
		for (var i = 0; i < numNodes; i++) {
			if (assn[i] == null) {continue;}
			var toCheck = edges[i];
			for (var j = 0; j < toCheck.length; j++) {
				if (assn[i] == assn[toCheck[j]]) { return false; }
			}
		}
		return true;
	}


	function selectOrdering(a, domains, orderType, edges){
		if(orderType=="MRV"){
			var minimumLength=1000, initialPos=-1
			for (var i = 0; i < numNodes; i++) { 
				if(a[i] == null) { 
					if(domains[i].length < minimumLength){
						minimumLength=domains[i].length;
						initialPos=i;
					}/*else if(domains[i].length==minimumLength){
						if(edges[i].length<edges[initialPos].length){
							minimumLength=domains[i].length;
							initialPos=i;
						}
					}*/
				}
			}
			return initialPos;
		}else if(orderType=="Normal"){
			for (var i = 0; i < numNodes; i++) { 
				if(a[i] == null) { 
					return i;
				}
			}
		}
	}

	function selectDomainValue(nodes, edges, domains, assn,variable, selectType, position){
		if(selectType=="LCV"){
			var minEliminated=1000, minEliminatedPos=-1;
			var orderDict={};
			for(var i=0;i<domains[variable].length;i++){
				var numEliminated=0;
				for(var j=0;j<edges[i].length;j++){
					
						if(domains[edges[i][j]].indexOf(domains[variable][i])!=-1){
							numEliminated++;
						}
					
				}
				orderDict[domains[variable][i]]=numEliminated/*
				if(numEliminated<minEliminated){
					minEliminated=numEliminated;
					minEliminatedPos=i;
				}*/
			}
			var orderKeys=Object.keys(orderDict);
			for(var i=0;i<orderKeys.length;i++){
				var minOrderKeysValue=orderKeys[i], minOrderKeysPos=i;
				for(var j=i+1;j<orderKeys.length;j++){
					if(orderKeys[j]<minOrderKeysValue){
						minOrderKeysPos=j;
					}
				}
				var temp=orderKeys[i];
				orderKeys[i]=orderKeys[minOrderKeysPos];
				orderKeys[minOrderKeysPos]=temp;
			}
			
			//return domains[variable][minEliminatedPos];	
			return orderKeys.slice();	
		}else if(selectType=="Normal"){
			var orderVal=[];
			for(var i=0;i<domains[variable].length;i++){
				orderVal.push(domains[variable][i]);
			}
			//return domains[variable][position];
			return orderVal.slice();
		}
	}
	

	
	function AC3(nodes, edges, domains, assn, animations){
		var queue=[];
		var edgesKeys=Object.keys(edges);
		movesList.push(0);
		for(var i=0;i<edgesKeys.length;i++){
			for(var j=0;j<edges[edgesKeys[i]].length;j++){
				queue.push([edgesKeys[i].toString(),edges[edgesKeys[i]][j].toString() ]);
				queue.push([edges[edgesKeys[i]][j].toString(),edgesKeys[i].toString() ]);
			}
		}
		
		while(queue.length!=0){
			movesList.push(1);
			var arc=queue.pop();
			var x1=arc[0].toString();

			var x2=arc[1].toString();
			movesList.push(2);
			if(removeInconsistentValues(x1,x2, nodes, edges, domains, assn, animations)){
				movesList.push(3);
				for(var i=0;i<edges[x1].length;i++){
					movesList.push(4);
					queue.push([edges[x1][i], x1]);
				}
			}
		}
		return domains;
	}

	function removeInconsistentValues(x1,x2, nodes, edges, domains, assn, animations){
		movesList.push(5);
		var removed=false;
		for(var i=0;i<domains[x1].length;i++){
			movesList.push(6);
			var satisfyConstraint=false;
			for(var j=0;j<domains[x2].length;j++){
				if(domains[x2][j]!=domains[x1][i]){
					satisfyConstraint=true;
				}
			}
			if(!satisfyConstraint){
				movesList.push(7);
				domains[x1].splice(i,1);
				removed=true;
			}
		}
		movesList.push(8);
		return removed;
	}

	function constraint_prop(nodes, edges, domains, assn, animations, filterType, variable, value){
		if(filterType=="AC"){
			var tempDomains1 = copyDomains(domains);
			tempDomains1[variable]=[value];
			return AC3(nodes, edges, tempDomains1, assn, animations);
			
		}else if(filterType=="FC"){
			var tempDom={};
			for(var i=0;i<numNodes;i++){
				tempDom[i]=domains[i].slice();
			}
			for(var i=0;i<edges[variable].length;i++){
				if(tempDom[edges[variable][i]].indexOf(value)!=-1){
					tempDom[edges[variable][i]].splice(tempDom[edges[variable][i]].indexOf(value),1);
				}	
			}
			return tempDom;
		}
	}

	function plainBacktracking(nodes, edges, domains, assn, animations, moves){
		if (isComplete(assn)) { 
			movesList.push(11);
			return assn; 
		}
		var emptyDomains=[];
		for(var i=0;i<numNodes;i++){
			emptyDomains[i]=[];
		}
		var variable;
		movesList.push(12);
		variable=selectOrdering(assn, domains, variableSelect, edges);
		var orderValues=selectDomainValue(nodes, edges, domains, assn, variable, valueSelect, i);
		 for(var i=0;i<domains[variable].length;i++){
		 	var value =orderValues[i];
		 	var tempAssn = copyAssignment(assn);
				//extend the temp assignment
				tempAssn[variable] = value;
				
				//check to see that extension was consistent
				if (!isConsistent(tempAssn, edges)) {
					//animations.push(new Animation(assn, nodes, emptyDomains));
					continue;
				}
				animations.push(new Animation(tempAssn, nodes, emptyDomains));
				var tempDomains = copyDomains(domains);
				movesList.push(20);
				var result = plainBacktracking(nodes, edges, tempDomains, tempAssn, animations);
				if (!result) {
					movesList.push(22);
					//we failed somewhere down the line, so this value is no good so continue
					assn[variable] = null;
					animations.push(new Animation(assn, nodes, emptyDomains));
					continue;
				} else {
					movesList.push(23);
					return result;
				}
			}
			return false;

	}

	function noearly(nodes, edges, domains, assn, animations, moves){
		if (isComplete(assn)) { 
			if (!isConsistent(assn, edges)) {
					return false;
			}else{
				return assn;
			}
			 
		}
		var emptyDomains=[];
		for(var i=0;i<numNodes;i++){
			emptyDomains[i]=[];
		}
		var variable;
		variable=selectOrdering(assn, domains, variableSelect, edges);
		var orderValues=selectDomainValue(nodes, edges, domains, assn, variable, valueSelect, i);
		 for(var i=0;i<domains[variable].length;i++){
		 	var value =orderValues[i];
		 	var tempAssn = copyAssignment(assn);
				//extend the temp assignment
				tempAssn[variable] = value;
				animations.push(new Animation(tempAssn, nodes, emptyDomains));
				var tempDomains = copyDomains(domains);
				movesList.push(20);
				var result = noearly(nodes, edges, tempDomains, tempAssn, animations);
				if (!result) {
					movesList.push(22);
					//we failed somewhere down the line, so this value is no good so continue
					assn[variable] = null;
					animations.push(new Animation(assn, nodes, emptyDomains));
					continue;
				} else {
					movesList.push(23);
					return result;
				}
			}
			return false;

	}

	function backtrackingSearchFC(nodes, edges, domains, assn, animations) {
		if (isComplete(assn)) { return assn; }
		//pick first unassigned variable
		var variable;
		variable=selectOrdering(assn, domains, variableSelect, edges);
		var orderValues=selectDomainValue(nodes, edges, domains, assn, variable, valueSelect, i);
		//iterate through the values in selected variables domain
		for (var i = 0; i < orderValues.length; i++) {
			var value = orderValues[i];
			//copy the current assignmet
			var tempAssn = copyAssignment(assn);
			//extend the temp assignment
			tempAssn[variable] = value;

			var tDs = copyDomains(domains);
			//prune domains
			var tPs = edges[variable];
			for (var j = 0; j < tPs.length; j++) {
				var result = removeValue(tDs, tPs[j], value);
				if(!result){
					tDs[tPs[j]]=[];
				}
			}

			
			//check to see that extension was consistent
			if (!isConsistent(tempAssn, edges)) {
				//animations.push(new Animation(assn, nodes,copyDomains(domains)));
				continue;
			}
			animations.push(new Animation(tempAssn, nodes, copyDomains(tDs)));
			//copy domains because pruning is destructinve
			var tempDomains = copyDomains(domains);
			//prune domains
			var toPrune = edges[variable];
			tempDomains = pruneDomains(tempDomains, toPrune, value);
			if (!tempDomains) { 
				//pruning the domains lead to one being empty, this value is no good so continue
				var tD = copyDomains(domains);
				var tP = edges[variable];
				for (var j = 0; j < tP.length; j++) {
					var result = removeValue(tD, tP[j], value);
					if(!result){
						tDs[tPs[j]]=[];
					}
				}
				animations.push(new Animation(assn, nodes,  copyDomains(tD)));
				continue;
			} else {
				//pruning left some value in every domain, so recur
				var result = backtrackingSearchFC(nodes, edges, tempDomains, tempAssn, animations);
				if (!result) {
					//we failed somewhere down the line, so this value is no good so continue
					assn[variable] = null;
					animations.push(new Animation(assn, nodes,  copyDomains(tempDomains)));
					continue;
				} else {
					return result;
				}
			}
		}
		return false;
	}


	function backtrackingSearch(nodes, edges, domains, assn, animations, moves) {
		movesList.push(9);
		movesList.push(10);
		if (isComplete(assn)) { 
			movesList.push(11);
			return assn; 
		}
		var emptyDomains=[];
		for(var i=0;i<numNodes;i++){
			emptyDomains[i]=[];
		}
		//pick first unassigned variable
		var variable;
		movesList.push(12);
		variable=selectOrdering(assn, domains, variableSelect, edges);
		var new_domain={};
		//iterate through the values in selected variables domain
		for(var i=0;i<domains[variable].length;i++){
			var tempValue=assn[variable];
			assn[variable]=domains[variable][i];
			movesList.push(13);
			movesList.push(14);
			new_domain[domains[variable][i]]= constraint_prop(nodes, edges, domains, assn, animations, filter, variable, domains[variable][i]);
			assn[variable]=tempValue;
		}
		var orderValues=selectDomainValue(nodes, edges, domains, assn, variable, valueSelect, i);
		 for(var i=0;i<domains[variable].length;i++){
		 	movesList.push(15);
		 	movesList.push(16);
			//var value = domains[variable][i];
			var value =orderValues[i];
		
			var emptyFlag=false;
				for(var k=0;k<new_domain[value].length;k++){
					if(new_domain[value][k].length==0){
						emptyFlag=true;
						break;
					}
				}
			
			movesList.push(17);
			if(emptyFlag){
				movesList.push(18);

				animations.push(new Animation(assn, nodes, copyDomains(new_domain[value])));
				continue;
			}else{	
				movesList.push(19);
				//copy the current assignmet
				var tempAssn = copyAssignment(assn);
				//extend the temp assignment
				tempAssn[variable] = value;
				
				//check to see that extension was consistent
				if (!isConsistent(tempAssn, edges)) {
					//animations.push(new Animation(assn, nodes, copyDomains(domains)));
					continue;
				}
				animations.push(new Animation(tempAssn, nodes, copyDomains(new_domain[value])));
				//copy domains because pruning is destructinve
				var tempDomains = copyDomains(domains);
				movesList.push(20);
				var result = backtrackingSearch(nodes, edges, new_domain[value], tempAssn, animations);
				movesList.push(21);
				if (!result) {
					movesList.push(22);
					//we failed somewhere down the line, so this value is no good so continue
					assn[variable] = null;
					animations.push(new Animation(assn, nodes, copyDomains(domains)));
					continue;
				} else {
					movesList.push(23);
					return result;
				}
			}
		}
		movesList.push(24);
		return false;
		

	}

	function minConflict(nodes, edges, domains, assn){
		var exitFlag=false;
		while(!exitFlag){
			var tempAnimationArray=[];
			var tempMoves=[];
			for(var i=0;i<numNodes;i++){
				assn[i]=domains[i][Math.floor(Math.random()*3)];
			}
			tempAssn={};
				var keysTemp=Object.keys(assn);
				for(var j=0;j<keysTemp.length;j++){
					tempAssn[j]=assn[j];
				}
			tempAnimationArray.push(new Animation(tempAssn, nodes));
			tempMoves.push(0);
			exitFlag=false;
			for(i=0;i<10000;i++){
				var selectedVar=Math.floor(Math.random()*numNodes);
				var minimumConflict=1000, minimumConflictPos=-1;
				var conflictedFlag=false;
					for(var k=0;k<edges[selectedVar].length;k++){
						if(assn[selectedVar]==assn[edges[selectedVar][k]]){
							conflictedFlag=true;
							break;
						}
					}
				
				if(conflictedFlag){

					for(var j=0;j<domains[selectedVar].length;j++){
						numConflict=0;
						for(var k=0;k<edges[selectedVar].length;k++){
							if(domains[selectedVar][j]==assn[edges[selectedVar][k]]){
								numConflict++;
							}
						}
						if(numConflict<minimumConflict){
							minimumConflict=numConflict;
							minimumConflictPos=j;
						}
					}
						
						var differentFlag=true;
						if(assn[selectedVar]==domains[selectedVar][minimumConflictPos]){
							differentFlag=false;
						}
						assn[selectedVar]=domains[selectedVar][minimumConflictPos];
						tempMoves.push(1);
						tempAssn={};
						var keysTemp=Object.keys(assn);
						for(var j=0;j<keysTemp.length;j++){
							tempAssn[j]=assn[j];
						}
						if(differentFlag){
							tempAnimationArray.push(new Animation(tempAssn, nodes));
						}
						tempMoves.push(2);

				}

				for(var h=0;h<numNodes;h++){
					var conflictedFlag=false;
					for(var k=0;k<edges[h].length;k++){
						if(assn[h]==assn[edges[h][k]]){
							conflictedFlag=true;
							break;
						}
					}
					if(conflictedFlag){
						break;
					}
				}
				tempMoves.push(3);
				if(!conflictedFlag){
					exitFlag=true;	
					//animations.concat(tempAnimationArray);
					Animations=tempAnimationArray;
					movesList=(tempMoves);
					break;
				}
			}
		}
	}

	
	var Animation = function (assn, nodes, domains) {
		this.assn = assn;
		this.nodes = nodes;
		this.domains=domains;
		this.showAnimation = function (buttonSets) {
			violatedPaths && violatedPaths.hide();
			if(solveType=="MC"){
				violatedPaths=visPaper.set();
				for (var i = 0; i < numNodes; i++) {
					var toCheck = edges[i];
					for (var j = 0; j < toCheck.length; j++) {
						if (this.assn[i] == this.assn[toCheck[j]]) { 
							violatedPaths.push(visPaper.path("M"+this.nodes[i].attr("cx")+ ","+ this.nodes[i].attr("cy")+ "L"+ this.nodes[toCheck[j]].attr("cx")+ ","+ this.nodes[toCheck[j]].attr("cy")).attr({"stroke-width":10, stroke:"orange"}).toBack());
						}
					}
				}
			}
			for (var i = 0; i < numNodes; i++) {
				buttonSets[i].hide();

				if (this.assn[i] == null) { 
					nodes[i].attr("fill", "white"); 
					for(var j=0;j<this.domains[i].length;j++){
						for(var k=0;k<3;k++){
								if(buttonSets[i][k].attr("fill")==colors[this.domains[i][j]]){
									buttonSets[i][k].show();
								}
						}
					}
				}else { 
					nodes[i].attr("fill", colors[this.assn[i]]); 
				}
			}
		}
	}

	visPaper = new Raphael("vis", 450, 420);
	var violatedPaths;
	var nodes = drawDiagram(visPaper,typeGraph);
	var numNodes=nodes.length;
	var edges = drawLines(visPaper, nodes,typeGraph);
	var domains = {};
	for (var i = 0; i < numNodes; i++) { domains[i] = ["a", "b", "c"]; }
	var assignment = {};
	for (var i = 0; i < numNodes; i++) { assignment[i] = null; }
	var Animations = [];
	var movesList=[];
	var toggleFlag={};
	var buttonSets={};
	if(!filteringOn && solveType=="BT"){
		console.log(plainBacktracking(nodes, edges, domains, assignment, Animations));
	}else if(filter=="FC" && solveType=="BT"){
		console.log(backtrackingSearchFC(nodes, edges, domains, assignment, Animations));
	} else if(solveType=="BT"){
		console.log(backtrackingSearch(nodes, edges, domains, assignment, Animations));
	}else if(solveType=="naive"){
		if(typeGraph==0){
			console.log(noearly(nodes, edges, domains, assignment, Animations));
		}else{
			console.log(backtrackingSearchFC(nodes, edges, domains, assignment, Animations));
		}	
	}else{
		minConflict(nodes, edges, domains, assignment, Animations);
	}
	
	var count = 0;
	var askCounter=0;
	var movesCount=0;
	var numStage=0;
	var countAnimations=Animations.length;
	function nextAnimation() {
		if(nexted==0){
			count+=2;
		}
		Animations[count].showAnimation(buttonSets);
		if (count < Animations.length-1) { 
			count++;
			$("#prevButton").attr("disabled", false);
			nexted=1;
		}else{
			$("#nextButton").attr("disabled", true);
			$("#player").attr("disabled", true);
			$("#fasterButton").attr("disabled", true);
			$("#pauser").attr("disabled", true);		
			setTimeout(function(){
						for(var i=0;i<numNodes;i++){
							nodes[i].attr({fill:"white"});
						}
						setTimeout(function(){
							Animations[count].showAnimation(buttonSets);
						}, 600);
					}
				,600);
			setTimeout(function(){
						for(var i=0;i<numNodes;i++){
							nodes[i].attr({fill:"white"});
						}
						setTimeout(function(){
							Animations[count].showAnimation(buttonSets);
						}, 600);
					}
				,1800);
			setTimeout(function(){
						for(var i=0;i<numNodes;i++){
							nodes[i].attr({fill:"white"});
						}
						setTimeout(function(){
							Animations[count].showAnimation(buttonSets);
						}, 600);
					}
				,3000);
		}
	}

	function prevAnimation() {
		
		if(nexted==1 && count < Animations.length-1){
			count-=2;
		}else if(nexted==1 && count == Animations.length-1){
			count-=1;
		}
		
		if (count >=0) { 
			Animations[count].showAnimation(buttonSets);
			count--;
			nexted=0;
			$("#nextButton").attr("disabled", false);
			$("#player").attr("disabled", false);
			$("#fasterButton").attr("disabled", false);
			$("#pauser").attr("disabled", false);
		}else if(count==-1){
			for(var i=0;i<numNodes;i++){
				nodes[i].attr({fill:"white"});
				buttonSets[i].show();
			}
			count--;
			$("#prevButton").attr("disabled", true);	
		}
	}
	prevButton=prevAnimation;
	function runner() {
		movesCount++;
	}
	runThrough= runner;
	nextButton = nextAnimation;
	function playThrough(){
		interval=setInterval(function(){
			if(nexted==0){
				count+=2;
			}
			Animations[count].showAnimation(buttonSets);
			if (count < Animations.length-1) { 
				count++; 
				$("#prevButton").attr("disabled", false);
				nexted=1;
				pauseOn=false;
			}else{
				$("#nextButton").attr("disabled", true);	
				$("#player").attr("disabled", true);
				$("#fasterButton").attr("disabled", true);
				$("#pauser").attr("disabled", true);
				setTimeout(function(){
						for(var i=0;i<numNodes;i++){
							nodes[i].attr({fill:"white"});
						}
						setTimeout(function(){
							Animations[count].showAnimation(buttonSets);
						}, 600);
					}
				,600);
			setTimeout(function(){
						for(var i=0;i<numNodes;i++){
							nodes[i].attr({fill:"white"});
						}
						setTimeout(function(){
							Animations[count].showAnimation(buttonSets);
						}, 600);
					}
				,1800);
			setTimeout(function(){
						for(var i=0;i<numNodes;i++){
							nodes[i].attr({fill:"white"});
						}
						setTimeout(function(){
							Animations[count].showAnimation(buttonSets);
						}, 600);
					}
				,3000);
				pauseOn=true;
				clearInterval(interval);	
			}
		},($("#playSpeed").val()/$("#speedup").val() ));
		
	}

	function pauserFunction(){
		clearInterval(interval);
		$("#speedup").val(1);
		pauseOn=true;
	}
	pause=pauserFunction;
	play=playThrough;
	
	for(var i=0;i<numNodes;i++){
					var xpos=nodes[i].attr("cx");
					var ypos=nodes[i].attr("cy");
					var rad=nodes[i].attr("r")/(scalingFactor*5);	
					var bigRad=nodes[i].attr("r")/(scalingFactor);
						var tempSet=visPaper.set();
						for(var j=0;j<domains[i].length;j++){
							var t=visPaper.circle(xpos+bigRad/2*Math.cos(2*Math.PI*j/3 +Math.PI+ Math.PI/6),ypos+bigRad/2*Math.sin(2*Math.PI*j/3+ Math.PI+Math.PI/6), rad).attr({fill:colors[domains[i][j]]});
							tempSet.push(t);
						}
					tempSet.hide();
					toggleFlag[i]=false;
					buttonSets[i]=tempSet;

	}
	if(filteringOn && solveType!="MC" && solveType!="naive"){
		for (var i = 0; i < numNodes; i++) {
				buttonSets[i].show();
			}
	}
	if(solveType=="MC"){
		nextAnimation();
	}

});
assigner();