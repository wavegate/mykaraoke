import { JobRole } from "./model";

export const options = {
  category: ["Software Engineering", "Product Design", "Product Management"],
  education: [
    "Bootcamp",
    "Associate's",
    "Bachelor's",
    "Master's",
    "PhD",
    "MBA",
    "PharmD",
  ],
  location: ["Remote", "Remote in USA", "Hybrid"]
};

export const mockJobRoles: JobRole[] = [
  new JobRole("Front - End Engineer",
    "A software engineer who specializes in the development of the user interface (UI) is called a front-end engineer. The user interfaces include visual elements like layouts and aesthetics. Front-end engineers deal with cross browser compatibility and fixing bugs to ensure an excellent visual presentation of the UI. Thus, they work with the code that runs on different user devices, browsers, and operating systems. Developing a responsive application also comes under this.", undefined, null, null,
    ["Proficiency in HTML, CSS, and JavaScript",
      "Experience with front - end frameworks and libraries like React, Angular, Vue.js, and jQuery.",
      "Understanding of responsive design",
      "Knowledge of browser compatibility issues",
      "Familiarity with version control systems",
      "Ability to work with APIs",
      "Good communication and collaboration skills"]),
  new JobRole("Back - End Engineer",
    "A software engineer who specializes in the underlying logic and performance of the application is called a back-end engineer. They often design and implement the core logic, keeping in mind scalability. They do this by integrating with data systems, caches, email systems using Application Programming Interfaces (APIs).", undefined, undefined, undefined,
    ["Proficiency in one or more programming languages like Java, Python, PHP, Ruby, or Node.js",
      "Understanding of web development frameworks like Spring, Django, Laravel, or Ruby on Rails.",
      "Experience with databases such as MySQL, PostgreSQL, MongoDB, or Cassandra.",
      "Knowledge of server and network architecture",
      "Familiarity with RESTful APIs",
      "Good debugging and problem - solving skills",
      "Good communication and collaboration skills"]
  ),
  new JobRole("Full Stack Engineer",
    "A software engineer who can handle both front-end and back-end work is called a full-stack engineer. They have the skills required to create a fully functional web application.", undefined, undefined, undefined,
    `Proficiency in one or more programming languages like Java, Python, PHP, Ruby, or Node.js
Experience with front-end frameworks and libraries like React, Angular, Vue.js, and jQuery.
Understanding of web development frameworks like Spring, Django, Laravel, or Ruby on Rails.
Familiarity with databases such as MySQL, PostgreSQL, MongoDB, or Cassandra.
Knowledge of server and network architecture
Ability to work with APIs
Good debugging and problem-solving skills
Good communication and collaboration skills`.split("\n").map(x => x.trim())),
  new JobRole("Software Engineer in Test(QA Engineer)",
    "A software engineer who is responsible for writing software to validate the quality of the application is called a QA engineer. QA engineers create test plans, manual tests, automated tests using tools and frameworks to make sure that products and processes run as expected. They create test summary report, bug reports, and take care of defect management to ensure that the end user gets a seamless user experience.",
    undefined, undefined, undefined,
    `Proficiency in one or more programming languages like Java, Python, PHP, Ruby, or Node.js to develop test automation scripts
Understanding of different types of testing such as Unit Testing, Functional Testing, Cross Browser Testing, UI Testing, etc.
Knowledge of testing frameworks such as JUnit, TestNG, or PyTest to design and execute test cases
Experience with one or more automation Testing Tools and Libraries such as Selenium, Appium, Cypress, Playwright, Puppeteer, WebdriverIO, NightwatchJS, Espresso, XCUITest, Cucumber, etc.
Knowledge of Tools like BrowserStack Live, App Live, Automate, App Automate, Percy, App Percy, etc.
Understanding of software development processes such as Agile and Scrum.
Familiarity of Databases to create Database Tests
Knowledge of continuous integration and delivery tools like Jenkins, Bamboo, Travis CI, CircleCI, etc.
Strong analytical and problem-solving skills
Good documentation, communication and collaboration skills`.split("\n").map(x => x.trim())),
  new JobRole("Software Development Engineer in Test(SDET)",
    "While SDET if often confused with the QA Engineer or Software Engineer in Test, and sometimes even used interchangeably, SDET is an overlap of Development and Testing. SDETs are developers who are well-equipped with testing skills and are responsible for testing along with Development. The Skills of SDET are similar to Software Engineer in Test(QA), however, SDET should be more proficient in Automation Frameworks and have a strong hold on the programming languages.", undefined, undefined, undefined,
  ),
  new JobRole("DevOps Engineer",
    "Software engineers who are familiar with the technologies required for the development of systems to build, deploy, integrate and administer back-end software and distributed systems are called DevOps engineers. They mostly manage the application infrastructure, i.e., the database systems, servers, etc", undefined, undefined, undefined,
    `Proficiency in scripting languages such as Bash, Python, or Ruby
Experience with automation tools such as Chef, Puppet, Ansible, or Terraform
Familiarity with cloud platforms such as Amazon Web Services (AWS), Microsoft Azure, or Google Cloud Platform (GCP).
Understanding of containerization technologies such as Docker or Kubernetes
Knowledge of continuous integration and delivery tools like Jenkins, Bamboo, Travis CI, CircleCI, etc.
Familiarity with monitoring and logging tools such as Nagios, Prometheus, or ELK
Strong problem-solving skills
Good communication and collaboration skills`.split("\n").map(x => x.trim()))
  ,
  new JobRole("Security Engineer",
    "A software engineer who specializes in creating systems, methods, and procedures to test the security of a software system and exploit and fix security flaws is called a security engineer. This type of developer often works as a “white-hat” ethical hacker and attempts to penetrate systems to discover vulnerabilities.", undefined, undefined, undefined,
    `Strong understanding of information security
Familiarity with security tools and technologies such as firewalls, intrusion detection and prevention systems (IDS/IPS), security information and event management (SIEM), and vulnerability scanning tools.
Proficiency in scripting and programming languages such as Python, Perl, or Ruby
Experience with security compliance frameworks such as PCI-DSS, HIPAA, or ISO 27001
Familiarity with cloud security services such as AWS Security, Azure Security, or Google Cloud Security
Understanding of threat modeling and risk assessment
Strong analytical and problem-solving skills`.split("\n").map(x => x.trim()))
  ,
  new JobRole("Data Engineer",
    "Data Engineers handle operations like ETL, Data Warehousing, Database management, and Data Mining, to name a few. They help the developer and test engineers with the data infrastructure that is used to ensure the smooth functioning of the application.", undefined, undefined, undefined,
    `Proficiency in programming languages such as Python, Java, or Scala to develop and maintain data pipelines, ETL processes, and data models.
Experience with big data technologies such as Hadoop, Spark, or Kafka
Familiarity with data warehousing technologies such as Snowflake, Redshift, or BigQuery
Knowledge of data modeling and database design
Understanding of data governance and security
Proficiency in SQL
Familiarity with cloud platforms such as AWS, Azure, or Google Cloud Platform
Strong problem-solving skills`.split("\n").map(x => x.trim())),
  new JobRole("Cloud Architect",
    "With the applications and platforms moving into the cloud servers, Cloud Architects play a pivotal role in managing the cloud-based infrastructure and its operations. From Cloud Management and Migration to Monitoring, Cloud Architects take care of everything.", undefined, undefined, undefined,
    `Strong understanding of cloud computing
Proficiency in cloud platforms such as AWS, Azure, or Google Cloud Platform
Knowledge of cloud security
Familiarity with cloud-native technologies such as containers, microservices, and serverless computing
Strong infrastructure and network design skills
Understanding of compliance and regulatory requirements such as HIPAA, GDPR, or PCI-DSS
Experience with cloud migration and hybrid cloud`.split("\n").map(x => x.trim())
  )
];