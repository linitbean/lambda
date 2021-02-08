const router = require("express").Router();

// controllers
const ProfileController = require("../controllers/profile");

//middlewares
const auth = require("../middlewares/auth");
const matchId = require("../middlewares/matchId");
const validate = require("../middlewares/validate");

// validators
const { cardSchema } = require("../validators/card");
const {
  profileByEmailSchema,
  profileUpdateSchema,
  profilePasswordUpdateSchema,
  profilePhotoSchema,
  identitySchema,
  residenceSchema,
} = require("../validators/profile");

// friend profile
router.get("/:id", matchId, ProfileController.profileFriend);

// email profile
router.post(
  "/email",
  validate(profileByEmailSchema),
  ProfileController.profileByEmail
);

// apply auth middleware to require req user beyond this point
router.use(auth);

// user profile
router.get("/", ProfileController.profileUser);

// update profile
router.put("/", validate(profileUpdateSchema), ProfileController.profileUpdate);

// update profile
router.post(
  "/change-password",
  validate(profilePasswordUpdateSchema),
  ProfileController.profilePasswordUpdate
);

// add card
router.post("/card", validate(cardSchema), ProfileController.profileCardCreate);

// remove card
router.delete("/card/:id", ProfileController.profileCardRemove);

// request email verification
router.post(
  "/request-email-verification",
  ProfileController.profileRequestEmailVerification
);

// upload profile photo
router.post(
  "/avatar",
  validate(profilePhotoSchema),
  ProfileController.profilePhotoUpload
);

// reset profile photo
router.delete("/avatar", ProfileController.profilePhotoReset);

module.exports = router;
