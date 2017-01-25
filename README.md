# FamilyPortal

## How to Get Started
###Starting Database Server
1. Install MongoDB --> https://www.mongodb.com/download-center
2. Open windows command prompt
3. Point command prompt to mongo directory bin folder (ex: cd C:\Program Files\MongoDB\Server\3.4\bin)
4. Type 'mongod --dbpath=C:\git\familyportal\data --logpath=C:\git\familyportal\data\logs\log --install' where 'C:\git\familyportal\data' is where your project is located
5. Navigate to windows service window(services.msc) and start service 'MongoDB'(this service will automatically start from now on)

###Connecting to FamilyPortal Database
1. Install Robomongo which is a GUI for accessing the database --> https://robomongo.org/download
2. Conect to database at localhost:27017(where the windows service is hosting the database server)
3. Use 'FamilyPortal' database

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
