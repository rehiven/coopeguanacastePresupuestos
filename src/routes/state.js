const { Router } = require("express");
const router = Router();
const db = require("./db");

/* RUTA DE ESTADO */

//Envia los materiales a la pantalla de creacion de montajes

router
  .route("/state")
  .get((req, res) => {
    try {
      db.ref("state").once("value", snapshot => {
        const state = snapshot.val();
        res.json(state);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .post(async (req, res) => {
    try {
      console.dir(req.body);
      if (req.body) {
        let stateRef = req.body;
        await (db.ref("state").push(stateRef))
        stateRef = await db.ref("state").once("value", snapshot=>{
          return snapshot.val();
        })
        res.json(stateRef);
      } else {
        res.status(412).json({ msg: "empty object" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

router.get("/delete-state", async (req, res) => {
  try {
   await db.ref("state/" + req.body.id).remove();
    await db.ref("state").once("value", snapshot => {
      const state = snapshot.val();
      res.status(204).json({ msg: "state removed", state });
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
 