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

/* RUTA DE MATERIALES */

//Renderisa la pantalla de Materiales
router.get("/materials", (req, res) => {
  db.ref("material").once("value", snapshot => {
    const data = snapshot.val();
    res.render("materials", { material: data });
  });
});

router.post("/new-material", (req, res) => {
  console.log("***********ESTO ES UN OBJETO************");
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
