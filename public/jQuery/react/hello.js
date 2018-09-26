var Hello = function Hello(props) {
  return React.createElement(
    "div",
    null,
    "Hello ",
    props.name
  );
};

ReactDOM.render(React.createElement(Hello, { name: "Dan BROOKS (third change)" }), document.getElementById('container'));