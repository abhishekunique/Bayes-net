var randomDrawInitial;

var iteration;

var gtimeStep;

var numParticles = 15;

var intervalID;

var imageWidth = 600;

var imageHeight = 400;

var imageOffsetX = 0;

var imageOffsetY = 0;

var radius = imageWidth / 54;

var random_3_4;

var counter3_1 = 0;

var evidenceLetter;

var part_object_array;

var colorArray = new Array("red", "lightBlue", "yellow", "greenYellow", "red", "lightBlue", "yellow", "greenYellow", "red", "lightBlue", "yellow", "greenYellow", "red", "lightBlue", "yellow", "greenYellow");

var questionDelay = {};

var correctDebug = false;

var timerDebug = true;

var questionDone = {};

function LockQuestion(scrapeText1, scrapeText2, LowLimit, HighLimit, disabledFlag) {

	for( tempLow = LowLimit; tempLow < HighLimit + 1; tempLow++) {

		c = document.getElementById(scrapeText1 + tempLow + scrapeText2);

		c.disabled = disabledFlag;
	}

}

function getDelay(qIndex) {

	var questionObject = questionDelay[qIndex];

	if(questionObject.delay == null) {

		questionObject.delay = 1;

		return 1;

	} else {

		questionObject.delay = questionObject.delay * 2;

		return questionObject.delay;
	}

}

function drawTimer(qIndex) {

	var questionObject = questionDelay[qIndex];

	var parId = "timer_Q_" + qIndex;

	if(questionObject.currentTime == -1) {

		document.getElementById(parId).textContent = "";

		clearInterval(questionObject.idToStop);

		LockQuestion('Q_3_1_', '_I', 1, 5, false);

	} else {

		document.getElementById(parId).textContent = questionObject.currentTime;

		questionObject.currentTime = questionObject.currentTime - 1;

	}

}

function initialParticleUnFocus(index) {

	var scrapeText = "Q_3_1_" + index + "_I";

	var fromBox = parseFloat(document.getElementById(scrapeText).value);

	if(isNaN(fromBox)) {

		return;

	}

	if(fromBox < 1 || fromBox > 22 || !isInt(fromBox)) {
		document.getElementById(scrapeText).parentNode.style.backgroundColor = "red";

		return;

	}

	part_object_array[index - 1].guessFirstLocation = fromBox;

	part_object_array[index - 1].xLocations[0] = getCanvasLocationX(fromBox);

	part_object_array[index - 1].yLocations[0] = getCanvasLocationY(fromBox);

	generateXYPairsWrapper("guessFirstLocation", 0);

	var canvas = document.getElementById("myCanvas");

	var context = canvas.getContext("2d");

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.globalAlpha = 1;
	var img3 = new Image();

	img3.src = "http://csparticlefiltering.phpfogapp.com/newMap.png";

	context.drawImage(img3, imageOffsetX, imageOffsetX, imageWidth, imageHeight);

	var count = 0;

	if(part_object_array[index - 1].firstLocation == fromBox) {

		document.getElementById(scrapeText).parentNode.style.backgroundColor = "lime";

		document.getElementById(scrapeText).disabled = true;

	} else {

		document.getElementById(scrapeText).parentNode.style.backgroundColor = "red";

		if(!timerDebug) {

			LockQuestion("Q_3_1_", "_I", 1, 5, true);

			var TimeOutTime = getDelay(1);

			questionDelay[1].currentTime = TimeOutTime;

			questionDelay[1].idToStop = self.setInterval("drawTimer(1)", 1000);

			drawTimer(1);

		}

	}
	for( i = 0; i < 5; i++) {

		if(part_object_array[i].xLocations.length > 0) {

			fancyDrawParticles2(part_object_array[i], canvas, 0, (i + 1));

			if(!correctDebug) {

				if(part_object_array[i].guessFirstLocation == part_object_array[i].firstLocation) {
					count++;
				}
			} else {

				count++;

			}

		}

	}

	if(count == 5) {

		for( i = 0; i < 10; i++) {

			var t = setTimeout("alertMsg()", (i + 1) * 1000 * .1);
		}
	}

}

function isInt(n) {
	return typeof n === 'number' && parseFloat(n) == parseInt(n) && !isNaN(n);
}

function timeStepParticleUnFocus(index) {

	var tempString = "Q_3_2_" + index + "_I";

	var newValue = parseFloat(document.getElementById(tempString).value);

	if(isNaN(newValue)) {

		return;

	}

	if(newValue < 1 || newValue > 22 || !isInt(newValue)) {
		document.getElementById(scrapeText).parentNode.style.backgroundColor = "red";

		return;

	}

	part_object_array[index - 1].guessSecondLocation = newValue;

	part_object_array[index - 1].xLocations[1] = getCanvasLocationX(newValue);

	part_object_array[index - 1].yLocations[1] = getCanvasLocationY(newValue);

	generateXYPairsWrapper("guessSecondLocation", 1);

	if(part_object_array[index - 1].secondLocation == newValue) {

		document.getElementById(tempString).parentNode.style.backgroundColor = "lime";

		document.getElementById(tempString).disabled = true;

	} else {

		document.getElementById(tempString).parentNode.style.backgroundColor = "red";
	}

	var can = document.getElementById("myCanvasTimeStep1");
	var temp_context = can.getContext("2d");

	temp_context.clearRect(0, 0, can.width, can.height);
	temp_context.globalAlpha = 1;
	var img3 = new Image();

	img3.src = "http://csparticlefiltering.phpfogapp.com/newMap.png";
	temp_context.drawImage(img3, imageOffsetX, imageOffsetX, 450, 300);

	var count = 0;

	for( i = 0; i < 5; i++) {

		var particle = part_object_array[i];

		temp_context.globalAlpha = 0.5

		temp_context.lineWidth = 1;
		temp_context.strokeStyle = "black";
		temp_context.font = "10pt sans-serif";
		yTextOffset = 3;
		xTextOffset = 5;

		if(particle.guessSecondLocation != null) {
			temp_context.globalAlpha = 1;

			if(!correctDebug) {

				if(particle.guessSecondLocation == particle.secondLocation) {

					count = count + 1;

				}

			} else {

				count = count + 1;
			}
			var tempX = particle.xDrawLocation[1] / 1.34;

			var tempY = particle.yDrawLocation[1] / 1.34;
			temp_context.fillStyle = "#AAAAAA";
			temp_context.beginPath();
			temp_context.arc(tempX, tempY, radius / 1.34, 0, 2 * Math.PI, false);
			temp_context.fill();
			temp_context.stroke();
			temp_context.fillStyle = "black";
			temp_context.fillText("" + (i + 1), tempX - xTextOffset, tempY + yTextOffset);
		}

	}

	if(count == 5) {

		for( i = 0; i < 10; i++) {

			var t = setTimeout("restOfTimeStep()", (i + 1) * 300);
		}
	}
}

function restOfTimeStep() {

	if(questionDone.Q33 == true) {

		return;

	}

	var updateText = 0;

	for( i = 0; i < numParticles; i++) {

		if(part_object_array[i].guessSecondLocation == null) {

			part_object_array[i].guessSecondLocation = part_object_array[i].secondLocation;

			part_object_array[i].xLocations[1] = getCanvasLocationX(part_object_array[i].guessSecondLocation);

			part_object_array[i].yLocations[1] = getCanvasLocationY(part_object_array[i].guessSecondLocation);

			updateText = i + 1;
			break;
		}

	}

	if(updateText == 0) {

		return;

	}

	var tempText = part_object_array[updateText - 1].randomDrawTimeStep + "";

	if(tempText.length > 4) {

		tempText = tempText.substring(0, 4);

	}

	document.getElementById("Q_3_2_" + updateText + "_O").textContent = part_object_array[updateText - 1].firstLocation;

	document.getElementById("Q_3_2_" + updateText + "_R").textContent = tempText;

	document.getElementById("Q_3_2_" + updateText + "_I").textContent = part_object_array[updateText - 1].secondLocation;

	generateXYPairsWrapper("guessSecondLocation", 1);

	///// Draw Model

	if(updateText < 6) {

		var aCanvas = document.getElementById("Q_3_2_" + updateText + "_C");

		var aContext = aCanvas.getContext("2d");

		var tempArr = part_object_array[updateText - 1].timeStepModel;

		var tempWidth = aCanvas.width / (tempArr.length);

		for( i = 0; i < tempArr.length; i++) {

			aContext.fillStyle = colorArray[i];

			aContext.fillRect(i * tempWidth, 0, (i + 1) * tempWidth, 10);

			aContext.fillStyle = "black";

			aContext.fillText("" + tempArr[i], ((i + 1) * tempWidth) - (1 * tempWidth * .75), 8);

			if(i != 0) {

				tempText = "" + i + "/" + tempArr.length;

				aContext.fillText(tempText, i * tempWidth - 8, 20);
			}

		}
		aContext.fillText("0", 0, 20);

		aContext.fillText("1", aCanvas.width - 8, 20);
	}
	if(updateText == 15) {

		maybe2(1, false, false);

		maybe2(1, false, true);

		LockQuestion("Q_3_4_", "", 1, 5, false);

		crazyAnimation();

		questionDone.Q33 = true;

	}
}

function calculateSquareProbability() {

	var tempArray = new Array(23);

	for( i = 0; i < 23; i++) {
		tempArray[i] = 0;

	}

	for( i = 0; i < numParticles; i++) {

		var partSquareLocation = part_object_array[i].secondLocation;

		tempArray[partSquareLocation] = tempArray[partSquareLocation] + 1;

	}

	part_object_array[0].allSquareProb = tempArray;
	part_object_array[0].guessAllSquareProb = [];

}

function drawOnCanvas2() {

	var theCanvas = document.getElementById("myCanvas2");

	var temp_context = theCanvas.getContext("2d");

	temp_context.strokeStyle = "black";
	temp_context.font = "8pt sans-serif";
	yTextOffset = 3;
	xTextOffset = 5;

	for( i = 0; i < numParticles; i++) {

		var particle = part_object_array[i];

		var tempX = particle.xDrawLocation[0] / 1.34;

		var tempY = particle.yDrawLocation[0] / 1.34;

		temp_context.fillStyle = "#AAAAAA";
		temp_context.beginPath();
		temp_context.arc(tempX, tempY, radius / 1.34, 0, 2 * Math.PI, false);
		temp_context.fill();
		temp_context.stroke();
		temp_context.fillStyle = "black";
		temp_context.fillText("" + (i + 1), tempX - xTextOffset, tempY + yTextOffset);

	}

}

function prepForTimeStep() {

	LockQuestion("Q_3_2_", "_I", 1, 5, false);

	drawOnCanvas2();

	for( i = 0; i < 5; i++) {

		var tempBox = document.getElementById("Q_3_2_" + (i + 1) + "_R");

		var newValue = part_object_array[i].randomDrawTimeStep;

		newValue = newValue + "";

		if(newValue.length > 8) {

			newValue = newValue.substring(0, 6);

		}

		tempBox.textContent = newValue;

		tempBox = document.getElementById("Q_3_2_" + (i + 1) + "_O");

		newValue = part_object_array[i].firstLocation;

		newValue = newValue + "";

		if(newValue.length > 8) {

			newValue = newValue.substring(0, 8);

		}

		tempBox.textContent = newValue;

	}

	for( j = 0; j < 5; j++) {

		var aCanvas = document.getElementById("Q_3_2_" + (j + 1) + "_C");

		var aContext = aCanvas.getContext("2d");

		var tempArr = part_object_array[j].timeStepModel;

		var tempWidth = aCanvas.width / (tempArr.length);
		for( i = 0; i < tempArr.length; i++) {

			aContext.fillStyle = colorArray[i];

			aContext.fillRect(i * tempWidth, 0, (i + 1) * tempWidth, 10);

			aContext.fillStyle = "black";

			aContext.fillText("" + tempArr[i], ((i + 1) * tempWidth) - (1 * tempWidth * .75), 8);

			if(i != 0) {

				tempText = "" + i + "/" + tempArr.length;

				aContext.fillText(tempText, i * tempWidth - 8, 20);
			}

		}
		aContext.fillText("0", 0, 20);

		aContext.fillText("1", aCanvas.width - 8, 20);
	}

}

function generateXYPairsWrapper(text, index) {

	var guessArr = new Array(23);

	for( stepCounter = 0; stepCounter < 23; stepCounter++) {

		guessArr[stepCounter] = [];

	}

	for( stepCounter = 0; stepCounter < numParticles; stepCounter++) {

		var tempGuess;

		if(text == "guessFirstLocation") {

			tempGuess = part_object_array[stepCounter].guessFirstLocation;

		} else if(text == "guessSecondLocation") {

			tempGuess = part_object_array[stepCounter].guessSecondLocation;

		} else if(text == "guessreSampleParticleIndex") {

			var newIndex = part_object_array[stepCounter].guessreSampleParticleIndex;

			if(newIndex != null) {

				tempGuess = part_object_array[newIndex - 1].secondLocation;

			}
		}

		if(tempGuess != null) {

			guessArr[tempGuess].push(part_object_array[stepCounter]);
		}
	}

	for( stepCounter = 0; stepCounter < 23; stepCounter++) {

		generateXYPairs(guessArr[stepCounter], index);

	}

}

function alertMsg() {

	if(questionDone.Q32 == true) {

		return;

	}

	var updateText = 0;

	for( i = 0; i < numParticles; i++) {

		if(part_object_array[i].guessFirstLocation == null) {

			part_object_array[i].guessFirstLocation = part_object_array[i].firstLocation;

			part_object_array[i].xLocations[0] = getCanvasLocationX(part_object_array[i].guessFirstLocation);

			part_object_array[i].yLocations[0] = getCanvasLocationY(part_object_array[i].guessFirstLocation);

			updateText = i + 1;
			break;
		}

	}

	if(updateText == 0) {

		return;

	}

	var tempText = part_object_array[updateText - 1].randomInitialDraw + "";

	if(tempText.length > 8) {

		tempText = tempText.substring(0, 8);

	}

	document.getElementById("Q_3_1_" + updateText + "_R").textContent = tempText;

	document.getElementById("Q_3_1_" + updateText + "_I").textContent = part_object_array[updateText - 1].firstLocation;

	generateXYPairsWrapper("guessFirstLocation", 0);

	var canvas = document.getElementById("myCanvas");

	var context = canvas.getContext("2d");

	context.clearRect(0, 0, canvas.width, canvas.height);

	context.globalAlpha = 1;

	var img3 = new Image();

	img3.src = "http://csparticlefiltering.phpfogapp.com/newMap.png";

	context.drawImage(img3, imageOffsetX, imageOffsetX, imageWidth, imageHeight);

	for( i = 0; i < numParticles; i++) {

		if(part_object_array[i].xLocations.length > 0) {

			fancyDrawParticles2(part_object_array[i], canvas, 0, (i + 1));

		}

	}

	if(updateText == 15) {

		questionDone.Q32 = true;

		prepForTimeStep();

	}

}

function fancyDrawParticles2(particle, can, drawIndex, text) {

	var temp_context = can.getContext("2d");

	var temp = 0;
	temp_context.lineWidth = 1;
	temp_context.strokeStyle = "black";
	temp_context.font = "10pt sans-serif";
	yTextOffset = 5;
	xTextOffset = 7;

	var tempX = particle.xDrawLocation[drawIndex];

	var tempY = particle.yDrawLocation[drawIndex];

	temp_context.fillStyle = "#AAAAAA";
	temp_context.beginPath();
	temp_context.arc(tempX, tempY, radius, 0, 2 * Math.PI, false);
	temp_context.fill();
	temp_context.stroke();
	temp_context.fillStyle = "black";
	temp_context.fillText("" + text, tempX - xTextOffset, tempY + yTextOffset);
	temp = temp + 1;

}

function generateXYPairs(partArrayOnSameSquare, index) {

	if(partArrayOnSameSquare.length == 0) {

		return;

	}

	var xLoc = partArrayOnSameSquare[0].xLocations[index];

	var yLoc = partArrayOnSameSquare[0].yLocations[index];

	var diameter = radius * 2 + 3;

	var temp = 0;

	while(true) {

		if(temp == partArrayOnSameSquare.length) {

			return;

		}

		if(temp == 0) {

			partArrayOnSameSquare[temp].xDrawLocation[index] = xLoc;
			partArrayOnSameSquare[temp].yDrawLocation[index] = (yLoc - diameter);

		} else if(temp == 1) {

			partArrayOnSameSquare[temp].xDrawLocation[index] = (xLoc + diameter);
			partArrayOnSameSquare[temp].yDrawLocation[index] = (yLoc - diameter);

		} else if(temp == 2) {
			partArrayOnSameSquare[temp].xDrawLocation[index] = (xLoc - diameter);
			partArrayOnSameSquare[temp].yDrawLocation[index] = (yLoc);

		} else if(temp == 3) {
			partArrayOnSameSquare[temp].xDrawLocation[index] = (xLoc);
			partArrayOnSameSquare[temp].yDrawLocation[index] = (yLoc);

		} else if(temp == 4) {
			partArrayOnSameSquare[temp].xDrawLocation[index] = (xLoc + diameter);
			partArrayOnSameSquare[temp].yDrawLocation[index] = (yLoc);

		} else if(temp == 5) {
			partArrayOnSameSquare[temp].xDrawLocation[index] = (xLoc - diameter);
			partArrayOnSameSquare[temp].yDrawLocation[index] = (yLoc + diameter);

		} else if(temp == 6) {
			partArrayOnSameSquare[temp].xDrawLocation[index] = (xLoc);
			partArrayOnSameSquare[temp].yDrawLocation[index] = (yLoc + diameter);

		} else if(temp == 7) {
			partArrayOnSameSquare[temp].xDrawLocation[index] = (xLoc + diameter);
			partArrayOnSameSquare[temp].yDrawLocation[index] = (yLoc + diameter);
		}

		temp = temp + 1;
	}

}

function particleArray() {

	var corner = false;

	var side = false;

	var tee = false;

	var nums = new Array(numParticles);
	// spacing is .0454545

	var randomDraw = new Array(numParticles);

	var numsCount = new Array(23);
	for( i = 0; i < 23; i++) {
		numsCount[i] = 0
	}

	for( i = 0; i < numParticles; i++) {

		var randomSeed = Math.random();

		var randomnumber = Math.ceil(randomSeed * 22);

		if(corner == false) {

			while(true) {

				if(randomnumber == 1 || randomnumber == 8 || randomnumber == 11 || randomnumber == 18) {

					nums[i] = randomnumber;

					randomDraw[i] = randomSeed;

					numsCount[randomnumber] = numsCount[randomnumber] + 1;

					corner = true;

					break;

				} else {
					randomSeed = Math.random();

					randomnumber = Math.ceil(randomSeed * 22);
				}

			}

		} else if(tee == false) {

			while(true) {

				if(randomnumber == 6 || randomnumber == 13) {

					nums[i] = randomnumber;

					numsCount[randomnumber] = numsCount[randomnumber] + 1;

					randomDraw[i] = randomSeed;

					tee = true;

					break;

				} else {
					randomSeed = Math.random();

					randomnumber = Math.ceil(randomSeed * 22);
				}

			}

		} else if(side == false) {

			while(true) {

				if(randomnumber != 1 && randomnumber != 8 && randomnumber != 11 && randomnumber != 18 && randomnumber != 6 && randomnumber != 13) {

					nums[i] = randomnumber;

					randomDraw[i] = randomSeed;

					numsCount[randomnumber] = numsCount[randomnumber] + 1;

					side = true;

					break;

				} else {
					randomSeed = Math.random();

					randomnumber = Math.ceil(randomSeed * 22);
				}

			}

		} else {

			while(true) {

				if(numsCount[randomnumber] < 8) {

					nums[i] = randomnumber;

					numsCount[randomnumber] = numsCount[randomnumber] + 1;

					randomDraw[i] = randomSeed;

					break;

				}

				randomSeed = Math.random();

				randomnumber = Math.ceil(randomSeed * 22);
			}

		}

	}

	randomDrawInitial = randomDraw;

	return nums;

}

function getCanvasLocationX(particle) {

	var toReturn = 1;

	var hor_offset = imageWidth / 14;
	var hor1 = imageOffsetX + hor_offset;
	var hor2 = hor1 + imageWidth / 8.25;
	var hor3 = hor2 + imageWidth / 8.1;
	var hor4 = hor3 + imageWidth / 8.2;
	var hor5 = hor4 + imageWidth / 8.1;
	var hor6 = hor5 + imageWidth / 8.1;
	var hor7 = hor6 + imageWidth / 8.1;
	var hor8 = hor7 + imageWidth / 8.3;

	if(particle == 1 || particle == 20 || particle == 19 || particle == 18) {

		toReturn = hor1;

	} else if(particle == 2 || particle == 17) {

		toReturn = hor2;
	} else if(particle == 3 || particle == 16) {

		toReturn = hor3;
	} else if(particle == 4 || particle == 15) {

		toReturn = hor4;

	} else if(particle == 5 || particle == 14) {

		toReturn = hor5;

	} else if(particle == 6 || particle == 13 || particle == 21 || particle == 22) {

		toReturn = hor6;
	} else if(particle == 7 || particle == 12) {

		toReturn = hor7;
	} else if(particle == 8 || particle == 11 || particle == 9 || particle == 10) {

		toReturn = hor8;
	} else {

	}

	return toReturn;

}

function getCanvasLocationY(particle) {

	var toReturn = 1;

	var vert_offset = imageHeight / 7;
	var vert1 = imageOffsetY + vert_offset;
	var vert2 = vert1 + imageHeight / 4.2;
	var vert3 = vert2 + imageHeight / 4.2;
	var vert4 = vert3 + imageHeight / 4.2;

	if(particle < 9) {

		toReturn = vert1;

	} else if(particle == 20 || particle == 21 || particle == 9) {
		toReturn = vert2;
	} else if(particle == 19 || particle == 22 || particle == 10) {
		toReturn = vert3;

	} else if(particle < 19 && particle > 10) {

		toReturn = vert4;

	} else {

	}

	return toReturn;

}

function generateTimeStepPosition() {

	tripleCheck = new Array(23);
	for( temp = 0; temp < 23; temp++) {
		tripleCheck[temp] = 0;
	}

	for( j = 0; j < numParticles; j++) {

		var nextLocation = getDirection(part_object_array[j]);
		while(true) {

			if(tripleCheck[nextLocation] == 9) {//limits draws on Square

				nextLocation = getDirection(part_object_array[j]);

			} else {

				break;

			}

		}

		tripleCheck[nextLocation] = tripleCheck[nextLocation] + 1;

		part_object_array[j].secondLocation = nextLocation;

	}

}

function crazyAnimation() {

	var timeStep = 60;

	for( i = 0; i < numParticles; i++) {

		particle = part_object_array[i];

		var tempx = particle.xDrawLocation[1] - particle.xDrawLocation[0];

		var tempy = particle.yDrawLocation[1] - particle.yDrawLocation[0];

		particle.dx = tempx / timeStep;

		particle.dy = tempy / timeStep;

	}

	iteration = 1;

	gtimeStep = timeStep;

	var refreshIntervalId = setInterval("animation()", 60);

	intervalID = refreshIntervalId;

}

function animation() {

	var finalIter = false;

	if(gtimeStep == iteration) {

		clearInterval(intervalID);

		finalIter = true;

	}

	var canvas2 = document.getElementById("myCanvasTimeStep1");
	var context2 = canvas2.getContext("2d");
	context2.clearRect(0, 0, canvas2.width, canvas2.height);
	context2.globalAlpha = 1;
	var img3 = new Image();

	img3.src = "http://csparticlefiltering.phpfogapp.com/newMap.png";

	context2.drawImage(img3, imageOffsetX, imageOffsetX, 450, 300);

	for( i = 0; i < numParticles; i++) {
		x = (part_object_array[i].xDrawLocation[0] + (part_object_array[i].dx * iteration)) / 1.34;
		y = (part_object_array[i].yDrawLocation[0] + (part_object_array[i].dy * iteration)) / 1.34;
		//var tempp = parseInt(255 / 60);
		//var newRed = 255 - (tempp * iteration);
		//var newBlue = (tempp * iteration);
		//context2.fillStyle = "rgb(" + newRed + ",0," + newBlue + ")";
		context2.fillStyle = "#AAAAAA";

		context2.beginPath();
		context2.arc(x, y, radius / 1.34, 0, Math.PI * 2, true);
		context2.closePath();
		context2.fill();
		context2.lineWidth = 1;
		context2.strokeStyle = "black";
		context2.stroke();

		//var newGrey = tempp * iteration;

		//context2.fillStyle = "rgb(" + newGrey + "," + newGrey + "," + newGrey + ")";

		context2.fillStyle = "black";
		context2.fillText("" + (i + 1), x - 7, y + 5);

	}
	iteration = iteration + 1;

}

function generateParticleReadingWieght() {

	var totalWeight = 0;

	for( i = 0; i < numParticles; i++) {

		var tempPosition = part_object_array[i].secondLocation;

		part_object_array[i].weight = .25;

		if(evidenceLetter == 'C') {

			if(tempPosition == 1 || tempPosition == 8 || tempPosition == 18 || tempPosition == 11) {

				part_object_array[i].weight = .5;

			}

		} else if(evidenceLetter == 'T') {

			if(tempPosition == 6 || tempPosition == 13) {

				part_object_array[i].weight = .5;

			}

		} else if(evidenceLetter == 'H') {

			if(tempPosition != 1 && tempPosition != 8 && tempPosition != 18 && tempPosition != 11 && tempPosition != 6 && tempPosition != 13) {

				part_object_array[i].weight = .5;

			}

		}

		totalWeight = totalWeight + part_object_array[i].weight;

	}

	var startCumlativeWeight = 0;

	for( i = 0; i < numParticles; i++) {

		part_object_array[i].normalizedWeight = roundToPrecision(part_object_array[i].weight / totalWeight);

		startCumlativeWeight = part_object_array[i].normalizedWeight + startCumlativeWeight;

		part_object_array[i].cumlativeWeight = roundToPrecision(startCumlativeWeight);

		if(i == 14) {
			part_object_array[i].cumlativeWeight = 1;

		}

	}
}

function getDirection(particle) {

	var directionArray;

	var x = particle.firstLocation;

	if(x == 1) {

		directionArray = new Array(1, 2, 20);

	} else if(x == 2) {

		directionArray = new Array(1, 2, 3);

	} else if(x == 3) {

		directionArray = new Array(2, 3, 4);

	} else if(x == 4) {

		directionArray = new Array(3, 4, 5);

	} else if(x == 5) {

		directionArray = new Array(4, 5, 6);

	} else if(x == 6) {

		directionArray = new Array(5, 6, 7, 21);

	} else if(x == 7) {

		directionArray = new Array(6, 7, 8);

	} else if(x == 8) {

		directionArray = new Array(7, 8, 9);

	} else if(x == 9) {

		directionArray = new Array(8, 9, 10);

	} else if(x == 10) {

		directionArray = new Array(9, 10, 11);

	} else if(x == 11) {

		directionArray = new Array(10, 11, 12);

	} else if(x == 12) {

		directionArray = new Array(11, 12, 13);

	} else if(x == 13) {

		directionArray = new Array(12, 13, 14, 22);

	} else if(x == 14) {

		directionArray = new Array(13, 14, 15);

	} else if(x == 15) {

		directionArray = new Array(14, 15, 16);

	} else if(x == 16) {

		directionArray = new Array(15, 16, 17);

	} else if(x == 17) {

		directionArray = new Array(16, 17, 18);

	} else if(x == 18) {

		directionArray = new Array(17, 18, 19);

	} else if(x == 19) {

		directionArray = new Array(18, 19, 20);

	} else if(x == 20) {

		directionArray = new Array(1, 19, 20);

	} else if(x == 21) {

		directionArray = new Array(6, 21, 22);

	} else if(x == 22) {

		directionArray = new Array(13, 21, 22);

	} else {

	}

	var range = directionArray.length;
	// 3 or 4

	var randomDraw = particle.randomDrawTimeStep;

	var temp = Math.floor(randomDraw * range);
	//

	particle.timeStepModel = directionArray;

	return directionArray[temp];

}

function barValueChange(boxIndex) {

	var tempString = "Q_3_5_" + boxIndex + "_C";

	var newValue = parseFloat(document.getElementById(tempString).value);

	if(isNaN(newValue)) {

		return;

	}

	part_object_array[boxIndex - 1].cumlativeGuessWeight = newValue;

	if(part_object_array[boxIndex - 1].cumlativeGuessWeight == part_object_array[boxIndex - 1].cumlativeWeight) {

		document.getElementById(tempString).parentNode.style.backgroundColor = "lime";

		document.getElementById(tempString).disabled = true;

	} else {

		document.getElementById(tempString).parentNode.style.backgroundColor = "red";
	}

	var count = 0;

	for( z = 0; z < 6; z++) {

		var newValue = part_object_array[z].cumlativeGuessWeight;

		if(newValue != null) {

			count++;

		}

	}

	if(count == 5) {

		for( i = 5; i < numParticles; i++) {

			setTimeout("fillRestOfCumuWeight()", i * 100);

		}

	} else {

		var longCanvas = document.getElementById("myCanvasLong");

		redrawWeightBox(longCanvas);

		var longCanvas2 = document.getElementById("myCanvasLong2");

		redrawWeightBoxForLowVarience(longCanvas2);
	}
}

function fillRestOfCumuWeight() {

	for( i = 5; i < numParticles; i++) {

		particle = part_object_array[i];

		if(particle.cumlativeGuessWeight == null) {

			particle.cumlativeGuessWeight = particle.cumlativeWeight;

			break;
		}

	}

	if(i > 14) {

		return;

	}

	var scrapText = "Q_3_5_";

	c = document.getElementById(scrapText + (i + 1) + "_C");

	c.textContent = intToSmallString(part_object_array[i].cumlativeWeight, 5);

	if(i == 14) {// done with weights

		LockQuestion("Q_3_6_", "_I", 1, 5, false);

		drawOnFatCanvas(false);

	}

	var longCanvas = document.getElementById("myCanvasLong");

	redrawWeightBox(longCanvas);

	var longCanvas2 = document.getElementById("myCanvasLong2");

	redrawWeightBoxForLowVarience(longCanvas2);

}

function drawOnFatCanvas(originalFlag) {

	var miniCanvas;

	if(originalFlag) {

		miniCanvas = document.getElementById("myCanvasWeighted1");
	} else {

		miniCanvas = document.getElementById("myCanvasWeighted2");
	}

	var mctx = miniCanvas.getContext("2d");

	mctx.clearRect(0, 0, 450, 300);

	var imgmW2 = new Image();

	imgmW2.src = "http://csparticlefiltering.phpfogapp.com/newMap.png";
	mctx.globalAlpha = 1;

	mctx.drawImage(imgmW2, 0, 0, 450, 300);

	mctx.lineWidth = 1;
	mctx.strokeStyle = "black";
	mctx.font = "4pt sans-serif";
	yTextOffset = 2;
	xTextOffset = 6;

	mctx.strokeStyle = "black";
	mctx.font = "10pt sans-serif";
	if(part_object_array[8].xDrawLocation[1] != null) {

		for( i = 0; i < numParticles; i++) {
			mctx.globalAlpha = 0.5;

			yTextOffset = 5;
			xTextOffset = 7;
			var tempX = part_object_array[i].xDrawLocation[1] / 1.34;

			var tempY = part_object_array[i].yDrawLocation[1] / 1.34;

			mctx.fillStyle = "#AAAAAA";

			var tempRadius = radius / 1.34;

			if(originalFlag) {

				if(part_object_array[i].guessWeigth != null) {

					tempRadius = tempRadius * (parseFloat(part_object_array[i].guessWeigth) * 4);

				}

			} else {

				if(part_object_array[i].weight == .5) {

					tempRadius = tempRadius * 2;

				}
			}
			mctx.beginPath();
			mctx.arc(tempX, tempY, tempRadius, 0, 2 * Math.PI, false);
			mctx.fill();
			mctx.stroke();
			mctx.globalAlpha = 1;
			mctx.fillStyle = "black";

			mctx.fillText("" + (i + 1), tempX - xTextOffset, tempY + yTextOffset);
		}

	}
}

function intToSmallString(x, limit) {

	toReturn = "" + x;

	if(toReturn.length > limit) {

		toReturn = toReturn.substring(0, limit);

	}

	return toReturn;

}

function redrawWeightBoxForLowVarience(can) {

	var longContext = can.getContext("2d");

	longContext.clearRect(0, 0, 890, 90);

	var currentX = 0;

	longContext.fillStyle = "black";

	longContext.font = "10pt sans-serif";

	longContext.fillText("0.0", 0, 18);

	longContext.fillText("1.0", can.width - 20, 18);

	for( i = 0; i < numParticles; i++) {

		if(part_object_array[i].cumlativeGuessWeight != null && part_object_array[i].cumlativeGuessWeight != 0) {

			longContext.fillStyle = colorArray[i];

			var tempWidth = part_object_array[i].cumlativeGuessWeight * can.width;

			if(i != 0) {

				tempWidth = (part_object_array[i].cumlativeGuessWeight - part_object_array[i - 1].cumlativeGuessWeight) * can.width;

			}

			longContext.fillRect(currentX, 20, tempWidth, 30);

			longContext.fillStyle = "black";

			var newText = intToSmallString(part_object_array[i].cumlativeGuessWeight, 4);

			if(i != 14) {

				longContext.fillText("" + newText, currentX + tempWidth - 10, 18);
			}
			longContext.fillText("" + (i + 1), currentX + (tempWidth / 2) - 5, (can.height * .5));

			if(part_object_array[i].guessUState != null && part_object_array[i].guessUState != 0) {

				var possLocation = part_object_array[i].guessUState * can.width;

				longContext.beginPath();

				canvas_arrow(longContext, possLocation, 70, possLocation, 50, true);

				if(i != 0) {

					canvas_arrow(longContext, part_object_array[i - 1].guessUState * can.width, 70, possLocation, 70, false);

				}

				longContext.stroke();
			}

			currentX = currentX + tempWidth;

		}
	}

}

function canvas_arrow(context, fromx, fromy, tox, toy, flag) {
	var headlen = 10;
	context.moveTo(fromx, fromy);
	context.lineTo(tox, toy);

	if(flag) {
		var angle = Math.atan2(toy - fromy, tox - fromx);
		context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
		context.moveTo(tox, toy);
		context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
	}
}

function redrawWeightBox(can) {

	var longContext = can.getContext("2d");

	longContext.clearRect(0, 0, can.width, can.height);

	var currentX = 0;

	longContext.fillStyle = "black";

	longContext.font = "10pt sans-serif";

	longContext.fillText("0.0", 0, (can.height - 2 ));

	longContext.fillText("1.0", can.width - 20, (can.height - 2));

	for( i = 0; i < numParticles; i++) {

		if(part_object_array[i].cumlativeGuessWeight != null && part_object_array[i].cumlativeGuessWeight != 0) {

			longContext.fillStyle = colorArray[i];

			var tempWidth = part_object_array[i].cumlativeGuessWeight * can.width;

			if(i != 0) {

				tempWidth = (part_object_array[i].cumlativeGuessWeight - part_object_array[i - 1].cumlativeGuessWeight) * can.width;

			}

			longContext.fillRect(currentX, 0, tempWidth, can.height / 2);

			longContext.fillStyle = "black";

			var newText = intToSmallString(part_object_array[i].cumlativeGuessWeight, 4);

			if(i != 14) {

				longContext.fillText("" + newText, currentX + tempWidth - 10, (can.height - 2));
			}
			longContext.fillText("" + (i + 1), currentX + (tempWidth / 2) - 5, (can.height * .5) - 3);

			currentX = currentX + tempWidth;

		}
	}

}

function randomDrawForTimeStep() {

	for( i = 0; i < numParticles; i++) {

		var randomnumber = Math.random();

		part_object_array[i].randomDrawTimeStep = roundToPrecision(randomnumber);
	}

}

function updateNewResampleIndex(index, guess) {

	part_object_array[index - 1].xLocations[2] = getCanvasLocationX(guess);

	part_object_array[index - 1].yLocations[2] = getCanvasLocationY(guess);

	if(index > 5) {

		part_object_array[index - 1].guessreSampleParticleIndex = part_object_array[index - 1].reSampleParticleIndex;
		///// passing in 18??????
	}

	generateXYPairsWrapper("guessreSampleParticleIndex", 2);

	var canvas3r = document.getElementById("myCanvasThird");

	var context3r = canvas3r.getContext("2d");
	context3r.clearRect(0, 0, 450, 300);
	context3r.globalAlpha = 1;
	var img3 = new Image();

	img3.src = "http://csparticlefiltering.phpfogapp.com/newMap.png";

	context3r.drawImage(img3, imageOffsetX, imageOffsetX, 450, 300);

	var count = 0;

	yTextOffset = 5;
	xTextOffset = 7;

	for( i = 0; i < numParticles; i++) {

		if(part_object_array[i].guessreSampleParticleIndex != null) {

			context3r.lineWidth = 1;
			context3r.strokeStyle = "black";
			context3r.font = "10pt sans-serif";
			yTextOffset = 5;
			xTextOffset = 7;

			var tempX = part_object_array[i].xDrawLocation[2] / 1.333;

			var tempY = part_object_array[i].yDrawLocation[2] / 1.333;

			context3r.fillStyle = "#AAAAAA";
			context3r.beginPath();
			context3r.arc(tempX, tempY, radius / 1.333, 0, 2 * Math.PI, false);
			context3r.fill();
			context3r.stroke();
			context3r.fillStyle = "black";
			context3r.fillText("" + (i + 1), tempX - xTextOffset, tempY + yTextOffset);

		}

	}
	//setTimeout("fillRestResampleIndex()", (u + 1) * 300);

}

function fillRestResampleIndex() {

	var updateText = 0;

	for( i = 0; i < numParticles; i++) {

		if(part_object_array[i].guessreSampleParticleIndex == null) {

			part_object_array[i].guessreSampleParticleIndex = part_object_array[i].reSampleParticleIndex;

			var newLocation = part_object_array[part_object_array[i].reSampleParticleIndex].secondLocation;

			part_object_array[i].xLocations[2] = getCanvasLocationX(newLocation);

			part_object_array[i].yLocations[2] = getCanvasLocationY(newLocation);

			updateText = i + 1;
			break;
		}

	}

	var tempText = part_object_array[updateText - 1].randomSample + "";

	tempText = intToSmallString(tempText, 6);

	document.getElementById("Q_3_6_" + updateText + "_R").textContent = tempText;

	document.getElementById("Q_3_6_" + updateText + "_I").textContent = part_object_array[updateText - 1].reSampleParticleIndex;

	generateXYPairsWrapper("guessreSampleParticleIndex", 2);

	var canvas3r = document.getElementById("myCanvasThird");

	var context3r = canvas3r.getContext("2d");

	context3r.clearRect(0, 0, canvas3r.width, canvas3r.height);

	context3r.globalAlpha = 1;

	var img3 = new Image();

	img3.src = "http://csparticlefiltering.phpfogapp.com/newMap.png";

	context3r.drawImage(img3, imageOffsetX, imageOffsetX, imageWidth, imageHeight);

	for( i = 0; i < numParticles; i++) {

		if(part_object_array[i].xLocations.length > 0) {

			fancyDrawParticles2(part_object_array[i], canvas3r, 2, (i + 1));

		}

	}

}

function generateReSampleProb() {

	for( i = 0; i < numParticles; i++) {

		var randomnumber = Math.random();

		part_object_array[i].randomSample = roundToPrecision(randomnumber);

		for( j = 0; j < 15; j++) {

			var threshold = part_object_array[j].cumlativeWeight;

			if(threshold > randomnumber) {

				part_object_array[i].reSampleParticleIndex = j + 1;

				break;
			}

		}

	}

}

function insertReSampleProb() {

	var scrapeText = "Q_3_6_";

	for( i = 0; i < 5; i++) {

		c = document.getElementById(scrapeText + (i + 1) + "_R");

		var newString = intToSmallString(part_object_array[i].randomSample, 6);

		c.textContent = newString;
	}

}

function closeEnough(value1, value2) {

	var diff = Math.abs(value1 - value2);

	if(diff < .00001) {

		return true;

	} else {

		return false;

	}

}

function unFocusRouter(scrapeText, index, queryValue) {

	var c = document.getElementById(scrapeText);

	var newValue = parseFloat(c.value);

	if(isNaN(newValue)) {

		return;

	}

	if(queryValue == "guessreSampleParticleIndex") {

		if(newValue < 1 || newValue > 15 || !isInt(newValue)) {
			document.getElementById(scrapeText).parentNode.style.backgroundColor = "red";

			return;

		}

	}

	var valueToCheck;

	if(queryValue == "guessUState") {

		part_object_array[index - 1].guessUState = newValue;

		valueToCheck = part_object_array[index - 1].uState;

		var longCanvas2 = document.getElementById("myCanvasLong2");

		redrawWeightBoxForLowVarience(longCanvas2);

	} else if(queryValue == "guessOldIndex") {

		part_object_array[index - 1].guessOldIndex = newValue;

		valueToCheck = part_object_array[index - 1].oldIndex;

	} else if(queryValue == "guessNewState") {

		part_object_array[index - 1].guessNewState = newValue;

		valueToCheck = part_object_array[index - 1].newState;

	} else if(queryValue == "guessWeigth") {

		part_object_array[index - 1].guessWeigth = newValue;

		valueToCheck = part_object_array[index - 1].weight;

		drawOnFatCanvas(true);

		maybe2(4, false, false);

	} else if(queryValue == "guessNormalizedWeigth") {

		part_object_array[index - 1].guessNormalizedWeigth = newValue;

		valueToCheck = part_object_array[index - 1].normalizedWeight;

		maybe2(4, false, false);

	} else if(queryValue == "guessAllSquareProb") {

		part_object_array[0].guessAllSquareProb[index] = newValue;

		valueToCheck = roundToPrecision((part_object_array[0].allSquareProb[index] / numParticles));

	} else if(queryValue == "guessreSampleParticleIndex") {

		part_object_array[index - 1].guessreSampleParticleIndex = newValue;

		valueToCheck = part_object_array[index - 1].reSampleParticleIndex;

		var guess = part_object_array[valueToCheck - 1].secondLocation;

		updateNewResampleIndex(index, guess);
	} else if(queryValue == "guessSensorReadings") {

		valueToCheck = part_object_array[0].sensorReadings[index - 1];

	}

	var gotCorrectAnswer = false;

	if(closeEnough(newValue, valueToCheck)) {

		gotCorrectAnswer = true;

		document.getElementById(scrapeText).parentNode.style.backgroundColor = "lime";

		document.getElementById(scrapeText).disabled = true;

	} else {

		document.getElementById(scrapeText).parentNode.style.backgroundColor = "red";

	}
	var count = 0;

	if(queryValue == "guessSensorReadings") {
		if(gotCorrectAnswer) {

			counter3_1 = counter3_1 + .5;

			if(counter3_1 == 9) {

				LockQuestion("Q_3_1_", "_I", 1, 5, false);

			}

		}
	}

	for( i = 0; i < 5; i++) {

		if(queryValue == "guessUState") {

			if(part_object_array[i].guessUState != null) {

				if(!correctDebug) {

					if(gotCorrectAnswer) {

						count++;

					}

				} else {

					count++;

				}

			}
		} else if(queryValue == "guessOldIndex") {

			if(part_object_array[i].guessOldIndex != null) {

				if(!correctDebug) {

					if(gotCorrectAnswer) {

						count++;

					}

				} else {

					count++;

				}
			}
		} else if(queryValue == "guessNewState") {

			if(part_object_array[i].guessNewState != null) {

				if(!correctDebug) {

					if(gotCorrectAnswer) {

						count++;

					}

				} else {

					count++;

				}
			}
		} else if(queryValue == "guessWeigth") {

			if(part_object_array[i].guessWeigth != null) {

				if(!correctDebug) {

					if(gotCorrectAnswer) {

						count++;

					}

				} else {

					count++;

				}
			}
		} else if(queryValue == "guessNormalizedWeigth") {

			if(part_object_array[i].guessNormalizedWeigth != null) {

				if(!correctDebug) {

					if(gotCorrectAnswer) {

						count++;

					}

				} else {

					count++;

				}
			}
		} else if(queryValue == "guessAllSquareProb") {

			if(part_object_array[0].guessAllSquareProb[i + 1] != null) {

				if(!correctDebug) {

					if(gotCorrectAnswer) {

						count++;

					}

				} else {

					count++;

				}
			}

		} else if(queryValue == "guessreSampleParticleIndex") {

			if(part_object_array[i].guessreSampleParticleIndex != null) {

				if(!correctDebug) {

					if(gotCorrectAnswer) {

						count++;

					}

				} else {

					count++;

				}
			}
		}
	}
	if(count == 5) {

		if(queryValue == "guessUState") {

			if(questionDone.Q38U == false) {

				for( i = 5; i < numParticles; i++) {

					setTimeout("routerFinishRest('Q_3_7_', '_U', 'uState')", (i + 1) * 200);

				}
			}
			questionDone.Q38U = true;

		} else if(queryValue == "guessOldIndex") {

			if(questionDone.Q38O == false) {

				for( j = 5; j < numParticles; j++) {

					setTimeout("routerFinishRest('Q_3_7_', '_O', 'oldIndex')", (j + 1) * 200);

				}
				questionDone.Q38O = true;
			}

		} else if(queryValue == "guessNewState") {

			if(questionDone.Q38S == false) {

				for( k = 5; k < numParticles; k++) {

					setTimeout("routerFinishRest('Q_3_7_', '_N', 'newState')", (k + 1) * 200);

				}

				questionDone.Q38S == true
			}

		} else if(queryValue == "guessWeigth") {

			if(questionDone.Q35W == false) {

				for( k = 5; k < numParticles; k++) {

					setTimeout("routerFinishRest('Q_3_5_', '_W', 'weight')", (k + 1) * 200);

				}
				questionDone.Q35W == true;
			}

		} else if(queryValue == "guessNormalizedWeigth") {

			if(questionDone.Q35N == false) {

				for( k = 5; k < numParticles; k++) {

					setTimeout("routerFinishRest('Q_3_5_', '_N', 'normalizedWeight')", (k + 1) * 200);

				}
				questionDone.Q35N == true;
			}

		} else if(queryValue == "guessAllSquareProb") {

			if(questionDone.Q34 == false) {

				for( k = 5; k < 23; k++) {

					setTimeout("routerFinishRest('Q_3_4_', '', 'allSquareProb')", (k + 1) * 100);

				}
				questionDone.Q34 == true;
			}
		} else if(queryValue == "guessreSampleParticleIndex") {

			if(questionDone.Q36 == false) {

				//unlock Single Questions
				document.getElementById("Q_3_7_0").disabled = false;
				;
				document.getElementById("Q_3_9_0").disabled = false;
				;
				document.getElementById("Q_3_10_0").disabled = false;
				;

				for( k = 5; k < numParticles; k++) {

					setTimeout("routerFinishRest('Q_3_6_', '_I', 'reSampleParticleIndex')", (k + 1) * 100);

				}
				questionDone.Q36 == true
			}

		}

	}

}

function routerFinishRest(scrapePart1, scrapePart2, toFill) {

	var temp = numParticles;

	if(toFill == "allSquareProb") {

		temp = 23;

	}

	for( k = 6; k < temp + 1; k++) {

		c = document.getElementById(scrapePart1 + k + scrapePart2);

		if(c == null) {

			return;
		}

		if(c.textContent == "") {

			break;

		}

	}

	if(toFill == "allSquareProb") {

		if(k > 22) {

			return;

		}

	} else {

		if(k > 15) {

			return;

		}

	}

	if(toFill == "uState") {

		c.textContent = intToSmallString(part_object_array[k - 1].uState, 6);

		part_object_array[k - 1].guessUState = part_object_array[k - 1].uState;

		var longCanvas2 = document.getElementById("myCanvasLong2");

		redrawWeightBoxForLowVarience(longCanvas2);
		if(k == 14) {

			LockQuestion("Q_3_7_", "_O", 1, 5, false);
		}

	} else if(toFill == "oldIndex") {

		c.textContent = intToSmallString(part_object_array[k - 1].oldIndex, 6);
		if(k == 14) {

			LockQuestion("Q_3_7_", "_N", 1, 5, false);
		}

	} else if(toFill == "newState") {

		c.textContent = intToSmallString(part_object_array[k - 1].newState, 6);

	} else if(toFill == "weight") {

		part_object_array[k - 1].guessWeigth = part_object_array[k - 1].weight;

		drawOnFatCanvas(true);

		c.textContent = intToSmallString(part_object_array[k - 1].weight, 5);

		if(k == 14) {

			LockQuestion("Q_3_5_", "_N", 1, 5, false);

		}

	} else if(toFill == "normalizedWeight") {

		c.textContent = intToSmallString(part_object_array[k - 1].normalizedWeight, 5);

		if(k == 14) {

			LockQuestion("Q_3_5_", "_C", 1, 5, false);
		}
	} else if(toFill == "allSquareProb") {

		c.textContent = intToSmallString(part_object_array[0].allSquareProb[k] / numParticles, 6);

		if(k == 20) {

			LockQuestion("Q_3_5_", "_W", 1, 5, false);

		}
	} else if(toFill == "reSampleParticleIndex") {

		var newParticle = part_object_array[k - 1].reSampleParticleIndex;

		var newLocation = part_object_array[newParticle - 1].secondLocation;

		c.textContent = intToSmallString(newParticle, 5);

		var d = document.getElementById("Q_3_6_" + k + "_R");

		d.textContent = intToSmallString(part_object_array[k - 1].randomSample, 5);

		if(k == 14) {

			LockQuestion("Q_3_7_", "_U", 1, 5, false);
		}
		updateNewResampleIndex(k, newLocation);

	}
}

function generateParticleUState() {

	var uStep = random_3_4 / numParticles;

	part_object_array[0].uState = roundToPrecision(uStep);

	for( i = 1; i < numParticles; i++) {

		part_object_array[i].uState = roundToPrecision(uStep + (i / numParticles));
	}

	for( i = 0; i < numParticles; i++) {

		var theUState = part_object_array[i].uState;

		for( j = 0; j < numParticles; j++) {

			var threshold = part_object_array[j].cumlativeWeight;

			if(threshold > theUState) {

				part_object_array[i].oldIndex = j + 1;

				part_object_array[i].newState = part_object_array[j].secondLocation;

				break;

			}

		}

	}

}

function generateSensorReadings() {

	var tempArray = new Array(.5, .25, .25, .25, .5, .25, .25, .25, .5);

	part_object_array[0].sensorReadings = tempArray;

}

function roundToPrecision(number) {

	var result = Math.round(number * 1000000) / 1000000

	return result;

}

function setQuestionToFalse() {

	questionDone.Q32 = false;
	questionDone.Q33 = false;
	questionDone.Q34 = false;
	questionDone.Q35W = false;
	questionDone.Q35N = false;
	questionDone.Q35C = false;
	questionDone.Q36 = false;
	questionDone.Q38U = false;
	questionDone.Q38O = false;
	questionDone.Q38S = false;

}

function checkSingleQuestion(text) {

	var c;

	var correct = false;

	if(text == "Q3.7") {

		c = document.getElementById("Q_3_7_0");

		var userInput = c.value;
		if(isNaN(userInput) || (userInput == "")) {

			return;
		} else {

			if(userInput == singleSolution.A37) {

				correct = true;

			}

		}

	} else if(text == "Q3.9") {

		c = document.getElementById("Q_3_9_0");

		var userInput = c.value;

		if(isNaN(userInput) || (userInput == "")) {
			return;
		} else {

			if(userInput == singleSolution.A39) {

				correct = true;

			}

		}
	} else if(text == "Q3.10") {

		c = document.getElementById("Q_3_10_0");

		var userInput = c.value;

		if(isNaN(userInput) || (userInput == "")) {
			return;
		} else {

			if(userInput == singleSolution.A310) {

				correct = true;

			}

		}
	}

	if(correct == true) {

		c.parentNode.style.backgroundColor = "lime";

		c.disabled = true;

	} else {

		c.parentNode.style.backgroundColor = "red";

		//c.style.borderColor = "red";

	}

}

function findQ39310() {

	var Q39 = 0;

	var Q310 = 0;

	for( i = 0; i < numParticles; i++) {

		var newLocation = part_object_array[i].newState;

		if(newLocation == 1 || newLocation == 11 || newLocation == 18 || newLocation == 8) {

			Q39 = Q39 + 1;

		}
		if(newLocation < 9) {

			Q310 = Q310 + 1;

		}

	}

	singleSolution.A39 = roundToPrecision(Q39 / 15);
	singleSolution.A310 = roundToPrecision(Q310 / 15);

}

function doLowVarience() {

	randomnumber = roundToPrecision(Math.random());

	document.getElementById("forLowVar").textContent = "We'll use the number " + randomnumber + ", randomly drawn between 0 and 1, as our source of randomness.";

	random_3_4 = randomnumber;

	singleSolution.A37 = roundToPrecision(randomnumber / numParticles);

}

function load() {

	singleSolution = {};

	setQuestionToFalse();

	questionDelay = new Array();

	for( i = 1; i < 3; i++) {//number questions

		questionDelay[i] = {};

	}

	part_object_array = new Array(numParticles);

	tempPartLocation = particleArray();

	for( i = 0; i < numParticles; i++) {

		newParticle = {};

		newParticle.firstLocation = tempPartLocation[i];

		newParticle.xLocations = [];

		newParticle.yLocations = [];

		newParticle.xDrawLocation = [];

		newParticle.yDrawLocation = [];

		part_object_array[i] = newParticle;

		newParticle.randomInitialDraw = roundToPrecision(randomDrawInitial[i]);

	}

	//// Random Draw for Time Step

	randomDrawForTimeStep();

	/////Random Reading

	var randomnumber = Math.random();

	var reading = "";

	if(randomnumber < .333) {

		reading = 'H';

	} else if(randomnumber < .666) {

		reading = 'C';

	} else {

		reading = 'T';

	}

	evidenceLetter = reading;

	document.getElementById("dds").textContent = "After the particles move you recieve a new sensor reading to where the robot may be. The sensor reading is : E1 = " + reading + ".";

	//////Random Draw Original

	for( i = 0; i < 5; i++) {

		var tempBox = document.getElementById("Q_3_1_" + (i + 1) + "_R");

		var newValue = randomDrawInitial[i];

		newValue = newValue + "";

		if(newValue.length > 8) {

			newValue = newValue.substring(0, 8);

		}

		tempBox.textContent = newValue;

	}

	generateTimeStepPosition();

	calculateSquareProbability();

	generateParticleReadingWieght();

	generateReSampleProb();

	insertReSampleProb();

	doLowVarience();

	generateParticleUState();

	findQ39310();

	generateSensorReadings();

}

function maybe2(index, redFlag, forWeightedFlag) {

	var miniCanvas;

	if(forWeightedFlag == true) {

		miniCanvas = document.getElementById("myCanvasWeighted1");

	} else {
		miniCanvas = document.getElementById("myCanvasTimeStep2");
	}

	var mctx = miniCanvas.getContext("2d");

	mctx.lineWidth = 1;
	mctx.strokeStyle = "black";
	mctx.font = "8pt sans-serif";
	yTextOffset = 2;
	xTextOffset = 6;

	if(part_object_array[8].xDrawLocation[1] != null) {

		for( i = 0; i < numParticles; i++) {

			var tempX = part_object_array[i].xDrawLocation[1] / 1.34;

			var tempY = part_object_array[i].yDrawLocation[1] / 1.34;

			mctx.fillStyle = "#AAAAAA";

			if((i + 1) == index && redFlag == true) {

				mctx.fillStyle = "#FFFF88";

			}

			if(forWeightedFlag) {

				mctx.globalAlpha = 0.5

			}

			mctx.beginPath();
			mctx.arc(tempX, tempY, radius / 1.34, 0, 2 * Math.PI, false);
			mctx.fill();
			mctx.stroke();
			mctx.fillStyle = "black";
			mctx.fillText("" + (i + 1), tempX - xTextOffset, tempY + yTextOffset);

		}
	}

}
