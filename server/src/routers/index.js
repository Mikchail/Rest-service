const router = require("express").Router();;
const authControllers = require("../controllers/user-controller");
const postControllers = require("../controllers/post-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth")

// router.get("/users", usersControllers.getUsers);
router.post("/login",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  authControllers.login);
router.post("/registeration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  authControllers.registeration);
router.get("/users/:id", authControllers.getUser);

router.post("/post", postControllers.createPost);
router.get("/posts", authMiddleware, postControllers.getPosts);
router.put("/post", postControllers.updatePost);
router.delete("/post", postControllers.deletePost);
// router.post("/posts", postControllers.getPosts);

module.exports = router;