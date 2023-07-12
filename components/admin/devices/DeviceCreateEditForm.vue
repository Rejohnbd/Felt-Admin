<template>
    <div>
        <form @submit.prevent="formSubmitHandler">
            <div class="form-group">
                <label for="deviceTypeName">
                    Device IMEI No<span class="text-danger">*</span>
                </label>
                <input 
                    v-model="formModel.device_imei" 
                    class="form-control" 
                    id="deviceTypeName"
                    :class="{ 'is-invalid': submitForm && $v.formModel.device_imei.$error }"
                    type="text" 
                    required 
                    placeholder="Enter Device Type Name" 
                />
                <div v-if="submitForm && !$v.formModel.device_imei.required" class="invalid-feedback">
                    Device IMEI No is required.
                </div>
            </div>
            <div class="form-group">
                <label for="deviceTypeName">
                    Select Device Type<span class="text-danger">*</span>
                </label>
                <multiselect 
                    v-model="formModel.device_type" 
                    track-by="id" 
                    label="device_type_name" 
                    :options="deviceTypes"
                    placeholder="Select Device Type" 
                    :allow-empty="false"
                    :class="{ 'is-invalid': submitForm && $v.formModel.device_imei.$error }"
                />
                <div v-if="submitForm && $v.formModel.device_type.$error" class="invalid-feedback">
                    <span v-if="!$v.formModel.device_type.required">Device Type is required.</span>
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <div class="col-md-6">
                        <label for="deviceTypeName">
                            Device SIM Number<span class="text-danger">*</span>
                        </label>
                        <input 
                            v-model="formModel.device_sim" 
                            class="form-control" 
                            id="deviceTypeName"
                            :class="{ 'is-invalid': submitForm && $v.formModel.device_sim.$error }"
                            type="number" 
                            required 
                            placeholder="Enter Device Type Name" 
                        />
                        <div v-if="submitForm && $v.formModel.device_sim.$error" class="invalid-feedback">
                            <span v-if="!$v.formModel.device_sim.required">Device SIM Number is Required.</span>
                            <span v-if="!$v.formModel.device_sim.numeric">Provide Valid Device SIM Number.</span>
                            <span v-if="!$v.formModel.device_sim.minLength">SIM number not Less than 11.</span>
                            <span v-if="!$v.formModel.device_sim.maxLength">SIM number not Greater than 11.</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="deviceTypeName">
                            Device SIM Type<span class="text-danger">*</span>
                        </label>
                        <select 
                            v-model="formModel.device_sim_type" 
                            required 
                            class="form-control"
                            :class="{ 'is-invalid': submitForm && $v.formModel.device_sim.$error }"
                        >
                            <option value="">Select Sim Type</option>
                            <option value="1">Pre Paid</option>
                            <option value="2">Post Paid</option>
                        </select>
                        <div v-if="submitForm && $v.formModel.device_sim_type.$error" class="invalid-feedback">
                            <span v-if="!$v.formModel.device_sim_type.required">Device SIM Type is required.</span>
                            <span v-if="!$v.formModel.device_sim_type.numeric">Select Valid Device SIM Type.</span>
                        </div> 
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="deviceTypeConfigureText">
                    Device Health Status <span class="text-danger">*</span>
                </label>
                <select 
                    v-model="formModel.device_health_status" 
                    required 
                    class="form-control"
                    :class="{ 'is-invalid': submitForm && $v.formModel.device_health_status.$error }"
                >
                    <option value="">Select Health Status</option>
                    <option value="1">Running</option>
                    <option value="2">Maintenance</option>
                    <option value="0">Spoiled</option>
                </select>
                <div v-if="submitForm && $v.formModel.device_health_status.$error" class="invalid-feedback">
                    <span v-if="!$v.formModel.device_health_status.required">Device Health Status is required.</span>
                    <span v-if="!$v.formModel.device_health_status.numeric">Select Valid Device Status Health.</span>
                </div>
            </div>
            
            <div class="form-group text-right m-b-0">
                <button class="btn btn-primary" type="submit" v-if="operation == 'create'">Submit</button>
                <button class="btn btn-primary" type="submit" v-if="operation == 'edit'">Update</button>
                <nuxt-link 
                    to="/admin/devices"
                    class="btn btn-secondary m-l-5 ml-1"
                >Cancel</nuxt-link>
            </div>
        </form>
    </div>
</template>

<script>
import { required, numeric, minLength, maxLength } from 'vuelidate/lib/validators';
import Multiselect from 'vue-multiselect';
import Loading from '@/components/common/Loading.vue';

export default {
    name: 'DeviceCreateEditForm',
    middleware: ['auth', 'auth-admin'],
    props: {
        operationType: String,
        operation: String
    },
    components: {
        Loading,
        Multiselect
    },
    data() {
        return {
            deviceTypes: [],
            formModel: {
                device_imei: '',
                device_type: '',
                device_sim: '',
                device_sim_type: '',
                device_health_status: ''
            },
            submitForm: false,
        }
    },
    validations: {
        formModel: {
            device_imei: {
                required
            },
            device_type: {
                required
            },
            device_sim: {
                required, numeric, minLength: minLength(11), maxLength: maxLength(11)
            },
            device_sim_type: {
                required, numeric
            },
            device_health_status: {
                required, numeric
            }
        }
    },
    mounted() {
        this.$emit("mounted");
    },
    methods: {
        async getAllDeviceType() {
            await this.$axios.get('admin/device-types').then((response) => {
                this.$nuxt.$loading.start();
                this.deviceTypes = response.data.data;
                this.$nuxt.$loading.finish();
            }).catch((error) => {
                console.log(error)
            })
        },
        async getDeviceById() {
            try {
                await this.$axios.get("admin/devices/" + this.$route.params.id)
                    .then((response) => {
                        if (response.status == 200) {
                            this.formModel = Object.assign({}, response.data.data);
                        }
                    }).catch((error) => {
                        if (error.response.status == 404) {
                            this.$toast.error(error.response.data.message);
                            this.$router.push({
                                path: "/admin/devices",
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