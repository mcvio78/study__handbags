<template>
	<v-row justify="center" class="fill-height align-center">
		<v-col class="col-10 col-sm-7 col-md-6 col-lg-4">
			<v-form ref="form" v-model="valid">
				<v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
				<v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
				<v-text-field
					:type="showPassword ? 'text' : 'password'"
					label="Password"
					:append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
					@click:append="showPassword = !showPassword"
					v-model="password"
					:rules="passwordRules"
					required
				></v-text-field>

				<v-checkbox
					class="align-center justify-center"
					v-model="checkbox"
					:rules="[v => !!v || 'You must agree to continue!']"
					label="Do you agree?"
					required
				></v-checkbox>

				<v-card-actions class="justify-center">
					<!-- Todo understad behavior of "valid" -->
					<v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
						Validate
					</v-btn>

					<v-btn color="error" class="mr-4" @click="reset">
						Reset Form
					</v-btn>
				</v-card-actions>
			</v-form>
		</v-col>
	</v-row>
</template>

<script>
import firebase from 'firebase';

export default {
	data() {
		return {
			valid: true,
			name: '',
			nameRules: [v => !!v || 'Name is required', v => (v && v.length <= 10) || 'Name must be less than 10 characters'],
			email: '',
			emailRules: [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
			password: '',
			passwordRules: [
				v => !!v || 'Password is required',
				v => (v && v.length >= 8) || 'Password must be at least 8 characters'
			],
			checkbox: false,
			showPassword: false
		};
	},
	methods: {
		validate() {
			if (this.$refs.form.validate()) {
				// Will validate all inputs and return if they are all valid or not
				// Registration Code
				firebase
					.auth()
					.createUserWithEmailAndPassword(this.email, this.password)
					.then(data => {
						data.user
							.updateProfile({
								displayName: this.form.name
							})
							.then(() => {
								// Code here...
							});
					})
					.catch(err => {
						this.error = err.message;
					});
			}
		},
		reset() {
			this.$refs.form.reset();
		}
	}
};
</script>
