<template>
    <div>
        <CustomerPageHeader :title="title" :items="items" />
        <h1>Customer Page Welcome {{ $auth.user.email }}</h1>
    </div>

</template>

<script>
export default {
    name: 'IndexPage',
    middleware: ['auth', 'auth-customer'],
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
        titleTemplate: '%s Customer Dashboard',
    },
}
</script>
