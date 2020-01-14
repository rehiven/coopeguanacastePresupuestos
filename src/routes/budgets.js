const { Router } = require("express");
const router = Router();
const db = require("./db");
/* RUTAS PRINCIPALES */

//Renderisa la pantalla principal
router.get("/", (req, res) => {
  db.ref("contact").once("value", snapshot => {
    const data = snapshot.val();
    res.render("index", { contact: data });
  });
});

/*RUTA DE PRESUPUESTOS*/
//Renderisa la pantalla de presupuestos
router.get("/login", (req, res) => {
  db.ref("contact").once("value", snapshot => {
    const data = snapshot.val();
    res.render("login", { contact: data });
  });
});

//Renderisa la pantalla de presupuestos
router.get("/budgets", (req, res) => {
  let materialdata = [];
  let mountdata = [];
  db.ref("material").once("value", snapshot => {
    materialdata = snapshot.val();
    db.ref("montaje").once("value", snapshot => {
      mountdata = snapshot.val();
      res.render("budgets", { materials: materialdata, mounts: mountdata });
    });
  });

});

module.exports = router;
