var React = require('react');

/**
 * @class Element
 */
module.exports = React.createClass ({
    /**
     * Initial state of each Element is "Has not been clicked", "No class name"
     *
     * @returns {{clicked: boolean, className: string}}
     */
    getInitialState: function() {
        return {
            clicked: false,
            className: ''
        };
    },
    /**
     * On click the element retrieves the current player's name as class name
     * and the "clicked" state is set to true
     */
    handleClick: function() {
        if (!this.state.clicked) {
            this.setState({
                clicked: true,
                className: (this.props.turn === 'p1' ? 'p2' : 'p1'),
                iconName: (this.props.iconName === 'times' ? 'circle-o' : 'times')
            });
            this.props.onClick(
                this.props.turn === 'p1' ? 'p2' : 'p1',
                this.props.value,
                this.props.iconName === 'times' ? 'circle-o' : 'times'
            );
        }
    },
    /**
     * Renders each clickable element
     *
     * @returns {XML}
     */
    render: function() {
        var className = this.state.className;
        var iconName = this.state.iconName;
        return (
            <div className={'element ' + className + ' ' + this.props.additionalClassName}
                 onClick={this.handleClick}
            >
                <i className={'fa fa-4x fa-' + iconName} />
            </div>
        );
    }
});