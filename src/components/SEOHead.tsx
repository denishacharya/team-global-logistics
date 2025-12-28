// src/components/SEOHead.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "blog";
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  canonicalUrl?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl 
}: SEOProps) => {
  const location = useLocation();
  const baseUrl = "https://teamgloballogistics.com";
  const defaultImage = `${baseUrl}/og-image.jpg`;
  
  const normalizeUrl = (url: string): string => {
    return url.replace(/\/+$/, '');
  };

  const currentUrl = canonicalUrl || `${baseUrl}${location.pathname}`;
  const normalizedUrl = normalizeUrl(currentUrl);
  const imageUrl = ogImage ? (ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`) : defaultImage;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Meta tags configuration
    const metaTags = [
      // Basic meta tags
      { name: "description", content: description },
      { name: "keywords", content: keywords || "logistics, shipping, supply chain, Nepal, cargo, freight" },
      { name: "robots", content: "index, follow" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      // Open Graph tags
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: normalizedUrl },
      { property: "og:type", content: ogType },
      { property: "og:image", content: imageUrl },
      { property: "og:site_name", content: "Team Global Logistics" },
      { property: "og:locale", content: "en_US" },

      // Twitter Card tags
      { name: "twitter:card", content: twitterCard },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:site", content: "@TeamGlobalLogistics" },
      { name: "twitter:creator", content: "@TeamGlobalLogistics" },
    ];

    // Update or create meta tags
    metaTags.forEach(({ name, property, content }) => {
      const attribute = property ? "property" : "name";
      const tagName = property || name;
      
      if (!tagName || !content) return;

      let element = document.querySelector(`meta[${attribute}="${tagName}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, tagName);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    });

    // Handle canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", normalizedUrl);

    // Cleanup function
    return () => {
      // Remove only dynamically added meta tags if needed
    };
  }, [title, description, keywords, ogType, twitterCard, normalizedUrl, imageUrl, ogImage]); // Added ogImage to dependencies

  return null;
};

export default SEOHead;

// Schema.org structured data components
interface OrganizationSchemaProps {
  phone?: string;
  email?: string;
  socialProfiles?: string[];
}

export const OrganizationSchema = ({ 
  phone = "+977-1-XXXXXXX", 
  email = "info@teamgloballogistics.com",
  socialProfiles = [
    "https://facebook.com/teamgloballogistics",
    "https://linkedin.com/company/teamgloballogistics",
    "https://twitter.com/TeamGlobalLogistics"
  ]
}: OrganizationSchemaProps) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Team Global Logistics",
      "description": "Leading cargo and logistics company in Nepal providing air freight, sea freight, and road transport services",
      "url": "https://teamgloballogistics.com",
      "logo": "https://teamgloballogistics.com/logo.png",
      "foundingDate": "2015",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Trade Tower, Thapathali",
        "addressLocality": "Kathmandu",
        "addressRegion": "Bagmati",
        "postalCode": "44600",
        "addressCountry": "NP"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": phone,
        "contactType": "Customer Service",
        "email": email,
        "areaServed": "NP",
        "availableLanguage": ["en", "ne"]
      },
      "sameAs": socialProfiles
    };

    const scriptId = "organization-schema";
    
    // Remove existing schema
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Create new schema script
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = scriptId;
    
    document.head.appendChild(script);

    return () => {
      const currentScript = document.getElementById(scriptId);
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [phone, email, socialProfiles]); // Moved schema inside useEffect and added dependencies

  return null;
};

interface FAQSchemaProps {
  faqs: Array<{ 
    question: string; 
    answer: string;
    id?: string;
  }>;
}

export const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq, index) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const scriptId = "faq-schema";
    
    // Remove existing schema
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Create new schema script
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = scriptId;
    
    document.head.appendChild(script);

    return () => {
      const currentScript = document.getElementById(scriptId);
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [faqs]); // Added faqs dependency

  return null;
};

// Breadcrumb Schema for better navigation SEO
interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };

    const scriptId = "breadcrumb-schema";
    
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = scriptId;
    
    document.head.appendChild(script);

    return () => {
      const currentScript = document.getElementById(scriptId);
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [items]); // Added items dependency

  return null;
};

// Article Schema for blog posts
interface ArticleSchemaProps {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  image: string;
  publisher?: string;
}

export const ArticleSchema = ({
  title,
  description,
  author,
  publishedDate,
  modifiedDate,
  image,
  publisher = "Team Global Logistics"
}: ArticleSchemaProps) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": image,
      "author": {
        "@type": "Person",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": publisher,
        "logo": {
          "@type": "ImageObject",
          "url": "https://teamgloballogistics.com/logo.png"
        }
      },
      "datePublished": publishedDate,
      "dateModified": modifiedDate || publishedDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      }
    };

    const scriptId = "article-schema";
    
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = scriptId;
    
    document.head.appendChild(script);

    return () => {
      const currentScript = document.getElementById(scriptId);
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [title, description, author, publishedDate, modifiedDate, image, publisher]); // Added all dependencies

  return null;
};