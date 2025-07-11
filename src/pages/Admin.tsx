/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { IPO, upcomingIPOs, ongoingIPOs, listedIPOs } from '@/data/ipoData';
import { Plus, Edit, Trash2, Eye, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [allIPOs, setAllIPOs] = useState<IPO[]>([...upcomingIPOs, ...ongoingIPOs, ...listedIPOs]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingIPO, setEditingIPO] = useState<IPO | null>(null);
  const [formData, setFormData] = useState<Partial<IPO>>({});
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [ipoToDelete, setIpoToDelete] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin@123') {
      setIsLoggedIn(true);
      toast({
        title: 'Login Successful',
        description: 'Welcome to the IPO Admin Dashboard',
      });
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: '', password: '' });
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out',
    });
  };


const handleDeleteClick = (ipoId: string) => {
  setIpoToDelete(ipoId);
  setDeleteDialogOpen(true);
};

const handleConfirmDelete = () => {
  if (ipoToDelete) {
    handleDeleteIPO(ipoToDelete);
  }
  setDeleteDialogOpen(false);
  setIpoToDelete(null);
};
  const handleAddIPO = () => {
    if (!formData.companyName || !formData.sector) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const newIPO: IPO = {
      id: Date.now().toString(),
      companyName: formData.companyName || '',
      logo: '🏢',
      priceRange: {
        min: formData.priceRange?.min || 0,
        max: formData.priceRange?.max || 0
      },
      openDate: formData.openDate || '',
      closeDate: formData.closeDate || '',
      lotSize: formData.lotSize || 0,
      issueSize: formData.issueSize || '',
      issueType: formData.issueType || 'Book Built',
      listingDate: formData.listingDate || '',
      sector: formData.sector || '',
      rhpLink: formData.rhpLink || '#',
      description: formData.description || '',
      status: formData.status as any || 'upcoming'
    };

    setAllIPOs([...allIPOs, newIPO]);
    setFormData({});
    setIsAddModalOpen(false);
    toast({
      title: 'IPO Added',
      description: `${newIPO.companyName} has been added successfully`,
    });
  };

  const handleEditIPO = (ipo: IPO) => {
    setEditingIPO(ipo);
    setFormData(ipo);
  };

  const handleUpdateIPO = () => {
    if (!editingIPO) return;

    const updatedIPOs = allIPOs.map(ipo => 
      ipo.id === editingIPO.id ? { ...ipo, ...formData } : ipo
    );
    setAllIPOs(updatedIPOs);
    setEditingIPO(null);
    setFormData({});
    toast({
      title: 'IPO Updated',
      description: `${editingIPO.companyName} has been updated successfully`,
    });
  };

  const handleDeleteIPO = (id: string) => {
    const updatedIPOs = allIPOs.filter(ipo => ipo.id !== id);
    setAllIPOs(updatedIPOs);
    toast({
      title: 'IPO Deleted',
      description: 'IPO has been removed successfully',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="info">Upcoming</Badge>;
      case 'ongoing':
        return <Badge variant="success">Ongoing</Badge>;
      case 'closed':
        return <Badge variant="warning">Closed</Badge>;
      case 'listed':
        return <Badge variant="secondary">Listed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Admin Login</CardTitle>
            <p className="text-gray-600">Access the IPO Management Dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
              <p className="text-sm text-gray-900 text-center">
                Demo username: admin <br />
                Demo password: admin@123
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">IPO Admin Dashboard</h1>
              <Badge variant="success">Admin Panel</Badge>
            </div>
            <Link to={"/"}>
             <Button variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              GO TO MAIN PAGE
            </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{allIPOs.filter(ipo => ipo.status === 'upcoming').length}</p>
                <p className="text-gray-600">Upcoming IPOs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{allIPOs.filter(ipo => ipo.status === 'ongoing').length}</p>
                <p className="text-gray-600">Ongoing IPOs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{allIPOs.filter(ipo => ipo.status === 'closed').length}</p>
                <p className="text-gray-600">Closed IPOs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{allIPOs.filter(ipo => ipo.status === 'listed').length}</p>
                <p className="text-gray-600">Listed IPOs</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Manage IPOs</CardTitle>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add IPO
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New IPO</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Company Name *</Label>
                    <Input
                      value={formData.companyName || ''}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Label>Sector *</Label>
                    <Input
                      value={formData.sector || ''}
                      onChange={(e) => setFormData({...formData, sector: e.target.value})}
                      placeholder="Enter sector"
                    />
                  </div>
                  <div>
                    <Label>Price Min (₹)</Label>
                    <Input
                      type="number"
                      value={formData.priceRange?.min || ''}
                      onChange={(e) => setFormData({...formData, priceRange: {...formData.priceRange, min: parseInt(e.target.value) || 0}})}
                    />
                  </div>
                  <div>
                    <Label>Price Max (₹)</Label>
                    <Input
                      type="number"
                      value={formData.priceRange?.max || ''}
                      onChange={(e) => setFormData({...formData, priceRange: {...formData.priceRange, max: parseInt(e.target.value) || 0}})}
                    />
                  </div>
                  <div>
                    <Label>Open Date</Label>
                    <Input
                      type="date"
                      value={formData.openDate || ''}
                      onChange={(e) => setFormData({...formData, openDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Close Date</Label>
                    <Input
                      type="date"
                      value={formData.closeDate || ''}
                      onChange={(e) => setFormData({...formData, closeDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Lot Size</Label>
                    <Input
                      type="number"
                      value={formData.lotSize || ''}
                      onChange={(e) => setFormData({...formData, lotSize: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label>Issue Size</Label>
                    <Input
                      value={formData.issueSize || ''}
                      onChange={(e) => setFormData({...formData, issueSize: e.target.value})}
                      placeholder="e.g., 500 Cr."
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select value={formData.status || ''} onValueChange={(value) => setFormData({...formData, status: value as any})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="listed">Listed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>RHP Link</Label>
                    <Input
                      value={formData.rhpLink || ''}
                      onChange={(e) => setFormData({...formData, rhpLink: e.target.value})}
                      placeholder="Enter RHP URL"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Enter company description"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddIPO} className="bg-blue-600 hover:bg-blue-700">
                    Add IPO
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Price Range</TableHead>
                    <TableHead>Open Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allIPOs.map((ipo) => (
                    <TableRow key={ipo.id}>
                      <TableCell className="font-medium">{ipo.companyName}</TableCell>
                      <TableCell>{ipo.sector}</TableCell>
                      <TableCell>
                        {ipo.priceRange.min === 0 && ipo.priceRange.max === 0 
                          ? 'Not Set' 
                          : `₹${ipo.priceRange.min} - ₹${ipo.priceRange.max}`}
                      </TableCell>
                      <TableCell>{ipo.openDate || 'Not Set'}</TableCell>
                      <TableCell>{getStatusBadge(ipo.status)}</TableCell>
                      <TableCell>
                       <div className="flex space-x-2">
  <Button variant="outline" size="sm" onClick={() => handleEditIPO(ipo)}>
    <Edit className="w-4 h-4" />
  </Button>
  <Button 
  className='bg-red-600 hover:bg-red-700'
    variant="outline" 
    size="sm" 
    onClick={() => handleDeleteClick(ipo.id)}
  >
    <Trash2 className="w-4 h-4 text-white" />
  </Button>
</div>

<ConfirmationDialog
  isOpen={deleteDialogOpen}
  onClose={() => setDeleteDialogOpen(false)}
  onConfirm={handleConfirmDelete}
  title="Delete IPO"
  description="Are you sure you want to delete this IPO? This action cannot be undone."
/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {editingIPO && (
          <Dialog open={!!editingIPO} onOpenChange={() => setEditingIPO(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit IPO: {editingIPO.companyName}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Company Name</Label>
                  <Input
                    value={formData.companyName || ''}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Sector</Label>
                  <Input
                    value={formData.sector || ''}
                    onChange={(e) => setFormData({...formData, sector: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Price Min (₹)</Label>
                  <Input
                    type="number"
                    value={formData.priceRange?.min || ''}
                    onChange={(e) => setFormData({...formData, priceRange: {...formData.priceRange, min: parseInt(e.target.value) || 0}})}
                  />
                </div>
                <div>
                  <Label>Price Max (₹)</Label>
                  <Input
                    type="number"
                    value={formData.priceRange?.max || ''}
                    onChange={(e) => setFormData({...formData, priceRange: {...formData.priceRange, max: parseInt(e.target.value) || 0}})}
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={formData.status || ''} onValueChange={(value) => setFormData({...formData, status: value as any})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="listed">Listed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Lot Size</Label>
                  <Input
                    type="number"
                    value={formData.lotSize || ''}
                    onChange={(e) => setFormData({...formData, lotSize: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setEditingIPO(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateIPO} className="bg-blue-600 hover:bg-blue-700">
                  Update IPO
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Admin;
