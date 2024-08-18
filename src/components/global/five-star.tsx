import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

const FiveStar = () => {
  return (
    <div className="space-y-1 ">
      <div className="flex items-center gap-1.5 ">
        <div className="flex items-center justify-start gap-px">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div key={index}>
              <StarIcon
                size={"24"}
                className={cn("fill-yellow-400 stroke-0")}
              />
            </div>
          ))}
        </div>
        <span className="font-montserrat font-medium text-[15px]">5.0</span>
      </div>
      <p className="text-xs font-normal pl-1.5 font-montserrat">Sur + 90 avi(s)</p>
    </div>
  );
};

export default FiveStar;
