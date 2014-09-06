//the first stack object you create must pass in a paper argument, all others will use the same one
function Stack (fnName, variables, paper, code) {
	this.code = code;
	this.fnName = fnName;
	this.variables = variables;
	this.paper = paper;
	this.x = paper.width/2;
	this.y = this.lastY + 10;
	this.border = null;
	this.text = null;
	s = ""+this.fnName+"()\n";
		for (var v in this.variables) {
			s += v+": "+this.variables[v]+"\n";
		}
		s = s.slice(0, s.length-1);
	temp = this.paper.text(this.x, this.y, s);
	tempbb = temp.getBBox();
	tempB = this.paper.rect(tempbb.x-5, tempbb.y-5, tempbb.width+10, tempbb.height+10);
	Stack.prototype.lastY += tempB.attr("height")+4;
	temp.remove();
	tempB.remove();
	//Stack.prototype.allFrames.push(this);
	//for closure : )
	tempThis = this;
	this.setBorderHandler = function (x, border) {
		this.border.node.onclick = function () {
			for (var f = 0; f < tempThis.allFrames.length; f++) {
				$("#"+tempThis.allFrames[f].code).css("background-color", "#fff");
				if (tempThis.allFrames[f].border != null) {
					tempThis.allFrames[f].border.attr("stroke", "#000");
				}
			}
			lastFrame = tempThis.allFrames[tempThis.allFrames.length-1];
			lastFrame.border.attr("stroke", "#ff0");
			$("#"+lastFrame.code).css("background-color", "#ff0");
			$("#"+x).css("background-color", "#00ff00");
			border.attr("stroke", "#00ff00");
		}	
	}
	this.setTextHandler = function (x, border) {
		this.text.node.onclick = function () {
			for (var f = 0; f < tempThis.allFrames.length; f++) {
				$("#"+tempThis.allFrames[f].code).css("background-color", "fff");
				if (tempThis.allFrames[f].border != null) {
					tempThis.allFrames[f].border.attr("stroke", "#000");
				}
			}
			lastFrame = tempThis.allFrames[tempThis.allFrames.length-1];
			lastFrame.border.attr("stroke", "#ff0");
			$("#"+lastFrame.code).css("background-color", "#ff0");
			$("#"+x).css("background-color", "#00ff00");
			border.attr("stroke", "#00ff00");
		}
	}
	this.Draw = function () {
		Stack.prototype.allFrames.push(this);
		if (this.border != null) { this.border.remove(); }
		if (this.text != null) { this.text.remove(); }
		s = ""+this.fnName+"()\n";
		for (var v in this.variables) {
			s += v+": "+this.variables[v]+"\n";
		}
		s = s.slice(0, s.length-1);
		this.text = this.paper.text(this.x, this.y, s);
		bb = this.text.getBBox();
		this.border = this.paper.rect(bb.x-5, bb.y-5, bb.width+10, bb.height+10, 2);
		this.setBorderHandler(this.code, this.border);
		this.setTextHandler(this.code, this.border);
		for (var f = 0; f < this.allFrames.length; f++) {
			if (this.allFrames[f].border != null) {
				this.allFrames[f].border.attr("stroke", "#000");
				this.allFrames[f].border.attr("stroke-width", 3);
			}
		}
		this.border.attr("stroke", "#ff0");
	}
	this.Update = function(vrbls) {
		/*
		//new stuff
		Stack.prototype.allFrames.pop();
		if (this.border != null) { this.border.remove(); }
		//end new stuff
		*/
		this.variables = vrbls;
		if (this.text != null) { this.text.remove(); }
		s = ""+this.fnName+"()\n";
		for (var v in this.variables) {
			s += v+": "+this.variables[v]+"\n";
		}
		s = s.slice(0, s.length-1);
		this.text = this.paper.text(this.x, this.y, s);
		this.setTextHandler(this.code, this.border);
		for (var f = 0; f < this.allFrames.length; f++) {
			if (this.allFrames[f].border != null) {
				this.allFrames[f].border.attr("stroke", "#000");
			}
		}
		this.border.attr("stroke", "#ff0");
	}
	this.Remove = function () {
		this.border.remove();
		this.text.remove();
	}

}
Stack.prototype.lastY = 20;
Stack.prototype.allFrames = [];
