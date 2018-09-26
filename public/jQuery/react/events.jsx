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

ReactDOM.render(
    <Hello />,
    document.getElementById('container'),
);
