/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';
import { SharedStorefrontUi } from '@storefront/shared-ui';

export const App = () => {
  const handleButtonPress = (buttonType: string) => {
    Alert.alert('Button Pressed', `You pressed the ${buttonType} button!`);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          {/* <View style={styles.section}>
            <Text style={styles.title}>Mobile Storefront App</Text>
            <Text style={styles.subtitle}>Shared UI Components Demo</Text>
          </View> */}

          <View style={styles.section}>
            <SharedStorefrontUi />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  buttonSpacing: {
    height: 12,
  },
});

export default App;
