require('dotenv').config()

const dbConfig = {
    development: {
        username: process.env.DB_USERNAME_LOCAL,
        password: process.env.DB_PASSWORD_LOCAL,
        database: process.env.DB_NAME_LOCAL,
        hostname: process.env.DB_HOSTNAME_LOCAL,
        dialect: "mysql",
    },
    test: {
        username: process.env.DB_USERNAME_TEST,
        password: process.env.DB_PASSWORD_TEST,
        database: process.env.DB_NAME_TEST,
        hostname: process.env.DB_HOSTNAME_TEST,
        dialect: "mysql",
    },
    production: {
        username: process.env.DB_USERNAME_PRODUCTION,
        password: process.env.DB_PASSWORD_PRODUCTION,
        database: process.env.DB_NAME_PRODUCTION,
        hostname: process.env.DB_HOSTNAME_PRODUCTION,
        dialect: "mysql",
    },
}

module.exports = dbConfig;