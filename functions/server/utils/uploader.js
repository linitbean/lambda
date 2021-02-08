const cloudinary = require("../configs/cloudinary");

const { upload, destroy } = cloudinary.uploader;

const destroyProfilePhoto = async (user) => {
  try {
    if (user.avatar && user.avatar.cloudId) {
      await destroy(user.avatar.cloudId);

      user.avatar = null;
      await user.save();
    }
  } catch (err) {
    throw err;
  }
};

const uploadProfilePhoto = async (user, file) => {
  try {
    // first remove current profile photo if exists

    const resp = await upload(file, {
      upload_preset: "bitbank",
    });

    if (user.avatar && user.avatar.cloudId) await destroyProfilePhoto(user);

    user.avatar = {
      url: resp.secure_url,
      cloudId: resp.public_id,
    };

    await user.save();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  destroyProfilePhoto,
  uploadProfilePhoto,
};
