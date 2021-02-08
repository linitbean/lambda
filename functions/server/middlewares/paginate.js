const paginate = async (req, res, next) => {
  try {
    // get query from res.query and convert to query template
    const Query = res.query.toConstructor();

    // return raw query if paginate option is not provided
    if (req.query.format !== "paginate") {
      const allResults = await Query();
      return res.json(allResults);
    }

    const page = Math.abs(parseInt(req.query.page)) || 1;
    const limit = Math.abs(parseInt(req.query.limit)) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalDocs = await Query().countDocuments();

    const docs = await Query().limit(limit).skip(startIndex);

    // build paginated results
    const paginatedResults = {};
    paginatedResults.page = page;
    paginatedResults.limit = limit;
    paginatedResults.totalDocs = totalDocs;

    // cursors
    const cursor = {};
    if (endIndex < totalDocs) {
      cursor.next = page + 1;
    }

    if (startIndex > 0) {
      cursor.prev = page - 1;
    }

    paginatedResults.cursor = cursor;
    paginatedResults.docs = docs;

    // send paginated response
    res.json(paginatedResults);
  } catch (err) {
    next(err);
  }
};

module.exports = paginate;
