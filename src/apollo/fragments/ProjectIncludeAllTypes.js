import gql from 'graphql-tag';

export default gql`
  fragment ProjectIncludeAllTypes on Project {
    moneyTypes {
      items {
        title
        value
        fieldName
        valuation
      }
    }

    itemGradeTypes {
      items {
        title
        value
      }
    }

    weaponTypes {
      items {
        title
        value
      }
    }

    effectTypes {
      items {
        title
        value
      }
    }

    expertTypes {
      items {
        title
        value
      }
    }

    mapNameTypes {
      items {
        title
        value
      }
    }
  }
`;
