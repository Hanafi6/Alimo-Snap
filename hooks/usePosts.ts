import { useQuery } from "@tanstack/react-query";
import { postsQuery } from "@/queries/posts";

export function usePosts() {
    return useQuery(postsQuery.all());
}