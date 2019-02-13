const ImageRollover = (props) => {
  return (
  	<img
      src="https://ap.rdcpix.com/1851743405/88be4aa1c05cf4c8a1c505d688efb931l-c0xd-w1020_h770_q80.jpg" width={props.width} height={props.height}
    />
  );
}

const gallery = [
	<ImageRollover width="100" height="45" />,
  <ImageRollover width="100" height="55" />,
  <ImageRollover width="100" height="65" />,
];

ReactDOM.render(
	gallery,
  document.getElementById('container')
);
