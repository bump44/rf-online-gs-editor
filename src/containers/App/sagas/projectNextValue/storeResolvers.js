import { isInteger } from 'lodash';
import { Map } from 'immutable';

import { getItemList, getLimItemList } from '../../getters/projectStore';
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
  npcClass: (store, { value, n }) =>
    store
      .setIn(['server', `nNpcClass__${n}`], value)
      .setIn(['client', `nNpcClass__${n}`], value),

  mapCode: (store, value) => store.setIn(['server', 'strStoreMAPcode'], value),

  // items list
  itemListClientType: (store, { value, n }) => {
    let nextStore = store.setIn(['client', `nItemListType__${n}_1`], value);

    if (n <= 16) {
      nextStore = Resolvers.limItemListRemove(nextStore, n);
      nextStore = Resolvers.limItemsListCount(nextStore, n - 1);
    }

    return nextStore;
  },
  itemListClientCode: (store, { value, n }) => {
    let nextStore = store.setIn(['client', `strItemList__${n}_2`], value);

    if (n <= 16) {
      nextStore = Resolvers.limItemListRemove(nextStore, n);
      nextStore = Resolvers.limItemsListCount(nextStore, n - 1);
    }

    return nextStore;
  },
  itemListServerCode: (store, { value, n }) => {
    let nextStore = store.setIn(['server', `strItemCode__${n}`], value);

    if (n <= 16) {
      nextStore = Resolvers.limItemListRemove(nextStore, n);
      nextStore = Resolvers.limItemsListCount(nextStore, n - 1);
    }

    return nextStore;
  },
  itemListRemove: (store, n) =>
    store
      .setIn(['server', `strItemCode__${n}`], '')
      .setIn(['client', `strItemList__${n}_2`], '')
      .setIn(['client', `nItemListType__${n}_1`], 0),
  itemListUpdate: (
    store,
    { n, clientCode = '', clientType = 0, serverCode = '', itemList } = {},
  ) => {
    let nextStore = store
      .setIn(['server', `strItemCode__${n}`], serverCode)
      .setIn(['client', `strItemList__${n}_2`], clientCode)
      .setIn(['client', `nItemListType__${n}_1`], clientType);

    if (itemList instanceof Map) {
      nextStore = nextStore.set(
        'items',
        nextStore.get('items', IMMUTABLE_LIST).push(itemList),
      );
    }

    if (n <= 16) {
      nextStore = Resolvers.limItemListUpdate(nextStore, { n });
    }

    return nextStore;
  },
  itemsListReshuffle: (store, value, { entry }) => {
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

  // limited items list
  limItemListClientType: (store, { value, n }) =>
    store.setIn(['client', `nLimItemType__${n}_1`], value),
  limItemListClientCode: (store, { value, n }) =>
    store.setIn(['client', `strLimItemCode__${n}_2`], value),
  limItemListServerCode: (store, { value, n }) =>
    store.setIn(['server', `strLimItemCode__${n}_1`], value),
  limItemListMaxCount: (store, { value, n }) =>
    store
      .setIn(['server', `nLimMaxCount__${n}_2`], value)
      .setIn(['client', `nLimMaxCount__${n}_3`], value),
  limItemListRemove: (store, n) =>
    store
      .setIn(['server', `strLimItemCode__${n}_1`], '')
      .setIn(['client', `strLimItemCode__${n}_2`], '')
      .setIn(['client', `nLimItemType__${n}_1`], 0)
      .setIn(['server', `nLimMaxCount__${n}_2`], 0)
      .setIn(['client', `nLimMaxCount__${n}_3`], 0),
  limItemListUpdate: (
    store,
    {
      n,
      clientCode = '',
      clientType = 0,
      serverCode = '',
      serverCount,
      clientCount = 0,
      itemList,
    } = {},
  ) => {
    let nextStore = store
      .setIn(['server', `strLimItemCode__${n}_1`], serverCode)
      .setIn(['client', `strLimItemCode__${n}_2`], clientCode)
      .setIn(['client', `nLimItemType__${n}_1`], clientType);

    if (isInteger(serverCount) || isInteger(clientCount)) {
      nextStore = nextStore
        .setIn(
          ['server', `nLimMaxCount__${n}_2`],
          isInteger(serverCount) ? serverCount : clientCount,
        )
        .setIn(
          ['client', `nLimMaxCount__${n}_3`],
          isInteger(serverCount) ? serverCount : clientCount,
        );
    }

    if (itemList instanceof Map) {
      nextStore = nextStore.set(
        'items',
        nextStore.get('items', IMMUTABLE_LIST).push(itemList),
      );
    }

    return nextStore;
  },
  limItemsListReshuffle: (store, value, { entry }) => {
    let setToN = 1;
    let nextStore = store;

    Array.from(Array(16)).forEach((_, index) => {
      const n = index + 1;

      const {
        serverCode,
        serverCount,
        clientCode,
        clientType,
        clientCount,
        client,
        server,
      } = getLimItemList(nextStore, { entry }, { n });

      if (
        (serverCode && serverCode.length > 1) ||
        (clientCode && clientCode.length > 1 && clientCode !== '00000000')
      ) {
        nextStore = Resolvers.itemListUpdate(nextStore, {
          n: setToN,
          serverCode,
          clientCode,
          clientType,
          serverCount,
          clientCount,
          itemList: server || client,
        });

        setToN += 1;
      }
    });

    Array.from(Array(16 - setToN - 1)).forEach((_, index) => {
      const n = index + setToN;
      nextStore = Resolvers.limItemListRemove(nextStore, n);
    });

    return nextStore;
  },

  limItemsListCount: (store, value) =>
    store
      .setIn(['server', `nLimitListCount`], value)
      .setIn(['client', `nLimitLISTcount`], value),

  limItemsListResort: (store, nextIndexes, { entry }) => {
    let nextStore = store;

    nextIndexes.forEach((nextIndex, index) => {
      if (nextIndex + 1 === index + 1) {
        return;
      }

      const itemList = getLimItemList(store, { entry }, { n: nextIndex + 1 });
      nextStore = Resolvers.limItemListUpdate(nextStore, {
        n: index + 1,
        clientCode: itemList.clientCode,
        clientType: itemList.clientType,
        clientCount: itemList.clientCount,
        serverCode: itemList.serverCode,
        serverCount: itemList.serverCount,
        itemList: itemList.server || itemList.client,
      });
    });

    return nextStore;
  },
};

export default Resolvers;
