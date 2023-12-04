const router = require("express").Router();
const auth = require("../middleware/auth");
const UserController = require("../controllers/user.controller");

router.get("/user", auth, UserController.currentUser);
router.put("/user", auth, UserController.updateUser);

module.exports = router;
