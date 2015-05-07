var React = require('react');
var StepWizard = require('./src/stepWizard.js');
var Step = StepWizard.Step;

function onNext(id) {
  console.log(id + " -> " + (id + 1));
}

function onPrevious(id) {
  console.log((id - 1) + " <- " + id);
}

React.render(
  <StepWizard>
    <Step title="The First" onNext={onNext} onPrevious={onPrevious}>
      <p>This is the first step</p>
      <p>This step is pretty cool, I guess</p>
    </Step>
    <Step title="The Second" onNext={onNext} onPrevious={onPrevious}>
      <p>This is the second step, it has an input tag</p>
      <input type="text"/>
    </Step>
    <Step title="The Last" description="Whoa aren't descriptions neat?" onNext={onNext} onPrevious={onPrevious}>
      <p>This is the final step.</p>
      <input type="button" value="Here's a button"/>
    </Step>
  </StepWizard>,
  document.getElementById('content'));