import mongoose from 'mongoose';

/**
 * Creates or gets a Mongoose model dynamically based on a schema definition.
 * @param {string} collectionName - The name of the collection.
 * @param {Array} fields - Array of field definitions {fieldName, fieldType, required, defaultValue, options}.
 * @returns {mongoose.Model}
 */
export const getDynamicModel = (collectionName, fields) => {
    // Check if model already exists to avoid OverwriteModelError
    if (mongoose.models[collectionName]) {
        return mongoose.models[collectionName];
    }

    const schemaDefinition = {};

    fields.forEach((field) => {
        let type;
        switch (field.fieldType) {
            case 'number':
                type = Number;
                break;
            case 'email':
                type = String;
                break;
            case 'date':
                type = Date;
                break;
            case 'boolean':
                type = Boolean;
                break;
            case 'select':
                type = String; // Options are handled in validation
                break;
            default:
                type = String;
        }

        const fieldConfig = {
            type,
            required: field.required || false,
        };

        // Add default value if provided
        if (field.defaultValue !== undefined && field.defaultValue !== '') {
            if (field.fieldType === 'number') {
                fieldConfig.default = Number(field.defaultValue);
            } else if (field.fieldType === 'boolean') {
                fieldConfig.default = field.defaultValue === 'true' || field.defaultValue === true;
            } else {
                fieldConfig.default = field.defaultValue;
            }
        }

        // Add enum validation for select fields
        if (field.fieldType === 'select' && field.options && field.options.length > 0) {
            fieldConfig.enum = field.options;
        }

        schemaDefinition[field.fieldName] = fieldConfig;
    });

    const schema = new mongoose.Schema(schemaDefinition, {
        timestamps: true,
        collection: collectionName,
    });

    return mongoose.model(collectionName, schema);
};
