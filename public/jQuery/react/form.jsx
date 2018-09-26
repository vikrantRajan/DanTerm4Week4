{/* <a href="javascript:;">Dumb link (preferred)</a><br>
<a href="#">Dumb link as #</a><br>
<a href="javascript:;" onclick="clickLog()">Click event using HTML attribute JavaScript</a><br>
<a href="javascript:;" id="click">Click event using traditional JS binding</a><br>
<a href="javascript:;" id="hover">Hover event</a><br>

<form action="http://vanarts.com/" id="submit">
    <input type="text" value="Blur/focus events" id="blur"><br>
    <input type="text" value="Keyboard events" id="keyboard"><br>

    <input type="submit" value="Submit event">
    <input type="button" value="Button not submit button" id="btn">
</form> */}

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
