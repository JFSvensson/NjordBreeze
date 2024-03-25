/**
 * @file Defines a token blacklist service.
 * @module service
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */
export class TokenBlacklist {
  constructor() {
    this.blacklist = {}
  }

  add(token) {
    this.blacklist[token] = true
  }

  check(token) {
    return !!this.blacklist[token]
  }
}
