import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import aboutTeamImage from "@/assets/team-global-logistics-about-img2.jpg";
import TeamSection from "@/components/TeamSection";
import heroImage from "@/assets/team-global-logistics-about-img.jpg";
import PartnerSection from "@/components/PartnerSection";

const About = () => {
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
              About Team Global Logistics
            </h1>
            <p className="text-lg md:text-xl">
              Building bridges across continents with reliable, innovative logistics solutions since 2008
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Poppins']">Our Story</h2>
              <p className="text-muted-foreground text-lg mb-4">
                Team Global Logistics was founded with a vision to revolutionize the logistics industry by providing seamless, reliable, and innovative shipping solutions. What started as a small freight forwarding company has grown into a global logistics powerhouse.
              </p>
              <p className="text-muted-foreground text-lg mb-4">
                Over the years, we've expanded our network to cover more than 50 countries, serving thousands of satisfied clients across various industries. Our commitment to excellence and customer satisfaction has been the cornerstone of our success.
              </p>
              <p className="text-muted-foreground text-lg">
                Today, we're proud to be recognized as one of the leading logistics providers, known for our reliability, efficiency, and innovative approach to solving complex supply chain challenges.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src={aboutTeamImage}
                alt="Team Global Logistics Team"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-secondary"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Target className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 font-['Poppins']">Our Mission</h3>
                      <p className="text-muted-foreground">
                        To provide world-class logistics solutions that empower businesses to reach global markets efficiently and reliably. We strive to be the bridge that connects businesses worldwide through innovative, sustainable, and customer-centric shipping services.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Eye className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 font-['Poppins']">Our Vision</h3>
                      <p className="text-muted-foreground">
                        To be the most trusted and innovative logistics partner globally, setting new standards in efficiency, sustainability, and customer satisfaction. We envision a world where distance is no barrier to business growth and international trade flourishes seamlessly.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-border text-center hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                    <Users className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-['Poppins']">Customer First</h3>
                  <p className="text-muted-foreground">
                    We prioritize our clients' needs and go above and beyond to ensure their satisfaction and success.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-border text-center hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                    <TrendingUp className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-['Poppins']">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously adopt new technologies and methodologies to improve our services and efficiency.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-border text-center hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                    <Target className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-['Poppins']">Excellence</h3>
                  <p className="text-muted-foreground">
                    We maintain the highest standards in every aspect of our operations and service delivery.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      
      {/* Our Team Section Component */}
      <TeamSection />

      {/* Partner Section */}
      <PartnerSection />
    </div>
  );
};
export default About;
