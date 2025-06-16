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
                                         kubeconfig(caCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURLVENDQWhHZ0F3SUJBZ0lJTk9KMTUvRmliTzB3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TlRBMk1UVXdNVFV5TkRGYUZ3MHlOakEyTVRVd01UVTNOREZhTUR3eApIekFkQmdOVkJBb1RGbXQxWW1WaFpHMDZZMngxYzNSbGNpMWhaRzFwYm5NeEdUQVhCZ05WQkFNVEVHdDFZbVZ5CmJtVjBaWE10WVdSdGFXNHdnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFEenFYN28KU1RCRGp2cEFibnRhNEZvV0JLUzF4V0ZtdU5lYjYyZXFISUdCZlRDaEJHMnhXbjNHQXh6dXVjbU55bmNocjRJRQpSSTY4SllCTVVXVXRiR0J0dXJhbzVQOVJRUURsU0RxbHdOcmdSOVVONElYcWR4b01LSlhGTXE4bmpqazErSXU3CmpHY1dINHFoenVXV24xYUYyWWV4TnozQ2lrQ1FDUGlGZWpnd09Qc0pIY0dxOWJtU3pQWks0YlIxcjA1WGxpYzYKRjJjZndsVnRVR3BCaXpzejVzMnZWeC9PV3lUQmxOQ1pRbG5PbjNhUFdkbmpQNkFKNTYySUU3M3dRRWVNWWJWUgozSFBVUjhrZDMwdWdSeWN2M1o3Q3dUL1VPUkVMcmZzcFowQXZ6Si9UVCt3WEFNSC9hMnZuQ3lRcFoyOHo2RVNkCndPVm9UV1QwVk5lZm9IVDNBZ01CQUFHalZqQlVNQTRHQTFVZER3RUIvd1FFQXdJRm9EQVRCZ05WSFNVRUREQUsKQmdnckJnRUZCUWNEQWpBTUJnTlZIUk1CQWY4RUFqQUFNQjhHQTFVZEl3UVlNQmFBRktlSGVLcU55UjFZbno5MApFU3hYNlJjdG1Pb29NQTBHQ1NxR1NJYjNEUUVCQ3dVQUE0SUJBUUMrUnY4WUJHYTMyeEtTYUJLaSs0RGtmeUkyClM5bVUwVXRzdkRHQVBpalhjT1VQa091UmhZaWFDeldWSVdmUWNhMnNZVnVyOXU0c2JSaW42c1RySyt3cDZtODEKWVNnQklIV0p1RVhjeStjcE12ODdQeXFPRlcwNG5ENG1YWmZxd01tankvbzNhbVRtbnk1WEhodERuSkVvTXBtawprbWlCK3BtYzNQcVZJRDlUdjZUNytaZlZTTGVHTDA5VVREdUFrQXRrM084U25oOGRISG8vODlPYVMxTmx1Zm45CjhDWmtNZEFjL21TV291K1FVczRiUTlWRGhuUlBuQjlBVi9PRUZHL2pIT0dCZnhpVWhFSHgyZnJuZWoxRXUwTE8KNThoN1Nqbkpxc1ArNnNxUUg0eWd1VFY4THV2S1BrNm13Sk1Iam1xNFE1TExtb085Qml4clNWckxFSmIzCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K', credentialsId: 'kubeconfig', serverUrl: 'https://172.31.186.64:6443') {
					sh 'echo "Starting K8s Deployment"'
                    sh '''
		       kubectl scale deploy node-app-deployment --replicas=0
                       kubectl apply -f deployment.yaml
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
