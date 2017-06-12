node("docker") {
    checkout scm
    stage "docker-build"
    def app = docker.build "galaxyAPI"
    
}
