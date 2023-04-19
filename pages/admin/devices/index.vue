<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <!-- <h1>Admin Page Welcome {{ $auth.user.email }}</h1>
        <button @click="faceData">Check</button> -->
    </div>
</template>

<script>
export default {
    name: 'DeviceListPage',
    middleware: ['auth', 'auth-admin'],
    data() {
        return {
            title: 'Device List',
            items: [{
                text: 'Dashobard',
                href: '/admin/dashboard/sales',
            },
            {
                text: 'Device List',
                active: true,
            },
            ],
        }
    },
    head: {
        titleTemplate: '%s Device List',
    },
    created() {
        // this.$axios.get('all-users').then((response) => {
        //     console.log(response)
        // }).catch((error) => {
        //     console.log(error)
        // })
    },
    methods: {
        // async faceData() {
        //     await this.$axios.get('all-users').then((response) => {
        //         console.log(response)
        //     }).catch((error) => {
        //         console.log(error)
        //     })
        // }
    }
}
</script>