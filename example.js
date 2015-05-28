var React = require('react');
var StepWizard = require('./lib/index.js');
var Step = StepWizard.Step;

function onNext(id) {
  console.log(id + " -> " + (id + 1));
}

function onPrevious(id) {
  console.log((id - 1) + " <- " + id);
}

var App = React.createClass({
  getInitialState: function() {
    return {
      isButtonPressed: false,
      hasText: false,
    };
  },

  onTextChange: function() {
    var value = this.refs.textInput.getDOMNode().value;
    this.setState({hasText: value.length > 0});
  },

  onPress: function() {
    this.setState({isButtonPressed: true});
  },

  render: function() {
    return (
      <StepWizard>
        <Step title="The First" onNext={onNext} onPrevious={onPrevious}>
          <p>This is the first step</p>
          <p>This step is pretty cool, I guess</p>
        </Step>
        <Step title="The Second"
          onNext={onNext}
          onPrevious={onPrevious}
          isValid={this.state.hasText}>
          <p>This is the second step, it has an input tag. It needs text before you can go on.</p>
          <input type="text" ref="textInput" onChange={this.onTextChange}/>
        </Step>
        <Step title="The Almost Last"
          description="Whoa aren't descriptions neat?"
          onNext={onNext} onPrevious={onPrevious}
          isValid={this.state.isButtonPressed}>
          <p>Press the button to be able to continue.</p>
          <input type="button" disabled={this.state.isButtonPressed} value="Here's a button" onClick={this.onPress}/>
        </Step>
        <Step title="The Last" onNext={onNext} onPrevious={onPrevious}>
          <p>This is the final step.</p>
        </Step>
      </StepWizard>
    )
  }
});

React.render(
  <App/>,
  document.getElementById('content'));