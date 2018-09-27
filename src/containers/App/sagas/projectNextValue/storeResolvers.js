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
};

export default Resolvers;
