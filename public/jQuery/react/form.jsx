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

const Form = () => {
    const clickHandler = () => console.log('Clicked');
    const mouseOverHandler = () => console.log('Mouse over event');
    const mouseOutHandler = () => console.log('Mouse out event');
    const focusHandler = () => console.log('focus event');
    const blurHandler = () => console.log('blur event');
    const keyDownHandler = () => console.log('key down');
    const keyPressHandler = () => console.log('key pressed');
    const keyUpHandler = () => console.log('key up');
    const submitHandler = (event) => {
        console.log('submit');
        event.preventDefault();
    };

    return (
        <div>
            <a onClick={clickHandler}>Click event</a>
            <br />
            <a
                onMouseOver={mouseOverHandler}
                onMouseOut={mouseOutHandler}
            >
                Hover event
            </a>
            <br />
            <form action="http://vanarts.com/" onSubmit={submitHandler}>
                <input
                    type="text"
                    defaultValue="Blur/focus events"
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                />
                <br />
                <input
                    type="text"
                    defaultValue="Keyboard events"
                    onKeyDown={keyDownHandler}
                    onKeyPress={keyPressHandler}
                    onKeyUp={keyUpHandler}
                />
                <br />
                <input
                    type="submit"
                    defaultValue="Submit event"
                />
                <br />
                <input
                    type="button"
                    defaultValue="Button not submit button"
                    onClick={clickHandler}
                />
            </form>
        </div>
    );
};

ReactDOM.render(
    <Form />,
    document.getElementById('container'),
);
