// import "./ImageCard.modules.css";

// export default function ImageCard({ small, alt }) {
//   return (
//     <div>
//       <img className="galleryImg" src={small} alt={alt} />
//     </div>
//   );
// }

import "./ImageCard.modules.css";

export default function ImageCard({ small, alt, onClick }) {
  return (
    <div>
      <img
        className="galleryImg"
        src={small}
        alt={alt}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
