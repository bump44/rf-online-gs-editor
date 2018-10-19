import gql from 'graphql-tag';
import ItemClientNameParts from './ItemClientNameParts';
import ItemServerNameParts from './ItemServerNameParts';

const itemList = Array.from(Array(61)).map(
  (_, index) => `
itemList__${index + 1} {
  id
  type
  nIndex
  client {
    ...ItemClientNameParts
  }
  server {
    ...ItemServerNameParts
  }
}
`,
);

export default gql`
  fragment BoxItemOutItemListNameParts on BoxItemOut {
    ${itemList}
  }

  ${ItemClientNameParts}
  ${ItemServerNameParts}
`;
