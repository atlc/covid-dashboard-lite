pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'cd /var/www/covid.atlc.dev && npm run build'
      }
    }

  }
}