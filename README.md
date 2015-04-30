# react-step-wizard #

Step Wizard is comprised of two components: StepWizard (the main component) and Step (each step in the wizard). Step is a static property of StepWizard, and can be accessed with `StepWizard.Step`.

## Properties ##

### StepWizard ###

(None yet)

### Step ###

* **title** (Required, string): The title that will be displayed on both the Step page and the navigation buttons.
* **description** (string): If passed, it will be displayed on the both the Step page and the navigation buttons under the title.

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

## CSS Information ##

    <div class="sw-container">
      <div class="sw-beads"/>
      <div class="sw-step">
        <h1 class="sw-title" />
        <p class="sw-description" /> <!-- only if included -->
        <!-- Content Goes Here -->
      </div>
      
      <div class="sw-navigation">
        <!-- See "Buttons" below -->
      </div>
    </div>

### Buttons ###

If the step is the first or last, there will only be one button:

    <div class="sw-button sw-button-full"/>

Otherwise, there will be two buttons:

    <div class="sw-button sw-button-left"/>
    <div class="sw-button sw-button-right"/>