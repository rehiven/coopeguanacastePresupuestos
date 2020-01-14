const { Router } = require("express");
const router = Router();
const db = require("./db");

/* RUTA DE INTERESADOS */

//Envia los materiales a la pantalla de creacion de montajes

router
  .route("/concerned")
  .get((req, res) => {
    try {
      db.ref("concerned").once("value", snapshot => {
        const concerned = snapshot.val();
        res.json(concerned);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .post(async (req, res) => {
    try {
      console.dir(req.body);
      if (req.body) {
        let concernedRef = req.body;
        await (db.ref("concerned").push(concernedRef))
        concernedRef = await db.ref("concerned").once("value", snapshot=>{
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

router.get("/delete-concerned", async (req, res) => {
  try {
   await db.ref("concerned/" + req.body.id).remove();
    await db.ref("concerned").once("value", snapshot => {
      const concerned = snapshot.val();
      res.status(204).json({ msg: "concerned removed", concerned });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
 