import Image from 'next/image';

interface Category {
  name: string;
  image: string;
}

export default function Home() {
  const categories: Category[] = [
    { name: 'Shop Lounge', image: '/category1.png' },
    { name: 'Shop Tops', image: '/category2.png' },
    { name: 'Shop Dresses', image: '/category3.png' },
    { name: 'Summer Shop', image: '/category4.png' },
  ];

  return (
    <div className="bg-white py-4 px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            tabIndex={0} // make div focusable for mobile tap
            className="group cursor-pointer 
              hover:scale-105 hover:shadow-lg 
              focus:scale-105 focus:shadow-lg 
              transition-transform duration-300"
          >
            <div className="relative w-full aspect-square">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-contain rounded-none shadow-md"
              />
            </div>
            <div
              className="
                bg-white text-center py-2 border border-black
                group-hover:bg-black group-hover:text-white
                focus-within:bg-black focus-within:text-white
                transition-colors duration-300
              "
            >
              <p className="text-lg font-semibold text-gray-800 group-hover:text-white focus-within:text-white">
                {category.name.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
