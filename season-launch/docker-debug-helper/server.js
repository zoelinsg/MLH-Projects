const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const bugScenarios = [
  {
    title: "Undefined Property",
    error: "TypeError: Cannot read properties of undefined",
    cause: "The program is trying to read a property from a value that does not exist.",
    fix: "Check whether the object exists before accessing its nested properties."
  },
  {
    title: "Missing File Path",
    error: "ENOENT: no such file or directory, open 'data.json'",
    cause: "The app is trying to read a file from the wrong path or the file is missing.",
    fix: "Verify the file path and make sure the file exists in the expected location."
  },
  {
    title: "JSON Parse Error",
    error: "SyntaxError: Unexpected token in JSON",
    cause: "The input passed to JSON.parse is not valid JSON.",
    fix: "Log the response, validate the data format, and handle parse errors safely."
  },
  {
    title: "Missing Dependency",
    error: "Error: Cannot find module 'express'",
    cause: "The required package is not installed or missing from package.json.",
    fix: "Install the dependency and confirm it is listed in package.json."
  },
  {
    title: "Async Timing Issue",
    error: "Data is undefined before the request finishes",
    cause: "The code is using async data before the Promise has resolved.",
    fix: "Use async/await or .then() to wait for the data before reading it."
  }
];

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/bugs", (req, res) => {
  res.json(bugScenarios);
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "docker-debug-helper",
    runningIn: "Docker-ready Node.js app"
  });
});

app.listen(PORT, () => {
  console.log(`Docker Debug Helper is running on http://localhost:${PORT}`);
});