export default () => {
  return {
    jwt: {
      secret: process.env.JWT_SECRET || 'secret',
    }
  };
}
