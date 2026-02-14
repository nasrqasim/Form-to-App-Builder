'use client';

import { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

export default function ImageUpload({ value, onChange, label = "Upload Image" }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validation
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image (JPG, PNG, WebP)');
            return;
        }

        if (file.size > 2 * 1024 * 1024) { // 2MB limit
            alert('File is too large (max 2MB)');
            return;
        }

        setUploading(true);

        try {
            // 1. Get signature from our API
            const signRes = await fetch('/api/upload/sign');
            const signData = await signRes.json();

            if (!signRes.ok) throw new Error(signData.error || 'Failed to get upload signature');

            // 2. Upload directly to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', signData.apiKey);
            formData.append('timestamp', signData.timestamp);
            formData.append('signature', signData.signature);
            formData.append('folder', signData.folder);

            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            const uploadData = await uploadRes.json();

            if (uploadData.secure_url) {
                setPreview(uploadData.secure_url);
                onChange(uploadData.secure_url);
            } else {
                alert(`Upload failed: ${uploadData.error?.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Fast upload error:', error);
            alert(`Fast upload failed: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview('');
        onChange('');
    };

    return (
        <div className="space-y-2">
            {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}

            <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 transition-all hover:border-indigo-500 dark:hover:border-indigo-400 bg-gray-50/50 dark:bg-gray-900/50 group">
                {preview ? (
                    <div className="relative w-full h-40">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-contain rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                        {uploading ? (
                            <div className="flex flex-col items-center">
                                <Loader2 className="w-10 h-10 text-indigo-500 dark:text-indigo-400 animate-spin" />
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">Uploading to Cloudinary...</p>
                            </div>
                        ) : (
                            <>
                                <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                    <ImageIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                                </div>
                                <div className="text-center">
                                    <label className="cursor-pointer">
                                        <span className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">Click to upload</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleUpload}
                                            accept="image/*"
                                        />
                                    </label>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG, WebP up to 2MB</p>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
