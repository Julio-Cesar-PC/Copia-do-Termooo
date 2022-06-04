import { PALAVRAS } from './palavras.js';

const board = document.querySelector('#board');
const keys = document.querySelectorAll('#keyboard-container button');

let vetAttempts = [[], [], [], [], [], []];
let attempts = 0;
createBoard();
keyboardListener();


function createBoard () {
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
        if (code.includes('Key')) {
            updateAttempt(key);
            console.log(vetAttempts);
            return;
        }
        if (code === 'Backspace') {
            console.log('del ' + getCurrentSquare());
            deleteLetter(getCurrentSquare() - 1);
            return;
        }
        if (code === 'Enter') {
            console.log('enter');
            submitAttempt();
            return;
        }
    });
    
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");
      
            if (letter === "enter") {
                console.log('enter');
                submitAttempt();
                return;
            }
      
            if (letter === "del") {
                console.log('del ' + getCurrentSquare());
                deleteLetter(getCurrentSquare()-1);
                return;
            }
            
            console.log(letter);
            updateAttempt(letter);
            return letter;
        };
    }
}

function submitAttempt() {
    
    attempts++;
}

function deleteLetter(index) {
    if (index >= 0) {
        const pointer = document.getElementById(`row-${attempts}`);
        pointer.children[index].innerHTML = '';
        vetAttempts[attempts].pop();
        console.log(vetAttempts[attempts]);
    }
}

function updateAttempt(letter) {
    if (getCurrentSquare() < 5) {
        const pointer = document.getElementById(`row-${attempts}`);
        pointer.children[getCurrentSquare()].innerHTML = letter;
        vetAttempts[attempts].push(letter);
        
    }
}

function getCurrentSquare() {
    return vetAttempts[attempts].length;
}