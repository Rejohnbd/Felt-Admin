<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title">Edit Device</h4>
                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <DeviceCreateEditForm 
                                        v-on:mounted="initEdit"
                                        ref="addDeviceForm"
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
import DeviceCreateEditForm from '@/components/admin/devices/DeviceCreateEditForm.vue';

export default {
    name: 'EditDevicePage',
    middleware: ['auth', 'auth-admin'],
    components: {
        DeviceCreateEditForm
    },
    data() {
        return {
            title: 'Device Edit',
            items: [
                {
                    text: 'Dashobard',
                    href: '#',
                },
                {
                    text: 'Devices',
                    href: '#'
                },
                {
                    text: 'Device Edit',
                    active: true,
                },
            ],
            
        }
    },
    head: {
        titleTemplate: '%s Device Edit',
    },
    methods: {
        initEdit() {
            this.$refs.addDeviceForm.getDeviceById();
            this.$refs.addDeviceForm.getAllDeviceType();
        },
        async update(data) {
            let postData = {
                device_imei: data.device_imei,
                device_type_id: data.device_type.id,
                device_sim: data.device_sim,
                device_sim_type: data.device_sim_type,
                device_health_status: data.device_health_status
            }
            this.$nuxt.$loading.start();
            try {
                await this.$axios.put(`admin/devices/${data.id}`, postData)
                    .then((response) => {
                        if (response.status == 201) {
                            this.$swal("Success!", response.data.message, "success");
                            this.$router.push({
                                path: "/admin/devices",
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
            this.$nuxt.$loading.finish();
        }
    }
}
</script>