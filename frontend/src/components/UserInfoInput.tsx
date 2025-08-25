import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

interface UserInfoProps {
  fullName: string;
  email: string;
  phone: string;
  onFullNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

export const UserInfoInput: React.FC<UserInfoProps> = ({
  fullName,
  email,
  phone,
  onFullNameChange,
  onEmailChange,
  onPhoneChange
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-medium hover:shadow-large transition-smooth">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-foreground">
              Personal Information
            </h3>
            <p className="text-muted-foreground mt-2">
              Please provide your contact details for the resume header
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => onFullNameChange(e.target.value)}
                className="transition-smooth focus:shadow-soft"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                className="transition-smooth focus:shadow-soft"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                className="transition-smooth focus:shadow-soft"
              />
            </div>
          </div>

          <div className="mt-4 p-3 bg-accent-light/20 rounded-lg border border-accent/20">
            <p className="text-sm text-muted-foreground">
              💡 This information will be used as the header for your generated resume and cover letter.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};