const StyledHello = () => {
    const Container = styled.default.div`
        color: red;
    `;

    return (
        <Container>Hello from React.js</Container>
    );
};

ReactDOM.render(
    <StyledHello />,
    document.getElementById('container'),
);
