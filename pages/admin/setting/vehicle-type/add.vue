<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title">Add Vehilce Type</h4>
                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <VehicleTypeCreateEditForm
                                        v-on:form-submitted="create"
                                        operation="create"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VehicleTypeCreateEditForm from '@/components/admin/setting/vehicle-type/VehicleTypeCreateEditForm.vue';

export default {
    name: 'AddVehicleTypePage',
    middleware: ['auth', 'auth-admin'],
    components: {
        VehicleTypeCreateEditForm
    },
    data() {
        return {
            title: 'Vehicle Type Add',
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
                    text: 'Vehicle Types',
                    href: '#'
                },
                {
                    text: 'Vehicle Type Add',
                    active: true,
                },
            ],
        }
    },
    head: {
        titleTemplate: '%s Vehicle Type Add',
    },
    methods: {
        async create(data) {
            this.$nuxt.$loading.start();
            console.log(data, 'in parent');
            try {
                await this.$axios.post('admin/vehicle-types', data)
                    .then((response) => {
                        if(response.status == 201) {
                            this.$swal("Success!", response.data.message, "success");
                            this.$router.push({
                                path: "/admin/setting/vehicle-type",
                            });
                        }
                    }).catch((error) => {
                        if (error.response.status == 400) {
                            this.$toast.error(error.response.data.message);
                        } 
                        console.log(error.response.data);
                    });
            } catch (error) {
                this.$toast.error("Connection Error");
                console.log('Connection Error:', error);
            }
            this.$nuxt.$loading.finish();
        }
    }
}
</script>