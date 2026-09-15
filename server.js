// ============================================================
//  server.js — Basic HTTP Server using the http core module
// ============================================================
//  Run:   node server.js
//  Routes:
//    GET /         → Welcome message
//    GET /about    → About page
//    GET /contact  → Contact page
//    Any other     → 404 Not Found
// ============================================================

const http = require('http');
const logger = require('./modules/logger');

const PORT = 3000;

// ── ANSI colors for terminal request logs ─────────────────────
const C = {
  reset:  '\x1b[0m',
  bright: '\x1b[1m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  red:    '\x1b[31m',
  cyan:   '\x1b[36m',
  blue:   '\x1b[34m',
};

// ── Route Definitions ─────────────────────────────────────────
const routes = {
  '/': {
    statusCode: 200,
    body: `
      <html>
        <head><title>Smart Utility Toolkit</title></head>
        <body style="font-family:sans-serif;background:#0d1117;color:#c9d1d9;padding:40px;">
          <h1 style="color:#58a6ff;">Welcome to Smart Utility Toolkit</h1>
          <p>A Node.js backend lab assignment — Unit 1</p>
          <nav>
            <a href="/about" style="color:#58a6ff;margin-right:16px;">About</a>
            <a href="/contact" style="color:#58a6ff;">Contact</a>
          </nav>
        </body>
      </html>`,
  },
  '/about': {
    statusCode: 200,
    body: `
      <html>
        <head><title>About — Smart Utility Toolkit</title></head>
        <body style="font-family:sans-serif;background:#0d1117;color:#c9d1d9;padding:40px;">
          <h1 style="color:#3fb950;">About Page</h1>
          <p>This toolkit was built using <strong>Node.js core modules only</strong>.</p>
          <p>Modules used: <code>http</code>, <code>fs</code>, <code>crypto</code>, <code>process</code></p>
          <a href="/" style="color:#58a6ff;">Back to Home</a>
        </body>
      </html>`,
  },
  '/contact': {
    statusCode: 200,
    body: `
      <html>
        <head><title>Contact — Smart Utility Toolkit</title></head>
        <body style="font-family:sans-serif;background:#0d1117;color:#c9d1d9;padding:40px;">
          <h1 style="color:#d2a8ff;">Contact Page</h1>
          <p>Email: student@university.edu</p>
          <p>Course: Web Dev III (Node.js &amp; Express Backend)</p>
          <a href="/" style="color:#58a6ff;">Back to Home</a>
        </body>
      </html>`,
  },
};

// ── Request Handler ───────────────────────────────────────────
const server = http.createServer((req, res) => {
  const route = routes[req.url];
  const timestamp = new Date().toISOString();

  if (route) {
    // Log successful request
    console.log(
      `${C.green}${C.bright}[${timestamp}] ${req.method} ${req.url}${C.reset}` +
      ` ${C.cyan}→ ${route.statusCode} OK${C.reset}`
    );

    res.writeHead(route.statusCode, { 'Content-Type': 'text/html' });
    res.end(route.body);
  } else {
    // Log 404
    console.log(
      `${C.red}${C.bright}[${timestamp}] ${req.method} ${req.url}${C.reset}` +
      ` ${C.yellow}→ 404 Not Found${C.reset}`
    );

    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head><title>404 — Not Found</title></head>
        <body style="font-family:sans-serif;background:#0d1117;color:#c9d1d9;padding:40px;">
          <h1 style="color:#f85149;">404 — Page Not Found</h1>
          <p>The route <code>${req.url}</code> does not exist on this server.</p>
          <a href="/" style="color:#58a6ff;">Go Home</a>
        </body>
      </html>`);
  }
});

// ── Start Server ──────────────────────────────────────────────
server.listen(PORT, () => {
  logger.success(`HTTP Server is running on http://localhost:${PORT}`);
  console.log('');
  console.log(`  ${C.cyan}${C.bright}Routes available:${C.reset}`);
  console.log(`  ${C.green}GET /${C.reset}         → Welcome message`);
  console.log(`  ${C.green}GET /about${C.reset}    → About page`);
  console.log(`  ${C.green}GET /contact${C.reset}  → Contact page`);
  console.log(`  ${C.red}Any other${C.reset}     → 404 Not Found`);
  console.log('');
  logger.info('Press Ctrl+C to stop the server.');
});
