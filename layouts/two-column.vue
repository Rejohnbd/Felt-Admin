<template>
    <div id="wrapper" v-if="$auth.user.user_role.slug == 'admin'">
        <AdminTopbar />
        <AdminTwoSidebar />
        <div class="content-page">
            <div class="content">
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
    import { mapState } from "vuex";
    import AdminTopbar from "@/components/admin/AdminTopbar";
    import AdminTwoSidebar from "~/components/admin/AdminTwoSidebar";
    import AdminFooter from "@/components/admin/AdminFooter";
    import AdminRightbar from "@/components/admin/AdminRightbar";

    export default {
        name: "Two-column",
        components: {
            AdminTopbar,
            AdminTwoSidebar,
            AdminFooter,
            AdminRightbar
        },
        data() {
            return {
                isMenuCondensed: false,
            };
        },
        computed: mapState(["layout"]),
        methods: {
            toggleRightSidebar() {
                document.body.classList.toggle("right-bar-enabled");
            },
            hideRightSidebar() {
                document.body.classList.remove("right-bar-enabled");
            },
            toggleMenu() {
                this.isMenuCondensed = !this.isMenuCondensed;
                if (this.isMenuCondensed)
                    document.body.setAttribute("data-sidebar-size", "condensed");
                else document.body.removeAttribute("data-sidebar-size", "condensed");

                if (window.screen.width >= 992) {
                    this.$router.afterEach((routeTo, routeFrom) => {
                        document.body.classList.remove("sidebar-enable");
                    });
                } else {
                    document.body.setAttribute("data-sidebar-size", "default");
                    document.body.classList.toggle("sidebar-enable");
                    this.$router.afterEach((routeTo, routeFrom) => {
                        document.body.classList.remove("sidebar-enable");
                    });
                }
            },
        },
        mounted() {
            document.body.setAttribute("data-layout-mode", "two-column");
            document.body.setAttribute("data-topbar-color", "light");
            document.body.removeAttribute("data-sidebar-showuser");
        },
    };
</script>