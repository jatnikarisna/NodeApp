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
kubeconfig(caCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCVENDQWUyZ0F3SUJBZ0lJVWRoQnZUdmpwMDR3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TlRBM01Ua3hNekEyTkRsYUZ3MHpOVEEzTVRjeE16RXhORGxhTUJVeApFekFSQmdOVkJBTVRDbXQxWW1WeWJtVjBaWE13Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLCkFvSUJBUURXdS9oV1E3R2ZyRDNydUpGRW5SYS9Icmx3UjM5SG5paGlmdzhRTWRFZmkrVHM2Mi9sZitBZU9tZXQKa2tSeStIRk0zMWpHZGxUR3k0SVZSTjlremhrbW5HbWhVZTFqek1sUER2N3l3ZnNqTjRFWVlsckhUN2I4YkUvcgpMN1J0N1BTaWFPUUVxK1d1S3dKNCtXZW83b2MxTlFjOGRIc2FxL2N3UUF1NHZFODV1cmlnbjZUNTdwNXNkejNnCi9aVDMvSkYwL2gyUGlBSk42eEZiaEY0aTByWnNjV0puOW1YQ21oa2hSbVMxYUpIWHdyeERxaUJkakt1amFENW0KTE4xWW1PVTJiQlpCdEEyamJmUDJOV0RSMEJNZ1FsS2lyQ2FUSllxbEpVd1ZkYW14bUgwMHV5bDM4M2RZM2xFaApJaE0vb1VkMjc5eHpoOWFrL3FEbFB0YkNSczQxQWdNQkFBR2pXVEJYTUE0R0ExVWREd0VCL3dRRUF3SUNwREFQCkJnTlZIUk1CQWY4RUJUQURBUUgvTUIwR0ExVWREZ1FXQkJTYlpKRU5NVm4wcHRFU1hkTXNncEZBdnYzU25qQVYKQmdOVkhSRUVEakFNZ2dwcmRXSmxjbTVsZEdWek1BMEdDU3FHU0liM0RRRUJDd1VBQTRJQkFRQ29MdjY2dC9NOAp0UzJmcFZBa2hzNU43czBtMmJBNDJHam52c0Z6OHZOYVYyZzhpVEFIN3NodEttR3M0L1hLRzFLNjVHL2dHK3BECkdjS0t1VDlCeFk2M2d3dEhCNFYva051dllMalZQcXlOZE9RR0VBSnJxVTZxWHJGdnFiT21NZFc3T2p5QUxZNTIKSUUxc0t1Rkw4NUJ4NUwxZW1kVjg2NkRNNERndG8zRVN0Sk9YZmpUVk1BL3pBREFEMFQ4MDIwbGZMdlFZT3FDUQorWmFhbUtMY2VwY3oyQllpa2N4U3RzY2crOGsxNnZxT1ZWeGV0V2R0cjA2NFRDTGxlcy9YYjUzTlZqWEVOT2tOClNjeGx2SWlyKzJmYlk5MlE1UTJJZkxYVDc3bEI4dE1DUjNNcVZCTUpacHNZL0ovZTFIK1Q3b0RmVDA2dEVSb0UKZngxVUlrR1pRVW9aCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K', credentialsId: 'kubernetes', serverUrl: 'https://172.31.9.170:6443') {                     
          
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
