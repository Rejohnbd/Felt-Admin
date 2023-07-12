<template>
    <div>
        <AdminPageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="header-title">Add User</h4>
                        <div class="row">
                            <div class="col-12">
                                <div class="p-2">
                                    <UserCreateForm
                                        v-on:mounted="initCreate"
                                        ref="addUserForm"
                                        v-on:form-submitted="create"
                                        operation="create"
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
import UserCreateForm from '@/components/admin/users/UserCreateForm.vue';

export default {
    name: 'AddUserPage',
    middleware: ['auth', 'auth-admin'],
    components: {
        UserCreateForm
    },
    data() {
        return {
            title: 'User Add',
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
                    text: 'User Add',
                    active: true,
                },
            ],
            submitLoading: false
        }
    },
    head: {
        titleTemplate: '%s User Add',
    },
    methods: {
        initCreate() {
            this.$refs.addUserForm.getUserRoles();
            this.$refs.addUserForm.getCustomerUsers();
        },
        async create(data) {
            this.submitLoading = true;
            try {
                await this.$axios.post('admin/users', data)
                    .then((response) => {
                        if(response.status == 201) {
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