import { forEach, isFinite } from 'lodash';
import Field from 'classes/Field';

function generateFieldsFromSchema1(schema1 = []) {
  if (!(schema1 instanceof Array)) {
    throw new Error('Schema1 must be array');
  }

  const fields = [];

  const fnProcess = {
    forEach: (arr = [], indexes = [], withoutIndex = false) =>
      arr.forEach((row, index) =>
        fnProcess.processRow(
          row,
          withoutIndex ? indexes : [...indexes, index + 1],
        ),
      ),

    processRow: (row = {}, indexes) => {
      const { child, repeat } = row;
      const selectedRepeat = isFinite(repeat) && repeat >= 1 ? repeat : 1;

      if (!child) {
        return fnProcess.processCreateField(row, indexes);
      }

      if (selectedRepeat === 1) {
        return fnProcess.processChild(child, [
          ...(indexes instanceof Array ? indexes : [indexes]),
        ]);
      }

      return Array.from(Array(selectedRepeat)).forEach((_, subindex) =>
        fnProcess.processChild(child, [
          ...(indexes instanceof Array ? indexes : [indexes]),
          subindex + 1,
        ]),
      );
    },
    processChild: (child, indexes) => {
      if (child instanceof Array) {
        return fnProcess.forEach(child, indexes);
      }

      return fnProcess.processCreateField(child, indexes);
    },
    processCreateField: (field, indexes) => {
      const fieldName = (() => {
        if (typeof field.name === 'string') {
          return (indexes.length > 0
            ? [`${field.name}_`, ...indexes]
            : [field.name]
          ).join('_');
        }

        if (typeof field.name === 'function') {
          return field.name(indexes);
        }

        console.error(field, indexes); // eslint-disable-line
        throw new Error('Field Name is required');
      })();

      return fields.push(
        new Field({
          ...field,
          name: fieldName,
        }),
      );
    },
  };

  fnProcess.forEach(schema1, [], true);
  return fields;
}

class Struct {
  constructor(...fields) {
    this.fields = [];
    this.namedFields = {};
    this.lastPushed = undefined;
    this.pushFields(fields);
  }

  fromSchema1(schema1 = []) {
    const fields = generateFieldsFromSchema1(schema1);
    this.pushFields(fields);
    return this;
  }

  pushField(field) {
    if (this.namedFields[field.getName()] !== undefined) {
      console.error('Invalid field', 'Last pushed:', this.lastPushed); // eslint-disable-line

      throw new Error(
        `Field names must be unique in one structure! "${field.getName()}" duplicated!`,
      );
    }
    this.namedFields[field.getName()] = field;
    this.fields.push(this.namedFields[field.getName()]);
    this.lastPushed = field;
    return this;
  }

  pushFields(fields) {
    forEach(fields, field => {
      if (field instanceof Struct) {
        return this.pushFields(field.getFields());
      }

      if (field instanceof Array) {
        return this.pushFields(field);
      }

      if (field instanceof Field) {
        return this.pushField(field);
      }

      console.error('Invalid field', 'Last pushed:', this.lastPushed); // eslint-disable-line

      throw new Error(
        `You must be pass a valid Struct/Field/Array, received "${typeof field}"!`,
      );
    });

    return this;
  }

  getWeight() {
    return this.fields.reduce((acc, value) => acc + value.getWeight(), 0);
  }

  getFields() {
    return this.fields;
  }

  getFieldNames() {
    return this.fields.map(field => field.getName());
  }

  toSchema() {
    return this.fields.map(field => field.toSchema());
  }

  isDynamic() {
    return this.fields.some(field => field.isDynamic());
  }
}

export default Struct;
