function roundPosition(val) {
  return Math.round(val / 20) * 20;
}
export function dragMoveListener(event) {
  var target = event.target;

  // keep the dragged position in the data-x/data-y attributes
  var x = roundPosition(
    (parseFloat(target.getAttribute("data-x")) || 0) + event.dx
  );
  var y = roundPosition(
    (parseFloat(target.getAttribute("data-y")) || 0) + event.dy
  );

  // translate the element
  const translate = "translate(" + x + "px, " + y + "px)";
  target.style.webkitTransform = target.style.transform = translate;
  this.translate = translate;
  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}
window.dragMoveListener = dragMoveListener;

export function dragEndListener(event) {
  //Checks if in trash, and if so, delete
  let bounding = document
    .getElementById("overlayTrash")
    .getBoundingClientRect();

  let y = document.getElementById("container").getBoundingClientRect().y;
  let target = event.target.getBoundingClientRect();
  //TODO
  if (
    target.x + target.width / 2 >= bounding.x - 2 &&
    target.x <= bounding.x + bounding.width + 2 &&
    Math.round(target.y) <= y
  ) {
    this.onDelete(this.id);
  }
}
export function resizeMoveListener(event) {
  let target = event.target;
  Object.assign(event.target.style, {
    width: `${roundPosition(event.rect.width)}px`,
    height: `${roundPosition(event.rect.height)}px`,
    transform: this.translate,
  });
  var x = parseFloat(target.getAttribute("data-x")) || 0;
  var y = parseFloat(target.getAttribute("data-y")) || 0;

  // update the element's style
  target.style.width = roundPosition(event.rect.width) + "px";
  target.style.height = roundPosition(event.rect.height) + "px";

  // translate when resizing from top or left edges
  x += event.deltaRect.left;
  y += event.deltaRect.top;

  x = roundPosition(x);
  y = roundPosition(y);

  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px," + y + "px)";
  this.translate = target.style.transform;
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

/*export function resizeEndListener(event) {
  Object.assign(event.target.style, {
    width: `${roundPosition(event.rect.width)}px`,
    height: `${roundPosition(event.rect.height)}px`,
  });
}*/
