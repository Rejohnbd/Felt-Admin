<template>
    <form @submit.prevent="formSubmitHandler">
        <div class="form-group">
            <label for="deviceTypeName">
                Device Type Name<span class="text-danger">*</span>
            </label>
            <input 
                v-model="formModel.device_type_name" 
                class="form-control" 
                id="deviceTypeName"
                :class="{ 'is-invalid': submitForm && $v.formModel.device_type_name.$error }"
                type="text" 
                required 
                placeholder="Enter Device Type Name" 
            />
            <div v-if="submitForm && !$v.formModel.device_type_name.required" class="invalid-feedback">
                Device Type Name is required.
            </div>
        </div>
        <div class="form-group">
            <label for="deviceTypeConfigureText">
                Device Configure Setting <span class="text-danger">*</span>
            </label>
            <div>
                <textarea 
                    v-model="formModel.device_configure_text" 
                    id="deviceTypeConfigureText"
                    class="form-control"
                    :class="{ 'is-invalid': submitForm && $v.formModel.device_configure_text.$error }"
                    placeholder="Enter Device Configure Setting" 
                    required
                ></textarea>
                <div v-if="submitForm && $v.formModel.device_configure_text.$error" class="invalid-feedback">
                    <span v-if="!$v.formModel.device_configure_text.required">Device Configure Setting is Required.</span>
                </div>
            </div>
        </div>
        <div class="form-group text-right m-b-0">
            <button class="btn btn-primary" type="submit" v-if="operation == 'create'">Submit</button>
            <button class="btn btn-primary" type="submit" v-if="operation == 'edit'">Update</button>
            <nuxt-link 
                to="/admin/setting/device-type"
                class="btn btn-secondary m-l-5 ml-1"
            >Cancel</nuxt-link>
        </div>
    </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'DeviceTypeCreateEditForm',
    middleware: ['auth', 'auth-admin'],
    props: {
        operationType: String,
        operation: String
    },
    data() {
        return {
            formModel: {
                device_type_name: '',
                device_configure_text: '',
            },
            submitForm: false,
        }
    },
    validations: {
        formModel: {
            device_type_name: {
                required
            },
            device_configure_text: {
                required
            }
        }
    },
    mounted() {
        this.$emit("mounted");
    },
    methods: {
        async getDeviceTypeById() {
            try {
                await this.$axios.get("admin/device-types/" + this.$route.params.id)
                    .then((response) => {
                        if (response.status == 200) {
                            this.formModel = Object.assign({}, response.data.data);
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
        },
        async formSubmitHandler() {
            this.submitForm = true;
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.$emit("form-submitted", this.formModel);
                this.submitForm = false;
            } else {
                return;
            }
        }
    }
}
</script>