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

Font.register({ family: "Times-Roman" } as any);
Font.register({ family: "Times-Bold" } as any);
Font.register({ family: "Times-Italic" } as any);

const Title = ({ children }) => {
  return (
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
        {children}
      </Text>
    </View>
  );
};

const BoldLine = ({ children }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "Times-Bold",
        justifyContent: "space-between",
      }}
    >
      {children}
    </View>
  );
};

const ItalicLine = ({ children }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "Times-Italic",
        justifyContent: "space-between",
      }}
    >
      {children}
    </View>
  );
};

const Bullet = ({ children }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        display: "flex",
        gap: "6px",
      }}
    >
      <View
        style={{
          width: "18px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Text>{"\u2022" + " "}</Text>
      </View>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
};

// Create Document Component
const MyDocument = () => {
  const email = "email";
  const summaryPoints = [
    "Highly-skilled web developer with a strong background in building scalable web applications.",
    "Expertise in JavaScript, React.js, and frontend development.",
    "Seeking to leverage my technical and communication skills to create and optimize impactful web solutions.",
  ];

  const skills = {
    Languages: ["JavaScript", "TypeScript", "Python", "Java", "HTML", "CSS"],
    Frameworks: ["React.js, Angular, Node.js, jQuery"],
    Databases: ["MongoDB", "MySQL", "Redis"],
    "Build Tools": ["Docker, Kubernetes, Jenkins"],
    "Cloud Services": ["AWS"],
  };

  const experiences = [
    {
      company: "ABC Tech Solutions",
      location: "Plainsboro Township, NJ, USA",
      title: "Web Dveloper",
      date: "January 2023 - Present",
      points: [
        "Developed and maintained web applications using React.js, Node.js, and TypeScript resulting in a 50% increase in application performance.",
        "Collaborated with UI/UX designers ensuring seamless implementation and optimized user experience.",
        "Conducted code reviews to maintain coding standards and implemented CI/CD pipelines using AWS.",
        "Utilized agile methodologies for iterative development and efficient delivery.",
      ],
    },
  ];

  const projects = [
    {
      name: "Project Name",
      link: "github.com/bla/bla",
      points: [
        "Developed and maintained web applications using React.js, Node.js, and TypeScript resulting in a 50% increase in application performance.",
        "Collaborated with UI/UX designers ensuring seamless implementation and optimized user experience.",
        "Conducted code reviews to maintain coding standards and implemented CI/CD pipelines using AWS.",
        "Utilized agile methodologies for iterative development and efficient delivery.",
      ],
    },
  ];

  const education = [
    {
      schoolName: "San Jose State University",
      schoolLocation: "San Jose, CA",
      degree: "Master of Science",
      date: "August 2001 - May 2005",
      relevantCoursework: ["HCI", "AI"],
    },
  ];

  return (
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
                marginBottom: "2px",
              }}
            >
              JANE DOE
            </Text>
            <Text>Email | Phone | GitHub | Portfolio</Text>
          </View>

          <View style={{ width: "100%", marginBottom: "11px" }}>
            <Title>SUMMARY</Title>
            {summaryPoints.map((point) => {
              return (
                <Bullet>
                  <Text>{point}</Text>
                </Bullet>
              );
            })}
          </View>
          <View style={{ width: "100%", marginBottom: "11px" }}>
            <Title>SKILLS</Title>
            {Object.entries(skills).map(([category, keywords]) => {
              return (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text
                    style={{ fontFamily: "Times-Bold", flexBasis: "100px" }}
                  >
                    {category}:{" "}
                  </Text>
                  <Text style={{ flex: "1" }}>{keywords.join(", ")}</Text>
                </View>
              );
            })}
          </View>

          <View style={{ width: "100%", marginBottom: "11px" }}>
            <Title>EXPERIENCE</Title>
            {experiences.map((experience) => {
              return (
                <View>
                  <BoldLine>
                    <Text>{experience.company}</Text>
                    <Text>{experience.location}</Text>
                  </BoldLine>
                  <ItalicLine>
                    <Text>{experience.title}</Text>
                    <Text>{experience.date}</Text>
                  </ItalicLine>
                  {experience.points.map((point) => {
                    return (
                      <Bullet>
                        <Text>{point}</Text>
                      </Bullet>
                    );
                  })}
                </View>
              );
            })}
          </View>
          <View style={{ width: "100%", marginBottom: "11px" }}>
            <Title>Projects</Title>
            {projects.map((project) => {
              return (
                <View>
                  <BoldLine>
                    <Text>{project.name}</Text>
                    <Text>{project.link}</Text>
                  </BoldLine>

                  {project.points.map((point) => {
                    return (
                      <Bullet>
                        <Text>{point}</Text>
                      </Bullet>
                    );
                  })}
                </View>
              );
            })}
          </View>

          <View style={{ width: "100%", marginBottom: "11px" }}>
            <Title>Education</Title>
            {education.map((edu) => {
              return (
                <View>
                  <BoldLine>
                    <Text>{edu.schoolName}</Text>
                    <Text>{edu.date}</Text>
                  </BoldLine>

                  <ItalicLine>
                    <Text>{edu.degree}</Text>
                  </ItalicLine>
                </View>
              );
            })}
          </View>
          <View style={{ width: "100%", marginBottom: "11px" }}>
            <Title>Certifications</Title>
            <Text>AWS Certified Developer Certified JavaScript Developer</Text>
          </View>
          <View style={{ width: "100%", marginBottom: "11px" }}>
            <Title>Hobbies & Interests</Title>
            <Text>Example hobby</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
