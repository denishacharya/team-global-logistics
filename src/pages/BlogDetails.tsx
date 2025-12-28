// src/pages/BlogDetails.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { blogPosts } from "@/data/blogData";
import NotFound from "./NotFound";

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = slug ? blogPosts.find((b) => b.slug === slug) : undefined; // Added check for slug existence

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog || !slug) { // Added check for !slug
    return <NotFound />;
  }

  const shareUrl = `https://teamgloballogistics.com/blog/${blog.slug}`;
  const shareText = `Check out this article: ${blog.title}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      // You can add a toast notification here
    }
  };

  return (
    <>
      <SEOHead
        title={`${blog.title} | Team Global Logistics`}
        description={blog.excerpt}
        keywords={`${blog.category}, logistics, shipping, supply chain, blog, Nepal`}
        ogImage={blog.image}
      />

      <div className="min-h-screen pt-24 pb-20 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4"
        >
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/blog">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Blog Header */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{blog.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{blog.author || "Admin"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm bg-primary/10 px-3 py-1 rounded-full">
              {blog.category}
            </div>
          </div>

          {/* Blog Image */}
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-64 md:h-96 rounded-xl shadow-lg mb-10 object-cover"
          />

          {/* Blog Content */}
          <div
            className="prose max-w-none prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline mb-10"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Share Section */}
          <div className="mt-10 p-6 bg-white rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Found this article helpful?</h3>
                <p className="text-muted-foreground">Share it with others who might benefit</p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share Article
                </Button>
                
                <div className="flex gap-2">
                  <a
                    href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
                    aria-label="Share on Facebook"
                  >
                    FB
                  </a>
                  <a
                    href={`https://twitter.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition text-sm"
                    aria-label="Share on Twitter"
                  >
                    X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition text-sm"
                    aria-label="Share on LinkedIn"
                  >
                    IN
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default BlogDetails;