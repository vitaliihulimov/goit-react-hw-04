import { BeatLoader } from "react-spinners";
import "./Loader.modules.css";

export default function Loader() {
  return (
    <BeatLoader
      className="loader"
      loading={true}
      size={30}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
