document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score')
    const width = 8;
    const squares = [];
    let score = 0
    const highScoreElement = document.querySelector("#high-number");

    let highScore = localStorage.getItem("high-score")  || 0;

    let finalEmoji = document.querySelector("#finalEmoji");



    const emojiColors = [
        'url("Images/emoji_8-removebg-preview.png")',
        'url("Images/emoji_7-removebg-preview.png")',
        'url("Images/emoji_3-removebg-preview.png")',
        'url("Images/emoji_9-removebg-preview.png")',
        'url("Images/emoji_5-removebg-preview.png")',
        'url("Images/emoji_6-removebg-preview.png")'
     
       
    ]
    

    function createBoard() {
        for(let i = 0; i < width*width; i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', true);
            square.setAttribute('id', i)
            grid.appendChild(square)
            const randomColors = Math.floor(Math.random() * emojiColors.length)
            square.style.backgroundImage = emojiColors[randomColors];
            squares.push(square);
        }
    }
    createBoard();



    // Making Function
    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('drop', dragDrop));


    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    function dragStart() {
        colorBeingDragged = this.style.backgroundImage;
        squareIdBeingDragged = parseInt(this.id);
        console.log(colorBeingDragged)
        console.log(this.id, 'dragstart')
    }

    

    function dragOver(e) {
        e.preventDefault();
        console.log(this.id, 'dragover')
    }

    function dragEnter() {
        console.log(this.id, 'dragenter')
    }

    function dragLeave() {
        console.log(this.id, 'dragleave')
    }

    function dragDrop() {
        colorBeingReplaced = this.style.backgroundImage;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.background = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
        console.log(colorBeingReplaced)
        console.log(this.id, 'dragDrop')
    }



    function dragEnd(e) {
        console.log(this.id, 'dragend')
        //What is a valid move



        let validMoves = [
            squareIdBeingDragged -1,
            squareIdBeingDragged -width,
            squareIdBeingDragged +1,
            squareIdBeingDragged +width
        ]

        let validMove = validMoves.includes(squareIdBeingReplaced)

        if(squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null;
        } else if(squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
        } else {
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
        }
    }


//Drop candies once some have been cleared
function moveDown() {
    for(i = 0; i < 55; i++) {
        if(squares[i + width].style.backgroundImage === '') {
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            if(isFirstRow && squares[i].style.backgroundImage === '') {
                let randomColor = Math.floor(Math.random() * emojiColors.length)
                squares[i].style.backgroundImage = emojiColors[randomColor];
            }
        }
    }
}


//Cheking for matches
//Check for row of Four

    function checkRowforFour() {
        for(i = 0; i < 60; i++) {
            let rowOfFour = [i, i+1, i+2, i+3]
            let decideColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage  === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 29, 30, 39, 45, 46, 47, 53, 54, 55]
            if(notValid.includes(i)) continue

            if(rowOfFour.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score

                             
highScore = score >= highScore? score : highScore
localStorage.setItem("high-score", highScore);

highScoreElement.innerText = highScore;



                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

checkRowforFour();

    function checkColumnforFour() {
        for(i = 0; i < 47; i++) {
            let columnOfFour = [i, i+width, i+width*2, i+width*3]
            let decideColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage  === ''

            if(columnOfFour.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score

                             
highScore = score >= highScore? score : highScore
localStorage.setItem("high-score", highScore);

highScoreElement.innerText = highScore;
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    checkColumnforFour();

    //Cheking for matches
//Check for row of Three

function checkRowforThree() {
    for(i = 0; i < 61; i++) {
        let rowOfThree = [i, i+1, i+2]
        let decideColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage  === ''

        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if(notValid.includes(i)) continue

        if(rowOfThree.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
                       
highScore = score >= highScore? score : highScore
localStorage.setItem("high-score", highScore);

highScoreElement.innerText = highScore;
            rowOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

checkRowforThree();

function checkColumnforThree() {
    for(i = 0; i < 47; i++) {
        let columnOfThree = [i, i+width, i+width*2]
        let decideColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage  === ''

        if(columnOfThree.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
                
highScore = score >= highScore? score : highScore
localStorage.setItem("high-score", highScore);

highScoreElement.innerText = highScore;
            columnOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

checkColumnforThree();


window.setInterval(function() {
    moveDown();
     checkRowforFour();
    checkColumnforFour();
    checkRowforThree();
    checkColumnforThree();
}, 100)



var duration = 60;
const gameOverDashBoard = document.querySelector('.gameOverDashBoard');
const gameOverScore = document.getElementById("gameOverScore");
// const gameOverHighScore = document.getElementById("gameOverHighScore");
var btn = document.getElementById('replay');

var setTime = setInterval(function() {
    duration -= 1;
    document.getElementById('time').innerHTML = duration + 's';
    let now =document.getElementById('gameOverScore').innerHTML = score;
    let always = document.getElementById('gameOverHighScore').innerHTML = highScore;

    if(now == always) {
        finalEmoji.src = "images/Celebration.gif";
    } else if(now > always / "1.5") {
        finalEmoji.src = "images/sad.gif";
    } else {
        finalEmoji.src = "images/poor.gif"
    }

    if(duration === 0) {
        gameOverDashBoard.style.display = 'block'
            clearInterval(setTime)
            btn.onclick = () => {
                window.location.reload()
                gameOverDashBoard.style.display = 'none'
            }

    } 

    var timeCon = document.getElementById('time');
    if(duration === 10) {
        timeCon.style.backgroundColor = 'red';
    }
}, 1000)





})