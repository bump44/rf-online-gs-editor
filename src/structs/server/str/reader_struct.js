import defaultHeader from './default_header';
import struct from './struct';

const readerStruct = [
  {
    header: defaultHeader,
    block: struct,
  },
];

export default readerStruct;
