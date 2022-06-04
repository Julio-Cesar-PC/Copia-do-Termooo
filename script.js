import { PALAVRAS } from './palavras.js';

const board = document.querySelector('#board');
const keys = document.querySelectorAll('#keyboard-container button');

let vetTentativas = [[], [], [], [], [], []];
let tentativa = 0;
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

console.log(document.getElementById('row-2').children[4].id);

function keyboardListener() {
    
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const code = event.code;
        console.log(key + "\t" + code);
        if (code.includes('Key')) {
            updateGuessedWords(key);
            console.log(vetTentativas);
            return;
        }
        if (code === 'Backspace') {
            console.log('del ' + getCurrentSquare());
            handleDeleteLetter(getCurrentSquare() - 1);
            return;
        }
        if (code === 'Enter') {
            console.log('enter');
            handleSubmitWord();
            return;
        }
    });
    
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");
      
            if (letter === "enter") {
                console.log('enter');
                handleSubmitWord();
                return;
            }
      
            if (letter === "del") {
                console.log('del ' + getCurrentSquare());
                handleDeleteLetter(getCurrentSquare()-1);
                return;
            }
            
            console.log(letter);
            updateGuessedWords(letter);
            return letter;
        };
    }
}

function handleSubmitWord() {
    tentativa++;
}

function handleDeleteLetter(index) {
    if (index >= 0) {
        const pointer = document.getElementById(`row-${tentativa}`);
        pointer.children[index].innerHTML = '';
        vetTentativas[tentativa].pop();
        console.log(vetTentativas[tentativa]);
    }
}

function updateGuessedWords(letter) {
    if (getCurrentSquare() < 5) {
        const pointer = document.getElementById(`row-${tentativa}`);
        pointer.children[getCurrentSquare()].innerHTML = letter;
        vetTentativas[tentativa].push(letter);
        
    }
}


function getCurrentSquare() {
    return vetTentativas[tentativa].length;
}