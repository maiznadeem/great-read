import React from 'react'

const Step4 = ({ name, goal, select, setSelect }) => {
    return (
        <div className="step-content">
            <div className='flex flex-col items-center gap-4 py-4 sm:py-8'>
                <p className='text-black text-center text-xl sm:text-2xl manrope-semibold'>
                    Hi {name}, how would you like to select {`${goal == 1 ? "1 book" : `${goal} books`}`}?
                </p>
                <div className="flex w-full flex-col sm:flex-row gap-2 justify-center max-w-[140px] sm:max-w-[280px]">
                    <label className={`button-label rounded-md w-full py-2 px-4 text-sm text-center shadow-md cursor-pointer transition-all ease-in-out ${select === 'choose for me' ? 'bg-[#FFA500] text-white' : 'bg-white text-black'}`}>
                        <input
                            type="radio"
                            name="select"
                            value="choose for me"
                            className="hidden"
                            onChange={() => setSelect('choose for me')}
                        />
                        <div className="button-radio manrope-regular">Choose for me*</div>
                    </label>
                    <label className={`button-label rounded-md w-full py-2 px-4 text-sm text-center shadow-md cursor-pointer transition-all ease-in-out ${select === 'i will choose' ? 'bg-[#FFA500] text-white' : 'bg-white text-black'}`}>
                        <input
                            type="radio"
                            name="select"
                            value="i will choose"
                            className="hidden"
                            onChange={() => setSelect('i will choose')}
                        />
                        <div className="button-radio manrope-regular">I'll choose</div>
                    </label>
                </div>
                <p className='text-black text-center text-sm sm:text-md manrope-regular max-w-[500px]'>*You will have the option to choose the categories before your shelf is stacked for you.</p>
            </div>
        </div>
    )
}

export default Step4