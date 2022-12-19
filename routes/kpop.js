const {Router} = require("express")
const { addkpop, deletekpopbyID, getkpop, getkpopbyID, updatekpopbyID } = require("../controllers/kpop")
const router = Router()

///GET///
router.get("/", getkpop)
router.get("/id/:id", getkpopbyID)

///POST///
router.post("/", addkpop)
router.post("/id/:id", updatekpopbyID)

///DELETE///
router.delete("/id/:id", deletekpopbyID)
module.exports = router