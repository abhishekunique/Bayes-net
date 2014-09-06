nextButton = function () { console.log("not set"); };
(function () {
	var timeStep = 0;
	var SAToggle = false;
	var conflictViewToggle = true;
	var dAMT1 = 1000;
	var dAMT2 = 2000;
	var dAMT3 = 3000;
	var highlight = "#EEEF00";
	//class definitions
	var Position = function(x, y, size, color, paper) {
		this.paper = paper;
		this.side = size;
		this.padding = 2;
		this.x = x + this.padding;// + this.side/2;
		this.y = y + this.padding;// + this.side/2;
		this.border = paper.rect(x, y, this.side, this.side, this.padding);
		this.border.attr("stroke-width", this.padding);
		this.fill;
		if (color) { 
			this.fill = "#8C8C8C";
			this.border.attr("fill", this.fill);
		} else {
			this.fill = "#fff";
			this.border.attr("fill",this.fill);
		}
		this.conflictNum = this.paper.text(this.x+45, this.y+45, "");
	}
	var Queen = function(pos, dSize, posArray, paper, qNum){
		//qnum must be < dSize
		this.domain = [];
		for (var p = qNum; p < posArray.length; p+=dSize) {
			this.domain.push(posArray[p]);
		}
		this.pos = pos;
		this.border = paper.image("/images/exercises/csps/hill_climbing/queen.png", this.domain[this.pos].x, this.domain[this.pos].y, 40, 40);
		this.setPosition = function (val) {
			this.pos = val;
			this.border.attr("x", this.domain[this.pos].x);
			this.border.attr("y", this.domain[this.pos].y);
		}
		this.highlightDomain = function () {
			for (var v = 0; v < this.domain.length; v++) {
				this.domain[v].border.attr("fill", highlight);
			}
		}
		this.unhighlightDomain = function () {
			for (var v = 0; v < this.domain.length; v++) {
				this.domain[v].border.attr("fill", this.domain[v].fill);
				this.domain[v].conflictNum.remove();
			}
		}
	}

	//function definitions
	var drawCode = function(toggle) {
		var codeBlock = document.getElementById("code");
		if (codeBlock.hasChildNodes()) {
			while (codeBlock.childNodes.length >= 1) {
				codeBlock.removeChild(codeBlock.firstChild);
			}
		}
		if (!toggle) {
			var l1 = document.createElement("code");
			l1.id = "code1";
			l1.innerHTML = "While (Total Conflicts != 0):";
			var br1 = document.createElement("br");
			codeBlock.appendChild(l1);
			codeBlock.appendChild(br1);
			var l2 = document.createElement("code");
			l2.id = "code2";
			l2.style.paddingLeft = "20px";
			l2.innerHTML = "Randomly pick a queen that participates in at least one conflict";
			var br2 = document.createElement("br");
			codeBlock.appendChild(l2);
			codeBlock.appendChild(br2);
			var l3 = document.createElement("code");
			l3.id = "code3";
			l3.style.paddingLeft = "20px";
			l3.innerHTML = "Move queen to location with fewest total conflicts";
			var br3 = document.createElement("br");
			codeBlock.appendChild(l3);
			codeBlock.appendChild(br3);
			var l4 = document.createElement("code");
			l4.id = "code4";
			l4.innerHTML = "Return Solution";
			var br4 = document.createElement("br");
			var br5 = document.createElement("br");
			codeBlock.appendChild(l4);
			codeBlock.appendChild(br4);
			codeBlock.appendChild(br5);
		} else {
			var l1 = document.createElement("code");
			l1.id = "code1";
			l1.innerHTML = "While (Total Conflicts != 0):";
			var br1 = document.createElement("br");
			codeBlock.appendChild(l1);
			codeBlock.appendChild(br1);
			var l2 = document.createElement("code");
			l2.id = "code2";
			l2.style.paddingLeft = "20px";
			l2.innerHTML = "Randomly pick a queen that participates in at least one conflict";
			var br2 = document.createElement("br");
			codeBlock.appendChild(l2);
			codeBlock.appendChild(br2);
			var l3 = document.createElement("code");
			l3.id = "code3";
			l3.style.paddingLeft = "20px";
			l3.innerHTML = "Randomly pick a new Value for the queen.  Let E = prevTotalConflicts - currentTotalConflicts";
			var br3 = document.createElement("br");
			codeBlock.appendChild(l3);
			codeBlock.appendChild(br3);
			var l4 = document.createElement("code");
			l4.id = "code4";
			l4.style.paddingLeft = "20px";
			l4.innerHTML = "if (E >= 0):";
			var br4 = document.createElement("br");
			codeBlock.appendChild(l4);
			codeBlock.appendChild(br4);
			var l5 = document.createElement("code");
			l5.id = "code5";
			l5.style.paddingLeft = "40px";
			l5.innerHTML = "Keep current assignment and continue";
			var br5 = document.createElement("br");
			codeBlock.appendChild(l5);
			codeBlock.appendChild(br5);
			var l6 = document.createElement("code");
			l6.id = "code6";
			l6.style.paddingLeft = "20px";
			l6.innerHTML = "else:";
			var br6 = document.createElement("br");
			codeBlock.appendChild(l6);
			codeBlock.appendChild(br6);
			var l7 = document.createElement("code");
			l7.id = "code7";
			l7.style.paddingLeft = "40px";
			l7.innerHTML = "if (Helper(timeStep)):";
			var br7 = document.createElement("br");
			codeBlock.appendChild(l7);
			codeBlock.appendChild(br7);
			var l8 = document.createElement("code");
			l8.id = "code8";
			l8.style.paddingLeft = "60px";
			l8.innerHTML = "Keep current assignment and continue:";
			var br8 = document.createElement("br");
			codeBlock.appendChild(l8);
			codeBlock.appendChild(br8);
			var l9 = document.createElement("code");
			l9.id = "code9";
			l9.style.paddingLeft = "40px";
			l9.innerHTML = "else:";
			var br9 = document.createElement("br");
			codeBlock.appendChild(l9);
			codeBlock.appendChild(br9);
			var l10 = document.createElement("code");
			l10.id = "code10";
			l10.style.paddingLeft = "60px";
			l10.innerHTML = "Restore previous assignment";
			var br10 = document.createElement("br");
			codeBlock.appendChild(l10);
			codeBlock.appendChild(br10);
			var l11 = document.createElement("code");
			l11.id = "code11";
			l11.innerHTML = "Return assignment";
			var br11 = document.createElement("br");
			var br12 = document.createElement("br");
			codeBlock.appendChild(l11);
			codeBlock.appendChild(br11);
			codeBlock.appendChild(br12);
		}
	}
	var drawBoard = function(startX, startY, size, paper) {
		var row = 0;
		var toggle = (size%2 == 0);
		var x = startX;
		var y = startY;
		var sqSize = 75;
		var positions = [];
		for (var i = 1; i < (size*size)+1; i++) {
			var pos;
			if (toggle && row%2 == 1) {
				pos = new Position(x, y, sqSize, (i%2==1), paper) }
			else { pos = new Position(x, y, sqSize, (i%2==0), paper); }
			pos.num = row;
			positions.push(pos);
			x += pos.side + pos.padding;
			if (i%(size) == 0) {
				row++; 
				x = startX;
				y += pos.side + pos.padding;// + pos.padding;
			}
		}
		return positions;
	}
	var initializeQueens = function(posArray, size, paper) {
		var queens = []
		for (var q = 0; q < size; q++) {
			var pos = Math.floor(Math.random()*size);
			var queen = new Queen(pos, size, posArray, paper, q);
			queens.push(queen);
		}
		return queens;
	}
	var selectVariable = function (size, qList) {
		for (var q = 0; q < qList.length; q++) { qList[q].unhighlightDomain(); }
		var q = Math.floor(Math.random()*size);
		if (conflictQueen(q, qList, qList.length) == 0) { //qList.length is never encountered so nothign is ignored
			return selectVariable(size, qList);
		}
		var queen = qList[q];
		queen.highlightDomain();
		return q;
	}

	var isEnd = function (qList) {
		for (var i = 0; i < qList.length; i++) {
			if (conflictQueen(i, qList, qList.length) > 0) { return false; }
		}
		return true;
	}

	var conflictQueen = function(qNum, qList, ignore) {
		var count = 0;
		for (var q = 0; q < qList.length; q++) {
			if (q == qNum || q == ignore) { continue; }
			if (qList[qNum].pos == qList[q].pos) { count++; }
			if (qList[qNum].pos == (qList[q].pos + Math.abs(qNum-q))) { count++; }
			if (qList[qNum].pos == (qList[q].pos - Math.abs(qNum-q))) { count++; }
		}
		return count;
	}

	var totalConflict = function(qList, ignore) {
		var count = 0;
		for (var q = 0; q < qList.length; q++) {
			if (q == ignore) { continue; }
			count += conflictQueen(q, qList, ignore);
		}
		return count/2;
	}

	var showConflicts = function (qNum, qList) {
		var queen = qList[qNum];
		var minC = 1000;
		var toReturn = [];
		for (var v = 0; v < queen.domain.length; v++) {
			var conflictCount = 0;
			if (conflictViewToggle) { conflictCount = totalConflict(qList, qNum); } //make this 0 for the other option
			for (var q = 0; q < qList.length; q++) {
				if (q == qNum) { continue; }
				if (v == qList[q].pos) { conflictCount++; }
				if (v == (qList[q].pos + Math.abs(qNum-q))) { conflictCount++; }
				if (v == (qList[q].pos - Math.abs(qNum-q))) { conflictCount++; }
			}
			if (conflictCount == minC) { toReturn.push(v); }
			if (conflictCount < minC) {
				minC = conflictCount;
				toReturn = [v];
			}
			var pos = queen.domain[v]
			pos.conflictNum = pos.paper.text(pos.x+45, pos.y+45, conflictCount);
			pos.conflictNum.attr("font-size", 20);
		}
		return toReturn;
	}

	var Schedule = function (timeStep) {
		return Math.pow(2, 20)/(2*timeStep);
	}
	var Helper = function (delta, temp) {
		var x = Math.exp(delta/temp);
		document.getElementById("saProb").innerHTML = x;
		var y = Math.random();
		document.getElementById("saSample").innerHTML = y;
		if (y < x) { return true; }
		else { return false; }
	}

	var manualMoveSetup = function (queen, correctPos) {
		for (var v = 0; v < queen.domain.length; v++) {
			var pos = queen.domain[v];
			var clickClosure = function (p) {}
			if (correctPos.indexOf(v) >= 0) {
				clickClosure = function (p) {
					var x = function () {
						setTimeout(function () { queen.unhighlightDomain(); }, dAMT2);
						for (var i = 0; i < queen.domain.length; i++) {queen.domain[i].border.attr("stroke", "#000");}
						//turns off the interactivity for this col
						for (var i = 0; i < queen.domain.length; i++) { 
							queen.domain[i].border.unclick(queen.domain[i].clickHandler);
							queen.domain[i].border.unmouseover(queen.domain[i].mouseOverHandler);
							queen.domain[i].conflictNum.unclick(queen.domain[i].conflictNum.clickHandler);
							queen.domain[i].conflictNum.unmouseover(queen.domain[i].conflictNum.mouseOverHandler);
						}
						queen.border.unclick(queen.clickHandler);
						queen.border.unmouseover(queen.mouseOverHandler);
						//done turning off interactivity
						console.log("moved queen");
						$(queen.border.node).effect("pulsate", {times: 3}, dAMT1);
						queen.setPosition(p);
						console.log("next step in 1000ms");
						setTimeout(mainStep, dAMT3);
					}
					return x;
				}
			} else {
				clickClosure = function (p) {
					var x = function () {
						console.log("clicked wrong square");
						queen.domain[p].border.attr("fill", "#f00");
						$(queen.domain[p].border.node).effect("pulsate", {times: 3}, dAMT1);
						setTimeout(function () { queen.domain[p].border.attr("fill", highlight); }, 
									dAMT2);
					}
					return x;
				}
			}
			var moClosure = function (p) {
				var x = function () {
					queen.domain[p].border.attr("stroke", highlight)
				}
				return x;
			}
			var mOutClosure = function (p) {
				var x = function () {
					queen.domain[p].border.attr("stroke", "#000");
				}
				return x;
			}
			pos.clickHandler = clickClosure(v);
			pos.mouseOverHandler = moClosure(v);
			pos.mouseOutHandler = mOutClosure(v);
			pos.border.click(pos.clickHandler);
			pos.border.mouseover(pos.mouseOverHandler);
			pos.border.mouseout(pos.mouseOutHandler);

			pos.conflictNum.clickHandler = clickClosure(v);
			pos.conflictNum.mouseOverHandler = moClosure(v);
			pos.conflictNum.mouseOutHandler = mOutClosure(v);
			pos.conflictNum.click(pos.conflictNum.clickHandler);
			pos.conflictNum.mouseover(pos.conflictNum.mouseOverHandler);
			pos.conflictNum.mouseout(pos.conflictNum.mouseOutHandler);
			if (queen.pos == v) {
				queen.clickHandler = clickClosure(v);
				queen.mouseOverHandler = moClosure(v);
				queen.mouseOutHandler = mOutClosure(v);
				queen.border.click(queen.clickHandler);
				queen.border.mouseover(queen.mouseOverHandler);
				queen.border.mouseout(queen.mouseOutHandler);
			}
		}
	}
	var nextButtonSetup = function (queen, correctPos) {
		nextButton = function () {
			highlightCode("code3");
			nextButton = function () {};
			setTimeout(function () { queen.unhighlightDomain(); }, dAMT2);
			//turns off interactivity 
			for (var i = 0; i < queen.domain.length; i++) { 
				queen.domain[i].border.unclick(queen.domain[i].clickHandler);
				queen.domain[i].border.unmouseover(queen.domain[i].mouseOverHandler);
				queen.domain[i].conflictNum.unclick(queen.domain[i].conflictNum.clickHandler);
				queen.domain[i].conflictNum.unmouseover(queen.domain[i].conflictNum.mouseOverHandler);
			}
			queen.border.unclick(queen.clickHandler);
			queen.border.unmouseover(queen.mouseOverHandler);
			//end previous bloc
			queen.setPosition(correctPos[Math.floor(Math.random()*correctPos.length)]);
			console.log("moved queen");
			$(queen.border.node).effect("pulsate", {times: 3}, dAMT1);
			setTimeout(mainStep, dAMT3);
			console.log("next step in "+dAMT3+"ms");
		}
	}


	var mainStep = function () {
		timeStep++;
		document.getElementById("saDelta").innerHTML = "n/a";
		document.getElementById("saProb").innerHTML = "n/a";
		document.getElementById("saSample").innerHTML = "n/a";
		for (var i = 0; i < queens.length; i++) { queens[i].unhighlightDomain(); }
		$("#conflictCounter").text("Total Conflicts: "+totalConflict(queens, queens.length));
		if (isEnd(queens)) { 
			nextButton = function () {};
			if (!SAToggle){ highlightCode("code4"); }
			else { highlightCode("code11"); }
			return; }
		highlightCode("code1");
		document.getElementById("saTemp").innerHTML = Schedule(timeStep);
		(function () { nextButton = function () {
			state[0] = selectVariable(boardSize, queens);
			state[1] = showConflicts(state[0], queens);
			highlightCode("code2");
			if (SAToggle) {
				(function () { 
					nextButton = function () {
						highlightCode("code3")
						var prevPos = queens[state[0]].pos;
						queens[state[0]].setPosition(Math.floor(Math.random()*queens.length));
						var e = Number(queens[state[0]].domain[prevPos].conflictNum.attr("text")) - 
								Number(queens[state[0]].domain[queens[state[0]].pos].conflictNum.attr("text"));
						document.getElementById("saDelta").innerHTML = e;
						//console.log(e);
						if (e >= 0) {
							(function () {
								nextButton = function () {
									highlightCode("code4");
									(function () {
										nextButton = function () { 
											highlightCode("code5");
											(function () {
												nextButton = function () { mainStep(); }
											})();
										}
									})();
								}
							})();
						} else {
							(function () {
								nextButton = function () {
									highlightCode("code4");
									(function () { 
										nextButton = function () {
											highlightCode("code7");
											if (Helper(e, Schedule(timeStep))) {
												(function () {
													nextButton = function () {
													highlightCode("code8");
													(function () {
														nextButton = function () { mainStep(); }
													})();
												}
											})();
											} else {
												(function () {
													nextButton = function () {
													highlightCode("code10");
													queens[state[0]].setPosition(prevPos);
													(function () {
														nextButton = function () { mainStep(); }
													})();	
												}
											})();
											}
										}
									})();
								}
							})();
						}
				}})();
			} else {
				manualMoveSetup(queens[state[0]], state[1]);
				nextButtonSetup(queens[state[0]], state[1]);
			} 
		}
		})();
	}

	var highlightCode = function (code) {
		for (var i = 1; i < $('#code').children().size(); i++) {
			$("#code"+i).css("background-color", "#fff");
		}
		$("#"+code).css("background-color", highlight);
	}



	//setup paper & drawing
	var pad = 2;
	var boardSize;
	var boardSelector = window.location.hash;
	if (boardSelector == "#3") {
		boardSize = 3;
	} else if (boardSelector == "#5") {
		boardSize = 5;
	} else if (boardSelector == "#6") {
		boardSize = 6;
	} else {
		boardSize = 4;
	}
	var menu = document.getElementById("boardSizeSelect");
	menu.onchange = function() {
			var chosen = this.options[this.selectedIndex];
			if (chosen.value != "current") {
				window.location.hash = chosen.value;
				window.location.reload();
			}
	}
	var menu2 = document.getElementById("conflictViewSelect");
	menu2.onchange = function () {
		if (this.options[this.selectedIndex].value == "1") { conflictViewToggle = true; }
		else { conflictViewToggle = false; }
		queens[state[0]].unhighlightDomain();
		queens[state[0]].highlightDomain();
		showConflicts(state[0], queens);
	}
	var sasOnChange = function () {
		if (document.getElementById("sasOff").checked) { 
			document.getElementById("saValues").style.visibility = "hidden";
			SAToggle = false; 
		}
		else if (document.getElementById("sasOn").checked) { 
			SAToggle = true;
			document.getElementById("saValues").style.visibility = "visible";
		}
		drawCode(SAToggle);
		mainStep();
	}
	var b1 = document.getElementById("sasOff");
	var b2 = document.getElementById("sasOn");
	b1.onchange = sasOnChange;
	b2.onchange = sasOnChange;
	/*
	var menu3 = document.getElementByName("simulatedAnnealingSelect");
	menu3.onchange = function () {
		if (this.options[this.selectedIndex].value == "0") {
			SAToggle = false;
		} else {
			SAToggle = true;
		}
		drawCode(SAToggle);
		mainStep();
	}
	*/

	//some setup
	drawCode(SAToggle);
	var boardPaper = Raphael("board", 750, 750);
	var posList = drawBoard(pad, pad, boardSize, boardPaper);
	var queens = initializeQueens(posList, boardSize, boardPaper);
	//these two arrays hold our main state
	state = [];
	//lezzz go
	mainStep();
})();