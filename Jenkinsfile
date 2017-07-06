node {
    stage ("docker-build"){
        echo "reached3"
        sh ("docker version")
        echo "reached2"
        sh("pwd")
        echo "reached3"
        docker.build ("helloNode:v1", '.')
    }    
}
