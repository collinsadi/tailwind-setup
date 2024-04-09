#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import inquirer from "inquirer";
import colors from "colors";

const templatesFolder = path.join(process.cwd(), "templateFiles");

const createTailwindTemplate = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the app name:",
        validate: (input) => input.trim() !== "",
      },
      {
        type: "list",
        name: "variant",
        message: "Select a Variant:",
        choices: [{ name: "Javascript" }, { name: "Typescript" }],
      },
    ]);

    let { name, variant } = answers;

    if (name.split(" ").length > 1) {
      console.log(
        "Please Enter a URL Friendly Name, refer to the docs for help".red
      );
      return;
    }

    let targetFolder;

    let initialName = name;

    if (name === ".") {
      targetFolder = process.cwd();
      name = process.cwd().split("/").pop();

      if (name.split(" ").length > 1) {
        console.log(
          "Please Enter a URL Friendly Name, refer to the docs for help".red
        );
        return;
      }
    } else {
      fs.mkdirSync(name);
      targetFolder = path.join(process.cwd(), name);
    }

    const packageJson = `{
    "name": "${name.toLowerCase()}",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
      "preview": "vite preview"
    },
    "dependencies": {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "tailwindcss": "^2.2.16"
    },
    "devDependencies": {
      "@types/react": "^18.2.66",
      "@types/react-dom": "^18.2.22",
      "@vitejs/plugin-react": "^4.2.1",
      "eslint": "^8.57.0",
      "eslint-plugin-react": "^7.34.1",
      "eslint-plugin-react-hooks": "^4.6.0",
      "eslint-plugin-react-refresh": "^0.4.6",
      "postcss": "^8.4.35",
      "tailwindcss": "^3.4.1",
      "vite": "^5.2.0"
    }
}`;
    const gitIgnore = `
  # Logs
  logs
  *.log
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*
  pnpm-debug.log*
  lerna-debug.log*
  
  node_modules
  dist
  dist-ssr
  *.local
  
  # Editor directories and files
  .vscode/*
  !.vscode/extensions.json
  .idea
  .DS_Store
  *.suo
  *.ntvs*
  *.njsproj
  *.sln
  *.sw?
  `;
    const readMe = `
   
@collinsadi/tailwind-setup, designed for setting up a Tailwind CSS environment in React projects:

# @collinsadi/tailwind-setup

**Version**: 1.0.0

**Author**: Collins Adi

**License**: ISC

![GitHub issues](https://img.shields.io/github/issues/collinsadi/tailwind-setup)
![GitHub](https://img.shields.io/github/license/collinsadi/tailwind-setup)

## Overview

@collinsadi/tailwind-setup is a powerful command-line tool for simplifying the process of creating a development environment for Tailwind CSS in your React projects. This tool automates the setup by generating essential files and installing the required dependencies.

## Prerequisites

Before using @collinsadi/tailwind-setup, ensure you have the following software installed on your machine:
- [Node.js](https://nodejs.org/): This is required to execute JavaScript scripts.

## Installation

To use this tool, you can install it globally on your system using npm. Open your terminal and run the following command:
\`\`\`bash
npm install -g @collinsadi/tailwind-setup
\`\`\`

## Getting Started

Follow these steps to create a Tailwind CSS environment for your React project:
1. Open your terminal.
2. Navigate to the directory where you wish to set up your project.
3. Run the following command to initialize the setup process:
\`\`\`bash
codellins-tailwind
\`\`\`
4. Follow the prompts to provide a name for your project. Make sure to use a name that's URL-friendly and doesn't contain spaces.
5. The tool will create a new directory with the name you provided, configure essential project files, and install the required packages.
6. Once the setup is complete, you can navigate to your project directory and start working on your Tailwind CSS-powered React application.

## Project Structure

The tool sets up your project with the following structure:
- your-project-name/ (the name you provided)
  - public/
    - index.html (HTML template)
    - manifest.json (manifest file)
  - src/
    - App.css (CSS file)
    - App.js (JavaScript file)
    - index.css (CSS file)
    - index.js (JavaScript file)
  - .gitignore (Gitignore file)
  - package.json (Node.js package file)
  - README.md (Project README file)

## Troubleshooting

- If you encounter any issues during the package installation, you can manually navigate to your project directory and run the following command to ensure that all required packages are installed correctly:
\`\`\`bash
cd your-project-name
npm install
\`\`\`

## Support and Issues

If you have questions, run into issues, or want to contribute to this project, please visit our [GitHub repository](https://github.com/collinsadi/tailwind-setup). Feel free to open issues, submit pull requests, or provide feedback.

## License

This tool is released under the ISC License.

Happy coding!
`;

    const viteConfig = `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
`;

    const esLint = `module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
`;

    const postCss = `export default {
  plugins: {
    tailwindcss: {},
  },
}
`;

    // const tailwindConfig = fs.readFileSync(path.join(templatesFolder, "tailwind.txt"), {encoding:"utf-8"}).toString()

    const tailwindConfig = `
  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
`;

    fs.writeFileSync(path.join(targetFolder, "package.json"), packageJson, {
      encoding: "utf-8",
    });
    fs.writeFileSync(path.join(targetFolder, "postcss.config.js"), postCss, {
      encoding: "utf-8",
    });
    fs.writeFileSync(path.join(targetFolder, "vite.config.js"), viteConfig, {
      encoding: "utf-8",
    });
    fs.writeFileSync(path.join(targetFolder, ".eslintrc.cjs"), esLint, {
      encoding: "utf-8",
    });

    fs.mkdirSync(path.join(targetFolder, "public"));
    fs.mkdirSync(path.join(targetFolder, "src"));
    fs.writeFileSync(path.join(targetFolder, ".gitignore"), gitIgnore, {
      encoding: "utf-8",
    });
    fs.writeFileSync(path.join(targetFolder, "README.md"), readMe, {
      encoding: "utf-8",
    });
    fs.writeFileSync(
      path.join(targetFolder, "tailwind.config.js"),
      tailwindConfig,
      { encoding: "utf-8" }
    );

    const sourceFolder = path.join(targetFolder, "src");
    const publicFolder = path.join(targetFolder, "public");

    const appCssFile = `
  #root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
  
  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @media (prefers-reduced-motion: no-preference) {
    a:nth-of-type(2) .logo {
      animation: logo-spin infinite 20s linear;
    }
  }
  
  .card {
    padding: 2em;
  }
  
  .read-the-docs {
    color: #888;
  }
  
`;
    const appJsFile = `
import './App.css';
function App() {

  return (
   <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg shadow-lg m-10">
  <h1 className="text-3xl font-bold text-white mb-5">Welcome to Our App!</h1>
  <p className="text-lg text-white">Experience the power of Vite and Tailwind CSS.</p>
  <p className="text-gray-300 mt-4">Brought to you by Collins Adi</p>
  <a
    href="https://collinsadi.vercel.app"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 mt-4 rounded-full inline-block"
  >
    Learn More
  </a>
</div>

  );
}

export default App;
`;

    const indexCSSFile = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;


body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`;

    const indexJSFile = `
  import React from 'react'
  import ReactDOM from 'react-dom/client'
  import App from './App.jsx'
  import './index.css'
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  
`;

    fs.writeFileSync(path.join(sourceFolder, "App.css"), appCssFile, {
      encoding: "utf-8",
    });
    fs.writeFileSync(path.join(sourceFolder, "App.jsx"), appJsFile, {
      encoding: "utf-8",
    });
    fs.writeFileSync(path.join(sourceFolder, "index.css"), indexCSSFile, {
      encoding: "utf-8",
    });
    fs.writeFileSync(path.join(sourceFolder, "main.jsx"), indexJSFile, {
      encoding: "utf-8",
    });

    const indexHtmlFile = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${name}</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.jsx"></script>
    </body>
  </html>
  
`;

    fs.writeFileSync(path.join(targetFolder, "index.html"), indexHtmlFile, {
      encoding: "utf-8",
    });

    console.log("Done. Now Run:".green);

    if (initialName === ".") {
      console.log("npm install".cyan);
      console.log("npm run dev".cyan);
    } else {
      console.log(`cd ${name}`.cyan);
      console.log("npm install".cyan);
      console.log("npm run dev".cyan);
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

createTailwindTemplate();
