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
kubeconfig(caCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCVENDQWUyZ0F3SUJBZ0lJYTFVNk8vYlNHeGN3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TlRBM01qWXdNalUzTlRoYUZ3MHpOVEEzTWpRd016QXlOVGhhTUJVeApFekFSQmdOVkJBTVRDbXQxWW1WeWJtVjBaWE13Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLCkFvSUJBUUMrb3FxMytVMFF2TkcxNEVoclZKYldub0ZNVXRydWJkdXpYL3NYaWQ5Si9yaUhLeUR3ZU1YVFpRNHkKeGttcWFLZ0EwTGEremxQVWhRUWdBdDJTVlhUaVRaaFcxTzduUnRjYlc1Um9SS0RrRE5NV0VBS1Q3b29aVVVsSgpOMkZBcExyMktZRkdLYkg3Uld2dkgza3ZoeG05Ylh5SThxTE5rT3dDRWY4ellyVTdVcXl4eFF5VGlDTzE3d0d6CjcwbEZJSHhmZktOMm95MEJIS0NwcUpDdmJWcFhqQ3NkV2R0VVZTR1FTTy9kQTRCczR6Y2FNWGQ4YUkrbm14dXIKWC9tNzdqc2NGb1BSaXVNVE1HcjdEbW44bjZOSlpwQTQzUXgzQlNwSDZ1RC83YWZ2YlR4WkVhUXFVSjRTZmgxSwpRYVdWelFaZ3VQbEZwN2lCSzRjRGZmcG5zRHNqQWdNQkFBR2pXVEJYTUE0R0ExVWREd0VCL3dRRUF3SUNwREFQCkJnTlZIUk1CQWY4RUJUQURBUUgvTUIwR0ExVWREZ1FXQkJUZCtncW54Tnc0a1ZzamRFaEM5dGdnNHJteVJqQVYKQmdOVkhSRUVEakFNZ2dwcmRXSmxjbTVsZEdWek1BMEdDU3FHU0liM0RRRUJDd1VBQTRJQkFRQ0sydVVjTVVnUQpTUnJINWFYcXBiT2dOdmZFVnRMeGhhMUoxanl2MUxFSHNTM2pMd3QyRWhPMk1qQUxjQXppT1RzeFBhQ09hY1BzCml0b2VRc05oWU1VSzFJcEREdjU0K0JoR01qZmxXT1BvWW5DQktpRUxWZmMrbDBKdktlMmF6YUxYY0FidFF2WDAKc200MmFROFkyTVJyaHE5S014dzNSNjZXN0lwVHI0dStKOWtpR1BNZTczZGtKK2lQaUtveFlTbE9XdEZaKytRRgovMCtjWGMxRUJXdFIzMmk4TVV6R0E3YUdNRlNhOUU2ODFqZlJuYmxjRzVBSW1aa05NZUhiUm42b0ZOWXNLMlo0CnhCWlVJSWVJdEQ3MXdtQVVuNzBPNnNqOHVZU2k4Q0lCU3RPSG1XN1pnMDFOZTV4Q01JRGJjcXBqSEVMUUppbjYKTk1WWlRlRmJNSU9UCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K', credentialsId: 'kubernetes', serverUrl: 'https://172.31.111.210:6443') {

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
