class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReactDOM.render(
  <Hello name="Dan BROOKS (third change)" />,
  document.getElementById('container')
);