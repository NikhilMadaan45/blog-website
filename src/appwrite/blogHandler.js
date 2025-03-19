import config from '../config.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class BlogHandler {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    slug,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (err) {
            throw err;
        }
    }

    async updatePost(documentId, {title, content, slug, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                documentId,
                {
                    title,
                    content,
                    slug,
                    featuredImage,
                    status,
                }
            )
        } catch(err) {
            throw err;
        }
    }

    async deletePost(documentId) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                documentId
            )
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    async getPost(documentId) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                documentId
            )
        } catch(err) {
            throw err;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                queries,
            )
        } catch(err) {
            throw err;
        }
    }

    // File upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file,
            );
        } catch(err) {
            throw err;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appWriteBucketId,
                fileId
            )
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                config.appWriteBucketId,
                fileId
            )
        } catch(err) {
            throw err;
        }
    }

}

const blogHandler = new BlogHandler();
export default blogHandler;