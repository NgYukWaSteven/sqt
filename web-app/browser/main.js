import Tetris from "../common/Tetris.js";

const grid_columns = Tetris.field_width;
const grid_rows = Tetris.field_height;

let game = Tetris.new_game();

document.documentElement.style.setProperty("--grid-rows", grid_rows);
document.documentElement.style.setProperty("--grid-columns", grid_columns);

//display grid of next Tetromino
const grid = document.getElementById("grid");
const one = document.getElementById("1");
const two = document.getElementById("2");
const three = document.getElementById("3");
const four = document.getElementById("4");
const five = document.getElementById("5");
const six = document.getElementById("6");
const seven = document.getElementById("7");
const eight = document.getElementById("8");
const nine = document.getElementById("9");
const ten = document.getElementById("10");
const eleven = document.getElementById("11");
const twelve = document.getElementById("12");
const thirteen = document.getElementById("13");
const fourteen = document.getElementById("14");
const fifteen = document.getElementById("15");
const sixteen = document.getElementById("16");
const score = document.getElementById("score")

//Puts the above in a 2D array, in a similar format to the grid property of the tetromino objects
const next = [[one, two, three, four],
              [five, six, seven, eight]];

const held = [[nine, ten, eleven, twelve],
              [thirteen, fourteen, fifteen, sixteen]]

const range = (n) => Array.from({"length": n}, (ignore, k) => k);

const cells = range(grid_rows).map(function () {
    const row = document.createElement("div");
    row.className = "row";

    const rows = range(grid_columns).map(function () {
        const cell = document.createElement("div");
        cell.className = "cell";

        row.append(cell);

        return cell;
    });

    grid.append(row);
    return rows;
});

const update_grid = function () {
    game.field.forEach(function (line, line_index) {
        line.forEach(function (block, column_index) {
            const cell = cells[line_index][column_index];
            cell.className = `cell ${block}`;
        });
    });

    Tetris.tetromino_coordiates(game.current_tetromino, game.position).forEach(
        function (coord) {
            try {
                const cell = cells[coord[1]][coord[0]];
                cell.className = (
                    `cell current ${game.current_tetromino.block_type}`
                );
            } catch (ignore) {

            }
        }
    );
};

const nextTetro = function (){
    let array = game.next_tetromino.grid//For ease of use
    //console.log(array)
    //Refreshes the grid
    next.forEach((row) => {
        row.forEach((cell) => {
            cell.className = "cell"
        })
    })
    //Loops through the game.next_tetromino.grid and updates the grid
    array.forEach((row, rowIndex) => {
        for (let i = 0; i < row.length; i++){
            if (row[i] != " " && row[i] != null){
                next[rowIndex][i].className = "cell current"
            } else {
                next[rowIndex][i].className = "cell"
            }
        }
    })
}

const heldTetro = function (){
    try {
        let array = game.held_tetromino.grid//For ease of use
        //console.log(array)
        //Refreshes the grid
        held.forEach((row) => {
            row.forEach((cell) => {
                cell.className = "cell"
            })
        })
        //Loops through the game.next_tetromino.grid and updates the grid
        array.forEach((row, rowIndex) => {
            for (let i = 0; i < row.length; i++){
                if (row[i] != " " && row[i] != null){
                    held[rowIndex][i].className = "cell current"
                } else {
                    held[rowIndex][i].className = "cell"
                }
            }
        }) 
    } catch (error) {
        
    }
}

// Don't allow the player to hold down the rotate key.
let key_locked = false;

document.body.onkeyup = function () {
    key_locked = false;
};

document.body.onkeydown = function (event) {
    if (!key_locked && event.key === "ArrowUp") {
        key_locked = true;
        game = Tetris.rotate_ccw(game);
    }
    if (event.key === "ArrowDown") {
        game = Tetris.soft_drop(game);
    }
    if (event.key === "ArrowLeft") {
        game = Tetris.left(game);
    }
    if (event.key === "ArrowRight") {
        game = Tetris.right(game);
    }
    if (event.key === " ") {
        game = Tetris.hard_drop(game);
    }
    if (event.key === "c") {
        if (game.can_hold == true){
            game = Tetris.hold(game);
        }
    }
    update_grid();
};

const timer_function = function () {
    game = Tetris.next_turn(game);
    nextTetro();//Calls the nextTetro function to display the next_tetromino's shape
    heldTetro();
    update_grid();
    setTimeout(timer_function, 500);
    console.log(game.held_tetromino)
};

setTimeout(timer_function, 500);

update_grid();
