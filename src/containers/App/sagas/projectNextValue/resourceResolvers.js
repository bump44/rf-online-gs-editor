const Resolvers = {
  fileNameBBX(resource, value) {
    return resource.set('strFileNameBBX', value);
  },
  fileNameBN(resource, value) {
    return resource.set('strFileNameBN', value);
  },
  fileName(resource, value) {
    return resource.set('strFileName', value);
  },
  code(resource, value) {
    return resource.set('strCode', value);
  },
  code2(resource, value) {
    return resource.set('strCode2', value);
  },
};

export default Resolvers;
