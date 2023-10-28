import { Slider } from '@mui/material'
import React from 'react'

const Step3 = ({ name, selectedTimePeriod, goal, setGoal }) => {
    return (
        <div className="step-content">
            <div className='flex flex-col items-center gap-4 py-4 sm:py-8'>
                <p className='text-black text-center text-xl sm:text-2xl manrope-semibold'>{ name.trim() !== "" ? `Hi ${name}, how many books would you like to read in ${selectedTimePeriod}?` : ""}</p>
                <p className='text-primary text-center text-xl sm:text-2xl manrope-semibold'>{goal == 1? "1 Book" : `${goal} Books`}</p>
                <Slider
                    min={1}
                    max={100}
                    value={goal}
                    valueLabelDisplay="auto"
                    onChange={(e, newValue) => setGoal(newValue)}
                    sx={{
                        color: "#FFA500",
                        maxWidth: "500px",
                        width: "80%",
                        '& .MuiSlider-thumb': {
                            backgroundColor: 'white',
                        },
                    }}
                />
            </div>
        </div>
    )
}

export default Step3