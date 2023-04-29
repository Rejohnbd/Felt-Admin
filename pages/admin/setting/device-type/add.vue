<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title">Add Device Type</h4>
                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <DeviceTypeCreateEditForm
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
import DeviceTypeCreateEditForm from '@/components/admin/setting/device-type/DeviceTypeCreateEditForm.vue';

export default {
    name: 'AddDeviceTypePage',
    middleware: ['auth', 'auth-admin'],
    components: {
        DeviceTypeCreateEditForm
    },
    data() {
        return {
            title: 'Device Type Add',
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
                    text: 'Device Type Add',
                    active: true,
                },
            ],
        }
    },
    head: {
        titleTemplate: '%s Device Type Add',
    },
    methods: {
        async create(data) {
            try {
                await this.$axios.post('admin/device-types', data)
                    .then((response) => {
                        if(response.status == 201) {
                            this.$swal("Success!", response.data.message, "success");
                            this.$router.push({
                                path: "/admin/setting/device-type",
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