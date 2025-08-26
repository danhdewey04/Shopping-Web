module.exports = (totalPages, limit, page) => {
  const listPages = [];
  const delta = 2;
  const left = page - delta;
  const right = page + delta;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      i === page ||
      (i >= left && i <= right)
    ) {
      listPages.push(i);
    }
  }
  return listPages;
  // [1...3 4 (5) 6 7...10]
};
