pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t whalerider02/hangman-app:latest .'
      }
    }

  }
}