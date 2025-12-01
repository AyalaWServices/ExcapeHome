export const initGallery = () => {
  const galleryContainer = document.getElementById('gallery-grid');
  if (!galleryContainer) return;

  const images = [
    { src: 'https://lh3.googleusercontent.com/d/1tRKpcY3rzu0nmd4IzPyhYMmOwqf_bEIH', likes: 12, span: 'md:row-span-2', alt: 'Vintage motorcycle on a cobblestone street' },
    { src: 'https://lh3.googleusercontent.com/d/16X99d9GtLVkHu8G3YrhzMeE1ZeTxpsPu', likes: 9, alt: 'Close up of a grasshopper on a branch' },
    { src: 'https://lh3.googleusercontent.com/d/1AqgjYrQMaPU95NtNGfE1XmZiaP1iwv8B', likes: 43, alt: 'Portrait of a woman with dark hair' },
    { src: 'https://lh3.googleusercontent.com/d/1jRdxLvFW1BhaGlcJcQ91Pheu4BjVKvbO', likes: 52, alt: 'Person looking into the distance' },
    { src: 'https://lh3.googleusercontent.com/d/1PBPdMBJBDDUIQmvhr1AZpLcClv3sTNcy', likes: 24, span: 'md:row-span-2', alt: 'Blossoms on a branch against a gray background' },
    { src: 'https://lh3.googleusercontent.com/d/1EveStzRB6MSwpz9v-GFv9EO62O-HrhnT', likes: 36, alt: 'Steaming coffee mug on a dark background' },
    { src: 'https://lh3.googleusercontent.com/d/1ATjOMUWHY9KxIjC-KBt5bHvAlkZv1ZRr', likes: 98, span: 'md:row-span-2', alt: 'Person sitting above the clouds at sunset' },
    { src: 'https://lh3.googleusercontent.com/d/1oeuYU0w1MV5EXscw5huyfVRcLererLX1', likes: 78, alt: 'Curly-haired child looking into camera' },
    { src: 'https://lh3.googleusercontent.com/d/1RCspb9VxN4UHNh_nlfZWVxnCpJGdxtZm', likes: 31, alt: 'Portrait silhouette backlit' },
    { src: 'https://lh3.googleusercontent.com/d/1-hLh-IfWtpQATx6Z9ycYwNLBzjbFWRIy', likes: 18, alt: 'Dark moody portrait' },
    { src: 'https://lh3.googleusercontent.com/d/1iF4cxfSETAd94qnNSKYM2nmgcARriB6k', likes: 45, alt: 'Mountain landscape with clouds' },
    { src: 'https://lh3.googleusercontent.com/d/15ZXM71qQBBxJzwj6H7NQ9q0y8spK1p70', likes: 27, alt: 'Abstract detail' }
  ];

  // Grid layout to mimic the reference collage
  galleryContainer.className = 'grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[240px] gap-4';

  galleryContainer.innerHTML = images.map(({ src, likes, span }, index) => `
    <div class="relative overflow-hidden group rounded-lg shadow-md bg-neutral-100 dark:bg-neutral-900 ${span || ''}">
      <img
        src="${src}"
        alt="Gallery image ${index + 1}"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div class="absolute bottom-3 left-3 flex items-center space-x-2 bg-neutral-900/75 text-white px-3 py-1 rounded-full text-xs tracking-wide">
        <span class="text-pink-400">❤</span>
        <span>${likes} Likes</span>
      </div>
    </div>
  `).join('');
};
