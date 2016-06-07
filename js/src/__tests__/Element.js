jest.dontMock('../Element');

describe('Element', function() {

    var React = require('react');
    var ReactDOM = require('react-dom');
    var TestUtils = require('react-addons-test-utils');

    var Element;

    beforeEach(function() {
        Element = require('../Element');
    });

    it('should be rendered', function() {
        var element = TestUtils.renderIntoDocument(
            <Element value="A1" turn="p1" onClick={''} additionalClassName={''} iconName="times" />
        );

        expect(TestUtils.isCompositeComponent(element)).toBeTruthy();
    });

});
