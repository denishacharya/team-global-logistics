import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Logistics data
const logisticsData = {
  countries: [
    { id: "CN", name: "China", lat: 35.8617, lng: 104.1954, services: ["air", "sea", "road", "warehouse"], color: 0x888888, description: "Beijing (PEK), Guangzhou (CAN)", type: "source" },
    { id: "JP", name: "Japan", lat: 36.2048, lng: 138.2529, services: ["air", "sea", "warehouse"], color: 0x888888, description: "Narita (NRT)", type: "source" },
    { id: "CN_XIY", name: "Xian", lat: 34.3416, lng: 108.9398, services: ["air", "warehouse"], color: 0x888888, description: "Xian (XIY)", type: "source" },
    { id: "AE", name: "UAE", lat: 25.2048, lng: 55.2708, services: ["sea", "warehouse"], color: 0x888888, description: "Jebel Ali (DWC)", type: "source" },
    { id: "IN_CCU", name: "Kolkata", lat: 22.5726, lng: 88.3639, services: ["sea", "warehouse"], color: 0x888888, description: "Kolkata (CCU)", type: "transit" },
    { id: "TH", name: "Thailand", lat: 13.7563, lng: 100.5018, services: ["sea", "warehouse"], color: 0x888888, description: "Bangkok (BKK)", type: "source" },
    { id: "NP", name: "Nepal", lat: 27.7172, lng: 85.3240, services: ["air", "sea", "road", "warehouse"], color: 0xff0000, description: "Kathmandu (KTM)", type: "destination" },
    { id: "US", name: "USA", lat: 37.0902, lng: -95.7129, services: ["air", "sea", "warehouse"], color: 0x888888, description: "Major US ports", type: "source" },
    { id: "AU", name: "Australia", lat: -25.2744, lng: 133.7751, services: ["air", "sea", "warehouse"], color: 0x888888, description: "Australian ports", type: "source" },
    { id: "DE", name: "Germany", lat: 51.1657, lng: 10.4515, services: ["sea", "warehouse"], color: 0x888888, description: "Hamburg port", type: "source" },
  ],
  connections: [
    { from: "CN", to: "NP", services: ["air"] },
    { from: "JP", to: "NP", services: ["air"] },
    { from: "CN_XIY", to: "NP", services: ["air"] },
    { from: "US", to: "NP", services: ["air"] },
    { from: "AU", to: "NP", services: ["air"] },
    { from: "CN", to: "IN_CCU", services: ["sea"] },
    { from: "JP", to: "IN_CCU", services: ["sea"] },
    { from: "AE", to: "IN_CCU", services: ["sea"] },
    { from: "TH", to: "IN_CCU", services: ["sea"] },
    { from: "US", to: "IN_CCU", services: ["sea"] },
    { from: "AU", to: "IN_CCU", services: ["sea"] },
    { from: "DE", to: "IN_CCU", services: ["sea"] },
    { from: "IN_CCU", to: "NP", services: ["sea"] },
    { from: "CN", to: "NP", services: ["road"] },
  ]
};

// Service types
const serviceTypes = {
  air: { color: 0x00ff00, name: "Air Freight", width: 2.0, speed: 0.003 },
  sea: { color: 0x0000ff, name: "Sea Freight", width: 2.5, speed: 0.001 },
  road: { color: 0xffff00, name: "Road Freight", width: 1.5, speed: 0.002 },
  warehouse: { color: 0xff0000, name: "Warehouse", width: 0, speed: 0 }
};

const LogisticsGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [rotationStatus, setRotationStatus] = useState<string>("Active");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Refs for animation
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const serviceLinesRef = useRef<THREE.Line[]>([]);
  const movingDotsRef = useRef<THREE.Mesh[]>([]);
  const warehousePinsRef = useRef<THREE.Mesh[]>([]);
  const isRotatingRef = useRef(isRotating);
  const isHoveringRef = useRef(isHovering);

  // Check mobile/tablet on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => { 
    isRotatingRef.current = isRotating;
    setRotationStatus(isRotating && !isHovering ? "Active" : "Paused");
  }, [isRotating, isHovering]);

  useEffect(() => { isHoveringRef.current = isHovering; }, [isHovering]);

  // Update visibility based on selected service
  const updateVisibility = () => {
    // Update service lines
    serviceLinesRef.current.forEach(line => {
      const serviceType = line.userData?.type;
      const material = line.material as THREE.LineBasicMaterial;
      
      if (selectedService === null) {
        // Show all lines with good visibility
        material.opacity = isMobile ? 0.8 : 0.7;
        material.visible = true;
      } else if (serviceType === selectedService) {
        // Show only selected service lines
        material.opacity = 0.9;
        material.visible = true;
      } else {
        // Hide other service lines
        material.opacity = 0;
        material.visible = false;
      }
    });

    // Update moving dots
    movingDotsRef.current.forEach(dot => {
      const line = dot.userData?.line;
      if (line) {
        const serviceType = line.userData?.type;
        dot.visible = selectedService === null || serviceType === selectedService;
      }
    });

    // Update warehouse pins
    warehousePinsRef.current.forEach(pin => {
      if (selectedService === "warehouse") {
        pin.visible = true;
        (pin.material as THREE.MeshBasicMaterial).opacity = 0.9;
      } else if (selectedService === null) {
        pin.visible = true;
        (pin.material as THREE.MeshBasicMaterial).opacity = 0.6;
      } else {
        pin.visible = false;
      }
    });
  };

  useEffect(() => {
    updateVisibility();
  }, [selectedService, isMobile]);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Clear previous scene
    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    serviceLinesRef.current = [];
    movingDotsRef.current = [];
    warehousePinsRef.current = [];

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000011, 10, 18);

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, isMobile ? 5 : 4);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    const latLngToVector3 = (lat: number, lng: number, radius: number = 1.0): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    // High contrast Earth texture for better visibility
    const earthTexture = new THREE.TextureLoader().load(
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg"
    );
    
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      specular: new THREE.Color(0x111111),
      shininess: 2,
      bumpScale: 0.03,
    });

    const globeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, isMobile ? 96 : 128, isMobile ? 96 : 128),
      globeMaterial
    );
    globeGroup.add(globeMesh);

    // Brighter clouds for better contrast
    const cloudTexture = new THREE.TextureLoader().load(
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earthCloud.png"
    );
    
    const cloudMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.02, isMobile ? 96 : 128, isMobile ? 96 : 128),
      new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: isMobile ? 0.4 : 0.3,
        depthWrite: false,
      })
    );
    globeGroup.add(cloudMesh);

    // Country markers
    const countryPositions: { [key: string]: THREE.Vector3 } = {};
    const countryMeshes: THREE.Mesh[] = [];

    logisticsData.countries.forEach(country => {
      const pos = latLngToVector3(country.lat, country.lng, 1.02);
      countryPositions[country.id] = pos;

      let color = country.color;
      let size = country.id === "NP" ? 
        (isMobile ? 0.05 : 0.04) : 
        country.type === "transit" ? 
        (isMobile ? 0.04 : 0.03) : 
        (isMobile ? 0.03 : 0.02);
      
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(size, isMobile ? 12 : 16, isMobile ? 12 : 16),
        new THREE.MeshBasicMaterial({ 
          color, 
          transparent: true, 
          opacity: 0.9 
        })
      );
      marker.position.copy(pos);
      marker.userData = { 
        type: "country", 
        country: country.id, 
        name: country.name, 
        description: country.description 
      };
      globeGroup.add(marker);
      countryMeshes.push(marker);

      // Warehouse pins - bigger on mobile
      if (country.services.includes("warehouse")) {
        const pinSize = isMobile ? 0.02 : 0.015;
        const pinHeight = isMobile ? 0.05 : 0.04;
        
        const pin = new THREE.Mesh(
          new THREE.ConeGeometry(pinSize, pinHeight, 6),
          new THREE.MeshBasicMaterial({ 
            color: 0xff0000, 
            transparent: true, 
            opacity: 0.6 
          })
        );
        pin.position.copy(pos.clone().multiplyScalar(1.04));
        pin.lookAt(new THREE.Vector3(0, 0, 0));
        pin.userData = { type: "warehouse", country: country.id };
        globeGroup.add(pin);
        warehousePinsRef.current.push(pin);
      }
    });

    // Connections
    logisticsData.connections.forEach(conn => {
      const fromPos = countryPositions[conn.from];
      const toPos = countryPositions[conn.to];
      if (!fromPos || !toPos) return;

      conn.services.forEach(serviceType => {
        const service = serviceTypes[serviceType as keyof typeof serviceTypes];
        if (!service || serviceType === "warehouse") return;

        const dist = fromPos.distanceTo(toPos);
        const altitude = 0.2 + Math.min(dist * 0.3, 0.5);
        const curve = new THREE.QuadraticBezierCurve3(
          fromPos,
          new THREE.Vector3().addVectors(fromPos, toPos).multiplyScalar(0.5).normalize().multiplyScalar(1 + altitude),
          toPos
        );
        
        const segments = isMobile ? 30 : 50;
        const points = curve.getPoints(segments);
        
        const lineWidth = isMobile ? service.width * 1.5 : service.width;
        
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          new THREE.LineBasicMaterial({ 
            color: service.color, 
            transparent: true, 
            opacity: 0.7, 
            linewidth: lineWidth 
          })
        );
        line.userData = { type: serviceType, from: conn.from, to: conn.to, service };
        globeGroup.add(line);
        serviceLinesRef.current.push(line);

        // Moving dots
        if (service.speed > 0 && (serviceType === "air" || serviceType === "sea")) {
          const dotSize = isMobile ? 0.015 : 0.01;
          const dot = new THREE.Mesh(
            new THREE.SphereGeometry(dotSize, 6, 6),
            new THREE.MeshBasicMaterial({ 
              color: service.color, 
              transparent: true, 
              opacity: 0.9 
            })
          );
          dot.userData = { 
            line, 
            points, 
            progress: Math.random(), 
            speed: service.speed * (0.5 + Math.random() * 0.5) 
          };
          globeGroup.add(dot);
          movingDotsRef.current.push(dot);
        }
      });
    });

    // Update initial visibility
    updateVisibility();

    // Enhanced lighting for better visibility
    scene.add(new THREE.AmbientLight(0xffffff, isMobile ? 0.8 : 0.6));
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    // Add extra light for better continent visibility
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, -3, -5);
    scene.add(fillLight);

    // Stars background
    const starGeo = new THREE.BufferGeometry();
    const starCount = isMobile ? 400 : 800;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      const r = 8 + Math.random() * 12;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i + 2] = r * Math.cos(phi);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(
      starGeo, 
      new THREE.PointsMaterial({ 
        color: 0xffffff, 
        size: isMobile ? 0.08 : 0.05, 
        transparent: true, 
        opacity: 0.9 
      })
    ));

    // Controls with mobile-friendly settings
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = isMobile ? 0.3 : 0.5;
    controls.minDistance = isMobile ? 2.5 : 2;
    controls.maxDistance = isMobile ? 12 : 10;
    controls.enableZoom = true;
    controls.enablePan = !isMobile; // Disable pan on mobile for better touch
    controlsRef.current = controls;

    // Touch-friendly interaction
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
        setIsHovering(true);
      }
    };

    const handleTouchEnd = () => {
      setIsHovering(false);
      setActiveCountry(null);
    };

    // Raycaster for hover/touch
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mountRef.current!.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    
    const handleMouseEnter = () => {
      setIsHovering(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      setActiveCountry(null);
    };

    if (!isMobile) {
      mountRef.current.addEventListener('mousemove', handleMouseMove);
      mountRef.current.addEventListener('mouseenter', handleMouseEnter);
      mountRef.current.addEventListener('mouseleave', handleMouseLeave);
    } else {
      mountRef.current.addEventListener('touchstart', handleTouchStart);
      mountRef.current.addEventListener('touchend', handleTouchEnd);
    }

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const shouldRotate = isRotatingRef.current && !isHoveringRef.current;
      if (shouldRotate && globeGroupRef.current) {
        globeGroupRef.current.rotation.y += isMobile ? 0.0008 : 0.001;
      }
      cloudMesh.rotation.y += isMobile ? 0.0003 : 0.0005;

      // Animate moving dots
      movingDotsRef.current.forEach(dot => {
        if (dot.userData.points && dot.userData.points.length > 0 && dot.visible) {
          const points = dot.userData.points;
          const idx = Math.floor(dot.userData.progress * (points.length - 1));
          const t = dot.userData.progress * (points.length - 1) - idx;
          if (idx < points.length - 1) {
            const x1 = points[idx].x;
            const y1 = points[idx].y;
            const z1 = points[idx].z;
            const x2 = points[idx + 1].x;
            const y2 = points[idx + 1].y;
            const z2 = points[idx + 1].z;
            dot.position.set(
              x1 + (x2 - x1) * t,
              y1 + (y2 - y1) * t,
              z1 + (z2 - z1) * t
            );
          }
          dot.userData.progress += dot.userData.speed;
          if (dot.userData.progress >= 1) dot.userData.progress = 0;
        }
      });

      // Update hover/touch detection
      if (!isMobile) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(countryMeshes);
        if (intersects.length > 0) {
          const countryData = intersects[0].object.userData;
          if (countryData && countryData.country !== activeCountry) {
            setActiveCountry(countryData.country);
          }
        } else if (activeCountry !== null) {
          setActiveCountry(null);
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const { clientWidth, clientHeight } = mountRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        if (!isMobile) {
          mountRef.current.removeEventListener('mousemove', handleMouseMove);
          mountRef.current.removeEventListener('mouseenter', handleMouseEnter);
          mountRef.current.removeEventListener('mouseleave', handleMouseLeave);
        } else {
          mountRef.current.removeEventListener('touchstart', handleTouchStart);
          mountRef.current.removeEventListener('touchend', handleTouchEnd);
        }
      }
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      renderer.dispose();
    };
  }, [isMobile]);

  const activeCountryData = activeCountry ? logisticsData.countries.find(c => c.id === activeCountry) : null;

  return (
    <div className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none" />

    


      {/* Compact Service Controls - Top Middle */}
      <div className={`absolute top-2 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%]`}>
        <div className="bg-black/80 backdrop-blur-sm text-white rounded-lg p-2 md:p-3 shadow-lg">
          
          {/* Main Controls Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            
            {/* Left: Rotation Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`px-2 py-1 md:px-3 md:py-1.5 rounded text-xs md:text-sm font-medium transition-colors flex items-center gap-1 ${
                  isRotating ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isRotating ? '⏸️' : '▶️'}
                <span className="hidden sm:inline">{isRotating ? ' Pause' : ' Play'}</span>
              </button>
              
              {/* Status Indicator */}
              <div className="hidden sm:flex items-center gap-1 text-xs">
                <div className={`w-2 h-2 rounded-full ${rotationStatus === "Active" ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span>{rotationStatus}</span>
              </div>
            </div>

            {/* Middle: Service Filters - Compact Horizontal */}
            <div className="flex flex-wrap justify-center gap-1 md:gap-2">
              {Object.entries(serviceTypes).map(([key, service]) => (
                <button
                  key={key}
                  onClick={() => setSelectedService(selectedService === key ? null : key)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all min-w-[60px] md:min-w-[70px] text-center ${
                    selectedService === key 
                      ? 'bg-white text-black font-bold' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                  style={{
                    borderLeft: `2px solid #${service.color.toString(16).padStart(6, '0')}`
                  }}
                  title={service.name}
                >
                  <span className="hidden xs:inline">{service.name}</span>
                  <span className="xs:hidden">
                    {key === 'air' ? '✈️' : 
                     key === 'sea' ? '🚢' : 
                     key === 'road' ? '🚚' : '🏭'}
                  </span>
                </button>
              ))}
              
              <button
                onClick={() => setSelectedService(null)}
                className={`px-2 py-1 rounded text-xs font-medium min-w-[60px] md:min-w-[70px] text-center ${
                  selectedService === null 
                    ? 'bg-white text-black font-bold' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                <span className="hidden xs:inline">Show All</span>
                <span className="xs:hidden">All</span>
              </button>
            </div>

            {/* Right: Mobile Status */}
            <div className="hidden md:flex items-center gap-2 text-xs">
              <div className={`w-2 h-2 rounded-full ${isHovering ? 'bg-yellow-500' : 'bg-gray-500'}`} />
              <span>Hover: {isHovering ? 'Yes' : 'No'}</span>
            </div>
          </div>

          {/* Mobile-only row for additional info */}
          {isMobile && (
            <div className="mt-2 pt-2 border-t border-gray-700 flex justify-between items-center text-xs">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${rotationStatus === "Active" ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span>{rotationStatus}</span>
              </div>
              <div className="text-blue-300">
                <span>📱 Touch to rotate</span>
              </div>
            </div>
          )}
        </div>
      </div>

     

      {/* Active Country Info - Responsive positioning */}
      {activeCountryData && (
        <div className={`absolute ${isMobile ? 'bottom-16' : 'bottom-4'} left-4 bg-black/90 backdrop-blur-sm text-white p-3 md:p-4 rounded-lg z-10 ${
          isMobile ? 'max-w-[calc(100%-2rem)]' : 'max-w-xs'
        }`}>
          <div className="font-bold mb-2 text-sm md:text-base">{activeCountryData.name}</div>
          <p className="text-xs md:text-sm mb-2 md:mb-3">{activeCountryData.description}</p>
          <div className="text-xs flex flex-wrap gap-1">
            {activeCountryData.services.map(service => (
              <span key={service} className="px-2 py-1 rounded" style={{
                backgroundColor: `#${serviceTypes[service as keyof typeof serviceTypes]?.color.toString(16).padStart(6, '0')}22`,
                border: `1px solid #${serviceTypes[service as keyof typeof serviceTypes]?.color.toString(16).padStart(6, '0')}`
              }}>
                {serviceTypes[service as keyof typeof serviceTypes]?.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Title - Responsive positioning */}
      <div className={`absolute ${isMobile ? 'bottom-4' : 'bottom-4'} right-4 bg-black/90 backdrop-blur-sm text-white p-3 md:p-4 rounded-lg z-10 ${
        isMobile ? 'max-w-[calc(100%-2rem)]' : ''
      }`}>
        <h2 className="text-base md:text-xl font-bold">Global Logistics Network</h2>
        <p className="text-xs md:text-sm opacity-80">Connecting to Nepal from worldwide.</p>
        {isMobile && (
          <div className="text-xs opacity-60 mt-1">
            <p>• Touch and drag to rotate</p>
            <p>• Pinch to zoom</p>
          </div>
        )}
        {!isMobile && (
          <div className="text-xs opacity-60 mt-1">
            <p>• Hover to pause rotation</p>
            <p>• Click filters to view services</p>
          </div>
        )}
      </div>

      {/* Mobile Instructions (only when no country is active) */}
      {isMobile && !activeCountryData && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-xs z-10 whitespace-nowrap">
          Tap country for details
        </div>
      )}
    </div>
  );
};

export default LogisticsGlobe;