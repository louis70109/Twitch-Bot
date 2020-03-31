const Sentry = require('@sentry/node');

const { NODE_ENV, SENTRY_DSN } = process.env;

const ENABLE_SENTRY = Boolean(SENTRY_DSN);

if (ENABLE_SENTRY) {
  Sentry.init({
    dsn: SENTRY_DSN,
  });
}

module.exports = async function HandleError(context, { error }) {
  console.error(error);
  if (NODE_ENV === 'development') {
    await context.sendText(error.stack);
  }
  if (ENABLE_SENTRY) {
    Sentry.captureException(error);
  }
};
