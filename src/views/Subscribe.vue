<template>
	<v-row justify="center" class="fill-height align-center">
		<v-col class="col-10 col-sm-7 col-md-6 col-lg-4">
			<v-form ref="form" v-model="valid">
				<v-text-field v-model="name" :counter="20" :rules="nameRules" label="Name" required></v-text-field>
				<v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
				<v-text-field
					:type="showPassword ? 'text' : 'password'"
					label="Password"
					:append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
					@click:append="showPassword = !showPassword"
					v-model="password"
					:rules="passwordRules"
					autocomplete="on"
					required
				></v-text-field>

				<v-checkbox
					class="align-center justify-center"
					v-model="checkbox"
					:rules="[v => !!v || 'You must agree to continue!']"
					label="Do you agree?"
					required
				></v-checkbox>

				<v-card-actions>
					<v-row>
						<v-col class="col-12 col-sm-6 col-md-4 text-center">
							<v-btn :disabled="!valid" color="success" @click="validate">
								Validate
							</v-btn>
						</v-col>

						<v-col class="col-12 col-sm-6 col-md-4 text-center">
							<v-btn color="error" @click="reset">
								Reset Form
							</v-btn>
						</v-col>

						<v-col class="col-12 col-md-4  text-center">
							<v-switch v-model="staySigned" label="Stay Signed" class="d-inline-block ma-0"></v-switch>
						</v-col>
					</v-row>
				</v-card-actions>
			</v-form>
		</v-col>
	</v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'Subscribe',
	data() {
		return {
			valid: true,
			name: '',
			nameRules: [v => !!v || 'Name is required', v => (v && v.length <= 20) || 'Name must be less than 10 characters'],
			email: '',
			emailRules: [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
			password: '',
			passwordRules: [
				v => !!v || 'Password is required',
				v => (v && v.length >= 8) || 'Password must be at least 8 characters'
			],
			checkbox: false,
			showPassword: false,
			staySigned: false
		};
	},
	methods: {
		...mapActions('user', ['signUpAction']),
		validate() {
			//Todo check if email already exists or not.
			if (this.$refs.form.validate()) {
				// Will validate all inputs and return if they are all valid or not
				// Registration Code

				const userSignUp = { email: this.email, password: this.password, name: this.name, staySigned: this.staySigned };
				this.signUpAction(userSignUp);
			}
		},
		reset() {
			this.$refs.form.reset();
		}
	}
};
</script>
