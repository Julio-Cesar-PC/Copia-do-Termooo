// Code by Julio Cesar P Cuencas
// https://github.com/Julio-Cesar-PC

import { PALAVRAS } from './palavras.js';

const board = document.querySelector('#board');
const keys = document.querySelectorAll('#keyboard-container button');

const firstDay = new Date('2022-06-05');
// console.log(firstDay);
const date = new Date();

function getWord(date) {
    return PALAVRAS[Math.floor((date-firstDay)/(1000*60*60*24))];
}

// console.log(getWord(date));

let vetAttempts = [[], [], [], [], [], []];
let attempts = 0;
createBoard();
keyboardListener();


let dailyWord = getWord(date).split('');

function checkFinal() {
    if (attempts === 5) {
        alert('Game Over!');
        window.location.reload();
    }
}

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
        // console.log(key + "\t" + code);
        if (code.includes('Key')) {
            updateAttempt(key);
            // console.log(vetAttempts);
            return;
        }
        if (code === 'Backspace') {
            // console.log('del ' + getCurrentSquare());
            deleteLetter(getCurrentSquare() - 1);
            return;
        }
        if (code === 'Enter') {
            // console.log('enter');
            submitAttempt();
            return;
        }
    });
    
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");
      
            if (letter === "enter") {
                // console.log('enter');
                submitAttempt();
                return;
            }
      
            if (letter === "del") {
                // console.log('del ' + getCurrentSquare());
                deleteLetter(getCurrentSquare()-1);
                return;
            }
            
            // console.log(letter);
            updateAttempt(letter);
            return letter;
        };
    }
}

function checkWord() {
    const word = vetAttempts[attempts].join('');
    // console.log(word);
    if (word === dailyWord.join('')) {
        alert('Parabéns, você acertou!');
        window.location.reload();
    }
}

function getColor(attempt) {
    const colorPallete = {
        'colorRight': '#3aa394',
        'colorPlace': '#d3ad69',
        'colorWrong': '#312a2c'
    }
    
    const word = [];

    for (let i = 0; i < dailyWord.length; i++) {
        word[i] = dailyWord[i];
    }

    // console.log(word + '\n' + dailyWord);

    for (let i = 0; i < 5; i++) {
        
        for (let j = 0; j < word.length; j++) {
            if (word.includes(attempt[i])) {
                document.getElementById(i + (5*attempts)).style = `background-color:${colorPallete.colorPlace};border-color:${colorPallete.colorPlace}`;
                word.splice(word.indexOf(attempt[i]), 1);
                // console.log(word);
            }
        }
        
        if (!(dailyWord.includes(attempt[i]))) {
            document.getElementById(i + (5*attempts)).style = `background-color:${colorPallete.colorWrong};border-color:${colorPallete.colorWrong}`;
        }

        if (attempt[i] === dailyWord[i]) {
            document.getElementById(i + (5*attempts)).style = `background-color:${colorPallete.colorRight};border-color:${colorPallete.colorRight}`;
        }
    }
}

function submitAttempt() {
    if (vetAttempts[attempts].length === 5) {
        getColor(vetAttempts[attempts]);
        checkWord();
        checkFinal();
        attempts++;
    } else {
        alert('Você precisa preencher todas as letras da palavra!');
    }
}

function deleteLetter(index) {
    if (index >= 0) {
        const pointer = document.getElementById(`row-${attempts}`);
        pointer.children[index].innerHTML = '';
        vetAttempts[attempts].pop();
        // console.log(vetAttempts[attempts]);
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