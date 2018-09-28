import { getItemList } from '../../getters/projectStore';

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
      .setIn(['server', `strItemCode__${n}`], '')
      .setIn(['client', `strItemList__${n}_2`], '')
      .setIn(['client', `nItemListType__${n}_1`], 0)
      .setIn(['client', `itemList__${n}`], null)
      .setIn(['server', `itemList__${n}`], null),

  itemListUpdate: (
    item,
    { n, clientCode = '', clientType = 0, serverCode = '', itemList } = {},
  ) =>
    item
      .setIn(['server', `strItemCode__${n}`], serverCode)
      .setIn(['client', `strItemList__${n}_2`], clientCode)
      .setIn(['client', `nItemListType__${n}_1`], clientType)
      .setIn(['client', `itemList__${n}`], itemList)
      .setIn(['server', `itemList__${n}`], itemList),

  itemsListReshuffle: (nextValue, value, { item }) => {
    const itemsList = [];

    let setToN = 1;
    let nextItemValues = nextValue;

    Array.from(Array(200)).forEach((_, index) => {
      const n = index + 1;
      const {
        serverCode,
        clientCode,
        clientType,
        client,
        server,
      } = getItemList(nextItemValues, { item }, { n });

      if (serverCode && serverCode.length > 1) {
        itemsList.push({ serverCode, clientCode, clientType });

        nextItemValues = Resolvers.itemListUpdate(nextItemValues, {
          n: setToN,
          serverCode,
          clientCode,
          clientType,
          itemList: server || client,
        });

        setToN += 1;
      }
    });

    Array.from(Array(200 - setToN - 1)).forEach((_, index) => {
      const n = index + setToN;
      nextItemValues = Resolvers.itemListRemove(nextItemValues, n);
    });

    return nextItemValues;
  },

  itemsListCount: (item, listCount) =>
    item
      .setIn(['server', `nStoreListCount`], listCount)
      .setIn(['client', `nStoreLISTcount`], listCount),
};

export default Resolvers;
