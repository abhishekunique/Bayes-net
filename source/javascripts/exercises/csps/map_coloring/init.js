var next;
$(function(){	
	urlToggle = window.location.hash;
	console.log(urlToggle);
	var tempP;
	if (urlToggle == "#2") {
		tempP = paths2;
	} else {
		tempP = paths;
	}
	var mapMenu = document.getElementById("mapSelect");
	mapMenu.onchange = function() {
			var chosen = this.options[this.selectedIndex];
			if (chosen.value != "nothing") {
				window.location.hash = chosen.value;
				window.location.reload();
			}
	}

	//setup map paper
	var map = Raphael('map', 300, 225),
	//default map attributes
	defaultAttrs = {fill: '#fff', stroke: '#000', 'stroke-width': 1, 'stroke-linejoin': 'round'};
	
	//an array of the variables, the name variable from the path objects
	var variables = [];
	for (var i in tempP) {
		variables.push(tempP[i].name);
	}

	//definitions of the colors
	var purple = "#b23aee";
	var green = "#0f0";
	var blue = "#00f";
	var orange = "#ff6103"
	var none = "#fff";
	var highlight = "#ff0";
	var grey = "#8A8A8A";
	var black = "#000";
	var colors = {};
	colors[purple] = "purple";
	colors[green] = "green";
	colors[blue] = "blue";
	colors[orange] = "orange";
	colors[none] = "none";
	colors[highlight] = "highlight";
	colors[grey] = "grey";
	colors[black] = "black";

	//add the domains divs to the DOM
	for (var i in variables) {
			v = variables[i];
			div = document.createElement('div');
			div.setAttribute('id', v);
			div.setAttribute('class', 'row');
			div.setAttribute('style', 'border-radius: 10px; padding-top: 10px');
			
			titleDiv = document.createElement('div');
			titleDiv.setAttribute('class', 'span1');
			txt = document.createElement('h2');
			txt.setAttribute('id', v+"text");
			titleDiv.appendChild(txt);
			
			colorSpace = document.createElement('div');
			colorSpace.setAttribute('class', 'span3');
			colorSpace.setAttribute('id', v+"colorSpace");

			div.appendChild(titleDiv);
			div.appendChild(colorSpace);
			document.getElementById("domains").appendChild(div);
			$("#"+v+"text").text(v);
	}

	//add the front end map to the screen
	var shapes = {};
	for (var i in variables) {
		v = variables[i];
		img = map.path(tempP[v].path);
		img.attr(defaultAttrs);
		shapes[v] = img;
		bbox = img.getBBox();
		map.text(bbox.x+(bbox.width/2), bbox.y+(bbox.height/2), v);
	}

	//This method displays the domains
	function setDomain(v, colorArray) {
			colorPaper = Raphael(v+'colorSpace', 225, 40);	
			x = 5;
			rects = [];
			for (var c in colorArray) {
				color = colorArray[c];
				r = colorPaper.rect(x, 2, 30, 30, 2);
				r.attr("fill", color);
				rects.push(r);
				x += 55;
			}
			return rects;
	}
	//set the initial domains
	domains = {};
	for (var v in variables) {
		domains[variables[v]] = setDomain(variables[v], [blue, green, orange, purple]);
	}
	
	//assignment wrapper
	function assignment(a, prev) {
		this.prev = prev;
		this.assn = a;
		this.expandedChildren = [];
		this.toString = function () {
			toReturn = "{";
			for (var a in this.assn) {
				var val = "";
				for (var c in colors) {
					if (this.assn[a] == c) { val = colors[c]; } 
				}
				toReturn += a;
				toReturn += ":";
				toReturn += val;
				toReturn += ", ";
			}
			toReturn = toReturn.slice(0,toReturn.length-2)+"}";
			return toReturn;
		}
	}
	function backSelectVariable(a) {
		for (var v in variables) {
			variable = variables[v];
			if (a.assn[variable] == none) { return variable; }
		}
	}
	function frontSelectVariable(v) {
		$("#"+v).css({"background-color": "#ff0"});
		$(shapes[v].node).css({"stroke-width": "5px"});
	}
	function frontPurgeVariable() {
		for (var variable in variables) {
			v = variables[variable];
			$("#"+v).css({"background-color": "#fff"});
			$(shapes[v].node).css({"stroke-width": "1px"});
		}
	}
	function backSelectValue(variable, value) {
		return domains[variable][value].attr("fill");
	}
	function frontSelectValue(variable, value, arr) {
		if (value > 0) { domains[variable][value-1].attr("stroke", grey); }
		domains[variable][value].attr("stroke-width", "5px");
		arr.push(domains[variable][value]);
		return arr;
	}
	function frontPurgeValues(arr) {
		for (v in arr) {
			value = arr[v];
			value.attr("stroke-width", "1px");
		}
		return [];
	}
	function isComplete(a) {
		for (v in variables) {
			variable = variables[v];
			if (a.assn[variable] == none) { return false; }
		}
		return true;
	}
	
	//The if-statement in this function is hardcoded and specific to the map in the file paths.js
	function constraintsOne(assn) {
		temp = assn.assn;
		if (((temp["WA"] == temp["NT"] || temp["WA"] == temp["SA"]) && temp["WA"] != none) ||
			((temp["NT"] == temp["WA"] || temp["NT"] == temp["SA"] || temp["NT"] == temp["QLD"]) && temp["NT"] != none) ||
			((temp["SA"] == temp["WA"] || temp["SA"] == temp["NT"] || temp["SA"] == temp["QLD"] || temp["SA"] == temp["NSW"]) && temp["SA"] != none) ||
			((temp["QLD"] == temp["NT"] || temp["QLD"] == temp["SA"] || temp["QLD"] == temp["NSW"]) && temp["QLD"] != none) ||
			((temp["NSW"] == temp["SA"] || temp["NSW"] == temp["QLD"]) && temp["NSW"] != none)) { return null; }
		else { return assn; }
	}
	//the if-statement in this function is hardcoded and specific to the map in the file paths1.js
	function constraintsTwo(assn) {
		temp = assn.assn;
		if (((temp["CA"] == temp["NV"] || temp["CA"] == temp["AZ"]) && temp["CA"] != none) ||
			((temp["NV"] == temp["CA"] || temp["NV"] == temp["UT"] || temp["NV"] == temp["AZ"]) && temp["NV"] != none) ||
			((temp["UT"] == temp["NV"] || temp["UT"] == temp["AZ"] || temp["UT"] == temp["CO"]) && temp["UT"] != none) ||
			((temp["CO"] == temp["UT"] || temp["CO"] == temp["NM"]) && temp["CO"] != none) ||
			((temp["AZ"] == temp["CA"] || temp["AZ"] == temp["NV"] || temp["AZ"] == temp["UT"] || temp["AZ"] == temp["NM"]) && temp["AZ"] != none) ||
			((temp["NM"] == temp["AZ"] || temp["NM"] == temp["CO"]) && temp["NM"] != none)) { return null; }
		else { return assn; }
	}
	
	function isConsistent(vrbl, val, a) {
		temp = {};
		for (var v in variables) {
			variable = variables[v];
			temp[variable] = a.assn[variable];
		}
		temp[vrbl] = val;
		newA = new assignment(temp, a);
		if (urlToggle == "#2") {
			return constraintsTwo(newA);
		} else {
			return constraintsOne(newA);
		}
	}

	//this is the temp assignment passed into runSearch()
	asd = {};
	for (var v in variables) {
		variable = variables[v];
		asd[variable] = none;
	}
	tempAhh = new assignment(asd, null);

	//draws the stack box
	stackPaper = Raphael("stack", 300, 400);

	//wrapper fon animations
	var animationPurge = [];
    function Animation(type, code, variable, value, stack, assn) {
		this.assn = assn;
		this.stack = stack;
		this.type = type;
		this.code = code;
		this.value = value;
		this.variable = variable;
		this.showAnimation = function () {
			this.stack.code = this.code;
			clr = this.value;
			if (this.value != null) { clr = colors[domains[this.variable][this.value].attr("fill")]; }
			if (this.type == "code") {
				this.unhighlightCode();
				$("#"+this.code).css("background-color", highlight);
				this.stack.Update({"var": this.variable, "value": clr, "assn": this.assn.toString()});
			} else if (this.type == "sVar") {
				this.unhighlightCode();
				$("#"+this.code).css("background-color", highlight);
				frontPurgeVariable();
				frontSelectVariable(this.variable);
				this.stack.Update({"var": this.variable, "value": clr, "assn": this.assn.toString()});
			} else if (this.type == "sVal") {
				this.unhighlightCode();
				$("#"+this.code).css("background-color", highlight);
				frontSelectValue(this.variable, this.value, animationPurge);
				this.stack.Update({"var": this.variable, "value": clr, "assn": this.assn.toString()});
			} else if (this.type == "addVal") {
				this.unhighlightCode();
				$("#"+this.code).css("background-color", highlight);
				shapes[this.variable].attr("fill", domains[this.variable][this.value].attr("fill"));
				this.stack.Update({"var": this.variable, "value": clr, "assn": this.assn.toString()});
			} else if (this.type == "remVal") {
				this.unhighlightCode();
				$("#"+this.code).css("background-color", highlight);
				shapes[this.variable].attr("fill", none);
				frontPurgeValues(animationPurge);
				this.stack.Update({"var": this.variable, "value": clr, "assn": this.assn.toString()});
			} else if (this.type == "aStack") {
				this.unhighlightCode();
				$("#"+this.code).css("background-color", highlight);
				frontPurgeVariable();
				this.stack.Draw();
			} else if (this.type == "rStack") {
				this.unhighlightCode();
				$("#"+this.code).css("background-color", highlight);
				this.stack.Remove();
			}
		}
		this.unhighlightCode = function () {
			for (var i = 0; i < 10; i++) {
				$("#code"+i).css("background-color", none);
			}
		}
	}
	
	//the actual search code
	var animations = [];
    function runSearch(a) {
		var stack = new Stack("BACKTRACKING", {"var": "null", "value": "null", "assn": a.toString()}, stackPaper, "code1");
		var currentAssn = a
		animations.push(new Animation("aStack", "code1", null, null, stack, currentAssn));
		if (isComplete(currentAssn)) {
			animations.push(new Animation("rStack", "code2", null, null, stack, currentAssn));
			return true; 
		}
		var currentVar = backSelectVariable(currentAssn);
		animations.push(new Animation("sVar", "code3", currentVar, null, stack, currentAssn));
		for (var i = 0; i < 4; i++) {
			var currentVal = backSelectValue(currentVar, i);
			animations.push(new Animation("sVal", "code4", currentVar, i, stack, currentAssn));
			var newA = isConsistent(currentVar, currentVal, currentAssn);
			animations.push(new Animation("code", "code5", currentVar, i, stack, currentAssn));
			if (newA != null) {
				animations.push(new Animation("addVal", "code6", currentVar, i, stack, newA));
				animations.push(new Animation("code", "code7", currentVar, i, stack, newA));
				var x = runSearch(newA);
				animations.push(new Animation("code", "code8", currentVar, i, stack, newA));
				if (x) { 
					animations.push(new Animation("rStack", "code9", currentVar, i, stack, newA));
					return true; 
				}
				animations.push(new Animation("remVal", "code10", currentVar, i, stack, currentAssn));
			}
		}
		animations.push(new Animation("rStack", "code11", currentVar, null, stack, currentAssn));
		return false;
	}
	runSearch(tempAhh);
	animations[0].showAnimation();
	count = 1;
	function nextAnimation() {
		animations[count].showAnimation();
		if (count < animations.length) { count++; }
	}
	next = nextAnimation;
});
