import { createRouter, createWebHistory } from 'vue-router'

import Home from '../cellaring/presentation/views/home.vue'
import NewStorageItem from '../cellaring/presentation/views/new-storage-item.vue'
import PageNotFound from '../shared/presentation/views/page-not-found.vue'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/storage',
        children: [
            {
                path: 'items/new',
                component: NewStorageItem
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component: PageNotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
