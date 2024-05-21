import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [ip, setIp] = useState('');
  const [geoInfo, setGeoInfo] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [error, setError] = useState('');

  const fetchGeoInfo = async (ip) => {
    try {
      const res = await axios.get(`https://ipinfo.io/${ip}/geo`);
      setGeoInfo(res.data);
      setSearchHistory([...searchHistory, ip]);
      setError('');
    } catch (err) {
      setError('Invalid IP address');
    }
  };

  useEffect(() => {
    // Fetch info for the logged user IP on component mount
    fetchGeoInfo('your-ip-address');
  }, []);

  return (
    <View style={styles.container}>
      <Text>IP: {geoInfo?.ip}</Text>
      <Text>Location: {geoInfo?.city}, {geoInfo?.region}, {geoInfo?.country}</Text>
      <TextInput
        placeholder="Enter IP address"
        value={ip}
        onChangeText={setIp}
        style={styles.input}
      />
      <Button title="Search" onPress={() => fetchGeoInfo(ip)} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Clear" onPress={() => setGeoInfo(null)} />
      <FlatList
        data={searchHistory}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => fetchGeoInfo(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
});

export default HomeScreen;
