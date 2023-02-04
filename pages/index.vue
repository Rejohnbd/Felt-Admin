<template>
  <PageHeader 
    :title="title" 
    :items="items" 
  />
</template>

<script>
export default {
  name: 'IndexPage',
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
