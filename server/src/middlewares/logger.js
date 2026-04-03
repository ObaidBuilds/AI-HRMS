const logger = (req, res, next) => {
  const start = Date.now();
  const originalEnd = res.end;

  let requestBody = "";
  if (req.body && Object.keys(req.body).length > 0) {
    requestBody = JSON.stringify(req.body);
  }

  let responseBody = "";

  res.end = function (chunk) {
    if (chunk) responseBody = chunk.toString();

    const timeTaken = Date.now() - start;
    const statusCode = res.statusCode;
    const method = req.method;
    const endpoint = req.originalUrl || req.url;

    // Format timestamp: 2026-04-03 11:02 AM
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const timestamp = `${year}-${month}-${day} ${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

    // Colors
    const green = "\x1b[32m";
    const yellow = "\x1b[33m";
    const red = "\x1b[31m";
    const cyan = "\x1b[36m";
    const gray = "\x1b[90m";
    const reset = "\x1b[0m";
    const blue = "\x1b[34m";

    // Status color
    let statusColor = green;
    if (statusCode >= 400 && statusCode < 500) statusColor = yellow;
    else if (statusCode >= 500) statusColor = red;

    // Time color
    let timeColor = green;
    if (timeTaken > 200) timeColor = yellow;
    if (timeTaken > 500) timeColor = red;

    // Method color
    let methodColor = cyan;
    if (method === "POST") methodColor = green;
    if (method === "PUT") methodColor = yellow;
    if (method === "DELETE") methodColor = red;

    // Compact log line
    console.log(
      `${blue}${timestamp}${reset} ` +
        `${methodColor}${method.padEnd(3)}${reset} ` +
        `${endpoint.includes("?") ? endpoint.split("?")[0] : endpoint} ` +
        `${statusColor}${statusCode}${reset} ` +
        `${timeColor}${timeTaken}ms${reset}`,
    );

    // Log request body for POST/PUT/PATCH with proper formatting
    if (
      (method === "POST" || method === "PUT" || method === "PATCH") &&
      requestBody &&
      requestBody !== "{}"
    ) {
      console.log(`${gray} Request Body:${reset}`);
      try {
        const parsedBody = JSON.parse(requestBody);
        const formattedBody = JSON.stringify(parsedBody, null, 2);
        const indentedBody = formattedBody
          .split("\n")
          .map((line) => `     ${line}`)
          .join("\n");
        console.log(`${gray}${indentedBody}${reset}`);
      } catch {
        const indentedBody = requestBody
          .split("\n")
          .map((line) => `     ${line}`)
          .join("\n");
        console.log(`${gray}${indentedBody}${reset}`);
      }
    }

    originalEnd.call(this, chunk);
  };

  next();
};

export default logger;
