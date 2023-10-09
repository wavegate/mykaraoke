import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { memo, useEffect, useMemo, useState } from "react";

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
        // fontFamily: "Times-Italic",
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
          flexBasis: "18px",
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

const isDateWithinPast3Years = (inputDate) => {
  const currentDate = new Date();

  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(currentDate.getFullYear() - 3);

  return inputDate >= threeYearsAgo;
};

const isDateWithinPastWeek = (inputDate) => {
  const currentDate = new Date();

  const aWeekAgo = new Date();
  aWeekAgo.setDate(currentDate.getDate() - 7);

  return inputDate >= aWeekAgo;
};

const MyDocument = memo(({ data }: any) => {
  const skills = useMemo(() => {
    return {
      Languages: data.skills.map((skill) => skill.value),
      Frameworks: ["React.js, Angular, Node.js, jQuery"],
      Databases: ["MongoDB", "MySQL", "Redis"],
      "Build Tools": ["Docker, Kubernetes, Jenkins"],
      "Cloud Services": ["AWS"],
    };
  }, [data]);

  const hasEducationDate = data.education?.[0]?.date;

  let order = null;
  if (hasEducationDate) {
    const latestEducationIsWithin3Years = isDateWithinPast3Years(
      hasEducationDate.to
    );
    if (latestEducationIsWithin3Years) {
      order = ["education", "experience", "projects", "skills"];
    }
  } else {
    order = ["skills", "experience", "projects", "education"];
  }

  // "summary", "skills", "experience", "projects", "education"

  const skillNameWidth = useMemo(() => {
    let maxChar = 0;
    Object.entries(skills).forEach(([key, value]) => {
      const nameLength = key.length;
      if (nameLength > maxChar) {
        maxChar = nameLength;
      }
    });
    return `${maxChar * 6}px`;
  }, [skills]);

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
          lineHeight: "1.2",
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
            wrap={false}
          >
            <Text
              style={{
                fontSize: "16px",
                fontFamily: "Times-Bold",
                marginBottom: "2px",
              }}
            >
              {data?.name}
            </Text>
            <Text>
              {data.email} | {data.phone} | {data.githubLink} |{" "}
              {data.portfolioLink}
            </Text>
          </View>

          <View style={{ width: "100%", marginBottom: "11px" }} wrap={false}>
            <Title>Summary</Title>
            {data?.summary?.map((point, index) => {
              return (
                <Bullet key={index}>
                  <Text>{point.value}</Text>
                </Bullet>
              );
            })}
          </View>
          {order.map((section) => {
            if (section === "skills") {
              return (
                <View
                  style={{ width: "100%", marginBottom: "11px" }}
                  wrap={false}
                >
                  <Title>Skills</Title>
                  {Object.entries(skills).map(([category, keywords], index) => {
                    return (
                      <View
                        key={index}
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <Text
                          style={{
                            fontFamily: "Times-Bold",
                            flexBasis: skillNameWidth,
                          }}
                        >
                          {category}:
                        </Text>
                        <Text style={{ flex: "1" }}>{keywords.join(", ")}</Text>
                      </View>
                    );
                  })}
                </View>
              );
            }
            if (section === "experience") {
              return (
                <View style={{ width: "100%", marginBottom: "11px" }}>
                  <Title>Experience</Title>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "11px",
                    }}
                  >
                    {data.experiences.map((experience, index) => {
                      return (
                        <View wrap={false} key={index}>
                          <BoldLine>
                            <Text>{experience.companyName}</Text>
                            <Text>{experience.location}</Text>
                          </BoldLine>
                          <ItalicLine>
                            <Text>{experience.title}</Text>
                            {/* <Text>{experience.date}</Text> */}
                          </ItalicLine>
                          {experience.summary.map((point, innerIndex) => {
                            return (
                              <Bullet key={innerIndex}>
                                <Text>{point.value}</Text>
                              </Bullet>
                            );
                          })}
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            }
            if (section === "projects") {
              return (
                <View style={{ width: "100%", marginBottom: "11px" }}>
                  <Title>Projects</Title>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "11px",
                    }}
                  >
                    {projects.map((project, index) => {
                      return (
                        <View wrap={false} key={index}>
                          <BoldLine>
                            <Text>{project.name}</Text>
                            <Text>{project.link}</Text>
                          </BoldLine>

                          {project.points.map((point, pointIndex) => {
                            return (
                              <Bullet key={pointIndex}>
                                <Text>{point}</Text>
                              </Bullet>
                            );
                          })}
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            }
            if (section === "education") {
              return (
                <View style={{ width: "100%", marginBottom: "11px" }}>
                  <Title>Education</Title>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "11px",
                    }}
                  >
                    {data.education?.map((edu, index) => {
                      return (
                        <View wrap={false} key={index}>
                          <BoldLine>
                            <Text>{edu.schoolName}</Text>
                            <Text>
                              {format(edu.date.from, "LLLL, y")} —{" "}
                              {isDateWithinPastWeek(edu.date.to)
                                ? "Present"
                                : format(edu.date.to, "LLLL, y")}
                            </Text>
                          </BoldLine>

                          <ItalicLine>
                            <Text>{edu.degree}</Text>
                          </ItalicLine>
                          <View
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <Text
                              style={{
                                flexBasis: "100px",
                              }}
                            >
                              Relevant coursework:
                            </Text>
                            {edu.relevantCoursework && (
                              <Text style={{ flex: "1" }}>
                                {edu.relevantCoursework.join(", ")}
                              </Text>
                            )}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            }
          })}
          {/* <View style={{ width: "100%", marginBottom: "11px" }}>
            <Title>CERTIFICATIONS</Title>
            <Text>AWS Certified Developer Certified JavaScript Developer</Text>
          </View> */}
          {/* <View style={{ width: "100%", marginBottom: "11px" }}>
            <Title>HOBBIES</Title>
            <Text>Example hobby</Text>
          </View> */}
        </View>
      </Page>
    </Document>
  );
});

export default MyDocument;
