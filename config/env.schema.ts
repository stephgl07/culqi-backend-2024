import * as Joi from 'joi';

export const envSchema = Joi.object({
    // # Environment
    NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),

    // # Application execution port
    PORT: Joi.number().integer().min(0).max(65535).required(),

    // # MongoDB
    // DB_HOST: Joi.string().required(),
    // DB_USER: Joi.string().required(),
    // DB_PASSWORD: Joi.string().required(),
    // DB_NAME: Joi.string().required(),
    // DB_AUTH_SOURCE: Joi.string().required(),
    // DB_REPLICA_SET: Joi.string().required(),
    // DB_READ_PREFERENCE: Joi.string().required(),
    // DB_SSL: Joi.boolean().required(),

    // # JWT
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION_TIME: Joi.string().required(),

    // # Redis
    REDIS_HOST: Joi.string().required(),
    REDIS_PASSWORD: Joi.string().required(),
    REDIS_PORT: Joi.number().integer().min(0).max(65535).required(),
    REDIS_DEFAULT_TTL: Joi.number().integer().min(0).required(),

});

// require('dotenv').config();

// const { error, value } = envSchema.validate(process.env);
// if (error) {
//     throw new Error(`Invalid environment variables: ${error.message}`);
// }
// const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = value;