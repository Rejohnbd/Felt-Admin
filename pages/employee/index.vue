<template>
    <div>
        <PageHeader :title="title" :items="items" />
        <h1>Empoloyee Page Welcome {{ $auth.user.email }}</h1>
    </div>

</template>

<script>
export default {
    name: 'IndexPage',
    middleware: ['auth', 'auth-employee'],
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
        titleTemplate: '%s Empoloyee Dashboard',
    },
}
</script>