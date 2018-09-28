const Resolvers = {
  name: (item, nextValue) =>
    item
      .setIn(['priorStrName'], nextValue)
      .setIn(['client', 'strStoreNPCname'], nextValue)
      .setIn(['server', 'strStoreNPCname'], nextValue),

  lastName: (item, nextValue) =>
    item.setIn(['client', 'strStoreNPClastName'], nextValue),

  trade: (item, nextValue) =>
    item
      .setIn(['server', 'nStoreTrade'], nextValue)
      .setIn(['client', 'nStoreTrade'], nextValue),

  useAngle: (item, nextValue) =>
    item.setIn(['client', 'bSetNPCangle'], !!nextValue),

  size: (item, nextValue) => item.setIn(['client', 'fStoreNPCsize'], nextValue),

  angle: (item, nextValue) =>
    item.setIn(['client', 'fStoreNPCangle'], nextValue),

  itemListRemove: (item, n) =>
    item
      .setIn(['server', `strItemCode__${n}`], '0')
      .setIn(['client', `strItemList__${n}_2`], '00000000')
      .setIn(['client', `nItemListType__${n}_1`], 0)
      .setIn(['client', `itemList__${n}`], null)
      .setIn(['server', `itemList__${n}`], null),
};

export default Resolvers;
