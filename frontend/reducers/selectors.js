

export const asArray = ( feeds ) => (
  Object.keys(feeds).map(key => feeds[key])
);
