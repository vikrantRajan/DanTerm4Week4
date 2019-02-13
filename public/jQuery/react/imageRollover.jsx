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

const setImgSrc = (selector, readAttr) => {
  const imgPath = selector.getAttribute(readAttr);
  selector.setAttribute('src', imgPath);
};
const rollOn = (event) => {
  const srcPath = event.target.getAttribute('src');
  event.target.setAttribute('data-primary', srcPath);

  setImgSrc(event.target, 'data-secondary');
};
const rollOff = event => setImgSrc(event.target, 'data-primary');

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
