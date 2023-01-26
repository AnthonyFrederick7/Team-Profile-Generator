const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const distDR = path.resolve(__dirname, "dist");
const distPath = path.join(distDR, "newTeam.html");

// Empty team array for userInput
teamArray = []
// Empty team name for userInput
teamName = ""
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
        
        // Add A Manager inquirer Prompt
        function addManager() {
          inquirer.prompt ([
            
            {
              message: "What's the manager's name?",
              type: "input",
              name: "managerName"
            },
            
            {
              message: "What's the manager's employee ID #?",
              type: "input",
              name: "managerId"
            },
            
            {
              message: "What's the manager's email?",
              type: "input",
              name: "managerEmail"
            },
            
            {
        message: "What's the manager's office #?",
        type: "input",
        name: "managerOfficeNumber"
      }
      
      // Pushing answers to the manager const in teamArray
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamArray.push(manager);
      inquirer.prompt(initialQ)
      .then(handleInitialChoice)
    });
    
  }
  
  // Add An Engineer inquirer Prompt
  function addEngineer() {
    inquirer.prompt([
      
      {
        message: "What's the engineer's name?",
        type: "input",
        name: "engineerName"
      },
      
      {
        message: "What's the engineer's employee ID #?" ,
        type: "input",
        name: "engineerId"
      },
      
      {
        message: "What's the engineer's email?",
        type: "input",
        name: "engineerEmail"
      },
      
      {
        message: "What's the engineer's GitHub user?",
        type: "input",
        name: "engineerGithub"
      }
      
      // Pushing answers to the engineer const in teamArray
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamArray.push(engineer);
      inquirer.prompt(initialQ)
      .then(handleInitialChoice)
    });
    
  }
  
  // Add An Intern inquirer Prompt
  function addIntern() {
    inquirer.prompt([
      
      {
        message: "What's the intern's name?",
        type: "input",
        name: "internName"
      },
      
      {
        message: "What's the intern's employee ID #?",
        type: "input",
        name: "internId"
      },
      
      {
        message: "What's' the intern's email?",
        type: "input",
        name: "internEmail"
      },
      
      {
        message: "What school(s) is the intern enrolled at?",
        type: "input",
        name: "internSchool"
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

      // Manager HTML template
      const makeManager = manager => {
          return `
  <div class="card employeeCard">

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
  
      // Engineer HTML template
      const makeEngineer = engineer => {
          return `
  <div class="card employeeCard">

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
  
      // Intern HTML template
      const makeIntern = intern => {
          return `
  <div class="card employeeCard">

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

      // Pushing each employee type into the HTML
      const html = [];
      html.push(team
          .filter(employee => employee.getRole() === "Manager")
          .map(manager => makeManager(manager))
          .join("")
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

  // HTML Head/Body Template
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
          <h1 class="text-white text-5xl pt-14 font-bold">My Team</h1>
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

    // Writes new HTML file in the 'dist' folder
    fs.writeFileSync(distPath, html2, "UTF-8")
  }

  const initialQ2 = [
    {
      message: "What's the teams name?",
      type: 'input',
      name: 'teamName'
    }
  ];
  // Starts the prompt
  function init() {
    //addTeam()
    inquirer.prompt(initialQ)
    .then(handleInitialChoice)
  }

  //function addTeam() {
    //inquirer.prompt([
      //{
        //message: "What's the teams name?",
        //type: "input",
        //name: "teamName"
      //}
    //]).then(answers => {
      //const team = answers;
      //teamName.push(team);
      //inquirer.prompt(initialQ)
      //.then(handleInitialChoice)
    //});
//}
  // This is the START of Everything
  init();