pipeline {
  agent {
<<<<<<< HEAD
      label 'newagent' // Specify the label of the predefined agent
    }
=======
    label 'newagent'
  }
>>>>>>> 1d872fefd5c30408d4ffc31ac5f2e3c021893a74
  stages {
    stage('Build') {
      steps {
        sh 'sudo docker build -t whalerider02/hangman-app-mp:latest --platform linux/amd64,linux/arm64 .'
      }
    }

    stage('push') {
      steps {
        sh 'docker push whalerider02/hangman-app-mp:latest'
      }
    }

  }
}
