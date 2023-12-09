import React from 'react'

const Step2 = ({ name, selectedTimePeriod, setSelectedTimePeriod }) => {
    return (
        <div className="step-content">
            <div className='flex flex-col items-center gap-4 py-4 sm:py-8'>
                <p className='text-black text-center text-xl sm:text-2xl manrope-semibold'>
                    Hi {name}, what is the time period for your reading list goal?
                </p>
                <div className="flex flex-wrap w-full gap-2 justify-center max-w-[230px]">
                    <div className="flex flex-col items-center w-[48%] gap-2">
                        <label className={`button-label rounded-md w-full py-2 px-4 text-sm text-center shadow-md cursor-pointer transition-all ease-in-out ${selectedTimePeriod === '1 week' ? 'bg-[#FFA500] text-white' : 'bg-white text-black'}`}>
                            <input
                                type="radio"
                                name="timePeriod"
                                value="1 week"
                                className="hidden"
                                onChange={() => setSelectedTimePeriod('1 week')}
                            />
                            <div className="button-radio manrope-regular">1 Week</div>
                        </label>
                        <label className={`button-label rounded-md w-full py-2 px-4 text-sm text-center shadow-md cursor-pointer transition-all ease-in-out ${selectedTimePeriod === '1 month' ? 'bg-[#FFA500] text-white' : 'bg-white text-black'}`}>
                            <input
                                type="radio"
                                name="timePeriod"
                                value="1 month"
                                className="hidden"
                                onChange={() => setSelectedTimePeriod('1 month')}
                            />
                            <div className="button-radio manrope-regular">1 Month</div>
                        </label>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-[48%]">
                        <label className={`button-label rounded-md w-full py-2 px-4 text-sm text-center shadow-md cursor-pointer transition-all ease-in-out ${selectedTimePeriod === '6 months' ? 'bg-[#FFA500] text-white' : 'bg-white text-black'}`}>
                            <input
                                type="radio"
                                name="timePeriod"
                                value="6 months"
                                className="hidden"
                                onChange={() => setSelectedTimePeriod('6 months')}
                            />
                            <div className="button-radio manrope-regular">6 Months</div>
                        </label>
                        <label className={`button-label rounded-md w-full py-2 px-4 text-sm text-center shadow-md cursor-pointer transition-all ease-in-out ${selectedTimePeriod === '1 year' ? 'bg-[#FFA500] text-white' : 'bg-white text-black'}`}>
                            <input
                                type="radio"
                                name="timePeriod"
                                value="1 year"
                                className="hidden"
                                onChange={() => setSelectedTimePeriod('1 year')}
                            />
                            <div className="button-radio manrope-regular">1 Year</div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step2