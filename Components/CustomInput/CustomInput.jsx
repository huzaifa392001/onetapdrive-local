'use client'
import React, { useState } from 'react';
import './CustomInput.scss';

function CustomInput(props) {
    const inputType = props?.inputType || 'text';
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    // Handling Search Input
    if (props?.searchInput) {
        return (
            <div className="inputCont withBtn">
                <input type="text" placeholder="Search" />
                <button>
                    <i className="fas fa-search" />
                </button>
            </div>
        );
    }

    // Handling Textarea Input
    else if (props?.textArea) {
        return (
            <div className="inputCont textarea">
                <textarea placeholder={props?.placeholder} rows={props?.rows}></textarea>
            </div>
        );
    }

    // Handling Default Input (Password or Text)
    else {
        return (
            <div className={`inputCont ${props?.leftIcon && 'leftIcon'} ${inputType === 'password' && 'password'}`}>
                <input
                    type={inputType === 'password' ? (showPassword ? 'text' : 'password') : inputType}
                    required={props?.required || false}
                    placeholder={props?.placeholder}
                    value={props?.value}
                    onChange={props?.onChange}
                />
                {props?.leftIcon && (
                    <div className="icon">
                        <i className={`fas ${props?.leftIcon}`} />
                    </div>
                )}
                {inputType === 'password' && (
                    <button
                        type="button"
                        className="eyeIconCont"
                        onClick={togglePasswordVisibility}
                    >
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                    </button>
                )}
            </div>
        );
    }
}

export default CustomInput;
