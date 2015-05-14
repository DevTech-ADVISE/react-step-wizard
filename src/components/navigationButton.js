var React = require('react');
var classNames = require('classnames');

var NavigationButton = React.createClass({
  propTypes: {
    stepData: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
    isShown: React.PropTypes.bool.isRequired,
  },

  render: function () {
    var classes = classNames("sw-button", this.props.className);

    var stepData = this.props.stepData;

    var description = null;

    if(stepData.description !== null) {
      description = (
        <p className="sw-description">
          {stepData.description}
        </p>
      );
    }

    return (
      <button className={classes} disabled={stepData.isUnreachable || !this.props.isShown} onClick={this.props.onClick}>
        <h1 className="sw-title">{stepData.title}</h1>
        {description}
      </button>
    );
  },
});

module.exports = NavigationButton;