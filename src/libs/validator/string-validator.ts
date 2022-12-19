import { Validator } from "./validator.js";

export class StringValidator<ErrorMessage extends string> {
  #validator: Validator<string, ErrorMessage>;

  private constructor(validator: Validator<string, ErrorMessage>) {
    this.#validator = validator;
  }

  public isRequired<E extends string>(
    message: E
  ): StringValidator<E | ErrorMessage> {
    return new StringValidator<E | ErrorMessage>(
      this.#validator.addValidation(message, (value) => value.length > 0)
    );
  }

  public minLength<E extends string>(
    length: number,
    message: E
  ): StringValidator<E | ErrorMessage> {
    return new StringValidator<E | ErrorMessage>(
      this.#validator.addValidation(message, (value) => value.length >= length)
    );
  }

  public maxLength<E extends string>(
    length: number,
    message: E
  ): StringValidator<E | ErrorMessage> {
    return new StringValidator<E | ErrorMessage>(
      this.#validator.addValidation(message, (value) => value.length <= length)
    );
  }

  public isEmail<E extends string>(
    message: E
  ): StringValidator<E | ErrorMessage> {
    return new StringValidator<E | ErrorMessage>(
      this.#validator.addValidation(message, (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      )
    );
  }

  public isFinancial<E extends string>(
    message: E
  ): StringValidator<E | ErrorMessage> {
    return new StringValidator<E | ErrorMessage>(
      this.#validator.addValidation(message, (value) =>
        /^[0-9]{1,}[.,]{0,1}[0-9]{0,2}$/.test(value)
      )
    );
  }

  public isNotEqualTo<E extends string>(
    target: string,
    message: E
  ): StringValidator<E | ErrorMessage> {
    return new StringValidator<E | ErrorMessage>(
      this.#validator.addValidation(message, (value) => target !== value)
    );
  }

  public isEqualTo<E extends string>(
    target: string,
    message: E
  ): StringValidator<E | ErrorMessage> {
    return new StringValidator<E | ErrorMessage>(
      this.#validator.addValidation(message, (value) => target === value)
    );
  }

  public hasPattern<E extends string>(
    pattern: string | RegExp,
    message: E
  ): StringValidator<E | ErrorMessage> {
    return new StringValidator<E | ErrorMessage>(
      this.#validator.addValidation(message, (value) =>
        new RegExp(pattern).test(value)
      )
    );
  }

  public execute(value: string) {
    return this.#validator.execute(value);
  }

  /**
   * Static helpers for faster validator creation
   */

  static isRequired<E extends string>(message: E): StringValidator<E> {
    return new StringValidator<E>(new Validator<string, E>([])).isRequired(
      message
    );
  }

  static minLength<E extends string>(
    length: number,
    message: E
  ): StringValidator<E> {
    return new StringValidator<E>(new Validator<string, E>([])).minLength(
      length,
      message
    );
  }

  static maxLength<E extends string>(
    length: number,
    message: E
  ): StringValidator<E> {
    return new StringValidator<E>(new Validator<string, E>([])).maxLength(
      length,
      message
    );
  }

  static isEmail<E extends string>(message: E): StringValidator<E> {
    return new StringValidator<E>(new Validator<string, E>([])).isEmail(
      message
    );
  }

  static isFinancial<E extends string>(message: E): StringValidator<E> {
    return new StringValidator<E>(new Validator<string, E>([])).isFinancial(
      message
    );
  }

  static isNotEqualTo<E extends string>(
    target: string,
    message: E
  ): StringValidator<E> {
    return new StringValidator<E>(new Validator<string, E>([])).isNotEqualTo(
      target,
      message
    );
  }

  static isEqualTo<E extends string>(
    target: string,
    message: E
  ): StringValidator<E> {
    return new StringValidator<E>(new Validator<string, E>([])).isEqualTo(
      target,
      message
    );
  }
}
