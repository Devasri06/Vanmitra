import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DSS from "@/components/DSS";
import UserMap from "./fra-atlas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Users,
  Search,
  Download,
  Eye,
  Activity,
  TreePine,
  Upload,
} from "lucide-react";
import FRAMap from "./FRAMap";
import ClaimsTable from "./ClaimsTable";
import { adminStats, analyticsData, activityLogs } from "@/data/mockData";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Form state for Digitization
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    district: "",
    village: "",
    coordinates: "",
    documents: { patta: null as File | null },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--accent))",
    "hsl(var(--muted))",
    "hsl(var(--destructive))",
  ];

  const exportData = (type: string) => {
    console.log(`Exporting ${type} data...`);
  };

  const handleFileChange = (field: string, files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [field]: "File size exceeds 5MB",
        }));
        return;
      }
      setFormData((prev) => ({
        ...prev,
        documents: { ...prev.documents, [field]: file },
      }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleValidateSave = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.village) newErrors.village = "Village is required";
    if (!formData.coordinates)
      newErrors.coordinates = "Coordinates are required";
    if (!formData.documents.patta)
      newErrors.patta = "Patta document is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Validated & Saved:", formData);
      alert("Form validated and saved successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-2 sm:px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <TreePine className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  VanMitra Insight - Admin
                </h1>
                <p className="text-sm text-muted-foreground">
                  Forest Rights Management Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => exportData("summary")}>
                <Download className="w-4 h-4 mr-2" />
                Export Reports
              </Button>
              <Button
                variant="ghost"
                onClick={() => (window.location.href = "/")}
              >
                Back to Portal
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-2 sm:px-4 py-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {adminStats.totalClaims.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">All time submissions</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {adminStats.approved.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(
                  (adminStats.approved / adminStats.totalClaims) * 100
                )}
                % approval rate
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {adminStats.pending.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {adminStats.rejected.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(
                  (adminStats.rejected / adminStats.totalClaims) * 100
                )}
                % rejection rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="map" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-6">
            <TabsTrigger value="map">FRA Atlas</TabsTrigger>
            <TabsTrigger value="claims">Claims Management</TabsTrigger>
            <TabsTrigger value="dss">DSS</TabsTrigger>
            <TabsTrigger value="digitization">Digitization</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          </TabsList>

          {/* FRA Atlas Tab */}
          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TreePine className="w-5 h-5" />
                  <span>FRA Atlas Map - Administrative View</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="fra" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="user">User Map</TabsTrigger>
                    <TabsTrigger value="fra">FRA Map</TabsTrigger>
                  </TabsList>

                  <TabsContent value="user">
                    <div className="h-[300px] sm:h-[400px] md:h-[600px]">
                      <UserMap />
                    </div>
                  </TabsContent>

                  <TabsContent value="fra">
                    <div className="h-[300px] sm:h-[400px] md:h-[600px]">
                      <FRAMap />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Claims Management Tab */}
          <TabsContent value="claims" className="space-y-6">
            <Card>
              <CardHeader className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Claims Management</span>
                  </CardTitle>
                  <Badge variant="secondary">
                    {adminStats.totalClaims} total claims
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative flex-1 w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, village, or claim ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => exportData("claims")}
                    className="w-full sm:w-auto"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Claims
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ClaimsTable searchQuery={searchQuery} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* DSS Tab */}
          <TabsContent value="dss">
            <DSS />
          </TabsContent>

          {/* Digitization Tab */}
          <TabsContent value="digitization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Digitization & Document Upload</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: FRA Map */}
                  <div className="h-[300px] sm:h-[400px] md:h-[600px] border rounded-lg">
                    <FRAMap />
                  </div>

                  {/* Right Column: Upload + Form */}
                  <div className="space-y-4">
                    {/* Patta Upload */}
                    <CardContent className="text-center border rounded-lg p-6">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        id="patta"
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange("patta", e.target.files)
                        }
                      />
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() =>
                          document.getElementById("patta")?.click()
                        }
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Patta
                      </Button>
                      {errors.patta && (
                        <p className="text-xs text-red-600 mt-2">
                          {errors.patta}
                        </p>
                      )}
                      {formData.documents.patta && !errors.patta && (
                        <p className="text-xs mt-2 text-green-600">
                          {formData.documents.patta.name}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Max 5MB, PDF/JPG/PNG
                      </p>
                    </CardContent>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-600">{errors.name}</p>
                      )}

                      <Input
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                      {errors.state && (
                        <p className="text-xs text-red-600">{errors.state}</p>
                      )}

                      <Input
                        name="district"
                        placeholder="District"
                        value={formData.district}
                        onChange={handleInputChange}
                      />
                      {errors.district && (
                        <p className="text-xs text-red-600">
                          {errors.district}
                        </p>
                      )}

                      <Input
                        name="village"
                        placeholder="Village"
                        value={formData.village}
                        onChange={handleInputChange}
                      />
                      {errors.village && (
                        <p className="text-xs text-red-600">
                          {errors.village}
                        </p>
                      )}

                      <Input
                        name="coordinates"
                        placeholder="Coordinates"
                        value={formData.coordinates}
                        onChange={handleInputChange}
                        className="sm:col-span-2"
                      />
                      {errors.coordinates && (
                        <p className="text-xs text-red-600">
                          {errors.coordinates}
                        </p>
                      )}
                    </div>

                    {/* Validate & Save Button */}
                    <Button
                      onClick={handleValidateSave}
                      className="w-full mt-4"
                    >
                      Validate & Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Approval Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.monthlyApprovals}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="approvals"
                        fill="hsl(var(--primary))"
                        name="Approvals"
                      />
                      <Bar
                        dataKey="rejections"
                        fill="hsl(var(--destructive))"
                        name="Rejections"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tribal Group Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analyticsData.tribalDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) =>
                          `${name} ${percentage}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="claims"
                      >
                        {analyticsData.tribalDistribution.map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          )
                        )}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Land Area Distribution</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportData("land-area")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={analyticsData.landAreaDistribution}
                      layout="horizontal"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="range" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--accent))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Recent Administrative Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityLogs.map((log, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 border-b pb-2"
                    >
                      <Eye className="w-4 h-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{log.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {log.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
