const { spawn } = require('child_process');
const WrapUp = require('../models/WrapUp');
const path = require('path');

const processJob = (job) => {
    console.log(`[Job Processor] Starting job ${job._id}...`);
    
    WrapUp.findByIdAndUpdate(job._id, { videoStatus: 'processing' }).exec();

    // Use absolute paths to be safe, especially on Windows
    const pythonExecutable = path.join(__dirname, '..', 'python_scripts', 'venv', 'Scripts', 'python.exe');
    const pythonScriptPath = path.join(__dirname, '..', 'python_scripts', 'generate_video.py');
    
    console.log(`[Job Processor] Using Python executable: ${pythonExecutable}`);
    console.log(`[Job Processor] Running script: ${pythonScriptPath}`);

    // The command is now simpler and more direct
    const child = spawn(pythonExecutable, [pythonScriptPath, job._id.toString()]);

    let scriptOutput = "";
    let scriptError = "";

    child.stdout.on('data', (data) => {
        console.log(`[Python Script] stdout: ${data.toString().trim()}`);
        scriptOutput += data.toString();
    });

    child.stderr.on('data', (data) => {
        console.error(`[Python Script] stderr: ${data.toString().trim()}`);
        scriptError += data.toString();
    });

    child.on('close', (code) => {
        console.log(`[Job Processor] Python script for job ${job._id} exited with code ${code}`);
        
        if (code !== 0) {
            WrapUp.findByIdAndUpdate(job._id, {
                videoStatus: 'failed',
                failureReason: scriptError || `Python script exited with code ${code}`
            }).exec();
            return;
        }

        try {
            const result = JSON.parse(scriptOutput);
            if (result.status === 'completed') {
                WrapUp.findByIdAndUpdate(job._id, {
                    videoStatus: 'completed',
                    videoUrl: result.videoUrl
                }).exec();
            } else {
                throw new Error(result.reason || 'Unknown Python error.');
            }
        } catch (e) {
            WrapUp.findByIdAndUpdate(job._id, {
                videoStatus: 'failed',
                failureReason: e.message
            }).exec();
        }
    });
};

// The startPolling function remains the same
const startPolling = () => {
    console.log('[Job Processor] Started polling for pending jobs...');
    setInterval(async () => {
        const job = await WrapUp.findOneAndUpdate(
            { videoStatus: 'pending' },
            { videoStatus: 'claimed' }
        );

        if (job) {
            processJob(job);
        }
    }, 10000);
};

module.exports = { startPolling };