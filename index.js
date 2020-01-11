//GLOBALS
let seconds = 60;
let score = 0;
let life = 3;

function getTime() {
    function tick() {
        document.getElementById(warning);
        document.getElementById(counter);
        seconds--;
        counter.innerHTML = `${seconds.toString()} sekund.`;
        if (life <= 0) {
            return;
        } else if (seconds > 0) {
            setTimeout(tick, 1000);
        } else {
            counter.innerHTML = "Czas minął.";
            warning.innerHTML = "Dzięki za grę.";
            seconds = 0;
        }
    }
    tick();
}

function getTiles() {
    let row_nr = 0;
    let col_nr = 0;
    const numberOfRows = document.getElementById('numberOfRows').value
    const numberOfColumns = document.getElementById('numberOfColumns').value
    const table = document.getElementById("table");
    let row = document.getElementById("row_" + row_nr);
    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfColumns; j++) {
            let cell = row.insertCell(col_nr);
            cell.setAttribute("id", "cell_" + row_nr + "_" + col_nr);
            cell.setAttribute("class", "reflex__tile--bad");
            cell.setAttribute("onclick", "checkTile(this.id)");
            col_nr++;
        }
        col_nr = 0;
        row_nr++;
        row = table.insertRow(row_nr);
        row.setAttribute("id", "row_" + row_nr);
    }
}

function showGoodTile() {
    const numberOfRows = document.getElementById('numberOfRows').value
    const numberOfColumns = document.getElementById('numberOfColumns').value

    function start(counter) {
        let rowNumber = Math.floor(Math.random() * numberOfRows)
        let columnNumber = Math.floor(Math.random() * numberOfColumns)
        document.getElementById(numberOfLives);
        document.getElementById(warning);
        // counter - max number of green tiles
        if (counter < 60) {
            setTimeout(function() {
                if (life <= 0) {
                    numberOfLives.innerHTML = `Skończyły Ci się życia.`
                    warning.innerHTML = "Dzięki za grę."
                    return;
                } else if (seconds <= 0) {
                    return;
                }
                counter++;
                document.getElementById(`cell_${rowNumber}_${columnNumber}`).classList.add('reflex__tile--good');
                document.getElementById(`cell_${rowNumber}_${columnNumber}`).classList.remove('reflex__tile--bad');
                start(counter);
            }, 3000);
            setTimeout(function() {
                if (life <= 0) {
                    numberOfLives.innerHTML = `Skończyły Ci się życia.`
                    warning.innerHTML = "Dzięki za grę."
                    return;
                } else if (seconds <= 0) {
                    return;
                }
                counter++;
                if (document.getElementById(`cell_${rowNumber}_${columnNumber}`).classList.contains('reflex__tile--good')) {
                    life--
                    numberOfLives.innerHTML = life
                    warning.innerHTML = "Straciłeś życie :("
                }
                document.getElementById(`cell_${rowNumber}_${columnNumber}`).classList.remove('reflex__tile--good');
                document.getElementById(`cell_${rowNumber}_${columnNumber}`).classList.add('reflex__tile--bad');
            }, 5000);
        }
    }
    start(0)
}

function checkTile(id) {
    let tile = document.getElementById(id);
    document.getElementById(numberOfPoints);
    document.getElementById(numberOfLives);
    document.getElementById(warning);
    if (life <= 0) {
        numberOfLives.innerHTML = `Skończyły Ci się życia.`
        warning.innerHTML = "Dzięki za grę."
    }
    else if (seconds <= 0) {
        numberOfLives.innerHTML = `Skończył Ci się czas.`
        warning.innerHTML = "Dzięki za grę."
    }
    else if (tile.classList.contains('reflex__tile--good')) {
        tile.classList.remove('reflex__tile--good')
        tile.classList.add('reflex__tile--bad')
        score++
        numberOfPoints.innerHTML = score
        warning.innerHTML = "Dobrze Ci idzie :)"
    } else if (tile.classList.contains('reflex__tile--bad')) {
        life--
        numberOfLives.innerHTML = life
        warning.innerHTML = "Straciłeś życie :("
    }

}

function changeVisibility() {
    document.getElementById(start)
    document.getElementById(inputs)
    document.getElementById(numberOfPoints);
    document.getElementById(numberOfLives);
    document.getElementById(statistics);
    document.getElementById(time_stats);
    document.getElementById(footer);
    numberOfPoints.innerHTML = score
    numberOfLives.innerHTML = life
    statistics.classList.remove('reflex__item--hidden')
    time_stats.classList.remove('reflex__item--hidden')
    start.setAttribute("disabled", true);
    start.classList.add("reflex__item--disabled");
    inputs.setAttribute("class", "reflex__item--hidden");
    footer.setAttribute("class", "reflex__item--hidden");
}

function inputMinMax(value, min, max) 
{
    if(parseInt(value) < min || isNaN(parseInt(value))) 
        return min; 
    else if(parseInt(value) > max) 
        return max; 
    else return value;
}

function reset() {
    location.reload();
}

function initializingGame() {
    getTime();
    getTiles();
    changeVisibility();
    showGoodTile();
}