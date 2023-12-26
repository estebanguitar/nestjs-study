import crypto from 'crypto'

type HashAlgorithms = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512'
type Algorithms =
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

type CryptoOptions = {
  keyHashAlgorithm: HashAlgorithms
  algorithm: Algorithms
  ivSize: number
  outputEncoding: 'base64' | 'hex' | 'utf8'
}
type CryptoType = 'NAME' | 'PASSWORD' | 'RRN' | 'TEL' | 'PHONE' | 'EMAIL' | 'DATE'

class Crypto {
  constructor(private readonly options: CryptoOptions) {}

  encrypt(plainText: string, password?: string): string {
    try {
      const keyHash = crypto.createHash(this.options.keyHashAlgorithm)
      if (password !== undefined) keyHash.update(password)

      const iv = crypto.randomBytes(this.options.ivSize)
      const cipher = crypto.createCipheriv(this.options.algorithm, keyHash.digest(), iv)
      const cipherText = cipher.update(Buffer.from(plainText))
      const cipherFinal = cipher.final()
      const encrypted = Buffer.concat([iv, cipherText, cipherFinal])
      return encrypted.toString(this.options.outputEncoding)
    } catch (e) {
      console.error(e)
    }
  }

  decrypt(encText: string, password?: string): string {
    try {
      const encryptedBuffer = Buffer.from(encText, this.options.outputEncoding)
      const keyHash = crypto.createHash(this.options.keyHashAlgorithm)
      if (password !== undefined) keyHash.update(password)

      const iv = encryptedBuffer.subarray(0, this.options.ivSize)
      const rest = encryptedBuffer.subarray(this.options.ivSize)
      const decipher = crypto.createDecipheriv(this.options.algorithm, keyHash.digest(), iv)
      const plainText = decipher.update(rest)
      const plainFinal = decipher.final()
      const decrypted = Buffer.concat([plainText, plainFinal])
      return decrypted.toString()
    } catch (e) {
      console.error(e)
    }
  }
}

class NameCrypto extends Crypto {
  constructor() {
    super({
      keyHashAlgorithm: 'SHA-256',
      algorithm: 'AES-256-CBC',
      ivSize: 16,
      outputEncoding: 'base64',
    })
  }

  // TODO override encrypt, decrypt method here
}

class PasswordCrypto extends Crypto {
  constructor() {
    super({
      keyHashAlgorithm: 'SHA-256',
      algorithm: 'AES-256-CBC',
      ivSize: 16,
      outputEncoding: 'base64',
    })
  }
}

class RRNCrypto extends Crypto {
  constructor() {
    super({
      keyHashAlgorithm: 'SHA-256',
      algorithm: 'AES-256-CBC',
      ivSize: 16,
      outputEncoding: 'base64',
    })
  }
}

class TelCrypto extends Crypto {
  constructor() {
    super({
      keyHashAlgorithm: 'SHA-256',
      algorithm: 'AES-256-CBC',
      ivSize: 16,
      outputEncoding: 'base64',
    })
  }
}

class PhoneCrypto extends Crypto {
  constructor() {
    super({
      keyHashAlgorithm: 'SHA-256',
      algorithm: 'AES-256-CBC',
      ivSize: 16,
      outputEncoding: 'base64',
    })
  }
}

class EmailCrypto extends Crypto {
  constructor() {
    super({
      keyHashAlgorithm: 'SHA-256',
      algorithm: 'AES-256-CBC',
      ivSize: 16,
      outputEncoding: 'base64',
    })
  }
}

class DateCrypto extends Crypto {
  constructor() {
    super({
      keyHashAlgorithm: 'SHA-256',
      algorithm: 'AES-256-CBC',
      ivSize: 16,
      outputEncoding: 'base64',
    })
  }
}

export class CryptoFactory {
  private static readonly nameEncrypt = new NameCrypto()
  private static readonly passwordEncrypt = new PasswordCrypto()
  private static readonly rrnEncrypt = new RRNCrypto()
  private static readonly telEncrypt = new TelCrypto()
  private static readonly phoneEncrypt = new PhoneCrypto()
  private static readonly emailEncrypt = new EmailCrypto()
  private static readonly dateEncrypt = new DateCrypto()

  static getInstance(encType: CryptoType) {
    switch (encType) {
      case 'NAME':
        return this.nameEncrypt
      case 'PASSWORD':
        return this.passwordEncrypt
      case 'RRN':
        return this.rrnEncrypt
      case 'TEL':
        return this.telEncrypt
      case 'PHONE':
        return this.phoneEncrypt
      case 'EMAIL':
        return this.emailEncrypt
      case 'DATE':
        return this.dateEncrypt
      // TODO add more support
    }
  }
}
