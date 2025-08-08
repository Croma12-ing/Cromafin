import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SendEmailOTPRequest {
  email: string
  name: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name }: SendEmailOTPRequest = await req.json()

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get Resend API key from environment
    const resendApiKey = Deno.env.get('RESEND_API_KEY')

    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const resend = new Resend(resendApiKey)

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "Account Verification <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your account - OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Account Verification</h1>
          <p>Hello ${name || 'there'},</p>
          <p>Thank you for registering! Please use the following OTP code to verify your email address:</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h2 style="color: #333; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h2>
          </div>
          <p>This code will expire in 10 minutes for security reasons.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
          <p>Best regards,<br>The Team</p>
        </div>
      `,
    })

    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error)
      return new Response(
        JSON.stringify({ error: 'Failed to send verification email' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Store OTP in temporary storage
    const kv = await Deno.openKv()
    const otpKey = ['email_otp', email]
    
    // Store OTP with 10-minute expiration
    await kv.set(otpKey, otp, { expireIn: 600000 }) // 10 minutes

    console.log(`Email OTP sent to ${email}: ${otp}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Verification email sent successfully',
        // Include OTP in development for testing (remove in production)
        ...(Deno.env.get('DENO_ENV') === 'development' && { otp })
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in send-email-otp function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})