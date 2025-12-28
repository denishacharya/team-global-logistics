// src/data/blogData.ts
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "future-of-logistics-ai-automation",
    title: "The Future of Logistics: AI and Automation in Supply Chain",
    excerpt: "Explore how artificial intelligence and automation are revolutionizing the logistics industry and what it means for global supply chains.",
    content: `
      <p>The logistics industry is undergoing a significant transformation driven by artificial intelligence and automation. These technologies are not just improving efficiency but fundamentally changing how supply chains operate.</p>
      
      <h2>Key Benefits of AI in Logistics</h2>
      <ul>
        <li>Predictive analytics for demand forecasting</li>
        <li>Route optimization for fuel efficiency</li>
        <li>Automated warehouse management</li>
        <li>Real-time tracking and monitoring</li>
      </ul>
      
      <p>As we move forward, companies that embrace these technologies will lead the industry in efficiency and customer satisfaction.</p>
    `,
    category: "Technology",
    date: "2025-03-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    author: "Sarah Johnson",
    tags: ["AI", "Automation", "Supply Chain"]
  },
  {
    id: "2",
    slug: "sustainable-logistics-reducing-carbon-footprint",
    title: "Sustainable Logistics: Reducing Carbon Footprint in Shipping",
    excerpt: "Learn about the latest strategies and technologies helping logistics companies reduce their environmental impact.",
    content: `
      <p>Sustainability is no longer an option but a necessity in the logistics industry. Companies worldwide are adopting green practices to reduce their carbon footprint.</p>
      
      <h2>Sustainable Practices</h2>
      <ul>
        <li>Electric and hybrid vehicle fleets</li>
        <li>Carbon offset programs</li>
        <li>Optimized routing to reduce fuel consumption</li>
        <li>Eco-friendly packaging solutions</li>
      </ul>
    `,
    category: "Sustainability",
    date: "2025-03-10",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800",
    author: "Michael Chen",
    tags: ["Sustainability", "Green Logistics", "Environment"]
  },
  {
    id: "3",
    slug: "nepal-growing-role-in-international-trade",
    title: "Nepal's Growing Role in International Trade",
    excerpt: "An analysis of how Nepal is positioning itself as a key player in South Asian logistics and trade corridors.",
    content: `
      <p>Nepal's strategic location between India and China positions it uniquely in South Asian trade networks. Recent infrastructure developments are enhancing its logistics capabilities.</p>
      
      <h2>Key Developments</h2>
      <ul>
        <li>Improved border infrastructure</li>
        <li>Digital customs clearance systems</li>
        <li>Enhanced air cargo facilities</li>
        <li>Regional trade agreements</li>
      </ul>
    `,
    category: "Industry Insights",
    date: "2025-03-05",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    author: "Priya Sharma",
    tags: ["Nepal", "International Trade", "South Asia"]
  },
  // Add more posts as needed
];

export const categories = ["All", "Technology", "Sustainability", "Industry Insights", "Guides", "Strategy"];