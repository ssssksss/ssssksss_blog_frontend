const topMoveHandler = () => {
  window.scrollTo(0, 0);
};

const bottomMoveHandler = () => {
  window.scrollTo(0, document.body.scrollHeight);
};

const screenMove = {
  topMoveHandler,
  bottomMoveHandler,
};

export default screenMove;
