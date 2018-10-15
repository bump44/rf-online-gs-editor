import FileReader from '../../../classes/FileReader';
import { COUNT, COUNT_COLUMNS, BLOCK_SIZE } from '../../../classes/constants';

export default class ServerMapsptReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerMapsptReader',
      struct: undefined,
    });
  }

  getBlocks() {
    if (this.cache.blocks !== undefined) {
      return this.cache.blocks;
    }

    const str = this.getBuffer().toString();
    const blocks = [];
    const reg = /\t*?\*([^\s]+?)\s+?([-0-9]+?)\s+?([-0-9]+?)\s+?([-0-9]+?)\s+?([-0-9]+?)\s+?([-0-9]+?)\s+?([-0-9]+?)\s*?\n(\s*?(-node_tm)\s*?\n)?\s*?([-0-9.]+?)\s+?([-0-9.]+?)\s+?([-0-9.]+?)\s+?([-0-9.]+?)\s*?\n\s*?([-0-9.]+?)\s+?([-0-9.]+?)\s+?([-0-9.]+?)\s+?([-0-9.]+?)\s*?\n\s*?([-0-9.]+?)\s+?([-0-9.]+?)\s+?([-0-9.]+?)\s+?([-0-9.]+?)\s*?\n\s*?([-0-9.]+?)\s+?([-0-9.]+?)\s+?([-0-9.]+?)\s+?([-0-9.]+?)\s*?\n/gi;

    str.replace(
      reg,
      (
        match,
        g1,
        g2,
        g3,
        g4,
        g5,
        g6,
        g7,
        g8,
        g9,
        g10,
        g11,
        g12,
        g13,
        g14,
        g15,
        g16,
        g17,
        g18,
        g19,
        g20,
        g21,
        g22,
        g23,
        g24,
        g25,
      ) => {
        blocks.push({
          strAnchor: g1,

          a1: parseInt(g2, 10),
          a2: parseInt(g3, 10),
          a3: parseInt(g4, 10),
          a4: parseInt(g5, 10),
          a5: parseInt(g6, 10),
          a6: parseInt(g7, 10),

          bExcludeNodeTm: !!g9,

          b1: parseFloat(g10),
          b2: parseFloat(g11),
          b3: parseFloat(g12),
          b4: parseFloat(g13),

          c1: parseFloat(g14),
          c2: parseFloat(g15),
          c3: parseFloat(g16),
          c4: parseFloat(g17),

          d1: parseFloat(g18),
          d2: parseFloat(g19),
          d3: parseFloat(g20),
          d4: parseFloat(g21),

          e1: parseFloat(g22),
          e2: parseFloat(g23),
          e3: parseFloat(g24),
          e4: parseFloat(g25),
        });
      },
    );

    this.cache.blocks = [
      {
        header: this.calcHeader(blocks),
        blocks,
      },
    ];
    return blocks;
  }

  calcHeader(blocks) {
    return {
      [COUNT]: blocks.length,
      [COUNT_COLUMNS]: 24,
      [BLOCK_SIZE]: 517, // ~
    };
  }

  getHeaders() {
    const blocks = this.getBlocks();
    return [{ header: this.calcHeader(blocks) }];
  }
}
