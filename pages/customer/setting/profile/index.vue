<template>
    <div>
        <CustomerPageHeader :title="title" :items="items" />
        <div v-if="isLoading">
            <Loading />
        </div>
        <div class="row" v-else>
            <div class="col-lg-4 col-xl-4">
                <div class="card">
                    <div class="card-body text-center">
                        <!-- <img 
                            v-if="preview"
                            :src="preview != null ? preview : '~/assets/images/users/avatar-1.jpg' "
                            class="rounded-circle avatar-xl img-thumbnail" 
                            alt="profile-image" 
                        /> -->
                        <img 
                            v-if="editImagePreview"
                            :src="editImage == 'default.png' ? '~/assets/images/users/avatar-1.jpg' : $config.BaseUrl + editImage"
                            class="rounded-circle avatar-xl img-thumbnail" 
                            alt="profile-image" 
                        />
                        <h4 class="mt-3 mb-0">{{ this.userData.first_name }} {{ this.userData.last_name }}</h4>
                        <div class="text-left mt-3">
                            <h4 class="font-13 text-uppercase">About Me :</h4>
                            <div class="table-responsive">
                                <table class="table table-borderless table-sm">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Full Name :</th>
                                            <td class="text-muted">{{ this.userData.first_name }} {{ this.userData.last_name }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Mobile :</th>
                                            <td class="text-muted">{{ this.userData.phone_number }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Optional Mobile :</th>
                                            <td class="text-muted">{{ this.userData.phone_optional }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Email :</th>
                                            <td class="text-muted">{{ this.userData.email }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Optional Email :</th>
                                            <td class="text-muted">{{ this.userData.email_optional }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address :</th>
                                            <td class="text-muted">{{ this.userData.address }}</td>
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
                                    <i class="mdi mdi-face-profile mr-1"></i>User Info
                                </template>
                                <ProfileEditForm 
                                    v-on:mounted="initEdit"
                                    ref="editProfile"
                                    v-on:form-submitted="updateProfile"
                                />
                            </b-tab>
                            <b-tab>
                                <template v-slot:title>
                                    <i class="mdi mdi-settings-outline mr-1"></i>Password Change
                                </template>
                                <PasswordUpdateForm 
                                    v-on:form-submitted="updatePassword"
                                />
                            </b-tab>
                        </b-tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue';
import ProfileEditForm from '@/components/customer/setting/profile/ProfileEditForm.vue';
import PasswordUpdateForm from '@/components/common/PasswordUpdateForm.vue';

export default {
    name: 'CustomerProfilePage',
    middleware: ['auth', 'auth-customer'],
    components: {
        Loading,
        ProfileEditForm,
        PasswordUpdateForm
    },
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
            isLoading: false,
            preview: null,
            editImagePreview: false,
            editImage: '',
            image: '',
            userData: {},
        }
    },

    head: {
        titleTemplate: '%s Customer Profile',
    },
    created() {
        this.getUserProfile();
    },
    methods: {
        initEdit() {
            this.$refs.editProfile.getUserProfile();
        },
        async getUserProfile(){
            this.isLoading = true;
            await this.$axios.get('customer/profile')
                .then((response) => {
                    this.userData = Object.assign({}, response.data.data);
                    if(response.data.data.image != 'default.png') {
                        this.editImage = response.data.data.image;
                        this.editImagePreview = true;
                    }
                }).catch((error) => {
                    console.log(error)
                });
            this.isLoading = false;
        },
        async updateProfile(data) {
            try {
                await this.$axios.post('customer/profile', data)
                    .then((response) => {
                        if (response.status == 201) {
                            this.$swal("Success!", response.data.message, "success");
                            this.getUserProfile();
                        }
                    }).catch((error) => {
                        if (error.response.status == 400) {
                            this.$toast.error(error.response.data.message);
                        } else {
                            this.$toast.error("Some thing Happend Wrong. Try Again");
                        }
                        console.log(error);
                    });
            } catch (error) {
                if (error.response.status == 401) {
                    this.$toast.error(error.response.data.message);
                } else {
                    this.$toast.error("Connection Error");
                }
                console.log(error.response);
            }
        },
        async updatePassword(data) {
            try {
                await this.$axios.post('customer/update-password', data)
                    .then((response) => {
                        if (response.status == 201) {
                            this.$swal("Success!", response.data.message, "success");
                        }
                    })
                    .catch((error) => {
                        if (error.response.status == 400) {
                            this.$toast.error(error.response.data.message);
                        } else {
                            this.$toast.error("Some thing Happend Wrong. Try Again");
                        }
                        console.log(error);
                    });
            } catch(error) {
                if (error.response.status == 401) {
                    this.$toast.error(error.response.data.message);
                } else {
                    this.$toast.error("Connection Error");
                }
                console.log(error.response);
            }
        }
    }
}
</script>
