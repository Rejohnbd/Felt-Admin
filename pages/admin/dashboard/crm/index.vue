<template>
    <div>
        <AdminPageHeader :title="pageHeaderTitle" :items="pageHeaderItems" />
        <div class="row">
            <div class="col-xl-3 col-md-6">
                <div class="widget-simple text-center card">
                    <div class="card-body">
                        <h3 class="text-success counter mt-0">0000</h3>
                        <p class="text-muted mb-0">Total Sales today</p>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6">
                <div class="widget-simple text-center card">
                    <div class="card-body">
                        <h3 class="text-primary counter mt-0">0000</h3>
                        <p class="text-muted mb-0">Daily visitors</p>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6">
                <div class="widget-simple text-center card">
                    <div class="card-body">
                        <h3 class="text-pink mt-0">
                            $
                            <span class="counter">0000</span>
                        </h3>
                        <p class="text-muted mb-0">Total Earning</p>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6">
                <div class="widget-simple text-center card">
                    <div class="card-body">
                        <h3 class="text-purple counter mt-0">0000</h3>
                        <p class="text-muted mb-0">Pending Orders</p>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script>
export default {
    name: 'AdminCrmDashboardPage',
    middleware: ['auth', 'auth-admin'],
    data() {
        return {
            pageHeaderTitle: 'CRM',
            pageHeaderItems: [{
                text: 'CRM',
                active: true,
            }],
        }
    },
    head: {
        titleTemplate: '%s Admin Crm Dashboard',
    }
}
</script>
