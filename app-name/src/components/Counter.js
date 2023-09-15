import { Component } from "react";

class Counter extends Component {
  constructor() {
    super();
    this.state = { counter: 0 };
  }

  increament() {
    this.setState({ counter: this.state.counter + 1 });
  }

  decreament() {
    if (this.state.counter == 0) {
      return;
    }
    this.setState({ counter: this.state.counter - 1 });
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <h3>
          Counter :{this.state.counter} {name}
        </h3>
        <button name="counter-click" onClick={() => this.increament()}>
          increament
        </button>
        <button name="counter-click" onClick={() => this.decreament()}>
          Decreament
        </button>
      </div>
    );
  }
}

export default Counter;
