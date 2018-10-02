const Resolvers = {
  outputCode: (boxItemOut, { n, code } = {}) =>
    boxItemOut.set(`strItemCode__${n}_1`, code).set(`itemList__${n}`, null), // code change, remove item
  outputCount: (boxItemOut, { n, count } = {}) =>
    boxItemOut.set(`nItemCount__${n}_2`, count),
  outputProb: (boxItemOut, { n, prob } = {}) =>
    boxItemOut.set(`nItemProb__${n}_3`, prob),
  outputItem: (boxItemOut, { n, item } = {}) =>
    boxItemOut.set(`itemList__${n}`, item),
  outputUpdate: (
    boxItemOut,
    { n, code = '-1', count = 0, prob = 0, item = null },
  ) =>
    boxItemOut
      .set(`strItemCode__${n}_1`, code)
      .set(`nItemCount__${n}_2`, count)
      .set(`nItemProb__${n}_3`, prob)
      .set(`itemList__${n}`, item),
  outputDisable: (boxItemOut, n) => Resolvers.outputUpdate(boxItemOut, { n }),
};

export default Resolvers;
