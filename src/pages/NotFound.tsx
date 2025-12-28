import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, RefreshCw, AlertCircle, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // Create floating particles
    const newParticles = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, [location.pathname]);

  const suggestedRoutes = [
    { path: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { path: "/services", label: "Services", icon: <Compass className="w-4 h-4" /> },
    { path: "/about", label: "About Us", icon: <Compass className="w-4 h-4" /> },
    { path: "/contact", label: "Contact", icon: <Compass className="w-4 h-4" /> },
  ];

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl mx-auto">
          {/* Error code with animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative mb-8"
          >
            <div className="relative inline-block">
              <div className="text-[12rem] md:text-[16rem] font-black text-primary/10 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-[12rem] md:text-[16rem] font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                >
                  404
                </motion.div>
              </div>
            </div>
            
            {/* Floating alert icon */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-4 -right-4 md:-right-8"
            >
              <AlertCircle className="w-16 h-16 md:w-24 md:h-24 text-accent" />
            </motion.div>
          </motion.div>

          {/* Error message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Lost in Space?
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              The page at <code className="bg-muted px-2 py-1 rounded text-primary font-mono">{location.pathname}</code> seems to have drifted into the void.
            </p>
            <p className="text-muted-foreground">
              Don't worry, even the best explorers sometimes take wrong turns!
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              asChild
              className="gap-2 bg-primary hover:bg-primary/90 text-white hover:text-white" // Added text-white
            >
              <Link to="/">
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={handleGoBack}
              className="gap-2 hover:text-black" // Added hover:text-black
            >
              <Compass className="w-5 h-5" />
              Go Back
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={handleReload}
              className="gap-2 hover:text-black" // Added hover:text-black
            >
              <RefreshCw className="w-5 h-5" />
              Reload Page
            </Button>
          </motion.div>

          {/* Suggested routes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              You might be looking for:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {suggestedRoutes.map((route, index) => (
                <motion.div
                  key={route.path}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    asChild
                    className="gap-2 hover:bg-secondary hover:text-black" // Added hover:text-black
                  >
                    <Link to={route.path}>
                      {route.icon}
                      {route.label}
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Floating astronaut animation */}
      <motion.div
        className="fixed bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-10 pointer-events-none"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="currentColor" className="text-primary" />
          <circle cx="40" cy="40" r="5" fill="white" />
          <circle cx="60" cy="40" r="5" fill="white" />
          <path d="M40 60 Q50 70 60 60" stroke="white" strokeWidth="3" fill="none" />
        </svg>
      </motion.div>

      {/* Decorative elements */}
      <div className="fixed top-1/4 right-10 w-8 h-8 rounded-full bg-accent/20 blur-xl" />
      <div className="fixed bottom-1/4 left-10 w-12 h-12 rounded-full bg-primary/10 blur-xl" />
    </div>
  );
};

export default NotFound;