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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Claimant Details</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Claim Type</TableHead>
              <TableHead>Land Area</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClaims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{claim.name}</p>
                    <p className="text-sm text-muted-foreground">{claim.tribalGroup}</p>
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
                  <Badge variant="outline" className="text-xs">
                    {claim.claimType.split(' (')[1]?.replace(')', '') || claim.claimType}
                  </Badge>
                </TableCell>
                <TableCell>{claim.landArea}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(claim.status)}
                    <Badge variant={getStatusVariant(claim.status)} className="text-xs">
                      {claim.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(claim.submittedDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetails(claim)}
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
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium">No claims found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search criteria
          </p>
        </div>
      )}

      {/* Claim Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Claim Details - {selectedClaim?.name}</DialogTitle>
          </DialogHeader>

          {selectedClaim && (
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Claimant Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-sm text-muted-foreground">{selectedClaim.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Father's Name</p>
                      <p className="text-sm text-muted-foreground">{selectedClaim.fatherName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tribal Group</p>
                      <p className="text-sm text-muted-foreground">{selectedClaim.tribalGroup}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedClaim.village}, {selectedClaim.district}, {selectedClaim.state}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Claim Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Claim Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Claim Type</p>
                      <p className="text-sm text-muted-foreground">{selectedClaim.claimType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Land Area</p>
                      <p className="text-sm text-muted-foreground">{selectedClaim.landArea}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">GPS Coordinates</p>
                      <p className="text-sm text-muted-foreground">{selectedClaim.gpsCoordinates}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Submitted Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedClaim.submittedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Current Status</p>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedClaim.status)}
                      <Badge variant={getStatusVariant(selectedClaim.status)}>
                        {selectedClaim.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Uploaded Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedClaim.documents.map((doc: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Status Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Update Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(selectedClaim.id, 'Approved')}
                      disabled={selectedClaim.status === 'Approved'}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleUpdateStatus(selectedClaim.id, 'Rejected')}
                      disabled={selectedClaim.status === 'Rejected'}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(selectedClaim.id, 'Under Review')}
                      disabled={selectedClaim.status === 'Under Review'}
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