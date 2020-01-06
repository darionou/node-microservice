module.exports = {
    logger: {
        file: {
            level: 'info',
            filename: `./logs/app.log`,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
        },
        console: {
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
        },
    },

    winston: {
        projectId: process.env.PROJECT_ID,
        keyFilename: './src/configs/credentials.json'
    },

};