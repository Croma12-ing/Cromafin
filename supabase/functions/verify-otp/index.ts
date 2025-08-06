import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VerifyOTPRequest {
  phoneNumber: string
  otp: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber, otp }: VerifyOTPRequest = await req.json()

    if (!phoneNumber || !otp) {
      return new Response(
        JSON.stringify({ error: 'Phone number and OTP are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Retrieve stored OTP
    const kv = await Deno.openKv()
    const otpKey = ['otp', phoneNumber]
    const storedOTPEntry = await kv.get(otpKey)

    if (!storedOTPEntry.value) {
      return new Response(
        JSON.stringify({ error: 'OTP expired or not found' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const storedOTP = storedOTPEntry.value as string

    if (storedOTP !== otp) {
      return new Response(
        JSON.stringify({ error: 'Invalid OTP' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // OTP is valid, delete it from storage
    await kv.delete(otpKey)

    console.log(`OTP verified successfully for ${phoneNumber}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP verified successfully' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in verify-otp function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})