import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Home as HomeIcon } from 'lucide-react';
import {
  TreePine, User, FileText, CheckCircle, Clock, XCircle, Leaf, Plus, HelpCircle, AlertCircle
} from 'lucide-react';
import AdminLoginModal from './AdminLoginModal';
import NewClaimModal from './NewClaimModal';
import SupportModal from './SupportModal';
import PetitionModal from './PetitionModal';
import { schemes, states, districts, tribalGroups } from '@/data/mockData';
import heroForest from '@/assets/hero-forest.jpg';
import schemesIllustration from '@/assets/schemes-illustration.jpg';
import forestPattern from '@/assets/forest-pattern.jpg';
import HeroImage from '@/assets/HeroImage.jpg';
import { useNavigate } from 'react-router-dom';
import MoTA_logo from '@/assets/MoTA_logo.jpg'; // Assuming you have a logo image

const stats = [
  {
    title: 'Total Claims',
    value: '2,847',
    subtitle: 'All time submissions',
    icon: <FileText className="h-5 w-5 text-muted-foreground" />,
    border: 'border-l-4 border-l-primary',
    color: 'text-primary',
    subtitleColor: 'text-muted-foreground',
  },
  {
    title: 'Approved',
    value: '1,823',
    subtitle: '64% approval rate',
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    border: 'border-l-4 border-l-green-500',
    color: 'text-green-600',
    subtitleColor: 'text-muted-foreground',
  },
  {
    title: 'Pending',
    value: '687',
    subtitle: 'Awaiting review',
    icon: <Clock className="h-5 w-5 text-yellow-500" />,
    border: 'border-l-4 border-l-yellow-500',
    color: 'text-yellow-600',
    subtitleColor: 'text-muted-foreground',
  },
  {
    title: 'Rejected',
    value: '337',
    subtitle: '12% rejection rate',
    icon: <XCircle className="h-5 w-5 text-red-500" />,
    border: 'border-l-4 border-l-red-500',
    color: 'text-red-600',
    subtitleColor: 'text-muted-foreground',
  },
];

const infoBoxes = [
  {
    title: 'News Update',
    items: ['New GIS Mapping Feature Launched – view auto-plotted patta .','New FRA Atlas Dashboard – Live claim statistics now open to the public.'],
  },
  {
    title: 'Announcement',
    items: ['FRA Claims Training Workshop – Scheduled for 15 October 2025 in Bhubaneswar, Odisha.', 'Multi-Lingual Portal Live – FRA services now available in Hindi, Telugu, and Odia.'],
  },
  {
    title: 'Notice / Tender',
    items: ['Circular FRA/2025/002 – Guidelines-digital submission of FRA claims via VanMitra portal','Tender FRA/2025/005 – Procurement of satellite imagery services for FRA monitoring.'],
  },
];

const Home = () => {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isNewClaimModalOpen, setIsNewClaimModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isPetitionModalOpen, setIsPetitionModalOpen] = useState(false);

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTribalGroup, setSelectedTribalGroup] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const filteredSchemes = schemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={MoTA_logo}
            alt="MoTA Logo"
            className="h-12 w-auto object-contain"
          />

        </div>

        <div className="flex items-center gap-4">
          <Button
      variant="ghost"
      onClick={() => window.location.href = '/'}
      className="flex items-center gap-2"
    >
      <HomeIcon className="w-4 h-4" />
      <span>Home</span>
    </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/fra-atlas')}>FRA Atlas</Button>

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
            variant="outline"
            onClick={() => setAdminModalOpen(true)}
            className="flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Admin Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative w-full h-[350px] md:h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg text-white">
            VanMitra FRA Atlas & Decision Support System
          </h1>
          <p className="text-lg md:text-2xl text-white font-medium drop-shadow">
            For Integrated Monitoring of Forest Rights Act Implementation in Madhya Pradesh, Tripura, Odisha, and Telangana
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="w-full bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
              About VanMitra
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              Welcome to <span className="font-semibold text-primary">VanMitra Insight Hub</span>!
              Our mission is to empower communities and administrators with AI-powered tools
              for effective <span className="font-medium">Forest Rights Act</span> implementation.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Explore the <span className="font-semibold text-green-600">FRA Atlas</span>,
              monitor claims, and stay updated with the latest news, announcements, and tenders.
              Together, we work toward building transparent and inclusive governance
              for forest-dependent communities.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center">
            <img
              src={heroForest}
              alt="Forest landscape"
              className="rounded-2xl shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="w-full bg-gray-300 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`bg-white rounded-xl shadow-md p-6 flex flex-col justify-between ${stat.border}`}
            >
              <div className="flex flex-row items-center justify-between mb-2">
                <span className="text-base font-semibold">{stat.title}</span>
                {stat.icon}
              </div>
              <span className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className={`mt-2 text-sm ${stat.subtitleColor}`}>{stat.subtitle}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Info Boxes */}
      <section className="w-full py-10 px-4 bg-gray-300">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {infoBoxes.map((box, idx) => (
            <div
              key={box.title}
              className="bg-blue-100 border-2 border-blue-400 rounded-xl shadow p-6 flex flex-col"
              style={{
                backgroundImage: 'url(/images/leaves-bg.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <span className="bg-blue-600 text-white px-6 py-2 rounded-t-xl font-bold text-lg flex items-center gap-2">
                  {idx === 0 ? <Leaf className="w-5 h-5" /> : null}
                  {box.title}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {box.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-blue-700 font-semibold">
                    <Leaf className="w-4 h-4" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Schemes Section */}
      <section className="relative bg-gray-50 py-12 px-4">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${forestPattern})` }}
        />
        <div className="max-w-6xl mx-auto relative z-10 space-y-6">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20 flex items-center justify-between">
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
                <Card
                  key={scheme.id}
                  className="border-l-4 border-l-primary bg-card/60 backdrop-blur hover:bg-card/80 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                >
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



        </div>
      </section>

      {/* Footer */}
      <nav className="w-full bg-white shadow-inner px-6 py-3 flex items-center justify-between mt-auto">
        <span className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} VanMitra Insight Hub. All rights reserved.
        </span>
      </nav>

      {/* Modals */}
      <AdminLoginModal open={adminModalOpen} onOpenChange={setAdminModalOpen} />
      <NewClaimModal open={isNewClaimModalOpen} onOpenChange={setIsNewClaimModalOpen} />
      <SupportModal open={isSupportModalOpen} onOpenChange={setIsSupportModalOpen} />
      <PetitionModal open={isPetitionModalOpen} onOpenChange={setIsPetitionModalOpen} />
    </div>
  );
};

export default Home;
