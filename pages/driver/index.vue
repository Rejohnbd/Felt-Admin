<template>
    <div>
        <DriverPageHeader :title="title" :items="items" />
        <h1>Driver Page Welcome {{ $auth.user.email }}</h1>
    </div>

</template>

<script>
export default {
    name: 'IndexPage',
    middleware: ['auth', 'auth-driver'],
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
        titleTemplate: '%s Driver Dashboard',
    },
}
</script>
