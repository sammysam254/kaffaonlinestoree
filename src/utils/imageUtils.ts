import { supabase } from '@/integrations/supabase/client';

export const getImageUrl = (imagePath: string | null): string => {
  if (!imagePath) {
    return '/placeholder-product.jpg'; // fallback image
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // If it's a storage path, get the public URL
  if (imagePath.startsWith('product-images/')) {
    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(imagePath);
    return data.publicUrl;
  }

  // If it's just a filename, assume it's in product-images bucket
  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(`product-images/${imagePath}`);
  return data.publicUrl;
};

export const getProductImageUrl = (product: { image_url?: string | null; images?: string[] | null }): string => {
  // Try to get from images array first
  if (product.images && product.images.length > 0) {
    return getImageUrl(product.images[0]);
  }
  
  // Fall back to image_url
  return getImageUrl(product.image_url);
};