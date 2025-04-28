
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

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

interface SmtpFormProps {
  onTest: (data: SmtpFormData) => void;
  isLoading: boolean;
}

const SmtpForm: React.FC<SmtpFormProps> = ({ onTest, isLoading }) => {
  const [formData, setFormData] = useState<SmtpFormData>({
    host: "",
    port: "25",
    username: "",
    password: "",
    encryption: "none",
    from: "",
    to: "",
    subject: "SMTP Test Email",
    message: "This is a test email sent from the SMTP Fly Check tool.",
    auth: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof SmtpFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: keyof SmtpFormData, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTest(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">SMTP Server Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="host">SMTP Host</Label>
            <Input
              id="host"
              name="host"
              value={formData.host}
              onChange={handleChange}
              placeholder="smtp.example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="port">Port</Label>
            <Input
              id="port"
              name="port"
              value={formData.port}
              onChange={handleChange}
              placeholder="25, 465, 587, etc."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="encryption">Encryption</Label>
            <Select
              value={formData.encryption}
              onValueChange={(value) =>
                handleSelectChange(
                  "encryption",
                  value as "none" | "tls" | "ssl"
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select encryption type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="tls">TLS</SelectItem>
                <SelectItem value="ssl">SSL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="auth">Authentication</Label>
              <Switch
                id="auth"
                checked={formData.auth}
                onCheckedChange={(checked) =>
                  handleSwitchChange("auth", checked)
                }
              />
            </div>
          </div>
          {formData.auth && (
            <>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="username@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Test Email</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="sender@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="recipient@example.com"
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Test Email Subject"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message content..."
              className="w-full p-2 border rounded-md min-h-[100px] resize-y"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "Testing..." : "Test SMTP Connection"}
      </Button>
    </form>
  );
};

export default SmtpForm;
