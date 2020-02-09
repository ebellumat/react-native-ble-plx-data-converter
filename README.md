# react-native-ble-plx-data-converter
A helper to convert data to bytes to send through https://github.com/Polidea/react-native-ble-plx

# Why?

Send data with [https://github.com/Polidea/react-native-ble-plx] could be trick, so i decided to create this helper to send commands with Bluetooth LE more easier.

# Who to?
````
import { convertToBytes } from 'ble-data-converter'

const command = convertToBytes('yourStringBluetoothCommand');
