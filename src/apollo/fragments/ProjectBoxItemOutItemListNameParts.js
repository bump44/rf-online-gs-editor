import gql from 'graphql-tag';
import ProjectItemClientNameParts from './ProjectItemClientNameParts';
import ProjectItemServerNameParts from './ProjectItemServerNameParts';

const itemList = Array.from(Array(61)).map(
  (_, index) => `
itemList__${index + 1} {
  id
  type
  nIndex
  client {
    ...ProjectItemClientNameParts
  }
  server {
    ...ProjectItemServerNameParts
  }
}
`,
);

export default gql`
  fragment ProjectBoxItemOutItemListNameParts on ProjectBoxItemOut {
    ${itemList}
  }

  ${ProjectItemClientNameParts}
  ${ProjectItemServerNameParts}
`;
