jest.dontMock('../Game');
jest.dontMock('../ElementRow');
jest.dontMock('../Element');

describe('Game', function() {

    var React = require('react');
    var ReactDOM = require('react-dom');
    var TestUtils = require('react-addons-test-utils');

    var Game;
    var ElementRow;
    var Element;

    beforeEach(function() {
        Game = require('../Game');
        ElementRow = require('../ElementRow');
        Element = require('../Element');
    });

    it('should exist', function() {
        var game = TestUtils.renderIntoDocument( <Game /> );

        expect(TestUtils.isCompositeComponent(game)).toBeTruthy();
    });

    it('should show the start button on default', function() {
        var game = TestUtils.renderIntoDocument( <Game /> );

        var container = TestUtils.scryRenderedDOMComponentsWithClass(game, 'show');
        expect(container.length).toEqual(1);
        expect(container[0].textContent).toEqual('Let\'s play TicTacToeStart a new game');
    });

    it('should be possible to get to the enter P1 name screen after clicking "Start a new game"', function() {
        var game = TestUtils.renderIntoDocument( <Game /> );

        var buttons = TestUtils.scryRenderedDOMComponentsWithClass(game, 'btn');
        expect(buttons[0].textContent).toEqual('Start a new game');
        TestUtils.Simulate.click(buttons[0]);

        var container = TestUtils.scryRenderedDOMComponentsWithClass(game, 'show');
        expect(container.length).toEqual(1);
        expect(container[0].textContent).toEqual('Player 1: Please enter your nameSave');
    });

    it('should be possible to get to the enter P2 name screen after clicking "Save" on P1 name screen', function() {
        var game = TestUtils.renderIntoDocument( <Game /> );

        var buttons = TestUtils.scryRenderedDOMComponentsWithClass(game, 'btn');
        expect(buttons[0].textContent).toEqual('Start a new game');
        TestUtils.Simulate.click(buttons[0]);

        var container = TestUtils.scryRenderedDOMComponentsWithClass(game, 'show');
        expect(container.length).toEqual(1);
        expect(container[0].textContent).toEqual('Player 1: Please enter your nameSave');
        expect(buttons[1].textContent).toEqual('Save');
        TestUtils.Simulate.click(buttons[1]);

        container = TestUtils.scryRenderedDOMComponentsWithClass(game, 'show');
        expect(container.length).toEqual(1);
        expect(container[0].textContent).toEqual('Player 2: Please enter your nameSave');
    });

    it('should be possible to get to the Tic Tac Toe screen after saving P2 name', function() {
        var game = TestUtils.renderIntoDocument( <Game /> );

        var buttons = TestUtils.scryRenderedDOMComponentsWithClass(game, 'btn');
        expect(buttons[0].textContent).toEqual('Start a new game');
        TestUtils.Simulate.click(buttons[0]);

        var container = TestUtils.scryRenderedDOMComponentsWithClass(game, 'show');
        expect(container.length).toEqual(1);
        expect(container[0].textContent).toEqual('Player 1: Please enter your nameSave');
        expect(buttons[1].textContent).toEqual('Save');
        TestUtils.Simulate.click(buttons[1]);

        container = TestUtils.scryRenderedDOMComponentsWithClass(game, 'show');
        expect(container.length).toEqual(1);
        expect(container[0].textContent).toEqual('Player 2: Please enter your nameSave');
        expect(buttons[2].textContent).toEqual('Save');
        TestUtils.Simulate.click(buttons[2]);

        container = TestUtils.scryRenderedDOMComponentsWithClass(game, 'show');
        expect(container.length).toEqual(1);
        expect(container[0].textContent).toEqual('It\'s game timeP1 VS P2Restart');
    });

    it('should be possible to win the game', function() {
        var game = TestUtils.renderIntoDocument( <Game /> );
        var buttons = TestUtils.scryRenderedDOMComponentsWithClass(game, 'btn');
        expect(buttons.length).toEqual(5);
        var elements = TestUtils.scryRenderedDOMComponentsWithClass(game, 'element');
        expect(elements.length).toEqual(9);

        // Click "Start a new game"
        TestUtils.Simulate.click(buttons[0]);
        // Click "Save" name player 1
        TestUtils.Simulate.click(buttons[1]);
        // Click "Save" name player 2
        TestUtils.Simulate.click(buttons[2]);
        // Click the "Tic Tac Toe" fields until we have a winner
        TestUtils.Simulate.click(elements[0]);
        TestUtils.Simulate.click(elements[1]);
        TestUtils.Simulate.click(elements[3]);
        TestUtils.Simulate.click(elements[4]);
        TestUtils.Simulate.click(elements[6]);

        // The winner container should be shown
        container = TestUtils.scryRenderedDOMComponentsWithClass(game, 'show');
        expect(container[0].textContent).toEqual('AND THE WINNER ISP1Restart');
    });

});
