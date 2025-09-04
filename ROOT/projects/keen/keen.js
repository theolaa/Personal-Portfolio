sizeInput = document.getElementById("size");
tableContainer = document.getElementById("tableContainer");

const CELL_SIZE = 100;
const DEFAULT_GRID_SIZE = 4;
const MAX_GRID_SIZE = 9;
const MIN_GRID_SIZE = 2;

gameState = {
	size: null,
	selectedCell: null,
	solution: [[null]],
	grid: [
		[
			{
				// The top-left origin coordinates of the cell
				x: null,
				y: null,
				// These are displayable values
				regionRule: { operation: null, result: null },
				notes: [],
				value: null,
			},
		],
	],
	regions: [{ cells: [], operation: "", result: null }],
};

function generateGame() {
	// Gets the dimensions of the grid from the UI with sensible defaults
	// for out-of-bounds values
	size = parseInt(sizeInput.value);
	if (isNaN(size)) {
		size = DEFAULT_GRID_SIZE;
	} else if (size < MIN_GRID_SIZE) {
		size = MIN_GRID_SIZE;
	} else if (size > MAX_GRID_SIZE) {
		size = MAX_GRID_SIZE;
	}

	// Sets the game to that size
	gameState.size = size;
	console.log(`New game with size ${size}`);

	// Generates a new solution with that size
	generateSolution(size);
}

function generateSolution(size) {
	// Clears the grid and creates a new blank grid
	tableContainer.innerHTML = "";
	table = document.createElement("table");
	table.setAttribute("id", "table");

	// Will become the final completed solution grid
	gameSolution = [];

	// Will become the initial blank game state
	gameStateGrid = [];

	// Creates the rows
	for (i = 0; i < size; i++) {
		// For display
		currentRow = document.createElement("tr");
		// The solution
		currentSolutionRow = [];
		// Game state
		currentGridRow = [];

		// Creates the cells in that row
		for (j = 0; j < size; j++) {
			// For display
			currentCell = document.createElement("td");
			currentCell.style.width = `${CELL_SIZE}px`;
			currentCell.style.height = `${CELL_SIZE}px`;
			currentCell.style.fontSize = `${CELL_SIZE * (1 / 2)}px`;
			currentCell.setAttribute("class", "base-cell");
			currentCell.setAttribute("onmouseenter", "updateCurrentCell(this)");
			coordinates = `${j},${i}`;
			currentCell.setAttribute("id", coordinates);

			// Empty game state cell
			currentGameStateCell = {
				x: j,
				y: i,
				regionRule: { operation: null, result: null },
				notes: [],
				value: null,
			};

			currentRow.appendChild(currentCell);
			currentSolutionRow.push(null);
			currentGridRow.push(currentGameStateCell);
		}

		table.appendChild(currentRow);
		gameSolution.push(currentSolutionRow);
		gameStateGrid.push(currentGridRow);
	}

	tableContainer.appendChild(table);
	gameState.solution = gameSolution;
	gameState.grid = gameStateGrid;

	placeNumbers(size);
	drawGrid();
}

function placeNumbers(size) {
	numbers = Array(size)
		.fill(0)
		.map((x, y) => {
			return y + 1;
		});
	numbers = shuffleArray(numbers);
	for (i = 0; i < size; i++) {
		for (j = 0; j < size; j++) {
			gameState.solution[i][j] = numbers[j];
		}
		temp = numbers.shift();
		numbers.push(temp);
	}

	// Shuffles Rows
	gameState.solution = shuffleArray(gameState.solution);

	// Shuffles Columns
	gameState.solution = shuffle2DArrayColumns(gameState.solution);

	// Shuffles Rows Again
	gameState.solution = shuffleArray(gameState.solution);
}

function validPlacement(number, row, column) {
	for (currentRow = 0; currentRow < row; currentRow++) {
		if (gameState.solution[currentRow][column] == number) return false;
	}
	return true;
}

function drawGrid() {
	for (x = 0; x < gameState.size; x++) {
		for (y = 0; y < gameState.size; y++) {
			document.getElementById(`${y},${x}`).innerText =
				//gameState.grid[x][y].value;
				gameState.solution[x][y];
		}
	}
}

function updateCurrentCell(cell) {
	coordsX = cell.id.substring(0, cell.id.indexOf(','));
	coordsY = cell.id.substring(cell.id.indexOf(',')+1, cell.id.length);
	// console.log(coordsX + "," + coordsY);
	gameState.grid[coordsY][coordsX].value = gameState.solution[coordsY][coordsX];
	drawGrid();
}

function shuffleArray(array) {
	for (i = array.length - 1; i > 0; i--) {
		// Generate random number
		j = Math.floor(Math.random() * (i + 1));
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function shuffle2DArrayColumns(array) {
	for (i = array.length - 1; i > 0; i--) {
		// Generate random number
		j = Math.floor(Math.random() * (i + 1));

		// Swap items in columns i and j
		for (row = 0; row < array.length; row++) {
			temp = array[row][i];
			array[row][i] = array[row][j];
			array[row][j] = temp;
		}
	}
	return array;
}
