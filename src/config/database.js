const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connections = {};

const createConnection = async (dbName, isReadOnly = false) => {
    const connectionType = isReadOnly ? 'READ' : 'WRITE';
    const isLocalEnv = process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development';
    const defaultLocalUri = process.env.DEFAULT_MONGO_URI;
    
    const uri = isLocalEnv 
        ? defaultLocalUri 
        : (isReadOnly 
            ? process.env.MONGO_URI_READ 
            : process.env.MONGO_URI_WRITE || process.env.MONGO_URI);

    if (!uri) {
        const error = new Error(`MongoDB ${connectionType} URI is not defined`);
        logger.error(error.message);
        throw error;
    }

    try {
        if (!connections[dbName]) {
            connections[dbName] = {};
        }

        if (!connections[dbName][connectionType]) {
            const connection = await mongoose.createConnection(`${uri}/${dbName}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            connections[dbName][connectionType] = connection;
            logger.info(`MongoDB ${connectionType} connection established for ${dbName}`);
        }

        return connections[dbName][connectionType];
    } catch (error) {
        logger.error(`MongoDB ${connectionType} connection error for ${dbName}: ${error.message}`);
        throw error;
    }
};

const getConnection = (dbName, isReadOnly = false) => {
    const connectionType = isReadOnly ? 'READ' : 'WRITE';
    return connections[dbName]?.[connectionType];
};

module.exports = {
    createConnection,
    getConnection
};