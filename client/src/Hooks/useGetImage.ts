import { useEffect, useState } from 'react';

const useGetImage = (profileImage: string | undefined, type: string) => {
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (profileImage && type === 'driver') {
          const importedImage = await import(`../assets/driver-profiles/${profileImage}.jpg`);
          setImg(importedImage.default);
        } else if (profileImage && type ==='flag') {
          const importedImage = await import(`../assets/flags/${profileImage}.jpg`);
          setImg(importedImage.default);
        } else if (profileImage && type ==='layout') {
          const importedImage = await import(`../assets/layouts/${profileImage}.jpg`);
          setImg(importedImage.default);
        } else if (profileImage && type === 'track-image') {
          const importedImage = await import(`../assets/track-images/${profileImage}.jpg`);
          setImg(importedImage.default);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load image:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [profileImage]);

  return { loading, img };
};

export default useGetImage;