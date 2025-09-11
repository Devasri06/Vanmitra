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
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Upload, FileText, CheckCircle } from 'lucide-react';
import { states, districts, tribalGroups } from '@/data/mockData';

interface NewClaimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const claimTypes = [
  'Individual Forest Rights (IFR)',
  'Community Forest Resources (CFR)',
  'Community Rights (CR)'
];

const NewClaimModal = ({ open, onOpenChange }: NewClaimModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    claimType: '',
    applicantName: '',
    fatherName: '',
    tribalGroup: '',
    village: '',
    district: '',
    state: '',
    landArea: '',
    gpsCoordinates: '',
    description: '',
    surveyNo: '',
    subDivision: '',
    plotNo: '',
    documents: {
      rationCard: null,
      landRecord: null,
      tribalCertificate: null,
      photos: null
    }
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    onOpenChange(false);
    // Reset form
    setCurrentStep(1);
    setFormData({
      claimType: '',
      applicantName: '',
      fatherName: '',
      tribalGroup: '',
      village: '',
      district: '',
      state: '',
      landArea: '',
      gpsCoordinates: '',
      description: '',
      surveyNo: '',
      subDivision: '',
      plotNo: '',
      documents: {
        rationCard: null,
        landRecord: null,
        tribalCertificate: null,
        photos: null
      }
    });
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="claimType">Claim Type *</Label>
          <Select value={formData.claimType} onValueChange={(value) => setFormData({...formData, claimType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select claim type" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border z-50">
              {claimTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tribalGroup">Tribal Group *</Label>
          <Select value={formData.tribalGroup} onValueChange={(value) => setFormData({...formData, tribalGroup: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select tribal group" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border z-50">
              {tribalGroups.map((group) => (
                <SelectItem key={group} value={group}>{group}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="applicantName">Applicant Name *</Label>
          <Input
            id="applicantName"
            value={formData.applicantName}
            onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
            placeholder="Enter full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fatherName">Father's/Husband's Name *</Label>
          <Input
            id="fatherName"
            value={formData.fatherName}
            onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
            placeholder="Enter father's/husband's name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value, district: ''})}>
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
          <Select value={formData.district} onValueChange={(value) => setFormData({...formData, district: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border z-50">
              {formData.state && districts[formData.state as keyof typeof districts]?.map((district) => (
                <SelectItem key={district} value={district}>{district}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="village">Village *</Label>
          <Input
            id="village"
            value={formData.village}
            onChange={(e) => setFormData({...formData, village: e.target.value})}
            placeholder="Enter village name"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="landArea">Land Area (hectares) *</Label>
          <Input
            id="landArea"
            type="number"
            step="0.1"
            value={formData.landArea}
            onChange={(e) => setFormData({...formData, landArea: e.target.value})}
            placeholder="Enter land area"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gpsCoordinates">GPS Coordinates (optional)</Label>
          <Input
            id="gpsCoordinates"
            value={formData.gpsCoordinates}
            onChange={(e) => setFormData({...formData, gpsCoordinates: e.target.value})}
            placeholder="e.g. 22.7196° N, 81.3469° E"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Land Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Describe boundaries, landmarks, and other relevant details"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="surveyNo">Survey Number</Label>
          <Input
            id="surveyNo"
            value={formData.surveyNo}
            onChange={(e) => setFormData({...formData, surveyNo: e.target.value})}
            placeholder="Enter survey number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subDivision">Sub-division</Label>
          <Input
            id="subDivision"
            value={formData.subDivision}
            onChange={(e) => setFormData({...formData, subDivision: e.target.value})}
            placeholder="Enter sub-division"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="plotNo">Plot Number</Label>
          <Input
            id="plotNo"
            value={formData.plotNo}
            onChange={(e) => setFormData({...formData, plotNo: e.target.value})}
            placeholder="Enter plot number"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-dashed border-primary/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-sm flex items-center justify-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Ration Card *</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Max 5MB, PDF/JPG/PNG</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed border-muted-foreground/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-sm flex items-center justify-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Land Record</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Optional</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed border-muted-foreground/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-sm flex items-center justify-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Tribal Certificate</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Optional</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed border-muted-foreground/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-sm flex items-center justify-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Land Photos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Optional, Multiple files</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold">Review Your Application</h3>
        <p className="text-sm text-muted-foreground">Please review all details before submitting</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Claim Type:</span>
            <span>{formData.claimType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Applicant Name:</span>
            <span>{formData.applicantName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Location:</span>
            <span>{formData.village}, {formData.district}, {formData.state}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Tribal Group:</span>
            <span>{formData.tribalGroup}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Land Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Land Area:</span>
            <span>{formData.landArea} hectares</span>
          </div>
          {formData.gpsCoordinates && (
            <div className="flex justify-between">
              <span className="font-medium">GPS Coordinates:</span>
              <span>{formData.gpsCoordinates}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Forest Rights Claim</DialogTitle>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <Badge variant="outline">{Math.round(progress)}% Complete</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </DialogHeader>

        <div className="mt-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              Submit Application
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewClaimModal;