import gql from 'graphql-tag';

import BoxItemOutNameParts from '~/apollo/fragments/BoxItemOutNameParts';
import SkillForceClientNameParts from '~/apollo/fragments/SkillForceClientNameParts';
import SkillForceServerNameParts from '~/apollo/fragments/SkillForceServerNameParts';
import ItemClientNameParts from '~/apollo/fragments/ItemClientNameParts';
import ItemServerNameParts from '~/apollo/fragments/ItemServerNameParts';
import ProjectIncludeAllTypes from '~/apollo/fragments/ProjectIncludeAllTypes';

export default gql`
  query($id: String!, $itemId: String!) {
    project(id: $id) {
      title
      description
      name
      id
      createdAt
      updatedAt
      isPublic

      owner {
        id
        login
        role {
          id
          name
          title
        }
      }

      items {
        total
      }

      stores {
        total
      }

      itemsBox: items(where: { type: "box" }) {
        total
      }

      boxItemOuts {
        total
      }

      # include types
      ...ProjectIncludeAllTypes
    }

    item(id: $itemId) {
      id
      type
      nIndex
      isRemoved

      clientND {
        strName
      }

      client {
        ...ItemClientNameParts
      }

      server {
        ...ItemServerNameParts
      }

      items {
        id
        type
        nIndex
        isRemoved

        clientND {
          strName
        }

        client {
          ...ItemClientNameParts
        }

        server {
          ...ItemServerNameParts
        }
      }

      boxItemOuts {
        id
        nIndex
        ...BoxItemOutNameParts

        items {
          id
          type
          nIndex
          isRemoved

          clientND {
            strName
          }

          client {
            ...ItemClientNameParts
          }

          server {
            ...ItemServerNameParts
          }
        }
      }

      skillForces {
        id
        nIndex
        projectId
        type

        client {
          ...SkillForceClientNameParts
        }

        server {
          ...SkillForceServerNameParts
        }
      }
    }
  }

  # include fragments
  ${ProjectIncludeAllTypes}
  ${ItemClientNameParts}
  ${ItemServerNameParts}
  ${BoxItemOutNameParts}
  ${SkillForceServerNameParts}
  ${SkillForceClientNameParts}
`;
