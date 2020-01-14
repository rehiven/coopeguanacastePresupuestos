const { Router } = require("express");
const router = Router();
const db = require("./db");

/* RUTA DE TIPO */

//Envia los materiales a la pantalla de creacion de montajes

router
  .route("/type")
  .get((req, res) => {
    try {
      db.ref("type").once("value", snapshot => {
        const type = snapshot.val();
        res.json(type);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .post(async (req, res) => {
    try {
      console.dir(req.body);
      if (req.body) {
        let typeRef = req.body;
        await (db.ref("type").push(typeRef))
        typeRef = await db.ref("type").once("value", snapshot=>{
          return snapshot.val();
        })
        res.json(typeRef);
      } else {
        res.status(412).json({ msg: "empty object" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

router.get("/delete-type", async (req, res) => {
  try {
   await db.ref("type/" + req.body.id).remove();
    await db.ref("type").once("value", snapshot => {
      const type = snapshot.val();
      res.status(204).json({ msg: "type removed", type });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
 