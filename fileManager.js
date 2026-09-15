// ============================================================
//  fileManager.js — CRUD File Operations using the fs module
// ============================================================
//  Demonstrates: writeFile, readFile, appendFile, unlink
//  Run: node fileManager.js
// ============================================================

const fs = require('fs');
const path = require('path');
const logger = require('./modules/logger');

// ── Config ────────────────────────────────────────────────────
const FILE_PATH = path.join(__dirname, 'test.txt');

// ── Utility: separator ────────────────────────────────────────
function separator(label) {
  console.log(`\n\x1b[1m\x1b[34m--- ${label} ---\x1b[0m`);
}

// ── 1. CREATE FILE ────────────────────────────────────────────
separator('Step 1: Create File');
logger.info(`Creating File... → ${FILE_PATH}`);

fs.writeFile(FILE_PATH, 'Hello Node.js\n', 'utf8', (err) => {
  if (err) {
    logger.error(`Failed to create file: ${err.message}`);
    return;
  }
  logger.success('File Created');

  // ── 2. READ FILE ──────────────────────────────────────────
  separator('Step 2: Read File');
  logger.info('Reading File...');

  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      logger.error(`Failed to read file: ${err.message}`);
      return;
    }
    console.log('\x1b[33m' + data.trim() + '\x1b[0m');
    logger.success('File Read Successfully');

    // ── 3. UPDATE FILE (append) ────────────────────────────
    separator('Step 3: Update File (Append)');
    logger.info('Appending new content to file...');

    fs.appendFile(FILE_PATH, 'Learning FS Module\n', 'utf8', (err) => {
      if (err) {
        logger.error(`Failed to update file: ${err.message}`);
        return;
      }
      logger.success('File Updated');

      // ── Read again to confirm update ───────────────────
      fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
          logger.error(`Failed to read updated file: ${err.message}`);
          return;
        }
        logger.info('Updated file contents:');
        console.log('\x1b[33m' + data.trim() + '\x1b[0m');

        // ── 4. DELETE FILE ─────────────────────────────────
        separator('Step 4: Delete File');
        logger.info(`Deleting file → ${FILE_PATH}`);

        fs.unlink(FILE_PATH, (err) => {
          if (err) {
            logger.error(`Failed to delete file: ${err.message}`);
            return;
          }
          logger.success('File Deleted');

          // ── 5. Read missing file (graceful error) ──────
          separator('Step 5: Graceful Error Handling');
          logger.info('Attempting to read deleted file...');

          fs.readFile(FILE_PATH, 'utf8', (err) => {
            if (err) {
              logger.error(`Expected error → File not found: ${err.code}`);
              logger.warn('Always handle file errors gracefully in production!');
            }
            logger.info('File Manager demo complete.');
          });
        });
      });
    });
  });
});
