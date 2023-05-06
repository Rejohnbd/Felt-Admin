<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row mb-2">
            <div class="col-12">
                <nuxt-link to="/admin/setting/packages/add" class="btn btn-primary waves-effect waves-light float-right"><i class="fe-plus mr-1"></i>Add New</nuxt-link>
            </div>
        </div>
        
        <div class="row my-3">
            <div class="col-12" v-if="loading">
                <Loading />
            </div>
            <div class="col-xl-3 col-md-6" v-for="(servicePackage, index) in servicePackages" :key="index" v-else>
                <div class="card card-pricing">
                    <div class="card-body text-center">
                        <b-dropdown class="float-right" toggle-class="card-drop p-0" variant="black" right>
                            <template v-slot:button-content>
                                <i class="mdi mdi-dots-vertical"></i>
                            </template>
                            <b-dropdown-item>
                                <nuxt-link 
                                    :to="`/admin/setting/packages/${servicePackage.id}/edit`" 
                                    v-b-tooltip.hover 
                                    :title="`Edit Package ${servicePackage.package_name}`" 
                                    style="width: 100%"
                                >
                                    Edit
                                </nuxt-link>
                            </b-dropdown-item>
                            <b-dropdown-item 
                                v-b-tooltip.hover 
                                :title="`Delete Package ${servicePackage.package_name}`" 
                                @click="deleteHandler(servicePackage.id)"
                                style="width: 100%"
                            >
                                <span class="text-danger">Delete</span>
                            </b-dropdown-item>
                        </b-dropdown>
                        <p class="card-pricing-plan-name font-weight-bold text-uppercase">{{ servicePackage.package_name }}</p>
                        <h2 class="card-pricing-price">
                            <span>{{ servicePackage.subscription_fee }} Tk./Month</span>
                        </h2>
                        <ul class="card-pricing-features">
                            <div v-for="(packageFeature, index) in servicePackage.package_features" :key="index">
                                <li v-if="packageFeature.value != null">
                                    <i class="mdi mdi-check-all"></i> {{ packageFeature.value }}
                                </li>
                            </div>
                        </ul>
                        <button class="btn mt-4 btn-block btn-primary">
                            {{ servicePackage.installation_charge }} Taka
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue';

export default {
    name: 'PackageListPage',
    middleware: ['auth', 'auth-admin'],
    components: {
        Loading
    },
    data() {
        return {
            title: 'Package List',
            items: [
                {
                    text: 'Dashobard',
                    href: '#',
                },
                {
                    text: 'Setting',
                    href: '#'
                },
                {
                    text: 'Package List',
                    active: true,
                },
            ],
            loading: false,
            servicePackages: []
        }
    },
    head: {
        titleTemplate: '%s Package List',
    },
    created() {
        this.getAllDeviceType();
    },
    methods: {
        async getAllDeviceType() {
            await this.$axios.get('admin/service-packages').then((response) => {
                this.loading = true;
                this.servicePackages = response.data.data;
                this.loading = false;
            }).catch((error) => {
                console.log(error)
            })
        },
        async deleteHandler(deleteId) {
            console.log(deleteId);
            this.$swal({
                title: 'Are you sure?',
                text: 'You can\'t revert your action',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes Delete it!',
                cancelButtonText: 'No, Keep it!',
                showCloseButton: true,
                showLoaderOnConfirm: true
            }).then((result) => {
                if (result.value) {
                    // this.$swal('Deleted', 'You successfully deleted this file', 'success');
                    this.$swal('Deleted', 'Delete feature under development', 'success')
                } else {
                    // this.$swal('Cancelled', 'Your file is still intact', 'info');
                    this.$swal('Cancelled', 'Delete feature under development', 'info')
                }
            })
        }
    }
}
</script>