var Game = React.createClass({
    elements: 3,
    matrix: {
        'letters': ['A', 'B', 'C'],
        'numbers': [1, 2, 3]
    },
    getInitialState: function() {
        return {
            turn: 'p1',
            winner: 'None'
        };
    },
    addValueToCounter: function(turn, value) {
        var valueArray = value.split('');
        var letter = valueArray[0];
        var number = valueArray[1];
        var counter = this.props.players[turn]['counter'];
        counter[letter]++;
        counter[number]++;

        if (
            this.oneLetterEachNumber(this.elements, this.matrix, counter) ||
            this.oneNumberEachLetter(this.elements, this.matrix, counter) ||
            this.eachNumberEachLetter(this.elements, this.matrix, counter)
        ) {
            this.setState({
                winner: turn
            });
        }
    },
    handleClick: function(turn, value) {
        this.addValueToCounter(turn, value);
        this.setState({
            turn: turn
        });
    },
    oneLetterEachNumber: function(elements, matrix, counter) {
        // always assume no winner
        var winner = false;
        for (var x = 0; x < elements; x++) {
            // first get the letter for each element: 0:A, 1:B, 2:C and so on..
            var letter = matrix['letters'][x];
            // check if the counter for this letter equals the number of elements
            // this is the first possibility to check for a winner
            if (elements === counter[letter]) {
                // now check each number and check if it equals 1
                // is that is the case, we have a winner.
                // if one number is not one we have no winner.
                for (var y = 0; y < elements; y++) {
                    var number = matrix['numbers'][y];
                    if (counter[number] === 0) {
                        break;
                    }
                    winner = true;
                }
            }
            // break the loop if one letter already won
            if (winner) {
                break;
            }
        }

        return winner;
    },
    oneNumberEachLetter: function(elements, matrix, counter) {
        // always assume no winner
        var winner = false;
        for (var x = 0; x < elements; x++) {
            var number = matrix['numbers'][x];
            // check if the counter for this letter equals the number of elements
            // this is the first possibility to check for a winner
            if (elements === counter[number]) {
                // now check each number and check if it equals 1
                // is that is the case, we have a winner.
                // if one number is not one we have no winner.
                for (var y = 0; y < elements; y++) {
                    var letter = matrix['letters'][y];
                    if (counter[letter] === 0) {
                        break;
                    }
                    winner = true;
                }
            }
            // break the loop if one number already won
            if (winner) {
                break;
            }
        }

        return winner;
    },
    eachNumberEachLetter: function(elements, matrix, counter) {
        // always assume no winner
        var winner = false;
        // first check if every letter was selected
        for (var x = 0; x < elements; x++) {
            var number = matrix['numbers'][x];
            var letter = matrix['letters'][x];
            // every combination has to be true in order to find a winner
            // so we can break the loop if we find false at any time
            console.log(counter[letter], '!==', 1, '||', counter[number], '!==', 1);
            if (counter[letter] !== 1 || counter[number] !== 1) {
                winner = false;
                break;
            }
            winner = true;
        }

        return winner;
    },
    render: function() {
        return (
            <div className="game">
                <div>Winner: {this.state.winner}</div>
                <div>Current turn: {this.state.turn}</div>
                <div>
                    <ElementRow letter={'A'} turn={this.state.turn} onClick={this.handleClick} />
                    <ElementRow letter={'B'} turn={this.state.turn} onClick={this.handleClick} />
                    <ElementRow letter={'C'} turn={this.state.turn} onClick={this.handleClick} />
                </div>
                <div>
                    <h1>Players</h1>
                    <h2>{this.props.players.p1.alias}</h2>
                    <h2>{this.props.players.p2.alias}</h2>
                </div>
            </div>
        );
    }
});

var ElementRow = React.createClass({
    handleClick: function(turn, value) {
        this.props.onClick(turn, value);
    },
    render: function() {
        return (
            <div className="row">
                <div>{this.props.turn}</div>
                <Element
                    value={this.props.letter + '1'}
                    turn={this.props.turn}
                    onClick={this.handleClick}
                />
                <Element
                    value={this.props.letter + '2'}
                    turn={this.props.turn}
                    onClick={this.handleClick}
                />
                <Element
                    value={this.props.letter + '3'}
                    turn={this.props.turn}
                    onClick={this.handleClick}
                />
            </div>
        );
    }
});

var Element = React.createClass ({
    getInitialState: function() {
        return {
            clicked: false,
            className: ''
        };
    },
    handleClick: function() {
        if (!this.state.clicked) {
            this.setState({
                clicked: true,
                className: (this.props.turn === 'p1' ? 'p2' : 'p1')
            });
            this.props.onClick(
                this.props.turn === 'p1' ? 'p2' : 'p1',
                this.props.value
            );
        }
    },
    render: function() {
        var className = this.state.className;
        return (
            <div className={'btn ' + className} onClick={this.handleClick}>
                <div>{this.props.turn}</div>
                {this.props.value}
            </div>
        );
    }
});

var players = {
    'p1': {
        alias: 'P1',
        counter: {
            'A': 0,
            'B': 0,
            'C': 0,
            '1': 0,
            '2': 0,
            '3': 0
        }
    },
    'p2': {
        alias: 'P2',
        counter: {
            'A': 0,
            'B': 0,
            'C': 0,
            '1': 0,
            '2': 0,
            '3': 0
        }
    }
};

ReactDOM.render(
    <Game players={players} />,
    document.getElementById('example')
);


/*
 * Determine if we have a winner
 */
function hasWon(elements, matrix, counter) {
    var winner = oneLetterEachNumber(elements, matrix, counter);
    if (winner) {
        return winner;
    }
    winner = oneNumberEachLetter(elements, matrix, counter);
    if (winner) {
        return winner;
    }
    winner = eachNumberEachLetter(elements, matrix, counter);

    return winner;
}

/*
 * Check if the winning combination ocurs:
 * 1 letter 3 times and each number 1 time.
 * e.g. A:3,1:1,2:1,3:1
 *
 * @param int elements
 * @param array matrix
 * @param array counter
 * @return bool
 */
function oneLetterEachNumber(elements, matrix, counter) {
    // always asume no winner
    var winner = false;
    for (var x = 0; x < elements.length; x++) {
        // first get the letter for each element: 0:A, 1:B, 2:C and so on..
        var letter = matrix['letters'][x];
        // check if the counter for this letter equals the number of elements
        // this is the first possibility to check for a winner
        if (elements === counter[letter]) {
            // now check each number and check if it equals 1
            // is that is the case, we have a winner.
            // if one number is not one we have no winner.
            for (var y = 0; y < elements.length; y++) {
                if (matrix['numbers'][y].length === 1) {
                    winner = true;
                }
            }
        }
        // break the loop if one letter already won
        if (winner) {
            break;
        }
    }

    return winner;
}

/*
 * Check if the winning combination ocurs:
 * 1 number 3 times and each number 1 time:
 * e.g. 1:3,A:1,B:1,C:1
 *
 * @param int elements
 * @param array matrix
 * @param array counter
 * @return bool
 */
function oneNumberEachLetter(elements, matrix, counter) {
    // always asume no winner
    var winner = false;
    for (var x = 0; x < elements.length; x++) {
        // check if the counter for this letter equals the number of elements
        // this is the first possibility to check for a winner
        if (elements === counter[matrix['numbers'][x]]) {
            // now check each number and check if it equals 1
            // is that is the case, we have a winner.
            // if one number is not one we have no winner.
            for (var y = 0; y < elements.length; y++) {
                if (matrix['letters'][y].length === 1) {
                    winner = true;
                }
            }
        }
        // break the loop if one number already won
        if (winner) {
            break;
        }
    }

    return winner;
}

/*
 * Check if the winning combination ocurs:
 * each letter 1 time and each number 1 time
 * e.g. A:1,B:1,C:1,1:1,2:1,3:1
 *
 * @param int elements
 * @param array matrix
 * @param array counter
 * @return bool
 */
function eachNumberEachLetter(elements, matrix, counter) {
    // always asume no winner
    var winner = false;
    // first check if every letter was selected
    for (var y = 0; y < elements.length; y++) {
        winner = (matrix['letters'][x].length === 1 && matrix['letters'][x].length === 1);
        // every combination has to be true in order to find a winner
        // so we can break the loop if we find false at any time
        if (!winner) {
            break;
        }
    }

    return winner;
}