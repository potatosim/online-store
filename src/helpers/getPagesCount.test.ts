import getPagesCount from './getPagesCount';

interface PageData {
  totalCount: number;
  limit: number;
  expected: number;
}

const mockedPagesData: PageData[] = [
  {
    totalCount: 15,
    limit: 3,
    expected: 5,
  },
  {
    totalCount: 17,
    limit: 3,
    expected: 6,
  },
  {
    totalCount: 1,
    limit: 3,
    expected: 1,
  },
  {
    totalCount: 17,
    limit: 0,
    expected: Infinity,
  },
];

describe('test getPagesCount', () => {
  mockedPagesData.forEach(({ expected, limit, totalCount }) => {
    it(`should return ${expected} for limit - ${limit} and totalCount - ${totalCount}`, () => {
      expect(getPagesCount(totalCount, limit)).toBe(expected);
    });
  });

  it('should call Math.ceil', () => {
    let ceil = jest.spyOn(Math, 'ceil');
    getPagesCount(15, 3);
    expect(ceil).toBeCalledTimes(1);
  });
});
