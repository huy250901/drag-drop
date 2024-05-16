import { defineStore } from "pinia";
export const useSectionStore = defineStore({
  id: "section",
  state: () => ({
    sections: [],
  }),
  actions: {
    initializeNextId(section, type) {
      if (!section.nextIds) {
        section.nextIds = {
          button: 1,
          paragraph: 1,
          module: 1,
        };
      }
      if (isNaN(section.nextIds[type])) {
        section.nextIds[type] = 1;
      }
    },
    addSection(sectionData) {
      const sectionWithDefaults = {
        ...sectionData,
        type: "section",
        css: "section relative w-full border-transparent border-2	 h-[100px] bg-slate-500",
        buttons: [],
        paragraphs: [],
        modules: [],
      };
      this.sections.push(sectionWithDefaults);
    },
    addSectionWithButton(sectionId, data) {
      const section = this.sections.find(
        (s) => s.id === sectionId
      );

      if (section) {
        this.initializeNextId(section, "button");
        const newSection = {
          type: "section",
          id: section.nextIds.module++, // Thêm id cho section
          css: "bg-slate-300 w-[200px] h-[100px] flex justify-center items-center",
          buttons: [
            {
              id: section.nextIds.button++, // Sử dụng nextButtonId cho id của button
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
      const section = this.sections.find(
        (section) => section.id === sectionId
      );
      if (section) {
        this.initializeNextId(section, "button");
        const buttonId = section.nextIds.button++;
        const buttonWithDefaults = {
          ...buttonData,
          id: buttonId,
          css: `bg-blue-500 text-white rounded`,
          type: "button",
          contents: `Button ${buttonId}`,
        };
        section.buttons.push(buttonWithDefaults);
        console.log(
          "section.buttons after adding:",
          section.buttons
        );
      }
    },
    addParagraphToSection(
      sectionId,
      paragraphData
    ) {
      const section = this.sections.find(
        (section) => section.id === sectionId
      );
      if (section) {
        this.initializeNextId(
          section,
          "paragraph"
        );
        const paragraphWithDefaults = {
          ...paragraphData,
          id: section.nextIds.paragraph++,
          css: "absolute text-black",
          type: "paragraph",
        };
        section.paragraphs.push(
          paragraphWithDefaults
        );
      }
    },
    removeButtonFromSection(sectionId, buttonId) {
      const section = this.sections.find(
        (s) => s.id === sectionId
      );
      if (section) {
        section.buttons = section.buttons.filter(
          (button) => button.id !== buttonId
        );
      }
    },
    removeParagraphFromSection(
      sectionId,
      paragraphId
    ) {
      const section = this.sections.find(
        (s) => s.id === sectionId
      );
      if (section) {
        section.paragraphs =
          section.paragraphs.filter(
            (paragraph) =>
              paragraph.id !== paragraphId
          );
      }
    },
  },
});
