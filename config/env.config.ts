export const configLoader = () => {
    return {
        port: process.env.PORT,
        nodeEnv: process.env.NODE_ENV,
        jwt: {
            secret: process.env.JWT_SECRET,
            expirationTime: process.env.JWT_EXPIRATION_TIME
        },
        // mongoDb: {
        //     host: process.env.DB_HOST,
        //     username: process.env.DB_USER,
        //     password: process.env.DB_PASSWORD,
        //     database: process.env.DB_NAME,
        //     authSource: process.env.DB_AUTH_SOURCE,
        //     replicaSet: process.env.DB_REPLICA_SET,
        //     readPreference: process.env.DB_READ_PREFERENCE,
        //     ssl: process.env.DB_SSL,
        // },
        redis: {
            host: process.env.REDIS_HOST,
            password: process.env.REDIS_PASSWORD,
            port: process.env.REDIS_PORT,
            ttl: process.env.REDIS_DEFAULT_TTL
        }
    };
}