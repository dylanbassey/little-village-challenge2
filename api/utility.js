function getDefaultDateFrom(dateFrom) {
  if (!dateFrom) {
    console.log("dateFrom not provided, defaulting to 3 weeks ago");

    return `2000-01-01`;
  }

  // If dateFrom is provided, return it as is
  return dateFrom;
}
module.exports = { getDefaultDateFrom };
