# FamilyPortal

## How to Get Started
###Starting Database Server
1. Install MongoDB --> https://www.mongodb.com/download-center
2. Open windows command prompt
3. Point command prompt to mongo directory bin folder (ex: cd C:\Program Files\MongoDB\Server\3.4\bin)
4. Type 'mongod --dbpath C:\git\familyportal\data' where 'C:\git\familyportal\data' is where your project is located

###Connecting to FamilyPortal Database
2. Open windows command prompt
3. Point command prompt to mongo directory bin folder (ex: cd C:\Program Files\MongoDB\Server\3.4\bin)
3. Type 'mongo' to connect to the database server
4. Type 'use familyportal' to connect to familyportal database
5. Query against database as needed (ex: db.videos.find().pretty())

###Starting Website
1. Install node.js --> https://nodejs.org/en/download/
2. Open node.js command prompt
3. Point command prompt to git directory (ex: cd C:\git\FamilyPortal)
4. Type 'npm start' to start the application locally

## How to Get Involved
- Add Features you'd like to see to the TODO.txt
- Pick up a task from TODO.txt and give it a shot

##Framework Structure
- Runtime Enviornment: Node.js
- Core Server Side Framework: Express.js
- HTML Templating Engine: pug.js(used to be called JADE.js)
- Client Side JS Framework: Angular.js
- Client Side CSS Framework: Bootstrap.js
- Database: MongoDB
- Pre-Compile Task Runner: Grunt.js
