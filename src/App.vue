<template>
    <div class="container">
        <global-header :user="currentUser"></global-header>
        <!-- <column-list :list="list"></column-list> -->
        <form>
            <div class="mb-3">
                <label class="form-label">邮箱地址</label>
                <validata-input
                    v-model="emailVal"
                    :rules="emailRules"
                    placeholder="请输入邮箱地址"
                    type="text"
                ></validata-input>
            </div>
            <div class="mb-3">
                <label class="form-label">密码</label>
                <validata-input
                    v-model="passwordVal"
                    :rules="passwordRules"
                    placeholder="请输入密码"
                    type="password"
                    autocomplete="off"
                ></validata-input>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ValidataInput, { RulesProp } from './components/VaildateInput.vue'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

const currentUser: UserProps = {
    isLogin: true,
    name: 'lichong'
}
const testData: ColumnProps[] = [
    {
        id: 1,
        title: 'test1的专栏',
        description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
    },
    {
        id: 2,
        title: 'test2的专栏',
        description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
    },
    {
        id: 3,
        title: 'test3的专栏',
        description:
            '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
        // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
    },
    {
        id: 4,
        title: 'test4的专栏',
        description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
    }
]

export default defineComponent({
    name: 'App',
    components: {
        // ColumnList,
        GlobalHeader,
        ValidataInput
    },
    setup() {
        const emailVal = ref('')
        const emailRules: RulesProp = [
            {
                type: 'required',
                message: '电子邮箱地址不能为空'
            },
            {
                type: 'email',
                message: '请输入正确的电子邮箱地址'
            }
        ]
        const passwordVal = ref('')
        const passwordRules: RulesProp = [
            { type: 'required', message: '密码不能为空' },
            {
                type: 'range',
                min: { message: '你的密码至少包括六位，不能含有空格', length: 6 },
                max: { message: '你的密码不能超过二十位，不能含有空格', length: 20 }
            }
        ]
        return {
            list: testData,
            currentUser,
            emailVal,
            emailRules,
            passwordVal,
            passwordRules
        }
    }
})
</script>

<style>
</style>
