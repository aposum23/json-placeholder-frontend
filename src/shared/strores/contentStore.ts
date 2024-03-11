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
    const formedPosts = ref<ContentItem[]>();

    const setAuthorsToPosts = (posts: ContentItem[]) => {
        const postsData = posts;
        postsData.map(post => {
            const author = authors.value?.find(user => user.id === post.userId)
            if (author) post.author = author.name;
        })
        contentItems.value = postsData;
        formedPosts.value = postsData;
    }

    const getData = () => {
        getUsers().then(response=> authors.value = response.data).catch(e => console.error(e))
        getContent().then(response => setAuthorsToPosts(response.data)).catch(e => console.error(e));
    }

    const setFilterValue = (value: string) => {
        filterValue.value = value
    }

    const filterData = () => {
        if (filterValue.value) {
            contentItems.value = contentItems.value?.filter(data => data.author === filterValue.value);
        }
        else contentItems.value = formedPosts.value;
    }

    return {
        authors,
        contentItems,
        setFilterValue,
        filterData,
        getData
    }
})