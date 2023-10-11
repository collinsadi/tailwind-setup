#!/usr/bin/env node

import fs from "fs"
import path from "path"
import {execSync} from "child_process"
import inquirer from "inquirer";
import colors from "colors"

const templatesFolder = path.join(process.cwd(), "templateFiles")

const createTailwindTemplate = async ()=>{

 const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the app name:',
      validate: (input) => input.trim() !== '',
    }
 ]);
    
const { name} = answers;

if (name.split(" ").length > 1) {
    
    console.log("Please Enter a URL Friendly Name".blue)
    return
}

// Create a directory for the new app
  fs.mkdirSync(name);

const targetFolder = path.join(process.cwd(), name)
    const packageJson = `
  {
  "name": "${name.toLowerCase()}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@headlessui/react": "^1.7.17",
    "@heroicons/react": "^2.0.18",
    "codellins": "^1.3.0",
    "react-icons": "^4.11.0",
    "tailwindcss": "^2.2.16",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

    
    
    `
  const gitIgnore = `
 # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
`
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

  // const tailwindConfig = fs.readFileSync(path.join(templatesFolder, "tailwind.txt"), {encoding:"utf-8"}).toString()
  
  const tailwindConfig =    `
  module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
   ],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
`

    fs.writeFileSync(path.join(targetFolder, "package.json"), packageJson , {encoding:"utf-8"})
    

    
    fs.mkdirSync(path.join(targetFolder, "public"))
    fs.mkdirSync(path.join(targetFolder, "src"))
    fs.writeFileSync(path.join(targetFolder, ".gitignore"), gitIgnore, {encoding:"utf-8"})
    fs.writeFileSync(path.join(targetFolder, "README.md"), readMe, {encoding:"utf-8"})
    fs.writeFileSync(path.join(targetFolder, "tailwind.config.js"), tailwindConfig , {encoding:"utf-8"})

    const sourceFolder = path.join(targetFolder, "src")
    const publicFolder = path.join(targetFolder, "public")

  const appCssFile = `
  .App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`
const appJsFile = `
import './App.css';
function App() {

  return (
   <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg shadow-lg m-10">
  <h1 className="text-3xl font-bold text-white mb-5">Welcome to Our App!</h1>
  <p className="text-lg text-white">Experience the power of React and Tailwind CSS.</p>
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
`
    
  const indexCSSFile = `
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';


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
`
    
  const indexJSFile = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

`

    fs.writeFileSync(path.join(sourceFolder, "App.css"), appCssFile,{encoding:"utf-8"})
    fs.writeFileSync(path.join(sourceFolder, "App.js"), appJsFile, {encoding:"utf-8"})
    fs.writeFileSync(path.join(sourceFolder, "index.css"), indexCSSFile, {encoding:"utf-8"})
    fs.writeFileSync(path.join(sourceFolder, "index.js"), indexJSFile, {encoding:"utf-8"})

  const indexHtmlFile =
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using Codellins Tailwind Setup"
    />
    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
`;

  const manifestFile = `
  {
  "short_name": "Codellins Tailwind App",
  "name": "Codellins Tailwind Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
`
    
    fs.writeFileSync(path.join(publicFolder, "index.html"), indexHtmlFile, {encoding:"utf-8"})
    fs.writeFileSync(path.join(publicFolder, "manifest.json"), manifestFile, {encoding:"utf-8"})

    console.log("Installing Required Packages, Do not Exit this Process...".blue)

  execSync(`cd ${name} && npm install`,(error, stdout, stderr) => {
  if (error) {
    console.error(`Error Installing Required Packages`.red);
    console.error(`run cd ${name} and then run npm install `.blue);
    console.error(`If Packages Dosen't Install Properly Your Project will not Run`.red);
    return;
  }
  
});

    console.log(`Tailwind Project Setup Sucessfully,\n Run cd ${name} to start`.green)

}


createTailwindTemplate()