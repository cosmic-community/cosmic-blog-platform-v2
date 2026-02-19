/**
 * Build-time script to inject console capture script into HTML files
 * Run this after Next.js build to inject the console capture script
 */
const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '../.next');
const SCRIPT_PATH = path.join(__dirname, '../public/dashboard-console-capture.js');
const SCRIPT_TAG = '<script src="/dashboard-console-capture.js" defer></script>';

function injectScriptIntoHtml(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if script is already injected
    if (content.includes('dashboard-console-capture.js')) {
      return false;
    }

    // Insert before closing head tag
    if (content.includes('</head>')) {
      content = content.replace('</head>', `${SCRIPT_TAG}\n</head>`);
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return false;
  }
}

function walkDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDirectory(filePath);
    } else if (file.endsWith('.html')) {
      const injected = injectScriptIntoHtml(filePath);
      if (injected) {
        console.log(`✓ Injected console capture into ${filePath}`);
      }
    }
  });
}

// Run injection
if (fs.existsSync(BUILD_DIR)) {
  console.log('Injecting console capture script into HTML files...');
  walkDirectory(BUILD_DIR);
  console.log('Done!');
} else {
  console.log('Build directory not found. Run "npm run build" first.');
}