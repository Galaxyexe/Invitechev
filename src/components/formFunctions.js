export function validateForm(fields, grouped) {
  //TODO doesn't account for no validation at the beginning
  if (!grouped)
    for (const field of fields) {
      if (field.error != null) return false;
    }
  else
    for (const fieldGroup of fields) {
      for (const field of fieldGroup) {
        if (field.error != null) return false;
      }
    }
  return true;
}

export function beforeRouteLeave(to, from, next) {
  const answer = window.confirm(
    "If you leave the form will be reset and you can't go back!"
  );
  if (answer) {
    window.onbeforeunload = () => undefined;

    next();
  } else {
    next(false);
  }
}
