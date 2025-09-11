import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Clock, MessageCircle, FileText, Bug } from 'lucide-react';

interface SupportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const supportCategories = [
  'Technical Issue',
  'Claim Status Inquiry',
  'Document Upload Problem',
  'Account Access',
  'General Query',
  'Bug Report'
];

const SupportModal = ({ open, onOpenChange }: SupportModalProps) => {
  const [ticketData, setTicketData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: ''
  });

  const [showContactInfo, setShowContactInfo] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support ticket submitted:', ticketData);
    // Reset form and close modal
    setTicketData({
      name: '',
      email: '',
      phone: '',
      category: '',
      subject: '',
      message: ''
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Support Center</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Contact Info */}
          {showContactInfo && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>Quick Contact</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowContactInfo(false)}
                    className="h-6 w-6 p-0"
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Helpline</p>
                      <p className="text-sm text-muted-foreground">1800-123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@vanmitra.gov.in</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Working Hours</p>
                    <p className="text-sm text-muted-foreground">Monday - Friday, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Support Ticket Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Submit Support Ticket</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={ticketData.name}
                      onChange={(e) => setTicketData({...ticketData, name: e.target.value})}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={ticketData.email}
                      onChange={(e) => setTicketData({...ticketData, email: e.target.value})}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={ticketData.phone}
                      onChange={(e) => setTicketData({...ticketData, phone: e.target.value})}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Issue Category *</Label>
                    <Select value={ticketData.category} onValueChange={(value) => setTicketData({...ticketData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border z-50">
                        {supportCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={ticketData.subject}
                    onChange={(e) => setTicketData({...ticketData, subject: e.target.value})}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Detailed Message *</Label>
                  <Textarea
                    id="message"
                    value={ticketData.message}
                    onChange={(e) => setTicketData({...ticketData, message: e.target.value})}
                    placeholder="Please provide detailed information about your issue..."
                    rows={5}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">How do I check my claim status?</h4>
                <p className="text-sm text-muted-foreground">
                  You can check your claim status by contacting the admin or through the claims management system.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">What documents are required for FRA claims?</h4>
                <p className="text-sm text-muted-foreground">
                  Ration card is mandatory. Optional documents include land records, tribal certificate, and photographs.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">How long does the approval process take?</h4>
                <p className="text-sm text-muted-foreground">
                  The approval process typically takes 30-60 days depending on the complexity of the claim and document verification.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportModal;