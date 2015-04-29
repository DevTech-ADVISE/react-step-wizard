var React = require('react');
var StepWizard = require('./src/stepWizard.js');
var Step = StepWizard.Step;

React.render(
  <StepWizard>
    <Step title="The First">
      <p>This is the first step</p>
      <p>This step is pretty cool, I guess</p>
    </Step>
    <Step title="The Second">
      <p>This is the second step, it has an input tag</p>
      <input type="text"/>
    </Step>
    <Step title="The Last" description="Whoa aren't descriptions neat?">
      <p>This is the final step.</p>
      <input type="button" value="Here's a button"/>
    </Step>
  </StepWizard>,
  document.getElementById('content'));