var ReactDOM = require('react-dom');
var React = require('react');

var Game = require('./Game');

/**
 * Renders the game in the element with the ID "content"
 */
ReactDOM.render(
    <Game />,
    document.getElementById('content')
);