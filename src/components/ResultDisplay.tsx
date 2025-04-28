
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, Server } from "lucide-react";

interface ResultDisplayProps {
  status: "idle" | "loading" | "success" | "error";
  result: {
    success: boolean;
    message: string;
    logs: string[];
    timestamp?: string;
  } | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ status, result }) => {
  if (status === "idle") {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-center py-8 text-gray-400">
          <Server className="h-12 w-12 mr-2" />
          <p className="text-lg">Enter your SMTP details and click Test to check your server</p>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-pulse">
            <Wifi className="h-12 w-12 text-blue-500" />
          </div>
          <p className="text-lg mt-2">Testing SMTP connection...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Test Results</h2>
        {result.timestamp && (
          <Badge variant="outline">{result.timestamp}</Badge>
        )}
      </div>

      <Alert
        className={`mb-4 ${
          result.success
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}
      >
        <div className="flex items-center">
          {result.success ? (
            <Wifi className="h-5 w-5 mr-2 text-green-500" />
          ) : (
            <WifiOff className="h-5 w-5 mr-2 text-red-500" />
          )}
          <AlertTitle className="text-lg font-medium">
            {result.success ? "Success" : "Failed"}
          </AlertTitle>
        </div>
        <AlertDescription className="mt-2">{result.message}</AlertDescription>
      </Alert>

      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">CONNECTION LOGS</h3>
        <div className="font-mono text-sm overflow-auto max-h-[300px] text-left">
          {result.logs.length > 0 ? (
            <ul className="space-y-1">
              {result.logs.map((log, index) => (
                <li key={index} className="pb-1 border-b border-gray-100">
                  {log}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No logs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
