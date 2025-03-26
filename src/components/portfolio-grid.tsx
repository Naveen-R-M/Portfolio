import React from 'react';
import { Card, CardBody, CardFooter, Image, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTheme } from '@heroui/use-theme';
import { portfolioPosts } from '../data/portfolio-data';

export const PortfolioGrid = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [likes, setLikes] = React.useState<Record<string, number>>(() => {
    return portfolioPosts.reduce((acc, post) => ({
      ...acc,
      [post.id]: 10
    }), {});
  });
  const [likedPosts, setLikedPosts] = React.useState<Record<string, boolean>>({});
  const [comments, setComments] = React.useState<Record<string, string[]>>({});
  const [activeComment, setActiveComment] = React.useState<string>('');
  const [showComments, setShowComments] = React.useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    setLikedPosts(prev => {
      const newLikedPosts = { ...prev };
      newLikedPosts[id] = !prev[id];
      return newLikedPosts;
    });
    
    setLikes(prev => ({
      ...prev,
      [id]: prev[id] + (likedPosts[id] ? -1 : 1)
    }));
  };

  const handleComment = (id: string) => {
    if (activeComment.trim()) {
      setComments(prev => ({
        ...prev,
        [id]: [...(prev[id] || []), activeComment]
      }));
      setActiveComment('');
    }
  };

  const toggleComments = (id: string) => {
    setShowComments(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  
  const handlePostClick = (githubLink?: string) => {
    if (githubLink) {
      window.open(githubLink, '_blank');
    }
  };

  const formatLikes = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {portfolioPosts.map((post) => (
        <Card
          key={post.id}
          isPressable={!!post.githubLink}
          isHoverable
          className="flex flex-col cursor-pointer"
          onPress={() => handlePostClick(post.githubLink)}
        >
          <CardBody className="p-0 flex-none">
            <div className="relative group">
              <Image
                src={post.image}
                alt={post.title}
                className="w-full aspect-square object-cover"
                classNames={{
                  img: "brightness-90 group-hover:brightness-50 transition-all"
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-white text-center p-4">
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-sm">{post.description}</p>
                  {post.githubLink && (
                    <Button
                      isIconOnly
                      variant="flat"
                      className="mt-2"
                      onPress={() => window.open(post.githubLink, '_blank')}
                    >
                      <Icon 
                        icon={isDark ? "lucide:github" : "logos:github-icon"} 
                        className="text-2xl"
                      />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex-1 flex flex-col items-start gap-2 pt-4">
            <div className="flex items-center gap-4 w-full">
              <Button
                isIconOnly
                variant="light"
                onPress={() => handleLike(post.id)}
                className="group"
              >
                <Icon 
                  icon={likedPosts[post.id] ? "gravity-ui:heart-fill" : "lucide:heart"} 
                  className={`text-2xl transition-all duration-300 ${
                    likedPosts[post.id] ? 'text-red-500 scale-110' : 'group-hover:scale-110'
                  }`}
                />
              </Button>
              <Button
                isIconOnly
                variant="light"
                onPress={() => toggleComments(post.id)}
              >
                <Icon icon="lucide:message-circle" className="text-2xl" />
              </Button>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="text-small font-semibold text-left">
                {formatLikes(likes[post.id])} likes
              </p>
              <p className="text-small text-left">{post.caption}</p>
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-tiny text-primary-500 hover:text-primary-400 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {showComments[post.id] && (
              <div className="w-full mt-2">
                <div className="max-h-24 overflow-y-auto">
                  {(comments[post.id] || []).map((comment, index) => (
                    <p key={index} className="text-small text-default-600 mb-1 text-left">
                      {comment}
                    </p>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={activeComment}
                    onChange={(e) => setActiveComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-2 py-1 rounded-md bg-default-100"
                  />
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={() => handleComment(post.id)}
                  >
                    Post
                  </Button>
                </div>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
