import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const document = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                { title, slug, content, featuredImage, status, userId }
            );
            return document;
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            return false;
        }
    }

    async updatePost(postId, { title, content, featuredImage, status }) {
        try {
            const document = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId,
                { title, content, featuredImage, status }
            );
            return document;
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error);
            return false;
        }
    }

    async deletePost(postId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(postId) {
        try {
            const document = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId
            );
            return document;
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const documents = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
    
            if (!documents || documents.total === 0) {
                console.warn("No documents found matching the query");
                return []; // Return an empty array instead of false
            }
    
            return documents.documents; // Return only the documents array
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error", error);
            throw error; // Re-throw the error for handling in the UI
        }
    }

    async uploadFile(file) {
        try {
            const uploadedFile = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return uploadedFile;
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=67c30de40026a09c910e`;
    }
}

const service = new Service();
export default service;