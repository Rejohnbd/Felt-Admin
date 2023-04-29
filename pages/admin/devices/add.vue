<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title">Add Device</h4>
                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <DeviceCreateEditForm
                                        v-on:mounted="initCreate"
                                        ref="addDeviceForm"
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
import DeviceCreateEditForm from '@/components/admin/devices/DeviceCreateEditForm.vue';

export default {
    name: 'AddDevicePage',
    middleware: ['auth', 'auth-admin'],
    components: {
        DeviceCreateEditForm
    },
    data() {
        return {
            title: 'Device Add',
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
                    text: 'Device Add',
                    active: true,
                },
            ],
        }
    },
    head: {
        titleTemplate: '%s Device Add',
    },
    methods: {
        initCreate() {
            this.$refs.addDeviceForm.getAllDeviceType();
        },
        async create(data) {
            let postData = {
                device_imei: data.device_imei,
                device_type_id: data.device_type.id,
                device_sim: data.device_sim,
                device_sim_type: data.device_sim_type,
                device_health_status: data.device_health_status
            }
            try {
                await this.$axios.post('admin/devices', postData)
                    .then((response) => {
                        if(response.status == 201) {
                            this.$swal("Success!", response.data.message, "success");
                            this.$router.push({
                                path: "/admin/devices"
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