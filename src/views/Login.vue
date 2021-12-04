<template>
    <div class="login-page">
        <validate-form @form-submit="onFormSubmit">
            <div class="mb-3">
                <label class="form-label">邮箱地址</label>
                <validate-input v-model="emailVal" :rules="emailRules" placeholder="请输入邮箱地址" type="text"></validate-input>
            </div>
            <div class="mb-3">
                <label class="form-label">密码</label>
                <validate-input v-model="passwordVal" :rules="passwordRules" placeholder="请输入密码" type="password" autocomplete="off"></validate-input>
            </div>
            <template #submit>
                <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
            </template>
        </validate-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import createMessage from '../components/createMessage'

export default defineComponent({
    name: 'App',
    components: {
        ValidateInput,
        ValidateForm
    },
    setup() {
        const store = useStore()
        const router = useRouter()
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
            {
                type: 'required',
                message: '密码不能为空'
            },
            {
                type: 'range',
                min: {
                    message: '你的密码至少包括六位，不能含有空格',
                    length: 6
                },
                max: {
                    message: '你的密码不能超过二十位，不能含有空格',
                    length: 20
                }
            }
        ]
        const onFormSubmit = (result: boolean) => {
            if (result) {
                const payload = {
                    email: emailVal.value,
                    password: passwordVal.value
                }
                store
                    .dispatch('loginAndFetch', payload)
                    .then(() => {
                        createMessage('登录成功 2秒后跳转首页', 'success')
                        setTimeout(() => {
                            router.push('/')
                        }, 2000)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        }
        return {
            emailVal,
            emailRules,
            passwordVal,
            passwordRules,
            onFormSubmit
        }
    }
})
</script>

<style></style>
