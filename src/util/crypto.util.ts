import crypto from 'crypto'
// const crypto = require('crypto')

const KEY_HASH_ALGORITHM = 'SHA-256'
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

  return null
}

interface Encrypt {
  encrypt(plainText: string): string

  decrypt(encText: string): string
}

type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512'
type Algorithm =
  | 'AES-128-CBC'
  | 'AES-128-CTR'
  | 'AES-128-GCM'
  | 'AES-192-CBC'
  | 'AES-192-CTR'
  | 'AES-192-GCM'
  | 'AES-256-CBC'
  | 'AES-256-CTR'
  | 'AES-256-GCM'
  | 'DES-CBC'
  | 'DES-EDE3-CBC'
  | 'RC4-40'
  | 'RC4-128'

export class CryptoUtil implements Encrypt {
  // 유틸인데 매번 객체를 생성해서 쓸 필요가 있나
  // encrypt에 모든 파라미터를 다 받아서 암호화 시켜도 되지 않나

  // 굳이 interface를 구현할 필요 있나

  constructor(
    private readonly keyHashAlgorithm: HashAlgorithm,
    private readonly algorithm: Algorithm,
    private readonly ivSize: number,
    private readonly outputEncoding: 'base64' | 'hex' | 'utf8',
  ) {}

  encrypt(plainText: string): string {
    try {
      const keyHash = crypto.createHash(this.keyHashAlgorithm)
      const iv = crypto.randomBytes(this.ivSize)
      const cipher = crypto.createCipheriv(this.algorithm, keyHash.digest(), iv)
      const cipherText = cipher.update(Buffer.from(plainText))
      const cipherFinal = cipher.final()
      const encrypted = Buffer.concat([iv, cipherText, cipherFinal])
      return encrypted.toString(this.outputEncoding)
    } catch (e) {
      console.error(e)
      //   throw new InternalError('Blockchain key encrypt error', ErrorCode.int.encrypt.ENCRYPTION_ERROR, {}, e)
    }
  }

  decrypt(encText: string): string {
    try {
      const encryptedBuffer = Buffer.from(encText, this.outputEncoding)
      const keyHash = crypto.createHash(this.keyHashAlgorithm)
      const iv = encryptedBuffer.subarray(0, this.ivSize)
      const rest = encryptedBuffer.subarray(this.ivSize)
      const decipher = crypto.createDecipheriv(this.algorithm, keyHash.digest(), iv)
      const plainText = decipher.update(rest)
      const plainFinal = decipher.final()
      const decrypted = Buffer.concat([plainText, plainFinal])
      return decrypted.toString()
    } catch (e) {
      console.error(e)
    }

    return null
  }
}

// const util = new CryptoUtil(KEY_HASH_ALGORITHM, AES_ALGORITHM, AES_IV_SIZE, AES_OUTPUT_ENCODING)
// const plainText = '123456'
// const org = aesEncrypt(plainText)
// const newE = util.encrypt(plainText)
// console.log(org)
// console.log(newE)
