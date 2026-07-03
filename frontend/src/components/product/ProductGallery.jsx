import { useState } from "react";

const ProductGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  const displayImage =
    selectedImage ||
    "https://placehold.co/700x500?text=No+Image";

  return (
    <div>
      <img
        src={displayImage}
        alt="Product"
        className="w-full h-[450px] object-cover rounded-2xl border"
      />

      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              onClick={() => setSelectedImage(image)}
              className={`w-20 h-20 rounded-xl object-cover cursor-pointer border-2 transition ${
                selectedImage === image
                  ? "border-green-600"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;