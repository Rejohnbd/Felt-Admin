<template>
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
                <div class="card-body p-4">
                    <div class="text-center w-75 m-auto">
                        <div class="auth-logo">
                            <nuxt-link to="/" class="logo logo-dark text-center">
                                <span class="logo-lg">
                                    <img src="~/assets/images/logo-dark.png" alt height="22" />
                                </span>
                            </nuxt-link>

                            <nuxt-link to="/" class="logo logo-light text-center">
                                <span class="logo-lg">
                                    <img src="~/assets/images/logo-light.png" alt height="22" />
                                </span>
                            </nuxt-link>
                        </div>
                        <p class="text-muted mb-4 mt-3">Enter your email address to reset your password.</p>
                    </div>

                    <form @submit.prevent="passwordRecover">
                        <div class="form-group mb-3">
                            <label for="emailaddress">
                                Email address
                                <span class="text-danger">*</span>
                            </label>
                            <input 
                                v-model="form.email"
                                id="emailaddress"
                                class="form-control" 
                                :class="{ 'is-invalid': submitForm && $v.form.email.$error }"
                                type="email" 
                                required
                                placeholder="Enter your email" 
                            />
                            <div v-if="submitForm && $v.form.email.$error" class="invalid-feedback">
                                <span v-if="!$v.form.email.required">Email is required.</span>
                                <span v-if="!$v.form.email.email">Must be a valid email.</span>
                            </div>
                        </div>

                        <div class="form-group mb-0 text-center">
                            <button class="btn btn-primary btn-block" type="submit">Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12 text-center">
                    <p class="text-muted">
                        Back to
                        <nuxt-link to="/auth/login" class="text-primary font-weight-medium ml-1">Log in</nuxt-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
    name: 'RecoverPasswordPage',
    layout: "auth",
    auth: 'guest',
    head: {
        titleTemplate: '%s Recovery Password',
    },
    data() {
        return {
            form: {
                email: '',
            },
            submitForm: false,
        };
    },
    validations: {
        form: {
            email: {
                required,
                email
            }
        }
    },
    methods: {
        async passwordRecover() {
            this.submitForm = true;
            this.$v.$touch();
            if (!this.$v.$invalid) { 
                this.$toast.warning("This Page under develop");
            } else {
                return;
            }
        }
    }
};
</script>

