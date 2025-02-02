const js = require("@eslint/js");
const react = require("eslint-plugin-react");
const babelParser = require("@babel/eslint-parser");

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  // 🎯 Frontend (React & JSX)
  {
    files: ["client/**/*.js", "client/**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // 🛠️ Enables ES Modules (`import/export`)
      parser: babelParser,  // 🛠️ Enables JSX parsing
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      globals: {
        window: "readonly",
        localStorage: "readonly",
        console: "readonly", // Add console to globals
      },
    },
    plugins: {
      react,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      "no-unused-vars": "off",
      "react/react-in-jsx-scope": "off", // ✅ Disables "React must be in scope"
    },
  },

  // 🎯 Backend (CommonJS)
  {
    files: ["server/**/*.js", "server/**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script", // 🛠️ Ensures CommonJS (`require` works)
      globals: {
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-undef": "off", // Fix "require is not defined"
      "no-unused-vars": "off",
    },
  },
];