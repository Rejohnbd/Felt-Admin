<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title">Edit Device Type</h4>
                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <DeviceTypeCreateEditForm 
                                        v-on:mounted="initEdit"
                                        ref="editDeviceTypeForm"
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
import DeviceTypeCreateEditForm from '@/components/admin/setting/device-type/DeviceTypeCreateEditForm.vue';

export default {
    name: 'EditDeviceTypePage',
    middleware: ['auth', 'auth-admin'],
    components: {
        DeviceTypeCreateEditForm
    },
    data() {
        return {
            title: 'Device Type Edit',
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
                    text: 'Device Types',
                    href: '#'
                },
                {
                    text: 'Device Type Edit',
                    active: true,
                },
            ],
            
        }
    },
    head: {
        titleTemplate: '%s Device Type Edit',
    },
    methods: {
        initEdit() {
            this.$refs.editDeviceTypeForm.getDeviceTypeById();
        },
        async update(data) {
            try {
                await this.$axios.put(`admin/device-types/${data.id}`, data)
                    .then((response) => {
                        if (response.status == 201) {
                            this.$swal("Success!", response.data.message, "success");
                            this.$router.push({
                                path: "/admin/setting/device-type",
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