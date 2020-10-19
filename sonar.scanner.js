const scanner = require('sonarqube-scanner')

const sonarConfig = () => {
    const config = {
        serverUrl: 'https://sonar.simplustec.com.br',
        token: 'cd9652df974b12aa81edef8cefcd9cbb5cac0267',
        options: {
            'sonar.projectName': 'Resource Data Event Logger',
            'sonar.projectDescription': 'Create logs for Simplus Resources',
            'sonar.sources': 'src',
            'sonar.tests': 'src/tests',
            'sonar.exclusions': 'src/**/*.spec.ts',
            'sonar.test.inclusions': 'src/**/*.spec.ts',
            'sonar.coverage.exclusions':
                'src/**/*.spec.ts,src/**/*.mock.ts,node_modules/*,coverage/lcov-report/*',
        },
    }

    if (process.env.BITBUCKET_PR_ID) {
        Object.assign(config.options, {
            'sonar.pullrequest.key': process.env.BITBUCKET_PR_ID,
            'sonar.pullrequest.branch': process.env.BITBUCKET_BRANCH,
            'sonar.pullrequest.base': process.env.BITBUCKET_PR_DESTINATION_BRANCH,
        })
    } else {
        Object.assign(config.options, {
            'sonar.branch.name': process.env.BITBUCKET_BRANCH,
        })
    }

    return config
}

scanner(sonarConfig(), () => process.exit())
