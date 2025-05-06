import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const ValueLabel = (props) => {
    const { children, open } = props;

    return (
        <div style={{
            position: 'absolute',
            top: '30px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '2px 5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            fontSize: '12px'
        }}>
            {children}
        </div>
    );
};

const RangeSlider = ({ min = 0, max, onChange, textToShow }) => {
    if (!min) {
        min = 0;
    }
    if (!max) {
        max = 100;
    }

    const [value, setValue] = useState([(max - min) / 4 + min, (max - min) / 4 * 3 + min]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div style={{ width: '100%', 
         backgroundColor: '#f9f9f9', 
        borderRadius: '8px',
         boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <Typography gutterBottom> טווח {textToShow}:</Typography>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="off" 
                min={min}
                max={max}
                style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <span style={{
                    backgroundColor: '#f0f0f0',
                    padding: '5px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>{value[1]}</span>
                <span style={{
                    backgroundColor: '#f0f0f0',
                    padding: '5px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>{value[0]}</span>
            </div>
            <Typography>
            </Typography>
        </div>
    );
};

export default RangeSlider;
