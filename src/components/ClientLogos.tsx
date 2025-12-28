import { motion } from "framer-motion";
import peak from "@/assets/peak-trade-concern-team-gobal-logistics.svg";
import fashionFrenzy from "@/assets/fashion-frenzy-team-gobal-logistics.png";
import BM from "@/assets/BM-trade-concern-team-gobal-logistics.svg";
import aashitaInternational from "@/assets/aashita-international-team-gobal-logistics.png";
import tvt from "@/assets/tvt-team-gobal-logistics.png";
import machineerTechnology from "@/assets/machinner-technology-team-gobal-logistics.png";

const clients = [
  { 
    name: "Peak Trade Concern", 
    logo: peak,
    type: "image" 
  },
  { 
    name: "Fahion Frenzy", 
    logo: fashionFrenzy,
    type: "image" 
  },
  { 
    name: "Aashita International", 
    logo: aashitaInternational,
    type: "image" 
  },
  { 
    name: "BM Trade Concern", 
    logo: BM,
    type: "image" 
  },
  { 
    name: "TVT", 
    logo: tvt,
    type: "image" 
  },
  { 
    name: "Machineer Technology", 
    logo: machineerTechnology,
    type: "image" 
  },
];

const ClientLogos = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12 font-['Poppins']"
        >
          Trusted by Leading Companies
        </motion.h2>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...clients, ...clients, ...clients].map((client, idx) => (
              <motion.div
                key={idx}
                className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-card border border-border rounded-lg"
                whileHover={{ 
                  scale: 1.05, 
                  borderColor: "hsl(var(--accent))",
                  boxShadow: "0 0 20px rgba(255, 107, 0, 0.3)"
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center">
                  {client.type === "image" ? (
                    <div className="flex flex-col items-center">
                      <motion.img 
                        src={client.logo.src || client.logo} 
                        alt={`${client.name} logo`}
                        className="h-10 w-auto object-contain"
                        whileHover={{ 
                          filter: "drop-shadow(0 0 10px rgba(255, 107, 0, 0.5))"
                        }}
                      />
                    </div>
                  ) : (
                    <motion.div 
                      className="text-3xl font-bold text-primary font-['Poppins']"
                      whileHover={{ 
                        textShadow: "0 0 15px rgba(255, 107, 0, 0.5)"
                      }}
                    >
                      {client.logo}
                    </motion.div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">
                    {client.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;