const errohandler = (err, req, res, next) => {
 res.status(err.status || 500);
   res.render("error", {
     title: "Error",
     user: req.user,
     error: err.message,
   });
};

export default errohandler;