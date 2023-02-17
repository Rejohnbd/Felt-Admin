<template>
    <div>
        <AdminPageHeader :title="pageHeaderTitle" :items="pageHeaderItems" />
        <div class="row">
            <div class="col-xl-3 col-md-6">
                <div class="widget-simple text-center card">
                    <div class="card-body">
                        <h3 class="text-success counter mt-0">2562</h3>
                        <p class="text-muted mb-0">Total Sales today</p>
                    </div>
                </div>
            </div>
    
            <div class="col-xl-3 col-md-6">
                <div class="widget-simple text-center card">
                    <div class="card-body">
                        <h3 class="text-primary counter mt-0">5685</h3>
                        <p class="text-muted mb-0">Daily visitors</p>
                    </div>
                </div>
            </div>
    
            <div class="col-xl-3 col-md-6">
                <div class="widget-simple text-center card">
                    <div class="card-body">
                        <h3 class="text-pink mt-0">
                            $
                            <span class="counter">12480</span>
                        </h3>
                        <p class="text-muted mb-0">Total Earning</p>
                    </div>
                </div>
            </div>
    
            <div class="col-xl-3 col-md-6">
                <div class="widget-simple text-center card">
                    <div class="card-body">
                        <h3 class="text-purple counter mt-0">62</h3>
                        <p class="text-muted mb-0">Pending Orders</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminSalesDashboardPage',
    middleware: ['auth', 'auth-admin'],
    data() {
        return {
            pageHeaderTitle: 'Sales',
            pageHeaderItems: [{
                text: 'Sales',
                active: true,
            }],
        }
    },
    head: {
        titleTemplate: '%s Admin Sales Dashboard',
    }
}
</script>
