import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import ServiceCard from "@/components/ServiceCard";
import AnimatedSection from "@/components/AnimatedSection";
import Testimonials from "@/components/Testimonials";
import ClientLogos from "@/components/ClientLogos";
import MetricsDashboard from "@/components/MetricsDashboard";
import FAQ from "@/components/FAQ";
import PartnerSection from "@/components/PartnerSection";
import SEOHead, { OrganizationSchema } from "@/components/SEOHead";

import { Plane, Ship, Truck, Package, Globe, Clock, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import heroVideo from "@/assets/team-global-logisitcs.mp4";
import airFreight from "@/assets/air-freight-team-global-logistics.jpg";
import oceanFreight from "@/assets/ocean-freight-team-global-logistics.jpg";
import roadTransport from "@/assets/road-transport-team-global-logistics.jpg";
import customsClearance from "@/assets/customs-clearance--team-global-logistics.jpg";
import animation from "@/assets/Warehouse and delivery.lottie";

const Home: React.FC = () => {
  const floatingIconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // GSAP floating animation for hero icons
    floatingIconsRef.current.forEach((icon, index) => {
      if (icon) {
        gsap.to(icon, {
          y: -20,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2,
        });
      }
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* SEO */}
      <SEOHead
        title="Team Global Logistics - Best Cargo & Logistics Company in Nepal"
        description="Leading logistics company in Nepal offering air freight, sea freight, road transport, warehousing and import/export services. 15+ years experience, 50+ countries served."
        keywords="Team Global Logistics, logistics Nepal, cargo Nepal, air freight Nepal, sea freight Nepal, import export Nepal, best logistics company Nepal"
      />
      <OrganizationSchema />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-left flex flex-col items-start">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 font-['Poppins']"
          >
            Team Global Logistics
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl"
          >
            Nepal's Premier Cargo & Logistics Partner – Connecting Businesses Worldwide with Fast,
            Reliable, and Secure Shipping Solutions
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all"
              >
                <NavLink to="/inquiry">Get a Quote</NavLink>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />



      {/* Services Overview */}
<section className="py-20">
  <div className="container mx-auto px-4">
    <AnimatedSection className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins']">
        Our Services
      </h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        Comprehensive logistics solutions tailored to your business needs
      </p>
    </AnimatedSection>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AnimatedSection delay={0}>
        <div className="group bg-card rounded-lg border border-border hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/30 h-full">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={airFreight} 
              alt="Air Freight" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3 font-['Poppins'] group-hover:text-primary transition-colors">
              Air Freight
            </h3>
            <p className="text-muted-foreground">
              Fast and efficient air cargo services for urgent shipments worldwide
            </p>
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection delay={0.1}>
        <div className="group bg-card rounded-lg border border-border hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/30 h-full">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={oceanFreight} 
              alt="Ocean Freight" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3 font-['Poppins'] group-hover:text-primary transition-colors">
              Ocean Freight
            </h3>
            <p className="text-muted-foreground">
              Cost-effective sea freight solutions for large volume shipments
            </p>
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        <div className="group bg-card rounded-lg border border-border hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/30 h-full">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={roadTransport} 
              alt="Road Transport" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3 font-['Poppins'] group-hover:text-primary transition-colors">
              Road Transport
            </h3>
            <p className="text-muted-foreground">
              Reliable ground transportation across national and international routes
            </p>
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection delay={0.3}>
        <div className="group bg-card rounded-lg border border-border hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/30 h-full">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={customsClearance} 
              alt="Customs Clearance" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3 font-['Poppins'] group-hover:text-primary transition-colors">
              Customs Clearance
            </h3>
            <p className="text-muted-foreground">
              Expert handling of customs procedures for smooth import/export operations
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>

    <div className="text-center mt-10">
      <Button asChild size="lg" variant="outline">
        <NavLink to="/services">View All Services</NavLink>
      </Button>
    </div>
  </div>
</section>
      
  {/*
  <section className=" relative w-screen min-h-[80vh] flex items-center overflow-hidden px-16">

  <div className="flex-1 flex flex-col justify-center h-full max-w-xl">
    <h1 className="text-5xl md:text-6xl font-bold mb-4 font-['Poppins']">
      Team Global Logistics
    </h1>
    <p className="text-xl md:text-2xl text-muted-foreground mb-6">
      Nepal's Premier Cargo & Logistics Partner – Connecting Businesses Worldwide with Fast, Reliable, and Secure Shipping Solutions
    </p>
    <div className="flex gap-4">
      <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all">
        <NavLink to="/contact">Get a Quote</NavLink>
      </Button>
      <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
        <NavLink to="/services">Our Services</NavLink>
      </Button>
    </div>
  </div>


  <div className="flex-1 flex justify-start md:justify-center items-center h-full">
    <div className="w-full flex justify-center">
      <DotLottieReact
        src={animation}
        autoplay
        loop
        style={{
          width: "70%",       // adjust size
          height: "auto",     // maintain aspect ratio
          maxWidth: "700px",
        }}
      />
    </div>
  </div>
</section>
*/}

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins']">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your trusted partner for seamless global logistics
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: "Global Network", desc: "Extensive worldwide network ensuring your cargo reaches any destination" },
              { icon: Clock, title: "On-Time Delivery", desc: "Committed to meeting deadlines with 99.9% on-time performance" },
              { icon: Shield, title: "Secure Handling", desc: "Advanced security measures to protect your valuable shipments" },
              { icon: Award, title: "Industry Certified", desc: "ISO certified with international quality standards compliance" },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 font-['Poppins']">{title}</h3>
                  <p className="text-muted-foreground">{desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      

      {/* Testimonials, FAQ, Clients */}
      <Testimonials />
      <FAQ />
      {/* Partner Section */}
      <PartnerSection />
      <ClientLogos />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Poppins']">
              Ready to Ship with Us?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Get started with Team Global Logistics today and experience world-class shipping services
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 hover:scale-105 transition-transform">
                <NavLink to="/contact">Contact Us Now</NavLink>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-transform">
                <NavLink to="/about">Learn More</NavLink>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

// Stats Section
const StatsSection: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { end: 15, label: "Years Experience" },
            { end: 50, label: "Countries Served" },
            { end: 10000, label: "Happy Clients", separator: "," },
            { end: 99.9, label: "On-Time Delivery", decimals: 1, suffix: "%" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="text-4xl font-bold text-primary mb-2 font-['Poppins']">
                {inView && (
                  <CountUp
                    end={stat.end}
                    duration={2}
                    decimals={stat.decimals}
                    separator={stat.separator}
                  />
                )}
                {stat.suffix}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
