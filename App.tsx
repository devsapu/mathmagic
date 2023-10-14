import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Svg, {Path} from 'react-native-svg';
import * as Animatable from 'react-native-animatable';
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
// import {AdMobBanner} from '@react-native-firebase/admob';
const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const answer = num1 + num2;

  let wrongAnswers = Array.from({length: 40}, (_, i) => i + 1);
  wrongAnswers = wrongAnswers.filter(
    val => val !== answer && val !== answer + 1 && val !== answer - 1,
  );

  const randomWrongAnswer =
    wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];

  return {
    question: `${num1} + ${num2}`,
    answer: answer,
    options: [answer, answer + 1, answer - 1, randomWrongAnswer].sort(
      () => Math.random() - 0.5,
    ),
  };
};
const HappyCat = () => (
  <Svg height="50" width="50">
    <Path
      d="M25 50 C10 50 0 40 0 25 C0 10 10 0 25 0 C40 0 50 10 50 25 C50 40 40 50 25 50"
      fill="yellow"
    />
    <Path
      d="M15 20 C15 22 17 24 19 24 C21 24 23 22 23 20 C23 18 21 16 19 16 C17 16 15 18 15 20"
      fill="black"
    />
    <Path
      d="M35 20 C35 22 37 24 39 24 C41 24 43 22 43 20 C43 18 41 16 39 16 C37 16 35 18 35 20"
      fill="black"
    />
    <Path d="M20 35 C22 37 28 37 30 35" stroke="black" fill="transparent" />
  </Svg>
);

// Simple SadCat SVG (You can replace this with a detailed SVG)
const SadCat = () => (
  <Svg height="50" width="50">
    <Path
      d="M25 50 C10 50 0 40 0 25 C0 10 10 0 25 0 C40 0 50 10 50 25 C50 40 40 50 25 50"
      fill="yellow"
    />
    <Path
      d="M15 20 C15 22 17 24 19 24 C21 24 23 22 23 20 C23 18 21 16 19 16 C17 16 15 18 15 20"
      fill="black"
    />
    <Path
      d="M35 20 C35 22 37 24 39 24 C41 24 43 22 43 20 C43 18 41 16 39 16 C37 16 35 18 35 20"
      fill="black"
    />
    <Path d="M20 40 C22 38 28 38 30 40" stroke="black" fill="transparent" />
  </Svg>
);

const App = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [catMood, setCatMood] = useState('happy');
  const [questionData, setQuestionData] = useState(generateQuestion());

  const handleAnswer = selectedAnswer => {
    if (selectedAnswer === questionData.answer) {
      setFeedbackMessage("Great job! Let's try another.");
      setCatMood('happy');
    } else {
      setFeedbackMessage(
        "Your answer is not correct. That's okay! Give it another go.",
      );
      setCatMood('sad');
    }
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.View
          animation="bounceInDown"
          iterationCount={1}
          duration={1500}>
          <Text style={styles.headerText}>Let's Begin </Text>
        </Animatable.View>
      </View>
      <Text style={styles.title}>Math Magic!</Text>
      <Text style={styles.question}>{questionData.question}</Text>

      <View style={styles.optionsContainer}>
        {questionData.options.map((option, index) => (
          <View key={index} style={styles.buttonContainer}>
            <Button
              title={option.toString()}
              color="#74ADBD"
              onPress={() => handleAnswer(option)}
            />
          </View>
        ))}
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onModalHide={() => {
          setQuestionData(generateQuestion());
          setFeedbackMessage('');
          setCatMood('neutral');
        }}
        animationIn="zoomInDown"
        animationOut="zoomOutUp">
        <View style={styles.modalContent}>
          {/* <Animatable.View animation={catMood === 'happy' ? 'bounce' : 'shake'}>
            {catMood === 'happy' ? <HappyCat /> : <SadCat />}
          </Animatable.View> */}
          <Text style={styles.modalText}>{feedbackMessage}</Text>
          <Button
            title="Continue"
            color="#FFD700"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
      <Animatable.View
        animation={
          catMood === 'happy' ? 'bounce' : catMood === 'sad' ? 'shake' : null
        }
        style={{marginTop: 100}}
        iterationCount={catMood === 'neutral' ? 1 : 'infinite'}
        duration={1000}>
        {catMood === 'happy' ? <HappyCat /> : <SadCat />}
      </Animatable.View>
      <GAMBannerAd
        unitId='ca-app-pub-5917882002955025/7703020803'
        sizes={[BannerAdSize.FULL_BANNER]}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // change from 'center' to 'flex-start'
    alignItems: 'center',
    backgroundColor: '#B03060',
    paddingTop: 0, // or adjust as needed
  },
  header: {
    width: '100%',
    height: 60, // or any suitable height

    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // adds shadow on Android
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    marginTop: 160,
    fontSize: 48,
    color: '#EFF580',
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 40,
    color: 'white',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    margin: 15,
    width: '40%',
    height: 60,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#4B0082',
  },
  bannerAd: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default App;
