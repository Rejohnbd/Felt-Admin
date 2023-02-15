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
    <div id="wrapper" v-else-if="$auth.user.user_role.slug == 'employee'">
        <EmployeeTopbar />
        <EmployeeTwoSidebar />
        <div class="content-page">
            <div class="content">
                <div class="container-fluid">
                    <Nuxt />
                </div>
            </div>
            <EmployeeFooter />
        </div>
        <EmployeeRightbar />
    </div>
    <div id="wrapper" v-else-if="$auth.user.user_role.slug == 'customer'">
        <CustomerTopbar />
        <CustomerTwoSidebar />
        <div class="content-page">
            <div class="content">
                <div class="container-fluid">
                    <Nuxt />
                </div>
            </div>
            <CustomerFooter />
        </div>
        <CustomerRightbar />
    </div>
    <div id="wrapper" v-else-if="$auth.user.user_role.slug == 'driver'">
        <DriverTopbar />
        <DriverTwoSidebar />
        <div class="content-page">
            <div class="content">
                <div class="container-fluid">
                    <Nuxt />
                </div>
            </div>
            <DriverFooter />
        </div>
        <DriverRightbar />
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import AdminTopbar from "~/components/admin/LayoutPartials/AdminTopbar";
    import AdminTwoSidebar from "~/components/admin/LayoutPartials/AdminTwoSidebar";
    import AdminFooter from "~/components/admin/LayoutPartials/AdminFooter";
    import AdminRightbar from "~/components/admin/LayoutPartials/AdminRightbar";

    import EmployeeTopbar from "~/components/employee/LayoutPartials/EmployeeTopbar";
    import EmployeeTwoSidebar from "~/components/employee/LayoutPartials/EmployeeTwoSidebar";
    import EmployeeFooter from "~/components/employee/LayoutPartials/EmployeeFooter";
    import EmployeeRightbar from "~/components/employee/LayoutPartials/EmployeeRightbar";

    import CustomerTopbar from "~/components/customer/LayoutPartials/CustomerTopbar";
    import CustomerTwoSidebar from "~/components/customer/LayoutPartials/CustomerTwoSidebar";
    import CustomerFooter from "~/components/customer/LayoutPartials/CustomerFooter";
    import CustomerRightbar from "~/components/customer/LayoutPartials/CustomerRightbar";

    import DriverTopbar from "@/components/driver/DriverTopbar";
    import DriverTwoSidebar from "@/components/driver/DriverTwoSidebar";
    import DriverFooter from "@/components/driver/DriverFooter";
    import DriverRightbar from "@/components/driver/DriverRightbar";

    export default {
        name: "Two-column",
        components: {
            AdminTopbar,
            AdminTwoSidebar,
            AdminFooter,
            AdminRightbar,
            EmployeeTopbar,
            EmployeeTwoSidebar,
            EmployeeFooter,
            EmployeeRightbar,
            CustomerTopbar,
            CustomerTwoSidebar,
            CustomerFooter,
            CustomerRightbar,
            DriverTopbar,
            DriverTwoSidebar,
            DriverFooter,
            DriverRightbar
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