<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link class="btn btn-primary my-2" to="/create">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <uploader action="/upload" :beforeUpload="beforeUpload" @file-uploaded="onFileUploaded">
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="200" />
      </template>
    </uploader>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ImageProps, ResponseType } from '../store/index'
import Uploader from '../components/Uploader.vue'
import createMessage from '../components/createMessage'

export default defineComponent({
    name: 'Home',
    components: {
        ColumnList,
        Uploader
    },
    setup() {
        const store = useStore<GlobalDataProps>()
        onMounted(() => {
            store.dispatch('fetchColumns')
        })
        const list = computed(() => store.state.columns)
        const beforeUpload = (file: File) => {
            const isJPG = file.type === 'image/jpeg'
            if (!isJPG) {
                createMessage('上传图片只能是 JPG 格式!', 'error')
            }
            return isJPG
        }
        const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
            createMessage(`上传图片ID ${rawData.data._id}`, 'success')
        }
        return {
            list,
            beforeUpload,
            onFileUploaded
        }
    }
})
</script>

<style>
</style>
