import { getPosts } from "@/services/posts";

export const postsQuery = {
    all: () => ({
        queryKey: ["posts"],
        queryFn: getPosts,
    }),
};