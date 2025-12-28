import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon?: LucideIcon;
  image?: string;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, image, title, description }: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="group hover:shadow-xl transition-all duration-300 border-border h-full hover:border-primary/50 hover:bg-primary/5 flex flex-col overflow-hidden">
        {/* Image Container - Full width at top */}
        {image && (
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Content Area */}
        <div className="flex flex-col flex-1 p-6">
          {/* Icon/Image Thumbnail (small) - optional */}
          {!image && Icon && (
            <motion.div 
              className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors self-start"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="h-8 w-8" />
            </motion.div>
          )}

          <CardTitle className="text-xl font-['Poppins'] group-hover:text-primary transition-colors mb-2">
            {title}
          </CardTitle>
          
          <CardContent className="p-0 flex-1">
            <CardDescription className="text-foreground/70 group-hover:text-foreground transition-colors">
              {description}
            </CardDescription>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;