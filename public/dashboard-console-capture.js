/**
 * Console Capture Script for Cosmic Dashboard Debugging
 * Captures all console logs and sends them to the parent dashboard
 * Only activates when viewed in iframe (dashboard preview mode)
 */
(function() {
  // Only run in iframe context (dashboard preview)
  if (window.self === window.top) return;

  const logs = [];
  const MAX_LOGS = 500;

  // Store original console methods
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug,
  };

  /**
   * Serialize arguments for safe transmission
   */
  function serializeArgs(args) {
    return args
      .map((arg) => {
        if (typeof arg === 'object' && arg !== null) {
          try {
            return JSON.stringify(arg, (key, value) => {
              if (typeof value === 'function') return '[Function]';
              if (value instanceof Error) return value.toString();
              return value;
            }, 2);
          } catch (e) {
            return '[Object (circular reference)]';
          }
        }
        return String(arg);
      })
      .join(' ');
  }

  /**
   * Capture and forward log message
   */
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = serializeArgs(args);

    const logEntry = {
      timestamp,
      level,
      message,
      url: window.location.href,
    };

    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }

    try {
      window.parent.postMessage(
        {
          type: 'console-log',
          log: logEntry,
        },
        '*'
      );
    } catch (e) {
      // Silent failure
    }
  }

  /**
   * Send route change notification
   */
  function sendRouteChange() {
    try {
      window.parent.postMessage(
        {
          type: 'route-change',
          route: {
            pathname: window.location.pathname,
            search: window.location.search,
            hash: window.location.hash,
            href: window.location.href,
          },
          timestamp: new Date().toISOString(),
        },
        '*'
      );
    } catch (e) {
      // Silent failure
    }
  }

  /**
   * Send ready notification
   */
  function sendReady() {
    try {
      window.parent.postMessage(
        {
          type: 'console-capture-ready',
          url: window.location.href,
          timestamp: new Date().toISOString(),
        },
        '*'
      );
    } catch (e) {
      // Silent failure
    }
  }

  // Override console methods
  console.log = function (...args) {
    captureLog('log', args);
    originalConsole.log.apply(console, args);
  };

  console.warn = function (...args) {
    captureLog('warn', args);
    originalConsole.warn.apply(console, args);
  };

  console.error = function (...args) {
    captureLog('error', args);
    originalConsole.error.apply(console, args);
  };

  console.info = function (...args) {
    captureLog('info', args);
    originalConsole.info.apply(console, args);
  };

  console.debug = function (...args) {
    captureLog('debug', args);
    originalConsole.debug.apply(console, args);
  };

  // Capture unhandled errors
  window.addEventListener('error', (event) => {
    captureLog('error', [
      `${event.filename}:${event.lineno}:${event.colno}`,
      event.message,
    ]);
  });

  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    captureLog('error', ['Unhandled Promise Rejection:', event.reason]);
  });

  // Track route changes (for SPAs)
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function (...args) {
    originalPushState.apply(window.history, args);
    sendRouteChange();
  };

  window.history.replaceState = function (...args) {
    originalReplaceState.apply(window.history, args);
    sendRouteChange();
  };

  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);

  // Send ready signal when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sendReady);
  } else {
    sendReady();
  }

  // Send initial route
  sendRouteChange();
})();