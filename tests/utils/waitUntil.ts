export async function waitUntil(
  callback: () => Promise<void>,
  options: {
    message?: string;
    retryInterval?: number;
    timeout?: number;
  } = {}
): Promise<void> {
  const { message, retryInterval = 250, timeout = 2_500 } = options;

  const startTime = performance.now();

  const consoleLog = console.log;

  while (true) {
    // This loop tries failing code many times before giving up.
    // It's noisy to log expect() failures on every attempt,
    // so we suppress them for all but the last attempt.
    const messages: any[] = [];
    console.log = (...rest) => messages.push(rest);

    try {
      await callback();

      return;
    } catch (error: any) {
      if (error?.message?.includes("crash")) {
        // We have to resort to heuristics since:
        // 1. We don't have access to the `Page` object, and
        // 2. the Error object also has no special properties.
        throw error;
      }
      if (error?.isUnrecoverable) {
        // We sometimes don't want to keep trying.
        throw error;
      }
      if (!error?.matcherResult) {
        // Not an `expect` error: → Log it.
        console.log("ERROR:", error?.stack || error);
      }

      if (performance.now() - startTime > timeout) {
        messages.forEach(args => consoleLog(...args));
        throw Error(message);
      }

      await new Promise(resolve => setTimeout(resolve, retryInterval));

      continue;
    } finally {
      console.log = consoleLog;
    }
  }
}
