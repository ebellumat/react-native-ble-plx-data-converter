# react-native-ble-plx-data-converter
A helper to convert data to bytes to send through https://github.com/Polidea/react-native-ble-plx

# why?

Send data with react-native-ble-plx could be trick, so I decided to create this helper to send commands with Bluetooth LE more easier.

# how to?
```javascript
import { convertToBytes } from './ble-data-converter';

const command = convertToBytes('yourStringBluetoothCommand');

```
