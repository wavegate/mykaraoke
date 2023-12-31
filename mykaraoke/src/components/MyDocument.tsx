import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Link,
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
        borderBottom: "1px solid black",
        width: "100%",
        marginBottom: "4px",
      }}
    >
      <Text
        style={{
          fontFamily: "Times-Bold",
          fontSize: "12px",
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

const customSort = (arr) => {
  const order = ["Language", "Framework"];

  return arr.sort(([a, _], [b, __]) => {
    if (a === "Other") {
      return 1; // "Other" comes after everything else
    } else if (b === "Other") {
      return -1; // Everything else comes before "Other"
    } else {
      const indexA = order.indexOf(a);
      const indexB = order.indexOf(b);

      // If both elements are in the order array, compare their indices
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      // If only one element is in the order array, it should come first
      if (indexA !== -1) {
        return -1;
      }

      if (indexB !== -1) {
        return 1;
      }

      // If neither element is in the order array, they are considered equal
      return 0;
    }
  });
};

function convertSkillsToMap(skills: any, dataKeywords: any) {
  const skillsMap: any = {};
  for (const skill of skills) {
    const skillCategory = dataKeywords.find(
      (keyword) => keyword.name === skill.value
    )?.categories[0];
    if (skillCategory) {
      if (skillsMap[skillCategory]) {
        skillsMap[skillCategory].push(skill.value);
      } else {
        skillsMap[skillCategory] = [skill.value];
      }
    } else {
      if (skillsMap.Other) {
        skillsMap.Other.push(skill.value);
      } else {
        skillsMap.Other = [skill.value];
      }
    }
  }
  const newMap: any = {};
  for (let [key, value] of Object.entries(skillsMap)) {
    if ((value as string[]).length > 2 && key !== "Other") {
      newMap[key] = value;
    } else {
      newMap.Other = [...(newMap.Other || []), ...(value as string[])];
    }
  }
  if (Object.entries(newMap).length === 0) {
    return undefined;
  }
  return newMap;
}

const MyDocument = memo(({ data, dataKeywords, hasExperience }: any) => {
  const skills = useMemo(() => {
    if (data?.skills && dataKeywords) {
      return convertSkillsToMap(data.skills, dataKeywords);
    }
  }, [data?.skills, dataKeywords]);

  const hasEducationDate = data.education?.[0]?.date;

  const latestEducationisWithin3Years =
    hasEducationDate && isDateWithinPast3Years(hasEducationDate.to);

  function countSpaces(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === " " || str[i] === "\t") {
        count++;
      }
    }
    return count;
  }

  const skillNameWidth = useMemo(() => {
    let maxChar = 0;
    if (skills) {
      Object.entries(skills).forEach(([key, value]) => {
        const spaces = countSpaces(key);
        const nameLength = key.length - spaces * 3;
        if (nameLength > maxChar) {
          maxChar = nameLength;
        }
      });
    }
    return `${maxChar * 7}px`;
  }, [skills]);

  const subtitles = [];
  if (data.phone) {
    subtitles.push(<Text>{data.phone}</Text>);
  }
  if (data.email) {
    subtitles.push(<Text>{data.email}</Text>);
  }
  if (data.location) {
    subtitles.push(<Text>{data.location}</Text>);
  }
  if (data.githubLink) {
    subtitles.push(
      <Link
        src={data.githubLink}
        style={{ color: "black", textDecoration: "none" }}
      >
        {data.githubLink}
      </Link>
    );
  }
  if (data.portfolioLink) {
    subtitles.push(
      <Link
        src={data.portfolioLink}
        style={{ color: "black", textDecoration: "none" }}
      >
        {data.portfolioLink}
      </Link>
    );
  }

  const separator = <Text>|</Text>;

  // Use reduce to join the elements with the separator
  const joinedSubtitles = subtitles.reduce((acc, element, index) => {
    // Don't add the separator after the last element
    if (index === subtitles.length - 1) {
      return [...acc, element];
    } else {
      return [...acc, element, separator];
    }
  }, []);

  const skillsSection = skills && (
    <View style={{ width: "100%", marginBottom: "11px" }} wrap={false}>
      <Title>Skills</Title>
      {customSort(Object.entries(skills)).map(
        ([category, keywords], index, arr) => {
          let displayCategory = null;
          if (arr.length === 1 && category === "Other") {
            displayCategory = "Skills";
          } else {
            displayCategory = category;
          }
          return (
            <View key={index} style={{ display: "flex", flexDirection: "row" }}>
              <Text
                style={{
                  flexBasis: skillNameWidth,
                }}
              >
                {displayCategory}:
              </Text>
              <Text style={{ flex: "1" }}>
                {(keywords as string[]).join(", ")}
              </Text>
            </View>
          );
        }
      )}
    </View>
  );

  const experienceSection = data.experiences && data.experiences.length > 0 && (
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
                <Text>{`${format(experience.date.from, "LLL y")} — ${
                  experience.date.to > new Date()
                    ? "Present"
                    : format(experience.date.to, "LLL y")
                }`}</Text>
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

  const projectsSection = data.projects && data.projects.length > 0 && (
    <View style={{ width: "100%", marginBottom: "11px" }}>
      <Title>Projects</Title>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "11px",
        }}
      >
        {data.projects.map((project, index) => {
          return (
            <View wrap={false} key={index}>
              <BoldLine>
                <Text>{project.name}</Text>
                <Link
                  src={project.link}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  {project.link}
                </Link>
              </BoldLine>

              {project.summary.map((point, pointIndex) => {
                return (
                  <Bullet key={pointIndex}>
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

  const educationSection = data.education && data.education.length > 0 && (
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
                  {`${edu.date.to > new Date() ? "Expected " : ""}${format(
                    edu.date.to,
                    "LLLL y"
                  )}`}
                </Text>
              </BoldLine>

              <ItalicLine>
                <Text>{edu.degree}</Text>
              </ItalicLine>
              {edu.coursework && (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text
                    style={{
                      flexBasis: "45px",
                    }}
                  >
                    Courses:
                  </Text>

                  <Text style={{ flex: "1" }}>
                    {edu.coursework
                      .map((coursework) => coursework.value)
                      .join(", ")}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );

  let orderDisplay = null;
  if (latestEducationisWithin3Years && !hasExperience) {
    orderDisplay = [
      educationSection,
      experienceSection,
      projectsSection,
      skillsSection,
    ];
  } else {
    orderDisplay = [
      skillsSection,
      experienceSection,
      projectsSection,
      educationSection,
    ];
  }

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
            {data.name ? (
              <Text
                style={{
                  fontSize: "16px",
                  fontFamily: "Times-Bold",
                }}
              >
                {data.name}
              </Text>
            ) : (
              false
            )}
            {subtitles.length > 0 && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  rowGap: 2,
                  columnGap: 3,
                }}
              >
                {joinedSubtitles}
              </View>
            )}
          </View>

          {data.summary && data.summary.length > 0 && (
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
          )}
          {orderDisplay}
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
