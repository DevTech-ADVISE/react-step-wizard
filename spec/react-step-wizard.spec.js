var React = require('react');
var StepWizard = require('../src/react-step-wizard');
var Step = StepWizard.Step;
var TestUtils = require('react-dom/test-utils');

describe('ReactStepWizard', function() {
  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(
      <StepWizard>
        <Step title="Step 1">
          <p className="stepContent">Step 1</p>
        </Step>
        <Step title="Step 2">
          <p className="stepContent">Step 2</p>
        </Step>
      </StepWizard>
    );
  });

  it('should render', function() {
    var domComponent = TestUtils.findRenderedDOMComponentWithClass(component, 'sw-container');
    expect(domComponent.className).toEqual('sw-container');
  });
});
