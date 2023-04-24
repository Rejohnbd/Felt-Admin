<template>
    <form @submit.prevent="formSubmitHandler">
        <div class="form-group">
            <label for="packageTypeName">
                Package Name<span class="text-danger">*</span>
            </label>
            <input 
                v-model="formModel.package_name" 
                class="form-control" 
                id="packageTypeName"
                :class="{ 'is-invalid': submitForm && $v.formModel.package_name.$error }"
                type="text" 
                required 
                placeholder="Package Name" 
            />
            <div v-if="submitForm && !$v.formModel.package_name.required" class="invalid-feedback">
                Package Name is required.
            </div>
        </div>
        <div class="form-group">
            <div class="form-row">
                <div class="col-md-6">
                    <label for="installationCharge">
                        Installation Charge<span class="text-danger">*</span>
                    </label>
                    <input 
                        v-model="formModel.installation_charge" 
                        class="form-control" 
                        id="installationCharge"
                        :class="{ 'is-invalid': submitForm && $v.formModel.installation_charge.$error }"
                        type="number" 
                        required 
                        placeholder="Installation Charge" 
                    />
                    <div v-if="submitForm && $v.formModel.installation_charge.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.installation_charge.required">Installation Charge is required.</span>
                        <span v-if="!$v.formModel.installation_charge.numeric">Provide Valid Installation Charge.</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="subscriptionFee">
                        Subscription Fee<span class="text-danger">*</span>
                    </label>
                    <input 
                        v-model="formModel.subscription_fee" 
                        class="form-control" 
                        id="subscriptionFee"
                        :class="{ 'is-invalid': submitForm && $v.formModel.subscription_fee.$error }"
                        type="number" 
                        required 
                        placeholder="Subscription Fee" 
                    />
                    <div v-if="submitForm && $v.formModel.subscription_fee.$error" class="invalid-feedback">
                        <span v-if="!$v.formModel.subscription_fee.required">Subscription Fee is required.</span>
                        <span v-if="!$v.formModel.subscription_fee.numeric">Provide Valid Subscription Fee.</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label>Package Features</label>
            <div class="input-group mb-2" v-for="(package_feature, index) in formModel.package_features" :key="package_feature.id">
                <input 
                    class="form-control" 
                    type="text" 
                    placeholder="Package Features" 
                    v-model="package_feature.value"
                />
                <div class="input-group-append">
                    <button class="btn btn-success waves-effect waves-light" type="button"  @click="addFeature" v-if="index == 0">+</button>
                    <button class="btn btn-danger waves-effect waves-light" type="button"  @click="removeFeature(package_feature.id)" v-else>-</button>
                </div>
            </div>  
        </div>

        <div class="form-group text-right m-b-0">
            <button class="btn btn-primary" type="submit" v-if="operation == 'create'">Submit</button>
            <button class="btn btn-primary" type="submit" v-if="operation == 'edit'">Update</button>
            <nuxt-link 
                to="/admin/setting/packages"
                class="btn btn-secondary m-l-5 ml-1"
            >Cancel</nuxt-link>
        </div>
    </form>
</template>

<script>
import { required, numeric } from 'vuelidate/lib/validators';

export default {
    name: 'VehicleTypeCreateEditForm',
    middleware: ['auth', 'auth-admin'],
    props: {
        operationType: String,
        operation: String
    },
    data() {
        return {
            formModel: {
                package_name: '',
                installation_charge: '',
                subscription_fee: '',
                package_features:[{value: null}]
            },
            submitForm: false,
            packageFeaturesCount: 0
        }
    },
    validations: {
        formModel: {
            package_name: {
                required
            },
            installation_charge: {
                required,
                numeric
            },
            subscription_fee: {
                required,
                numeric
            }
        }
    },
    mounted() {
        this.$emit("mounted");
    },
    methods: {
        addFeature() {
            this.packageFeaturesCount++;
            this.formModel.package_features.push({value: null});
        },
        removeFeature(index) {
            this.formModel.package_features.splice(index, 1);
        },
        async getPakcageById() {
            try {
                await this.$axios.get("admin/service-packages/" + this.$route.params.id)
                    .then((response) => {
                        if (response.status == 200) {
                            this.formModel = Object.assign({}, response.data.data);
                        }
                    }).catch((error) => {
                        if (error.response.status == 404) {
                            this.$toast.error(error.response.data.message);
                            this.$router.push({
                                path: "/admin/setting/packages",
                            });
                        } else {
                            this.$toast.error("Some thing Happend Wrong. Try Again");
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