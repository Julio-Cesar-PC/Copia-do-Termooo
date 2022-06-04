import { PALAVRAS } from './palavras.js';

const board = document.querySelector('#board');
const keys = document.querySelectorAll('#keyboard-container button');

const omreT = {
    palavraDoDia: "omret",
}


let vetTentativa = [];
let tentativa = 0;
let point = 0;
criaBoard();
keyboardListener();


function criaBoard () {
    let id = 0;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('div');
        row.id = 'row-' + i;
        row.classList.add('row');
        board.appendChild(row);
        for (let j = 0; j < 5; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", id++);
            row.appendChild(square);
        }
        
    }
}

function keyboardListener() {
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const code = event.code;
        console.log(key + "\t" + code);
        updateGuessedWords(key);
        return key;
    });
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");
            //console.log(letter);
      
            if (letter === "enter") {
              //handleSubmitWord();
              return;
            }
      
            if (letter === "del") {
              //handleDeleteLetter();
              return;
            }
      
            updateGuessedWords(letter);
            console.log(letter);
            return letter;
        };
    }

}

function updateGuessedWords(letter) {
    if (point != 30) {
        const pointer = document.getElementById(`${point}`);
        pointer.innerHTML = letter;
        point++;
    }
}



