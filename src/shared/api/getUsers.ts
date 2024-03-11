import httpCore from "@/shared/api/instance.ts";

export const getUsers = () => httpCore.get('users');