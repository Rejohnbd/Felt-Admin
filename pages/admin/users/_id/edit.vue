<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title">Edit User</h4>
                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <UserEditForm
                                        v-on:mounted="initEdit"
                                        ref="editUserForm"
                                        v-on:form-submitted="update"
                                        operation="edit"
                                        :submitLoading="submitLoading"
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
import UserEditForm from '@/components/admin/users/UserEditForm.vue';

export default {
    name: 'EditUserPage',
    middleware: ['auth', 'auth-admin'],
    components: {
        UserEditForm
    },
    data() {
        return {
            title: 'User Edit',
            items: [
                {
                    text: 'Dashobard',
                    href: '#',
                },
                {
                    text: 'Users',
                    href: '#'
                },
                {
                    text: 'User Edit',
                    active: true,
                },
            ],
            submitLoading: false
        }
    },
    head: {
        titleTemplate: '%s User Edit',
    },
    methods: {
        initEdit() {
            this.$refs.editUserForm.getUserRoles();
            this.$refs.editUserForm.getCustomerUsers();
            this.$refs.editUserForm.getcustomerById();
        },
        async update(data) {
            this.submitLoading = true;
            try {
                await this.$axios.post('admin/users-update', data)
                    .then((response) => {
                        if(response.status == 201) {
                            console.log(response.data);
                            this.$swal("Success!", response.data.message, "success");
                            this.$router.push({
                                path: "/admin/users"
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
            this.submitLoading = false;
        }
    }
}
</script>