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
					kubeconfig(caCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURLVENDQWhHZ0F3SUJBZ0lJVjJ2VjdlWjdlc2N3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TlRBM01USXhNREk0TXpCYUZ3MHlOakEzTVRJeE1ETXpNekJhTUR3eApIekFkQmdOVkJBb1RGbXQxWW1WaFpHMDZZMngxYzNSbGNpMWhaRzFwYm5NeEdUQVhCZ05WQkFNVEVHdDFZbVZ5CmJtVjBaWE10WVdSdGFXNHdnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFDYi8vQk8KbWs5RjYzdXhzQks2eUpHOVczdCtXNHFjcndBT1VDL3RpQnpFNUIyaGZCZ25Rd1FZMmNIdCttUGlHdVdHMDJLYQpKS3VkUThodnVLNXZUNzM5d2x2a2NISk5lYTRNOFczNUxSMGhSZ01nazNzYkhVV05nc1ljQzhXaDBPVWliZmFRCkNmNDRNOFBMbWswZC83cU9JOVpxdDhVdXg3UFpESWJCdTNpZ3dWOE1aQ0U0MGJGYmkzMVgrbjJ6Rjd3b2pOdUQKeW9PZUNuT2h2K3BxU2hRQ0oxakJhU2ZUOUZBSU5iZTd1TDVsTEhpVGFiY3dKTVZ5eDJHaVBrM0RhTitwNzZXWQpUWTlLMjlocnVYRERhS3ByN3dhczlwWkY3VkpTNDJxRUhDWWh4QWNldXJMRXY2dnNYb096NTdyaDFTRGJZQW9HCitxem05eFVNdUVWSnk1VUhBZ01CQUFHalZqQlVNQTRHQTFVZER3RUIvd1FFQXdJRm9EQVRCZ05WSFNVRUREQUsKQmdnckJnRUZCUWNEQWpBTUJnTlZIUk1CQWY4RUFqQUFNQjhHQTFVZEl3UVlNQmFBRkxrVVdKSC9FRklCa1FPdApvUHJoVEk1bElTc3NNQTBHQ1NxR1NJYjNEUUVCQ3dVQUE0SUJBUURCcjYxRUZRWUx4Ymp5NldZU0pvMzg2M0ZuCnI3dnNWN1lMU1JGOXpTR0NnWnhWcVgrWHNWUCtrY3ZQQU1vZW00Y3Vlb20wQ3ZuUWJkYTdUd0dhVWZkRitpdGsKRkNuNVFmdG43WG5lRzNhODN5a2NycmNCdlNZQTgrcXNNcVlya1JyT21wck5VdG56QThLWVB6bUdUUUZhek9iUgpZWHBsVTNRWlpGTXFvYWliZTh6ZyttYzNqNDlqckl2MnQwUFE2TlhGQlRTZERpVHcrc3hrd1k4SytxTWdTMzFnCkpEZmh2TGhtVXlWbzJUQ3lQQ1YrRlV6SGdUcnZmQWhkLzFzdFl2OU1uUk8zeVZPajdza1NoRlN2ZjAzUG52NjQKWVJleDVjVldjek43T2k0NjkrcE93WktmWDlXZHVYamtzTThYMDRvZy9HTmFJbEpZc0llYnlMVm1UWFdpCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K', credentialsId: 'kubernetes', serverUrl: 'https://172.31.45.176:6443') {
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
