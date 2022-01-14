// A+B starts the game, try to match the pattern. 

let started: boolean = false
let guessArray: number[] = []
let userGuess: number[] = []
let guessLength: number = 4
let repeated: boolean = false
basic.showIcon(IconNames.Happy)

input.onButtonPressed(Button.AB, function () {
    startGame()
})

input.onButtonPressed(Button.A, () => {
    if (started) {
        userGuess.push(1)
        aChoice()
        allLeds()
    }
    checkIfUserHasCompletedGuess()
})

input.onButtonPressed(Button.B, () => {
    if (started) {
        userGuess.push(0)
        bChoice()
        allLeds()
    }
    checkIfUserHasCompletedGuess()
})

function startGame() {
    started = true
    if (!repeated) guessArray = generateRandomArrayForGuessing(guessLength);
    for (let i = 0; i <= guessArray.length - 1; i++) {
        if (guessArray[i] == 0) {
            bChoice()
            basic.pause(500)
        } else {
            aChoice()
            basic.pause(500)
        }
        basic.showIcon(IconNames.Chessboard)
        if (i == guessArray.length - 1) {
            basic.showIcon(IconNames.Happy)
        }
    }
}

function generateRandomArrayForGuessing(len: Number) {
    let tempArr2: number[] = []
    for (let j = 0; j < len; j++) {
        let choice = Math.floor(Math.random() * 2)
        tempArr2.push(choice)
    }
    return tempArr2
}

function checkIfUserHasCompletedGuess() {
    if (userGuess.length >= guessLength) {
        started = false
        if (JSON.stringify(userGuess) === JSON.stringify(guessArray)) {
            basic.showIcon(IconNames.Yes)
            userGuess = []
            repeated = false
        } else {
            basic.showIcon(IconNames.No)
            userGuess = []
            repeated = true
        }
        startGame()
    }
}

function bChoice() {
    basic.showLeds(`
            . . . # #
            . . . # #
            . . . # #
            . . . # #
            . . . # #
            `)
}

function aChoice() {
    basic.showLeds(`
            # # . . .
            # # . . .
            # # . . .
            # # . . .
            # # . . .
            `)
}

function allLeds() {
    basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
}

basic.forever(function () {

})
