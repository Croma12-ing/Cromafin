import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SendOTPRequest {
  phoneNumber: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber }: SendOTPRequest = await req.json()

    if (!phoneNumber) {
      return new Response(
        JSON.stringify({ error: 'Phone number is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get Twilio credentials from environment
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID')
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN')
    const fromNumber = Deno.env.get('TWILIO_PHONE_NUMBER')

    if (!accountSid || !authToken || !fromNumber) {
      console.error('Missing Twilio credentials')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Format the Twilio from number to ensure it's in E.164 format
    const formattedFromNumber = fromNumber.startsWith('+') ? fromNumber : `+${fromNumber}`

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Format phone number (ensure it starts with +91 for India or appropriate country code)
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`
    
    // Send SMS via Twilio
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
    const auth = btoa(`${accountSid}:${authToken}`)
    
    const body = new URLSearchParams({
      From: formattedFromNumber,
      To: formattedPhone,
      Body: `Your OTP for account verification is: ${otp}. This code will expire in 5 minutes.`
    })

    const twilioResponse = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body.toString()
    })

    if (!twilioResponse.ok) {
      const error = await twilioResponse.text()
      console.error('Twilio error:', error)
      
      // Parse Twilio error for better user feedback
      let userMessage = 'Failed to send OTP. Please try again.'
      try {
        const errorData = JSON.parse(error)
        if (errorData.code === 21212) {
          console.error('Invalid Twilio phone number configuration. Please check TWILIO_PHONE_NUMBER secret.')
          userMessage = 'SMS service configuration error. Please contact support.'
        } else if (errorData.code === 21614) {
          userMessage = 'Invalid phone number format. Please enter a valid mobile number.'
        }
      } catch (e) {
        // Keep default message if error parsing fails
      }
      
      return new Response(
        JSON.stringify({ error: userMessage }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Store OTP in a temporary store (using Deno KV for simplicity)
    // In production, you might want to use Redis or another temporary storage
    const kv = await Deno.openKv()
    const otpKey = ['otp', phoneNumber]
    
    // Store OTP with 5-minute expiration
    await kv.set(otpKey, otp, { expireIn: 300000 }) // 5 minutes

    console.log(`OTP sent to ${formattedPhone}: ${otp}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP sent successfully',
        // Include OTP in development for testing (remove in production)
        ...(Deno.env.get('DENO_ENV') === 'development' && { otp })
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in send-otp function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})