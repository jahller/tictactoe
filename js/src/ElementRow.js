var React = require('react');

var Element = require('./Element');

/**
 * @class ElementRow
 */
module.exports = React.createClass({
    /**
     * Delegates the turn and clicked value to the parent Game class
     *
     * @param {string} turn
     * @param {string} value
     * @param {string} iconName
     */
    handleClick: function(turn, value, iconName) {
        this.props.onClick(turn, value, iconName);
    },
    /**
     * Renders each of the elements
     *
     * @returns {XML}
     */
    render: function() {
        return (
            <div className={'elementRow ' + this.props.additionalClassName }>
                <Element
                    value={this.props.letter + '1'}
                    turn={this.props.turn}
                    onClick={this.handleClick}
                    additionalClassName={'first'}
                    iconName={this.props.iconName}
                />
                <Element
                    value={this.props.letter + '2'}
                    turn={this.props.turn}
                    onClick={this.handleClick}
                    additionalClassName={''}
                    iconName={this.props.iconName}
                />
                <Element
                    value={this.props.letter + '3'}
                    turn={this.props.turn}
                    onClick={this.handleClick}
                    additionalClassName={''}
                    iconName={this.props.iconName}
                />
            </div>
        );
    }
});