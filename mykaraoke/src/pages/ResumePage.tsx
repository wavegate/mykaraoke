import AnimatedPage from "@/components/AnimatedPage/AnimatedPage";
import MyDocument from "@/components/MyDocument";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

export default function ResumePage() {
  return (
    <AnimatedPage>
      <div>
        Jane Doe [Address] | [Phone Number] | [Email Address] | [LinkedIn
        Profile] Objective: Highly-skilled web developer with a strong
        background in building scalable web applications. Expertise in
        JavaScript, React.js, and frontend development. Seeking to leverage my
        technical and communication skills to create and optimize impactful web
        solutions. Technical Skills Languages: JavaScript, TypeScript, Python,
        Java, HTML, CSS Frameworks & Libraries: React.js, Angular, Node.js,
        jQuery Database: SQL, MySQL Tools & Technologies: AWS, Docker, Git,
        CI/CD Concepts: UI/UX design, web applications, software development,
        scalability, REST, unit testing Professional Experience Web Developer |
        ABC Tech Solutions | 2020-Present Developed and maintained web
        applications using React.js, Node.js, and TypeScript resulting in a 50%
        increase in application performance. Collaborated with UI/UX designers
        ensuring seamless design implementation and optimized user experience.
        Conducted code reviews to maintain coding standards and implemented
        CI/CD pipelines using AWS. Utilized agile methodologies for iterative
        development and efficient delivery. Frontend Developer | XYZ Web
        Services | 2018-2020 Led the frontend team in building responsive web
        designs using HTML, CSS, and JavaScript. Integrated RESTful services and
        managed data using MySQL databases. Employed unit testing practices to
        ensure software reliability and reduce bug rates. Improved website
        scalability by integrating Docker for containerized deployment. Junior
        Web Developer | 123 Digital | 2016-2018 Assisted in troubleshooting and
        resolving web application issues, enhancing site performance by 40%.
        Gained proficiency in jQuery and Angular, contributing to multiple
        projects. Participated in regular code reviews and collaborated with
        cross-functional teams to meet project milestones. Initiated and
        facilitated communication sessions between developers and non-tech
        stakeholders for clear project understanding. Education Bachelor of
        Science in Computer Science | Prestigious University | 2012-2016
        Relevant Courses: Software Development, Web Design and Development,
        Database Management Soft Skills Communication: Established effective
        communication channels with both technical and non-technical teams,
        ensuring project clarity and efficiency. Troubleshooting: Quickly
        identify and resolve technical challenges, ensuring smooth website
        functionality. Collaboration: Worked closely with designers, backend
        developers, and product managers to deliver top-tier web solutions.
        Testing: Adopted rigorous testing methodologies to ensure software
        robustness and reliability. Certifications AWS Certified Developer
        Certified JavaScript Developer Languages English (Native) Spanish
        (Conversational) References available upon request. (Note: Personal
        details like name, address, phone number, email, and LinkedIn profile
        are placeholders and should be replaced with actual details.)
      </div>
      <div className={`w-full`}>
        <PDFViewer className={`w-full h-[100dvh]`}>
          <MyDocument />
        </PDFViewer>
        <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      </div>
    </AnimatedPage>
  );
}
