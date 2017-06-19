node {
    stage ("docker-build"){
        echo "reached"
        sh ("docker version")
        echo "reached2"
        docker.build ("helloNode:v1", '.')
    }    
}
