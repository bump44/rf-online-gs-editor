/**
 *
 * ProjectStoreInteractingItemsListContentTxt
 *
 */

import { isBoolean, isFunction, isString, isFinite } from 'lodash';
import { Map } from 'immutable';
import { Modal, Button, Divider } from 'semantic-ui-react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import React from 'react';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { getClientCodeAvoidError } from '~/utils/converters';
import {
  getFiniteByTypeName,
  getTypeNamesByPrefix,
} from '~/structs/item_types_utils';

const style = {
  textarea: {
    minHeight: 300,
    width: '100%',
    padding: 10,
    border: '1px solid #ddd',
    boxShadow: '0 0 3px #ddd',
    fontSize: '11px',
  },
  pre: { margin: 0, marginBottom: 15 },
};

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreInteractingItemsListContentTxt extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { html: '', codes: [], show: false };
    this.toggleShow = () =>
      this.setState(prevState => ({ show: !prevState.show }));

    this.onClickSetCodes = () => {
      const { onClickSetCodes, storeActions, store } = this.props;
      const { html, codes } = this.state;

      if (isFunction(onClickSetCodes)) {
        onClickSetCodes(html, codes);
        return;
      }

      const datasets = codes
        .map(code => ({
          clientCode: getClientCodeAvoidError(code),
          serverCode: code,
          clientType: getFiniteByTypeName(
            getTypeNamesByPrefix(code.substring(0, 2))[0],
          ),
        }))
        .filter(dataset => isFinite(dataset.clientType) && dataset.clientCode)
        .map((dataset, index) => ({
          ...dataset,
          n: index + 1,
        }))
        .filter(dataset => dataset.n <= 200);

      datasets.forEach(dataset => storeActions.itemListUpdate(store, dataset));
      storeActions.changeItemsListCount(store, datasets.length);

      this.setState({ html: '', codes: [] });
      this.toggleShow();
    };

    this.onChangeContent = evt => {
      const { onChangeContent } = this.props;

      const codes = [];
      const html = sanitizeHtml(
        sanitizeHtml(evt.target.value.toString().substring(0, 50000), {
          allowedTags: ['div', 'br', 'hr'],
          allowedAttributes: {},
        }).replace(/([a-z]{2,5}[0-9]{2,4})/g, (match, code) => {
          codes.push(code);
          return `<span class="servercode">${code}</span>`;
        }),
        {
          allowedTags: ['span', 'div'],
          allowedAttributes: { span: ['class'] },
        },
      );

      this.setState({ html, codes });

      if (isFunction(onChangeContent)) {
        onChangeContent(html, codes);
      }
    };
  }

  render() {
    const { ...props } = this.props;
    const { html, show, codes } = this.state;

    return (
      <Modal
        trigger={
          props.trigger ? (
            props.trigger
          ) : (
            <Button primary size={props.triggerSize} onClick={this.toggleShow}>
              Set by content list
            </Button>
          )
        }
        size={props.size}
        onClose={isFunction(props.onClose) ? props.onClose : this.toggleShow}
        open={isBoolean(props.show) ? props.show : show}
      >
        <Modal.Content scrolling>
          <pre style={style.pre}>
            Paste server codes here (parsed {codes.length}
            ):
          </pre>
          <Wrapper>
            <ContentEditable
              style={style.textarea}
              html={isString(props.html) ? props.html : html}
              onChange={this.onChangeContent}
            />
          </Wrapper>
          <Divider />
          <Button primary onClick={this.onClickSetCodes}>
            Set {codes.length} codes
          </Button>
          {props.children}
        </Modal.Content>
      </Modal>
    );
  }
}

ProjectStoreInteractingItemsListContentTxt.propTypes = {
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  storeActions: PropTypes.object.isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  trigger: PropTypes.node,
  triggerSize: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onChangeContent: PropTypes.func,
  onClickSetCodes: PropTypes.func,
  size: PropTypes.string,
  html: PropTypes.string,
  children: PropTypes.node,
};

ProjectStoreInteractingItemsListContentTxt.defaultProps = {
  show: undefined,
  size: 'fullscreen',
  html: undefined,
  triggerSize: 'tiny',
};

export default ProjectStoreInteractingItemsListContentTxt;

const Wrapper = styled.div`
  .servercode {
    font-size: 16px;
    color: #ffff30;
    background: #333;
    display: inline-block;
    padding: 1px 10px;
    margin: 10px;
  }
`;
