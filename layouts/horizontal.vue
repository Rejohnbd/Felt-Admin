<template>
    <div id="wrapper">
        <Topbar />
        <HorizontalNavbar 
            :type="layout.topbar" 
            :width="layout.layoutWidth" 
            :menu="layout.menuPosition" 
        />
        <div class="content-page">
            <div class="content">
                <div class="container-fluid">
                    <Nuxt />
                </div>
            </div>
            <Footer />
        </div>
        <Rightbar />
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'horizontal',
        data() {
            return {}
        },
        computed: mapState([
            'layout'
        ]),
        mounted() {
            document.body.setAttribute("data-layout-mode", "horizontal");
        },
        methods: {
            toggleRightSidebar() {
                document.body.classList.toggle("right-bar-enabled");
            },
            hideRightSidebar() {
                document.body.classList.remove("right-bar-enabled");
            }
        },
    }
</script>