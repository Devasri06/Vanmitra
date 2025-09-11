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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
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
      <div className={`flex transition-all duration-300 ${isMapFullscreen ? 'fixed inset-0 z-50' : 'min-h-[calc(100vh-80px)]'}`}>
        {/* Left Panel - Schemes */}
        <div className={`bg-card border-r transition-all duration-300 ${isMapFullscreen ? 'w-0 overflow-hidden' : 'w-full lg:w-1/2'}`}>
          <div className="p-6 space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Available Schemes</CardTitle>
                <Badge variant="secondary">{filteredSchemes.length} schemes</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredSchemes.map((scheme) => (
                  <Card key={scheme.id} className="border-l-4 border-l-primary">
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
            <Card className="border-orange-200 bg-orange-50/50">
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