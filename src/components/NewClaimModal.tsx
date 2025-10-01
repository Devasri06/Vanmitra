import React, { useEffect, useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  CheckCircle,
  User,
  Users,
  MapPin,
  Layers,
  Image,
  FileCheck,
} from 'lucide-react';
import { states, districts, tribalGroups } from '@/data/mockData';

interface Documents {
  rationCard: File | null;
  landRecord: File | null;
  tribalCertificate: File | null;
  photos: File[];
}

interface FormDataType {
  claimType: string;
  applicantName: string;
  fatherName: string;
  tribalGroup: string;
  village: string;
  district: string;
  state: string;
  landArea: string;
  gpsCoordinates: string;
  description: string;
  surveyNo: string;
  subDivision: string;
  plotNo: string;
  documents: Documents;
}

interface NewClaimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const claimTypes = [
  'Individual Forest Rights (IFR)',
  'Community Forest Resources (CFR)',
  'Community Rights (CR)',
];

const initialFormData: FormDataType = {
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
    photos: [],
  },
};

const NewClaimModal = ({ open, onOpenChange }: NewClaimModalProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataType>(initialFormData);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  // Reset when modal closes
  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setCurrentStep(1);
    setFormData(initialFormData);
  };

  const handleFileChange = (field: keyof Documents, files: FileList | null) => {
    if (!files) return;
    if (field === 'photos') {
      const arr = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        documents: { ...prev.documents, photos: arr },
      }));
    } else {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        documents: { ...prev.documents, [field]: file },
      }));
    }
  };

  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, totalSteps));
  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 1));
  const handleSubmit = () => {
    console.log('Submitting claim:', formData);
    onOpenChange(false);
    resetForm();
  };

  // Step 1
  // Step 1
  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Claim Type */}
        <div className="space-y-2">
          <Label htmlFor="claimType" className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-primary" /> Claim Type
          </Label>
          <Select
            value={formData.claimType}
            onValueChange={(value) =>
              setFormData((p) => ({ ...p, claimType: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select claim type" />
            </SelectTrigger>
            <SelectContent>
              {claimTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Applicant Name */}
        <div className="space-y-2">
          <Label htmlFor="applicantName" className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Applicant Name
          </Label>
          <Input
            id="applicantName"
            value={formData.applicantName}
            onChange={(e) =>
              setFormData((p) => ({ ...p, applicantName: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Father's/Husband's Name */}
        <div className="space-y-2">
          <Label htmlFor="fatherName" className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Father/Husband Name
          </Label>
          <Input
            id="fatherName"
            value={formData.fatherName}
            onChange={(e) =>
              setFormData((p) => ({ ...p, fatherName: e.target.value }))
            }
          />
        </div>

        {/* Tribal Group */}
        <div className="space-y-2">
          <Label htmlFor="tribalGroup" className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" /> Tribal Group
          </Label>
          <Select
            value={formData.tribalGroup}
            onValueChange={(value) =>
              setFormData((p) => ({ ...p, tribalGroup: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tribal group" />
            </SelectTrigger>
            <SelectContent>
              {tribalGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* State */}
        <div className="space-y-2">
          <Label htmlFor="state" className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> State
          </Label>
          <Select
            value={formData.state}
            onValueChange={(value) =>
              setFormData((p) => ({ ...p, state: value, district: '', block: '' }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* District */}
        <div className="space-y-2">
          <Label htmlFor="district" className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> District
          </Label>
          <Select
            value={formData.district}
            onValueChange={(value) =>
              setFormData((p) => ({ ...p, district: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent>
              {formData.state &&
                districts[formData.state as keyof typeof districts]?.map(
                  (district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  )
                )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Block */}
        <div className="space-y-2">
          <Label htmlFor="block" className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> Block
          </Label>
          <Input
            id="block"
            value={(formData as any).block || ''}
            onChange={(e) =>
              setFormData((p) => ({ ...p, block: e.target.value }))
            }
          />
        </div>

        {/* Village */}
        <div className="space-y-2">
          <Label htmlFor="village" className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> Village
          </Label>
          <Input
            id="village"
            value={formData.village}
            onChange={(e) =>
              setFormData((p) => ({ ...p, village: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );


  // Step 2
  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="landArea" className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" /> Land Area (hectares)
          </Label>
          <Input
            id="landArea"
            type="number"
            value={formData.landArea}
            onChange={(e) =>
              setFormData((p) => ({ ...p, landArea: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gpsCoordinates" className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> GPS Coordinates
          </Label>
          <Input
            id="gpsCoordinates"
            value={formData.gpsCoordinates}
            onChange={(e) =>
              setFormData((p) => ({ ...p, gpsCoordinates: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" /> Land Description
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((p) => ({ ...p, description: e.target.value }))
          }
        />
      </div>
    </div>
  );

  // Step 3
  const renderStep3 = () => (
    <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="border-2 border-dashed border-primary/50">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-sm flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" /> Ration Card
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <input
            type="file"
            id="rationCard"
            className="hidden"
            onChange={(e) => handleFileChange('rationCard', e.target.files)}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              document.getElementById('rationCard')?.click()
            }
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
          {formData.documents.rationCard && (
            <p className="text-xs mt-2 text-green-600">
              {formData.documents.rationCard.name}
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="border-2 border-dashed border-muted-foreground/50">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-sm flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" /> Land Record
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <input
            type="file"
            id="landRecord"
            className="hidden"
            onChange={(e) => handleFileChange('landRecord', e.target.files)}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              document.getElementById('landRecord')?.click()
            }
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
          {formData.documents.landRecord && (
            <p className="text-xs mt-2 text-green-600">
              {formData.documents.landRecord.name}
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="border-2 border-dashed border-muted-foreground/50">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-sm flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" /> Tribal Certificate
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <input
            type="file"
            id="tribalCertificate"
            className="hidden"
            onChange={(e) =>
              handleFileChange('tribalCertificate', e.target.files)
            }
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              document.getElementById('tribalCertificate')?.click()
            }
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
          {formData.documents.tribalCertificate && (
            <p className="text-xs mt-2 text-green-600">
              {formData.documents.tribalCertificate.name}
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="border-2 border-dashed border-muted-foreground/50">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-sm flex items-center justify-center gap-2">
            <Image className="w-4 h-4" /> Land Photos
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <input
            type="file"
            id="photos"
            className="hidden"
            multiple
            onChange={(e) => handleFileChange('photos', e.target.files)}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              document.getElementById('photos')?.click()
            }
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
          {formData.documents.photos.length > 0 && (
            <ul className="text-xs mt-2 text-green-600 space-y-1">
              {formData.documents.photos.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );

  // Step 4
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold">Review Your Application</h3>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Basic Information
          </CardTitle>
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
              <span className="text-sm font-medium">
                Step {currentStep} of {totalSteps}
              </span>
              <Badge variant="outline">
                {Math.round(progress)}% Complete
              </Badge>
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
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Submit Application</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewClaimModal;
