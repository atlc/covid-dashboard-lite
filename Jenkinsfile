pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh 'cd /var/www/covid.atlc.dev && git pull && npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'cd /var/www/covid.atlc.dev && npm run build'
      }
    }

  }
}