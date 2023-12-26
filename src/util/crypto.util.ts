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

type EncryptOptions = {
  keyHashAlgorithm: HashAlgorithms
  algorithm: Algorithms
  ivSize: number
  outputEncoding: 'base64' | 'hex' | 'utf8'
}
type EncType = 'NAME' | 'PASSWORD' | 'RRN' | 'TEL' | 'PHONE' | 'EMAIL' | 'DATE'

class Encrypt {
  private readonly keyHashAlgorithm: HashAlgorithms
  private readonly algorithm: Algorithms
  private readonly ivSize: number
  private readonly outputEncoding: 'base64' | 'hex' | 'utf8'

  constructor(options: EncryptOptions) {
    this.keyHashAlgorithm = options.keyHashAlgorithm
    this.algorithm = options.algorithm
    this.ivSize = options.ivSize
    this.outputEncoding = options.outputEncoding
  }

  encrypt(plainText: string, password?: string): string {
    try {
      const keyHash = crypto.createHash(this.keyHashAlgorithm)
      if (password !== undefined) keyHash.update(password)

      const iv = crypto.randomBytes(this.ivSize)
      const cipher = crypto.createCipheriv(this.algorithm, keyHash.digest(), iv)
      const cipherText = cipher.update(Buffer.from(plainText))
      const cipherFinal = cipher.final()
      const encrypted = Buffer.concat([iv, cipherText, cipherFinal])
      return encrypted.toString(this.outputEncoding)
    } catch (e) {
      console.error(e)
    }
  }

  decrypt(encText: string, password?: string): string {
    try {
      const encryptedBuffer = Buffer.from(encText, this.outputEncoding)
      const keyHash = crypto.createHash(this.keyHashAlgorithm)
      if (password !== undefined) keyHash.update(password)

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
  }
}

class NameEncrypt extends Encrypt {
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

class PasswordEncrypt extends Encrypt {
  constructor() {
    super({
      keyHashAlgorithm: 'SHA-256',
      algorithm: 'AES-256-CBC',
      ivSize: 16,
      outputEncoding: 'base64',
    })
  }
}

class RRNEncrypt extends Encrypt {
  constructor() {
    super({
      keyHashAlgorithm: 'SHA-256',
      algorithm: 'AES-256-CBC',
      ivSize: 16,
      outputEncoding: 'base64',
    })
  }
}

class TelEncrypt extends Encrypt {
  constructor() {
    super({
      keyHashAlgorithm: 'SHA-256',
      algorithm: 'AES-256-CBC',
      ivSize: 16,
      outputEncoding: 'base64',
    })
  }
}

class PhoneEncrypt extends Encrypt {
  constructor() {
    super({
      keyHashAlgorithm: 'SHA-256',
      algorithm: 'AES-256-CBC',
      ivSize: 16,
      outputEncoding: 'base64',
    })
  }
}

class EmailEncrypt extends Encrypt {
  constructor() {
    super({
      keyHashAlgorithm: 'SHA-256',
      algorithm: 'AES-256-CBC',
      ivSize: 16,
      outputEncoding: 'base64',
    })
  }
}

class DateEncrypt extends Encrypt {
  constructor() {
    super({
      keyHashAlgorithm: 'SHA-256',
      algorithm: 'AES-256-CBC',
      ivSize: 16,
      outputEncoding: 'base64',
    })
  }
}

export class EncryptFactory {
  private static readonly nameEncrypt = new NameEncrypt()
  private static readonly passwordEncrypt = new PasswordEncrypt()
  private static readonly rrnEncrypt = new RRNEncrypt()
  private static readonly telEncrypt = new TelEncrypt()
  private static readonly phoneEncrypt = new PhoneEncrypt()
  private static readonly emailEncrypt = new EmailEncrypt()
  private static readonly dateEncrypt = new DateEncrypt()

  static getInstance(encType: EncType) {
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
