
import { useMultistepForm } from "@/hooks/useMultiStepForm";

import React, { useState, type ReactElement } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { motion } from 'framer-motion'
import { CheckCircle, Circle } from "lucide-react";
import BeContactedForm from "./be-contacted-form";
import ChoosePrestationForm from "./choose-prestation-form";
import BookingForm from "../booking/BookingForm";
import { useCustomModal } from "@/hooks/useCustomModal";
import { useService } from "@/hooks/useService";


const MultiStep = () => {

    const setOpen = useCustomModal.use.onOpen();
    const isOpen = useCustomModal.use.isOpen();
    const setCloseModal = useCustomModal.use.onClose();
    const isPrestaAlreadyChoose = useCustomModal.use.isPrestaAlreadyChoose();
    const serviceId = useService.use.serviceId();

    const [loading, setLoading] = useState<boolean>(false);

    const [localisation, setLocalisation] = useState<string>("");

    const redirectAfterLocalisation = () => {
        next()
    }

    const {
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        back,
        steps,
        goTo,
        next,
    } = useMultistepForm([
        <SelectLocalisation redirectAfterLocalisation={redirectAfterLocalisation} localisation={localisation} setLocalisation={setLocalisation} />,
        <>{localisation === "domicile" ? (
            <BeContactedForm />
        ) : (
            <>
                {!serviceId ? (<ChoosePrestationForm redirectAfterLocalisation={redirectAfterLocalisation} />) : (<BookingForm open={isOpen} setOpen={setOpen} setClose={setCloseModal} isCloseButtonActive={false} />)}
            </>
        )}</>,
        <BookingForm open={isOpen} setOpen={setOpen} setClose={setCloseModal} isCloseButtonActive={false} />,
        <>4</>
    ]);


    return (
        <>
            {/* <StepIndicator currentStep={currentStepIndex} steps={steps} /> */}
            <div className="space-y-5 ">
                {step}
                {!isLastStep && (
                    <div className="grid grid-cols-5 gap-2">

                        {!isFirstStep && ((!isPrestaAlreadyChoose && currentStepIndex !== 2) || (isPrestaAlreadyChoose && currentStepIndex !== 1)) ? (
                            <Button
                                type="button"
                                onClick={() => {
                                    if (currentStepIndex == 2) {
                                        goTo(0)
                                    } else {
                                        back()
                                    }
                                }}
                                className="w-full col-span-2"
                            >
                                Retour
                            </Button>
                        ) : (
                            <div className="col-span-2 w-full"></div>
                        )}


                        <>
                            {/* <small className="text-center self-center">
                                {currentStepIndex + 1} / {steps.length}
                            </small> */}
                            {/* <Button
                            onClick={() => {
                                next()
                            }}
                                type="button"
                                variant="outline"
                                className="w-full col-span-2"
                                disabled={

                                    currentStepIndex + 1 === 3 ||
                                    loading
                                }
                            >
                                {currentStepIndex === 3
                                    ? "Confirmer"
                                    : "Suivant"}
                            </Button> */}
                        </>

                    </div>
                )}
            </div>
        </>
    );
};

export default MultiStep;


type SelectLocalisationProps = {
    redirectAfterLocalisation: () => void;
    localisation: string;
    setLocalisation: (value: string) => void;
}
export const SelectLocalisation = (props: SelectLocalisationProps) => {
    const { redirectAfterLocalisation, localisation, setLocalisation } = props;
    // const [localisation, setLocalisation] = useState<string>("");
    const setDisplayTitle = useCustomModal.use.setDisplayTitle();
    const setSubtitleModal = useCustomModal.use.setSubtitle();
    const serviceId = useService.use.serviceId();
    return (
        <div className="max-w-[300px] mx-auto pt-8 mb-8 z-[5000] relative">
            {/* {localisation && localisation === "domicile" && (
                <div>Contactez nous</div>
            )} */}

            {/* {!localisation && ( */}
            <Select
                // defaultValue={"salon"}
                onValueChange={(e) => {
                    redirectAfterLocalisation()

                    if (serviceId) {
                        setDisplayTitle(false)
                    }

                    setLocalisation(e)

                    if (e === "domicile") {
                        setSubtitleModal("Quelle prestation souhaitez-vous réserver ?")
                    }

                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisissez le lieu de prestation" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {/* <SelectLabel>Fruits</SelectLabel> */}
                        <SelectItem value="salon">En salon</SelectItem>
                        <SelectItem value="domicile">A domicile</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {/* )} */}
        </div>
    )
}


const StepIndicator: React.FC<{
    currentStep: number
    steps: ReactElement[]
}> = ({ currentStep, steps }) => (
    <div className="relative w-full">
        <div className="flex items-center justify-between">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col items-center">
                        <motion.div
                            className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${index <= currentStep
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 text-white dark:bg-gray-800 dark:text-gray-600'
                                }`}
                            animate={{ scale: 1.02 }}
                        >
                            {index < currentStep ? (
                                <CheckCircle size={17} />
                            ) : (
                                <Circle size={17} fill="currentColor" />
                            )}
                        </motion.div>
                    </div>
                    {index < steps.length - 1 && (
                        <div className="relative flex-grow">
                            <div className="absolute -top-1 h-1.5 w-full bg-gray-100 dark:bg-gray-800" />
                            <motion.div
                                className="absolute -top-1 h-1.5 w-full bg-red-500"
                                initial={{ width: '0%' }}
                                animate={{
                                    width: index < currentStep ? '100%' : '0%',
                                }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                            />
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    </div>
)