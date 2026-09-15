// ============================================================
//  modules/logger.js — Custom Logger Module (Bonus: timestamps + ANSI colors)
// ============================================================

const COLORS = {
  reset:   '\x1b[0m',
  bright:  '\x1b[1m',
  green:   '\x1b[32m',
  yellow:  '\x1b[33m',
  red:     '\x1b[31m',
  cyan:    '\x1b[36m',
  magenta: '\x1b[35m',
  blue:    '\x1b[34m',
};

/**
 * Returns a formatted timestamp string: [YYYY-MM-DD HH:MM:SS]
 */
function getTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `[${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
         `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}]`;
}

const logger = {
  /**
   * Logs a success (green) message with a timestamp.
   * @param {string} message
   */
  success(message) {
    console.log(
      `${COLORS.green}${COLORS.bright}✔ ${getTimestamp()} [SUCCESS]${COLORS.reset} ${COLORS.green}${message}${COLORS.reset}`
    );
  },

  /**
   * Logs an info (cyan) message with a timestamp.
   * @param {string} message
   */
  info(message) {
    console.log(
      `${COLORS.cyan}${COLORS.bright}i ${getTimestamp()} [INFO]   ${COLORS.reset} ${COLORS.cyan}${message}${COLORS.reset}`
    );
  },

  /**
   * Logs a warning (yellow) message with a timestamp.
   * @param {string} message
   */
  warn(message) {
    console.log(
      `${COLORS.yellow}${COLORS.bright}! ${getTimestamp()} [WARN]   ${COLORS.reset} ${COLORS.yellow}${message}${COLORS.reset}`
    );
  },

  /**
   * Logs an error (red) message with a timestamp.
   * @param {string} message
   */
  error(message) {
    console.log(
      `${COLORS.red}${COLORS.bright}x ${getTimestamp()} [ERROR]  ${COLORS.reset} ${COLORS.red}${message}${COLORS.reset}`
    );
  },

  /**
   * Logs a debug (magenta) message with a timestamp.
   * @param {string} message
   */
  debug(message) {
    console.log(
      `${COLORS.magenta}${COLORS.bright}* ${getTimestamp()} [DEBUG]  ${COLORS.reset} ${COLORS.magenta}${message}${COLORS.reset}`
    );
  },
};

module.exports = logger;
