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
          image: 1,
        };
      }
      if (isNaN(section.nextIds[type])) {
        section.nextIds[type] = 1;
      }
    },
    initializeModuleNextId(module, type) {
      if (!module.nextIds) {
        module.nextIds = {
          button: 1,
        };
      }
      if (isNaN(module.nextIds[type])) {
        module.nextIds[type] = 1;
      }
    },
    addSection(sectionData) {
      const sectionWithDefaults = {
        ...sectionData,
        type: "section",
        width: "",
        height: "",
        css: "section relative w-full h-[500px] bg-slate-500",
        buttons: [],
        paragraphs: [],
        modules: [],
        headers: [],
        images: [],
      };
      this.sections.push(sectionWithDefaults);
    },
    addImageToSection(sectionId, image) {
      const section =
        this.findSectionById(sectionId);
      if (section) {
        this.initializeNextId(section, "image");
        const imageId = section.nextIds.image++;
        const imageWithDefaults = {
          ...image,
          id: imageId,
          css: "h-full w-full",
          type: "img",
          width: "100",
          height: "100",
          top: "0",
          left: "0",
        };
        section.images.push(imageWithDefaults);
      }
    },
    addHeader(sectionId, dataHeader) {
      const section =
        this.findSectionById(sectionId);

      if (section) {
        const headerId = this.nextId++;
        const headerWithDefaults = {
          id: headerId,
          type: "header",
          css: "h-full w-full flex justify-between px-6 items-center",
          height: "60",
          width: "100%",
          top: "",
          left: "",
          backgroundColor: "bg-gray-700",
          logo: "./instgram.webp",
          divOne: [
            {
              type: "div-header",
              css: "flex-1",
              imgType: "img",
              href: "#",
              cssImg: "h-8 w-auto cursor-pointer",
            },
          ],
          divSecond: [
            {
              type: "div-header",
              css: "h-full flex-1",
              parentLink: "ul",
              cssUl:
                "flex w-full h-full items-center justify-around",
              links: [
                {
                  id: 1,
                  name: "Home",
                  cssLi: "h-full",
                  type: "li-header",
                  href: "#",
                  color: "text-gray-100",
                  cssA: "text-gray-100 h-full flex items-center justify-center transition duration-300 hover:text-yellow-300",
                },
                {
                  id: 2,
                  name: "About us",
                  cssLi: "h-full",
                  href: "#",
                  type: "li-header",

                  color: "text-white",
                  cssA: "text-gray-100 h-full flex items-center justify-center transition duration-300 hover:text-yellow-300",
                },
                {
                  id: 3,
                  name: "Blog",
                  type: "li-header",
                  cssLi: "h-full",
                  href: "#",
                  cssA: "text-gray-100 h-full flex items-center justify-center transition duration-300 hover:text-yellow-300",
                  color: "text-white",
                },
                {
                  id: 4,
                  name: "Contact",
                  cssLi: "h-full",
                  type: "li-header",
                  href: "#",
                  cssA: "text-gray-100 h-full flex items-center justify-center transition duration-300 hover:text-yellow-300",
                  color: "text-white",
                },
              ],
            },
          ],

          ...dataHeader,
        };

        section.headers.push(headerWithDefaults);
      }
    },
    addSectionWithButton(sectionId, data) {
      const section =
        this.findSectionById(sectionId);

      if (section) {
        this.initializeNextId(section, "module");
        const newModule = {
          type: "template",
          id: section.nextIds.module++,
          css: "bg-red-500 flex justify-center rounded-md items-center",
          width: "200",
          height: "100",
          left: "",
          top: "",
          buttons: [],
          nextIds: {
            button: 1,
          },
          ...data,
        };

        this.initializeModuleNextId(
          newModule,
          "button"
        );
        newModule.buttons.push({
          id: newModule.nextIds.button++,
          type: "module-button",
          width: "100",
          height: "50",
          contents: "Button in section",
          css: "bg-blue-500 items-center flex text-white rounded px-4 py-2",
        });

        section.modules.push(newModule);
      }
    },
    addButtonToSection(sectionId, buttonData) {
      const section =
        this.findSectionById(sectionId);
      if (section) {
        this.initializeNextId(section, "button");
        const buttonId = section.nextIds.button++;
        const buttonWithDefaults = {
          ...buttonData,
          id: buttonId,
          css: `h-full w-full bg-blue-500 text-white rounded`,
          type: "button",
          width: "128",
          height: "44",
          left: "",
          top: "",
          contents: `Button ${buttonId}`,
        };
        section.buttons.push(buttonWithDefaults);
      }
    },
    addParagraphToSection(
      sectionId,
      paragraphData
    ) {
      const section =
        this.findSectionById(sectionId);
      if (section) {
        this.initializeNextId(
          section,
          "paragraph"
        );
        const paragraphWithDefaults = {
          ...paragraphData,
          id: section.nextIds.paragraph++,
          typeP: "p",
          contents: "paragraph",
          css: "w-full h-full text-black bg-white",
          type: "paragraph",
          width: "200",
          height: "24",
          left: "",
          top: "",
        };
        section.paragraphs.push(
          paragraphWithDefaults
        );
      }
    },
    removeButtonFromSection(sectionId, buttonId) {
      const section =
        this.findSectionById(sectionId);
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
      const section =
        this.findSectionById(sectionId);
      if (section) {
        section.paragraphs =
          section.paragraphs.filter(
            (paragraph) =>
              paragraph.id !== paragraphId
          );
      }
    },
    removeSectionWithButton(sectionId, moduleId) {
      const section =
        this.findSectionById(sectionId);
      if (section) {
        section.modules = section.modules.filter(
          (module) => module.id !== moduleId
        );
      }
    },
    removeHeaderFromSection(sectionId, headerId) {
      const section =
        this.findSectionById(sectionId);
      if (section) {
        section.headers = section.headers.filter(
          (header) => header.id !== headerId
        );
      }
    },
    updateButtonProperty(
      id,
      newContent,
      newWidth,
      newHeight,
      newTop,
      newLeft
    ) {
      for (const section of this.sections) {
        const button = section.buttons.find(
          (b) => b.id === id
        );
        if (button) {
          button.contents = newContent;
          button.width = newWidth;
          button.height = newHeight;
          button.top = newTop;
          button.left = newLeft;
          break;
        }
      }
    },
    updateParagraphProperty(
      id,
      newContent,
      newWidth,
      newHeight,
      newTop,
      newLeft
    ) {
      for (const section of this.sections) {
        const paragraph = section.paragraphs.find(
          (p) => p.id === id
        );
        if (paragraph) {
          paragraph.contents = newContent;
          paragraph.width = newWidth;
          paragraph.height = newHeight;
          paragraph.top = newTop;
          paragraph.left = newLeft;
          break;
        }
      }
    },
    updateTemplateProperty(
      id,
      newContent,
      newWidth,
      newHeight,
      newTop,
      newLeft
    ) {
      for (const section of this.sections) {
        for (const module of section.modules) {
          if (module.id === id) {
            module.contents = newContent;
            module.width = newWidth;
            module.height = newHeight;
            module.top = newTop;
            module.left = newLeft;
            break;
          }
        }
      }
    },
    updateHeaderProperty(id, newHeight, newTop) {
      for (const section of this.sections) {
        const header = section.headers.find(
          (h) => h.id === id
        );
        if (header) {
          header.height = newHeight;
          header.top = newTop;
          break;
        }
      }
    },
    findSectionById(sectionId) {
      return this.sections.find(
        (section) => section.id === sectionId
      );
    },
  },
});
