var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var classNames = require('classnames');

var NavigationButton = createReactClass({
  propTypes: {
    stepData: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    isShown: PropTypes.bool.isRequired,
  },

  render: function () {
    var stepData = this.props.stepData;

    var description = null;

    if(stepData.description !== null) {
      description = (
        <p className="sw-description">
          {stepData.description}
        </p>
      );
    }

    var classes = classNames("sw-button", this.props.className, {"disabled": stepData.isUnreachable || !this.props.isShown});

    return (
      <button className={classes} onClick={this.props.onClick}>
        <h1 className="sw-title">{stepData.title}</h1>
        {description}
      </button>
    );
  },
});

module.exports = NavigationButton;
