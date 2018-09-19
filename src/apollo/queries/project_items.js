import gql from 'graphql-tag';

export default gql`
  query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
    projectItems(take: $take, skip: $skip, sort: $sort, where: $where) {
      items {
        id
        type
        nIndex
        searchTextValue
        client {
          strCode
          strName
          strModel
          nIconIDX
          strCivil1
          strCivil2
          civil_bm
          civil_bf
          civil_cm
          civil_cf
          civil_a
          nMoney
          nUnkInt16
          nStdPrice
          nStdPoint
          nGoldPoint
          nProcPoint
          nKillPoint
          nStoragePrice
          bExchange
          bSell
          bGround
          bStoragePossible
          nDescription
          bExist
          bIsCash
          bIsTime
          nUpLevelLim
          nUnkInt32
          nItemGrade
        }
        server {
          strName
          strCode
        }
      }
      total
    }
  }
`;
