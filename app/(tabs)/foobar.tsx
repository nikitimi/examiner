import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React, { useRef, useState } from "react";
import { Image, StyleSheet } from "react-native";

const Foobar = () => {
  const [state, setState] = useState({
    buttonStyle: styles.Button,
  });

  function toggleButtonColor() {
    setState((prevState) => ({
      ...prevState,
      buttonStyle:
        prevState.buttonStyle.color === styles.Button.color
          ? styles.ButtonActive
          : styles.Button,
    }));
  }

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    toggleButtonColor();
    console.log("first");
    console.log(StyleSheetList.length);
    setTimeout(() => toggleButtonColor(), 300);
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
      <Collapsible title={"This is your greetings!"}>
        <ThemedView>
          <ThemedText style={styles.Paragraph}>
            Hello People! I'm Collapsible
          </ThemedText>
        </ThemedView>
      </Collapsible>
      <Collapsible title={"This is your response to the greetings!"}>
        <ThemedView>
          <ThemedText style={styles.Paragraph}>
            Hello Collapsible! I'm Dad
          </ThemedText>
        </ThemedView>
      </Collapsible>
      <button style={state.buttonStyle} onClick={handleButtonClick}>
        Hello People
      </button>
      <ThemedView>
        <ThemedText style={styles.Paragraph}>Lorem Ipsum</ThemedText>
      </ThemedView>
      <ThemedText style={styles.Paragraph}>
        Consectetur aute amet exercitation minim ad dolor exercitation laboris.
        Ex proident ullamco nostrud deserunt pariatur sunt deserunt nisi mollit
        voluptate qui aute aliqua. Ullamco voluptate qui officia aute laborum ex
        veniam consequat cillum tempor laborum elit deserunt adipisicing. Sit
        esse fugiat est fugiat magna esse eiusmod ipsum magna officia laboris
        qui do ipsum. Non sit tempor aliqua consectetur ad esse non. Eiusmod eu
        proident aute sint non quis ullamco eu deserunt excepteur eiusmod irure.
      </ThemedText>
      <ThemedText style={styles.Paragraph}>
        Consectetur aute amet exercitation minim ad dolor exercitation laboris.
        Ex proident ullamco nostrud deserunt pariatur sunt deserunt nisi mollit
        voluptate qui aute aliqua. Ullamco voluptate qui officia aute laborum ex
        veniam consequat cillum tempor laborum elit deserunt adipisicing. Sit
        esse fugiat est fugiat magna esse eiusmod ipsum magna officia laboris
        qui do ipsum. Non sit tempor aliqua consectetur ad esse non. Eiusmod eu
        proident aute sint non quis ullamco eu deserunt excepteur eiusmod irure.
      </ThemedText>
      <ThemedText style={styles.Paragraph}>
        Consectetur aute amet exercitation minim ad dolor exercitation laboris.
        Ex proident ullamco nostrud deserunt pariatur sunt deserunt nisi mollit
        voluptate qui aute aliqua. Ullamco voluptate qui officia aute laborum ex
        veniam consequat cillum tempor laborum elit deserunt adipisicing. Sit
        esse fugiat est fugiat magna esse eiusmod ipsum magna officia laboris
        qui do ipsum. Non sit tempor aliqua consectetur ad esse non. Eiusmod eu
        proident aute sint non quis ullamco eu deserunt excepteur eiusmod irure.
      </ThemedText>
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
