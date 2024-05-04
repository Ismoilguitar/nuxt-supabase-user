<template>
	<div
		class="d-flex vh-100 bg-primary justify-content-center align-items-center"
	>
		<div class="w-50 bg-white rounded p-3">
			<form @submit.prevent="handleUpdate">
				<h2>Update Users</h2>
				<NuxtLink to="/" class="btn btn-primary">Back</NuxtLink>
				<div v-if="Users.length > 0">
					<div class="mb-2">
						<label>Name</label>
						<input
							type="text"
							placeholder="Enter Name"
							class="form-control"
							v-model="Name"
						/>
					</div>
					<div class="mb-2">
						<label>Email</label>
						<input
							type="email"
							placeholder="Enter Email"
							class="form-control"
							v-model="Email"
						/>
					</div>
				</div>
				<div v-else>
					<p>No user data available.</p>
				</div>
				<button class="btn btn-success" type="submit">Submit</button>
			</form>
		</div>
	</div>
</template>
<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'
const SUPABASE_URL = 'https://jymadlsowxmxbvaucypy.supabase.co'
const SUPABASE_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5bWFkbHNvd3hteGJ2YXVjeXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4Mjg0MTYsImV4cCI6MjAzMDQwNDQxNn0.FbjhvNQeZ7NeLndlmRP0h-gUX92kke-Qx_81HtnARtM'
const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!)
const Users = ref<any[] | null>([])
const Name = ref<string>('')
const Email = ref<string>('')
const getUsers = async () => {
	const { data } = await supabase.from('users').select('*')
	Users.value = data
	console.log('Data:', Users.value)
}
const handleUpdate = async() => {
    const { data, error } = await supabase
		.from('users')
		.update([{ name: Name.value, email: Email.value }])
	if (error) {
		console.error('Error creating user:', error.message)
		alert('Failed to create user. Please try again.')
	} else {
		alert('Update Users successfully')
		window.location.href = '/'
		console.log('Data created:', data)
	}
}
onMounted(() => {
	getUsers()
})
</script>
