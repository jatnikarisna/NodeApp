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
kubeconfig(caCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCVENDQWUyZ0F3SUJBZ0lJZGR4c0tINGFLTVV3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TlRBNE1EY3dOakUyTVRkYUZ3MHpOVEE0TURVd05qSXhNVGRhTUJVeApFekFSQmdOVkJBTVRDbXQxWW1WeWJtVjBaWE13Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLCkFvSUJBUURwenM4Uzc3QXhlY3VJVmVaM05xZ3E0QUdkcms3bEh4b0YvTWFqNjVSam5VUFlVdFJERFU4UHZINnQKdzEzb3lmSThjWGQ3TmNUdStzZm0xck1NS0J1UmFHZmVwSmFWc0RpVS9XZ1ZiZTBaeWhpVlRoSXdFYnJ2aVlQZgpEdlVXR1UweE5YQktuaVZSVEhwR3R6VkdyL0xCNHpYTkEvME13UnRJU2lkcHpnU1MrZ1RmS0x5N2FCZTVVa013ClJMTGdERzZuYmdpTkJMTDR6OGVpeTFzV25pNTlPTjhJZVpXdGdNZmV5WHg3cUo2akpGbytKQ0tlUTVhZGpJUmIKZG93UU0wMDVGa2E2OG9lb1FxcFR3YXRKblZLK1NPQ3lkVjc0R2FJTjV5TXd3UHFWUklqc0FIeE4xZStNaVcwNQpCaWR0d01HKzhEMTFYZ2RlWXAzdjduY1BjWHc5QWdNQkFBR2pXVEJYTUE0R0ExVWREd0VCL3dRRUF3SUNwREFQCkJnTlZIUk1CQWY4RUJUQURBUUgvTUIwR0ExVWREZ1FXQkJTcDhKSDV6bXBJbTUxL0FGdFNPODUrTU5jRndqQVYKQmdOVkhSRUVEakFNZ2dwcmRXSmxjbTVsZEdWek1BMEdDU3FHU0liM0RRRUJDd1VBQTRJQkFRQ0E5Tyt1eWVFUQozSTBtZHZJczBQY2FRVWdsU2dDb3IwN254MHRVSkpUd0IwTU13b3hvdFNtUlhUakgyemhtc3lhMGZqK0t4a3JVCmcxK0lrcUIrODNZSWo3YnU5Wm5iUEhHUjF6REo3R1A4VVMxQmVPMEVadEtvai9NZ1k3TEZUdXVGSGR3QXBPbW4KaWd4VVZRMVcycTF0Zlo3cWwwbmozQ3NqNUJQa0FGdGxrSzBNR1pFQnpVMVVPdkdoS3d6OG5HMFBjZVQxSjZmSApiRVpPLzI4RzhDTlZUcTZkamFRMXZRQ1ArdlkxSmRvUU5vb2NncGEvUkdaTkZuQTBQRVR1TlRBWi9Jbi9aUlFrClJMbThnRXVReHNOTTRma1lCbXQxL0JqUlVTNERZV3RJRFFLV0dVS1BCR3Z5cUFSeG5jWlZ3UHUyOVliUVpkNFgKSFRiTW5HcWFnQzNGCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K', credentialsId: 'kubernetes', serverUrl: 'https://172.31.176.45:6443') {
   
 sh 'echo "Starting Deployment"'
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
