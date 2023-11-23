import { cn } from "@/lib/utils"

interface TitleStepProps {
  title: string;
  divClasses?: string;
  titleClasses?: string;
}

export default function TitleStep(props: TitleStepProps) {

    const { title, divClasses,  titleClasses} = props;
  return (
    <div className={cn('pt-2 pb-5', divClasses)}>
      <h2 className={cn('font-bold text-lg', titleClasses)}>{title}</h2>
    </div>
  );
}