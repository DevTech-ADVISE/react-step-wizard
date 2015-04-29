var react = require('react');


var NavigationBeads = React.createClass({
  getInitialState: function() {
    return {};
  },

  propTypes: {
    stepData: React.PropTypes.array.isRequired,
  },

  makeBead: function(step, index) {
    if(step.isCurrent) {
      return "X";
    }

    return "O";
  },

  render: function () {
    var beads = this.props.stepData.map(this.makeBead);

    beads = beads.join("---");

    return (
      <div className="sw-beads">
        {beads}
      </div>
    );
  },
});

module.exports = NavigationBeads;