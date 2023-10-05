import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
// const styles = StyleSheet.create({
//   page: {},
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page
      size="A4"
      style={{
        padding: "1in",
        fontSize: "11px",
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <View style={{ width: "100%" }}>
          <Text>Jane Doe</Text>
          <Text>Email</Text>
          <Text>Phone</Text>
          <Text>GitHub</Text>
          <Text>Portfolio</Text>
        </View>
        <View>
          <Text>Summary</Text>
          <Text>
            Highly-skilled web developer with a strong background in building
            scalable web applications. Expertise in JavaScript, React.js, and
            frontend development. Seeking to leverage my technical and
            communication skills to create and optimize impactful web solutions.
          </Text>
        </View>
        <View>
          <Text>Skills</Text>
          <Text>Languages</Text>
          <Text>JavaScript, TypeScript, Python, Java, HTML, CSS</Text>
          <Text>CSS Frameworks & Libraries</Text>
          <Text>React.js, Angular, Node.js, jQuery</Text>
          <Text>Database</Text>
          <Text>SQL, MySQL</Text>
          <Text>Tools & Technologies</Text>
          <Text>AWS, Docker, Git, CI/CD</Text>
        </View>
        <View>
          <Text>Experience</Text>
          <Text>
            Web Developer | ABC Tech Solutions | 2020-Present Developed and
            maintained web applications using React.js, Node.js, and TypeScript
            resulting in a 50% increase in application performance. Collaborated
            with UI/UX designers ensuring seamless design implementation and
            optimized user experience. Conducted code reviews to maintain coding
            standards and implemented CI/CD pipelines using AWS. Utilized agile
            methodologies for iterative development and efficient delivery.
          </Text>
        </View>
        <View>
          <Text>Projects</Text>
          <Text>
            Web Developer | ABC Tech Solutions | 2020-Present Developed and
            maintained web applications using React.js, Node.js, and TypeScript
            resulting in a 50% increase in application performance. Collaborated
            with UI/UX designers ensuring seamless design implementation and
            optimized user experience. Conducted code reviews to maintain coding
            standards and implemented CI/CD pipelines using AWS. Utilized agile
            methodologies for iterative development and efficient delivery.
          </Text>
        </View>
        <View>
          <Text>(non-technical) Work Experience</Text>
          <Text>
            Web Developer | ABC Tech Solutions | 2020-Present Developed and
            maintained web applications using React.js, Node.js, and TypeScript
            resulting in a 50% increase in application performance. Collaborated
            with UI/UX designers ensuring seamless design implementation and
            optimized user experience. Conducted code reviews to maintain coding
            standards and implemented CI/CD pipelines using AWS. Utilized agile
            methodologies for iterative development and efficient delivery.
          </Text>
        </View>
        <View>
          <Text>Education</Text>
          <Text>
            Bachelor of Science in Computer Science | Prestigious University |
            2012-2016 Relevant Courses: Software Development, Web Design and
            Development, Database Management
          </Text>
        </View>
        <View>
          <Text>Certifications</Text>
          <Text>AWS Certified Developer Certified JavaScript Developer</Text>
        </View>
        <View>
          <Text>Hobbies & Interests</Text>
          <Text>Example hobby</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
