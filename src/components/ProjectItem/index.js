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
  actions,
  moneyTypes,
  itemGrades,
  weaponTypes,
  localSettings,
}) {
  const Render = renderResolvers[item.get('type')];

  return (
    <div style={style}>
      {!Render && <FormattedMessage {...messages.RenderNotDefined} />}
      {Render && (
        <Render
          item={item}
          itemNextValues={itemNextValues}
          actions={actions}
          moneyTypes={moneyTypes}
          itemGrades={itemGrades}
          weaponTypes={weaponTypes}
          localSettings={localSettings}
        />
      )}
    </div>
  );
}

ProjectItem.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGrades: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  actions: PropTypes.object.isRequired,
  style: PropTypes.object,
};

ProjectItem.defaultProps = {
  style: undefined,
};

export default ProjectItem;
