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
  kubeconfig(caCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCVENDQWUyZ0F3SUJBZ0lJSTl4S3pvUXN3Rkl3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TlRBNE1EY3dNVFEyTkRkYUZ3MHpOVEE0TURVd01UVXhORGRhTUJVeApFekFSQmdOVkJBTVRDbXQxWW1WeWJtVjBaWE13Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLCkFvSUJBUURiNktUemNhcXhsdk1qb0diMnN1TFF4eUtHSlZXaEZiVVdTc0lOSWxEVjFKbVUrMjU4azZIM0Z3cXoKS1liYytZc0FjOGdPZlhvbXVybWZmQk0yNjZRMENlOGZtc1RyOVpFN3hXRkJBQzN2WVAwT3drV0xIU2htcmx1bgprWGNwMHNrbnpiSmFGeVFTcys3dGRMdmc5dmMrQjhCS2hyU0h4R0I1WGJjdWNBRFJMRWVzOWIzN3I3NDN4L2F0CmpUbDZmM1VJU3ltbHE1WWtkdEdERzg5S2NxZnc0cWN2MjFVVmtBY2ZsZzlXSkJBeCtaQ1VnZHV3OHB1cklTbUgKS1R3b2ZGQ2hSYmtwQ2RvR2NIdWV4ODJTaFhvY3VNZ0g3cXlRTVZVRTJBZ0NTRi9OZHE4ZzAvOEtEbHZyaEg4ZwpVWjVtbmtLRjFOUVdPZ1R0bTdXL2ZvM2U2VE1IQWdNQkFBR2pXVEJYTUE0R0ExVWREd0VCL3dRRUF3SUNwREFQCkJnTlZIUk1CQWY4RUJUQURBUUgvTUIwR0ExVWREZ1FXQkJUYnc4SEVsNkdpNDFSbjU4dVdnSlgvUXpnTHdqQVYKQmdOVkhSRUVEakFNZ2dwcmRXSmxjbTVsZEdWek1BMEdDU3FHU0liM0RRRUJDd1VBQTRJQkFRQ0F0NFZGOEZnSwptTkRiY3Ryb1Vsekx4VE9HMk1TUWlGeXgrRjRDS0FvMklFV09IRjR0NVhZakFKcnNMa3hCcDJDUWpvNGlqdjhaCjdEOUM4a281Y2JyWXZjSW9SbHNiTHVDekNxYkNqVVhyVjNHLzJYS3FGQloyR2cya0FxS3F1NTBNU2luZy9NeHcKUTVtMStpMjhjZ3k2b1dLVjMvejd6cVdWdDF4ODZWbXlYZnR5Zkpyd3NuMkJVSHhwN05MMWJtb3cwQXd6SnFESgpJMXhOck5ZUU81NFBuN0I5WG9Pcm02ZThyam5PVnArR0drRDNFNjVyK3pFdTNFZnRtTUZRZUFiemx6K2drVnUvCm1JZ0JJWkdDQXcxLzRVQm5QSTMrRVErNDNjTzUwSVdoUG5xSDNKdmVOSnZBUkpYaXZiMmMrZU1kY3UwSWZxWGEKOUc0anB5cFEwOFU1Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K', credentialsId: 'kubernetes', serverUrl: 'https://172.31.153.85:6443') {
sh 'echo "Starting ams Deployment"'
    sh '''
      if kubectl get deployments | grep node-app-deployment
       then
          kubectl scale deployment node-app-deployment --replicas=0
          kubectl apply -f deployment.yaml
          kubectl scale deployment node-app-deployment --replicas=3
          kubectl apply -f service.yaml
      else
          kubectl apply -f deployment.yaml
          kubectl scale deployment node-app-deployment --replicas=3
          kubectl apply -f service.yaml
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
