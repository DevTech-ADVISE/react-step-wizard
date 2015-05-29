import React from 'react/addons';
import ReactStepWizard from '../lib/react-step-wizard.jsx';

describe('ReactStepWizard', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <ReactStepWizard/>
    );
  });

  it('should render', function() {
    expect(component.getDOMNode().className).toEqual('react-step-wizard');
  });
});
