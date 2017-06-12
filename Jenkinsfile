
pipeline { 
    agent any

    stages {
        stage('Build-Docker') {
            steps {
                echo 'Hello World' 
                sh('docker-build.sh')
            }
        }
    }
}
