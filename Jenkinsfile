pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test'){
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
				cd /home/ec2-user/FamilyPortal
				npm run prod_start
                echo 'Deploying....'
            }
        }
    }
}