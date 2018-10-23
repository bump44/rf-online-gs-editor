/* eslint-disable default-case, no-fallthrough */
import { isInteger } from 'lodash';
import invariant from 'invariant';

class Field {
  constructor({ type, name, len, as, schemaProps = {} } = {}) {
    invariant(
      [Number, Boolean, String].includes(type),
      `Field type must be one of Number|Boolean|String`,
    );

    invariant(
      typeof name === 'string' && name.length >= 2,
      `Field name must be a string of at least two characters`,
    );

    invariant(
      typeof len === 'function' || isInteger(len),
      `Field len must be a integer or function`,
    );

    invariant(
      !as ||
        (as === 'hex' && type === String) ||
        (as === 'float' && type === Number),
      `Field as must be undefined or type: String & as: 'hex'|type: Number & as: 'float'`,
    );

    this.type = type;
    this.name = name;
    this.len = len;
    this.as = as;
    this.schemaProps = schemaProps;
    this.dynamic = typeof this.len === 'function';
  }

  /**
   * Is have dynamic attribute
   *
   * @returns Boolean
   */
  isDynamic() {
    return this.dynamic;
  }

  /**
   * Return as attribute
   *
   * @returns undefined|String oneOf(['hex', 'float'])
   */
  getAs() {
    return this.as;
  }

  /**
   * Return name attribute
   *
   * @returns String
   */
  getName() {
    return this.name;
  }

  /**
   * Return type attribute
   *
   * @returns Object oneOf([Number, Boolean, String])
   */
  getType() {
    return this.type;
  }

  /**
   * Return length attribute
   * @param {Object} payload required if isDynamic true
   *
   * @returns Number
   */
  getLen(payload) {
    invariant(!this.isDynamic() || payload, `Values is required`);
    const values = payload || {};
    return typeof this.len === 'function' ? this.len(values) : this.len;
  }

  /**
   * Return field weight
   * @param {Object} payload required if isDynamic true
   *
   * @returns Number
   */
  getWeight(payload) {
    invariant(!this.isDynamic() || payload, `Values is required`);
    const values = payload || {};
    const len = this.getLen(values);

    switch (this.getType()) {
      case Boolean:
      case Number:
        switch (len) {
          case 8:
            return 1;
          case 16:
            return 2;
          case 32:
            return 4;
          case 64:
            return 8;
          default:
            throw new Error(
              `Unknown argument 'length' (${len}) on field type Boolean|Number, must be one of 8|16|32|64`,
            );
        }
      case String:
        switch (this.getAs()) {
          case 'hex':
            switch (len) {
              case 8:
                return 1;
              case 16:
                return 2;
              case 32:
                return 4;
              default:
                throw new Error(
                  `Unknown argument 'length' (${len}) on field type String & as: 'hex', must be one of 8|16|32`,
                );
            }
          default:
            return len;
        }
    }

    throw new Error(`Unknown weight`);
  }

  toObject() {
    return {
      type: this.type,
      name: this.name,
    };
  }

  toSchema() {
    return {
      ...this.toObject(),
      props: {
        type: this.type,
        ...this.schemaProps,
      },
    };
  }
}

export default Field;
