import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { setCurrentItemIndex } from "@/redux/reducers/questionReducer";

const Testbutton = () => {
  const { currentItemIndex, bookData, selectedBook } = useSelector(
    (state: RootState) => state.question
  );
  const bookDetails = bookData.filter(
    ({ displayName }) => displayName === selectedBook
  )[0].list;
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.selectedBookText}>{`${selectedBook}: ${
        currentItemIndex + 1
      }`}</Text>
      <FlatList
        horizontal
        style={styles.horizontalFlatList}
        data={new Array(bookDetails.length).fill(0).map((_, i) => i)}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.itemButton,
              currentItemIndex === item
                ? styles.activeItemButton
                : styles.inactiveItemButton,
            ]}
            onPress={() => dispatch(setCurrentItemIndex(item))}
          >
            <Text
              style={[
                styles.itemButtonText,
                currentItemIndex === item
                  ? styles.activeItemButtonText
                  : styles.inactiveItemButtonText,
              ]}
            >
              {item + 1}
            </Text>
          </TouchableOpacity>
        )}
      />
      <FlatList
        style={styles.verticalFlatList}
        data={bookDetails[currentItemIndex].data}
        keyExtractor={(item) => item.chapter}
        renderItem={({ item }) => {
          const { chapter, questions, topic } = item;
          return (
            <>
              <Text style={styles.topicText}>{topic}</Text>
              <Text style={styles.chapterText}>{chapter}</Text>
              <Text style={styles.questionTypeText}>{questions[0].type}</Text>
              <FlatList
                data={questions.flatMap(({ data }) => data)}
                keyExtractor={(item, index) =>
                  `${index}${item.correctAnswer.answer.trim()}`
                }
                renderItem={({ item }) => {
                  const { choices, correctAnswer, question } = item;

                  return (
                    <>
                      <Text style={styles.questionText}>{question}</Text>
                      <Text style={styles.correctAnswerText}>
                        {correctAnswer.answer}
                      </Text>
                      <FlatList
                        data={choices}
                        keyExtractor={(item) => item}
                        renderItem={(choice) => {
                          return (
                            <TouchableOpacity
                              onPress={() =>
                                console.log(
                                  choice.item === correctAnswer.answer
                                )
                              }
                            >
                              <Text style={styles.choiceText}>
                                {choice.item}
                              </Text>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </>
                  );
                }}
              />
            </>
          );
        }}
      />
    </View>
  );
};

export default Testbutton;

const styles = StyleSheet.create({
  activeItemButton: {
    borderColor: "#03f391",
  },
  activeItemButtonText: {
    color: "#03f391",
  },
  chapterText: {
    color: "white",
  },
  choiceText: {
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "black",
  },
  correctAnswerText: {
    color: "#03f391",
  },
  horizontalFlatList: {
    flexGrow: 0,
    backgroundColor: "#00f9",
  },
  inactiveItemButton: {
    borderColor: "white",
  },
  inactiveItemButtonText: {
    color: "white",
  },
  itemButton: {
    padding: 12,
    borderWidth: 2,
    borderRadius: 5,
    margin: 2,
  },
  itemButtonText: {
    color: "white",
  },
  questionText: {
    color: "yellow",
  },
  questionTypeText: {
    color: "white",
  },
  selectedBookText: {
    color: "white",
  },
  topicText: {
    color: "white",
  },
  verticalFlatList: {
    flex: 1,
    width: "100%",
  },
});
