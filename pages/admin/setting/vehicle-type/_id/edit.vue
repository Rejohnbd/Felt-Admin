<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title">Edit Vehilce Type</h4>
                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <VehicleTypeCreateEditForm
                                        v-on:mounted="initEdit"
                                        ref="editVehicleTypeForm"
                                        v-on:form-submitted="update"
                                        operation="edit"
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
    name: 'EditVehicleTypePage',
    middleware: ['auth', 'auth-admin'],
    components: {
        VehicleTypeCreateEditForm
    },
    data() {
        return {
            title: 'Vehicle Type Edit',
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
                    text: 'Vehicle Type Edit',
                    active: true,
                },
            ],
        }
    },
    head: {
        titleTemplate: '%s Vehicle Type Edit',
    },
    methods: {
        initEdit() {
            this.$refs.editVehicleTypeForm.getVehicleTypeById();
        },
        async update(data) {
            try {
                await this.$axios.post(`admin/vehicle-types/${data.id}`, data.data)
                    .then((response) => {
                        if (response.status == 201) {
                            this.$swal("Success!", response.data.message, "success");
                            this.$router.push({
                                path: "/admin/setting/vehicle-type",
                            });
                        }
                    }).catch((error) => {
                        if (error.response.status == 404) {
                            this.$toast.error(error.response.data.message);
                        }

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