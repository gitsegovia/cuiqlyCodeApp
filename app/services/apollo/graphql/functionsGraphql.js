export const getGraphQlError = (error) => {
  return {
    error: true,
    messages: error
      .toString()
      .replace('Error: ', '')
      .replace('GraphQL error: ', ''),
  };
};
