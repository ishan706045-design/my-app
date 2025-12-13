pipeline {
    agent any

    environment {
        PROJECT_ID = "learning-481011"
        REGION = "asia-south1"
        REPO = "learning"
        IMAGE = "myapp"

        TAG = "${env.GIT_COMMIT.take(7)}"
        IMAGE_URL = "${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/${IMAGE}:${TAG}"

        GITOPS_REPO = "https://github.com/ishan706045-design/charts.git"
    }

    stages {

        stage('Checkout App Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_URL} ."
            }
        }

        stage('Login to Artifact Registry') {
            steps {
                withCredentials([file(credentialsId: 'gcp-json', variable: 'GCP_KEY')]) {
                    sh """
                    cat \$GCP_KEY | docker login -u _json_key --password-stdin https://${REGION}-docker.pkg.dev
                    """
                }
            }
        }

        stage('Push Image') {
            steps {
                sh "docker push ${IMAGE_URL}"
            }
        }

        /* ================= UPDATE GITOPS ================= */

        stage('Update STAGING image tag') {
            when { branch 'dev' }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github-pat',
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_TOKEN'
                )]) {
                    sh """
                    rm -rf gitops
                    git clone https://${GIT_USER}:${GIT_TOKEN}@github.com/ishan706045-design/charts.git gitops
                    cd gitops

                    # yq v3 FIX (note -y)
                    yq w -y -i values-staging.yaml image.repository "${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/${IMAGE}"
                    yq w -y -i values-staging.yaml image.tag "${TAG}"

                    git config user.email "jenkins@ci"
                    git config user.name "jenkins"

                    git diff --quiet || git commit -am "staging: update image to ${TAG}"
                    git push
                    """
                }
            }
        }

        stage('Update PRODUCTION image tag') {
            when { branch 'main' }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github-pat',
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_TOKEN'
                )]) {
                    sh """
                    rm -rf gitops
                    git clone https://${GIT_USER}:${GIT_TOKEN}@github.com/ishan706045-design/charts.git gitops
                    cd gitops

                    # yq v3 FIX (note -y)
                    yq w -y -i values-production.yaml image.repository "${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/${IMAGE}"
                    yq w -y -i values-production.yaml image.tag "${TAG}"

                    git config user.email "jenkins@ci"
                    git config user.name "jenkins"

                    git diff --quiet || git commit -am "prod: update image to ${TAG}"
                    git push
                    """
                }
            }
        }
    }
}
