
pipeline { 
    agent any

    stages {
        stage('Build-Docker') {
            steps {
                echo 'Hello World' 
                docker 'bild -t hello-node:v1 .'
            }
        }
    }
}
