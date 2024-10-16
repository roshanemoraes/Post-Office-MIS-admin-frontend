//import project1 from "../assets/projects/project-1.png";
//import project2 from "../assets/projects/project-2.png";
//import project3 from "../assets/projects/project-3.png";
//import project4 from "../assets/projects/project-4.png";

export const HERO_CONTENT = `We are in a constant effort to deliver a fast, reliable, efficient delivery service to serve the nation.`;

export const HERO_MISSION = `To provide quality services to our customers.`;
export const HERO_VISION = `To be the preferred choice for our customers.`;

export const ABOUT_TEXT = `Post-Office MIS is a comprehensive system developed with the aim to modernize postal services. It integrates an admin panel and a Postman Assistant Mobile Application, allowing efficient address recording, route optimization, real-time tracking, and barcode generation. These features enhance delivery accuracy, reduce errors, and improve customer satisfaction.`;

export const ABOUT_TEXT_2 = `In addition to streamlining mail operations, the system offers financial management, postal rates calculation, and advanced reporting tools. It ensures data security and compliance with postal regulations, while also integrating with external systems like CRM and accounting software. Post-Office MIS provides a scalable, centralized platform that meets the evolving needs of today’s postal services.`;
export const EXPERIENCES = [
  {
    year: "2021  - Present",
    role: "3rd Year Undergraduate",
    company: "Computer Science and Engineering, University of Moratuwa",
    description: `I am a 3rd-year Computer Science and Engineering student at the University of Moratuwa, focusing on software engineering, algorithms, and databases. My coursework and hands-on projects have enhanced my technical skills and problem-solving abilities. I also actively participate in tech workshops and hackathons, gaining practical experience and collaboration skills.`,
    technologies: [],
  },
  {
    year: "2018 - 2020",
    role: "GCE Advanced Level",
    company: "Maris Stella Collge - Negombo",
    description: `Obtained 3As for Combined Mathematics, chemistry and Physics in physical science stream, and got selected to University of Moratuwa for B.sc (Hons) Engineering.`,
    technologies: [],
  },
];

export const PROJECTS = [
  {
    title: "Mail Stus Update",
    //image: project1,
    description:
      "Customer receives a notification when the mails are successfully delivered. Further it shows the status of the mail items whether they are still delivering.",
    technologies: [
      "React",
      "Spring Boot",
      "Java",
      "HTML",
      "CSS",
      "MongoDB",
      "Firebase",
      "REST",
    ],
  },
  {
    title: "Address Update Notification",
    //image: project2,
    description:
      "Earlier the undelivered mails are disregarded. But Now when a mail is not delivered due to an invalid address, a notification is generated to the sender to update the correct address. So that the undelivered mails are not get lost.",
    technologies: [
      "React JS",
      "Node JS",
      "MySQL",
      "Arduino",
      "Node Red",
      "Git",
      "VS Code",
    ],
  },
  {
    title: "Money Orders",
    // image: project3,
    description:
      "Customers can transfer the money orders quickly by a handy interface. Not needed to go to the bank or a post office. So the things made easy by our system.",
    technologies: ["React JS", "Flask", "REST", "JWT", "Git", "VS Code"],
  },
];

export const CONTACT = {
  address: "Negombo, 11500 ",
  phoneNo: "+94 71 616 8785",
  email: "postmaster1@gmail.com",
};
