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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  // Reset when modal closes
  useEffect(() => {
    if (!open) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const resetForm = () => {
    setCurrentStep(1);
    setFormData(initialFormData);
    setErrors({});
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      const { [field]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleFileChange = (field: keyof Documents, files: FileList | null) => {
    if (!files) return;

    if (field === 'photos') {
      const arr = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        documents: { ...prev.documents, photos: arr },
      }));
      clearError('photos');
    } else {
      const file = files[0];
      // file size check for rationCard (only required file)
      if (field === 'rationCard' && file && file.size > MAX_FILE_SIZE) {
        setErrors((prev) => ({
          ...prev,
          rationCard: 'File too large. Maximum allowed size is 5MB.',
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        documents: { ...prev.documents, [field]: file },
      }));
      clearError(field);
    }
  };

  const isStepFilled = (step: number): boolean => {
    switch (step) {
      case 1:
        return (
          formData.claimType.trim() !== '' &&
          formData.tribalGroup.trim() !== '' &&
          formData.applicantName.trim() !== '' &&
          formData.fatherName.trim() !== '' &&
          formData.state.trim() !== '' &&
          formData.district.trim() !== '' &&
          formData.village.trim() !== ''
        );
      case 2:
        return (
          formData.landArea !== '' &&
          !isNaN(Number(formData.landArea)) &&
          Number(formData.landArea) > 0 &&
          formData.description.trim() !== ''
        );
      case 3:
        return formData.documents.rationCard !== null;
      case 4:
      default:
        return true;
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.claimType.trim()) newErrors.claimType = 'Claim type is required.';
      if (!formData.tribalGroup.trim()) newErrors.tribalGroup = 'Tribal group is required.';
      if (!formData.applicantName.trim()) newErrors.applicantName = 'Applicant name is required.';
      if (!formData.fatherName.trim()) newErrors.fatherName = "Father's/Husband's name is required.";
      if (!formData.state.trim()) newErrors.state = 'State is required.';
      if (!formData.district.trim()) newErrors.district = 'District is required.';
      if (!formData.village.trim()) newErrors.village = 'Village is required.';
    }

    if (step === 2) {
      const area = formData.landArea;
      if (area === '' || isNaN(Number(area)) || Number(area) <= 0) {
        newErrors.landArea = 'Enter a valid land area (> 0).';
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Land description is required.';
      }
    }

    if (step === 3) {
      const rc = formData.documents.rationCard;
      if (!rc) {
        newErrors.rationCard = 'Ration card upload is required.';
      } else if (rc.size > MAX_FILE_SIZE) {
        newErrors.rationCard = 'Ration card is too large (max 5MB).';
      }
      // optional files: landRecord, tribalCertificate, photos — but we can still validate file sizes optionally
      const landRecord = formData.documents.landRecord;
      if (landRecord && landRecord.size > MAX_FILE_SIZE) {
        newErrors.landRecord = 'Land record file too large (max 5MB).';
      }
      const tribalCertificate = formData.documents.tribalCertificate;
      if (tribalCertificate && tribalCertificate.size > MAX_FILE_SIZE) {
        newErrors.tribalCertificate = 'Tribal certificate file too large (max 5MB).';
      }
      const photos = formData.documents.photos;
      if (photos && photos.some((f) => f.size > MAX_FILE_SIZE)) {
        newErrors.photos = 'One or more photos exceed 5MB.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    // Validate current step before moving forward
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(s + 1, totalSteps));
    } else {
      // keep the user on the same step; errors are shown inline
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = () => {
    // Validate all steps (1..3) before final submit
    const ok1 = validateStep(1);
    const ok2 = validateStep(2);
    const ok3 = validateStep(3);

    if (ok1 && ok2 && ok3) {
      // Finalize submission (send formData to API or parent)
      console.log('Submitting claim:', formData);
      // close modal
      onOpenChange(false);
      // reset
      resetForm();
      // optionally show toast/success (outside scope)
    } else {
      // If any validation fails, jump to the first invalid step
      if (!ok1) setCurrentStep(1);
      else if (!ok2) setCurrentStep(2);
      else if (!ok3) setCurrentStep(3);
    }
  };

  // Render helpers
  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Claim Type */}
        <div className="space-y-2">
          <Label htmlFor="claimType">Claim Type *</Label>
          <Select
            value={formData.claimType}
            onValueChange={(value) => {
              setFormData((p) => ({ ...p, claimType: value }));
              clearError('claimType');
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select claim type" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border z-50">
              {claimTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.claimType && <p className="text-xs text-red-600 mt-1">{errors.claimType}</p>}
        </div>

        {/* Tribal Group */}
        <div className="space-y-2">
          <Label htmlFor="tribalGroup">Tribal Group *</Label>
          <Select
            value={formData.tribalGroup}
            onValueChange={(value) => {
              setFormData((p) => ({ ...p, tribalGroup: value }));
              clearError('tribalGroup');
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tribal group" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border z-50">
              {tribalGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.tribalGroup && <p className="text-xs text-red-600 mt-1">{errors.tribalGroup}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Applicant Name */}
        <div className="space-y-2">
          <Label htmlFor="applicantName">Applicant Name *</Label>
          <Input
            id="applicantName"
            value={formData.applicantName}
            onChange={(e) => {
              setFormData((p) => ({ ...p, applicantName: e.target.value }));
              clearError('applicantName');
            }}
            placeholder="Enter full name"
            aria-invalid={!!errors.applicantName}
          />
          {errors.applicantName && <p className="text-xs text-red-600 mt-1">{errors.applicantName}</p>}
        </div>

        {/* Father's/Husband's Name */}
        <div className="space-y-2">
          <Label htmlFor="fatherName">Father's/Husband's Name *</Label>
          <Input
            id="fatherName"
            value={formData.fatherName}
            onChange={(e) => {
              setFormData((p) => ({ ...p, fatherName: e.target.value }));
              clearError('fatherName');
            }}
            placeholder="Enter father's/husband's name"
            aria-invalid={!!errors.fatherName}
          />
          {errors.fatherName && <p className="text-xs text-red-600 mt-1">{errors.fatherName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* State */}
        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Select
            value={formData.state}
            onValueChange={(value) => {
              setFormData((p) => ({ ...p, state: value, district: '' }));
              clearError('state');
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border z-50">
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && <p className="text-xs text-red-600 mt-1">{errors.state}</p>}
        </div>

        {/* District */}
        <div className="space-y-2">
          <Label htmlFor="district">District *</Label>
          <Select
            value={formData.district}
            onValueChange={(value) => {
              setFormData((p) => ({ ...p, district: value }));
              clearError('district');
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border z-50">
              {formData.state &&
                districts[formData.state as keyof typeof districts]?.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors.district && <p className="text-xs text-red-600 mt-1">{errors.district}</p>}
        </div>

        {/* Village */}
        <div className="space-y-2">
          <Label htmlFor="village">Village *</Label>
          <Input
            id="village"
            value={formData.village}
            onChange={(e) => {
              setFormData((p) => ({ ...p, village: e.target.value }));
              clearError('village');
            }}
            placeholder="Enter village name"
            aria-invalid={!!errors.village}
          />
          {errors.village && <p className="text-xs text-red-600 mt-1">{errors.village}</p>}
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
            onChange={(e) => {
              setFormData((p) => ({ ...p, landArea: e.target.value }));
              clearError('landArea');
            }}
            placeholder="Enter land area"
            aria-invalid={!!errors.landArea}
          />
          {errors.landArea && <p className="text-xs text-red-600 mt-1">{errors.landArea}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gpsCoordinates">GPS Coordinates (optional)</Label>
          <Input
            id="gpsCoordinates"
            value={formData.gpsCoordinates}
            onChange={(e) => setFormData((p) => ({ ...p, gpsCoordinates: e.target.value }))}
            placeholder="e.g. 22.7196° N, 81.3469° E"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Land Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => {
            setFormData((p) => ({ ...p, description: e.target.value }));
            clearError('description');
          }}
          placeholder="Describe boundaries, landmarks, and other relevant details"
          rows={4}
          aria-invalid={!!errors.description}
        />
        {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="surveyNo">Survey Number</Label>
          <Input
            id="surveyNo"
            value={formData.surveyNo}
            onChange={(e) => setFormData((p) => ({ ...p, surveyNo: e.target.value }))}
            placeholder="Enter survey number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subDivision">Sub-division</Label>
          <Input
            id="subDivision"
            value={formData.subDivision}
            onChange={(e) => setFormData((p) => ({ ...p, subDivision: e.target.value }))}
            placeholder="Enter sub-division"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="plotNo">Plot Number</Label>
          <Input
            id="plotNo"
            value={formData.plotNo}
            onChange={(e) => setFormData((p) => ({ ...p, plotNo: e.target.value }))}
            placeholder="Enter plot number"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ration Card */}
        <Card className="border-2 border-dashed border-primary/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-sm flex items-center justify-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Ration Card *</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              id="rationCard"
              className="hidden"
              onChange={(e) => handleFileChange('rationCard', e.target.files)}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('rationCard')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
            {errors.rationCard && <p className="text-xs text-red-600 mt-2">{errors.rationCard}</p>}
            {formData.documents.rationCard && !errors.rationCard && (
              <p className="text-xs mt-2 text-green-600">{formData.documents.rationCard.name}</p>
            )}
            <p className="text-xs text-muted-foreground mt-2">Max 5MB, PDF/JPG/PNG</p>
          </CardContent>
        </Card>

        {/* Land Record */}
        <Card className="border-2 border-dashed border-muted-foreground/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-sm flex items-center justify-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Land Record</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              id="landRecord"
              className="hidden"
              onChange={(e) => handleFileChange('landRecord', e.target.files)}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('landRecord')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
            {errors.landRecord && <p className="text-xs text-red-600 mt-2">{errors.landRecord}</p>}
            {formData.documents.landRecord && !errors.landRecord && (
              <p className="text-xs mt-2 text-green-600">{formData.documents.landRecord.name}</p>
            )}
            <p className="text-xs text-muted-foreground mt-2">Optional</p>
          </CardContent>
        </Card>

        {/* Tribal Certificate */}
        <Card className="border-2 border-dashed border-muted-foreground/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-sm flex items-center justify-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Tribal Certificate</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              id="tribalCertificate"
              className="hidden"
              onChange={(e) => handleFileChange('tribalCertificate', e.target.files)}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('tribalCertificate')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
            {errors.tribalCertificate && <p className="text-xs text-red-600 mt-2">{errors.tribalCertificate}</p>}
            {formData.documents.tribalCertificate && !errors.tribalCertificate && (
              <p className="text-xs mt-2 text-green-600">{formData.documents.tribalCertificate.name}</p>
            )}
            <p className="text-xs text-muted-foreground mt-2">Optional</p>
          </CardContent>
        </Card>

        {/* Land Photos */}
        <Card className="border-2 border-dashed border-muted-foreground/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-sm flex items-center justify-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Land Photos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              id="photos"
              className="hidden"
              multiple
              onChange={(e) => handleFileChange('photos', e.target.files)}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('photos')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
            {errors.photos && <p className="text-xs text-red-600 mt-2">{errors.photos}</p>}
            {formData.documents.photos.length > 0 && !errors.photos && (
              <ul className="text-xs mt-2 text-green-600 space-y-1">
                {formData.documents.photos.map((file, i) => (
                  <li key={i}>{file.name}</li>
                ))}
              </ul>
            )}
            <p className="text-xs text-muted-foreground mt-2">Optional, Multiple files (each ≤ 5MB)</p>
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
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext} disabled={!isStepFilled(currentStep)}>
              Next <ChevronRight className="w-4 h-4 ml-2" />
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
