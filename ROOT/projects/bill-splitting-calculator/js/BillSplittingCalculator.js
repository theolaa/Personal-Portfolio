people = [];

function addNewPerson(e) {
	parent = e.parentElement.parentElement.parentElement;
	rowText =
		'<td><input type="text" name="nameField" class="nameField" onchange="updateSelects()" placeholder="Person\'s name" /></td><td><button onclick="removePerson(this)">X</button></td>';
	row = document.createElement("tr");
	row.classList.add("personRow");
	row.innerHTML = rowText;
	parent.insertBefore(row, e.parentElement.parentElement);
}

function removePerson(e) {
	if (document.getElementsByClassName("nameField").length > 1) {
		row = e.parentElement.parentElement;
		table = row.parentElement;
		table.removeChild(row);
	}
	updateSelects();
}

function updateSelects() {
	names = document.getElementsByClassName("nameField");
	people = [];
	for (i = 0; i < names.length; i++) {
		people.push(names[i].value);
	}
	select = document.createElement("select");
	select.classList.add("nameSelect");
	for (i = 0; i < people.length; i++) {
		option = document.createElement("option");
		option.value = people[i];
		option.innerText = people[i];
		select.appendChild(option);
	}
	selects = document.getElementsByClassName("nameSelect");
	for (i = 0; i < selects.length; i++) {
		selects[i].replaceWith(select);
	}
}

function showItems(e) {
	e.style.display = "none";
	document.getElementById("items").style.display = "block";
	updateSelects();
}

function calculate() {}

// Sets all form fields back to their default values
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
