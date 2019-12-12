<template>
	<v-row justify="center" class="fill-height align-center">
		<v-col class="col-10 col-sm-7 col-md-6 col-lg-4">
			<v-form ref="form" v-model="valid">
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
import firebase from 'firebase/app';
import store from './../store/store';

export default {
	name: 'Authentication',
	data() {
		return {
			valid: true,
			email: '',
			emailRules: [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
			password: '',
			passwordRules: [
				v => !!v || 'Password is required',
				v => (v && v.length >= 8) || 'Password must be at least 8 characters'
			],
			showPassword: false
		};
	},
	methods: {
		validate() {
			if (this.$refs.form.validate()) {
				firebase
					.auth()
					.signInWithEmailAndPassword(this.email, this.password)
					.then(() => {
						// console.log(data.user);
						const notification = {
							type: 'success',
							message: 'Authentication has been successful!'
						};
						store.dispatch('notification/add', notification, { root: true });
					})
					.catch(err => {
						const notification = {
							type: 'error',
							message: `There was a problem with authentication: ${err.message}`
						};
						store.dispatch('notification/add', notification, { root: true });
						// this.$router.push({ name: 'home' });
					});
			}
		},
		reset() {
			this.$refs.form.reset();
		}
	}
};
</script>
