var react = require('react');
var Step = require('./step.js');
var NavigationButton = require('./components/navigationButton.js');
var NavigationBeads = require('./components/navigationBeads.js');


var StepWizard = React.createClass({
  statics: {
    Step: Step,
  },

  getInitialState: function() {
    return {currentStepIndex: 0};
  },

  getDefaultProps: function() {
    return {

    };
  },

  propTypes: {

  },

  componentWillMount: function() {
    this.validateChildren();
  },

  validateChildren: function() {
    React.Children.forEach(this.props.children, function(child) {
      var type = child.type;

      if(typeof type !== "string") {
        type = type.displayName;
      }

      if(type !== "Step") {
        throw new Error(type + " is not a Step component");
      }
    });

    var childrenCount = React.Children.count(this.props.children);

    if(childrenCount <= 1) {
      throw new Error("You must supply more than 1 Step child");
    }
  },

  onClickNext: function() {
    var stepIndex = this.state.currentStepIndex;
    var maxIndex = React.Children.count(this.props.children) - 1;

    stepIndex = Math.min(stepIndex + 1, maxIndex);
    
    this.moveToPage(stepIndex);
  },

  onClickPrev: function() {
    var stepIndex = this.state.currentStepIndex;

    stepIndex = Math.max(stepIndex - 1, 0);
    
    this.moveToPage(stepIndex);
  },

  moveToPage: function(stepIndex) {
    var minIndex = 0;
    var maxIndex = React.Children.count(this.props.children) - 1;

    if(stepIndex > maxIndex) {
      console.warn("stepIndex was " + stepIndex + ", greater than maxIndex of " + maxIndex + ". Setting stepIndex to " + maxIndex + ".");
      stepIndex = maxIndex;
    } else if(stepIndex < minIndex) {
      console.warn("stepIndex was " + stepIndex + ", greater than minIndex of " + minIndex + ". Setting stepIndex to " + minIndex + ".");
      stepIndex = minIndex;
    }

    this.setState({currentStepIndex: stepIndex});
  },

  getStepData: function(step, index) {
    return {
      title: step.props.title,
      description: step.props.description,
      index: index,
      isCurrent: index === this.state.currentStepIndex,
    };
  },

  getBeads: function() {
    var childrenData = this.props.children.map(this.getStepData, this);

    return (
      <NavigationBeads stepData={childrenData} />
    );
  },

  getStepDataAt: function(index) {
    var minIndex = 0;
    var maxIndex = React.Children.count(this.props.children) - 1;

    if(index < minIndex || index > maxIndex) {
      return null;
    }

    var step = this.props.children[index];

    return this.getStepData(step, index);
  },

  makeNavButton: function(buttonData, onClick, className) {
    return (
      <NavigationButton
        stepData={buttonData}
        onClick={onClick}
        className={className}/>
    )
  },

  getNavigation: function() {
    var index = this.state.currentStepIndex;

    var prevStepData = this.getStepDataAt(index - 1);
    var nextStepData = this.getStepDataAt(index + 1);

    var prevButton = null;
    var nextButton = null;

    if(prevStepData === null) {
      nextButton = this.makeNavButton(nextStepData, this.onClickNext, "sw-button-full");
    } else if(nextStepData === null) {
      prevButton = this.makeNavButton(prevStepData, this.onClickPrev, "sw-button-full");
    } else {
      prevButton = this.makeNavButton(prevStepData, this.onClickPrev, "sw-button-left");
      nextButton = this.makeNavButton(nextStepData, this.onClickNext, "sw-button-right");
    }

    return (
      <div className="sw-navigation">
        {prevButton}
        {nextButton}
      </div>
    );
  },

  render: function () {
    var beads = this.getBeads();
    var currentStep = this.props.children[this.state.currentStepIndex];
    var navigation = this.getNavigation();

    return (
      <div className="sw-container">
        {beads}
        {currentStep}
        {navigation}
      </div>
    );
  },
});

module.exports = StepWizard;