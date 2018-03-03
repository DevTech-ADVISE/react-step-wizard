var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var PillSelector = require('react-pill-selector');
var classNames = require('classnames');

var NavigationBeads = createReactClass({
  getInitialState: function() {
    return {};
  },

  propTypes: {
    stepData: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number.isRequired,
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
