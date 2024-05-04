<template>
	<div
		class="d-flex vh-100 bg-primary justify-content-center align-items-center"
	>
		<div class="w-50 bg-white rounded p-3">
			<h2>Read Users</h2>
			<NuxtLink to="/" class="btn btn-success">Back</NuxtLink>
			<div v-if="Users.length > 0">
				<h2>{{ Users[0].id }}</h2>
				<h2>{{ Users[0].name }}</h2>
				<h2>{{ Users[0].email }}</h2>
			</div>
			<div v-else>
				<p>No user data available.</p>
			</div>
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
const getUsers = async () => {
	const { data } = await supabase.from('users').select('*')
	Users.value = data
	console.log('Data:', Users.value)
}

onMounted(() => {
	getUsers()
})
</script>