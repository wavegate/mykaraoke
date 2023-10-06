import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Create styles
// const styles = StyleSheet.create({
//   page: {},
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

Font.register({ family: "Times-Roman" });
Font.register({ family: "Times-Bold" });
Font.register({ family: "Times-Italic" });

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
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "Times-Roman",
        }}
      >
        <View
          style={{
            marginBottom: "11px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: "16px",
              fontFamily: "Times-Bold",
            }}
          >
            JANE DOE
          </Text>
          <Text>Email | Phone | GitHub | Portfolio</Text>
        </View>

        <View style={{ width: "100%", marginBottom: "11px" }}>
          <View
            style={{
              borderBottom: "2px solid black",
              width: "100%",
              marginBottom: "4px",
            }}
          >
            <Text
              style={{
                fontFamily: "Times-Bold",
              }}
            >
              SUMMARY
            </Text>
          </View>
          <Text>
            Highly-skilled web developer with a strong background in building
            scalable web applications. Expertise in JavaScript, React.js, and
            frontend development. Seeking to leverage my technical and
            communication skills to create and optimize impactful web solutions.
          </Text>
        </View>
        <View style={{ width: "100%" }}>
          <View
            style={{
              borderBottom: "2px solid black",
              width: "100%",
              marginBottom: "4px",
            }}
          >
            <Text
              style={{
                fontFamily: "Times-Bold",
              }}
            >
              SKILLS
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontFamily: "Times-Bold" }}>Languages: </Text>
            <Text>JavaScript, TypeScript, Python, Java, HTML, CSS</Text>
          </View>
          <Text>CSS Frameworks & Libraries</Text>
          <Text>React.js, Angular, Node.js, jQuery</Text>
          <Text>Database</Text>
          <Text>SQL, MySQL</Text>
          <Text>Tools & Technologies</Text>
          <Text>AWS, Docker, Git, CI/CD</Text>
        </View>

        <View style={{ width: "100%" }}>
          <View
            style={{
              borderBottom: "2px solid black",
              width: "100%",
              marginBottom: "4px",
            }}
          >
            <Text
              style={{
                fontFamily: "Times-Bold",
              }}
            >
              EXPERIENCE
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              fontFamily: "Times-Bold",
              justifyContent: "space-between",
            }}
          >
            <Text>ABC Tech Solutions</Text>
            <Text>Plainsboro Township, NJ, USA</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              fontFamily: "Times-Italic",
              justifyContent: "space-between",
            }}
          >
            <Text>Web Developer</Text>
            <Text>January 2023 - Present</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              display: "flex",
              gap: "4px",
            }}
          >
            <View
              style={{
                width: "20px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Text>{"\u2022" + " "}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                <Text>
                  Developed and maintained web applications using React.js,
                  Node.js, and TypeScript resulting in a 50% increase in
                  application performance.
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
            }}
          >
            <View style={{ width: "10px" }}>
              <Text>{"\u2022" + " "}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                <Text>
                  Collaborated with UI/UX designers ensuring seamless design
                  implementation and optimized user experience.
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
            }}
          >
            <View style={{ width: "10px" }}>
              <Text>{"\u2022" + " "}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                <Text>
                  Conducted code reviews to maintain coding standards and
                  implemented CI/CD pipelines using AWS.
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
            }}
          >
            <View style={{ width: "10px" }}>
              <Text>{"\u2022" + " "}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>
                <Text>
                  Utilized agile methodologies for iterative development and
                  efficient delivery.
                </Text>
              </Text>
            </View>
          </View>
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
