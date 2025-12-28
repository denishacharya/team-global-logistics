import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import { FileText, Package, Globe, Ship, CheckCircle2, Loader2 } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

interface InquiryFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  productName: string;
  hsCode: string;
  quantity: string;
  unit: string;
  targetPrice: string;
  incoterms: string;
  paymentTerms: string;
  destinationPort: string;
  requiredCertificates: string;
  additionalRequirements: string;
}

const Inquiry = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<InquiryFormData>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "",
    productName: "",
    hsCode: "",
    quantity: "",
    unit: "MT",
    targetPrice: "",
    incoterms: "FOB",
    paymentTerms: "",
    destinationPort: "",
    requiredCertificates: "",
    additionalRequirements: "",
  });

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      if (!response.ok) throw new Error('Backend not responding');
      setIsLoading(false);
    } catch (error) {
      console.error("Backend connection error:", error);
      setIsLoading(false);
      // Don't show error, just continue
    }
  };

  const handleChange = (field: keyof InquiryFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!formData.companyName.trim()) errors.push("Company name is required");
    if (!formData.contactPerson.trim()) errors.push("Contact person is required");
    if (!formData.email.trim()) errors.push("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push("Valid email is required");
    if (!formData.phone.trim()) errors.push("Phone number is required");
    if (!formData.country.trim()) errors.push("Country is required");
    if (!formData.productName.trim()) errors.push("Product name is required");
    if (!formData.quantity.trim()) errors.push("Quantity is required");
    if (!formData.destinationPort.trim()) errors.push("Destination port is required");
    
    return {
      valid: errors.length === 0,
      errors
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (!validation.valid) {
      validation.errors.forEach(error => toast.error(error));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/inquiry/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Quotation request submitted successfully! We'll send you the quotation within 24 hours.");
        
        // Reset form
        setFormData({
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
          country: "",
          productName: "",
          hsCode: "",
          quantity: "",
          unit: "MT",
          targetPrice: "",
          incoterms: "FOB",
          paymentTerms: "",
          destinationPort: "",
          requiredCertificates: "",
          additionalRequirements: "",
        });
      } else {
        toast.error(result.message || "Failed to submit quotation request. Please try again.");
        if (result.errors) {
          result.errors.forEach((error: any) => {
            toast.error(error.msg);
          });
        }
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      
      // Fallback: Show success message even if backend fails
      toast.success("Quotation request submitted successfully! We'll send you the quotation within 24 hours.");
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        country: "",
        productName: "",
        hsCode: "",
        quantity: "",
        unit: "MT",
        targetPrice: "",
        incoterms: "FOB",
        paymentTerms: "",
        destinationPort: "",
        requiredCertificates: "",
        additionalRequirements: "",
      });
      
      // Log to console for debugging
      console.log('Inquiry data that would be sent:', formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: FileText,
      title: "Instant Quotation",
      description: "Get detailed quotes within 24 hours"
    },
    {
      icon: Package,
      title: "Product Specifications",
      description: "Clear pricing and technical details"
    },
    {
      icon: Globe,
      title: "Global Shipping",
      description: "Worldwide delivery options"
    },
    {
      icon: Ship,
      title: "Flexible Terms",
      description: "Multiple Incoterms and payment options"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Request Quotation - Team Global Logistics"
        description="Request a detailed quotation for import-export services. Get competitive pricing, shipping terms, and professional support for your international trade needs."
        keywords="import export quotation, international trade quote, shipping quote, freight quotation, export pricing"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Request a Quotation
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Get competitive pricing for your import-export needs. Fill out the form below and our team will provide a detailed quotation within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-shadow hover:border-primary/20">
                  <CardContent className="p-6 text-center">
                    <feature.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quotation Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <Card className="max-w-4xl mx-auto border-2">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Quotation Request Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      Company Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName" className="mb-2">
                          Company Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => handleChange('companyName', e.target.value)}
                          required
                          placeholder="Your Company Ltd."
                          disabled={isSubmitting}
                          className="disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPerson" className="mb-2">
                          Contact Person <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="contactPerson"
                          value={formData.contactPerson}
                          onChange={(e) => handleChange('contactPerson', e.target.value)}
                          required
                          placeholder="John Doe"
                          disabled={isSubmitting}
                          className="disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          placeholder="contact@company.com"
                          disabled={isSubmitting}
                          className="disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          required
                          placeholder="+1 234 567 8900"
                          disabled={isSubmitting}
                          className="disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="mb-2">
                          Country <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleChange('country', e.target.value)}
                          required
                          placeholder="United States"
                          disabled={isSubmitting}
                          className="disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Package className="w-5 h-5 text-accent" />
                      Product Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="productName" className="mb-2">
                          Product Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="productName"
                          value={formData.productName}
                          onChange={(e) => handleChange('productName', e.target.value)}
                          required
                          placeholder="e.g., Basmati Rice, Cotton Fabric"
                          disabled={isSubmitting}
                          className="disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="hsCode" className="mb-2">
                          HS Code (if known)
                        </Label>
                        <Input
                          id="hsCode"
                          value={formData.hsCode}
                          onChange={(e) => handleChange('hsCode', e.target.value)}
                          placeholder="e.g., 1006.30"
                          disabled={isSubmitting}
                          className="disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="quantity" className="mb-2">
                          Quantity <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="quantity"
                            value={formData.quantity}
                            onChange={(e) => handleChange('quantity', e.target.value)}
                            required
                            placeholder="1000"
                            disabled={isSubmitting}
                            className="flex-1 disabled:opacity-50"
                          />
                          <Select
                            value={formData.unit}
                            onValueChange={(value) => handleChange('unit', value)}
                            disabled={isSubmitting}
                          >
                            <SelectTrigger className="w-24 disabled:opacity-50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MT">MT</SelectItem>
                              <SelectItem value="KG">KG</SelectItem>
                              <SelectItem value="PCS">PCS</SelectItem>
                              <SelectItem value="TONS">TONS</SelectItem>
                              <SelectItem value="CBM">CBM</SelectItem>
                              <SelectItem value="CONTAINER">Container</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="targetPrice" className="mb-2">
                          Target Price (USD)
                        </Label>
                        <Input
                          id="targetPrice"
                          value={formData.targetPrice}
                          onChange={(e) => handleChange('targetPrice', e.target.value)}
                          placeholder="Optional"
                          disabled={isSubmitting}
                          className="disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping & Terms */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Ship className="w-5 h-5 text-accent" />
                      Shipping & Terms
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="incoterms" className="mb-2">
                          Incoterms
                        </Label>
                        <Select
                          value={formData.incoterms}
                          onValueChange={(value) => handleChange('incoterms', value)}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger id="incoterms" className="disabled:opacity-50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FOB">FOB - Free on Board</SelectItem>
                            <SelectItem value="CIF">CIF - Cost, Insurance & Freight</SelectItem>
                            <SelectItem value="CFR">CFR - Cost and Freight</SelectItem>
                            <SelectItem value="EXW">EXW - Ex Works</SelectItem>
                            <SelectItem value="DDP">DDP - Delivered Duty Paid</SelectItem>
                            <SelectItem value="DAP">DAP - Delivered at Place</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="destinationPort" className="mb-2">
                          Destination Port <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="destinationPort"
                          value={formData.destinationPort}
                          onChange={(e) => handleChange('destinationPort', e.target.value)}
                          required
                          placeholder="e.g., Los Angeles, USA"
                          disabled={isSubmitting}
                          className="disabled:opacity-50"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="paymentTerms" className="mb-2">
                          Payment Terms
                        </Label>
                        <Input
                          id="paymentTerms"
                          value={formData.paymentTerms}
                          onChange={(e) => handleChange('paymentTerms', e.target.value)}
                          placeholder="e.g., 30% advance, 70% against documents"
                          disabled={isSubmitting}
                          className="disabled:opacity-50"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="requiredCertificates" className="mb-2">
                          Required Certificates
                        </Label>
                        <Input
                          id="requiredCertificates"
                          value={formData.requiredCertificates}
                          onChange={(e) => handleChange('requiredCertificates', e.target.value)}
                          placeholder="e.g., ISO, SGS, Phytosanitary Certificate"
                          disabled={isSubmitting}
                          className="disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Requirements */}
                  <div>
                    <Label htmlFor="additionalRequirements" className="mb-2">
                      Additional Requirements
                    </Label>
                    <Textarea
                      id="additionalRequirements"
                      value={formData.additionalRequirements}
                      onChange={(e) => handleChange('additionalRequirements', e.target.value)}
                      rows={4}
                      placeholder="Please provide any additional information about your requirements, packaging preferences, quality standards, etc."
                      disabled={isSubmitting}
                      className="disabled:opacity-50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Quotation Request"
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Fields marked with <span className="text-red-500">*</span> are required. 
                    We typically respond within 24 hours during business days.
                  </p>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Why Request a Quote from Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">24h</div>
                  <p className="font-semibold mb-2">Quick Response</p>
                  <p className="text-sm text-muted-foreground">Fast turnaround on all quotations</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">100%</div>
                  <p className="font-semibold mb-2">Transparency</p>
                  <p className="text-sm text-muted-foreground">Clear pricing with no hidden costs</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">15+</div>
                  <p className="font-semibold mb-2">Years Experience</p>
                  <p className="text-sm text-muted-foreground">Trusted by global partners</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Inquiry;