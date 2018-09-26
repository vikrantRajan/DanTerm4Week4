const StyledHello = () => {
    const Container = styled.default.div`
        color: green;
    `;

    return (
        <Container>Hello from React.js</Container>
    );
};

ReactDOM.render(
    <StyledHello />,
    document.getElementById('container'),
);
