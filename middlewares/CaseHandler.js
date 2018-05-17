export function caseHandler(req, res, next) {
  /* USER EMAIL CASEHANDLER */
  if (req.body.userEmail) {
    req.body.userEmail = req.body.userEmail.toLowerCase();
  }
  next();
}
