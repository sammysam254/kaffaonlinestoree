import { supabase } from '@/integrations/supabase/client';

export const getImageUrl = (product: any): string => {
  // If we have base64 image data stored in database, use it
  if (product?.image_data && product?.image_type) {
    return `data:${product.image_type};base64,${product.image_data}`;
  }

  // Legacy: Check for image_url field
  if (product?.image_url) {
    return product.image_url;
  }

  // Legacy: Check for images array
  if (product?.images && product.images.length > 0) {
    return product.images[0];
  }

  // Fallback to placeholder image
  return '/placeholder-product.jpg';
};

export const getProductImageUrl = (product: any): string => {
  return getImageUrl(product);
};