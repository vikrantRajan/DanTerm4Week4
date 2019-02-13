const ImageRollover = (props) => {
  return (
  	<img
      src="../image-rollover/images/stanley-park-1926.jpg"
      data-secondary="../image-rollover/images/stanley-park-2004.jpg"
      width={props.width}
      height={props.height}
      onMouseOver={rollOn}
      onMouseOut={rollOff}
    />
  );
}

const rollOn = (event) => {
  const secondaryPath = event.target.getAttribute('data-secondary');
  event.target.setAttribute('src', secondaryPath);
};
const rollOff = () => console.log('off');

const gallery = [
  <ImageRollover
    key="img1"
    width="100"
    height="45"
  />,
  <ImageRollover
    key="img2"
    width="100"
    height="55"
  />,
  <ImageRollover
    key="img3"
    width="100"
    height="65"
  />,
  <ImageRollover
    key="img4"
    width="100"
    height="75"
  />,
];

ReactDOM.render(
	gallery,
  document.getElementById('container')
);
