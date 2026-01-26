'use server'

import { supabase } from '@/lib/supabase'

export async function joinWaitlist(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    return { error: 'Email is required' }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address' }
  }

  try {
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }])

    if (error) {
       // Check for unique violation (code 23505 is common for unique constraints)
      if (error.code === '23505') {
        return { error: 'You are already on the waitlist!' }
      }
      console.error('Supabase error:', error)
      return { error: 'Something went wrong. Please try again.' }
    }

    return { success: true }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { error: 'Failed to join waitlist' }
  }
}
