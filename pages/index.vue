<template>
  <div>
      <!-- <PageHeader :title="title" :items="items" />
      <h1>Welcome {{ $auth.user.name }}</h1> -->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: 'IndexPage',
  middleware({app}){
    // console.log(app.$auth.user.user_role.slug)
    if (app.$auth.user.user_role.slug == 'admin'){
      app.router.push({ path: '/admin/dashboard/sales' })
    } else if (app.$auth.user.user_role.slug == 'customer') {
      app.router.push({ path: '/customer' })
    } else if (app.$auth.user.user_role.slug == 'employee') {
      app.router.push({ path: '/employee' })
    } else if (app.$auth.user.user_role.slug == 'driver') {
      app.router.push({ path: '/driver' })
    }else {
      app.router.push('/')
    }
  },
  // data() {
  //   return {
  //     title: 'Starter',
  //     items: [{
  //       text: 'Minton',
  //       href: '/',
  //     },
  //     {
  //       text: 'Pages',
  //       href: '/',
  //     },
  //     {
  //       text: 'Starter',
  //       active: true,
  //     },
  //     ],
  //   }
  // },
  // head() {
  //   return {
  //     title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`
  //   }
  // },
  // computed: {
  //   ...mapGetters(['authUser'])
  // },
  // created(){
  //   console.log(this.authUser)
  // }
}
</script>
