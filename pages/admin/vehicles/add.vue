<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title">Add Vehicle</h4>
                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <VehicleCreateEditForm
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
import VehicleCreateEditForm from '@/components/admin/vehicle/VehicleCreateEditForm.vue';

export default {
    name: 'AddVehiclePage',
    middleware: ['auth', 'auth-admin'],
    components: {
        VehicleCreateEditForm
    },
    data() {
        return {
            title: 'Vehicle Add',
            items: [
                {
                    text: 'Dashobard',
                    href: '#',
                },
                {
                    text: 'Vehicles',
                    href: '#'
                },
                {
                    text: 'Vehicle Add',
                    active: true,
                },
            ],
        }
    },
    head: {
        titleTemplate: '%s Vehicle Add',
    },
    methods: {
        async create(data) {
            try {
                await this.$axios.post('admin/vehicles', data)
                    .then((response) => {
                        if(response.status == 201) {
                            this.$swal("Success!", response.data.message, "success");
                            this.$router.push({
                                path: "/admin/vehicles"
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
        }
    }
}
</script>