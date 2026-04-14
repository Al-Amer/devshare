export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  description: string;
  category?: string; 
}
export interface SharedResource {
  id: string;
  videoId: string;
  title: string;
  sharedBy: string;
  sharedAt: Date;
}
export interface Category {
  name: string;
  icon: string;
  color: string;
}