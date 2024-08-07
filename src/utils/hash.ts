import cryptography from 'crypto'

export function hashPassword(password: string) {
    const salt = cryptography.randomBytes(16).toString('hex');
    const hash = cryptography.pbkdf2Sync(password, salt, 1000, 64, 'sha512');

    return { hash, salt };
}

export function verifyPassword(unverifiedPassword: string, salt: string, hash: string) {
    const unverifiedHash = cryptography.pbkdf2Sync(unverifiedPassword, salt, 1000, 64, 'sha512').toString('hex');
    return unverifiedHash === hash;
}