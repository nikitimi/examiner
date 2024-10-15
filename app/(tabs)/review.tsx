import { StyleSheet, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ThemedText } from "@/components/ThemedText";
import useThemeColor from "@/hooks/useThemeColor";
import { BLACK, WHITE } from "@/constants/Colors";
import { selectBook, setCurrentTopic } from "@/redux/reducers/questionReducer";
import { ThemedView } from "@/components/ThemedView";
import { Collapsible } from "@/components/Collapsible";

const modalVisibilityList = [
  "choosingBook",
  "choosingModule",
  "reviewingBook",
] as const;
type CurrentVisibleModal = (typeof modalVisibilityList)[number];

const Review = () => {
  const dispatch = useAppDispatch();
  const { currentTopic, bookData, selectedBook } = useAppSelector(
    (s) => s.question
  );
  const { themeColor, themeMode } = useThemeColor();
  const [bookIndex, setBookIndex] = useState(0);
  const [currentVisibleModal, setCurrentVisibleModal] =
    useState<CurrentVisibleModal>("choosingBook");
  const isThemeDarkMode = themeMode === "dark";
  const bookNames = bookData.map(({ displayName }) => displayName);
  const bookModules = bookData.filter(
    ({ displayName }) => selectedBook === displayName
  )[0].list;
  const currentBookData = bookModules[bookIndex].data;

  // STYLING HERE.
  const dynamicButtonStyle = {
    borderColor: themeColor,
  };
  const dynamicTextStyle = { color: themeColor };
  const dynamicFlatlistStyle = {
    backgroundColor: isThemeDarkMode ? BLACK : WHITE,
  };
  const dynamicParentContainer = {
    backgroundColor: isThemeDarkMode ? themeColor : BLACK,
  };
  const finalButtonStyle = [styles.bookNameButton, dynamicButtonStyle];
  const finalTextStyle = [styles.bookNameText, dynamicTextStyle];
  const finalFlatlistStyle = [styles.bookNameContainer, dynamicFlatlistStyle];
  const finalParentColor = [styles.parentContainer, dynamicParentContainer];

  console.log(currentBookData);

  return (
    <>
      {currentVisibleModal === "choosingBook" && (
        <FlatList
          style={finalParentColor}
          data={bookNames}
          keyExtractor={(bookName) => bookName}
          contentContainerStyle={finalFlatlistStyle}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={finalButtonStyle}
                onPress={() => {
                  setCurrentVisibleModal("choosingModule");
                  dispatch(selectBook(item));
                }}
              >
                <ThemedText style={finalTextStyle}>
                  {item.replace(/_/g, " ")}
                </ThemedText>
              </Pressable>
            );
          }}
        />
      )}
      {currentVisibleModal === "choosingModule" && (
        <>
          <GoBack onPress={() => setCurrentVisibleModal("choosingBook")} />
          <FlatList
            style={finalParentColor}
            data={bookModules}
            contentContainerStyle={finalFlatlistStyle}
            keyExtractor={(module) => module.data[0].topic}
            renderItem={({ item, index }) => {
              const currentTopic = item.data[0].topic;
              return (
                <Pressable
                  style={finalButtonStyle}
                  onPress={() => {
                    setBookIndex(index);
                    setCurrentVisibleModal("reviewingBook");
                    dispatch(setCurrentTopic(currentTopic));
                  }}
                >
                  <ThemedText style={finalTextStyle}>{currentTopic}</ThemedText>
                </Pressable>
              );
            }}
          />
        </>
      )}
      {currentVisibleModal === "reviewingBook" && (
        <>
          <GoBack onPress={() => setCurrentVisibleModal("choosingModule")} />
          <FlatList
            style={finalParentColor}
            data={
              currentBookData
                .filter(({ topic }) => topic === currentTopic)[0]
                ?.questions.filter(({ type }) => type === "MULTIPLE_CHOICE")[0]
                .data
            }
            keyExtractor={({ question }) => question}
            renderItem={({ item, index }) => {
              const { question, correctAnswer } = item;

              return (
                <ThemedView style={{ padding: 2, gap: 12 }}>
                  <ThemedText>{`${index + 1}. ${question}`}</ThemedText>
                  <Collapsible
                    isHello
                    additionalContent="explanation"
                    title={correctAnswer.answer}
                  >
                    <ThemedText style={finalTextStyle}>
                      {correctAnswer.explanation}
                    </ThemedText>
                  </Collapsible>
                </ThemedView>
              );
            }}
          />
        </>
      )}
    </>
  );
};

type GoBackProps = {
  onPress: () => void;
};

const GoBack = (props: GoBackProps) => {
  return (
    <Pressable
      style={{
        position: "absolute",
        zIndex: 2,
        right: 12,
        top: 32,
      }}
      {...props}
    >
      <ThemedText style={{ fontSize: 20 }}>🔙</ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    paddingTop: 32,
  },
  bookNameContainer: {
    height: "100%",
    justifyContent: "space-around",
  },
  bookNameButton: {
    width: 320,
    marginHorizontal: "auto",
    padding: 4,
    borderRadius: 12,
    borderWidth: 2,
  },
  bookNameText: {
    textAlign: "center",
    textTransform: "capitalize",
  },
});

export default Review;
