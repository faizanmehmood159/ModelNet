import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState([]);

  const internetFAQs = [
    {
      question: 'What is the minimum speed offered for home internet?',
      answer: 'The minimum speed for our home internet plans is 2 Mbps. We also offer higher speed options for more demanding needs.',
    },
    {
      question: 'How can I check my internet speed?',
      answer: 'You can check your internet speed by using online speed testing tools. You can also contact our customer support for assistance in checking your speed.',
    },
    {
      question: 'Are there any data caps on my internet plan?',
      answer: 'Our home internet plans come with a generous data allowance. We offer unlimited data plans as well for customers who require higher data usage.',
    },
    {
      question: 'How can I upgrade my internet plan?',
      answer: 'To upgrade your internet plan, you can log in to your account on our website or contact our customer support team. We will guide you through the upgrade process.',
    },
    {
      question: 'What should I do if I experience slow internet speeds?',
      answer: 'If you experience slow internet speeds, first check your router and device connections. If the issue persists, contact our customer support for assistance and troubleshooting.',
    },
    {
      question: 'Do you provide technical support for setting up my home network?',
      answer: 'Yes, we offer technical support to help you set up and troubleshoot your home network. Contact our customer support team for assistance.',
    },
  ];

  const toggleItem = (index) => {
    setExpandedItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = !newItems[index];
      return newItems;
    });
  };

  return (
    <LinearGradient colors={['#EAECC6', '#E7E9BB', '#2BC0E4']} style={styles.gradient}>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.title}>Frequently Asked Questions (FAQs) - Internet</Text>
            {internetFAQs.map((faq, index) => (
              <View key={index} style={styles.faqContainer}>
                <TouchableOpacity onPress={() => toggleItem(index)} style={styles.questionContainer}>
                  <Text style={styles.question}>{faq.question}</Text>
                  <Text style={styles.sign}>{expandedItems[index] ? '-' : '+'}</Text>
                </TouchableOpacity>
                {expandedItems[index] && <Text style={styles.answer}>{faq.answer}</Text>}
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 5,
  },
  container: {
    marginTop: 100,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  faqContainer: {
    marginBottom: 10,
    borderWidth:1,
    borderRadius:10,

  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    width:310
  },

  sign:{
    fontWeight:'bold',
    fontSize:30,
    height:30,
    
    // backgroundColor:'red',
    
  },

  answer: {
    fontSize: 16,
    padding: 10,

  },
});

export default FAQ;
