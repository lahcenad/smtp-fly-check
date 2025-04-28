
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SmtpTestRequest {
  host: string;
  port: string;
  username: string;
  password: string;
  encryption: "none" | "tls" | "ssl";
  from: string;
  to: string;
  subject: string;
  message: string;
  auth: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { host, port, username, password, encryption, from, to, subject, message, auth }: SmtpTestRequest = await req.json();
    
    const logs: string[] = [];
    logs.push(`[${new Date().toISOString()}] Starting SMTP test for ${host}:${port}`);
    logs.push(`[${new Date().toISOString()}] Attempting to connect with ${encryption} encryption`);
    
    if (auth) {
      logs.push(`[${new Date().toISOString()}] Using authentication with username: ${username}`);
    }

    try {
      // Create SMTP client
      const client = new SMTPClient({
        connection: {
          hostname: host,
          port: parseInt(port),
          tls: encryption === "tls" || encryption === "ssl",
          auth: auth ? {
            username,
            password,
          } : undefined,
        },
      });

      logs.push(`[${new Date().toISOString()}] Successfully connected to SMTP server`);
      logs.push(`[${new Date().toISOString()}] Preparing test email from ${from} to ${to}`);
      logs.push(`[${new Date().toISOString()}] Email subject: ${subject}`);
      
      // Send the email
      await client.send({
        from,
        to,
        subject,
        content: message,
      });
      
      await client.close();
      
      logs.push(`[${new Date().toISOString()}] Email sent successfully`);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: "Successfully connected to SMTP server and sent test email!",
          logs,
          timestamp: new Date().toLocaleTimeString(),
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("SMTP Error:", error);
      logs.push(`[${new Date().toISOString()}] ERROR: ${error.message}`);
      
      return new Response(
        JSON.stringify({
          success: false,
          message: `Failed to send email: ${error.message}`,
          logs,
          timestamp: new Date().toLocaleTimeString(),
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Request Error:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: `Request error: ${error.message}`,
        logs: [`[${new Date().toISOString()}] ERROR: ${error.message}`],
        timestamp: new Date().toLocaleTimeString(),
      }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
