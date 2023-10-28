import React, { useState } from 'react';

import waves from '../assets/backgrounds/waves.png';
import linear from '../assets/backgrounds/linear.png';

import enabled from '../assets/buttons/enabled.svg';
import disabled from '../assets/buttons/disabled.svg';

import { useReadingList } from '../context/ReadingListContext';

import Step1 from '../utils/StepperContent/Step1';
import Step2 from '../utils/StepperContent/Step2';
import Step3 from '../utils/StepperContent/Step3';
import Step4 from '../utils/StepperContent/Step4';
import CategoryStep from "../utils/StepperContent/CategoryStep";

const ReadingListForm = () => {

    const { setNameValue, setPeriodValue, setGoalValue, setReadingInfoValue } = useReadingList();

    const stepLength = 5;

    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('1 Week');
    const [goal, setGoal] = useState(1);
    const [select, setSelect] = useState('choose for me');
    const [selectedCategories, setSelectedCategories]= useState([]);
    const nextStep = () => {
        if (step == 4 && select == "i will choose") {
            handleChoose();
            return;
        }
        setStep(step + 1);
    };
    const prevStep = () => {
        setStep(step - 1);
    };
    const handleChoose = () => {
        setNameValue(name);
        setPeriodValue(selectedTimePeriod);
        setGoalValue(goal);
        setReadingInfoValue(true);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (step < stepLength) {
            nextStep();
            return;
        }
        setNameValue(name);
        setPeriodValue(selectedTimePeriod);
        setGoalValue(goal);
        setReadingInfoValue(true);
    };
    const handleNameChange = (e) => {
        e.preventDefault();
        let newName = e.target.value;
        const words = newName.split(' ');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        newName = words.join(' ');
        if (newName.length > 40) {
            newName = newName.slice(0, 40);
        }
        setName(newName);
    };

    return (
        <div className='bg-footer py-3 px-6 sm:py-3 sm:px-8 rounded-xl w-full' style={{
            background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${linear}), url(${waves})`,
            backgroundSize: 'cover, auto 100%, cover',
            backgroundPosition: 'center, right, center',
            backgroundRepeat: 'no-repeat',
        }}>
            <form onSubmit={handleSubmit}>
                {step === 1 && <Step1 name={name} handleNameChange={handleNameChange} />}
                {step === 2 && <Step2 name={name} selectedTimePeriod={selectedTimePeriod} setSelectedTimePeriod={setSelectedTimePeriod} />}
                {step === 3 && <Step3 name={name} selectedTimePeriod={selectedTimePeriod} goal={goal} setGoal={setGoal} />}
                {step === 4 && <Step4 name={name} goal={goal} select={select} setSelect={setSelect} />}
                {step === 5 && select === 'choose for me' && <CategoryStep name={name} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />}
                <div className={`button-container flex w-full ${ step > 1 ? 'justify-between' : 'justify-end' }`}>
                    {step > 1 && (
                        <button type="button" onClick={prevStep}>
                            <img src={disabled} alt="Previous" className="h-8 w-8" />
                        </button>
                    )}
                    {step < stepLength && (
                        <button type="button" onClick={nextStep} disabled={(step == 1 && name.trim() == "") || (step == 5 && selectedCategories.length <= 0)}>
                            <img src={enabled} alt="Next" className="h-8 w-8" />
                        </button>
                    )}
                    {step === stepLength && (
                        <button type="submit" disabled={(step == 1 && name.trim() == "") || (step == 5 && selectedCategories.length <= 0)}>
                            <img src={enabled} alt="Submit" className="h-8 w-8" />
                        </button>
                    )}
                </div>
            </form>
        </div>
        
    );
}

export default ReadingListForm;
