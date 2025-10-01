import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VerifyEmailOTPRequest {
  email: string
  otp: string
  password: string
  name: string
  phone: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, otp, password, name, phone }: VerifyEmailOTPRequest = await req.json()

    if (!email || !otp || !password || !name) {
      return new Response(
        JSON.stringify({ error: 'Email, OTP, password, and name are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Retrieve stored OTP
    const kv = await Deno.openKv()
    const otpKey = ['email_otp', email]
    const storedOTPEntry = await kv.get(otpKey)

    if (!storedOTPEntry.value) {
      return new Response(
        JSON.stringify({ error: 'OTP expired or not found. Please request a new verification code.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const storedOTP = storedOTPEntry.value as string

    if (storedOTP !== otp) {
      return new Response(
        JSON.stringify({ error: 'Invalid OTP. Please check your code and try again.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // OTP is valid, create the user account
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name: name.trim(),
        phone: phone ? phone.replace(/\D/g, '') : ''
      },
      email_confirm: true // Email is already verified via OTP
    })

    if (authError) {
      console.error('Error creating user:', authError)
      
      let errorMessage = 'Account creation failed. Please try again.'
      if (authError.message.includes('already registered')) {
        errorMessage = 'An account with this email already exists. Please sign in instead.'
      }
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // OTP verified and account created, delete the OTP from storage
    await kv.delete(otpKey)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Account created successfully',
        user: authData.user
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Verification failed. Please try again.' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})