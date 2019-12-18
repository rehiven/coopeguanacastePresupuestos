const { Router } = require("express");
const router = Router();
const db = require('./db');


/* RUTA DE MONTAJES */

//Renderisa la pantalla de Montajes
router.get("/viewMounts", (req, res) => {
  db.ref("montaje").once("value", snapshot => {
    const data = snapshot.val();
    res.render("viewmounts", { montaje: data });
  });
});

//Envia los materiales a la pantalla de creacion de montajes
router.get("/mounts", (req, res) => {
  db.ref("material").once("value", snapshot => {
    const materials = snapshot.val();
    res.render("mounts", { material: materials });
  });
});

router.post("/new-mounts", (req, res) => {
  if (req.body) {
    const newMount = req.body;
    db.ref("montaje").push(newMount);
    res.sendStatus(204);
  } else {
    res.status(412).json({ msg: "empty object" });
  }
});

router.get("/delete-mount/:id", (req, res) => {
    db.ref("montaje/" + req.params.id).remove();
    res.redirect("/viewMounts");
  });

module.exports = router;
