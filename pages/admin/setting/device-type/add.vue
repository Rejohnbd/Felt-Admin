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
                                    <form @submit.prevent="handleSubmit">
                                        <div class="form-group">
                                            <label for="deviceTypeName">
                                                Device Type Name
                                                <span class="text-danger">*</span>
                                            </label>
                                            <input 
                                                v-model="form.device_type_name"  
                                                class="form-control" 
                                                id="deviceTypeName"
                                                :class="{ 'is-invalid': submitForm && $v.form.device_type_name.$error }" 
                                                type="text" 
                                                required
                                                placeholder="Enter Device Type Name" 
                                            />
                                            <div v-if="submitForm && !$v.form.device_type_name.required" class="invalid-feedback">Device Type Name is required.</div>
                                        </div>
                                        <div class="form-group">
                                            <label for="deviceTypeConfigureText">
                                                Device Configure Setting
                                                <span class="text-danger">*</span>
                                            </label>
                                            <div>
                                                <textarea
                                                    v-model="form.device_configure_text"
                                                    id="deviceTypeConfigureText"
                                                    class="form-control" 
                                                    :class="{ 'is-invalid': submitForm && $v.form.device_configure_text.$error }"
                                                    placeholder="Enter Device Configure Setting"
                                                    required
                                                ></textarea>
                                                <div v-if="submitForm && $v.form.device_configure_text.$error" class="invalid-feedback">
                                                    <span v-if="!$v.form.device_configure_text.required">Device Configure Setting is Required.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group text-right m-b-0">
                                            <button class="btn btn-primary" type="submit">Submit</button>
                                            <nuxt-link to="/admin/setting/device-type" class="btn btn-secondary m-l-5 ml-1">Cancel</nuxt-link>
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
    name: 'AddDeviceTypePage',
    middleware: ['auth', 'auth-admin'],
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
        titleTemplate: '%s Device Type Add',
    },
    methods: {
        async handleSubmit() {
            this.submitForm = true;
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.$nuxt.$loading.start();
                try {
                    await this.$axios.post('admin/device-types', this.form)
                        .then((response) => {
                            if(response.status == 201) {
                                this.$swal("Success!", response.data.message, "success");
                            }
                            this.form.device_type_name = '';
                            this.form.device_configure_text = '';
                            this.submitForm = false;
                        }).catch((error) => {
                            if (error.response.status == 400) {
                                this.$toast.error(error.response.data.message);
                            } 
                            console.log(error.response.data);
                        });
                } catch (error) {
                    this.form.device_type_name = '';
                    this.form.device_configure_text = '';
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