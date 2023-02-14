<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <h1>Admin Page Welcome {{ $auth.user.email }}</h1>
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
}
</script>
