// Inspired by: https://github.com/davidchambers/Base64.js/blob/master/base64.js

const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const Base64 = {
  btoa: (input = '') => {
    let str = input
    let output = ''

    for (
      let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || ((map = '='), i % 1);
      output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
      charCode = str.charCodeAt((i += 3 / 4))

      if (charCode > 0xff) {
        throw new Error(
          '\'btoa\' failed: The string to be encoded contains characters outside of the Latin1 range.'
        )
      }

      block = (block << 8) | charCode
    }

    return output
  },

  atob: (input = '') => {
    let str = input.replace(/=+$/, '')
    let output = ''

    if (str.length % 4 == 1) {
      throw new Error(
        '\'atob\' failed: The string to be decoded is not correctly encoded.'
      )
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer)
    }

    return output
  }
}

const convertToBytes = (commandCode) => {
  var string = 'ABDETKA'
  var array = new Uint8Array(string.length)

  for (var i = 0, l = string.length; i < l; i++) {
    array[i] = string.charCodeAt(i)
  }

  array[6] = parseInt(commandCode)

  return bufferToBase64(array.buffer)
}

const bufferToBase64 = (buffer) => {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  var len = bytes.byteLength

  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }

  return Base64.btoa(binary)
}

const base64ToBuffer = (base64) => {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  var i
  var lookup = new Uint8Array(256)
  for (i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i
  }

  var bufferLength = base64.length * 0.75,
    len = base64.length,
    p = 0,
    encoded1,
    encoded2,
    encoded3,
    encoded4

  if (base64[base64.length - 1] === '=') {
    bufferLength--
    if (base64[base64.length - 2] === '=') {
      bufferLength--
    }
  }

  var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer)

  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base64.charCodeAt(i)]
    encoded2 = lookup[base64.charCodeAt(i + 1)]
    encoded3 = lookup[base64.charCodeAt(i + 2)]
    encoded4 = lookup[base64.charCodeAt(i + 3)]

    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4)
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2)
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63)
  }

  return arraybuffer
}

export { convertToBytes, base64ToBuffer }
