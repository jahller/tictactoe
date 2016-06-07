var React = require('react');

var ElementRow = require('./ElementRow');

/**
 * @class Game
 */
module.exports = React.createClass({
    /** @var {int} elements - number of elements per side */
    elements: 3,
    /** @var {array} matrix - game matrix with all numbers and letters */
    matrix: {
        'letters': ['A', 'B', 'C'],
        'numbers': [1, 2, 3]
    },
    /**
     * The initial state of the game is "No winner", "P1 has first turn"
     *
     * @returns {object}
     */
    getInitialState: function() {
        return {
            turn: 'p1',
            winner: 'None',
            gameState: 'stopped',
            aliasP1: 'P1',
            aliasP2: 'P2',
            iconName: 'times',
            counter: {
                'p1': {
                    'A': 0,
                    'B': 0,
                    'C': 0,
                    '1': 0,
                    '2': 0,
                    '3': 0
                },
                'p2': {
                    'A': 0,
                    'B': 0,
                    'C': 0,
                    '1': 0,
                    '2': 0,
                    '3': 0
                }
            }
        };
    },
    /**
     * Add the value to the players counter
     *
     * @param {string} turn
     * @param {string} value
     */
    addValueToCounter: function(turn, value) {
        var valueArray = value.split('');
        var letter = valueArray[0];
        var number = valueArray[1];
        var counter = this.state.counter[turn];
        counter[letter]++;
        counter[number]++;

        if (
            this.oneLetterEachNumber(this.elements, this.matrix, counter) ||
            this.oneNumberEachLetter(this.elements, this.matrix, counter) ||
            this.eachNumberEachLetter(this.elements, this.matrix, counter)
        ) {
            this.setState({
                winner: turn === 'p1' ? 'p2' : 'p1',
                gameState: 'winner'
            });
        }
    },
    enterNameP1: function() {
        this.setState({
            gameState: 'selectNameP1'
        })
    },
    enterNameP2: function() {
        this.setState({
            gameState: 'selectNameP2'
        })
    },
    startGame: function() {
        this.setState({
            gameState: 'started'
        })
    },
    /**
     * Simply reload the page to reset the whole game
     */
    restartGame: function() {
        location.reload()
    },
    /**
     * Add the clicked value to the counter and change the turn
     *
     * @param {string} turn
     * @param {string} value
     * @param {string} iconName
     */
    handleClick: function(turn, value, iconName) {
        this.addValueToCounter(turn, value);
        this.setState({
            turn: turn,
            iconName: iconName
        });
    },
    changeNamePlayer1: function(event) {
        this.setState({aliasP1: event.target.value});
    },
    changeNamePlayer2: function(event) {
        this.setState({aliasP2: event.target.value});
    },
    /**
     * Check if there is a winner in the oneLetterEachNumber pattern
     *
     * @param {int} elements
     * @param {array} matrix
     * @param {array} counter
     * @returns {boolean}
     */
    oneLetterEachNumber: function(elements, matrix, counter) {
        var winner = false;
        for (var x = 0; x < elements; x++) {
            /*
             * First get the letter for each element: 0:A, 1:B, 2:C and so on..
             */
            var letter = matrix['letters'][x];
            /*
             * Check if the counter for this letter equals the number of elements
             * this is the first possibility to check for a winner
             */
            if (elements === counter[letter]) {
                /*
                 * Now check each number and check if it equals 1.
                 * Is that is the case, we have a winner.
                 * If one number is not 1, we have no winner.
                 */
                for (var y = 0; y < elements; y++) {
                    var number = matrix['numbers'][y];
                    if (counter[number] === 0) {
                        break;
                    }
                    winner = true;
                }
            }
            /*
             * Break the loop if one letter already won
             */
            if (winner) {
                break;
            }
        }

        return winner;
    },
    /**
     * Check if there is a winner in the oneNumberEachLetter pattern
     *
     * @param {int} elements
     * @param {array} matrix
     * @param {array} counter
     * @returns {boolean}
     */
    oneNumberEachLetter: function(elements, matrix, counter) {
        var winner = false;
        for (var x = 0; x < elements; x++) {
            var number = matrix['numbers'][x];
            /*
             * Check if the counter for this number equals the number of elements.
             */
            if (elements === counter[number]) {
                /*
                 * Now check each letter and check if it equals 1.
                 * If that is the case, we have a winner.
                 * If one number is not 1, we have no winner.
                 */
                for (var y = 0; y < elements; y++) {
                    var letter = matrix['letters'][y];
                    if (counter[letter] === 0) {
                        break;
                    }
                    winner = true;
                }
            }
            /*
             * Break the loop if one number already won
             */
            if (winner) {
                break;
            }
        }

        return winner;
    },
    /**
     * Check if there is a winner in the eachNumberEachLetter pattern
     *
     * @param {int} elements
     * @param {array} matrix
     * @param {array} counter
     * @returns {boolean}
     */
    eachNumberEachLetter: function(elements, matrix, counter) {
        var winner = false;
        /*
         * First check, if every letter was selected
         */
        for (var x = 0; x < elements; x++) {
            var number = matrix['numbers'][x];
            var letter = matrix['letters'][x];
            /*
             * Every combination has to be true in order to find a winner
             * so we can break the loop if we find false at any time
             */
            if (counter[letter] !== 1 || counter[number] !== 1) {
                winner = false;
                break;
            }
            winner = true;
        }

        return winner;
    },
    /**
     * Game render function
     *
     * @returns {XML}
     */
    render: function() {
        return (
            <div className={'game container-fluid'}>
                <div className={(this.state.gameState === 'stopped' ? 'show' : 'hide') + ' row'}>
                    <div className="col-lg-12">
                        <h1>Let's play TicTacToe</h1>
                        <h2><i className="fa fa-gamepad fa-5x" aria-hidden="true" /></h2>
                        <a role="button"
                           href="#"
                           className="btn btn-default btn-lg"
                           onClick={this.enterNameP1}
                        >
                            Start a new game
                        </a>
                    </div>
                </div>
                <div className={(this.state.gameState === 'selectNameP1' ? 'show' : 'hide') + ' row'}>
                    <div className="col-lg-12 center-block">
                        <h2><i className="fa fa-user fa-5x blue" aria-hidden="true" /></h2>
                        <h1>Player 1: Please enter your name</h1>
                        <div className={'form-group'}>
                            <input type="text"
                                   className={'form-control'}
                                   value={this.state.aliasP1}
                                   onChange={this.changeNamePlayer1}
                            />
                        </div>
                        <button type="submit"
                                className={'btn btn-default'}
                                onClick={this.enterNameP2}
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className={(this.state.gameState === 'selectNameP2' ? 'show' : 'hide') + ' row'}>
                    <div className="col-lg-12">
                        <h2><i className="fa fa-user fa-5x red" aria-hidden="true" /></h2>
                        <h1>Player 2: Please enter your name</h1>
                        <div className={'form-group'}>
                            <input type="text"
                                   className={'form-control'}
                                   value={this.state.aliasP2}
                                   onChange={this.changeNamePlayer2}
                            />
                        </div>
                        <button type="submit"
                                className={'btn btn-default'}
                                onClick={this.startGame}
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className={(this.state.gameState === 'started' ? 'show' : 'hide') + ' row'}>
                    <div className="col-lg-12">
                        <div className="well well-lg">
                            <div className="matrix">
                                <ElementRow letter={'A'}
                                            turn={this.state.turn}
                                            onClick={this.handleClick}
                                            additionalClassName={'first'}
                                            iconName={this.state.iconName}
                                />
                                <ElementRow letter={'B'}
                                            turn={this.state.turn}
                                            onClick={this.handleClick}
                                            additionalClassName={''}
                                            iconName={this.state.iconName}
                                />
                                <ElementRow letter={'C'}
                                            turn={this.state.turn}
                                            onClick={this.handleClick}
                                            additionalClassName={''}
                                            iconName={this.state.iconName}
                                />
                                <div className="clearfix" />
                            </div>
                            <div>
                                <h1>It's game time</h1>
                                <h2>
                                    <span className="blue">
                                        {this.state.aliasP1}
                                    </span> VS <span className="red">{this.state.aliasP2}</span>
                                </h2>
                            </div>
                            <div>
                                <button className={'btn btn-default'}
                                        onClick={this.restartGame}
                                >
                                    Restart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={(this.state.gameState === 'winner' ? 'show' : 'hide') + ' row'}>
                    <div className="col-lg-12">
                        <h1>AND THE WINNER IS</h1>
                        <h1 className={this.state.winner === 'p1' ? 'blue' : 'red'}>
                            {this.state['alias' + this.state.winner.toUpperCase()]}
                        </h1>
                        <h2><i className="fa fa-trophy fa-5x" aria-hidden="true" /></h2>
                        <button className={'btn btn-default'}
                                onClick={this.restartGame}
                        >
                            Restart
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});