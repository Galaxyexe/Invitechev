export function dragMoveListener(event) {
  var target = event.target;

  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

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
  let bounding = document.getElementById("trash").getBoundingClientRect();

  let y = document.getElementById("container").getBoundingClientRect().y;
  let target = event.target.getBoundingClientRect();

  if (
    target.x + target.width / 2 >= bounding.x - 2 &&
    target.x <= bounding.x + bounding.width + 2 &&
    Math.round(target.y) <= y
  ) {
    this.onDelete(this.id);
  }

}
export function resizeMoveListener(event) {

  Object.assign(event.target.style, {
    width: `${event.rect.width}px`,
    height: `${event.rect.height}px`,
    transform: this.translate,
  });
}

export function resizeEndListener(event) {
  Object.assign(event.target.style, {
    transform: this.translate,
  });
}