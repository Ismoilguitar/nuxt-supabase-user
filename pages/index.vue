<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'
const SUPABASE_URL = 'https://jymadlsowxmxbvaucypy.supabase.co'
const SUPABASE_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5bWFkbHNvd3hteGJ2YXVjeXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4Mjg0MTYsImV4cCI6MjAzMDQwNDQxNn0.FbjhvNQeZ7NeLndlmRP0h-gUX92kke-Qx_81HtnARtM'
const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!)
const Users = ref<any[] | null>([])
const getUsers = async () => {
	const { data } = await supabase.from('users').select('*')
	Users.value = data
	console.log('Data:', Users.value)
}
const handleDelete = async (id: any) => {
	try {
		// Delete the user with the specified id
		const { data, error } = await supabase.from('users').delete().eq('id', id)

		if (error) {
			throw new Error(error.message) // Throw an error if deletion fails
		}

		// Update the Users ref with the new data
		if (error) {
			console.error('Error creating user:', error)
			alert('Failed to create user. Please try again.')
		} else {
			console.log('User deleted successfully', data)
			alert('User deleted successfully')
			location.reload()
		}
	} catch (error) {
		console.error('Error deleting user:', error)
		alert('Failed to delete user. Please try again.')
	}
}
onMounted(() => {
	getUsers()
})
</script>

<template>
	<div
		class="d-flex vh-100 bg-primary justify-content-center align-items-center"
	>
		<div class="w-50 bg-white rounded p-3">
			<h2>Users List</h2>
			<div class="d-flex justify-content-center float-end">
				<NuxtLink to="/create" class="btn btn-success">Create + </NuxtLink>
			</div>
			<table class="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-if="Users.length > 0"
						v-for="(data, index) in Users"
						:key="index"
					>
						<td>{{ data.id }}</td>
						<td>{{ data.name }}</td>
						<td>{{ data.email }}</td>
						<td>
							<NuxtLink :to="`/read/${data.id}`" class="btn btn-sm btn-info"
								>Read</NuxtLink
							>
							<NuxtLink
								:to="`/edit/${data.id}`"
								class="btn btn-sm btn-primary mx-2"
								>Edit</NuxtLink
							>
							<button
								@click="handleDelete(data.id)"
								class="btn btn-sm btn-danger"
							>
								Delete
							</button>
						</td>
					</tr>
					<tr v-else>
						<td>
							<div class="spinner-border text-primary" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
							Loading...
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
