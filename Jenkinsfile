pipeline {
    agent any

    environment {
        PROJECT_ID = "learning-481011"
        REGION = "asia-south1"
        REPO = "learning"
        IMAGE = "myapp"
        TAG = "${env.GIT_COMMIT.take(7)}"
        IMAGE_URL = "${env.REGION}-docker.pkg.dev/${env.PROJECT_ID}/${env.REPO}/${env.IMAGE}:${env.TAG}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t ${IMAGE_URL} .
                """
            }
        }

        stage('Login to Google Artifact Registry') {
            steps {
                withCredentials([file(credentialsId: 'gcp-json', variable: 'GCP_KEY')]) {
                    sh """
                    cat $GCP_KEY | docker login -u _json_key --password-stdin https://${REGION}-docker.pkg.dev
                    """
                }
            }
        }

        stage('Push Image') {
            steps {
                sh "docker push ${IMAGE_URL}"
            }
        }
        
        stage('Deploy to STAGING') {
            when {
                branch 'dev'
            }
            steps {
                sh """
                helm upgrade --install myapp ./charts \
                  --namespace staging \
                  --create-namespace \
                  -f charts/values-staging.yaml \
                  --set image.repository=${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/${IMAGE} \
                  --set image.tag=${TAG}
                """
            }
        }

        /* ================= PRODUCTION ================= */
        stage('Deploy to PRODUCTION') {
            when {
                branch 'main'
            }
            steps {
                input message: "Approve PRODUCTION deployment?"
                sh """
                helm upgrade --install myapp ./charts \
                  --namespace production \
                  --create-namespace \
                  -f charts/values-production.yaml \
                  --set image.repository=${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/${IMAGE} \
                  --set image.tag=${TAG}
                """
            }
        }
    }
}