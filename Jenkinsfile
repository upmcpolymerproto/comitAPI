
pipeline { 
    agent any

    stages {
        stage('Build-Docker') {
            steps {
                echo 'Hello World' 
                docker 'build -t hello-node:v1 .'
            }
        }
    }
}
