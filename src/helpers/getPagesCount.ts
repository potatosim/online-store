const getPagesCount = (totalCount: number, limit: number) => {
  return Math.ceil(totalCount / limit);
};

export default getPagesCount;
