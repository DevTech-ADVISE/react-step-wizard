var React = require('react');
var Step = require('./step.js');
var NavigationButton = require('./components/navigationButton');
var NavigationBeads = require('./components/navigationBeads');
var SlideReel = require('./components/slideReel');
var classNames = require('classnames');

require('../styles/stepWizardStyles.scss');


var StepWizard = React.createClass({
  statics: {
    Step: Step,
  },

  getInitialState: function() {
    return {
      currentStepIndex: 0,
      furthestIndex: 0,
    };
  },

  getDefaultProps: function() {
    return {

    };
  },

  propTypes: {

  },

  consts: {
    hideableClass: "sw-hidable",
  },

  componentWillMount: function() {
    this.validateChildren();
  },

  componentDidMount: function() {
    var furthestIndex = this.calculateFurthestIndex();
    this.setState({furthestIndex: furthestIndex});
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

    stepIndex = Math.min(stepIndex + 1, maxIndex);
    
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
      }
    } else if (start > end) {
      for(i = start; i > end; i--) {
        child = this.props.children[i];

        child.props.onPrevious(i);
      }
    }
  },

  calculateFurthestIndex: function() {
    var minIndex = 0;
    var maxIndex = React.Children.count(this.props.children) - 1;
    var i;

    for(i = minIndex; i < maxIndex; i++) {
      var child = this.props.children[i];

      if(!child.props.validateData(i)) {
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
    var direction = stepIndex - currentIndex;

    var furthestIndex = this.calculateFurthestIndex();
    if(furthestIndex < stepIndex) {
      stepIndex = furthestIndex;
    }

    this.executeStepCallbacks(this.state.currentStepIndex, stepIndex);

    this.setState({currentStepIndex: stepIndex, furthestIndex: furthestIndex});
  },

  getStepData: function(step, index) {
    return {
      title: step.props.title,
      description: step.props.description,
      index: index,
      isCurrent: index === this.state.currentStepIndex,
      isUnreachable: index > this.state.furthestIndex,
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

  makeNavButton: function(buttonData, onClick, className) {
    return (
      <NavigationButton
        stepData={buttonData}
        onClick={onClick}
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

    var prevStepData = this.getStepDataAt(index - 1);
    var nextStepData = this.getStepDataAt(index + 1);

    var prevButton = null;
    var nextButton = null;

    if(prevStepData === null) {
      nextButton = this.makeNavButton(nextStepData, this.onClickNext, "sw-button-full");
    } else if(nextStepData === null) {
      prevButton = this.makeNavButton(prevStepData, this.onClickPrev, "sw-button-full");
    } else {
      prevButton = this.makeNavButton(prevStepData, this.onClickPrev, "sw-button-left");
      nextButton = this.makeNavButton(nextStepData, this.onClickNext, "sw-button-right");
    }

    var classes =  classNames("sw-navigation", {"sw-active": currentIndex === index});
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

      var newProps = child.props;
      newProps.isActive = id === this.state.currentStepIndex;

      return (
        <Step {...newProps}>
          {child.props.children}
        </Step>
      );
    }, this);

    return (
      <SlideReel currentIndex={this.state.currentStepIndex}>
        {this.props.children}
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