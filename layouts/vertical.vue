<template>
    <div id="wrapper" v-if="$auth.user.user_role.slug == 'admin'">
        <AdminSidebar 
            :type="layout.leftSidebarType" 
            :width="layout.layoutWidth" 
            :size="layout.leftSidebarSize"
            :menu="layout.menuPosition" 
            :topbar="layout.topbar"
        />
        <div class="content-page">
            <div class="content">
                <AdminTopbar />
                <div class="container-fluid">
                    <Nuxt />
                </div>
            </div>
            <AdminFooter />
        </div>
        <AdminRightbar />
    </div>
</template>


<script>
    import { mapState } from 'vuex';
    import AdminSidebar from "~/components/admin/AdminSidebar";
    import AdminTopbar from "@/components/admin/AdminTopbar";
    import AdminFooter from "@/components/admin/AdminFooter";
    import AdminRightbar from "@/components/admin/AdminRightbar";

    export default {
        name: 'vertical',
        comments: {
            AdminSidebar,
            AdminTopbar,
            AdminFooter,
            AdminRightbar
        },
        data() {
            return {
                isMenuCondensed: false,
            }
        },
        computed: mapState([
            'layout'
        ]),
        methods: {
            toggleRightSidebar() {
                document.body.classList.toggle("right-bar-enabled");
            },
            hideRightSidebar() {
                document.body.classList.remove("right-bar-enabled");
            },
            toggleMenu() {
                this.isMenuCondensed = !this.isMenuCondensed
                if (this.isMenuCondensed)
                    document.body.setAttribute('data-sidebar-size', 'condensed');
                else
                    document.body.removeAttribute('data-sidebar-size', 'condensed');

                if (window.screen.width >= 992) {
                    this.$router.afterEach((routeTo, routeFrom) => {
                        document.body.classList.remove("sidebar-enable");
                    });
                } else {
                    document.body.setAttribute('data-sidebar-size', 'default');
                    document.body.classList.toggle("sidebar-enable");
                    this.$router.afterEach((routeTo, routeFrom) => {
                        document.body.classList.remove("sidebar-enable");
                    });
                }
            },
        },
        mounted() {
            document.body.removeAttribute("data-layout-mode");
            document.body.removeAttribute("data-sidebar-showuser");
        },
    }
</script>