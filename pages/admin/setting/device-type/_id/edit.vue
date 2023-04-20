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
                                    <form @submit.prevent="handleUpdateSubmit">
                                        <div class="form-group">
                                            <label for="deviceTypeName">
                                                Device Type Name
                                                <span class="text-danger">*</span>
                                            </label>
                                            <input v-model="form.device_type_name" class="form-control" id="deviceTypeName"
                                                :class="{ 'is-invalid': submitForm && $v.form.device_type_name.$error }"
                                                type="text" required placeholder="Enter Device Type Name" />
                                            <div v-if="submitForm && !$v.form.device_type_name.required"
                                                class="invalid-feedback">Device Type Name is required.</div>
                                        </div>
                                        <div class="form-group">
                                            <label for="deviceTypeConfigureText">
                                                Device Configure Setting
                                                <span class="text-danger">*</span>
                                            </label>
                                            <div>
                                                <textarea v-model="form.device_configure_text" id="deviceTypeConfigureText"
                                                    class="form-control"
                                                    :class="{ 'is-invalid': submitForm && $v.form.device_configure_text.$error }"
                                                    placeholder="Enter Device Configure Setting" required></textarea>
                                                <div v-if="submitForm && $v.form.device_configure_text.$error"
                                                    class="invalid-feedback">
                                                    <span v-if="!$v.form.device_configure_text.required">Device Configure
                                                        Setting is Required.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group text-right m-b-0">
                                            <button class="btn btn-primary" type="submit">Update</button>
                                            <nuxt-link to="/admin/setting/device-type"
                                                class="btn btn-secondary m-l-5 ml-1">Cancel</nuxt-link>
                                        </div>
                                    </form>
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
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'EditDeviceTypePage',
    middleware: ['auth', 'auth-admin'],
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
            form: {
                device_type_name: '',
                device_configure_text: '',
            },
            submitForm: false,
        }
    },
    validations: {
        form: {
            device_type_name: {
                required
            },
            device_configure_text: {
                required
            }
        }
    },
    head: {
        titleTemplate: '%s Device Type Edit',
    },
    created() {
        if(this.$route.params.id) {
            this.getDeviceTypeById(this.$route.params.id);
        }else {
            this.$router.push({
                path: "/admin/setting/device-type",
            });
        }
    },
    methods: {
        // initEdit() {
        //     console.log('here');
        // }
        async getDeviceTypeById(deviceTypeId) {
            this.$nuxt.$loading.start();
            try {
                await this.$axios.get("admin/device-types/" + deviceTypeId)
                    .then((response) => {
                        if(response.status == 200) {
                            this.form = Object.assign({}, response.data.data);
                        }
                    }).catch((error) => {
                        if (error.response.status == 404) {
                            this.$toast.error(error.response.data.message);
                            this.$router.push({
                                path: "/admin/setting/device-type",
                            });
                        }
                        console.log(error.response.data);
                    });
            } catch (error) {
                this.$toast.error("Connection Error");
                console.log('Connection Error:', error);
            }
            this.$nuxt.$loading.finish();
        },
        async handleUpdateSubmit() {
            this.submitForm = true;
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.$nuxt.$loading.start();
                try {
                    await this.$axios.put(`admin/device-types/${this.form.id}`, this.form)
                        .then((response) => {
                            if (response.status == 201) {
                                this.form.device_type_name = '';
                                this.form.device_configure_text = '';
                                this.submitForm = false;
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
                    this.submitForm = false;
                    this.$toast.error("Connection Error");
                    console.log('Connection Error:', error);
                }
                this.$nuxt.$loading.finish();
            } else {
                return;
            }
        }
    }
}
</script>