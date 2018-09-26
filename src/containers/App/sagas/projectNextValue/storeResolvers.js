const Resolvers = {
  name: (item, nextValue) =>
    item
      .setIn(['priorStrName'], nextValue)
      .setIn(['client', 'strStoreNPCname'], nextValue),
};

export default Resolvers;
