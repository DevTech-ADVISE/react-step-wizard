var React = require('react');
var classNames = require('classnames');

var NavigationButton = React.createClass({
  propTypes: {
    stepData: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
  },

  render: function () {
    var classes = classNames("sw-button", this.props.className);

    var stepData = this.props.stepData;

    var description = null;

    if(this.props.stepData.description !== null) {
      description = (
        <p className="sw-description">
          {stepData.description}
        </p>
      );
    }

    return (
      <div className={classes} onClick={this.props.onClick}>
        <h1 className="sw-title">{stepData.title}</h1>
        {description}
      </div>
    );
  },
});

module.exports = NavigationButton;