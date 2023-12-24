import { loadState } from '@/browser-storage';
import { configureStore } from '@reduxjs/toolkit';
import resumeReducer, { ResumeState } from '@store/resume/resume.slice';

export interface AppState {
    resume: ResumeState;
}

const store = configureStore({
    reducer: {
        resume: resumeReducer,
    },
    preloadedState: loadState(),
});

export default store;
