import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import Toast from "react-native-root-toast";
import { Collapsible } from "@/components/Collapsible";
import { questionTypeEnum } from "@/lib/utils/schema/questionTypeEnum";
import { useRouter } from "expo-router";
import { useAppDispatch, type RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { setCurrentItemIndex } from "@/redux/reducers/questionReducer";

const Foobar = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const dispatch = useAppDispatch();
  const router = useRouter();

  // ALL ABOUT REDUX
  const { currentItemIndex, itemsLimit, selectedBook } = useSelector(
    (state: RootState) => state.question
  );
  const bookData = useSelector(
    (state: RootState) =>
      state.question.bookData.filter(
        ({ displayName }) => displayName === selectedBook
      )[0].list
  );
  // END OF REDUX

  function toastPressed() {
    Toast.show("hello", {
      duration: 300,
    });
    setTimeout(() => {
      router.replace("/");
    }, 1000);
  }

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
        <TouchableOpacity onPress={toastPressed}>
          <Text style={{ color: "white" }}>hello</Text>
        </TouchableOpacity>
      </ThemedView>
      <FlatList
        horizontal
        data={new Array(bookData.length).fill(0).map((v, i) => i)}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => {
          const isActive = item === currentItemIndex;
          return (
            <TouchableOpacity
              key={item}
              style={[
                common.LengthButton,
                isActive ? styles.LengthButtonActive : styles.LengthButton,
              ]}
            >
              <Text
                style={
                  isActive
                    ? styles.LengthButtonTextActive
                    : styles.LengthButtonText
                }
                onPress={() => dispatch(setCurrentItemIndex(item))}
              >
                {item + 1}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <ThemedText>{`${currentItemIndex}`}</ThemedText>
      <FlatList
        data={bookData[currentItemIndex].data}
        keyExtractor={(item) => item.chapter}
        renderItem={({ item }) => {
          const { topic, chapter, questions } = item;

          function questionData() {
            return questions.flatMap(({ data, type }) => {
              switch (type) {
                case questionTypeEnum.enum.MULTIPLE_CHOICE:
                  const finalLimit = currentItemIndex + itemsLimit;

                  return data.slice(
                    currentItemIndex,
                    finalLimit > data.length ? data.length : finalLimit
                  );
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

                    function validateAnswer(choice: string) {
                      Toast.show(
                        choice === correctAnswer.answer ? "green" : "red",
                        {
                          duration: 300,
                        }
                      );
                    }

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
                            <ThemedView
                              style={{
                                flexDirection: "row",
                                gap: 12,
                                alignItems: "center",
                              }}
                            >
                              <Pressable
                                style={{
                                  borderWidth: 2,
                                  borderColor: "white",
                                  padding: 8,
                                  borderRadius: 8,
                                }}
                                onPress={() => validateAnswer(choice)}
                              >
                                <ThemedText>
                                  {alphabet[index].toLocaleUpperCase()}.
                                </ThemedText>
                              </Pressable>
                              <ThemedText>{`${choice}`}</ThemedText>
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
    alignItems: "center",
  },
});
const styles = StyleSheet.create({
  LengthButtonActive: {
    borderColor: "#2f5",
  },
  LengthButtonTextActive: { color: "#2f5" },
  LengthButtonText: { color: "white" },
  LengthButton: {
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
