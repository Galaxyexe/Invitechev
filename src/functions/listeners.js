export function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  const translate = "translate(" + x + "px, " + y + "px)";
  const rotate = this.rotate;
  target.style.webkitTransform = target.style.transform = translate + rotate;
  this.translate = translate;
  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}
window.dragMoveListener = dragMoveListener;

export function dragEndListener(event) {
  /*var target = document
    .getElementById(String(this.id))
    .getBoundingClientRect();*/

  let bounding = document.getElementById("trash").getBoundingClientRect();

  let y = document.getElementById("container").getBoundingClientRect().y;
  /*Object.assign(event.target.style, {
    transform: this.translate,
  });
  this.$forceUpdate();*/
  let target = document
    .getElementById("item" + +String(this.id))
    .getBoundingClientRect();
  //console.log(target.x, target.width, target.y, bounding.x, bounding.width);

  if (
    target.x + target.width / 2 >= bounding.x - 2 &&
    target.x <= bounding.x + bounding.width + 2 &&
    Math.round(target.y) <= y
  ) {
    this.onDelete(this.id);
  } else
    Object.assign(event.target.style, {
      transform: this.translate + this.rotate,
    });
}
export function resizeMoveListener(event) {
  /*let { x, y } = event.target.dataset;
    x = parseFloat(x) || 0;
    y = parseFloat(y) || 0;*/
  /*var radians = this.rotate.replace(/^\D+/g, "");
    radians = radians.substring(0, radians.length - 4);*/
  //Object.assign(event.target.dataset, { x, y });

  Object.assign(event.target.style, {
    width: `${event.rect.width}px`,
    height: `${event.rect.height}px`,
    transform: this.translate,
  });
}
export function resizeEndListener(event) {
  Object.assign(event.target.style, {
    transform: this.translate + this.rotate,
  });
}
export function getDragAngle(event) {
  var item = event.target.parentElement;
  var startAngle = parseFloat(item.getAttribute("data-angle")) || 0;
  var center = {
    x: parseFloat(item.getAttribute("data-center-x")) || 0,
    y: parseFloat(item.getAttribute("data-center-y")) || 0,
  };
  var angle = Math.atan2(center.y - event.clientY, center.x - event.clientX);

  return angle - startAngle;
}
export function rotateStartListener(event) {
  var item = event.target.parentElement;
  var rect = item.getBoundingClientRect();

  // store the center as the element has css `transform-origin: center center`
  item.setAttribute("data-center-x", rect.left + rect.width / 2);
  item.setAttribute("data-center-y", rect.top + rect.height / 2);
  // get the angle of the element when the drag starts
  item.setAttribute("data-angle", getDragAngle(event));
}
export function rotateMoveListener(event) {
  var item = event.target.parentElement;
  var angle = getDragAngle(event);
  // update transform style on dragmove
  if (Math.abs(angle) < Math.PI / 4) {
    const rotate = "rotate(" + angle + "rad" + ")";
    const translate = this.translate;
    Object.assign(item.style, {
      transform: translate + rotate,
    });
    this.rotate = rotate;
  }
}
export function rotateEndListener(event) {
  var item = event.target.parentElement;
  // save the angle on dragend
  item.setAttribute("data-angle", getDragAngle(event));
}
