const filter = (field) => async (req, res, next) => {
  try {
    // get live query from res.query
    const Query = res.query;

    // return unmodified query if query search is not provided
    if (!req.query.search) {
      return next();
    }

    // await Query.find({
    //   [field]: { $regex: req.query.search, $options: "i" },
    // });

    // sanitize search params and search fields
    let pipeline;
    if (Array.isArray(field)) {
      const arr = field.map((f) => ({
        [f]: { $regex: req.query.search, $options: "i" },
      }));
      pipeline = { $or: arr };
    } else if (typeof field === "string") {
      pipeline = {
        [field]: { $regex: req.query.search, $options: "i" },
      };
    } else {
      return next();
    }

    await Query.find(pipeline);

    // filter query and pass to next middleware
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = filter;
