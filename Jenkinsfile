node {
    stage ("docker-build"){
        docker ("version")
        echo "reached"
        docker ("build -t hello-node:v1 .")
    }    
}
