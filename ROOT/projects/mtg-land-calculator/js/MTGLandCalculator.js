function updateTotalLandsInput(e) {
	value = e.value;
	input = document.getElementById("lands");
	console.log(value);
	switch (value) {
		case "limited":
			input.value = 17;
			input.style.display = "none";
			break;
		case "constructed":
			input.value = 23;
			input.style.display = "none";
			break;
		case "commander":
			input.value = 37;
			input.style.display = "none";
			break;
		case "custom":
			input.style.display = "inline-block";
	}
}

function calculate() {
	white = parseInt(document.getElementById("white").value);
	blue = parseInt(document.getElementById("blue").value);
	black = parseInt(document.getElementById("black").value);
	red = parseInt(document.getElementById("red").value);
	green = parseInt(document.getElementById("green").value);
	colourless = parseInt(document.getElementById("colourless").value);
	lands = parseInt(document.getElementById("lands").value);

	if (isNaN(white)) white = 0;
	if (isNaN(blue)) blue = 0;
	if (isNaN(black)) black = 0;
	if (isNaN(red)) red = 0;
	if (isNaN(green)) green = 0;
	if (isNaN(colourless)) colourless = 0;

	totalPips = white + blue + black + red + green + colourless;

	whitePercentage = white / totalPips;
	bluePercentage = blue / totalPips;
	blackPercentage = black / totalPips;
	redPercentage = red / totalPips;
	greenPercentage = green / totalPips;
	colourlessPercentage = colourless / totalPips;

	whiteToInclude = Math.round(whitePercentage * lands);
	blueToInclude = Math.round(bluePercentage * lands);
	blackToInclude = Math.round(blackPercentage * lands);
	redToInclude = Math.round(redPercentage * lands);
	greenToInclude = Math.round(greenPercentage * lands);
	colourlessToInclude = Math.round(colourlessPercentage * lands);

	totalSuggested =
		whiteToInclude +
		blueToInclude +
		blackToInclude +
		redToInclude +
		greenToInclude +
		colourlessToInclude;

	amountToRemove = totalSuggested - lands;

	removalMessage =
		amountToRemove != 0
			? `${amountToRemove > 0 ? "Remove" : "Add"} ${Math.abs(
					amountToRemove
			  )} land${Math.abs(amountToRemove) > 1 ? "s" : ""} of your choice`
			: "";

	whiteRow = document.getElementById("tableWhiteRow");
	blueRow = document.getElementById("tableBlueRow");
	blackRow = document.getElementById("tableBlackRow");
	redRow = document.getElementById("tableRedRow");
	greenRow = document.getElementById("tableGreenRow");
	colourlessRow = document.getElementById("tableColourlessRow");

	whiteRow.style.display = "none";
	blueRow.style.display = "none";
	blackRow.style.display = "none";
	redRow.style.display = "none";
	greenRow.style.display = "none";
	colourlessRow.style.display = "none";

	if (whiteToInclude > 0) {
		whiteRow.style.display = "table-row";
		whiteRow.children[2].innerText = whiteToInclude;
		whiteRow.children[3].innerText = (
			(whiteToInclude / totalSuggested) *
			100
		).toFixed(1);
	}
	if (blueToInclude > 0) {
		blueRow.style.display = "table-row";
		blueRow.children[2].innerText = blueToInclude;
		blueRow.children[3].innerText = (
			(blueToInclude / totalSuggested) *
			100
		).toFixed(1);
	}
	if (blackToInclude > 0) {
		blackRow.style.display = "table-row";
		blackRow.children[2].innerText = blackToInclude;
		blackRow.children[3].innerText = (
			(blackToInclude / totalSuggested) *
			100
		).toFixed(1);
	}
	if (redToInclude > 0) {
		redRow.style.display = "table-row";
		redRow.children[2].innerText = redToInclude;
		redRow.children[3].innerText = (
			(redToInclude / totalSuggested) *
			100
		).toFixed(1);
	}
	if (greenToInclude > 0) {
		greenRow.style.display = "table-row";
		greenRow.children[2].innerText = greenToInclude;
		greenRow.children[3].innerText = (
			(greenToInclude / totalSuggested) *
			100
		).toFixed(1);
	}
	if (colourlessToInclude > 0) {
		colourlessRow.style.display = "table-row";
		colourlessRow.children[2].innerText = colourlessToInclude;
		colourlessRow.children[3].innerText = (
			(colourlessToInclude / totalSuggested) *
			100
		).toFixed(2);
	}

	document.getElementById("removalMessage").innerText = removalMessage;

	document.getElementById("popup").style.visibility = "visible";
}

function reset() {
	document.getElementById("white").value = "";
	document.getElementById("blue").value = "";
	document.getElementById("black").value = "";
	document.getElementById("red").value = "";
	document.getElementById("green").value = "";
	document.getElementById("colourless").value = "";
	document.getElementById("lands").value = 17;
	document.getElementById("lands").style.display = "none";
	document.getElementById("deckFormat").value = "limited";
}
