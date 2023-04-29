<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title">Edit Package</h4>
                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <PackageCreateEditForm
                                        v-on:mounted="initEdit"
                                        ref="editPackageForm"
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
import PackageCreateEditForm from '@/components/admin/setting/packages/PackageCreateEditForm.vue';

export default {
    name: 'AddPackagePage',
    middleware: ['auth', 'auth-admin'],
    components: {
        PackageCreateEditForm
    },
    data() {
        return {
            title: 'Package Edit',
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
                    text: 'Packages',
                    href: '#'
                },
                {
                    text: 'Package Edit',
                    active: true,
                },
            ],
        }
    },
    head: {
        titleTemplate: '%s Package Edit',
    },
    methods: {
        initEdit() {
            this.$refs.editPackageForm.getPakcageById();
        },
        async update(data) {
            try {
                await this.$axios.put(`admin/service-packages/${data.id}`, data)
                    .then((response) => {
                        if (response.status == 201) {
                            this.$swal("Success!", response.data.message, "success");
                            this.$router.push({
                                path: "/admin/setting/packages",
                            });
                        }
                    }).catch((error) => {
                        if (error.response.status == 400) {
                            this.$toast.error(error.response.data.message);
                        } else {
                            this.$toast.error("Some thing Happend Wrong. Try Again");
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