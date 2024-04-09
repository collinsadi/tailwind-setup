# @collinsadi/tailwind-setup

**Version**: 2.0.0

**Description**: An Easy Tailwind CSS Environment Set Up for React(Vite)

**Author**: Collins Adi

**License**: ISC

![GitHub issues](https://img.shields.io/github/issues/collinsadi/tailwind-setup)
![GitHub](https://img.shields.io/github/license/collinsadi/tailwind-setup)

## Overview

`@collinsadi/tailwind-setup` is a command-line tool designed to simplify the setup process for integrating Tailwind CSS into your React projects. By automating file generation and dependency installation, this tool streamlines the initial configuration.

## Prerequisites

Before using `@collinsadi/tailwind-setup`, ensure that you have the following software installed on your machine:

- [Node.js](https://nodejs.org/): Required to execute JavaScript scripts.

## Installation

To install `@collinsadi/tailwind-setup`, you can use npm:

```bash
npm install -g @collinsadi/tailwind-setup
```

## Getting Started

To create a Tailwind CSS environment for your React project, follow these steps:

1. Open your terminal.
2. Navigate to the directory where you want to set up your project.
3. Run the following command to initialize the setup process:

```bash
adi-tailwind
```

4. Follow the prompts to provide a name for your project. Make sure to use a name that's URL-friendly and doesn't contain spaces.
5. Once the setup is complete, you can navigate to your project directory and start working on your Tailwind CSS-powered React application.

## Project Structure

The tool sets up your project with the following structure:

- your-project-name/ (the name you provided)
  - public/
    
  - src/
    - App.css (CSS file)
    - App.jsx (JavaScript file)
    - index.css (CSS file)
    - main.jsx (JavaScript file)
  - .gitignore (Gitignore file)
  - index.html (HTML template)
  - package.json (Node.js package file)
  - README.md (Project README file)
  - postcss.config.js (PostCSS configuration file)
  - tailwind.config.js (Tailwind CSS configuration file)
  - vite.config.js (Vite configuration file)
  - .eslintrc.cjs (ESLint configuration file)

## Troubleshooting

If you encounter any issues during the package installation, you can manually navigate to your project directory and run the following command to ensure that all required packages are installed correctly:

```bash
npm install
```

## Support and Issues

If you have questions, encounter issues, or want to contribute to this project, please visit our [GitHub repository](https://github.com/collinsadi/tailwind-setup). Feel free to open issues, submit pull requests, or provide feedback.

## License

This tool is released under the ISC License.

Happy coding!