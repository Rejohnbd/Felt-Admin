<template>
    <div v-if="isLoading">
        <Loading />
    </div>
    <form @submit.prevent="formSubmitHandler" v-else>
        <div class="form-group">
            <div class="form-row">
                <div class="col-md-6">
                    <label for="selectCustomer">
                        Select Customer<span class="text-danger">*</span>
                    </label>
                    <multiselect 
                        id="selectCustomer"
                        v-model="formModel.customer" 
                        track-by="id" 
                        label="email" 
                        :options="customers"
                        placeholder="Select Customer" 
                        :allow-empty="false"
                        :custom-label="nameWithPhoneEmail"
                        :class="{ 'is-invalid': submitForm && $v.formModel.customer.$error }"
                    />
                    <div v-if="submitForm && $v.formModel.customer.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.customer.required">Customer is required.</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="selectVehicleTypes">
                        Select Vehicle Type <span class="text-danger">*</span>
                    </label>
                    <multiselect 
                        id="selectVehicleTypes"
                        v-model="formModel.vehicle_type" 
                        track-by="id" 
                        label="vehicle_type_name" 
                        :options="vehicleTypes"
                        placeholder="Select Vehicle Type" 
                        :allow-empty="false"
                        :class="{ 'is-invalid': submitForm && $v.formModel.vehicle_type.$error }"
                    />
                    <div v-if="submitForm && $v.formModel.vehicle_type.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.vehicle_type.required">Vehicle Type is required.</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-row">
                <div class="col-md-6">
                    <label for="selectPackage">
                        Select Package <span class="text-danger">*</span>
                    </label>
                    <multiselect 
                        id="selectPackage"
                        v-model="formModel.service_package" 
                        track-by="id" 
                        label="package_name" 
                        :options="servicePackage"
                        placeholder="Select Service Package" 
                        :allow-empty="false"
                        :class="{ 'is-invalid': submitForm && $v.formModel.service_package.$error }"
                    />
                    <div v-if="submitForm && $v.formModel.service_package.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.service_package.required">Vehicle Type is required.</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="selectDevice">
                        Select Device
                    </label>
                    <multiselect 
                        id="selectDevice"
                        v-model="formModel.device" 
                        track-by="id" 
                        label="device_imei" 
                        :custom-label="deviceImeiWithPhone"
                        :options="devices"
                        placeholder="Select Device" 
                        :allow-empty="false"
                    />
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-row">
                <div class="col-md-6">
                    <label for="vehicleRegistration">
                        Device Registration Number <span class="text-danger">*</span>
                    </label>
                    <input 
                        v-model="formModel.registration_number" 
                        class="form-control" 
                        id="vehicleRegistration"
                        :class="{ 'is-invalid': submitForm && $v.formModel.registration_number.$error }"
                        type="text" 
                        required 
                        placeholder="Enter Vehicle Registration" 
                    />
                    <div v-if="submitForm && !$v.formModel.registration_number.required" class="invalid-feedback">
                        Vehicle Registration Number is Require
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="vehicleRegistrationDate">
                        Vehicle Registration Expire Date <span class="text-danger">*</span>
                    </label>
                    <date-picker 
                        v-model="formModel.registration_expire_date" 
                        id="vehicleRegistrationDate"
                        firstDayOfWeek="0" 
                        lang="en"
                        confirm
                        format="DD/MM/YYYY"
                        :class="{ 'is-invalid': submitForm && $v.formModel.registration_expire_date.$error }"
                        placeholder="Enter Vehicle Registration Expire Date"
                    />
                    <div v-if="submitForm && !$v.formModel.registration_expire_date.required" class="invalid-feedback">
                        Vehicle Registration Number is Require
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-row">
                <div class="col-md-6">
                    <label for="vehicleInsuraceDate">
                        Vehicle Insurance Date <span class="text-danger">*</span>
                    </label>
                    <date-picker 
                        v-model="formModel.insurance_expire_date" 
                        id="vehicleInsuraceDate"
                        firstDayOfWeek="0" 
                        lang="en"
                        confirm
                        format="DD/MM/YYYY"
                        :class="{ 'is-invalid': submitForm && $v.formModel.insurance_expire_date.$error }"
                        placeholder="Enter Vehicle Insurance Date"
                    />
                    <div v-if="submitForm && !$v.formModel.insurance_expire_date.required" class="invalid-feedback">
                        Vehicle Insurance Date is Require
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="vehicleTaxTokenDate">
                        Vehicle Tax Token Expire Date <span class="text-danger">*</span>
                    </label>
                    <date-picker 
                        v-model="formModel.tax_token_expire_date"
                        id="vehicleTaxTokenDate"
                        firstDayOfWeek="0" 
                        lang="en"
                        confirm
                        format="DD/MM/YYYY"
                        :class="{ 'is-invalid': submitForm && $v.formModel.tax_token_expire_date.$error }"
                        placeholder="Enter Vehicle Tax Token Expire Date"
                    />
                    <div v-if="submitForm && !$v.formModel.tax_token_expire_date.required" class="invalid-feedback">
                        Vehicle Registration Number Require
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-row">
                <div class="col-md-6">
                    <label for="vehicleBrand">
                        Vehicle Brand Name
                    </label>
                    <input 
                        v-model="formModel.vehicle_brand" 
                        class="form-control" 
                        id="vehicleBrand"
                        type="text" 
                        placeholder="Enter Vehicle Brand" 
                    />
                </div>
                <div class="col-md-6">
                    <label for="vehicleModelYear">
                        Vehicle Model Year
                    </label>
                    <date-picker 
                        v-model="formModel.vehicle_model_year"
                        id="vehicleModelYear"
                        firstDayOfWeek="0" 
                        lang="en"
                        confirm
                        type="year"
                        placeholder="Enter Vehicle Model Year"
                    />
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-row">
                <div class="col-md-6">
                    <label for="vehicleFuelCapacity">
                        Vehicle Fuel Capacity <span class="text-danger">*</span>
                    </label>
                    <input 
                        v-model="formModel.fuel_capacity" 
                        class="form-control" 
                        id="vehicleFuelCapacity"
                        type="number" 
                        required 
                        step="any"
                        placeholder="Enter Vehicle Fuel Capacity" 
                        :class="{ 'is-invalid': submitForm && $v.formModel.fuel_capacity.$error }"
                    />
                    <div v-if="submitForm && !$v.formModel.fuel_capacity.required" class="invalid-feedback">
                        Vehicle Fuel Capacity is Require
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="vehicleFuelMilage">
                        Vehicle Milage(kpl) <span class="text-danger">*</span>
                    </label>
                    <input 
                        v-model="formModel.vehicle_kpl" 
                        class="form-control" 
                        id="vehicleFuelMilage"
                        type="number" 
                        step="any"
                        required 
                        placeholder="Enter Vehicle Milage" 
                        :class="{ 'is-invalid': submitForm && $v.formModel.vehicle_kpl.$error }"
                    />
                    <div v-if="submitForm && !$v.formModel.vehicle_kpl.required" class="invalid-feedback">
                        Vehicle Milage is Required
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-row">
                <div class="col-md-6">
                    <label for="paymentActiveStatus">
                        Vehicle Payment Active Status<span class="text-danger">*</span>
                    </label>
                    <select 
                        id="paymentActiveStatus"
                        v-model="formModel.payment_status" 
                        required 
                        class="form-control"
                        :class="{ 'is-invalid': submitForm && $v.formModel.payment_status.$error }"
                    >
                        <option value="">Select Vehicle Payment Active Status</option>
                        <option value="1">Payment Enabled</option>
                        <option value="0">Payment Disabled</option>
                    </select>
                    <div v-if="submitForm && $v.formModel.payment_status.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.payment_status.required">Vehicle Payment Active Status is Required.</span>
                        <span v-if="!$v.formModel.payment_status.numeric">Select Valid Vehicle Payment Active Status Type.</span>
                    </div> 
                </div>
                <div class="col-md-6">
                    <label for="vehicleServiceStatus">
                        Vehicle Service Status <span class="text-danger">*</span>
                    </label>
                    <select 
                        id="vehicleServiceStatus"
                        v-model="formModel.service_status" 
                        required 
                        class="form-control"
                        :class="{ 'is-invalid': submitForm && $v.formModel.service_status.$error }"
                    >
                        <option value="">Select Vehicle Service Status</option>
                        <option value="0">Not Activate</option>
                        <option value="1">Activated</option>
                    </select>
                    <div v-if="submitForm && $v.formModel.service_status.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.service_status.required">Vehicle Service Status is Required.</span>
                        <span v-if="!$v.formModel.service_status.numeric">Select Valid Vehicle Service Status.</span>
                    </div> 
                </div>
            </div>
        </div>
        
        <div class="form-group text-right m-b-0">
            <button class="btn btn-primary" type="submit" v-if="operation == 'create'">Submit</button>
            <button class="btn btn-primary" type="submit" v-if="operation == 'edit'">Update</button>
            <nuxt-link 
                to="/admin/vehicles"
                class="btn btn-secondary m-l-5 ml-1"
            >Cancel</nuxt-link>
        </div>
    </form>
</template>

<script>
import { required, numeric, decimal } from 'vuelidate/lib/validators';
import Multiselect from 'vue-multiselect';
import DatePicker from 'vue2-datepicker'
import Loading from '@/components/common/Loading.vue';

export default {
    name: 'VehicleCreateEditForm',
    middleware: ['auth', 'auth-admin'],
    props: {
        operationType: String,
        operation: String
    },
    components: {
        Loading,
        Multiselect,
        DatePicker
    },
    data() {
        return {
            isLoading: false,
            customers: [],
            vehicleTypes: [],
            servicePackage: [],
            devices: [],
            formModel: {
                customer: '',
                vehicle_type: '',
                service_package: '',
                device: '',
                registration_number: '',
                registration_expire_date: '',
                insurance_expire_date: '',
                tax_token_expire_date: '',
                vehicle_brand: '',
                vehicle_model_year: '',
                fuel_capacity: '',
                vehicle_kpl: '',
                payment_status: '',
                service_status: ''
            },
            submitForm: false,
        }
    },
    validations: {
        formModel: {
            customer: { required },
            vehicle_type: { required },
            service_package: { required },
            device: { required },
            registration_number: { required },
            registration_expire_date: { required },
            insurance_expire_date: { required },
            tax_token_expire_date: { required },
            fuel_capacity: { required, decimal },
            vehicle_kpl: { required, decimal },
            payment_status: { required, numeric },
            service_status: { required, numeric }
        }
    },
    created() {
        this.getFormRelaventData()
    },
    methods: {
        async getFormRelaventData() {
            this.isLoading = true;
            await this.$axios.get('admin/users?type=customer')
                .then((response) => {
                    this.customers = response.data.data;
                }).catch((error) => {
                    console.log(error)
                });
            await this.$axios.get('admin/vehicle-types')
                .then((response) => {
                    this.vehicleTypes = response.data.data;
                }).catch((error) => {
                    console.log(error)
                });
            await this.$axios.get('admin/service-packages')
                .then((response) => {
                    this.servicePackage = response.data.data;
                }).catch((error) => {
                    console.log(error)
                });
            await this.$axios.get('admin/devices?type=assign_to_customer')
                .then((response) => {
                    console.log(response.data.data);
                    this.devices = response.data.data;
                }).catch((error) => {
                    console.log(error)
                });
            this.isLoading = false;
        },
        nameWithPhoneEmail({ email, user_details }) {
            return `${user_details.first_name} ${user_details.last_name != null ? user_details.last_name : ''} - ${email} - ${user_details.phone_number}`;
        },
        deviceImeiWithPhone({ device_imei, device_sim }) {
            return `${device_imei} (${device_sim})`;
        },
        formSubmitHandler() {
            console.log(this.$moment(new Date()).format('YYYY-MM-DD'))
            this.submitForm = true;
            this.$v.$touch();
            if (!this.$v.$invalid) {
                let deviceId = '';
                let vehicleModelYear = '';

                if(Object.keys(this.formModel.device).length > 0) {
                    deviceId = this.formModel.device.id;
                }

                if(this.formModel.vehicle_model_year != ''){
                    vehicleModelYear = this.$moment(this.formModel.vehicle_model_year).format('YYYY')
                }

                let data = {
                    customer_id : this.formModel.customer.id,
                    vehicle_type_id: this.formModel.vehicle_type.id,
                    service_package_id: this.formModel.service_package.id,
                    device_id: deviceId,
                    registration_number: this.formModel.registration_number,
                    registration_expire_date: this.$moment(this.formModel.registration_expire_date).format('YYYY-MM-DD'),
                    insurance_expire_date: this.$moment(this.formModel.insurance_expire_date).format('YYYY-MM-DD'),
                    tax_token_expire_date: this.$moment(this.formModel.tax_token_expire_date).format('YYYY-MM-DD'),
                    vehicle_brand: this.formModel.vehicle_brand,
                    vehicle_model_year: vehicleModelYear,
                    fuel_capacity: this.formModel.fuel_capacity,
                    vehicle_kpl: this.formModel.vehicle_kpl,
                    payment_status: this.formModel.payment_status,
                    service_status: this.formModel.service_status
                }
                this.$emit("form-submitted", data);
                this.submitForm = false;
            } else {
                return;
            }
        }
    }
}
</script>