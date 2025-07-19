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
		stage('Test Code'){
			steps {
				sh 'npm test'
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
kubeconfig(caCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURLVENDQWhHZ0F3SUJBZ0lJQjl0Rkhnenpwckl3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TlRBM01Ua3dPVFUzTWpaYUZ3MHlOakEzTVRreE1EQXlNalphTUR3eApIekFkQmdOVkJBb1RGbXQxWW1WaFpHMDZZMngxYzNSbGNpMWhaRzFwYm5NeEdUQVhCZ05WQkFNVEVHdDFZbVZ5CmJtVjBaWE10WVdSdGFXNHdnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFDM3ZhZFcKNUR0VitFOElKMzZ1UmNHMTk4aEc3OHNyWFhXSEFvWldJeTlJaTNqKy94QmE5TnNrUWJuWHg1cHFKUWxhSXNZVgpEZHRxaEp5MWM3ZGtLMndOS3hVMjFZb0cwRjk5UXBzQ20xM0VxcVhTaU5OdDRJL2dCYlVkMnFldEJqcFJJd3IzCnN1eHU1K0RBd0RQV2JkbGVONDRkQ3BobStNWDNhekNnWlc0Q2JlcW81YW1DaW1YQ2RlZ2k1LysrZWxvOXI1VmwKeXFUV3U0SkpPZXVNYStTQzl3Z0xuTFV5MFlSWngwVjlkeUUyWmRhMmZtaFM0QTRaS3pVRHBIeW5tTEVTRXlqMgptQkFCY01qUDEvWXgzTFEwbU83dWhiWnZrWlBUcHo2MU5jbjJvT1QxVUJHTFFENXJaVDQ0Z3VsTHV4eU1pVEg0CmZiUXZhU1o4MFN4VWFMQUhBZ01CQUFHalZqQlVNQTRHQTFVZER3RUIvd1FFQXdJRm9EQVRCZ05WSFNVRUREQUsKQmdnckJnRUZCUWNEQWpBTUJnTlZIUk1CQWY4RUFqQUFNQjhHQTFVZEl3UVlNQmFBRkNWUTI5aWxqUFFpZEtLWApMZ0kvb3FsS3d3RHZNQTBHQ1NxR1NJYjNEUUVCQ3dVQUE0SUJBUUNrWWRiU2NvbndOelQ2OFY0V012ckh3cG9TCkE3ZnZFNzU3WlIyUTZHZlN1ZE9vUnhFME5XY0tvc3lUQzljODBrdkttNEIydzNrWGk4bnlwWDVZaTB5MlZzTWEKUW5oRTB1Z2tseEJPWHlORGl5bXpodEpTUFh0SENIWHgxbjhHbnhTa0I5TUY1L0VKLzFNZThlWU83OTRvd0hrLwpsWE9FMzJzS0o2S0dOTXdoWm5rU3NxMUZEQjBNQWhkVFl6Rm8vbG95ZURaSU5hN2trYndXRWozaUI2bzBpOTl1CkNUOW5neXJyWHhaS1ltUjJtSk8xUkM5L2NyYzI1VWM4Mmdtc0krYW9pSTJ2L1RIejFOaXI0Nkx1dzJJaHJNYWIKNHZLZjZXWFl6dDhncHBTYXB5bzFEYlg0Q3NVaDJXNnBwei9kSjVqbGFvbHEySlJyeWNobzIvSWtpK1ZqCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K', credentialsId: 'kubernetes', serverUrl: 'https://172.31.169.233:6443') {
                     sh 'echo "Starting ams Deployment"'
    sh '''
      if kubectl get deployments | grep node-app-deployment
       then
          kubectl set image deployment/node-app-deployment node-app=erisjat/nodeapp:latest
          kubectl rollout restart deployment node-app-deployment
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
