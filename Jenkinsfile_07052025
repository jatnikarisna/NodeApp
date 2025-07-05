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
                                         kubeconfig(caCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCVENDQWUyZ0F3SUJBZ0lJZHJFQW5SeEpvSW93RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TlRBM01EVXhNVFE1TWpaYUZ3MHpOVEEzTURNeE1UVTBNalphTUJVeApFekFSQmdOVkJBTVRDbXQxWW1WeWJtVjBaWE13Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLCkFvSUJBUUNxc2RWQ2YzdFhRdnVpWGZYZytuYTE0QXRndlJhL0VWT3lOTExiTEhrbGd5QnVvZHJaMURmdFB0blkKTmgwc0pYNkFISURlQXhaTTNuS0s1dk9OZEsyaHBBcHNSckcvZmdMYnVwc0tLQmVLV3JqYm5NeFVPWDNLSmdJZQozMXMvMGRCSjFaNEMxSnlpaC9PeG1lR3kxVnd4YTE3THJzOHp3bFY5UjZqSElqQmdUc1RpdkxQcDUwSkJwZ1hoCnlhSzBGeDBRSkwvS25BNWNQNUxCcXBCcW5zQk1xejliZlBLSzNkRnVibHhxSlcyQVc1R25mODMrNjNTaFhZZDYKVm1YbENTSlpqWjFHY1lUTkgyUTdoVGJWR3VXNjZaUmFYTEdzM2pzRmRZTkNrNXh1UEFDdmFZMzgzb25qMFlYUApDY29LR1MxenY1enI1QTl6aXVJWjRjclNGNDdKQWdNQkFBR2pXVEJYTUE0R0ExVWREd0VCL3dRRUF3SUNwREFQCkJnTlZIUk1CQWY4RUJUQURBUUgvTUIwR0ExVWREZ1FXQkJUYWZyTVhZUE9tRnYyRVRmZUNRTHhqU2t6UTVEQVYKQmdOVkhSRUVEakFNZ2dwcmRXSmxjbTVsZEdWek1BMEdDU3FHU0liM0RRRUJDd1VBQTRJQkFRQkNrTzQ4ZGlNNgpmVno4TnNOMUJSeVdDQTJJRjRGNi9WY05sZi9qOVEwYldxZU1LbFVraVF6R01KUHFlQm5LN1B3cWdPbnVrVzgwCkluL1EwQzdYSm1oblpBeEJ4VkYvOWZoK1Y1NHJNVm9CaCtRd1dIY1BBUnFZUjQzR2VKZW5pbzAxNkdPVTFDU3gKVUU2MVMxQzNjd1BmWDIxRGd5NlVoaTg2MzJsRklYY0ZvZzBWb1hmMG5oY3ZJK2pBZFIrMERGeXNUVmZBQ2w5YgpYNkRnZk5SY0tycUxWOExjWlFCTVRVRWltSXFDK3J5aHhLSHNXR0FHckRJZXdkL1FpRW1QVnloVkc2dWdJK1ZLCjBkU3c4c29vWnI2RDJQVnBtcUZUcGJaRXNvMUtSb3F3aGRDV1BFWVBSbFY1L29JWWZlNUlyZ3dhTk5VYTdhVUEKSkNXcTA4dERNTFFmCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K', credentialsId: 'kubeconfig', serverUrl: 'https://172.31.188.199:6443') {
					sh 'echo "Starting K8s Deployment"'
                    sh '''
			kubectl set image deployment/node-app-deployment node-app=erisjat/nodeapp:latest
                        kubectl rollout restart deployment node-app-deployment
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
