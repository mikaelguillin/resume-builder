import { FormElement } from '@components/form/FormTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ExperienceItem {
    id: string;
    jobTitle: string;
    employer: string;
    city: string;
    country: string;
    description: string;
}

interface EducationItem {
    id: string;
    degree: string;
    school: string;
    city: string;
    country: string;
    description: string;
}

export type SectionItem = ExperienceItem | EducationItem;

export interface ResumeSection {
    name: string;
    configSection: {
        key: string;
        title: string;
        addItemLabel: string;
        formElements: FormElement[];
        icon: string;
    };
    items: SectionItem[];
}

export interface ResumeState {
    sections: ResumeSection[];
    personalDetails: {
        fullname: string;
        jobTitle?: string;
        email?: string;
        address?: string;
    };
}

interface ResumeSectionAction {
    sectionName: string;
    item: SectionItem;
}

const initialState: ResumeState = {
    sections: [],
    personalDetails: {
        fullname: '',
        jobTitle: '',
        email: '',
        address: '',
    },
};

export const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {
        addSection: (state, action) => {
            state.sections.push(action.payload);
        },
        deleteSection: (state, action) => {
            state.sections = state.sections.filter(
                (s) => s.name !== action.payload,
            );
        },
        addItemToSection: (
            state,
            action: PayloadAction<ResumeSectionAction>,
        ) => {
            const { sectionName, item } = action.payload;
            const section = state.sections.find((s) => s.name === sectionName);
            if (section) {
                section.items.push(item);
            }
        },
        editSectionItem: (
            state,
            action: PayloadAction<ResumeSectionAction>,
        ) => {
            const { sectionName, item } = action.payload;
            const sectionToEdit = state.sections.findIndex(
                (s) => s.name === sectionName,
            );
            const itemToEdit = state.sections[sectionToEdit].items.findIndex(
                (i) => i.id === item.id,
            );
            state.sections[sectionToEdit].items[itemToEdit] = item;
        },
        removeItemFromSection: (
            state,
            action: PayloadAction<ResumeSectionAction>,
        ) => {
            const { sectionName, item } = action.payload;
            const section = state.sections.find((s) => s.name === sectionName);

            if (section) {
                section.items = section.items.filter((si) => si.id !== item.id);
            }
        },
        editPersonalDetails: (state, action) => {
            state.personalDetails = action.payload;
        },
    },
    selectors: {
        selectSections: (state) => state.sections,
        selectPersonalDetails: (state) => state.personalDetails,
        selectItemsBySection: (state, sectionName: string) => {
            const section = state.sections.find((s) => s.name === sectionName);
            return section?.items || [];
        },
    },
});

export const {
    addSection,
    deleteSection,
    addItemToSection,
    editSectionItem,
    removeItemFromSection,
    editPersonalDetails,
} = resumeSlice.actions;

export const { selectSections, selectItemsBySection, selectPersonalDetails } =
    resumeSlice.selectors;

export default resumeSlice.reducer;
