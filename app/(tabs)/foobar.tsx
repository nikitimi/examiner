import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import laboratory from "@/lib/books/laboratory.json";
import type { Book } from "@/lib/utils/schema/book";
import { questionTypeEnum } from "@/lib/utils/schema/questionTypeEnum";
const Foobar = () => {
  const bookDetails = laboratory as Book;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  console.log({ bookDetails });
  // const [state, setState] = useState({
  //   buttonStyle: styles.Button,
  // });

  // function toggleButtonColor() {
  //   setState((prevState) => ({
  //     ...prevState,
  //     buttonStyle:
  //       prevState.buttonStyle.color === styles.Button.color
  //         ? styles.ButtonActive
  //         : styles.Button,
  //   }));
  // }

  // function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
  //   toggleButtonColor();
  //   console.log("first");
  //   console.log(StyleSheetList.length);
  //   setTimeout(() => toggleButtonColor(), 300);
  // }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        dark: "#808",
        light: "#f97",
      }}
      headerImage={
        <Image
          source={require("@/assets/images/adaptive-icon.png")}
          style={styles.Logo}
        />
      }
    >
      <ThemedView>
        <FlatList
          data={bookDetails.data}
          keyExtractor={(item) => item.chapter}
          renderItem={({ item }) => {
            const { title, chapter, questions } = item;

            function questionData() {
              return questions.flatMap(({ data, type }) => {
                console.log(type);
                switch (type) {
                  case questionTypeEnum.enum.MULTIPLE_CHOICE:
                    return data;
                  default:
                    return [];
                }
              });
            }

            return (
              <ThemedView>
                <ThemedText>{title}</ThemedText>
                <ThemedText>{`Chapter ${chapter}`}</ThemedText>
                <ThemedView>
                  <FlatList
                    data={questionData()}
                    keyExtractor={(item) => item.question}
                    renderItem={({ item }) => {
                      const { question, correctAnswer, choices } = item;

                      return (
                        <ThemedView style={{ paddingTop: 40 }}>
                          <Collapsible title={question}>
                            <ThemedView>
                              <ThemedText style={{ color: "lime" }}>
                                {correctAnswer.answer}
                              </ThemedText>
                            </ThemedView>
                          </Collapsible>
                          <FlatList
                            data={choices}
                            keyExtractor={(choice) => choice}
                            renderItem={({ item: choice, index }) => (
                              <ThemedView>
                                <ThemedText>{`${alphabet[
                                  index
                                ].toLocaleUpperCase()}. ${choice}`}</ThemedText>
                              </ThemedView>
                            )}
                          />
                        </ThemedView>
                      );
                    }}
                  />
                </ThemedView>
              </ThemedView>
            );
          }}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
};
const common = StyleSheet.create({
  buttonStyle: {
    cursor: "pointer",
    borderWidth: 0,
    padding: 20,
    borderRadius: 18,
  },
});
const styles = StyleSheet.create({
  Paragraph: {
    color: Colors.dark.text,
  },
  Button: {
    backgroundColor: "#25f",
    color: Colors.dark.text,
    ...common.buttonStyle,
  },
  ButtonActive: {
    backgroundColor: "#2f5",
    color: Colors.dark.tint,
    ...common.buttonStyle,
  },
  Logo: {
    position: "absolute",
    width: 250,
    height: 250,
    top: 0,
    right: 0,
    left: 0,
  },
});

export default Foobar;
