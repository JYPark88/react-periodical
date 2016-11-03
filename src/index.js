import React, { Component, PropTypes } from 'react';

class Periodical extends Component {
  static propTypes = {
    f: PropTypes.func.isRequired,
    period: PropTypes.number,
    limit: PropTypes.number,
    paused: PropTypes.bool,
    components: PropTypes.oneOfType(
      [
        PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.func, PropTypes.string])
        ),
        PropTypes.oneOfType([PropTypes.func, PropTypes.string])
      ]
    )
  };

  static defaultProps = {
    period: 1000,
    paused: false
  };

  constructor(props) {
    super(props);
    this.runCount = 0;
  }

  componentDidMount() {
    this.start();
  }

  shouldComponentUpdate({ f, period, limit, paused }) {
    return (
      this.props.f !== f ||
      this.props.period !== period ||
      this.props.limit !== limit ||
      this.props.paused !== paused
    );
  }

  componentDidUpdate({ paused: prevPaused }) {
    if (prevPaused && !this.props.paused) {
      this.resume();
    }
    if (!prevPaused && this.props.paused) {
      this.pause();
    }
  }

  componentWillUnmount() {
    clearInterval(this.runner);
    this.runner = null;
  }

  run() {
    if (this.runner || this.runCount === 0) {
      this.isRunnable() ? this.props.f() : this.pause();
      this.runCount = this.runCount + 1;
    }
  }

  start() {
    this.run();
    this.runner = setInterval(() => this.run(), this.props.period);
  }

  pause() {
    clearInterval(this.runner);
    this.runner = null;
    const { limit } = this.props;
    if (limit && limit === this.runCount) {
      this.forceUpdate();
    }
  }

  resume() {
    this.runner = setInterval(() => this.run(), this.props.period);
  }

  reset() {
    this.pause();
    this.runCount = 0;
  }

  isRunnable() {
    const { limit, paused } = this.props;
    return (!paused && (!limit || this.runCount < limit));
  }

  getChildren(childProps) {
    const { components, children } = this.props;

    if (components) {
      if (Array.isArray(components) && components.length) {
        return components.map((Child, i) => <Child key={i} {...childProps} />);
      }

      const Child = components;
      return <Child {...childProps} />;
    }

    if (children) {
      return React.Children.map(children, (child) => React.cloneElement(child, childProps));
    }

    return null;
  }

  render() {
    const { limit } = this.props;
    const childProps = { runOnceHandler: () => this.props.f() };
    if (limit && limit === this.runCount) {
      childProps['restartHandler'] = () => {
        this.reset();
        this.start();
      };
    }
    return (
      <div>
        {this.getChildren(childProps)}
      </div>
    );
  }
}

export default Periodical;
