
import React from "react";
import SmtpTester from "@/components/SmtpTester";
import { Server } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Server className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">SMTP Fly Check</h1>
            </div>
            <div>
              <span className="text-sm text-gray-500">
                Free SMTP Testing Tool
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Test Your SMTP Server on the Fly
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A simple, free web-based tool to verify your SMTP server
              configuration, debug email delivery issues, and test your email
              setup.
            </p>
          </div>

          <SmtpTester />

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">How it works</h2>
            <p className="text-gray-600 mb-4">
              SMTP Fly Check establishes a connection to your specified SMTP
              server and attempts to send a test email using the provided
              credentials. The tool provides real-time logs showing each step of
              the connection process to help you diagnose any issues.
            </p>
            <h3 className="text-lg font-semibold mb-2">Common SMTP Ports</h3>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Port 25: Standard SMTP (often blocked by ISPs)</li>
              <li>Port 465: SMTP over SSL</li>
              <li>Port 587: SMTP with STARTTLS (recommended)</li>
              <li>Port 2525: Alternative SMTP port</li>
            </ul>
            <p className="text-sm text-gray-500">
              Note: This tool does not store any of your SMTP credentials or
              email content. All testing is done in real-time in your browser.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} SMTP Fly Check. All rights reserved.</p>
          <p className="mt-1">
            A free developer tool for testing SMTP server configurations.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
