import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import heroImage from "@/assets/team-global-logistics-teamimage-image.webp";
import sujanSapkota from "@/assets/team-global-logistics-sujan-sapkota-ceo.webp";
import aaraju from "@/assets/team-global-logistics-aaraju-gautam-gm.jpg";
import denish from "@/assets/team-gloal-logistics-denish-acharya-operation.jpg";
import radhika from "@/assets/team-global-logistics-radhika-humagain-accountant.jpg";
import ganesh from "@/assets/team-gloal-logistics-ganesh-pokhrel.webp";
import mukti from "@/assets/team-gloal-logistics-mukti-ghimire.webp";
import charan from "@/assets/team-gloal-logistics-charan-acharya.webp";
import bhim from "@/assets/team-gloal-logistics-bhim-neupane.webp";
import manoj from "@/assets/team-gloal-logistics-manoj-bhattarai.webp";

const team = [
  {
    id: 1,
    name: "Sujan Sapkota",
    role: "CEO & Founder",
    image: sujanSapkota,
    bio: "20+ years of experience in global logistics. Visionary leader driving innovation in supply chain management across Nepal and international markets.",
  },
    {
    id: 2,
    name: "Ganesh Kumar Pokharel",
    role: "Chairman",
    image: ganesh,
    bio: "Chairman leading the strategic direction and overall vision of Team Global Logistics.",
  },

  {
    id: 3,
    name: "Mukti Ghimire",
    role: "Head of Administrative & Relationship Development",
    image: mukti,
    bio: "Responsible for administrative operations and strengthening internal and external relationships.",
  },
  {
    id: 4,
    name: "Charan Acharya",
    role: "Head of Marketing & Sales",
    image: charan,
    bio: "Leads marketing strategies and sales operations to expand business reach and customer engagement.",
  },
  {
    id: 5,
    name: "Bhim Neupane",
    role: "Head of Business Development",
    image: bhim,
    bio: "Drives business growth, partnerships, and new opportunities for Team Global Logistics.",
  },
  {
    id: 6,
    name: "Manoj Bhattarai",
    role: "Customs Operations Coordinator",
    image: manoj,
    bio: "Oversees daily customs operations in TIA airport ensuring smooth workflow and efficient service delivery.",
  },
  
  {
    id: 7,
    name: "Denish Acharya",
    role: "Freight Coordinator",
    image: denish,
    bio: "Coordinates daily air and ocean freight operations, manages documentation, tracks shipments, and ensures smooth communication between clients, carriers, and customs partners.",
  },
  {
    id: 8,
    name: "Aaraju Gautam",
    role: "Operations Director",
    image: aaraju,
    bio: "Expert in logistics operations with focus on efficiency and customer satisfaction. Manages our global network of partners and carriers.",
  },
  {
    id: 9,
    name: "Radhika Humagain",
    role: "Customer Relations Manager",
    image: radhika,
    bio: "Dedicated to building lasting relationships with clients. Ensures every shipment receives personalized attention and care.",
  },

];

interface TeamCardProps {
  member: typeof team[0];
  index: number;
  inView: boolean;
}

const TeamCard = ({ member, index, inView }: TeamCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <Card className="border-border bg-card overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 font-['Poppins'] group-hover:text-primary transition-colors">
              {member.name}
            </h3>
            <p className="text-sm text-accent font-medium mb-3">
              {member.role}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {member.bio}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Team = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Our Team - Team Global Logistics"
        description="Meet the expert team behind Team Global Logistics. Our experienced professionals ensure reliable and efficient logistics solutions."
        keywords="Team Global Logistics team, logistics experts, logistics professionals"
      />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover "
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
              Our Expert Team
            </h1>
            <p className="text-lg md:text-xl">
              Meet the professionals driving excellence in global logistics
            </p>
          </motion.div>
        </div>
      </section>


      {/* Team Section */}
      <section ref={teamRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">
              Leadership & Expertise
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our team combines decades of logistics experience with innovative thinking to deliver exceptional service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamCard
                key={member.id}
                member={member}
                index={index}
                inView={teamInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide our team every day
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Excellence",
                description: "We strive for excellence in every shipment, every interaction, and every solution we provide."
              },
              {
                title: "Integrity",
                description: "Our commitment to transparency and honesty builds lasting trust with our clients and partners."
              },
              {
                title: "Innovation",
                description: "We embrace new technologies and methodologies to stay ahead in the logistics industry."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border h-full">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3 font-['Poppins'] text-primary">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Team;
