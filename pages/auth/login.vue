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
                        <p class="text-muted mb-4 mt-3">Enter your Email and Password to Access Admin Panel.</p>
                    </div>

                    <form @submit.prevent="login">
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

                        <div class="form-group mb-3">
                            <label for="password">
                                Password
                                <span class="text-danger">*</span>
                            </label>
                            <div class="input-group input-group-merge">
                                <input 
                                    v-if="showPassword"
                                    v-model="form.password"
                                    id="password" 
                                    type="text" 
                                    class="form-control"
                                    :class="{ 'is-invalid': submitForm && $v.form.password.$error }"
                                    required
                                    placeholder="Enter your password" 
                                />
                                <input
                                    v-else
                                    v-model="form.password"
                                    id="password" 
                                    type="password" 
                                    class="form-control"
                                    :class="{ 'is-invalid': submitForm && $v.form.password.$error }"
                                    required
                                    placeholder="Enter your password" 
                                />
                                <div class="input-group-append" data-password="false" @click="passwordShow">
                                    <div class="input-group-text">
                                        <span :class="{ 'fas fa-eye': showPassword, 'fas fa-eye-slash': !showPassword}"></span>
                                    </div>
                                </div>
                                <div v-if="submitForm && $v.form.password.$error" class="invalid-feedback">
                                    <span v-if="!$v.form.password.required">Password is required.</span>
                                    <span v-if="!$v.form.password.minLength">Password must be at least 6 characters.</span>
                                </div>
                            </div>
                            
                        </div>

                        <div class="form-group mb-0 text-center">
                            <button class="btn btn-primary btn-block" type="submit">Log In</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-12 text-center">
                    <p>
                        <nuxt-link to="/auth/recoverpwd" class="text-primary font-weight-medium ml-1">Forgot your password?</nuxt-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    required,
    email,
    minLength,
} from 'vuelidate/lib/validators'

export default {
    name: 'LoginPage',
    layout: "auth",
    auth: 'guest',
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            showPassword: false,
            submitForm: false,
        }
    },
    validations: {
        form: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6)
            }
        }
    },
    head: {
        titleTemplate: '%s Login',
    },
    
    mounted(){
        this.$axios.$get('/sanctum/csrf-cookie');
    },
    methods:{
        passwordShow() {
            this.showPassword = !this.showPassword;
        },
        async login(){
            this.submitForm = true;
            this.$v.$touch();
            if (!this.$v.$invalid) {
                try{
                    await this.$auth.loginWith('laravelSanctum',{
                        data: {
                            email: this.form.email,
                            password: this.form.password
                        }
                    }).then((response) => {
                        this.$toast.info(response.data.message);
                        this.$router.push({
                            path: "/",
                        });
                    }).catch((error) => {
                        if (error.response.status == 401){
                            this.$toast.error(error.response.data.message);
                        } else {
                            this.$toast.error("Connection Error");
                            this.form.email = '';
                            this.form.password = '';
                        }
                        console.log(error.response);
                    });
                } catch(error) {
                    this.form.email = '';
                    this.form.password = '';
                    this.submitForm = false;
                    this.$toast.error("Connection Error");
                    console.log('Connection Error:', error);
                }
            } else {
                return;
            }
        }
    }
};
</script>