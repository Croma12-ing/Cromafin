
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting userMessage function execution...');
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Initialize Resend
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    console.log('Fetching all registered users...');

    // Fetch all registered users from profiles table
    const { data: users, error: fetchError } = await supabase
      .from('profiles')
      .select('id, name, email, cibil_score')
      .not('email', 'is', null);

    if (fetchError) {
      console.error('Error fetching users:', fetchError);
      throw new Error(`Failed to fetch users: ${fetchError.message}`);
    }

    if (!users || users.length === 0) {
      console.log('No registered users found');
      return new Response(
        JSON.stringify({ message: 'No registered users found' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log(`Found ${users.length} registered users`);

    const emailResults = [];
    
    // Function to generate a CIBIL score below 600
    const getDisplayCibilScore = (): number => {
      const lowScores = [520, 535, 545, 560, 575, 580, 585, 590, 595];
      return lowScores[Math.floor(Math.random() * lowScores.length)];
    };
    
    // Send email to each user
    for (const user of users) {
      try {
        console.log(`Sending email to user: ${user.email}`);
        
        // Always use a low CIBIL score regardless of actual value
        const displayCibilScore = getDisplayCibilScore();
        
        // Construct email content
        let emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin-bottom: 10px;">CromaFin</h1>
              <p style="color: #6b7280; font-size: 16px;">Your Financial Partner</p>
            </div>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1f2937; margin-bottom: 15px;">Hello ${user.name || 'Valued Customer'},</h2>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
                We hope this email finds you well. We're writing to update you on your loan process status.
              </p>
              
              <div style="background-color: #dbeafe; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
                <p style="color: #1e40af; font-weight: bold; margin: 0;">
                  📋 Your loan process is in progress.
                </p>
              </div>
              
              <div style="background-color: #fef2f2; padding: 15px; border-radius: 6px; margin-bottom: 15px; border: 1px solid #fecaca;">
                <p style="color: #dc2626; margin-bottom: 5px;">
                  <strong>Your Current CIBIL Score: ${displayCibilScore}</strong>
                </p>
                <div style="background-color: #fef2f2; padding: 10px; border-radius: 4px; border-left: 4px solid #ef4444;">
                  <p style="color: #dc2626; margin: 0; font-weight: bold;">
                    ⚠️ Your CIBIL score is currently low. Please take necessary action to improve your credit rating.
                  </p>
                  <p style="color: #7f1d1d; margin: 5px 0 0 0; font-size: 14px;">
                    We recommend consulting with our financial advisors for credit improvement strategies.
                  </p>
                </div>
              </div>
              
              <p style="color: #374151; font-size: 14px; line-height: 1.6;">
                Despite your current credit score, we're committed to helping you achieve your financial goals. 
                Our team will work with you to find suitable loan options and provide guidance on improving your credit profile.
                Please don't hesitate to contact our support team for assistance.
              </p>
            </div>
            
            <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Best regards,<br>
                <strong>The CromaFin Team</strong>
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin-top: 10px;">
                This is an automated message. Please do not reply to this email.
              </p>
            </div>
          </div>
        `;

        const emailResponse = await resend.emails.send({
          from: 'CromaFin <cromafin2@gmail.com>',
          to: [user.email],
          subject: 'Important: Your Loan Process Update & Credit Score Information - CromaFin',
          html: emailContent,
        });

        console.log(`Email sent successfully to ${user.email}:`, emailResponse);
        emailResults.push({
          user_email: user.email,
          status: 'success',
          message_id: emailResponse.data?.id,
          displayed_cibil_score: displayCibilScore
        });

      } catch (emailError) {
        console.error(`Error sending email to ${user.email}:`, emailError);
        emailResults.push({
          user_email: user.email,
          status: 'failed',
          error: emailError.message
        });
      }
    }

    const successCount = emailResults.filter(r => r.status === 'success').length;
    const failureCount = emailResults.filter(r => r.status === 'failed').length;

    console.log(`Email sending completed. Success: ${successCount}, Failed: ${failureCount}`);

    return new Response(
      JSON.stringify({
        message: 'User message function completed - All users notified with low CIBIL scores',
        total_users: users.length,
        emails_sent: successCount,
        emails_failed: failureCount,
        results: emailResults
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in userMessage function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
