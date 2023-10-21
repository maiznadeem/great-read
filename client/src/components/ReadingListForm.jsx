import React, { useState } from 'react';
import waves from '../assets/backgrounds/waves.png';
import linear from '../assets/backgrounds/linear.png';

import enabled from '../assets/buttons/enabled.svg';
import disabled from '../assets/buttons/disabled.svg';

const ReadingListForm = () => {

    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('1 Week');
    const [goal, setGoal] = useState('');
    const nextStep = () => {
        setStep(step + 1);
    };
    const prevStep = () => {
        setStep(step - 1);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const steps = [
        {
            content: (
                <div className="step-content">
                    <div className='flex flex-col items-center gap-4 sm:gap-8 py-4 sm:py-8'>
                        <p className='text-black text-center text-xl sm:text-3xl manrope-semibold'>Create your reading goal</p>
                        <input
                            type="text"
                            className='bg-white border-gray-500 border-[1px] sm:py-4 sm:px-8 px-6 py-3 w-full max-w-[500px] text-md sm:text-xl manrope-regular text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:ring-opacity-50'
                            placeholder='Enter your name...'
                        />
                        <p className='text-black text-center text-sm sm:text-md manrope-regular max-w-[500px]'>You will be able to download it as a PDF and/or share it on your LinkedIn</p>
                    </div>
                </div>
            ),
        },
        {
            content: (
                <div className="step-content">
                    <div className='flex flex-col items-center gap-4 sm:gap-8 py-4 sm:py-8'>
                        <p className='text-black text-center text-xl sm:text-3xl manrope-semibold'>
                            Hi {name}, What is the time period for your reading list goal?
                        </p>
                        <div className="flex flex-wrap w-full gap-2 justify-center max-w-[500px]">
                            <div className="flex flex-col items-center w-[48%] gap-2">
                                <label className={`button-label rounded-md w-full py-2 px-4 text-center shadow-md cursor-pointer transition-all ease-in-out ${selectedTimePeriod === '1 Week' ? 'bg-[#FFA500] text-white' : 'bg-white text-black'}`}>
                                    <input
                                        type="radio"
                                        name="timePeriod"
                                        value="1 Week"
                                        className="hidden"
                                        onChange={() => setSelectedTimePeriod('1 Week')}
                                    />
                                    <div className="button-radio">1 Week</div>
                                </label>
                                <label className={`button-label rounded-md w-full py-2 px-4 text-center shadow-md cursor-pointer transition-all ease-in-out ${selectedTimePeriod === '1 Month' ? 'bg-[#FFA500] text-white' : 'bg-white text-black'}`}>
                                    <input
                                        type="radio"
                                        name="timePeriod"
                                        value="1 Month"
                                        className="hidden"
                                        onChange={() => setSelectedTimePeriod('1 Month')}
                                    />
                                    <div className="button-radio">1 Month</div>
                                </label>
                            </div>
                            <div className="flex flex-col items-center gap-2 w-[48%]">
                                <label className={`button-label rounded-md w-full py-2 px-4 text-center shadow-md cursor-pointer transition-all ease-in-out ${selectedTimePeriod === '6 Months' ? 'bg-[#FFA500] text-white' : 'bg-white text-black'}`}>
                                    <input
                                        type="radio"
                                        name="timePeriod"
                                        value="6 Months"
                                        className="hidden"
                                        onChange={() => setSelectedTimePeriod('6 Months')}
                                    />
                                    <div className="button-radio">6 Months</div>
                                </label>
                                <label className={`button-label rounded-md w-full py-2 px-4 text-center shadow-md cursor-pointer transition-all ease-in-out ${selectedTimePeriod === '1 Year' ? 'bg-[#FFA500] text-white' : 'bg-white text-black'}`}>
                                    <input
                                        type="radio"
                                        name="timePeriod"
                                        value="1 Year"
                                        className="hidden"
                                        onChange={() => setSelectedTimePeriod('1 Year')}
                                    />
                                    <div className="button-radio">1 Year</div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className='bg-[#F2EADF] py-6 px-8 sm:py-8 sm:px-12 rounded-md w-full' style={{
            background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${waves}), url(${linear})`,
            backgroundSize: 'cover, cover, cover',
            backgroundPosition: 'center, center, center',
        }}>
            <form onSubmit={handleSubmit}>
                {steps[step - 1].content}
                <div className={`button-container flex w-full ${ step > 1 ? 'justify-between' : 'justify-end' }`}>
                    {step > 1 && (
                        <button type="button" onClick={prevStep}>
                            <img src={disabled} alt="Previous" className="h-8 w-8" />
                        </button>
                    )}
                    {step < steps.length && (
                        <button type="button w-full" onClick={nextStep}>
                            <img src={enabled} alt="Next" className="h-8 w-8" />
                        </button>
                    )}
                    {step === steps.length && (
                        <button type="submit">
                            <img src={enabled} alt="Submit" className="h-8 w-8" />
                        </button>
                    )}
                </div>
            </form>
        </div>
        
    );
}

export default ReadingListForm;
