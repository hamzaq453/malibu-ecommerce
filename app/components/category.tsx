import Image from 'next/image';

interface Category {
  name: string;
  image: string;
}

export default function Home() {
  const categories: Category[] = [
    { name: 'Hoodies', image: '/Image1.jpg' },
    { name: 'Bottoms', image: '/Image5.jpg' },
    { name: 'Occasions', image: '/Image4.jpg' },
    { name: 'Summer Sets', image: '/Image3.jpg' },
  ];

  return (
    <div className="bg-white py-12 px-4 sm:px-6 md:px-8">
      <h2 className="text-3xl text-black font-bold text-center mb-6">SHOP BY CATEGORY</h2>
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
            <div className="relative w-full h-64">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover rounded-none shadow-md"
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
