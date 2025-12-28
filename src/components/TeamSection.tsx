import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import sujanSapkota from "@/assets/team-global-logistics-sujan-sapkota-ceo.webp";
import aaraju from "@/assets/team-global-logistics-aaraju-gautam-gm.jpg";
import denish from "@/assets/team-gloal-logistics-denish-acharya-operation.jpg";
import radhika from "@/assets/team-global-logistics-radhika-humagain-accountant.jpg";

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
    name: "Denish Acharya",
    role: "Freight Coordinator",
    image: denish,
    bio: "Coordinates daily air and ocean freight operations, manages documentation, tracks shipments, and ensures smooth communication between clients, carriers, and customs partners.",
  },
  {
    id: 3,
    name: "Aaraju Gautam",
    role: "Operations Director",
    image: aaraju,
    bio: "Expert in logistics operations with focus on efficiency and customer satisfaction. Manages our global network of partners and carriers.",
  },
  {
    id: 4,
    name: "Radhika Humagain",
    role: "Customer Relations Manager",
    image: radhika,
    bio: "Dedicated to building lasting relationships with clients. Ensures every shipment receives personalized attention and care.",
  },
];

const floatingIcons = [];

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

const TeamSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins']">
            Our Expert Team
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet the professionals driving excellence in global logistics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
