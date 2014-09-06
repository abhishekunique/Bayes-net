var button;
(function () { 
		//col1 positions
		position0 = {"x":10, "y":12};
		position1 = {"x":10, "y":99};
		position2 = {"x":10, "y":188};
		position3 = {"x":10, "y":276};		
		positions0 = [position0, position1, position2, position3];
		//col2 positions
		position4 = {"x":98, "y":12};
		position5 = {"x":98, "y":99};
		position6 = {"x":98, "y":188};
		position7 = {"x":98, "y":276};
		positions1 = [position4, position5, position6, position7];
		//col3 positions
		position8 = {"x":186, "y":12};
		position9 = {"x":186, "y":99};
		position10 = {"x":186, "y":188};
		position11 = {"x":186, "y":276};
		positions2 = [position8, position9, position10, position11];
		//col4 positions
		position12 = {"x":274, "y":12};
		position13 = {"x":274, "y":99};
		position14 = {"x":274, "y":188};
		position15 = {"x":274, "y":276};
		positions3 = [position12, position13, position14, position15];
		//array of position arrays	
		superPositions = [positions0, positions1, positions2, positions3];
		//initialize paper and board
		paper = Raphael("paper", 364, 366);
		paper.image("/images/exercises/csps/four_queens/board.png", 0, 0, 364, 366);
		//define queen class
		function queen(col, drawToggle) {
				this.id = col;
				this.positions = superPositions[col];
				this.pos = this.positions[0];
				this.img = null;
				if (drawToggle) { 
						this.img = paper.image("/images/exercises/csps/four_queens/queen.png", 8, 12, 80, 80).attr(this.pos); 
						this.img.node.id = "queen"+queen.id;
				}
		}
		//define queens
		queen0 = new queen(0, true);
		queen1 = new queen(1, true);
		queen2 = new queen(2, true);
		queen3 = new queen(3, true);
		//array of all queens
		queens = [queen0, queen1, queen2, queen3];

		//define mouse over handler for queens
		mouseOverHandler = function () { this.style.cursor = 'crosshair'; }

		//define startMoveHandler, moveHandler, stopHandler
		function startClosure(queen) { 
				function startMoveHandler () { queen.img.oy = queen.img.attr("y"); }
				return startMoveHandler;
		}
		function moveClosure(queen) {
				function moveHandler(dx, dy) {
						newY = queen.img.oy + dy;
						queen.img.attr("y", newY);
				}
				return moveHandler;
		}
		function endClosure(queen) { 
				function endMoveHandler() {
					curPos = queen.img.attr("y");
					pos0dist = Math.abs(curPos - queen.positions[0]["y"]);
					pos1dist = Math.abs(curPos - queen.positions[1]["y"]);
					pos2dist = Math.abs(curPos - queen.positions[2]["y"]);
					pos3dist = Math.abs(curPos - queen.positions[3]["y"]);
					minDist = Math.min(pos0dist, pos1dist, pos2dist, pos3dist);
					if (minDist == pos0dist) { 
							queen.img.attr("y", queen.positions[0]["y"]);
							queen.pos = queen.positions[0];
					} else if (minDist == pos1dist) {
							queen.img.attr("y", queen.positions[1]["y"]);
							queen.pos = queen.positions[1];
					} else if (minDist == pos2dist) {
							queen.img.attr("y", queen.positions[2]["y"]);
							queen.pos = queen.positions[2];
					} else if (minDist == pos3dist) {
							queen.img.attr("y", queen.positions[3]["y"]);
							queen.pos = queen.positions[3];
					}
					if (deepEqual(s, posArray(queens), stage)) {
						unsetHandler(stage, queens);
						$(queen.img.node).effect("pulsate", {times: 3}, 1000);
						if (stage < 3) { 
								setHandler(stage+1, queens);
								$('#response'+stage).text("Correct! Move on to the next Queen.");
								$('#response'+stage).css("color", "green");
						} else {
								$('#response'+stage).text("Congratulations! You're Done with the Question.");
								$('#response'+stage).css("color", "green");
						}
						stage++;
						} else {
							$('#response'+stage).text("Thats the wrong value.  Reassign the queen and try again.");
							$('#response'+stage).css("color", "red");
						}					
				}
				return endMoveHandler;
		}
		//set move and mouse handler
		function setHandler(num, qArray) {
				qArray[num].img.node.onmouseover = mouseOverHandler;
				qArray[num].img.drag(moveClosure(qArray[num]), startClosure(qArray[num]), endClosure(qArray[num]));
		}
		//unset move and mouse handler
		function unsetHandler(num, qArray) {
				qArray[num].img.node.onmouseover = function () { this.style.cursor = 'default';};
				qArray[num].img.undrag();
		}
		//Actually setting handlers
		setHandler(0, queens);
		
		//checking helpers
		function posNum(queen) {
				if (queen.pos == queen.positions[0]) { return 0; }
				else if (queen.pos == queen.positions[1]) { return 1; }
				else if (queen.pos == queen.positions[2]) { return 2; }
				else if (queen.pos == queen.positions[3]) { return 3; }
		}
		function numConflicts(queen, qArray) {
			count = 0;
			curPos = queen.pos["y"];
			for (var i = 0; i < qArray.length; i++) {
				if (curPos == qArray[i].pos["y"] &&	queen.id != i) { count++; }
			}
			pn = posNum(queen);
			for (var i = 0; i < qArray.length; i++) {
				qn = posNum(qArray[i]);
				if (i != queen.id && Math.abs(i-queen.id) == Math.abs(pn - qn)) { count++; }
			}
			return count;
		}
		function conflictingQueen(qArray) {
				for (var i = 0; i < qArray.length; i++) {
						if (numConflicts(qArray[i], qArray) > 0) {
								return qArray[i];
						}
				}
				return null;
		}
		function minConflictingPos(queen, qArray) {
				oPos = queen.pos;
				queen.pos = queen.positions[0];
				v0 = numConflicts(queen, qArray);
				queen.pos = queen.positions[1];
				v1 = numConflicts(queen, qArray);
				queen.pos = queen.positions[2];
				v2 = numConflicts(queen, qArray);
				queen.pos = queen.positions[3];
				v3 = numConflicts(queen, qArray);
				//console.log([v0, v1, v2, v3]);
				minV = Math.min(v0, v1, v2, v3);
				queen.pos = oPos;
				if (minV == v0) { return 0; }
				if (minV == v1) { return 1; }
				if (minV == v2) { return 2; }
				if (minV == v3) { return 3; }
		}
		function setPos(queen, pn) { 
				queen.pos = queen.positions[pn];
		}
		function posArray(qArray) {
				toReturn = [];
				for (var i = 0; i < qArray.length; i++) { toReturn.push(posNum(qArray[i])); }
				return toReturn;
		}
		function deepEqual(a1, a2, num) {
				return (a1[num] == a2[num]);
		}
		function solve() {
			qs = [];
			for (var i = 0; i < 4; i++) { qs.push(new queen(i, false)); }
			for (var i = 0; i < qs.length; i++) {
					q = qs[i];
					newPos = minConflictingPos(q, qs);
					setPos(q, newPos);
			}
			console.log(posArray(queens));
			console.log(posArray(qs));
			return posArray(qs);
		}
		s = solve();
		stage = 0;
})();
