# react-step-wizard #

Step Wizard is comprised of two components: StepWizard (the main component) and Step (each step in the wizard). Step is a static property of StepWizard, and can be accessed with `StepWizard.Step`.

To view the demo, use the command `webpack` (install from npm--`npm install webpack -g`--if you don't have it) and open index.html.

## Properties ##

### StepWizard ###

(None yet)

### Step ###

* **title** (Required, string): The title that will be displayed on both the Step page and the navigation buttons.
* **description** (string, ""): If passed, it will be displayed on the both the Step page and the navigation buttons under the title.
* **onNext/onPrevious** (function(index), function(){}): Called when changing elements. If you change selected step using the pill selector up top, it will call each one in order.
* **isValid** (bool, true): Will update step wizard when changed. Does not allow progression beyond the first step with `isValid==false`, regardless of other steps' validity.

## Example Usage ##

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