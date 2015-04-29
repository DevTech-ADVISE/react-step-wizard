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