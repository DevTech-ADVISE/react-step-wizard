var React = require('react');
var Step = require('./step.jsx');
var NavigationButton = require('./components/navigationButton.jsx');
var NavigationBeads = require('./components/navigationBeads.jsx');
var SlideReel = require('./components/slideReel.jsx');
var classNames = require('classnames');

var EventsMixin = require('react-event-listener');

require('./react-step-wizard.scss');


var StepWizard = React.createClass({
  statics: {
    Step: Step,
  },

  mixins: [EventsMixin],

  listeners: {
    window: {
      popstate: 'navigateBack'
    }
  },

  getInitialState: function() {
    return {
      currentStepIndex: 0,
    };
  },

  getDefaultProps: function() {
    return {
      loopBeginning: true
    };
  },

  propTypes: {
    loopBeginning: React.PropTypes.bool
  },

  consts: {
    hideableClass: "sw-hidable",
  },

  componentWillMount: function() {
    this.validateChildren();
  },

  componentDidMount: function() {
    //This will reset the history when you navigate away from thise page and hit back
    if(window.history.state && window.history.state.currentStepIndex > 0) {
      console.log('resetting history by', window.history.state.currentStepIndex);
      window.history.go(-window.history.state.currentStepIndex);
      return;
    }

    window.history.replaceState({currentStepIndex: 0}, 'Step 0');
  },

  componentWillUnmount: function() {
    this.resetHistory();
  },

  navigateBack: function(event) {
    console.log('current state step is', window.history.state.currentStepIndex);
    this.moveToPage(event.state.currentStepIndex);
  },

  resetHistory: function() {
    window.history.go(-this.state.currentStepIndex);
  },

  pushState: function(index) {
    if(index <= window.history.state.currentStepIndex) {
      return;
    }
    
    window.history.pushState({currentStepIndex: index}, 'Step ' + index);
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

    var childrenCount = React.Children.count(this.props.children);

    if(childrenCount <= 1) {
      throw new Error("You must supply more than 1 Step child");
    }
  },

  onClickNext: function() {
    var stepIndex = this.state.currentStepIndex;
    var maxIndex = React.Children.count(this.props.children) - 1;

    if(stepIndex === maxIndex && this.props.loopBeginning) {
      stepIndex = 0;
    } else {
      stepIndex = Math.min(stepIndex + 1, maxIndex);
    }

    this.moveToPage(stepIndex);
  },

  onClickPrev: function() {
    var stepIndex = this.state.currentStepIndex;

    stepIndex = Math.max(stepIndex - 1, 0);
    
    this.moveToPage(stepIndex);
  },

  executeStepCallbacks: function(start, end) {
    //I hate javascript scoping warnings
    var i, child;

    if(start < end) {
      for(i = start; i < end; i++) {
        child = this.props.children[i];

        child.props.onNext(i);
        this.pushState(i+1);
      }
    } else if (start > end) {
      for(i = start; i > end; i--) {
        child = this.props.children[i];

        child.props.onPrevious(i);
      }
    } else if (start === end) {
      child = this.props.children[start];
      child.props.onError(start);
    }
  },

  calculateFurthestIndex: function() {
    var minIndex = 0;
    var maxIndex = this.props.children.length;
    var i;

    for(i = minIndex; i < maxIndex; i++) {
      var child = this.props.children[i];

      if(!child.props.isValid) {
        return i;
      }
    }

    return i;
  },

  moveToPage: function(stepIndex) {
    var minIndex = 0;
    var maxIndex = React.Children.count(this.props.children) - 1;

    if(stepIndex > maxIndex) {
      console.warn("stepIndex was " + stepIndex + ", greater than maxIndex of " + maxIndex + ". Setting stepIndex to " + maxIndex + ".");
      stepIndex = maxIndex;
    } else if(stepIndex < minIndex) {
      console.warn("stepIndex was " + stepIndex + ", greater than minIndex of " + minIndex + ". Setting stepIndex to " + minIndex + ".");
      stepIndex = minIndex;
    }

    var currentIndex = this.state.currentStepIndex;

    var furthestIndex = this.calculateFurthestIndex();
    if(furthestIndex < stepIndex) {
      stepIndex = furthestIndex;
    }

    this.executeStepCallbacks(this.state.currentStepIndex, stepIndex);
    var direction = stepIndex - window.history.state.currentStepIndex;

    if(direction < 0) {
      console.log(stepIndex, window.history.state.currentStepIndex);
      window.history.go(direction);
    }

    this.setState({currentStepIndex: stepIndex});
  },

  getStepData: function(step, index) {
    return {
      title: step.props.title,
      description: step.props.description,
      index: index,
      isCurrent: index === this.state.currentStepIndex,
      isUnreachable: index > this.calculateFurthestIndex(),
    };
  },

  getBeads: function() {
    var childrenData = this.props.children.map(this.getStepData, this);

    return (
      <NavigationBeads
        stepData={childrenData} 
        selectedIndex={this.state.currentStepIndex}
        onClick={this.moveToPage}/>
    );
  },

  getStepDataAt: function(index) {
    var minIndex = 0;
    var maxIndex = React.Children.count(this.props.children) - 1;

    if(index < minIndex || index > maxIndex) {
      return null;
    }

    var step = this.props.children[index];

    return this.getStepData(step, index);
  },

  makeNavButton: function(buttonData, onClick, isShown, className) {
    return (
      <NavigationButton
        stepData={buttonData}
        onClick={onClick}
        isShown={isShown}
        className={className}/>
    )
  },

  getNavigation: function() {
    var currentIndex = 0;
    var maxIndex = React.Children.count(this.props.children) - 1;

    var navigation = [];

    do {
      navigation.push(this.getNavigationAt(currentIndex));
    } while(currentIndex++ < maxIndex);

    return navigation;
  },

  getNavigationAt: function(index) {
    var currentIndex = this.state.currentStepIndex;

    var beginningStepData = this.getStepDataAt(0);
    var prevStepData = this.getStepDataAt(index - 1);
    var nextStepData = this.getStepDataAt(index + 1);
    var isActive = currentIndex === index;

    var prevButton = null;
    var nextButton = null;

    if(prevStepData === null) {
      nextButton = this.makeNavButton(nextStepData, this.onClickNext, isActive, "sw-button-full");
    } else if(nextStepData === null) {
      if(this.props.loopBeginning){
        prevButton = this.makeNavButton(prevStepData, this.onClickPrev, isActive, "sw-button-left");
        nextButton = this.makeNavButton(beginningStepData, this.onClickNext, isActive, "sw-button-right");
      }
      else
        prevButton = this.makeNavButton(prevStepData, this.onClickPrev, isActive, "sw-button-full");
      
    } else {
      prevButton = this.makeNavButton(prevStepData, this.onClickPrev, isActive, "sw-button-left");
      nextButton = this.makeNavButton(nextStepData, this.onClickNext, isActive, "sw-button-right");
    }

    var classes =  classNames("sw-navigation");
    var style = {
      left: index * 100 + "%",
    };

    return (
      <div className={classes} key={index} style={style}>
        {prevButton}
        {nextButton}
      </div>
    );
  },

  getSlide: function() {
    var steps = this.props.children.map(function(child, id) {

      var newProps = {};
      newProps.isActive = id === this.state.currentStepIndex;
      newProps.key = id;

      return React.cloneElement(child, newProps);
    }, this);

    return (
      <SlideReel currentIndex={this.state.currentStepIndex}>
        {steps}
      </SlideReel>
    );
  },

  render: function () {
    var beads = this.getBeads();
    var slide = this.getSlide();
    var navigation = this.getNavigation();

    var navigationStyle = {
      left: -this.state.currentStepIndex * 100 + "%",
    };

    return (
      <div className="sw-container">
        {beads}
        {slide}
        <div className="sw-navigation-container">
          <div className="sw-navigation-panel" style={navigationStyle}>
            {navigation}
          </div>
        </div>
      </div>
    );
  },
});

module.exports = StepWizard;