'use client';

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SharedStorefrontUi } from '@storefront/shared-ui';

export default function Index() {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Web Storefront</Text>
          <Text style={styles.subtitle}>Shared UI Components Demo</Text>
        </View>

        <View style={styles.section}>
          <SharedStorefrontUi />
        </View>

        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
  },
  content: {
    padding: 16,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 16,
    gap: 12,
  },
  buttonSpacing: {
    height: 12,
  },
});
