<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <h1>Admin Page Welcome {{ $auth.user.email }}</h1>
        <button @click="faceData">Check</button>
    </div>
</template>

<script>
export default {
    name: 'IndexPage',
    middleware: ['auth', 'auth-admin'],
    data() {
        return {
            title: 'Starter',
            items: [{
                text: 'Minton',
                href: '/',
            },
            {
                text: 'Pages',
                href: '/',
            },
            {
                text: 'Starter',
                active: true,
            },
            ],
        }
    },
    head: {
        titleTemplate: '%s Admin Dashboard',
    },
    created(){
        this.$axios.get('all-users').then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    },
    methods: {
        async faceData (){
            await this.$axios.get('all-users').then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>
