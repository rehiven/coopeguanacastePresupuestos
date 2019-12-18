const { Router } = require("express");
const router = Router();
const db = require('./db');


/* RUTAS PRINCIPAL */

//Renderisa la pantalla principal
router.get("/", (req, res) => {
  db.ref("contact").once("value", snapshot => {
    const data = snapshot.val();
    res.render("index", { contact: data });
  });
});

module.exports = router;
