var react = require('react');
var Step = require('./step.js');


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

  getBeads: function() {
    var beads = this.props.children.map(function(child, index) {
      if(index === this.state.currentStepIndex) {
        return "X";
      }

      return "O";
    }, this);

    return (<div className="sw-beads">{beads.join("---")}</div>);
  },

  render: function () {
    var beads = this.getBeads();
    var currentStep = this.props.children[this.state.currentStepIndex];

    return (
      <div className="sw-container">
        {beads}
        {currentStep}
        <div className="sw-navigation">
          <input type="button" value="Previous" onClick={this.onClickPrev}/>
          <input type="button" value="Next" onClick={this.onClickNext}/>
        </div>
      </div>
    );
  },
});

module.exports = StepWizard;