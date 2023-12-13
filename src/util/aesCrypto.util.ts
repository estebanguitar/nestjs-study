import crypto from 'crypto'

const KEY_HASH_ALGORITHM = "SHA-256"
const AES_ALGORITHM = 'aes-256-cbc'
const AES_IV_SIZE = 16
const AES_OUTPUT_ENCODING = 'base64'

export const aesEncrypt = (plainText: string): string => {
    try {
        const keyHash = crypto.createHash(KEY_HASH_ALGORITHM)
        const iv = crypto.randomBytes(AES_IV_SIZE)
        const cipher = crypto.createCipheriv(AES_ALGORITHM, keyHash.digest(), iv)
        const cipherText = cipher.update(Buffer.from(plainText))
        const cipherFinal = cipher.final()
        const encrypted = Buffer.concat([iv, cipherText, cipherFinal])
        return encrypted.toString(AES_OUTPUT_ENCODING)
    } catch (e) {
        console.error(e)
    //   throw new InternalError('Blockchain key encrypt error', ErrorCode.int.encrypt.ENCRYPTION_ERROR, {}, e)
    }
}

export const aesDecrypt = (encText: string): string => {
    try {
        const encryptedBuffer = Buffer.from(encText, AES_OUTPUT_ENCODING)
        const keyHash = crypto.createHash(KEY_HASH_ALGORITHM)
        const iv = encryptedBuffer.subarray(0, AES_IV_SIZE)
        const rest = encryptedBuffer.subarray(AES_IV_SIZE)
        const decipher = crypto.createDecipheriv(AES_ALGORITHM, keyHash.digest(), iv)
        const plainText = decipher.update(rest)
        const plainFinal = decipher.final()
        const decrypted = Buffer.concat([plainText, plainFinal])
        return decrypted.toString()
    } catch (e) {
        console.error(e)
    }

    return null;
}