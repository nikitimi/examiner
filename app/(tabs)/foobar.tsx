import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
} from "react-native";
import { questionTypeEnum } from "@/lib/utils/schema/questionTypeEnum";
import type { Book } from "@/lib/utils/schema/book";
// import { useHematology } from "@/hooks/bookHelper/useHematology";

const Foobar = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  // const hematology = useHematology();
  const hematology: Book[] = [
    {
      author: "John Doe",
      title: "The Art of Programming",
      edition: "1st Edition",
      data: [
        {
          chapter: "",
          questions: [
            {
              type: "TRUE_FALSE",
              data: [
                {
                  choices: [true, false],
                  question: "Is Paris the capital of France?",
                  correctAnswer: {
                    answer: true,
                    explanation: "Paris is the capital of France.",
                  },
                  reference: "https://en.wikipedia.org/wiki/Paris",
                  hint: "The city is known for its art, culture, and history.",
                },
              ],
            },
          ],
          topic: "Hello Paris",
        },
      ],
    },
  ];
  const [stateIndex, setIndex] = useState(0);

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
        <Pressable
          onPress={() => ToastAndroid.show("hello", ToastAndroid.LONG)}
        >
          <Text style={{ color: "white" }}>hello</Text>
        </Pressable>
      </ThemedView>
      <FlatList
        horizontal
        data={new Array(hematology.length).fill(0)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(value) => {
          return (
            <Pressable
              style={
                stateIndex === value.index
                  ? styles.LengthButtonActive
                  : styles.LengthButton
              }
            >
              <Text
                style={
                  stateIndex === value.index
                    ? styles.LengthButtonTextActive
                    : styles.LengthButtonText
                }
                onPress={() => setIndex(value.index)}
              >
                {value.index + 1}
              </Text>
            </Pressable>
          );
        }}
      />
      <FlatList
        data={hematology[stateIndex].data.filter((v, i) => i < 10)}
        keyExtractor={(item) => item.chapter}
        renderItem={({ item }) => {
          const { topic, chapter, questions } = item;

          function questionData() {
            return questions.flatMap(({ data, type }) => {
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
              <ThemedText>{topic}</ThemedText>
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
  LengthButton: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
    width: 60,
    margin: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
const styles = StyleSheet.create({
  LengthButtonActive: {
    ...common.LengthButton,
    borderColor: "#2f5",
  },
  LengthButtonTextActive: { color: "#2f5" },
  LengthButtonText: { color: "white" },
  LengthButton: {
    ...common.LengthButton,
    borderColor: "white",
  },
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
