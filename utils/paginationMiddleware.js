exports.paginatedResults = (model, limitNum, pageNum) => {
  const page = parseInt(pageNum);
  const limit = parseInt(limitNum);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < model.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  results.resultShortlets = model.slice(startIndex, endIndex);
  return results;
};
