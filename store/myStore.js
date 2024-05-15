import { defineStore } from "pinia";

export const useSectionStore = defineStore({
  id: "section",
  state: () => ({
    sections: [],
  }),
  actions: {
    initializeNextButtonId() {
      if (isNaN(this.nextButtonId)) {
        this.nextButtonId = 1;
      }
    },
    addSection(sectionData) {
      const sectionWithDefaults = {
        ...sectionData,
        type: "section",
        css: "section relative h-[300px] w-full bg-slate-500 rounded-md p-4 m-4",
        buttons: [],
        paragraphs: [],
        modules: [],
      };
      this.sections.push(sectionWithDefaults);
    },
    addSectionWithButton(sectionId, data) {
      const section = this.sections.find((s) => s.id === sectionId);
      if (section) {
        this.initializeNextButtonId();
        const newSection = {
          type: "section",
          css: "bg-slate-300 w-[200px] h-[100px] flex justify-center items-center",
          buttons: [
            {
              id: this.nextButtonId++,
              type: "button",
              contents: "Button in section",
              css: "bg-blue-500 text-white rounded px-4 py-2",
            },
          ],
          ...data,
        };

        section.modules.push(newSection);
      }
    },

    addButtonToSection(sectionId, buttonData) {
      const section = this.sections.find((section) => section.id === sectionId);
      if (section) {
        this.initializeNextButtonId();
        const buttonId = this.nextButtonId++;
        const buttonWithDefaults = {
          ...buttonData,
          id: buttonId,
          css: `absolute bg-blue-500 text-white rounded px-4 py-2`,
          type: "button",
          contents: `Button ${buttonId}`,
        };
        section.buttons.push(buttonWithDefaults);
        console.log("section.buttons after adding:", section.buttons);
      }
    },
    addParagraphToSection(sectionId, paragraphData) {
      const section = this.sections.find((section) => section.id === sectionId);
      if (section) {
        const paragraphWithDefaults = {
          ...paragraphData,
          css: "absolute text-black",
          type: "paragraph",
        };
        section.paragraphs.push(paragraphWithDefaults);
      }
    },
    removeButtonFromSection(sectionId, buttonId) {
      const section = this.sections.find((s) => s.id === sectionId);
      if (section) {
        section.buttons = section.buttons.filter(
          (button) => button.id !== buttonId
        );
      }
    },
    removeParagraphFromSection(sectionId, paragraphId) {
      const section = this.sections.find((s) => s.id === sectionId);
      if (section) {
        section.paragraphs = section.paragraphs.filter(
          (paragraph) => paragraph.id !== paragraphId
        );
      }
    },
  },
});
