import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import { claimHolders } from '@/data/mockData';

interface ClaimsTableProps {
  searchQuery: string;
}

const ClaimsTable = ({ searchQuery }: ClaimsTableProps) => {
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredClaims = claimHolders.filter((claim) =>
    claim.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.claimType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'under review':
        return <Eye className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'default' as const;
      case 'rejected':
        return 'destructive' as const;
      case 'pending':
        return 'secondary' as const;
      case 'under review':
        return 'outline' as const;
      default:
        return 'secondary' as const;
    }
  };

  const handleViewDetails = (claim: any) => {
    setSelectedClaim(claim);
    setIsDetailsOpen(true);
  };

  const handleUpdateStatus = (claimId: number, newStatus: string) => {
    console.log(`Updating claim ${claimId} status to ${newStatus}`);
    // Implementation for status update
  };

  return (
    <>
      <div className="rounded-xl border bg-white shadow-sm overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-xs sm:text-sm font-semibold text-gray-700">Claimant</TableHead>
              <TableHead className="text-xs sm:text-sm font-semibold text-gray-700">Location</TableHead>
              <TableHead className="text-xs sm:text-sm font-semibold text-gray-700">Claim Type</TableHead>
              <TableHead className="text-xs sm:text-sm font-semibold text-gray-700">Land Area</TableHead>
              <TableHead className="text-xs sm:text-sm font-semibold text-gray-700">Status</TableHead>
              <TableHead className="text-xs sm:text-sm font-semibold text-gray-700">Submitted</TableHead>
              <TableHead className="w-[80px] text-xs sm:text-sm font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClaims.map((claim) => (
              <TableRow key={claim.id} className="hover:bg-gray-50 transition">
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-semibold text-base text-primary">{claim.name}</p>
                    <p className="text-xs text-muted-foreground">{claim.tribalGroup}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm">{claim.village}</p>
                    <p className="text-xs text-muted-foreground">
                      {claim.district}, {claim.state}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    {claim.claimType.split(' (')[1]?.replace(')', '') || claim.claimType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-sm">{claim.landArea}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(claim.status)}
                    <Badge variant={getStatusVariant(claim.status)} className="text-xs px-2 py-1">
                      {claim.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(claim.submittedDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetails(claim)}
                    className="rounded-full"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredClaims.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-14 h-14 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-semibold text-primary">No claims found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search criteria.
          </p>
        </div>
      )}

      {/* Claim Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-0">
          <DialogHeader className="bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-4 rounded-t-2xl">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Eye className="w-5 h-5 text-primary" />
              Claim Details - <span className="font-bold">{selectedClaim?.name}</span>
            </DialogTitle>
          </DialogHeader>

          {selectedClaim && (
            <div className="space-y-6 px-6 py-4">
              {/* Basic Information */}
              <Card className="bg-gray-50 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Claimant Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Name</p>
                      <p className="text-sm font-semibold">{selectedClaim.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Father's Name</p>
                      <p className="text-sm">{selectedClaim.fatherName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Tribal Group</p>
                      <p className="text-sm">{selectedClaim.tribalGroup}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Location</p>
                      <p className="text-sm">
                        {selectedClaim.village}, {selectedClaim.district}, {selectedClaim.state}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Claim Details */}
              <Card className="bg-gray-50 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Claim Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Claim Type</p>
                      <p className="text-sm">{selectedClaim.claimType}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Land Area</p>
                      <p className="text-sm">{selectedClaim.landArea}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">GPS Coordinates</p>
                      <p className="text-sm">{selectedClaim.gpsCoordinates}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Submitted Date</p>
                      <p className="text-sm">
                        {new Date(selectedClaim.submittedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Current Status</p>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedClaim.status)}
                      <Badge variant={getStatusVariant(selectedClaim.status)} className="text-xs px-2 py-1">
                        {selectedClaim.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card className="bg-gray-50 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Uploaded Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedClaim.documents.map((doc: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 p-2 border rounded bg-white shadow-sm">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Status Actions */}
              <Card className="bg-gray-50 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Update Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(selectedClaim.id, 'Approved')}
                      disabled={selectedClaim.status === 'Approved'}
                      className="flex-1"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleUpdateStatus(selectedClaim.id, 'Rejected')}
                      disabled={selectedClaim.status === 'Rejected'}
                      className="flex-1"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(selectedClaim.id, 'Under Review')}
                      disabled={selectedClaim.status === 'Under Review'}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Under Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClaimsTable;