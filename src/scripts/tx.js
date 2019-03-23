import b64 from "base64-js"
import vstruct from 'varstruct';
import djson from 'deterministic-json';

const TxStruct = vstruct([
    {name: 'data', type: vstruct.VarString(vstruct.UInt32BE)},
    {name: 'nonce', type: vstruct.VarString(vstruct.UInt32BE)}
]);

// See https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
export const encodeBase64 = (str, encoding = 'utf-8') => {
    let bytes = new (TextEncoder || TextEncoderLite)(encoding).encode(str)
    return b64.fromByteArray(bytes)
}

// See https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
export const decodeBase64 = (str, encoding = 'utf-8') => {
    let bytes = b64.toByteArray(str);
    return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes)
}

export const decodeTx = (base64str) => {
    try {
        let str = decodeBase64(base64str)
        let idx = str.indexOf('{')
        let json = str.substring(idx)
        return JSON.parse(json);
    } catch (e) {
        let txBuffer = base64str;
        if (!(txBuffer instanceof Buffer)) {
            txBuffer = Buffer.from(txBuffer, 'base64');
        }
        const decoded = TxStruct.decode(txBuffer);
        return djson.parse(decoded.data);
    }
}
