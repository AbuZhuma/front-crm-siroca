import { FC, useEffect, useState } from "react";
import styles from "./RequestMenu.module.scss";
import { HambergerMenu, InfoCircle, Link1, Message2, TaskSquare } from "iconsax-react";

enum Sections {
    DETAILS = "Details",
    JIRA_LINK = "JiraLink",
    DESCRIPTION = "Description",
    COMMENTS = "Comments",
    CHECKLISTS = "Checklists",
}

export const RequestMenu: FC = () => {
    const [activeSection, setActiveSection] = useState<Sections | null | string>(Sections.DETAILS);
    const scrollToSection = (section: Sections) => {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView();
            setActiveSection(section);
        }
    };
    const getElementCoordinates = (
        element1: HTMLElement,
        element2: HTMLElement,
        element3: HTMLElement,
        element4: HTMLElement,
        element5: HTMLElement,
        menuElement: HTMLElement,
    ) => {
        const elementRect1 = element1.getBoundingClientRect();
        const elementRect2 = element2.getBoundingClientRect();
        const elementRect3 = element3.getBoundingClientRect();
        const elementRect4 = element4.getBoundingClientRect();
        const elementRect5 = element5.getBoundingClientRect();
        const menuRect = menuElement.getBoundingClientRect();

        const relativeTop1 = elementRect1.top - menuRect.top;
        const relativeHeight1 = elementRect1.height;
        const relativeTop2 = elementRect2.top - menuRect.top;
        const relativeHeight2 = elementRect2.height;
        const relativeTop3 = elementRect3.top - menuRect.top;
        const relativeHeight3 = elementRect3.height;
        const relativeTop4 = elementRect4.top - menuRect.top;
        const relativeHeight4 = elementRect4.height;
        const relativeTop5 = elementRect5.top - menuRect.top;
        const relativeHeight5 = elementRect5.height;

        return [
            Number(relativeTop1.toFixed(0)) < 10 && Number(relativeTop1.toFixed(0)) > relativeHeight1 * -1 + 50
                ? "Details"
                : "",
            Number(relativeTop2.toFixed(0)) < 50 && Number(relativeTop2.toFixed(0)) > relativeHeight2 * -1 + 50
                ? "JiraLink"
                : "",
            Number(relativeTop3.toFixed(0)) < 50 && Number(relativeTop3.toFixed(0)) > relativeHeight3 * -1 + 50
                ? "Description"
                : "",
            Number(relativeTop4.toFixed(0)) < 50 && Number(relativeTop4.toFixed(0)) > relativeHeight4 * -1 + 50
                ? "Comments"
                : "",
            Number(relativeTop5.toFixed(0)) < 50 && Number(relativeTop5.toFixed(0)) > relativeHeight5 * -1 + 50
                ? "Checklists"
                : "",
        ];
    };

    useEffect(() => {
        const scrollableElement = document.getElementById("ViewsContainer");
        if (!scrollableElement) return;
        const handleScroll = () => {
            const element1 = document.getElementById("Details")!;
            const element2 = document.getElementById("JiraLink")!;
            const element3 = document.getElementById("Description")!;
            const element4 = document.getElementById("Comments")!;
            const element5 = document.getElementById("Checklists")!;
            const coordinates1 = getElementCoordinates(
                element1,
                element2,
                element3,
                element4,
                element5,
                scrollableElement,
            );
            coordinates1?.map((items) => {
                if (items) {
                    setActiveSection(items);
                }
            });
        };
        scrollableElement.addEventListener("scroll", handleScroll);
        return () => {
            scrollableElement.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={styles.RequestMenu}>
            <div
                className={activeSection === Sections.DETAILS ? styles.Active : styles.NotActive}
                onClick={() => scrollToSection(Sections.DETAILS)}
            >
                <InfoCircle />
            </div>
            <div
                className={activeSection === Sections.JIRA_LINK ? styles.Active : styles.NotActive}
                onClick={() => scrollToSection(Sections.JIRA_LINK)}
            >
                <Link1 />
            </div>
            <div
                className={activeSection === Sections.DESCRIPTION ? styles.Active : styles.NotActive}
                onClick={() => scrollToSection(Sections.DESCRIPTION)}
            >
                <HambergerMenu />
            </div>
            <div
                className={activeSection === Sections.COMMENTS ? styles.Active : styles.NotActive}
                onClick={() => scrollToSection(Sections.COMMENTS)}
            >
                <Message2 />
            </div>
            <div
                className={activeSection === Sections.CHECKLISTS ? styles.Active : styles.NotActive}
                onClick={() => scrollToSection(Sections.CHECKLISTS)}
            >
                <TaskSquare />
            </div>
        </div>
    );
};
