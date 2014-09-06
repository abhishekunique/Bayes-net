var bad = {'border' : '2px solid red', 'border-radius' : '10px', 'background-color' : '#fdd'};
var good = {'border' : '2px solid green', 'border-radius':'10px', 'background-color': '#fff'};
var none = {'border' : '2px solid white', 'border-radius': '10px', 'background-color': '#fff'};

function disable1_1() {
	x = "answers_0_0_";
	for (var i = 0; i < 6; i++) { document.getElementById(x+i).disabled =  true; }
	document.getElementById("b1_1").disabled = true;
}
function disable1_2() {
	x = "answers_0_1_";
	for (var i = 1; i < 29; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_2").disabled = true;
	document.getElementById("reset1_2").disabled = true;
}
function disable1_3_1() {
	x = "answers_0_2_0_";
	for (var i = 0; i < 4; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_3_1").disabled = true;
}
function disable1_3_2_v1() {
	x = "answers_0_2_";
	for (var i = 1; i < 29; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_3_2_v1").disabled = true;
	document.getElementById("reset1_3_2_v1").disabled = true;
}
function disable1_3_2_v2() {
	x = "answers_0_2_";
	for (var i = 29; i < 57; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_3_2_v2").disabled = true;
	document.getElementById("reset1_3_2_v2").disabled = true;
}
function disable1_3_2_v3() {
	x = "answers_0_2_";
	for (var i = 57; i < 85; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_3_2_v3").disabled = true;
	document.getElementById("reset1_3_2_v3").disabled = true;
}
function disable1_3_2_v4() {
	x = "answers_0_2_";
	for (var i = 85; i < 113; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_3_2_v4").disabled = true;
	document.getElementById("reset1_3_2_v4").disabled = true;
}
function disable1_3_2() {
	x = "answers_0_2_";
	for (var i = 1; i < 113; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_3_2_v1").disabled = true;
	document.getElementById("b1_3_2_v2").disabled = true;
    document.getElementById("b1_3_2_v3").disabled = true;
	document.getElementById("b1_3_2_v4").disabled = true;
	document.getElementById("reset1_3_2_v1").disabled = true;
	document.getElementById("reset1_3_2_v2").disabled = true;
	document.getElementById("reset1_3_2_v3").disabled = true;
	document.getElementById("reset1_3_2_v4").disabled = true;
}
function disable1_3_3() {
	x = "answers_0_2_2_";
	for (var i = 0; i < 12; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_3_3").disabled = true;
}
function disable1_4_1() {
	x = "answers_0_3_0_";
	for (var i = 0; i < 4; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_4_1").disabled = true;
}
function disable1_4_2_v1() {
	x = "answers_0_3_";
	for (var i = 1; i < 29; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_4_2_v1").disabled = true;
	document.getElementById("reset1_4_2_v1").disabled = true;
}
function disable1_4_2_v2() {
	x = "answers_0_3_";
	for (var i = 29; i < 57; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_4_2_v2").disabled = true;
	document.getElementById("reset1_4_2_v2").disabled = true;
}
function disable1_4_2() {
	x = "answers_0_3_";
	for (var i = 1; i < 57; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_4_2_v1").disabled = true;
	document.getElementById("b1_4_2_v2").disabled = true;
	document.getElementById("reset1_4_2_v1").disabled = true;
	document.getElementById("reset1_4_2_v2").disabled = true;
}
function disable1_5_0() {
	x = "answers_0_4_-1_";
	for (var i = 0; i < 12; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_5_0").disabled = true;
}
function disable1_5_1() {
	x = "answers_0_4_0_";
	for (var i = 0; i < 4; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_5_2").disabled = true;
}
function disable1_5_2() {
	x = "answers_0_4_";
	for (var i = 1; i < 29; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_5_3").disabled = true;
	document.getElementById("reset1_5_3").disabled = true;
}
function disable1_5_3() {
	x = "answers_0_4_2_";
	for (var i = 0; i < 4; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_5_4").disabled = true;
}
function disable1_5_4() {
	x = "answers_0_5_";
	for (var i = 1; i < 29; i++) { document.getElementById(x+i).disabled = true; }
	document.getElementById("b1_5_5").disabled = true;
	document.getElementById("reset1_5_5").disabled = true;
}
function disableAll() {
	disable1_1();
	disable1_2();
	disable1_3_1();
	disable1_3_2(); 
    disable1_3_3();
    disable1_4_1();
	disable1_4_2();
	disable1_5_0();
	disable1_5_1();
	disable1_5_2();
	disable1_5_3();
	disable1_5_4();
}

function enable1_1() {
	x = "answers_0_0_";
	for (var i = 0; i < 6; i++) { document.getElementById(x+i).disabled =  false; }
	document.getElementById("b1_1").disabled = false;
	$("#a1_1").css(none);
	$("#response1_1").text("");
}
function enable1_2() {
	x = "answers_0_1_";
	for (var i = 1; i < 29; i++) { 
		document.getElementById(x+i).checked = true;
		document.getElementById(x+i).disabled = false; 
	}
	document.getElementById("b1_2").disabled = false;
	document.getElementById("reset1_2").disabled = false;
	$("#a1_2").css(none);
	$("#response1_2").text("");
}
function enable1_3_1() {
	x = "answers_0_2_0_";
	for (var i = 0; i < 4; i++) { document.getElementById(x+i).disabled = false; }
	document.getElementById("b1_3_1").disabled = false;
	$("#a1_3_1").css(none);
	$("#response1_3_1").text("");

}
//1.3.2
function enable1_3_2_all() { 
	for (var i = 1; i < 113; i++) { document.getElementById(x+i).disabled = false; }
}
function enable1_3_2_v1() {
	x = "answers_0_2_";	
	var i;
	for (var k = 1; k < 29; k++) { document.getElementById(x+k).checked = false; } 
	var p = [1, 2, 3, 4, 13, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
	for (i in p) { document.getElementById(x+p[i]).checked = true;	}
	$("#132v1").text("B787: L1");
	document.getElementById("b1_3_2_v1").disabled = false;
	document.getElementById("reset1_3_2_v1").disabled = false;
	$("#a1_3_2_v1").css(none);
	$("#response1_3_2_v1").text("");
}
function enable1_3_2_v2() {
	x = "answers_0_2_";
	for (var k = 29; k < 57; k++) { document.getElementById(x+k).checked = false; } 
	var p = [29, 30, 31, 32, 42, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56];
	for (i in p) { document.getElementById(x+p[i]).checked = true; }
	$("#132v2").text("B787: L2");
	document.getElementById("b1_3_2_v2").disabled = false;
	document.getElementById("reset1_3_2_v2").disabled = false;
	$("#a1_3_2_v2").css(none);
	$("#response1_3_2_v2").text("");
}
function enable1_3_2_v3() {
	x = "answers_0_2_";	
	for (var k = 57; k < 85; k++) { document.getElementById(x+k).checked = false; } 
	var p = [57, 58, 59, 60, 71, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84];
	for (i in p) { document.getElementById(x+p[i]).checked = true; }
	$("#132v3").text("B787: L3");
	document.getElementById("b1_3_2_v3").disabled = false;
	document.getElementById("reset1_3_2_v3").disabled = false;
	$("#a1_3_2_v3").css(none);
	$("#response1_3_2_v3").text("");
}
function enable1_3_2_v4() {
	x = "answers_0_2_";
	for (var k = 85; k < 113; k++) { document.getElementById(x+k).checked = false; } 
	var p = [85, 86, 87, 88, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112];
	for (i in p) { document.getElementById(x+p[i]).checked = true; }
	$("#132v4").text("B787: L4");
	document.getElementById("b1_3_2_v4").disabled = false;
	document.getElementById("reset1_3_2_v4").disabled = false;
	$("#a1_3_2_v4").css(none);
	$("#response1_3_2_v4").text("");
}
//1.3.3
function enable1_3_3() {
	x = "answers_0_2_2_";
	for (var i = 0; i < 12; i++) { document.getElementById(x+i).disabled = false; }
	document.getElementById("b1_3_3").disabled = false;
	$("#a1_3_3").css(none);
	$("#response1_3_3").text("");
}
function enable1_4_1() {
	x = "answers_0_3_0_";
	for (var i = 0; i < 4; i++) { document.getElementById(x+i).disabled = false; }
	document.getElementById("b1_4_1").disabled = false;
	$("#a1_4_1").css(none);
	$("#response1_4_1").text("");
}
function enable1_4_2_v1() { 
	x = "answers_0_3_";	
	for (var i = 1; i < 29; i++) { document.getElementById(x+i).checked = false; }
	var p = [3, 13, 19, 20, 23, 24, 26, 27, 28];
	for (var i in p) { document.getElementById(x+p[i]).checked = true;	}
	$("#142v1").text("AF1: R3");
	for (var i = 1; i < 29; i++) { document.getElementById(x+i).disabled = false; }
	document.getElementById("b1_4_2_v1").disabled = false;
	document.getElementById("reset1_4_2_v1").disabled = false;
	$("#a1_4_2_v1").css(none);
	$("#response1_4_2_v1").text("");
}
function enable1_4_2_v2() {
	x = "answers_0_3_";	
	for (var i = 29; i < 57; i++) { document.getElementById(x+i).checked = false; }
	var p = [32, 41, 47, 48, 51, 52, 54, 55, 56];
	for (i in p) { document.getElementById(x+p[i]).checked = true; }
    $("#142v2").text("AF1: R4");
	for (var i = 29; i < 57; i++) { document.getElementById(x+i).disabled = false; }
	document.getElementById("b1_4_2_v2").disabled = false;
	document.getElementById("reset1_4_2_v2").disabled = false;
	$("#a1_4_2_v2").css(none);
	$("#response1_4_2_v2").text("");
}
function enable1_5_0() {
	x = "answers_0_4_-1_";
	for (var i = 0; i < 12; i++) { document.getElementById(x+i).disabled = false; }
	document.getElementById("b1_5_0").disabled = false;
	$("#a1_5_1").css(none);
	$("#response1_5_0").text("");
}
function enable1_5_1() {
	x = "answers_0_4_0_";
	for (var i = 0; i < 4; i++) { document.getElementById(x+i).disabled = false; }
	document.getElementById("b1_5_2").disabled = false;
	$("#a1_5_2").css(none);
	$("#response1_5_2").text("");
}
function enable1_5_2() {
	x = "answers_0_4_";
	for (var i = 1; i < 29; i++) { document.getElementById(x+i).checked = false; }
	var p = [4, 14, 17, 20, 21, 24, 27, 28];
	for (var i in p) { document.getElementById(x+p[i]).checked = true; }
	for (var i = 1; i < 29; i++) { document.getElementById(x+i).disabled = false; }
	$("#152v1").text("AF1: R4");
	document.getElementById("b1_5_3").disabled = false;
	document.getElementById("reset1_5_3").disabled = false;
	$("#a1_5_3").css(none);
	$("#response1_5_3").text("");
}
function enable1_5_3() { 
	x = "answers_0_4_2_";
	for (var i = 0; i < 4; i++) { document.getElementById(x+i).disabled = false; }
	document.getElementById("b1_5_4").disabled = false;
	$("#a1_5_4").css(none);
	$("#response1_5_4").text("");
}
function enable1_5_4() {
	x = "answers_0_5_";
	for (var i = 1; i < 29; i++) { document.getElementById(x+i).checked = false; }
	var p = [4, 14, 17, 21, 27];
	for (var i in p) { document.getElementById(x+p[i]).checked = true; }
	for (var i = 1; i < 29; i++) { document.getElementById(x+i).disabled = false; }
	$("#154v1").text("BA: 3");
	document.getElementById("b1_5_5").disabled = false;
	document.getElementById("reset1_5_5").disabled = false;
	$("#a1_5_5").css(none);
	$("#response1_5_5").text("");
}
function check1_1() {
	x = "answers_0_0_";
	if ( document.getElementById(x+0).checked && !document.getElementById(x+1).checked &&
		 !document.getElementById(x+2).checked && document.getElementById(x+3).checked &&
		 !document.getElementById(x+4).checked && !document.getElementById(x+5).checked) {
			disableAll();
			$("#a1_1").css(good);
			$("#response1_1").text("Correct!");
			$("#response1_1").css("color", "green");
			enable1_2();
	} else { 
		$("#a1_1").css(bad);
		$("#response1_1").text("Try Again.");
		$("#response1_1").css("color", "red");
	}
}
function check1_2() {
	x = "answers_0_1_";
	var p = [1, 2, 3, 4, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
	for (var i = 1; i < 29; i++) {
		if (p.indexOf(i) >= 0) {
				if (!document.getElementById(x+i).checked) { 
						$("#a1_2").css(bad);
						$("#response1_2").text("Try Again.");
						$("#response1_2").css("color", "red");
						return; 
				}
		} else {
				if (document.getElementById(x+i).checked) { 
						$("#a1_2").css(bad);
						$("#response1_2").text("Try Again.");
						$("#response1_2").css("color", "red");
						return; 
				}
		}
	}
	disableAll();
	$("#a1_2").css(good);
	$("#response1_2").text("Correct!");
	$("#response1_2").css("color", "green");
	enable1_3_1();
}
function check1_3_1() {
	x = "answers_0_2_0_";
	y = "a_0_2_0_";
	if (document.getElementById("answers_0_2_0_1").checked) {
			disableAll();
			$("#a1_3_1").css(good);
			$("#response1_3_1").text("Correct!");
			$("#response1_3_1").css("color", "green");
			enable1_3_2_v1();
			enable1_3_2_v2();
			enable1_3_2_v3();
			enable1_3_2_v4();
			enable1_3_2_all();
			return;
	}
	$("#response1_3_1").text("Try Again.");
	$("#response1_3_1").css("color", "red");
	$("#a1_3_1").css(bad);
}
v1flag132 = false;
v2flag132 = false;
v3flag132 = false;
v4flag132 = false;
function check1_3_2_v1() {
	x = "answers_0_2_";
	p = [3, 4, 13, 19, 20, 23, 24, 26, 27, 28];
	for (var i = 1; i < 29; i++) {
		if (p.indexOf(i) >= 0) {
			if (!document.getElementById(x+i).checked ) {
				$("#a1_3_2_v1").css(bad);
				$("#response1_3_2_v1").text("Try Again.");
				$("#response1_3_2_v1").css("color", "red");
				return;
			}
		} else {
			if (document.getElementById(x+i).checked) {
				$("#a1_3_2_v1").css(bad);
				$("#response1_3_2_v1").text("Try Again.");
				$("#response1_3_2_v1").css("color", "red");
				return;
			}
		}
	}
	disable1_3_2_v1()
	$("#a1_3_2_v1").css(good);
	$("#response1_3_2_v1").text("Correct");
	$("#response1_3_2_v1").css("color", "green");
	v1flag132 = true;
	if (v1flag132 && v2flag132 && v3flag132 && v4flag132) { enable1_3_3(); }
}
function check1_3_2_v2() {
    x = "answers_0_2_";
	p = [32, 42, 45, 48, 49, 52, 55, 56];
	for (var i = 29; i < 57; i++) {
		if (p.indexOf(i) >= 0) {
			if (!document.getElementById(x+i).checked ) {
				$("#a1_3_2_v2").css(bad);
				$("#response1_3_2_v2").text("Try Again.");
				$("#response1_3_2_v2").css("color", "red");
				return;
			}
		} else {
			if (document.getElementById(x+i).checked) {
				$("#a1_3_2_v2").css(bad);
				$("#response1_3_2_v2").text("Try Again.");
				$("#response1_3_2_v2").css("color", "red");
				return;
			}
		}
	}
	disable1_3_2_v2()
	$("#a1_3_2_v2").css(good);
	$("#response1_3_2_v2").text("Correct!");
	$("#response1_3_2_v2").css("color", "green");
	v2flag132 = true;
	if (v1flag132 && v2flag132 && v3flag132 && v4flag132) { enable1_3_3(); }
}
function check1_3_2_v3() {
    x = "answers_0_2_";
	p = [57, 71, 73, 74, 77, 78, 84];
	for (var i = 57; i < 85; i++) {
		if (p.indexOf(i) >= 0) {
			if (!document.getElementById(x+i).checked ) {
				$("#a1_3_2_v3").css(bad);
				$("#response1_3_2_v3").text("Try Again.");
				$("#response1_3_2_v3").css("color", "red");
				return;
			}
		} else {
			if (document.getElementById(x+i).checked) {
				$("#a1_3_2_v3").css(bad);
				$("#response1_3_2_v3").text("Try Again.");
				$("#response1_3_2_v3").css("color", "red");
				return;
			}
		}
	}
	disable1_3_2_v3()
	$("#a1_3_2_v3").css(good);
	$("#response1_3_2_v3").text("Correct!");
	$("#response1_3_2_v3").css("color", "green");
	v3flag132 = true;
	if (v1flag132 && v2flag132 && v3flag132 && v4flag132) { enable1_3_3(); }
}
function check1_3_2_v4() {
    x = "answers_0_2_";
	p = [85, 86, 100, 101, 102, 103, 105, 106, 107];
	for (var i = 85; i < 113; i++) {
		if (p.indexOf(i) >= 0) {
			if (!document.getElementById(x+i).checked ) {
				$("#a1_3_2_v4").css(bad);
				$("#response1_3_2_v4").text("Try Again.");
				$("#response1_3_2_v4").css("color", "red");
				return;
			}
		} else {
			if (document.getElementById(x+i).checked) {
				$("#a1_3_2_v4").css(bad);
				$("#response1_3_2_v4").text("Try Again.");
				$("#response1_3_2_v4").css("color", "red");
				return;
			}
		}
	}
	disable1_3_2_v4()
	$("#a1_3_2_v4").css(good);
	$("#response1_3_2_v4").text("Correct!");
	$("#response1_3_2_v4").css("color", "green");
	v4flag132 = true;
	if (v1flag132 && v2flag132 && v3flag132 && v4flag132) { enable1_3_3(); }
}
function check1_3_3() {
		if (document.getElementById("answers_0_2_2_4").checked) {
				disableAll();
				$("#a1_3_3").css(good);
				$("#response1_3_3").text("Correct!");
				$("#response1_3_3").css("color", "green");
				enable1_4_1();
				return;
		}
		$("#a1_3_3").css(bad);
		$("#response1_3_3").text("Try Again");
		$("#response1_3_3").css("color", "red");
}
function check1_4_1() {
		if (document.getElementById("answers_0_3_0_0").checked) {
				disableAll();
				$("#a1_4_1").css(good);
				$("#response1_4_1").text("Correct!");
				$("#response1_4_1").css("color", "green");
				enable1_4_2_v1();
				enable1_4_2_v2();
				return;
		}
		$("#a1_4_1").css(bad);
		$("#response1_4_1").text("Try Again.");
		$("#response1_4_1").css("color", "red");
}
v1flag142 = false;
v2flag142 = false;
function check1_4_2_v1() {
		x = "answers_0_3_";
		p = [3, 13, 26, 28];
		for (var i = 1; i < 29; i++) {
				if (p.indexOf(i) >= 0) {
						if (!document.getElementById(x+i).checked) { 
								$("#a1_4_2_v1").css(bad);
								$("#response1_4_2_v1").text("Try Again.");
								$("#response1_4_2_v1").css("color", "red");
								return; 
						}
				} else {
						if (document.getElementById(x+i).checked) { 
								$("#a1_4_2_v1").css(bad);
								$("#response1_4_2_v1").text("Try Again.");
								$("#response1_4_2_v1").css("color", "red");
								return; 
						}	
				}
		}
		disable1_4_2_v1();
		v1flag142 = true;
		$("#a1_4_2_v1").css(good);
		$("#response1_4_2_v1").text("Correct!");
		$("#response1_4_2_v1").css("color", "green");
		if (v1flag142 && v2flag142) { enable1_5_0(); }
}
function check1_4_2_v2() {
		x = "answers_0_3_";
		p = [32, 41, 54, 55];
		for (var i = 29; i < 57; i++) {
				if (p.indexOf(i) >= 0) {
						if (!document.getElementById(x+i).checked) { 
								$("#a1_4_2_v2").css(bad);
								$("#response1_4_2_v2").text("Try Again.");
								$("#response1_4_2_v2").css("color", "red");
								return; 
						}
				} else {
						if (document.getElementById(x+i).checked) { 
								$("#a1_4_2_v2").css(bad);
								$("#response1_4_2_v2").text("Try Again.");
								$("#response1_4_2_v2").css("color", "red");
								return; 
						}	
				}
		}
		disable1_4_2_v2();
		v2flag142 = true;
		$("#a1_4_2_v2").css(good);
		$("#response1_4_2_v2").text("Correct!");
		$("#response1_4_2_v2").css("color", "green");
		if (v1flag142 && v2flag142) { enable1_5_0(); }
}

function check1_5_0() {
		if (document.getElementById("answers_0_4_-1_5").checked) {
				disableAll();
				$("#a1_5_1").css(good);
				$("#response1_5_0").text("Correct!");
				$("#response1_5_0").css("color", "green");
				enable1_5_1();
				return;
		}
		$("#a1_5_1").css(bad);
		$("#response1_5_0").text("Try Again.");
		$("#response1_5_0").css("color", "red");
}
function check1_5_1() {
		if (document.getElementById("answers_0_4_0_0").checked) {
				disableAll();
				$("#a1_5_2").css(good);
				$("#response1_5_2").text("Correct!");
				$("#response1_5_2").css("color", "green");
				enable1_5_2();
				return;
		}
		$("#a1_5_2").css(bad);
		$("#response1_5_2").text("Try Again");
		$("#response1_5_2").css("color", "red");
}
function check1_5_2() {
		var x = "answers_0_4_";
		var p = [4, 14, 17, 21, 27];
		for (var i = 1; i < 29; i++) {
			if (p.indexOf(i) >= 0) {
					if (!document.getElementById(x+i).checked) { i
							$("#a1_5_3").css(bad);
							$("#response1_5_3").text("Try Again.");
							$("#response1_5_3").css("color", "red");
							return; 
					}
			} else {
					if (document.getElementById(x+i).checked) { 
							$("#a1_5_3").css(bad);
							$("#response1_5_3").text("Try Again.");
							$("#response1_5_3").css("color", "red");
							return; 
					}
			}
		}
		disableAll();
		$("#a1_5_3").css(good);
		$("#response1_5_3").text("Correct!");
		$("#response1_5_3").css("color", "green");
		enable1_5_3();
}
function check1_5_3() {
		if (document.getElementById("answers_0_4_2_3").checked) {
				disableAll();
				$("#a1_5_4").css(good);
				$("#response1_5_4").text("Correct!");
				$("#response1_5_4").css("color", "green");
				enable1_5_4();
				return;
		}
		$("#a1_5_4").css(bad);
		$("#response1_5_4").text("Try Again.");
		$("#response1_5_4").css("color", "red");
}
function check1_5_4() {
		var x = "answers_0_5_";
		var p = [4, 14, 17, 21, 27];
		for (var i = 1; i < 29; i++) {
			if (p.indexOf(i) >= 0) {
					if (!document.getElementById(x+i).checked) { 
							$("#a1_5_5").css(bad);
							$("#response1_5_5").text("Try Again.");
							$("#response1_5_5").css("color", "red");
							return; 
					}
			} else {
					if (document.getElementById(x+i).checked) { 
							$("#a1_5_5").css(bad);
							$("#response1_5_5").text("Try Again.");
							$("#response1_5_5").css("color", "red");
							return; 
					}
			}
		}
		disableAll();
		$("#a1_5_5").css(good);
		$("#response1_5_5").text("Correct!");
		$("#response1_5_5").css("color", "green");
}

$(document).ready(function () {
  disableAll();
  enable1_1();
  $("#b1_1").click(check1_1);
  $("#b1_2").click(check1_2);
  $("#reset1_2").click(enable1_2);
  $("#b1_3_1").click(check1_3_1);
  $("#b1_3_2_v1").click(check1_3_2_v1);
  $("#b1_3_2_v2").click(check1_3_2_v2);
  $("#b1_3_2_v3").click(check1_3_2_v3);
  $("#b1_3_2_v4").click(check1_3_2_v4);
  $("#reset1_3_2_v1").click(enable1_3_2_v1);
  $("#reset1_3_2_v2").click(enable1_3_2_v2);
  $("#reset1_3_2_v3").click(enable1_3_2_v3);
  $("#reset1_3_2_v4").click(enable1_3_2_v4);
  $("#b1_3_3").click(check1_3_3);
  $("#b1_4_1").click(check1_4_1);
  $("#b1_4_2_v1").click(check1_4_2_v1);
  $("#reset1_4_2_v1").click(enable1_4_2_v1);
  $("#b1_4_2_v2").click(check1_4_2_v2);
  $("#reset1_4_2_v2").click(enable1_4_2_v2);
  $("#b1_5_0").click(check1_5_0);
  $("#b1_5_2").click(check1_5_1);
  $("#b1_5_3").click(check1_5_2);
  $("#reset1_5_3").click(enable1_5_2);
  $("#b1_5_4").click(check1_5_3);
  $("#b1_5_5").click(check1_5_4);
  $("#reset1_5_5").click(enable1_5_4);
});

