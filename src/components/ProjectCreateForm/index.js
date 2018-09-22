/**
 *
 * ProjectCreateForm
 *
 */

import React from 'react';
import { Icon, Button, Checkbox, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ProjectCreateForm({
  size,
  loading,
  values,
  onSubmit,
  onChangeTitle,
  onChangeDescription,
  onChangeIsPublic,
}) {
  return (
    <Form size={size} loading={loading}>
      <Form.Field>
        <label>
          <FormattedMessage {...messages.Title} />
        </label>
        <input value={values.title} onChange={onChangeTitle} />
      </Form.Field>
      <Form.Field>
        <label>
          <FormattedMessage {...messages.Description} />
        </label>
        <textarea value={values.description} onChange={onChangeDescription} />
      </Form.Field>
      <Form.Field>
        <Checkbox
          value={1}
          checked={values.isPublic}
          label={
            <label>
              <FormattedMessage {...messages.IsPublicProject} />
            </label>
          }
          type="checkbox"
          onChange={onChangeIsPublic}
        />
      </Form.Field>

      <Button type="submit" primary onClick={onSubmit}>
        <Icon name="plus" />
        <FormattedMessage {...messages.Submit} />
      </Button>
    </Form>
  );
}

ProjectCreateForm.propTypes = {
  size: PropTypes.oneOf([
    'mini',
    'tiny',
    'small',
    'large',
    'big',
    'huge',
    'massive',
  ]),
  loading: PropTypes.bool,
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onChangeIsPublic: PropTypes.func.isRequired,
};

ProjectCreateForm.defaultProps = {
  size: 'small',
  loading: false,
};

export default ProjectCreateForm;
