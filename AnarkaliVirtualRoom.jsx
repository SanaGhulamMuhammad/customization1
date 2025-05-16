import React, { useState } from "react";



const AnarkaliVirtualRoom = () => {
  const [selectedSilhouette, setSelectedSilhouette] = useState("flared");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedFabric, setSelectedFabric] = useState(""); // new fabric state

  const [embellishments, setEmbellishments] = useState({
    border: { img: null, x: 100, y: 100, scale: 1, borderRadius: 0 },
    neck: { img: null, x: 100, y: 100, scale: 1, borderRadius: 0 },
    sleeves: { img: null, x: 100, y: 100, scale: 1, borderRadius: 0 },
    curve: { img: null, x: 100, y: 100, scale: 1, borderRadius: 0 },
    center: { img: null, x: 100, y: 100, scale: 1, borderRadius: 0 },
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);

const handleSaveShareClick = () => {
  setShowPaymentModal(true);
};

const closeModal = () => {
  setShowPaymentModal(false);
};

  const handleBorderRadius = (type, value) => {
    setEmbellishments((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        borderRadius: value,
      },
    }));
  };

  const [embellishmentColor, setEmbellishmentColor] = useState("gold");

  const silhouetteOptions = ["long", "simple", "short", "layered", "sleevless", "neckoff"];

  const embellishmentOptions = {
    border: ["border1.png", "border2.png", "border3.png", "border4.png", "border6.png", "border7.png"],
    neck: ["neck.png", "neck1.png", "neck2.png", "neck3.png", "neck4.png", "neck5.png", "neck6.png", "neck7.png"],
    sleeves: ["sleeves.png","sleeves1.png","sleeves2.png","sleeves3.png","sleeves4.png"],
    center: ["center.png","center1.png","center2.png","center3.png"],
  };

  const colorOptions = [/* ... colors ... */ "#FF0000", "#DC143C", "#B22222", "#8B0000", "#FF6347", "#FFC0CB", "#FF69B4", "#FFB6C1", "#DB7093", "#F08080", "#FFFF00", "#FFD700", "#FFA500", "#FFE4B5", "#FFFACD", "#0000FF", "#1E90FF", "#87CEEB", "#4682B4", "#ADD8E6", "#008000", "#00FF00", "#98FB98", "#32CD32", "#ADFF2F", "#F5F5DC", "#F5DEB3", "#DEB887", "#D2B48C", "#EEE8AA", "#FFFFFF", "#C0C0C0", "#000000", "#808080", "#A52A2A", "#800080", "#FF4500", "#2F4F4F", "#BC8F8F", "#696969"];

  const embellishmentColors = ["#FFD700", "#FFCC00", "#DAA520", "#B8860B", "#A0522D", "#CD5C5C", "#B22222", "#8B0000", "#006400", "#228B22", "#32CD32", "#000080", "#1E90FF", "#87CEFA", "#000000", "#333333", "#FFFFFF", "#F5F5F5", "#C0C0C0", "#D3D3D3"];

  const handleColorClick = (color) => {
    setSelectedColor(prev => prev === color ? null : color);
  };

  const handleEmbellishmentClick = (type, image) => {
    setEmbellishments(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        img: prev[type].img === image ? null : image,
        x: 100,
        y: 100,
        scale: 1,
      },
    }));
  };

  const handleResize = (type, scale) => {
    setEmbellishments(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        scale,
      },
    }));
  };

  const handleDrag = (e, type) => {
    const rect = e.currentTarget.parentNode.getBoundingClientRect();
    const x = e.clientX - rect.left - 50;
    const y = e.clientY - rect.top - 50;

    setEmbellishments((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        x,
        y,
      },
    }));
  };

  // Fabric options list (20+ fabrics)
  const fabricOptions = [
    "Chiffon", "Khaddar", "Satin", "Organza", "Cotton", "Linen", "Silk", "Velvet",
    "Denim", "Georgette", "Crepe", "Tweed", "Jacquard", "Taffeta", "Brocade", "Chintz",
    "Flannel", "Gabardine", "Herringbone", "Jersey", "Lace", "Mesh", "Poplin", "Rayon"
  ];

  return (
    <div className="h-screen bg-gray-100 p-4 flex flex-col md:flex-row gap-4">
      {/* Left Panel */}
      <div className="w-full md:w-3/4 bg-white rounded-xl shadow-lg p-4 space-y-9 overflow-y-auto h-full">
        {/* Silhouette */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Select Silhouette</h2>
          <div className="flex flex-wrap gap-2">
            {silhouetteOptions.map((option) => (
              <button
                key={option}
                className={`border px-3 py-1 rounded-lg text-sm ${selectedSilhouette === option ? "bg-blue-500 text-white" : ""}`}
                onClick={() => setSelectedSilhouette(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Dress Color */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Select Dress Color</h2>
          <div className="grid grid-cols-6 gap-2">
            {colorOptions.map((color) => (
              <div
                key={color}
                className={`w-6 h-6 rounded-full cursor-pointer border-2 ${selectedColor === color ? "border-black" : "border-gray-300"}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
              ></div>
            ))}
          </div>
        </div>

        {/* Fabric Selection */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Select Fabric</h2>
          <select
            className="border rounded px-3 py-2 w-full"
            value={selectedFabric}
            onChange={(e) => setSelectedFabric(e.target.value)}
          >
            <option value="">-- Select Fabric --</option>
            {fabricOptions.map((fabric) => (
              <option key={fabric} value={fabric}>
                {fabric}
              </option>
            ))}
          </select>
        </div>

        {/* Embellishments */}
        {Object.keys(embellishmentOptions).map((type) => (
          <div key={type}>
            <h2 className="text-xl font-semibold capitalize mb-2">{type}</h2>
            <div className="flex gap-2 overflow-x-auto">
              {embellishmentOptions[type].map((img) => (
                <img
                  key={img}
                  src={`/images/embellishments/${img}`}
                  alt={type}
                  onClick={() => handleEmbellishmentClick(type, img)}
                  className={`w-16 h-16 object-contain cursor-pointer border-2 rounded-md ${embellishments[type].img === img ? "border-blue-500" : "border-gray-300"}`}
                />
              ))}
            </div>

            {/* Resize Range */}
            {embellishments[type].img && (
              <div className="mt-2 space-y-1">
                <label className="text-sm">Resize:</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={embellishments[type].scale}
                  onChange={(e) => handleResize(type, parseFloat(e.target.value))}
                  className="w-full"
                />
                <label className="text-sm">Curve (Border Radius):</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={embellishments[type].borderRadius}
                  onChange={(e) => handleBorderRadius(type, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
          </div>
        ))}

        {/* Embellishment Color */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Embellishment Color</h2>
          <div className="grid grid-cols-6 gap-2">
            {embellishmentColors.map((color) => (
              <div
                key={color}
                className={`w-6 h-6 rounded-full cursor-pointer border-2 ${embellishmentColor === color ? "border-black" : "border-gray-300"}`}
                style={{ backgroundColor: color }}
                onClick={() => setEmbellishmentColor(color)}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Preview Panel */}
      <div className="w-full md:w-2/3 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center relative sticky top-0 h-screen p-4 pb-20">

        <div className="relative w-[300px] h-[600px] mb-4">
          {/* Colored silhouette background */}
          {selectedSilhouette && selectedColor && (
            <div
              className="absolute z-10 w-full h-full"
              style={{
                backgroundColor: selectedColor,
                WebkitMaskImage: `url(/images/silhouettes/anarkali/${selectedSilhouette}.png)`,
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                WebkitMaskPosition: "center",
                maskImage: `url(/images/silhouettes/anarkali/${selectedSilhouette}.png)`,
                maskRepeat: "no-repeat",
                maskSize: "contain",
                maskPosition: "center",
              }}
            />
          )}

          {/* Original silhouette if no color selected */}
          {selectedSilhouette && !selectedColor && (
            <img
              src={`/images/silhouettes/anarkali/${selectedSilhouette}.png`}
              alt="Dress"
              className="absolute w-full h-full object-contain z-10"
            />
          )}

          {/* Drag-and-drop embellishments */}
          {Object.entries(embellishments).map(([type, data]) =>
            data.img ? (
              <div
                key={type}
                className="absolute z-30 w-[100px] h-[100px] cursor-move"
                style={{
                  top: data.y,
                  left: data.x,
                  transform: `scale(${data.scale})`,
                  backgroundColor: embellishmentColor,
                  WebkitMaskImage: `url(/images/embellishments/${data.img})`,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  WebkitMaskPosition: "center",
                  maskImage: `url(/images/embellishments/${data.img})`,
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                  maskPosition: "center",
                  clipPath: `inset(${data.borderRadius}% round ${data.borderRadius}%)`,
                }}
                
                draggable
                onDragEnd={(e) => handleDrag(e, type)}
              />
            ) : null
          )}
        </div>

        {/* Display selected fabric here as text form */}
        <div className="w-full max-w-md">
          <label className="block text-lg font-semibold mb-2">Selected Fabric:</label>
          <input
            type="text"
            readOnly
            value={selectedFabric}
            placeholder="No fabric selected"
            className="w-full border border-gray-300 rounded px-3 py-2 text-center"
          />
        </div>
      </div>
      {/* Save and Share Button as footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 flex justify-center z-50">
        <button
          onClick={handleSaveShareClick}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Save and Share
        </button>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center relative">
            <h2 className="text-xl font-semibold mb-4">Payment Required</h2>
            <p className="mb-6">
              Please make a payment of <strong>$3</strong> first, then you can download your design.
            </p>
            <button
              onClick={closeModal}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
          </div>
          )}
          </div>
        );
      };
      
      export default AnarkaliVirtualRoom;
    
    
   
