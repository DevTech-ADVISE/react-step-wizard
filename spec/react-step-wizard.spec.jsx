import React from 'react/addons';
import StepWizard from '../lib/react-step-wizard.jsx';
var Step = StepWizard.Step;

describe('ReactStepWizard', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
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
    expect(component.getDOMNode().className).toEqual('sw-container');
  });
});
