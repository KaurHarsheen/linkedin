import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaSpinner } from 'react-icons/fa';

const InterviewHomePage = () => {
    const [role, setRole] = useState('Software Engineer (DSA Focus)');
    const [company, setCompany] = useState('Tech Giant');
    const [difficulty, setDifficulty] = useState('Medium');
    const [timeLimit, setTimeLimit] = useState(30); // Default time limit in minutes
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`/api/interview/start`, { role, company, difficulty, timeLimit });
            // Pass the entire interview object to the interview page state
            navigate(`/interview/${response.data._id}`, { state: { interviewData: response.data } });
        } catch (err) {
            setError('Failed to start interview. The AI server might be busy. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center">
                    <FaRobot className="mx-auto h-12 w-12 text-blue-400" />
                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight">AI Interview Agent</h1>
                    <p className="mt-2 text-gray-400">Configure your structured interview</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-400 text-center">{error}</p>}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300">Job Role</label>
                        <input id="role" value={role} onChange={(e) => setRole(e.target.value)} type="text" required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"/>
                    </div>
                    <div>
                        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300">Difficulty</label>
                        <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                    {/* NEW Time Limit Selector */}
                    <div>
                        <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-300">Interview Duration</label>
                        <select id="timeLimit" value={timeLimit} onChange={(e) => setTimeLimit(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md">
                            <option value={15}>15 Minutes</option>
                            <option value={30}>30 Minutes</option>
                            <option value={45}>45 Minutes</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400">
                            {loading ? <FaSpinner className="animate-spin h-5 w-5" /> : 'Start Interview'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InterviewHomePage;