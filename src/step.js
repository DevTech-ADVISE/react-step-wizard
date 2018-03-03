var React = require('react');
var createReactClass = require('create-react-class');
var PropTypes = require('prop-types');
var classNames = require('classnames');

var Step = createReactClass({
  getInitialState: function() {
    return {};
  },

  getDefaultProps: function() {
    return {
      description: null,
      isActive: false,
      onNext: function(){},
      onPrevious: function(){},
      onError: function(){},
      isValid: true
    };
  },

  propTypes: {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    isActive: PropTypes.bool,
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
    onError: PropTypes.func,
    isValid: PropTypes.bool,
  },

  render: function () {
    var description = null;

    var classes = classNames(
      "sw-step",
      this.props.className,
      {"sw-active": this.props.isActive}
    );

    if(this.props.description) {
      description = (<div className="sw-header"><p className="sw-description">{this.props.description}</p></div>)
    }
  
    return (
      <div className={classes}>
        <div className="overflow-y">
          {this.props.children}
        </div>
      </div>
    );
  },
});

module.exports = Step;
