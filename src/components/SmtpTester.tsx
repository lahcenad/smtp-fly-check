
import React, { useState } from "react";
import SmtpForm from "./SmtpForm";
import ResultDisplay from "./ResultDisplay";

interface SmtpFormData {
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

const SmtpTester: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    logs: string[];
    timestamp?: string;
  } | null>(null);

  const handleTest = async (data: SmtpFormData) => {
    setStatus("loading");
    
    // In a real implementation, this would be an API call to a backend service
    // that would perform the actual SMTP test. Since we're just in the frontend,
    // we'll simulate a test with a timeout.
    
    // Simulate network request delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate some fake logs
    const logs = [
      `[${new Date().toISOString()}] Starting SMTP test for ${data.host}:${data.port}`,
      `[${new Date().toISOString()}] Attempting to connect with ${data.encryption} encryption`,
    ];
    
    if (data.auth) {
      logs.push(`[${new Date().toISOString()}] Using authentication with username: ${data.username}`);
    }
    
    // Simulate different testing scenarios based on the hostname
    // This is just for demo purposes - in a real app this would be actual test results
    if (data.host.includes("error")) {
      logs.push(`[${new Date().toISOString()}] ERROR: Connection refused`);
      setResult({
        success: false,
        message: "Failed to connect to SMTP server. Connection refused.",
        logs,
        timestamp: new Date().toLocaleTimeString(),
      });
      setStatus("error");
    } else if (data.host.includes("timeout")) {
      logs.push(`[${new Date().toISOString()}] ERROR: Connection timeout`);
      setResult({
        success: false,
        message: "SMTP server connection timed out. Please check your server address.",
        logs,
        timestamp: new Date().toLocaleTimeString(),
      });
      setStatus("error");
    } else if (data.host.includes("auth") && (!data.username || !data.password)) {
      logs.push(`[${new Date().toISOString()}] ERROR: Authentication required`);
      setResult({
        success: false,
        message: "Authentication required. Please provide username and password.",
        logs,
        timestamp: new Date().toLocaleTimeString(),
      });
      setStatus("error");
    } else {
      logs.push(`[${new Date().toISOString()}] Successfully connected to SMTP server`);
      logs.push(`[${new Date().toISOString()}] Preparing test email from ${data.from} to ${data.to}`);
      logs.push(`[${new Date().toISOString()}] Email subject: ${data.subject}`);
      logs.push(`[${new Date().toISOString()}] Email sent successfully`);
      setResult({
        success: true,
        message: "Successfully connected to SMTP server and sent test email!",
        logs,
        timestamp: new Date().toLocaleTimeString(),
      });
      setStatus("success");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <SmtpForm onTest={handleTest} isLoading={status === "loading"} />
      <div className="mt-6">
        <ResultDisplay status={status} result={result} />
      </div>
    </div>
  );
};

export default SmtpTester;
