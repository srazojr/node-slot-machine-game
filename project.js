//1.figure out how much money the user wants to deposit
//2.determine lines to bet on
//3.collect bet amount.
//4. spin slot
//5. check if user won
//6. Give them money if they won
//7. play again
const prompt = require("prompt-sync")();

const ROWS = 3
const COLS = 3

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

const deposit = () => {
    let result = null;
    while (!result || result <= 0) {
        let depositAmount = prompt("Enter a deposit amount: $");
        result = parseFloat(depositAmount);//NaN is falsy
        if (!result || result <= 0) {
            console.log(`${depositAmount} is not a valid dollar amount.`)
        }
    }
    return result;
}

const getNumberOfLines = () => {
    let result = null;
    const BET_MAX = ROWS
    const BET_MIN = 1
    while (true) {
        let numberOfLines = prompt(`Enter the number of lines to bet on (${BET_MIN}-${BET_MAX}): `);
        result = parseInt(numberOfLines);//NaN is falsy
        if (!result || result < BET_MIN || result > BET_MAX) {
            console.log(`${numberOfLines} is not in the valid range.`)
        } else {
            return result;
        }
    }
}
const getBet = (bal, lines) => {
    let result = null;
    const BET_MAX = Math.floor(bal / lines)
    const BET_MIN = 1
    while (true) {
        let numberOfBet = prompt(`Enter your bet (per line) between ($${BET_MIN}-$${BET_MAX}): `);
        result = parseInt(numberOfBet);//NaN is falsy
        if (!result || result < BET_MIN || result > BET_MAX) {
            console.log(`${numberOfBet} is not in the valid range for your bet.`)
        } else {
            return result;
        }
    }
}
const spin = () => {
    const symbols = []
    //make an array of all values
    for (const [sym, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(sym)
        }
    }
    //console.log(symbols)
    //generate columns without repeats
    vals = []
    val_idx = -1
    for (let i = 0; i < COLS; i++) {
        vals.push([])
        val_idx++;
        for (let j = 0; j < ROWS; j++) {
            let randomNumber = null
            while (true) {
                randomNumber = Math.floor(Math.random() * symbols.length)
                if (!vals[val_idx].includes(randomNumber)) {
                    vals[val_idx].push(randomNumber)
                    break
                }
            }


        }
    }
    //convert index to symbol
    for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
            vals[i][j] = symbols[vals[i][j]]
        }
    }
    //console.log(vals)
    return vals;


}

const transposeReel = (reels) => {
    let newArr = []
    for (let i = 0; i < ROWS; i++) {
        newArr.push([])
        for (let j = 0; j < COLS; j++) {
            newArr[i].push(reels[j][i])
        }


    }
    //console.log(newArr)
    return newArr;

}
const findWinnersAndprintReel = (reels) => {
    retval = []
    for (row of reels) {
        rowString = "| |"
        val = row[0]
        match = true
        for (col of row) {
            rowString += `${col}| |`
            if (col != val) {
                match = false;
            }
        }
        if (match) {
            rowString += " *" + val
            retval.push(val)
        }
        console.log(rowString)
    }
    return retval
}

const calculateWinnings = (winners) => {
    return winners.reduce(
        (acc, val) => {
            return acc + SYMBOLS_VALUES[val]
        }, 0
    )

}
let balance = deposit()
//const numberOfLines = getNumberOfLines()
while (balance > 0) {
    const bet = getBet(balance, 1)
    balance -= bet
    const reels = spin()
    tReel = transposeReel(reels)
    winners = findWinnersAndprintReel(tReel)
    winnings = calculateWinnings(winners) * bet
    balance += winnings
    console.log(`You won ${winnings}. Your balance is ${balance}`)
}
console.log("You are out of money. Thanks for playing. ")