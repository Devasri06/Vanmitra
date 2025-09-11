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
import { AlertTriangle, FileText, Send } from 'lucide-react';
import { schemes, states, districts } from '@/data/mockData';

interface PetitionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PetitionModal = ({ open, onOpenChange }: PetitionModalProps) => {
  const [petitionData, setPetitionData] = useState({
    name: '',
    fatherName: '',
    village: '',
    district: '',
    state: '',
    phone: '',
    schemeName: '',
    issueDescription: '',
    expectedAmount: '',
    applicationDate: '',
    referenceNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Petition submitted:', petitionData);
    // Reset form and close modal
    setPetitionData({
      name: '',
      fatherName: '',
      village: '',
      district: '',
      state: '',
      phone: '',
      schemeName: '',
      issueDescription: '',
      expectedAmount: '',
      applicationDate: '',
      referenceNumber: ''
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>File Grievance Petition</span>
          </DialogTitle>
        </DialogHeader>

        <Card className="border-orange-200 bg-orange-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-orange-700">Important Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-600">
              This petition will be reviewed by the concerned authorities. Please provide accurate information 
              and supporting details to help us resolve your issue quickly.
            </p>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={petitionData.name}
                    onChange={(e) => setPetitionData({...petitionData, name: e.target.value})}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fatherName">Father's/Husband's Name *</Label>
                  <Input
                    id="fatherName"
                    value={petitionData.fatherName}
                    onChange={(e) => setPetitionData({...petitionData, fatherName: e.target.value})}
                    placeholder="Enter father's/husband's name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select value={petitionData.state} onValueChange={(value) => setPetitionData({...petitionData, state: value, district: ''})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border z-50">
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Select value={petitionData.district} onValueChange={(value) => setPetitionData({...petitionData, district: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border z-50">
                      {petitionData.state && districts[petitionData.state as keyof typeof districts]?.map((district) => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="village">Village *</Label>
                  <Input
                    id="village"
                    value={petitionData.village}
                    onChange={(e) => setPetitionData({...petitionData, village: e.target.value})}
                    placeholder="Enter village name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={petitionData.phone}
                  onChange={(e) => setPetitionData({...petitionData, phone: e.target.value})}
                  placeholder="Enter mobile number"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Scheme Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Scheme & Issue Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schemeName">Scheme Name *</Label>
                <Select value={petitionData.schemeName} onValueChange={(value) => setPetitionData({...petitionData, schemeName: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scheme" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border z-50">
                    {schemes.map((scheme) => (
                      <SelectItem key={scheme.id} value={scheme.name}>
                        {scheme.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expectedAmount">Expected Amount</Label>
                  <Input
                    id="expectedAmount"
                    value={petitionData.expectedAmount}
                    onChange={(e) => setPetitionData({...petitionData, expectedAmount: e.target.value})}
                    placeholder="₹ Amount not received"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicationDate">Application Date</Label>
                  <Input
                    id="applicationDate"
                    type="date"
                    value={petitionData.applicationDate}
                    onChange={(e) => setPetitionData({...petitionData, applicationDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referenceNumber">Application/Reference Number</Label>
                <Input
                  id="referenceNumber"
                  value={petitionData.referenceNumber}
                  onChange={(e) => setPetitionData({...petitionData, referenceNumber: e.target.value})}
                  placeholder="Enter application or reference number if available"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issueDescription">Issue Description *</Label>
                <Textarea
                  id="issueDescription"
                  value={petitionData.issueDescription}
                  onChange={(e) => setPetitionData({...petitionData, issueDescription: e.target.value})}
                  placeholder="Please describe your issue in detail. Include when you applied, what documents you submitted, and what problem you are facing..."
                  rows={5}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex items-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Submit Petition</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PetitionModal;