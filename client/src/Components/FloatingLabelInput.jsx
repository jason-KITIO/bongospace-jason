import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './FloatingLabelInput.css';

const FloatingLabelInput = ({ label, type, id, name, onChange, value, minLength = 0 }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    // const [isFocused, setIsFocused] = useState(false);

    // Vérifiez si l'input a une valeur pour garder le label en position "flottante"
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        // Ne pas désactiver le focus si l'input a une valeur
        if (!value) {
            setIsFocused(false);
        }
    };


    return (
        <div className={`input-container ${isFocused || value ? 'focused' : ''}`}>
            <input
                id={id}
                name={name}
                type={type === 'password' && showPassword ? 'text' : type}
                value={value}
                onFocus={handleFocus}
                className="input-field"
                onChange={onChange}
                onBlur={handleBlur}
                required
                minLength={minLength}
            />

            {type === 'password' && (
                <span
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer' }}
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
            )}
            <label className="floating-label">{label}</label>
        </div>
    );
};

export default FloatingLabelInput;