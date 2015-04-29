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
    //later
  },


  render: function () {
    return (
      <div className="sw-container">
        {this.props.children}
      </div>
    );
  },
});

module.exports = StepWizard;