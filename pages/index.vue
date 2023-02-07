<template>
  <div>
      <PageHeader :title="title" :items="items" />
      <h1>Welcome {{ $auth.user.name }}</h1>
  </div>

</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'auth',
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
  head() {
    return {
      title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`
    }
  },
  // middleware: 'router-auth'
}
</script>
