import ServiceCard from "@/components/ServiceCard";
import LogisticsGlobe from "@/components/LogisticsGlobe";
import { motion } from "framer-motion";
import heroImage from "@/assets/team-global-logistics-service-img2.jpg";
import airFreight from "@/assets/air-freight-team-global-logistics.jpg";
import oceanFreight from "@/assets/ocean-freight-team-global-logistics.jpg";
import roadTransport from "@/assets/road-transport-team-global-logistics.jpg";
import warehouse from "@/assets/warehouse-team-global-logistics.jpg";
import containers from "@/assets/container-services-team-global-logistics.jpg";
import exim from "@/assets/EXIM-team-global-logistics.png";
import customsClearance from "@/assets/customs-clearance--team-global-logistics.jpg";
import projectCargo from "@/assets/project-cargo-team-global-logistics.png";
import support from "@/assets/expert-supports-team-global-logistics.jpg";
import insurance from "@/assets/cargo-insurance-team-global-logistics.jpg";
import service from "@/assets/service-team-global-logistics.jpg";
import reliable from "@/assets/secure-and-reliable-team-global-logistics.jpg";
import documentation from "@/assets/documentation-team-global-logistics.jpg";
import reefer_container from "@/assets/reefer-container-team-global-logistics.jpg";

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']">
              Our Services
            </h1>
            <p className="text-lg md:text-xl">
              Comprehensive logistics solutions designed to meet all your shipping and supply chain needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">Core Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional logistics services tailored to your business requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              image={airFreight}
              title="Air Freight"
              description="Expedited air cargo services for time-sensitive shipments. Fast transit times with door-to-door delivery options and real-time tracking."
            />
            <ServiceCard
              image={oceanFreight}
              title="Ocean Freight"
              description="Cost-effective sea freight solutions for FCL and LCL shipments. Competitive rates with flexible scheduling and global port coverage."
            />
            <ServiceCard
              image={roadTransport}
              title="Road Transport"
              description="Reliable ground transportation services across borders. Full truckload (FTL) and less than truckload (LTL) options available."
            />
            <ServiceCard
              image={exim}
              title="EXIM Services"
              description="We provide seamless support for EXIM Code Management to help businesses navigate the complexities of international trade."
            />
            <ServiceCard
              image={containers}
              title="Container Services"
              description="Full container load (FCL) and less container load (LCL) services with flexible container options and efficient loading."
            />
            <ServiceCard
              image={customsClearance}
              title="Customs Clearance"
              description="Expert customs brokerage services ensuring smooth clearance of your international shipments with all necessary documentation."
            />
            
          </div>
        </div>
      </motion.section>

      {/* Additional Services */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-secondary"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">Additional Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive support services to complement your logistics needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              image={warehouse}
              title="Warehousing"
              description="Secure storage facilities with inventory management, order fulfillment, and distribution services in strategic locations."
            />

            <ServiceCard
              image="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop"
              title="Supply Chain Management"
              description="Comprehensive end-to-end supply chain solutions that optimize your entire logistics network. We analyze, design, and implement strategies to reduce costs, improve efficiency, and enhance visibility across your supply chain operations."
            />
            <ServiceCard
              image={projectCargo}
              title="Project Cargo"
              description="Specialized handling of oversized, heavy, and complex cargo with customized logistics planning and execution."
            />
            <ServiceCard
              image={reefer_container}
              title="Reefer Cargo"
              description="Temperature-controlled shipping solutions for perishable goods, ensuring optimal conditions throughout transit."
            />
            <ServiceCard
              image={insurance}
              title="Cargo Insurance"
              description="Comprehensive insurance coverage protecting your shipments against loss or damage during transit worldwide."
            />
            <ServiceCard
              image={service}
              title="24/7 Support"
              description="Round-the-clock customer support ensuring you always have access to information and assistance when needed."
            />
              
          </div>
        </div>
      </motion.section>
      
      {/* 3D Logistics Globe */}
      <LogisticsGlobe />

      {/* Service Features - Why Choose Us */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the difference with our premium logistics services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1: Secure & Reliable */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group bg-card rounded-lg border border-border hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/30"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={reliable} 
                  alt="Secure & Reliable" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 font-['Poppins'] group-hover:text-primary transition-colors">
                  Secure & Reliable
                </h3>
                <p className="text-muted-foreground">
                  Advanced security protocols and reliable handling ensure your cargo arrives safely every time.
                </p>
              </div>
            </motion.div>

            {/* Feature 2: Real-Time Tracking */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group bg-card rounded-lg border border-border hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/30"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop" 
                  alt="Real-Time Tracking" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 font-['Poppins'] group-hover:text-primary transition-colors">
                  Real-Time Tracking
                </h3>
                <p className="text-muted-foreground">
                  Monitor your shipments 24/7 with our advanced tracking system for complete visibility.
                </p>
              </div>
            </motion.div>

            {/* Feature 3: Documentation */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group bg-card rounded-lg border border-border hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/30"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={documentation} 
                  alt="Documentation" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 font-['Poppins'] group-hover:text-primary transition-colors">
                  Documentation
                </h3>
                <p className="text-muted-foreground">
                  Expert handling of all shipping documents to ensure compliance and smooth customs clearance.
                </p>
              </div>
            </motion.div>

            {/* Feature 4: Expert Support */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group bg-card rounded-lg border border-border hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/30"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={support} 
                  alt="Expert Support" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 font-['Poppins'] group-hover:text-primary transition-colors">
                  Expert Support
                </h3>
                <p className="text-muted-foreground">
                  Dedicated account managers and 24/7 customer support to assist you at every step.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Services;