import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, MapPin } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import heroImage from "@/assets/hero-logistics.jpg";

// Gallery data - Only travel glimpses
const travelGlimpses = [
  {
    id: 1,
    title: "Port of Kolkata",
    description: "Handling shipments at Kolkata Port",
    location: "Kolkata, India",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Singapore Warehouse",
    description: "Our distribution center in Singapore",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Dubai Logistics Hub",
    description: "Middle East operations center",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Shanghai Port",
    description: "China export operations",
    location: "Shanghai, China",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Birgunj Dry Port",
    description: "Nepal-India border operations",
    location: "Birgunj, Nepal",
    image: "https://images.unsplash.com/photo-1562887189-e5d078343de4?w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Bangkok Trade Fair",
    description: "Participating in international logistics expo",
    location: "Bangkok, Thailand",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Kathmandu Office",
    description: "Our main headquarters in Nepal",
    location: "Kathmandu, Nepal",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Mumbai Port Operations",
    description: "Handling cargo at Mumbai Port",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop"
  },
  {
    id: 9,
    title: "Dhaka Export Center",
    description: "Bangladesh operations hub",
    location: "Dhaka, Bangladesh",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop"
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image: any, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImages = (direction: 'prev' | 'next') => {
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex < 0) newIndex = travelGlimpses.length - 1;
    if (newIndex >= travelGlimpses.length) newIndex = 0;
    
    setCurrentIndex(newIndex);
    setSelectedImage(travelGlimpses[newIndex]);
  };

  return (
    <>
      <SEOHead
        title="Gallery - Team Global Logistics"
        description="Explore travel glimpses and global operations of Team Global Logistics."
        keywords="logistics gallery, travel photos, global operations, port operations"
      />

      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent">
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
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']">
              Our Gallery
            </h1>
            <p className="text-lg md:text-xl">
              Glimpses of our global operations and travels
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Travel Glimpses</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore photos from our operations across different ports and locations worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {travelGlimpses.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card 
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group h-full border-0 shadow-md"
                  onClick={() => openLightbox(item, index)}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.location}</span>
                      </div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <MapPin className="h-3 w-3" />
                      <span>{item.location}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
            <DialogContent className="max-w-4xl w-[90vw] p-0 border-none bg-transparent">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative bg-background rounded-lg overflow-hidden shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={() => navigateImages('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => navigateImages('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image */}
                <div className="aspect-video relative">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Image Info */}
                <div className="p-6 bg-background">
                  <DialogTitle className="text-2xl font-bold mb-2">
                    {selectedImage.title}
                  </DialogTitle>
                  
                  <p className="text-lg text-muted-foreground mb-4">
                    {selectedImage.description}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{selectedImage.location}</span>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;