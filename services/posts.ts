import { Post } from "@/generated/prisma/client";
import { api } from "@/lib/api";

export function getPosts() {
    return api<Post[]>("/posts");
}

export function getPost(id: string) {
    return api<Post>(`/posts/${id}`);
}

export function createPost(data: any) {
    // export function createPost(data: CreatePostDto) {
    return api<Post>("/posts", {
        method: "POST",
        body: JSON.stringify(data),
    });
}