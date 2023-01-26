const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const distDR = path.resolve(__dirname, "dist");
const distPath = path.join(distDR, "newTeam.html");

// Empty team array for userInput
teamArray = []

// Initial Question prompt
const initialQ = [
  {
    message: 'What kind of employee do you want to add?',
    type: 'list',
    choices: [
      'Manager',
      'Engineer',
      'Intern',
      'No more employees to add'
    ],
    name: 'employeeType'
  }
];

// Switch case to add certain employee types
function handleInitialChoice({ employeeType }) {
  switch (employeeType) {
    case 'Manager':
      addManager();
      break;
      case 'Engineer':
        addEngineer();
        break;
        case 'Intern':
          addIntern();
          break;
          default: htmlBuilder();
        }}
        
        // Add Manager inquirer Prompt
        function addManager() {
          inquirer.prompt ([
            
            {
              type: "input",
              name: "managerName",
              message: "What's the manager's name?"
            },
            
            {
              type: "input",
              name: "managerId",
              message: "What's the manager's employee ID #?"
            },
            
            {
              type: "input",
              name: "managerEmail",
              message: "What's the manager's email?"
            },
            
            {
        type: "input",
        name: "managerOfficeNumber",
        message: "What's the manager's office #?"
      }
      
      // Pushing answers to the manager const in teamArray
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamArray.push(manager);
      inquirer.prompt(initialQ)
      .then(handleInitialChoice)
    });
    
  }
  
  // Add Engineer inquirer Prompt
  function addEngineer() {
    inquirer.prompt([
      
      {
        type: "input",
        name: "engineerName",
        message: "What's the engineer's name?"
      },
      
      {
        type: "input",
        name: "engineerId",
        message: "What's the engineer's employee ID #?" 
      },
      
      {
        type: "input",
        name: "engineerEmail",
        message: "What's the engineer's email?"
      },
      
      {
        type: "input",
        name: "engineerGithub",
        message: "What's the engineer's GitHub user?"
      }
      
      // Pushing answers to the engineer const in teamArray
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamArray.push(engineer);
      inquirer.prompt(initialQ)
      .then(handleInitialChoice)
    });
    
  }
  
  // Add Intern inquirer Prompt
  function addIntern() {
    inquirer.prompt([
      
      {
        type: "input",
        name: "internName",
        message: "What's the intern's name?"
      },
      
      {
        type: "input",
        name: "internId",
        message: "What's the intern's employee ID #?" 
      },
      
      {
        type: "input",
        name: "internEmail",
        message: "What's' the intern's email?"
      },
      
      {
        type: "input",
        name: "internSchool",
        message: "What school is the intern enrolled at?"
      }
      
      // Pushing answers to the intern const in teamArray
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamArray.push(intern);
      inquirer.prompt(initialQ)
      .then(handleInitialChoice)
    });
    
  }  
  
  // Making an HTML file with data we've gotten
  function htmlBuilder () {
    console.log("Your team has been created!")
    
    const makeTeam = team => {

      // create the manager html
      const makeManager = manager => {
          return `
  <div class="card employee-card">
      <div class="card-header bg-neutral-100 text-black rounded-t-3xl pl-3 pt-2 pb-2 pr-4">
          <h2 class="card-title font-semibold text-4xl">${manager.getName()}</h2>
          <h3 class="card-title font-semibold text-2xl">${manager.getRole()}</h3>
      </div>
      <div class="card-body bg-zinc-300 rounded-b-3xl pr-10 pl-3">
          <ul class="list-group list-group leading-8 font-medium">
              <li class="list-group-item">ID: ${manager.getId()}</li>
              <li class="list-group-item">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
              <li class="list-group-item">Office number: ${manager.getOfficeNumber()}</li>
          </ul>
      </div>
  </div>
          `;
      };
  
      // create the html for engineers
      const makeEngineer = engineer => {
          return `
  <div class="card employee-card">
      <div class="card-header bg-neutral-100 text-black rounded-t-3xl pl-3 pt-2 pb-2 pr-4">
          <h2 class="card-title font-semibold text-4xl">${engineer.getName()}</h2>
          <h3 class="card-title font-semibold text-2xl">${engineer.getRole()}</h3>
      </div>
      <div class="card-body bg-zinc-300 rounded-b-3xl pr-10 pl-3">
          <ul class="list-group list-group leading-8 font-medium">
              <li class="list-group-item">ID: ${engineer.getId()}</li>
              <li class="list-group-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
              <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener noreferrer">${engineer.getGithub()}</a></li>
          </ul>
      </div>
  </div>
          `;
      };
  
      // create the html for interns
      const makeIntern = intern => {
          return `
  <div class="card employee-card">
      <div class="card-header bg-neutral-100 text-black rounded-t-3xl pl-3 pt-2 pb-2 pr-4">
          <h2 class="card-title font-semibold text-4xl">${intern.getName()}</h2>
          <h3 class="card-title font-semibold text-2xl">${intern.getRole()}</h3>
      </div>
      <div class="card-body bg-zinc-300 rounded-b-3xl pr-10 pl-3">
          <ul class="list-group list-group leading-8 font-medium">
              <li class="list-group-item">ID: ${intern.getId()}</li>
              <li class="list-group-item">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
              <li class="list-group-item">School: ${intern.getSchool()}</li>
          </ul>
      </div>
  </div>
          `;
      };
  
      const html = [];
  
      html.push(team
          .filter(employee => employee.getRole() === "Manager")
          .map(manager => makeManager(manager))
      );
      html.push(team
          .filter(employee => employee.getRole() === "Engineer")
          .map(engineer => makeEngineer(engineer))
          .join("")
      );
      html.push(team
          .filter(employee => employee.getRole() === "Intern")
          .map(intern => makeIntern(intern))
          .join("")
      );
  
      return html.join("");
  
  }
  
  const html2 = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="style.css">
      <title>My Team</title>
  </head>
  
  <body>

    <nav>
      <div class="row">
        <div class="w-full text-center inline-block align-center h-40 bg-black">
          <h1 class="text-white text-5xl pt-12 font-bold">My Team</h1>
        </div>
      </div>
    </nav>

    <div class="row w-full pt-6">
      <div class="">
        <div class="row w-full flex justify-center">
                  ${makeTeam(teamArray)}
              </div>
          </div>
      </div>
  </body>
  </html>
      `;

    fs.writeFileSync(distPath, html2, "UTF-8")
    
  }
  
  // Starts the prompt
  function init() {
    inquirer.prompt(initialQ)
    .then(handleInitialChoice)
  }
  
  // Start of Everything
  init();