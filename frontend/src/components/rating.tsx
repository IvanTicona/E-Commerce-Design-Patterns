import EmptyStar from "@/icons/emptyStar";
import FilledStar from "@/icons/filledStar";
import HalfStar from "@/icons/halfStar";

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  let filled = Math.floor(rating);
  const remainder = rating - filled;
  let half = 0;

  if (remainder >= 0.5 && remainder < 0.9) {
    half = 1;
  } else if (remainder >= 0.9) {
    filled++;
  }
  const empty = 5 - filled - half;

  return (
    <div className="flex">
      {Array.from({ length: filled }).map((_, i) => (
        <FilledStar key={`filled-${i}`} />
      ))}
      {half === 1 && <HalfStar key="half" />}
      {Array.from({ length: empty }).map((_, i) => (
        <EmptyStar key={`empty-${i}`} />
      ))}
    </div>
  );
};

export default Rating;
