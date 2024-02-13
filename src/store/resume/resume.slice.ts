import { FormElement } from '@components/form/FormTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ItemDate {
    month: string;
    year: string;
}

export interface ExperienceItem {
    id: string;
    jobTitle: string;
    employer: string;
    city: string;
    country: string;
    startDate: ItemDate;
    endDate: ItemDate;
    description: string;
}

export interface EducationItem {
    id: string;
    degree: string;
    school: string;
    city: string;
    country: string;
    startDate: ItemDate;
    endDate: ItemDate;
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
        phone?: string;
        address?: string;
    };
}

interface ResumeSectionAction {
    sectionItem?: {
        key: keyof ResumeSection['configSection'];
        value: any;
    };
    sectionName?: string;
    sections?: ResumeSection[];
    item?: SectionItem;
    items?: SectionItem[];
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
            if (section && item) {
                section.items.push(item);
            }
        },
        editSectionItem: (
            state,
            action: PayloadAction<ResumeSectionAction>,
        ) => {
            const { sectionName, item } = action.payload;
            if (item) {
                const sectionToEdit = state.sections.findIndex(
                    (s) => s.name === sectionName,
                );
                const itemToEdit = state.sections[
                    sectionToEdit
                ].items.findIndex((i) => i.id === item.id);
                state.sections[sectionToEdit].items[itemToEdit] = item;
            }
        },
        removeItemFromSection: (
            state,
            action: PayloadAction<ResumeSectionAction>,
        ) => {
            const { sectionName, item } = action.payload;
            const section = state.sections.find((s) => s.name === sectionName);

            if (section && item) {
                section.items = section.items.filter((si) => si.id !== item.id);
            }
        },
        editPersonalDetails: (state, action) => {
            state.personalDetails = action.payload;
        },
        setSections: (state, action: PayloadAction<ResumeSectionAction>) => {
            const { sections } = action.payload;
            if (sections) {
                return {
                    ...state,
                    sections,
                };
            }
            return state;
        },
        setSectionItems: (
            state,
            action: PayloadAction<ResumeSectionAction>,
        ) => {
            const { sectionName, items } = action.payload;
            if (items) {
                const sectionToEdit = state.sections.findIndex(
                    (s) => s.name === sectionName,
                );
                state.sections[sectionToEdit].items = items;
            }
        },
        setSectionProperty: (
            state,
            action: PayloadAction<ResumeSectionAction>,
        ) => {
            const { sectionItem, sectionName } = action.payload;

            const sectionToEdit = state.sections.findIndex(
                (s) => s.name === sectionName,
            );

            if (sectionItem) {
                state.sections[sectionToEdit].configSection[sectionItem.key] =
                    sectionItem.value;
            }
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
    setSectionItems,
    setSections,
    setSectionProperty,
} = resumeSlice.actions;

export const { selectSections, selectItemsBySection, selectPersonalDetails } =
    resumeSlice.selectors;

export default resumeSlice.reducer;
