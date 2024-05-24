pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t whalerider02/hangman-app:latest .'
      }
    }

    stage('push') {
      steps {
        sh 'docker push whalerider02/hangman-app-mp:latest'
      }
    }

  }
}