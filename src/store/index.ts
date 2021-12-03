import { createStore } from 'vuex'
import axios from 'axios'

interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}
interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
}
export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}
export interface PostProps {
  id: number
  title: string
  content: string
  image?: string
  createdAt: string
  columnId: number
}
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

export default createStore<GlobalDataProps>({
  state: {
    columns: [] as ColumnProps[],
    posts: [] as PostProps[],
    user: {
      isLogin: false
    }
  },
  mutations: {
    Login(state) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: 'lc',
        columnId: 1
      }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns(state, rawData) {
      console.log('rawData', rawData)
      state.columns = rawData.data.list
    }
  },
  actions: {
    fetchColumns(context) {
      axios.get('/columns').then(resp => {
        context.commit('fetchColumns', resp.data)
      })
    }
  },
  modules: {},
  getters: {
    getColumnById: state => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: state => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  }
})
