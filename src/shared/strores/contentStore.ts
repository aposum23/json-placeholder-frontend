import {defineStore} from "pinia";
import {ref} from "vue";
import {getUsers} from "@/shared/api/getUsers.ts";
import {getContent} from "@/shared/api/getContent.ts";

type ContentItem = {
    author: string,
    userId: number,
    id: number,
    title: string,
    body: string
}

type User = {
    id: number,
    name: string
}

export const useContentStore = defineStore('content-store', () => {
    const filterValue = ref<string>();
    const authors = ref<User[]>();
    const contentItems = ref<ContentItem[]>();

    const setAuthorsToPosts = (posts: ContentItem[]) => {
        const postsData = posts;
        postsData.map(post => {
            const author = authors.value?.find(user => user.id === post.userId)
            if (author) post.author = author.name;
        })
        contentItems.value = postsData;
    }

    const getData = () => {
        getUsers().then(response=> authors.value = response.data).catch(e => console.error(e))
        getContent().then(response => setAuthorsToPosts(response.data)).catch(e => console.error(e));
    }

    const setFilterValue = (value: string) => {
        filterValue.value = value
    }

    return {
        authors,
        contentItems,
        setFilterValue,
        getData
    }
})