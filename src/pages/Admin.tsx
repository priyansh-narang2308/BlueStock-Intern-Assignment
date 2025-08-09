/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import {
  getIPOs,
  createIPO,
  updateIPO,
  deleteIPO,
  login,
  getAdminStats,
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "@/lib/api";

// Company type for local state
type Company = {
  id: string;
  name: string;
  sector: string;
  description?: string;
};

// IPO type for local state
type IPO = {
  id: string;
  companyName: string;
  logo?: string;
  priceRange: { min: number; max: number };
  openDate: string;
  closeDate: string;
  lotSize: number;
  issueSize: string;
  issueType: string;
  listingDate: string;
  sector: string;
  rhpLink: string;
  description: string;
  status: "upcoming" | "ongoing" | "closed" | "listed";
  featured?: boolean;
  currentReturn?: number;
  listingGain?: number;
};

// Company Management UI component props
type CompanySectionProps = {
  companies: Company[];
  setEditingCompany: React.Dispatch<React.SetStateAction<Company | null>>;
  setCompanyForm: React.Dispatch<React.SetStateAction<Partial<Company>>>;
  setIsCompanyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteCompany: (id: string) => Promise<void>;
  handleAddCompany: () => Promise<void>;
  handleUpdateCompany: () => Promise<void>;
  editingCompany: Company | null;
  companyForm: Partial<Company>;
  isCompanyModalOpen: boolean;
  token: string | null;
  toast: ReturnType<typeof useToast>['toast'];
};

const CompanySection: React.FC<CompanySectionProps> = ({
  companies,
  setEditingCompany,
  setCompanyForm,
  setIsCompanyModalOpen,
  handleDeleteCompany,
  handleAddCompany,
  handleUpdateCompany,
  editingCompany,
  companyForm,
  isCompanyModalOpen,
  token,
  toast,
}) => (
  <Card className="mb-8">
    <CardHeader className="flex flex-row items-center justify-between space-y-0">
      <CardTitle>Manage Companies</CardTitle>
      <Dialog open={isCompanyModalOpen} onOpenChange={setIsCompanyModalOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Company
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingCompany ? `Edit Company: ${editingCompany.name}` : "Add New Company"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Company Name *</Label>
              <Input
                value={companyForm.name || ""}
                onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                placeholder="Enter company name"
              />
            </div>
            <div>
              <Label>Sector *</Label>
              <Input
                value={companyForm.sector || ""}
                onChange={(e) => setCompanyForm({ ...companyForm, sector: e.target.value })}
                placeholder="Enter sector"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={companyForm.description || ""}
                onChange={(e) => setCompanyForm({ ...companyForm, description: e.target.value })}
                placeholder="Enter company description"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => { setIsCompanyModalOpen(false); setEditingCompany(null); setCompanyForm({}); }}>
              Cancel
            </Button>
            <Button onClick={editingCompany ? handleUpdateCompany : handleAddCompany} className="bg-blue-600 hover:bg-blue-700">
              {editingCompany ? "Update Company" : "Add Company"}
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
              <TableHead>Name</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.sector}</TableCell>
                <TableCell>{company.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => { setEditingCompany(company); setCompanyForm(company); setIsCompanyModalOpen(true); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700" variant="outline" size="sm" onClick={() => handleDeleteCompany(company.id)}>
                      <Trash2 className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [token, setToken] = useState<string | null>(null);
  const [allIPOs, setAllIPOs] = useState<any[]>([]);
  const [stats, setStats] = useState<{
    ipos: number;
    companies: number;
  } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingIPO, setEditingIPO] = useState<IPO | null>(null);
  const [formData, setFormData] = useState<Partial<IPO>>({});
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ipoToDelete, setIpoToDelete] = useState<string | null>(null);
  // Company state
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [companyForm, setCompanyForm] = useState<Partial<Company>>({});

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (err) {
      setCompanies([]);
    }
  };

  const handleAddCompany = async () => {
    if (!companyForm.name || !companyForm.sector) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    try {
      await createCompany(companyForm, token!);
      toast({
        title: "Company Added",
        description: `${companyForm.name} has been added successfully`,
      });
      setCompanyForm({});
      setIsCompanyModalOpen(false);
      fetchCompanies();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add company",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCompany = async () => {
    if (!editingCompany) return;
    try {
      await updateCompany(editingCompany.id, companyForm, token!);
      toast({
        title: "Company Updated",
        description: `${editingCompany.name} has been updated successfully`,
      });
      setEditingCompany(null);
      setCompanyForm({});
      setIsCompanyModalOpen(false);
      fetchCompanies();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update company",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCompany = async (id: string) => {
    try {
      await deleteCompany(id, token!);
      toast({
        title: "Company Deleted",
        description: "Company has been removed successfully",
      });
      fetchCompanies();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete company",
        variant: "destructive",
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(loginForm.email, loginForm.password);
      setToken(res.token);
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the IPO Admin Dashboard",
      });
      fetchCompanies(); // Fetch companies after login
    } catch (err) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: "", password: "" });
    setToken(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
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

  const handleAddIPO = async () => {
    if (!formData.companyName || !formData.sector) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    try {
      await createIPO(formData, token!);
      toast({
        title: "IPO Added",
        description: `${formData.companyName} has been added successfully`,
      });
      setFormData({});
      setIsAddModalOpen(false);
      fetchIPOs();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add IPO",
        variant: "destructive",
      });
    }
  };

  const handleEditIPO = (ipo: IPO) => {
    setEditingIPO(ipo);
    setFormData(ipo);
  };

  const handleUpdateIPO = async () => {
    if (!editingIPO) return;
    try {
      await updateIPO(editingIPO.id, formData, token!);
      toast({
        title: "IPO Updated",
        description: `${editingIPO.companyName} has been updated successfully`,
      });
      setEditingIPO(null);
      setFormData({});
      fetchIPOs();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update IPO",
        variant: "destructive",
      });
    }
  };

  const handleDeleteIPO = async (id: string) => {
    try {
      await deleteIPO(id, token!);
      toast({
        title: "IPO Deleted",
        description: "IPO has been removed successfully",
      });
      fetchIPOs();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete IPO",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="info">Upcoming</Badge>;
      case "ongoing":
        return <Badge variant="success">Ongoing</Badge>;
      case "closed":
        return <Badge variant="warning">Closed</Badge>;
      case "listed":
        return <Badge variant="secondary">Listed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const fetchIPOs = async () => {
    try {
      const ipos = await getIPOs();
      setAllIPOs(ipos);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch IPOs",
        variant: "destructive",
      });
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await getAdminStats(token!);
      setStats(statsData);
    } catch (err) {
      setStats(null);
    }
  };

  useEffect(() => {
    if (isLoggedIn && token) {
      fetchIPOs();
      fetchStats();
      fetchCompanies();
    }
  }, [isLoggedIn, token]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Admin Login
            </CardTitle>
            <p className="text-gray-600">Access the IPO Management Dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Button>
              <p className="text-sm text-gray-900 text-center">
                Demo email: admin@example.com <br />
                Demo password: your_admin_password
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
              <h1 className="text-2xl font-bold text-gray-900">
                IPO Admin Dashboard
              </h1>
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
                <p className="text-2xl font-bold text-blue-600">
                  {allIPOs.filter((ipo) => ipo.status === "upcoming").length}
                </p>
                <p className="text-gray-600">Upcoming IPOs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {allIPOs.filter((ipo) => ipo.status === "ongoing").length}
                </p>
                <p className="text-gray-600">Ongoing IPOs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {allIPOs.filter((ipo) => ipo.status === "closed").length}
                </p>
                <p className="text-gray-600">Closed IPOs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {allIPOs.filter((ipo) => ipo.status === "listed").length}
                </p>
                <p className="text-gray-600">Listed IPOs</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <CompanySection
          companies={companies}
          setEditingCompany={setEditingCompany}
          setCompanyForm={setCompanyForm}
          setIsCompanyModalOpen={setIsCompanyModalOpen}
          handleDeleteCompany={handleDeleteCompany}
          handleAddCompany={handleAddCompany}
          handleUpdateCompany={handleUpdateCompany}
          editingCompany={editingCompany}
          companyForm={companyForm}
          isCompanyModalOpen={isCompanyModalOpen}
          token={token}
          toast={toast}
        />

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
                      value={formData.companyName || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyName: e.target.value,
                        })
                      }
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Label>Sector *</Label>
                    <Input
                      value={formData.sector || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, sector: e.target.value })
                      }
                      placeholder="Enter sector"
                    />
                  </div>
                  <div>
                    <Label>Price Min (₹)</Label>
                    <Input
                      type="number"
                      value={formData.priceRange?.min || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priceRange: {
                            ...formData.priceRange,
                            min: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Price Max (₹)</Label>
                    <Input
                      type="number"
                      value={formData.priceRange?.max || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priceRange: {
                            ...formData.priceRange,
                            max: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Open Date</Label>
                    <Input
                      type="date"
                      value={formData.openDate || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, openDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Close Date</Label>
                    <Input
                      type="date"
                      value={formData.closeDate || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, closeDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Lot Size</Label>
                    <Input
                      type="number"
                      value={formData.lotSize || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lotSize: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Issue Size</Label>
                    <Input
                      value={formData.issueSize || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, issueSize: e.target.value })
                      }
                      placeholder="e.g., 500 Cr."
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={formData.status || ""}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value as any })
                      }
                    >
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
                      value={formData.rhpLink || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, rhpLink: e.target.value })
                      }
                      placeholder="Enter RHP URL"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Enter company description"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddIPO}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
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
                      <TableCell className="font-medium">
                        {ipo.companyName}
                      </TableCell>
                      <TableCell>{ipo.sector}</TableCell>
                      <TableCell>
                        {ipo.priceRange.min === 0 && ipo.priceRange.max === 0
                          ? "Not Set"
                          : `₹${ipo.priceRange.min} - ₹${ipo.priceRange.max}`}
                      </TableCell>
                      <TableCell>{ipo.openDate || "Not Set"}</TableCell>
                      <TableCell>{getStatusBadge(ipo.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditIPO(ipo)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            className="bg-red-600 hover:bg-red-700"
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
                    value={formData.companyName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Sector</Label>
                  <Input
                    value={formData.sector || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, sector: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Price Min (₹)</Label>
                  <Input
                    type="number"
                    value={formData.priceRange?.min || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priceRange: {
                          ...formData.priceRange,
                          min: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Price Max (₹)</Label>
                  <Input
                    type="number"
                    value={formData.priceRange?.max || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priceRange: {
                          ...formData.priceRange,
                          max: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select
                    value={formData.status || ""}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value as any })
                    }
                  >
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
                    value={formData.lotSize || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lotSize: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setEditingIPO(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateIPO}
                  className="bg-blue-600 hover:bg-blue-700"
                >
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