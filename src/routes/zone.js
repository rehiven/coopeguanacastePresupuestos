const { Router } = require("express");
const router = Router();
const db = require("./db");

/* RUTA DE ZONA */

//Envia los materiales a la pantalla de creacion de montajes

router
  .route("/zone")
  .get((req, res) => {
    try {
      db.ref("zone").once("value", snapshot => {
        const zone = snapshot.val();
        res.json(zone);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .post(async (req, res) => {
    try {
      console.dir(req.body);
      if (req.body) {
        let zoneRef = req.body;
        await (db.ref("zone").push(zoneRef))
        zoneRef = await db.ref("zone").once("value", snapshot=>{
          return snapshot.val();
        })
        res.json(concernedRef);
      } else {
        res.status(412).json({ msg: "empty object" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

router.get("/delete-zone", async (req, res) => {
  try {
   await db.ref("zone/" + req.body.id).remove();
    await db.ref("zone").once("value", snapshot => {
      const zone = snapshot.val();
      res.status(204).json({ msg: "zone removed", zone });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
 