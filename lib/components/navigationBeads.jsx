var React = require('react');
var PillSelector = require('react-pill-selector');
var classNames = require('classnames');

var NavigationBeads = React.createClass({
  getInitialState: function() {
    return {};
  },

  propTypes: {
    stepData: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func.isRequired,
    selectedIndex: React.PropTypes.number.isRequired,
  },

  makeBead: function(step, index) {
    var classes = classNames("sw-bead", {"sw-bead-unreachable": step.isUnreachable});
    var isDisabled = false;//step.isUnreachable;
    return (
      <li key={index} className={classes} isDisabled={isDisabled}>
        {step.title}
      </li>
    );
  },

  onItemClick: function(id) {
    this.props.onClick(id);
  },

  render: function () {
    var beads = this.props.stepData.map(this.makeBead, this);
    
    return (
      <PillSelector
        callClickOnLoad={false}
        onItemClicked={this.onItemClick}
        selectedIndex={this.props.selectedIndex}
        isManaged={true}>
        {beads}
      </PillSelector>
    );
  },
});

module.exports = NavigationBeads;