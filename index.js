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
    const packageJson = fs.readFileSync(path.join(templatesFolder, "package.txt"), { encoding: "utf-8" }).toString().replace("package-name", name.toLowerCase())
    const gitIgnore = fs.readFileSync(path.join(templatesFolder, "gitignore.txt"), { encoding: "utf-8" }).toString()
    const readMe = fs.readFileSync(path.join(templatesFolder, "readme.txt"), {encoding:"utf-8"}).toString()
    
    const tailwindConfig = fs.readFileSync(path.join(templatesFolder, "tailwind.txt"), {encoding:"utf-8"}).toString()

    fs.writeFileSync(path.join(targetFolder, "package.json"), packageJson)
    

    
    fs.mkdirSync(path.join(targetFolder, "public"))
    fs.mkdirSync(path.join(targetFolder, "src"))
    fs.writeFileSync(path.join(targetFolder, ".gitignore"), gitIgnore)
    fs.writeFileSync(path.join(targetFolder, "README.md"), readMe)
    fs.writeFileSync(path.join(targetFolder, "tailwind.config.js"), tailwindConfig)

    const sourceFolder = path.join(targetFolder, "src")
    const publicFolder = path.join(targetFolder, "public")

    const appCssFile = fs.readFileSync(path.join(templatesFolder, "appcss.txt"), {encoding:"utf-8"}).toString()
    const appJsFile = fs.readFileSync(path.join(templatesFolder, "appjsfile.txt"), { encoding: "utf-8" }).toString()
    
    const indexCSSFile = fs.readFileSync(path.join(templatesFolder, "indexcss.txt"), { encoding: "utf-8" }).toString()
    
  const indexJSFile = fs.readFileSync(path.join(templatesFolder, "indexjsfile.txt"), { encoding: "utf-8" }).toString()

    fs.writeFileSync(path.join(sourceFolder, "App.css"), appCssFile)
    fs.writeFileSync(path.join(sourceFolder, "App.js"), appJsFile)
    fs.writeFileSync(path.join(sourceFolder, "index.css"), indexCSSFile)
    fs.writeFileSync(path.join(sourceFolder, "index.js"), indexJSFile)

    const indexHtmlFile = fs.readFileSync(path.join(templatesFolder, "indexhtml.txt"), {encoding:"utf-8"}).toString()
    const manifestFile = fs.readFileSync(path.join(templatesFolder, "manifest.txt"), {encoding:"utf-8"}).toString()
    
    fs.writeFileSync(path.join(publicFolder, "index.html"), indexHtmlFile)
    fs.writeFileSync(path.join(publicFolder, "manifest.json"), manifestFile)

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