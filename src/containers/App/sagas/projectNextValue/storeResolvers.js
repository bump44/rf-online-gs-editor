import { Map } from 'immutable';
import { getItemList } from '../../getters/projectStore';
import { IMMUTABLE_LIST } from '../../constants';

const Resolvers = {
  name: (store, value) =>
    store
      .setIn(['priorStrName'], value)
      .setIn(['client', 'strStoreNPCname'], value)
      .setIn(['server', 'strStoreNPCname'], value),
  lastName: (store, value) =>
    store.setIn(['client', 'strStoreNPClastName'], value),
  trade: (store, value) =>
    store
      .setIn(['server', 'nStoreTrade'], value)
      .setIn(['client', 'nStoreTrade'], value),
  useAngle: (store, value) => store.setIn(['client', 'bSetNPCangle'], !!value),
  size: (store, value) => store.setIn(['client', 'fStoreNPCsize'], value),
  angle: (store, value) => store.setIn(['client', 'fStoreNPCangle'], value),
  itemListRemove: (store, n) =>
    store
      .setIn(['server', `strItemCode__${n}`], '')
      .setIn(['client', `strItemList__${n}_2`], '')
      .setIn(['client', `nItemListType__${n}_1`], 0),
  itemListUpdate: (
    store,
    { n, clientCode = '', clientType = 0, serverCode = '', itemList } = {},
    { entry },
  ) => {
    let nextStore = store
      .setIn(['server', `strItemCode__${n}`], serverCode)
      .setIn(['client', `strItemList__${n}_2`], clientCode)
      .setIn(['client', `nItemListType__${n}_1`], clientType);

    if (itemList instanceof Map) {
      nextStore = nextStore.set(
        'arrayItems',
        entry.get('arrayItems', IMMUTABLE_LIST).push(itemList),
      );
    }

    return nextStore;
  },
  itemsListReshuffle: (store, value, { entry }) => {
    const itemsList = [];

    let setToN = 1;
    let nextStore = store;

    Array.from(Array(200)).forEach((_, index) => {
      const n = index + 1;
      const {
        serverCode,
        clientCode,
        clientType,
        client,
        server,
      } = getItemList(nextStore, { entry }, { n });

      if (
        (serverCode && serverCode.length > 1) ||
        (clientCode && clientCode.length > 1 && clientCode !== '00000000')
      ) {
        itemsList.push({ serverCode, clientCode, clientType });

        nextStore = Resolvers.itemListUpdate(nextStore, {
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
      nextStore = Resolvers.itemListRemove(nextStore, n);
    });

    return nextStore;
  },

  itemsListCount: (store, value) =>
    store
      .setIn(['server', `nStoreListCount`], value)
      .setIn(['client', `nStoreLISTcount`], value),

  itemsListResort: (store, nextIndexes, { entry }) => {
    let nextStore = store;

    nextIndexes.forEach((nextIndex, index) => {
      if (nextIndex + 1 === index + 1) {
        return;
      }

      const itemList = getItemList(store, { entry }, { n: nextIndex + 1 });
      nextStore = Resolvers.itemListUpdate(nextStore, {
        n: index + 1,
        clientCode: itemList.clientCode,
        clientType: itemList.clientType,
        serverCode: itemList.serverCode,
        itemList: itemList.server || itemList.client,
      });
    });

    return nextStore;
  },

  npcClass: (store, { value, n }) =>
    store
      .setIn(['server', `nNpcClass__${n}`], value)
      .setIn(['client', `nNpcClass__${n}`], value),

  mapCode: (store, value) => store.setIn(['server', 'strStoreMAPcode'], value),
};

export default Resolvers;
