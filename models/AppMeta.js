import mongoose from 'mongoose';

const FieldSchema = new mongoose.Schema({
    fieldName: { type: String, required: true },
    fieldType: {
        type: String,
        required: true,
        enum: ['text', 'number', 'email', 'date', 'boolean', 'select', 'image']
    },
    required: { type: Boolean, default: false },
    defaultValue: { type: String },
    options: { type: [String], default: [] } // Only for select type
});

const FeaturesSchema = new mongoose.Schema({
    create: { type: Boolean, default: true },
    edit: { type: Boolean, default: true },
    delete: { type: Boolean, default: true },
    list: { type: Boolean, default: true }
}, { _id: false });

const AppMetaSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    collectionName: { type: String, required: true },
    projectLogo: { type: String }, // Cloudinary URL
    features: { type: FeaturesSchema, default: () => ({}) },
    viewType: { type: String, enum: ['table', 'card'], default: 'table' },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    fields: {
        type: [FieldSchema],
        required: true,
        validate: {
            validator: function (fields) {
                return fields && fields.length >= 2;
            },
            message: 'At least 2 fields are required'
        }
    },
    createdAt: { type: Date, default: Date.now }
});

// Index for faster lookups
AppMetaSchema.index({ userId: 1 });
AppMetaSchema.index({ slug: 1 });
AppMetaSchema.index({ createdAt: -1 });

export default mongoose.models.AppMeta || mongoose.model('AppMeta', AppMetaSchema);
