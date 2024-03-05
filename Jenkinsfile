#!groovy

//
// JenkinsFile FRONTEND
// DEVOPS Version 1.0 Revision oct 11 de 2021
//

/* ------------------------------------------------------------------------
   Variables de Cambio (dependiente del proyecto):

   PROJECT = ["hojadevida", "admonpersonal", "admonpagos", "auth", "core"]
--------------------------------------------------------------------------- */

import groovy.json.JsonOutput
import groovy.transform.Field

@Field def AUTHOR
@Field def LAST_COMMIT
@Field def COMMIT_DATE
@Field def REPO_NS
@Field def IP
@Field def SSH_CREDENTIALS
@Field def REF
@Field def TAG

pipeline {
    agent any

    options {
        skipStagesAfterUnstable()
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10', daysToKeepStr: '5'))

        timeout(time: 1, unit: 'HOURS')
        disableConcurrentBuilds()
        parallelsAlwaysFailFast()
    }

    environment {
        PROJECT="hojadevida"
        NPM_PRIVATE_TOKEN=credentials('npm_private_token')
    }

    stages {

        stage('Setup') {
            environment {
                NPM_CONFIG_LOGLEVEL='warn'
            }
            steps{
                script {
                    populateGlobalVariables()
                }
                sh 'yarn install'
            }
        }

        stage('Test') {
            when { anyOf { branch 'predev'; branch 'develop'; branch 'preprod' } }
            parallel {
                // run Sonar Scan and Integration tests in parallel.
                stage('Unit test') {
                    environment {
                        CHROME_BIN='/usr/bin/chromium-browser'
                    }
                    steps {
                        echo "test"
                        //sh 'ng test --progress=false --single-run --watch false'
                    }
                }

                stage('lint') {
                    steps{
                        echo "lint"
                       // sh 'yarn run lint:fix'
                    }
                }
            }
        }

        stage('Build') {
            when { anyOf {  branch 'predev'; branch 'develop'; branch 'preprod' } }
            steps{
                echo 'INFO: Building...'
                sh " yarn build:${CONF_ENV} --baseHref=/${REF}/ --deployUrl=/${REF}/"
            }
        }

        stage('Build for Prod') {
            when {
                branch 'production'
            }
            steps{
                echo 'INFO: Building for Production'
                sh " yarn build:${CONF_ENV} --baseHref=/${PROJECT}/ --deployUrl=/${PROJECT}/"
            }
        }

        stage ('Package'){
            steps {
                 echo "INFO: -=- Packing in tar.gz -=-"
                 sh 'tar -czf dist-${PROJECT}.tgz --strip-components=1 dist/'
            }
        }

        stage('Deploy') {
            when { anyOf {  branch 'predev'; branch 'develop'; branch 'preprod' } }
            environment {
                FRONTEND_URL = credentials("${IP}")
				SSH_CREDS = credentials("${SSH_CREDENTIALS}")
                tmp = sh(returnStdout: true,
                    script: "echo 'rm -rf /opt/public-html/${REF}/* && tar -xzf dist-${PROJECT}.tgz --strip-components=2 -C /opt/public-html/${REF}/ && rm dist-${PROJECT}.tgz' ")
            }
            steps{
                echo "INFO: -=- Deploy -=-"
                sh (' scp -B -i ${SSH_CREDS}  ./dist-${PROJECT}.tgz ${SSH_CREDS_USR}@${FRONTEND_URL}:~/ ')
                sh (' ssh -T -i $SSH_CREDS  -l $SSH_CREDS_USR $FRONTEND_URL \' \'${tmp}\' \' ')
            }
        }

        stage('Deploy for Prod ') {
            when {
                branch 'production'
            }
            environment {
                FRONTEND_URL = credentials("${IP}")
				SSH_CREDS = credentials("${SSH_CREDENTIALS}")
                tmp = sh(returnStdout: true,
                    script: "echo 'rm -rf /opt/public-html/${REF}/* && tar -xzf dist-${PROJECT}.tgz --strip-components=2 -C /opt/public-html/${PROJECT}/ && rm dist-${PROJECT}.tgz' ")
            }
            steps{
                echo "INFO: -=- Deploy Prod -=-"
                sh (' scp -B -i ${SSH_CREDS}  ./dist-${PROJECT}.tgz ${SSH_CREDS_USR}@${FRONTEND_URL}:~/ ')
                sh (' ssh -T -i $SSH_CREDS  -l $SSH_CREDS_USR $FRONTEND_URL \' \'${tmp}\' \' ')
            }
        }

        // code placeholder WIP FOR K8S
        // stage('Buidl & Push Image') { //Docker Pipeline Plugin
        //     /* Finally, we'll push the image with two tags:
        //     * First, the incremental build number from Jenkins
        //     * Second, the 'latest' tag. */
        //     when {
        //         branch 'qa-tested'
        //         tag "release-*"
        //     }
        //     steps {
        //         script{
        //             withCredentials([
        //                 usernamePassword(
        //                     credentialsId: 'gitlab-registry-credentials',
        //                     usernameVariable: 'USERNAME',
        //                     passwordVariable: 'PASSWORD'
        //                 )
        //             ]) {
        //                 sh """
        //                     docker login --username ${USERNAME} --password ${PASSWORD}   https://registry.gitlab.uis.edu.co
        //                     TAG="${REPO_NS}/${env.GIT_BRANCH}:${env.BUILD_NUMBER}"
        //                     docker build --tag ${TAG} --file ./Dockerfile.ci  .
        //                     docker push ${TAG}
        //                 """
        //             }
        //         }
        //     }
        // }

    }

   post {
        failure { // notify users when the Pipeline fails
            echo "ERROR!! SOMETHING WAS WRONG"
            script {
                try {
                    send_mail("FAILURE")
                    notify_slack("FAILURE")
                } catch (Exception e) {
                    echo 'Exception occurred: ' + e.toString()
                    sh 'Handle the exception!'
                }
            }
        }

        unstable { // If this build didn't fail, but there were failing tests, send an email to the list.
            echo "WARNING!! SOMETHING WAS UNSTABLE"
            script {
                try {
                    send_mail("UNSTABLE")
                    notify_slack("UNSTABLE")
                } catch (Exception e) {
                    echo 'Exception occurred: ' + e.toString()
                    sh 'Handle the exception!'
                }
            }
        }

        success { // Send an email, if the last build was not successful and this one is.
            echo "INFO: THE DEPLOY WAS SUCCESS"
            script {
                try {
                    send_mail("SUCCESS")
                    notify_slack("SUCCESS")
                } catch (Exception e) {
                    echo 'Exception occurred: ' + e.toString()
                    sh 'Handle the exception!'
                }
            }
        }

        cleanup {
            echo "Cleaned Up Workspacet"
            cleanWs()
            dir("${env.WORKSPACE}@tmp") {
                deleteDir() }
            dir("${env.WORKSPACE}@script") {
                deleteDir() }
            dir("${env.WORKSPACE}@script@tmp") {
                deleteDir() }
        }
   }
}


def send_mail(status) {
    emailext (
        subject: "[ CI/CD: " + status  + " ] Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
        recipientProviders: [
            [$class: "DevelopersRecipientProvider"],
            [$class: "RequesterRecipientProvider"],
            [$class: "CulpritsRecipientProvider"]
        ],
        attachLog: true,
        compressLog: true,
        mimeType: 'text/html',
        body: """

        Dear Developer,
        <br>
        <p> I am writing in reference to a Jenkins Job deployed  at '[${COMMIT_DATE}]'<p>
        <br>
        JOB DETAILS --> <br>
         -- Status: """ + status + """  <br>
         -- Job Name:  ${env.JOB_NAME}  <br>
         -- Build  #${env.BUILD_NUMBER}
        <br>
        <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>

        Build log is attached.
        """
    )
}

def get_deploy_info(branchName) {
    IP="$branchName-front.uis.edu.co";
    SSH_CREDENTIALS="$branchName-ssh-credentials";
    CONF_ENV="$branchName";
    REF="${CONF_ENV}/${PROJECT}";
}

def getGitAuthor() {
    def commit = sh(returnStdout: true, script: 'git rev-parse HEAD')
    AUTHOR = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' ${commit}").trim()
}

def getLastCommitMessage() {
    LAST_COMMIT = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
}

def getCommitDate() {
    COMMIT_DATE =  sh(returnStdout: true, script: "git log -1 --format=%cd --date=local")
}

def getCurrentTag(){
    // Get tag on current branch
    TAG = sh(returnStdout: true, script: 'git tag --points-at HEAD')
}

def populateGlobalVariables() {
    get_deploy_info("${env.GIT_BRANCH}")
    getLastCommitMessage()
    getCommitDate()
    getGitAuthor()
}

def notify_slack(status) {
    def color_slack
    switch(status) {
        case "SUCCESS":
            color_slack = "good"
            break
        case "UNSTABLE":
            color_slack = "warning"
            break
        case "FAILURE":
            color_slack = "danger"
            break
        default:
            color_slack = "#439FE0"
            break
    }
    withCredentials([string(credentialsId: 'slack_token_jenkins', variable: 'TOKEN')]) {
        def payload  = JsonOutput.toJson([
            text: "Hi team",
            title: "'jobname', build #'buidnum'",
            channel: "#jenkins",
            username: "Jenkins",
            blocks: [
                [
                    "type": "section",
                    "text": [
                        "type": "mrkdwn",
                        "text": "*Hi teamwork* :wave:\n _A new Job was deployed_\n _Job details:_"
                    ],
                    "accessory": [
                        "type": "image",
                        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/approvalsNewDevice.png",
                        "alt_text": "computer thumbnail"
                    ]
                ],
                ["type": "divider"]
            ],
            attachments: [[
                color: color_slack,
                author_name: "approved by " + AUTHOR,
                author_link: "http://flickr.com/bobby/",
                author_icon: "https://cdn.iconscout.com/icon/premium/png-128-thumb/author-3201820-2663166.png",
                fields: [
                    [
                        title: "Job:",
                        value:  " - Name: " + "${env.JOB_NAME}" +
                                " \n - Status: " + status +
                                " \n - Build #" + "${env.BUILD_NUMBER}",
                        short: false
                    ],
                    [
                        title: "Branch",
                        value: " - ${env.GIT_BRANCH}",
                        short: true
                    ],
                    [
                        title: "Check",
                        value: "<${env.BUILD_URL}|Console Output>",
                        short: true
                    ],
                    [
                        title:  "Last Commit",
                        value:  " - ${LAST_COMMIT}" +
                                " \n - Date: " + "${COMMIT_DATE}",
                        short: false
                    ]
                ],
                footer: "Slack API - UIS RSI Development Group",
                footer_icon: "https://platform.slack-edge.com/img/default_application_icon.png",
                ts: 123456789
            ]]
        ])

        sh 'curl -X POST --data-urlencode payload=\'' + payload + '\' https://hooks.slack.com/services/$TOKEN '
    }
}
