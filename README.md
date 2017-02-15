# FamilyPortal

## How to Get Started
###Database Servers
####Prod
- Server: ec2-52-55-164-103.compute-1.amazonaws.com
- Port: 27017
- Db Name: familyportal
- Username: familyPortalUser
- Pwd: (contact project owner)

####Dev
- Server: ec2-52-55-164-103.compute-1.amazonaws.com
- Port: 27017
- Db Name: familyportal_dev
- Username: familyPortalUser_Dev
- Pwd: (contact project owner)

###Web Servers:
####Prod
- Url: http://ec2-52-55-164-103.compute-1.amazonaws.com

####Dev
- Url: http://ec2-52-55-164-103.compute-1.amazonaws.com:3333/ <-- Must be started manually

###Server Tasks:
Scheduler(Crontab)
- Prod DB Backup --> mongodump nightly @ 7AM UCT(12 AM MST)

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
- Hosting Service: AWS EC2
