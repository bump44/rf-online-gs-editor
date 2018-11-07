/**
 *
 * ProjectResourceSegmentBasic
 *
 */

import { Map } from 'immutable';

import {
  Segment,
  Label,
  Icon,
  Grid,
  Input,
  Button,
  Divider,
} from 'semantic-ui-react';

import PropTypes from 'prop-types';
import React from 'react';

import {
  getStatusColor,
  getIconName,
  getSubTask,
} from '~/containers/App/getters/nextValues';

import {
  getType,
  getCode,
  getFileNameBBX,
  getFileNameBN,
  getPath,
  getFileName,
  getCode2,
  getTexturePath,
  getPropNum,
  getPropValue,
} from '~/containers/App/getters/projectResource';

import { isBone, isMesh, isAni } from '~/structs/resource_types_utils';
import { getWorkdirFileName } from '~/utils/string';
import Notification from '~/components/Notification';

/* eslint-disable react/prefer-stateless-function */
class ProjectResourceSegmentBasic extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderLabel = this.renderLabel.bind(this);
    this.renderBone = this.renderBone.bind(this);
    this.renderMesh = this.renderMesh.bind(this);
    this.renderAni = this.renderAni.bind(this);

    this.createModelFilesFromThisData = () => {
      const { resourceActions, resource } = this.props;
      resourceActions.createModelFilesFromThisData(resource);
    };

    this.changeCode2 = evt => {
      const { resourceActions, resource } = this.props;
      resourceActions.changeCode2(resource, evt.target.value);
    };
  }

  renderLabel() {
    const { resource, resourceNextValues } = this.props;
    const type = getType(resourceNextValues.get('nextValue'), {
      entry: resource,
    });

    return (
      <Label color={getStatusColor(resourceNextValues)}>
        <Icon
          loading={resourceNextValues.get('isSaving')}
          name={getIconName(resourceNextValues)}
        />
        <Label.Detail>{type}</Label.Detail>
      </Label>
    );
  }

  renderBone() {
    const { resource, resourceNextValues } = this.props;

    const resourceNextValue = resourceNextValues.get('nextValue');
    const strCode = getCode(resourceNextValue, { entry: resource });
    const fileNameBBX = getFileNameBBX(resourceNextValue, { entry: resource });
    const fileNameBN = getFileNameBN(resourceNextValue, { entry: resource });
    const path = getPath(resourceNextValue, { entry: resource });

    return (
      <React.Fragment>
        <Grid>
          <Grid.Column width={2}>{this.renderLabel()}</Grid.Column>
          <Grid.Column width={4}>
            <Input value={strCode} size="mini" label="strCode" fluid />
          </Grid.Column>
          <Grid.Column width={5}>
            <Input
              value={fileNameBBX.replace(/^(.+?)\.BBX$/i, '$1')}
              size="mini"
              label=".BBX"
              labelPosition="right"
              fluid
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <Input
              value={fileNameBN.replace(/^(.+?)\.BN$/i, '$1')}
              size="mini"
              label=".BN"
              labelPosition="right"
              fluid
            />
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={6}>
            <Input value={path} size="mini" label="strPath" fluid />
          </Grid.Column>
          <Grid.Column width={5}>
            <Input
              value={getWorkdirFileName([path, fileNameBBX])}
              size="mini"
              label="HashBBX"
              fluid
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <Input
              value={getWorkdirFileName([path, fileNameBN])}
              size="mini"
              label="HashBN"
              fluid
            />
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }

  renderMesh() {
    const { resource, resourceNextValues } = this.props;

    const resourceNextValue = resourceNextValues.get('nextValue');
    const strCode = getCode(resourceNextValue, { entry: resource });
    const strCode2 = getCode2(resourceNextValue, { entry: resource });
    const fileName = getFileName(resourceNextValue, { entry: resource });
    const path = getPath(resourceNextValue, { entry: resource });
    const texturePath = getTexturePath(resourceNextValue, { entry: resource });

    return (
      <React.Fragment>
        <Grid>
          <Grid.Column width={2}>{this.renderLabel()}</Grid.Column>
          <Grid.Column width={4}>
            <Input value={strCode} size="mini" label="strCode" fluid />
          </Grid.Column>
          <Grid.Column width={4}>
            <Input
              value={strCode2}
              onChange={this.changeCode2}
              size="mini"
              label="strCode2"
              fluid
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Input
              value={fileName.replace(/^(.+?)\.MSH$/i, '$1')}
              size="mini"
              label=".MSH"
              labelPosition="right"
              fluid
            />
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={6}>
            <Input value={path} size="mini" label="strPath" fluid />
          </Grid.Column>
          <Grid.Column width={4}>
            <Input
              value={texturePath}
              size="mini"
              label="strTexturePath"
              fluid
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Input
              value={getWorkdirFileName([path, fileName])}
              size="mini"
              label="HashMSH"
              fluid
            />
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }

  renderAni() {
    const { resource, resourceNextValues } = this.props;

    const resourceNextValue = resourceNextValues.get('nextValue');
    const strCode = getCode(resourceNextValue, { entry: resource });
    const strCode2 = getCode2(resourceNextValue, { entry: resource });
    const fileName = getFileName(resourceNextValue, { entry: resource });
    const path = getPath(resourceNextValue, { entry: resource });
    const propNum = getPropNum(resourceNextValue, { entry: resource });

    return (
      <React.Fragment>
        <Grid>
          <Grid.Column width={2}>{this.renderLabel()}</Grid.Column>
          <Grid.Column width={4}>
            <Input value={strCode} size="mini" label="strCode" fluid />
          </Grid.Column>
          <Grid.Column width={4}>
            <Input value={strCode2} size="mini" label="strCode2" fluid />
          </Grid.Column>
          <Grid.Column width={6}>
            <Input
              value={fileName.replace(/^(.+?)\.ANI$/i, '$1')}
              size="mini"
              label=".ANI"
              labelPosition="right"
              fluid
            />
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={6}>
            <Input value={path} size="mini" label="strPath" fluid />
          </Grid.Column>
          <Grid.Column width={4}>
            <Input
              value={propNum}
              type="number"
              min="0"
              max="10"
              size="mini"
              label="nPropNum"
              fluid
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Input
              value={getWorkdirFileName([path, fileName])}
              size="mini"
              label="HashANI"
              fluid
            />
          </Grid.Column>
        </Grid>
        <Grid>
          {Array.from(Array(10)).map((_, index) => (
            <Grid.Column width={4} key={`propValue_${index + 1}`}>
              <Input
                value={getPropValue(resourceNextValue, {
                  entry: resource,
                  n: index + 1,
                })}
                size="mini"
                label={`nPropValue${index + 1}`}
                fluid
              />
            </Grid.Column>
          ))}
        </Grid>
      </React.Fragment>
    );
  }

  render() {
    const { resource, resourceNextValues, style } = this.props;
    const type = getType(resourceNextValues.get('nextValue'), {
      entry: resource,
    });

    const actionCreateModelFilesFromThisData = getSubTask(
      resourceNextValues,
      'createModelFilesFromThisData',
    );

    return (
      <Segment color="yellow" style={style}>
        {isBone(type) && this.renderBone()}
        {isMesh(type) && this.renderMesh()}
        {isAni(type) && this.renderAni()}

        <Divider />

        {actionCreateModelFilesFromThisData.isError && (
          <Notification type="danger">
            {actionCreateModelFilesFromThisData.errorMessage}
          </Notification>
        )}

        <Button
          primary
          size="small"
          onClick={this.createModelFilesFromThisData}
          loading={actionCreateModelFilesFromThisData.isProcessing}
          disabled={actionCreateModelFilesFromThisData.isProcessing}
        >
          Create Model Files From This Data
        </Button>
        <Button size="small">Select from Monsters</Button>
        <Button size="small">Select from Stores</Button>
      </Segment>
    );
  }
}

ProjectResourceSegmentBasic.propTypes = {
  resource: PropTypes.instanceOf(Map).isRequired,
  resourceNextValues: PropTypes.instanceOf(Map).isRequired,
  resourceActions: PropTypes.object.isRequired,
  style: PropTypes.object,
};

ProjectResourceSegmentBasic.defaultProps = {
  style: {},
};

export default ProjectResourceSegmentBasic;
