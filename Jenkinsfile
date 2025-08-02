pipeline {
	agent any
	tools {
		nodejs 'NodeJS'
	}
	environment {
		DOCKER_HUB_CREDENTIALS_ID = 'jen-dockerhub'
		DOCKER_HUB_REPO = 'erisjat/nodeapp'
	}
	stages {
		stage('Checkout Github'){
			steps {
			git branch: 'main', credentialsId: 'jenkins-doc-git', url: 'https://github.com/jatnikarisna/NodeApp.git'
			}
		}		
		stage('Install node dependencies'){
			steps {
				sh 'npm install'
			}
		}
		stage('Build Docker Image'){
			steps {
				script {
					dockerImage = docker.build("${DOCKER_HUB_REPO}:latest")
				}
			}
		}
		stage('Push Image to DockerHub'){
			steps {
				script {
					docker.withRegistry('https://registry.hub.docker.com', "${DOCKER_HUB_CREDENTIALS_ID}"){
						dockerImage.push('latest')
					}
				}
			}
		}
                stage('Deploy to Kubernetes'){
                        steps {
                                script {
kubeconfig(caCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCVENDQWUyZ0F3SUJBZ0lJTkxtNzRndGFkaEF3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TlRBNE1ESXdOalEzTlRWYUZ3MHpOVEEzTXpFd05qVXlOVFZhTUJVeApFekFSQmdOVkJBTVRDbXQxWW1WeWJtVjBaWE13Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLCkFvSUJBUURrSWJadmZsZnlYR1pteVBvbDgzemdVL3luUUdkV29DZDZyOUFOeUl3UVhEeTZJWC9LZ0dlK3U3TVYKd0xxdWUzbTM5TmttZHltWUczVVV3UEgyeTlnaFB2ZUwvbnBsaFVobVlyVFZOSHlDWXM3R0NMbkswcWdOM1NLSQp6U1o1b2ZzNzhmdDZuZ01acXZvQjRIVXdMRW15OCtJdkxYcnBDZUErbWtPQnA0S09pemNoVmtyYVJxd2Y4clJqCkRQQTdjdHJqOUh4c05qTjlCNWVRSkFMT2daWXlVeURyZzlZbitLeTRHVFBQSmNEb2ZSdnFLanlDUTdhYVZkbFcKaGhpYTVNNzZEUThEeS8zVjFhRkxnSnZoQWpJWVBwbXdvSG5hYXEwb0J6UnhsNEc1OGhJV0VGbXdMekZkUXAzMwpyTzZkcjU2K01uRnV4bHNyY3Jra2tUdGFaNWtwQWdNQkFBR2pXVEJYTUE0R0ExVWREd0VCL3dRRUF3SUNwREFQCkJnTlZIUk1CQWY4RUJUQURBUUgvTUIwR0ExVWREZ1FXQkJSYzRmdkczOFU5MWtsRmxGbXh3aVROTGVZTXlEQVYKQmdOVkhSRUVEakFNZ2dwcmRXSmxjbTVsZEdWek1BMEdDU3FHU0liM0RRRUJDd1VBQTRJQkFRQ2NLNlZONTFwNQpqbkJIeVhFemJaalRvTEEyUjQwTmlXU3A3TWM1SzBtZXErWXBKY2RCTVpiS1dldldQVVU2QnB3OSt0bVNtdmZWCkI1b0FhSlFrRmd4ZTFndVByUlV2REF2SXZGb3dGQ3BxOFVsWjFjZzRpREI2SDJ3cnVPanY1c09ialZjcTdBdXMKeEVHUnpLbWNmdnBIZEw4WEdMTDlFRjNDV2l4S1A4ZEl5Vm1VN25lNEZsaDJabVlRQkd1VG9LbFRHOU9sR0FlWgphYUxtNkp1NTBXdzFGVExyU1JCaHArWjRFY0tLOHl2bU9mK0ZwanBjUjhCMVlmcXBNNG1IL0ZRbUN1a0hSNStOClNlbHpXWUVaRDZWbG9EWDQ1ejlKdmRIM0l2S2pYaW8xUUwxcjVVRjVIM0QzL29lbUtqSHZjdk1qMmp2ZmhPUzkKR2NoOHhkaFBjQ3BNCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K', credentialsId: 'kubernetes', serverUrl: 'https://172.31.99.31:6443') {
   
  sh 'echo "Starting ams Deployment"'
    sh '''
      if kubectl get deployments | grep node-app-deployment
       then
          kubectl set image deployment/node-app-deployment node-app=erisjat/nodeapp:latest
          kubectl rollout restart deployment node-app-deployment
          kubectl apply -f service.yaml
      else
          kubectl apply -f deployment.yaml -n default
          fi
       '''

                                        }
                                }
                        }
                }                
        }
	post {
		success {
			echo 'Build&Deploy completed succesfully!'
		}
		failure {
			echo 'Build&Deploy failed. Check logs.'
		}
	}
}
