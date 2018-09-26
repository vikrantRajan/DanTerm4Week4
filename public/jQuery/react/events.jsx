const Hello = () => {
    const css = { color: 'purple' };

    const logHello = () => {
        console.log('Hello from React.js');
    };

    // React.js rule, only one wrapper element per return
    return (
        <section>
            <h1
                onClick={() => console.log('Heading')}
                style={{ color: 'green' }}
            >
                Heading One
            </h1>
            <div
                onClick={logHello}
                style={css}
            >
                Text inside!
            </div>
        </section>
    );
};
// todo inclass: change the text inside the div element
// todo inclass: change the colour of the div element

ReactDOM.render(
    <Hello />,
    document.getElementById('container'),
);
