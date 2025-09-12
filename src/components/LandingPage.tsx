import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Expand, FileText, HelpCircle, LogIn, Plus, AlertCircle } from 'lucide-react';
import AdminLoginModal from './AdminLoginModal';
import NewClaimModal from './NewClaimModal';
import SupportModal from './SupportModal';
import PetitionModal from './PetitionModal';
import FRAMap from './FRAMap';
import { schemes, states, districts, tribalGroups } from '@/data/mockData';
import heroForest from '@/assets/hero-forest.jpg';
import schemesIllustration from '@/assets/schemes-illustration.jpg';
import forestPattern from '@/assets/forest-pattern.jpg';

const LandingPage = () => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isNewClaimModalOpen, setIsNewClaimModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isPetitionModalOpen, setIsPetitionModalOpen] = useState(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTribalGroup, setSelectedTribalGroup] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchemes = schemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 relative">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{ backgroundImage: `url(${heroForest})` }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"
      />
      
      {/* Header */}
      <header className="relative border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">VanMitra Insight</h1>
                <p className="text-sm text-muted-foreground">Forest Rights Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsNewClaimModalOpen(true)}
                className="hidden sm:flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Claim</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSupportModalOpen(true)}
                className="p-2"
              >
                <HelpCircle className="w-5 h-5" />
              </Button>
              
              <Button
                onClick={() => setIsAdminModalOpen(true)}
                className="flex items-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Admin Login</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={`relative flex transition-all duration-300 ${isMapFullscreen ? 'fixed inset-0 z-50' : 'min-h-[calc(100vh-80px)]'}`}>
        {/* Left Panel - Schemes */}
        <div className={`bg-card/95 backdrop-blur border-r transition-all duration-300 relative ${isMapFullscreen ? 'w-0 overflow-hidden' : 'w-full lg:w-1/2'}`}>
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-5"
            style={{ backgroundImage: `url(${forestPattern})` }}
          />
          <div className="relative p-6 space-y-6 z-10">
            {/* Hero Section */}
            <div className="relative mb-6">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-2">Forest Rights Schemes</h2>
                    <p className="text-muted-foreground">Empowering forest communities through accessible government schemes</p>
                  </div>
                  <div className="hidden md:block">
                    <img 
                      src={schemesIllustration} 
                      alt="Government schemes illustration"
                      className="w-32 h-24 object-cover rounded-lg opacity-80"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <Card className="border-primary/20 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Search schemes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border z-50">
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border z-50">
                      {selectedState && districts[selectedState as keyof typeof districts]?.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Select value={selectedTribalGroup} onValueChange={setSelectedTribalGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Tribal Group" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border z-50">
                    {tribalGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Schemes List */}
            <Card className="border-primary/20 bg-card/80 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  Available Schemes
                </CardTitle>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {filteredSchemes.length} schemes
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredSchemes.map((scheme) => (
                  <Card key={scheme.id} className="border-l-4 border-l-primary bg-card/60 backdrop-blur hover:bg-card/80 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-sm">{scheme.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {scheme.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{scheme.description}</p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">Eligibility: {scheme.eligibility}</span>
                          <span className="font-medium text-primary">{scheme.amount}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Petition Section */}
            <Card className="border-orange-200 bg-gradient-to-r from-orange-50/50 to-yellow-50/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <span>File a Grievance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Didn't receive your scheme amount? File a petition for grievance redressal.
                </p>
                <Button
                  onClick={() => setIsPetitionModalOpen(true)}
                  className="w-full"
                  variant="outline"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  File Petition
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className={`bg-muted relative transition-all duration-300 ${isMapFullscreen ? 'w-full' : 'w-full lg:w-1/2'}`}>
          <FRAMap />
          
          {/* Fullscreen Toggle */}
          <Button
            onClick={() => setIsMapFullscreen(!isMapFullscreen)}
            className="absolute bottom-4 right-4 rounded-full w-12 h-12 p-0 z-10"
            variant="secondary"
          >
            <Expand className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Modals */}
      <AdminLoginModal open={isAdminModalOpen} onOpenChange={setIsAdminModalOpen} />
      <NewClaimModal open={isNewClaimModalOpen} onOpenChange={setIsNewClaimModalOpen} />
      <SupportModal open={isSupportModalOpen} onOpenChange={setIsSupportModalOpen} />
      <PetitionModal open={isPetitionModalOpen} onOpenChange={setIsPetitionModalOpen} />
    </div>
  );
};

export default LandingPage;