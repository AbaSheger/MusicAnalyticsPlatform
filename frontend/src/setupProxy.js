module.exports = function(app) {
  // This runs only in local development
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
};