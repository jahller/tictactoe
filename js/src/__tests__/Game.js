jest.dontMock('../Game');

describe('Game', function() {

    var React = require('react');
    var ReactDOM = require('react-dom');
    var TestUtils = require('react-addons-test-utils');

    var Game;

    beforeEach(function() {
        Game = require('../Game');
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

});
