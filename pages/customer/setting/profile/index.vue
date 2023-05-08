<template>
    <div>
        <CustomerPageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg-4 col-xl-4">
                <div class="card">
                    <div class="card-body text-center">
                        <img src="~/assets/images/users/avatar-1.jpg" class="rounded-circle avatar-xl img-thumbnail" alt="profile-image" />
                        <h4 class="mt-3 mb-0">{{ this.formModel.first_name }} {{ this.formModel.last_name }}</h4>
                        <div class="text-left mt-3">
                            <h4 class="font-13 text-uppercase">About Me :</h4>
                            <div class="table-responsive">
                                <table class="table table-borderless table-sm">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Full Name :</th>
                                            <td class="text-muted">{{ this.formModel.first_name }} {{ this.formModel.last_name }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Mobile :</th>
                                            <td class="text-muted">{{ this.formModel.phone_number }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Optional Mobile :</th>
                                            <td class="text-muted">{{ this.formModel.phone_optional }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Email :</th>
                                            <td class="text-muted">{{ this.formModel.email }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Optional Email :</th>
                                            <td class="text-muted">{{ this.formModel.email_optional }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address :</th>
                                            <td class="text-muted">{{ this.formModel.address }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-8 col-xl-8">
                <div class="card">
                    <div class="card-body">
                        <b-tabs content-class="mt-1" pills class="navtab-bg">
                            <b-tab active>
                                <template v-slot:title>
                                    <i class="mdi mdi-face-profile mr-1"></i>Settings
                                </template>
                                <form>
                                    <h5 class="mb-3 text-uppercase bg-light p-2">
                                        <i class="mdi mdi-account-circle mr-1"></i> Personal Info
                                    </h5>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="firstname">First Name</label>
                                                <input id="firstname" type="text" class="form-control" placeholder="Enter first name" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="lastname">Last Name</label>
                                                <input id="lastname" type="text" class="form-control" placeholder="Enter last name" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label for="userbio">Bio</label>
                                                <textarea id="userbio" class="form-control" rows="4" placeholder="Write something..."></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="useremail">Email Address</label>
                                                <input id="useremail" type="email" class="form-control" placeholder="Enter email" />
                                                <span class="form-text text-muted">
                                                    <small>
                                                        If you want to change email please
                                                        <a href="javascript: void(0);">click</a> here.
                                                    </small>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="userpassword">Password</label>
                                                <input id="userpassword" type="password" class="form-control" placeholder="Enter password" />
                                                <span class="form-text text-muted">
                                                    <small>
                                                        If you want to change password please
                                                        <a href="javascript: void(0);">click</a> here.
                                                    </small>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <button type="submit" class="btn btn-success mt-2">
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </b-tab>
                        </b-tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CustomerProfilePage',
    middleware: ['auth', 'auth-customer'],
    data() {
        return {
            title: 'Profile',
            items: [
                {
                    text: 'Dashobard',
                    href: '/',
                },
                {
                    text: 'Setting',
                    href: '#'
                },
                {
                    text: 'Profile',
                    active: true,
                }
            ],
            formModel: {
                first_name: '',
                last_name: '',
                email: '',
                email_optional: '',
                phone_number: '',
                phone_optional: '',
                address: '',
                user_status: ''
            }
        }
    },
    head: {
        titleTemplate: '%s Customer Profile',
    },
    created() {
        this.getUserProfile();
    },
    methods: {
        async getUserProfile(){
            await this.$axios.get('customer/profile')
                .then((response) => {
                    console.log(response.data.data)
                    this.formModel = Object.assign({}, response.data.data);
                    // this.loading = true;
                    // this.servicePackages = response.data.data;
                    
                    // this.loading = false;
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
}
</script>
