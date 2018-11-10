import gql from 'graphql-tag';

export default gql`
  fragment ProjectIncludeAllTypes on Project {
    moneyTypes {
      items {
        id
        title
        value
        fieldName
        valuation
      }
    }

    itemGradeTypes {
      items {
        id
        title
        value
      }
    }

    weaponTypes {
      items {
        id
        title
        value
      }
    }

    buttonTypes {
      items {
        id
        title
        value
      }
    }

    effectTypes {
      items {
        id
        title
        value
      }
    }

    expertTypes {
      items {
        id
        title
        value
      }
    }

    mapNameTypes {
      items {
        id
        title
        value
        caseSens
      }
    }
  }
`;
