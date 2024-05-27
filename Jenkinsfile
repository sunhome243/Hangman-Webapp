pipeline {
  agent any

    stages{
      stage('Build') {
        steps {
          sh 'docker build -t whalerider02/hangman-app-mp:latest --platform linux/amd64,linux/arm64 .'
        }
      }

      stage('Test'){
        steps{
          sh 'docker run -d -p 5200:5200 whalerider02/hangman-app-mp:latest'
          sleep 5
          sh 'curl http://localhost:5200'
          sh 'curl http://localhost:5200/start'
        }
      }

      stage('Push') {
        steps {
          sh 'docker push whalerider02/hangman-app-mp:latest'
        }
      }
  }
}

