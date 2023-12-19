import React, { useState } from 'react';

const PersonalInfo = () => {
    const [fullName, setFullName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <div>
            <h2>Personal details</h2>
            <form>
                <div>
                    <label>Full name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Job title:</label>
                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                {/* Ajoutez d'autres champs d'information personnelle */}
            </form>
        </div>
    );
};

export default PersonalInfo;
