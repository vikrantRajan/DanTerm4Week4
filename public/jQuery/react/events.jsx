const Hello = () => {
    const css = { color: 'red' };

    const logHello = () => {
        console.log('Hello from React.js');
    };

    return (
        <div
            onClick={logHello}
            style={css}
        >
            Hello from React.js
        </div>
    );
};
// todo inclass: change the text inside the div element
// todo inclass: change the colour of the div element

ReactDOM.render(
    <Hello />,
    document.getElementById('container'),
);
