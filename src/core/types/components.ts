export type Media = 'movie' | 'tv';

export type ImageCell = {
  id: number;
  imageUrl: string;
  primaryText: string;
  secondaryText?: string;
  media?: Media;
};
export type GridData = {
  id: number;
  imagePath: string | null;
  primaryText: string;
  secondaryText?: string;
};
