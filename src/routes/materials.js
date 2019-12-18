const { Router } = require("express");
const router = Router();
const db = require('./db');

/* RUTA DE MATERIALES */

//Renderisa la pantalla de Materiales
router.get("/materials", (req, res) => {
  db.ref("material").once("value", snapshot => {
    const data = snapshot.val();
    res.render("materials", { material: data });
  });
});

router.post("/new-material", (req, res) => {
    console.log("***********ESTO ES UN OBJETO************")
  console.dir(req.body);

  const newMaterial = {
    codigo: req.body.codigo,
    referencia: req.body.referencia,
    descripcion: req.body.descripcion
  };

  db.ref("material").push(newMaterial);
  res.redirect("/materials");
});

router.get("/delete-material/:id", (req, res) => {
  db.ref("material/" + req.params.id).remove();
  res.redirect("/materials");
});

module.exports = router;
