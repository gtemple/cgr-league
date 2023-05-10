import { useEffect, useState } from 'react';

const useGetImage = (profileImage: string) => {
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (profileImage) {
          const importedImage = await import(`../assets/driver-profiles/${profileImage}.jpg`);
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