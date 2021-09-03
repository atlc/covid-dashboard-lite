pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh 'sudo npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'cd /var/www/covid.atlc.dev && sudo npm run build'
      }
    }

  }
}