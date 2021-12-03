<template>
    <div class="post-list">
        <article v-for="post in list" :key="post._id" class="card mb-3 shadow-sm">
            <div class="card-body">
                <h4>{{ post.title }}</h4>
                <div class="row my-3 align-items-center">
                    <div v-if="post.image" class="col-3">
                        <img :src="post.image && post.image.url" :alt="post.title" class="rounded-lg w-100" />
                    </div>
                    <p :class="{ 'col-9': post.image }">{{ post.excerpt }}</p>
                </div>
                <span class="text-muted">{{ post.createdAt }}</span>
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { PostProps } from '../store/index'

export default defineComponent({
    props: {
        list: {
            required: true,
            type: Array as PropType<PostProps[]>
        }
    },
    setup(props) {
const columnList = computed(() => {
            return props.list.map((post) => {
                if (!post.image) {
                    post.image = {
                        url: require('@/assets/column.jpg')
                    }
                } else {
                    post.image.url = post.image.url + '?x-oss-process=image/resize,m_pad,h_100,w100'
                }
                return post
            })
        })
        return {
            columnList
        }
    }
})
</script>

<style scoped>
    .card-body img{
        height: 111.45px;
    }
</style>
