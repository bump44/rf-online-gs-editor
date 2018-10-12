/**
 *
 * ProjectItem
 *
 */

import React from 'react';
import { Map, List } from 'immutable';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import renderResolvers from './renderResolvers';

function ProjectItem({
  item,
  style,
  itemNextValues,
  itemActions,
  moneyTypes,
  itemGradeTypes,
  weaponTypes,
  expertTypes,
  effectTypes,
  localSettings,
  nextValues,
  boxItemOutActions,
  entriesFinderItemsActions,
  entriesFinderItems,
}) {
  const Render = renderResolvers[item.get('type')];

  return (
    <div style={style}>
      {!Render && <FormattedMessage {...messages.RenderNotDefined} />}
      {Render && (
        <Render
          item={item}
          itemNextValues={itemNextValues}
          itemActions={itemActions}
          moneyTypes={moneyTypes}
          expertTypes={expertTypes}
          effectTypes={effectTypes}
          itemGradeTypes={itemGradeTypes}
          weaponTypes={weaponTypes}
          localSettings={localSettings}
          nextValues={nextValues}
          boxItemOutActions={boxItemOutActions}
          entriesFinderItemsActions={entriesFinderItemsActions}
          entriesFinderItems={entriesFinderItems}
        />
      )}
    </div>
  );
}

ProjectItem.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  expertTypes: PropTypes.instanceOf(List).isRequired,
  effectTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  itemActions: PropTypes.object.isRequired,
  boxItemOutActions: PropTypes.object.isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
  style: PropTypes.object,
};

ProjectItem.defaultProps = {
  style: undefined,
};

export default ProjectItem;
