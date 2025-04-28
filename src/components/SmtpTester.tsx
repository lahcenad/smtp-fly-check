
import React, { useState } from "react";
import SmtpForm from "./SmtpForm";
import ResultDisplay from "./ResultDisplay";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const { toast } = useToast();

  const handleTest = async (data: SmtpFormData) => {
    setStatus("loading");
    
    try {
      const { data: responseData, error } = await supabase.functions.invoke("test-smtp", {
        body: data,
      });
      
      if (error) {
        console.error("Error invoking function:", error);
        setResult({
          success: false,
          message: `Error: ${error.message}`,
          logs: [`[${new Date().toISOString()}] ERROR: ${error.message}`],
          timestamp: new Date().toLocaleTimeString(),
        });
        setStatus("error");
        toast({
          variant: "destructive",
          title: "SMTP Test Failed",
          description: error.message
        });
        return;
      }

      setResult(responseData);
      setStatus(responseData.success ? "success" : "error");
      
      toast({
        variant: responseData.success ? "default" : "destructive",
        title: responseData.success ? "SMTP Test Completed" : "SMTP Test Failed",
        description: responseData.message,
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      setResult({
        success: false,
        message: `Unexpected error: ${err.message}`,
        logs: [`[${new Date().toISOString()}] ERROR: ${err.message}`],
        timestamp: new Date().toLocaleTimeString(),
      });
      setStatus("error");
      toast({
        variant: "destructive",
        title: "SMTP Test Failed",
        description: "An unexpected error occurred"
      });
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
