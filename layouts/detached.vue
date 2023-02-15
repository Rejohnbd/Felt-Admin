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
    <div id="wrapper" v-else-if="$auth.user.user_role.slug == 'employee'">
        <EmployeeSidebar 
            :type="layout.leftSidebarType" 
            :width="layout.layoutWidth" 
            :size="layout.leftSidebarSize"
            :menu="layout.menuPosition" 
            :topbar="layout.topbar" 
        />
        <div class="content-page">
            <div class="content">
                <EmployeeTopbar />
                <div class="container-fluid">
                    <Nuxt />
                </div>
            </div>
            <EmployeeFooter />
        </div>
        <EmployeeRightbar />
    </div>
    <div id="wrapper" v-else-if="$auth.user.user_role.slug == 'customer'">
        <CustomerSidebar 
            :type="layout.leftSidebarType" 
            :width="layout.layoutWidth" 
            :size="layout.leftSidebarSize"
            :menu="layout.menuPosition" 
            :topbar="layout.topbar" 
        />
        <div class="content-page">
            <div class="content">
                <CustomerTopbar />
                <div class="container-fluid">
                    <Nuxt />
                </div>
            </div>
            <CustomerFooter />
        </div>
        <CustomerRightbar />
    </div>
    <div id="wrapper" v-else-if="$auth.user.user_role.slug == 'driver'">
        <DriverSidebar 
            :type="layout.leftSidebarType" 
            :width="layout.layoutWidth" 
            :size="layout.leftSidebarSize"
            :menu="layout.menuPosition" 
            :topbar="layout.topbar" 
        />
        <div class="content-page">
            <div class="content">
                <DriverTopbar />
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
    import AdminSidebar from "~/components/admin/LayoutPartials/AdminSidebar";
    import AdminTopbar from "~/components/admin/LayoutPartials/AdminTopbar";
    import AdminFooter from "~/components/admin/LayoutPartials/AdminFooter";
    import AdminRightbar from "~/components/admin/LayoutPartials/AdminRightbar";

    import EmployeeSidebar from "@/components/employee/EmployeeSidebar";
    import EmployeeTopbar from "@/components/employee/EmployeeTopbar";
    import EmployeeFooter from "@/components/employee/EmployeeFooter";
    import EmployeeRightbar from "@/components/employee/EmployeeRightbar";

    import CustomerSidebar from "@/components/customer/CustomerSidebar";
    import CustomerTopbar from "@/components/customer/CustomerTopbar";
    import CustomerFooter from "@/components/customer/CustomerFooter";
    import CustomerRightbar from "@/components/customer/CustomerRightbar";

    import DriverSidebar from "@/components/driver/DriverSidebar";
    import DriverTopbar from "@/components/driver/DriverTopbar";
    import DriverFooter from "@/components/driver/DriverFooter";
    import DriverRightbar from "@/components/driver/DriverRightbar";

    export default {
        name: "detached",
        comments: {
            AdminSidebar,
            AdminTopbar,
            AdminFooter,
            AdminRightbar,
            EmployeeSidebar,
            EmployeeTopbar,
            EmployeeFooter,
            EmployeeRightbar,
            CustomerSidebar,
            CustomerTopbar,
            CustomerFooter,
            CustomerRightbar,
            DriverSidebar,
            DriverTopbar,
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
            document.body.setAttribute("data-layout-mode", "detached");
            document.body.setAttribute("data-sidebar-showuser", "true");
        },
    };
</script>
