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
