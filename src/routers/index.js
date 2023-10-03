import {
    createWebHistory,
    createRouter,
} from 'vue-router';

import ContactBook from '@/views/ContactBook';

const routes =[
    {
        path: '/',
        name: 'contactbook',
        component: ContactBook,
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/views/NotFound.vue'),
    },

    {
        path: 'contact/:id',
        name: 'contact.edit',
        component: () => import('/Users/phann/Documents/GitHub/B2012252_PhanNgocSon_FRONTEND3-4/contactbook-frontend/src/views/contactEdit.vue'),
        props: true
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;