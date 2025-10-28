import { ExternalLink, Calendar, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReadAloudButton } from "@/components/ReadAloudButton";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard = ({ article }: NewsCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <Card className="news-card group h-full flex flex-col">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardHeader className="flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="category-badge">
            <User className="h-3 w-3 mr-1" />
            {article.source.name}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(article.publishedAt)}
          </span>
        </div>
        
        <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </CardTitle>
        
        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
          {article.description}
        </CardDescription>
      </CardHeader>
      
      <CardFooter className="flex items-center justify-between gap-2">
        <ReadAloudButton text={`${article.title}. ${article.description ?? ""}`}/>
        <Button
          variant="ghost"
          size="sm"
          className="group/button hover:bg-primary/10"
          asChild
        >
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read Full Article
            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
