import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface GalleryCardProps {
  image: string;
  title: string;
  description: string;
  category?: string;
  year?: string;
  location?: string;
  likes?: number;
  comments?: number;
  onClick?: () => void;
}

const GalleryCard = ({
  image,
  title,
  description,
  category,
  year,
  location,
  likes = 0,
  comments = 0,
  onClick
}: GalleryCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group h-full"
        onClick={onClick}
      >
        <div className="relative overflow-hidden aspect-video">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {year && (
            <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              {year}
            </div>
          )}
          
          {category && (
            <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm">
              {category}
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
              {location && (
                <p className="text-sm text-primary mt-1 flex items-center gap-1">
                  📍 {location}
                </p>
              )}
            </div>
            
            {(likes > 0 || comments > 0) && (
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{likes}</span>
                </button>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">{comments}</span>
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GalleryCard;