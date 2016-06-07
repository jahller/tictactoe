jest.dontMock('../ElementRow');
jest.dontMock('../Element');

describe('ElementRow', function() {

    var React = require('react');
    var ReactDOM = require('react-dom');
    var TestUtils = require('react-addons-test-utils');

    var ElementRow;
    var Element;

    beforeEach(function() {
        ElementRow = require('../ElementRow');
        Element = require('../Element');
    });

    it('should exist', function() {
        var elementRow = TestUtils.renderIntoDocument(
            <ElementRow letter="A" turn="p1" onClick={''} additionalClassName={''} iconName="times" />
        );

        expect(TestUtils.isCompositeComponent(elementRow)).toBeTruthy();
    });

    it('should render a element row with three elements', function() {
        var elementRow = TestUtils.renderIntoDocument(
            <ElementRow letter="A" turn="p1" onClick={''} additionalClassName={''} iconName="times" />
        );

        var elements = TestUtils.scryRenderedDOMComponentsWithClass(elementRow, 'element');
        expect(elements.length).toEqual(3);
    });

});
