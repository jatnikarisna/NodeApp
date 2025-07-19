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
kubeconfig(caCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURLVENDQWhHZ0F3SUJBZ0lJSE1FWTEwTUQ1dUl3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TlRBM01Ua3dNakkxTVRkYUZ3MHlOakEzTVRrd01qTXdNVGRhTUR3eApIekFkQmdOVkJBb1RGbXQxWW1WaFpHMDZZMngxYzNSbGNpMWhaRzFwYm5NeEdUQVhCZ05WQkFNVEVHdDFZbVZ5CmJtVjBaWE10WVdSdGFXNHdnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFEUDBVTHEKOStVSENiQ2UxZ1c2OUJqbE1zR0g1V2NEeDRMN1VxVk83Z2xLeStzT0k1UDlOMjJEMFZUbE1QRDVxdEMzZDJCQgpmY2tiVm1Fb25RelVRMjhVbHladk96M0hhUXoyKy9tQXhLZExoSXNuRTl5RE1VYUhXeDZkbDZsSVVadkF5OVk0CmE4V0VCZmRqWnEvck1kd3VGVDEzV01KL0h2VlhJTk1IS3ZzT3k2UGFNM2tsV3g2WTdGdlJmSEtiOHJKdGpKcnYKUG96NWRWNDNyYzYyZG8wbkdMOGN5TGdqVEpaVjJXanB1YW1NWFNTdE92b3hjbEJPYnh4b1NyQ2tJRTg5WXFZNApNeTlvMm5VKy95ZlZRV2Z2RDU2bjI1Y3JnL0oweEdSd1N4R0pOM2d4b3ZmTUVQRzhPTEZCZVpIcVV0bDIzVkFBCmFVNEtTTkZPcGJRY3ZFZ2hBZ01CQUFHalZqQlVNQTRHQTFVZER3RUIvd1FFQXdJRm9EQVRCZ05WSFNVRUREQUsKQmdnckJnRUZCUWNEQWpBTUJnTlZIUk1CQWY4RUFqQUFNQjhHQTFVZEl3UVlNQmFBRlAyMlQzSHNrN2F0Skc1NwpnREdTZTNVOVUxRytNQTBHQ1NxR1NJYjNEUUVCQ3dVQUE0SUJBUUF5czJZMUZyWEVCc0w3Wmt4MzljV2MwaTVjCk41QitxTTFiby9DNnU1cWo4endLbFI0dnhOS0tYRmtLQ2t3THgvQVJERk9lbUVPTnNMck1BNnFDakRJL2lPRnMKeUVUdGREZlFFMExDVTd3NXpRMzZOSlZDeHlDRW82Z0VZUkRmVENBNXZ5Z3RnRnNJei9Vcit1RGxBOE1mMWRlRgo3WXZGZnB0aXM4OTIzZndkZ0J4TzNmVnFRaEhVT0FqM2V1UUJTM1hEZkJyZEZoY01kNER4dlNLWTZJU2Z3SnpqCnIrM2x5V25SekQ0NzFYRjY1cVEyYkFvdmRlS0ZYeC9TZmtBN092MHU2bEVTR0htbm96eVYvQ0daVVQ3eXBSUXMKc2RCUExTTjB1MlRwdEczRWxpYmZrUGVaM3NNNEcweXBQQ1lQaVhDaHYxajlRekdKQzB0aTRhSVlvdnFXCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K', credentialsId: 'kubernetes', serverUrl: 'https://172.31.138.173:6443') {
        sh 'echo "Starting K8s Deployment"'
  sh 'kubectl scale deployment node-app-deployment --replicas=0'
  sh 'kubectl apply -f deployment.yaml'
  sh 'kubectl scale deployment node-app-deployment --replicas=3'
  sh 'kubectl apply -f service.yaml'

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
