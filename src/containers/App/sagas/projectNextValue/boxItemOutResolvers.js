import { getItems } from '../../getters/projectBoxItemOut';

const Resolvers = {
  outputCode: (boxItemOut, { n, code } = {}) =>
    boxItemOut.set(`strItemCode__${n}_1`, code),
  outputCount: (boxItemOut, { n, count } = {}) =>
    boxItemOut.set(`nItemCount__${n}_2`, count),
  outputProb: (boxItemOut, { n, prob } = {}) =>
    boxItemOut.set(`nItemProb__${n}_3`, prob),
  outputItem: (boxItemOut, { item } = {}, { entry }) =>
    boxItemOut.set('items', getItems(boxItemOut, { entry }).push(item)),
  outputUpdate: (boxItemOut, { n, code = '-1', count = 0, prob = 0 }) =>
    boxItemOut
      .set(`strItemCode__${n}_1`, code)
      .set(`nItemCount__${n}_2`, count)
      .set(`nItemProb__${n}_3`, prob),
  outputDisable: (boxItemOut, n) => Resolvers.outputUpdate(boxItemOut, { n }),
};

export default Resolvers;
