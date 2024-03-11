import httpCore from "@/shared/api/instance.ts";

export const getContent = () => httpCore.get('posts');