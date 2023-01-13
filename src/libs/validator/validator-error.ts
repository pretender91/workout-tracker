/**
 * Predefined validation issue types.
 */
enum ValidatorIssueCode {
  /**
   * custom validity
   */
  CustomError = "customError",
  /**
   * if the value does not match the specified pattern
   */
  PatternMismatch = "patternMismatch",
  /**
   * if the value is greater than the maximum specified by some range validation
   */
  RangeOverflow = "rangeOverflow",
  /**
   * if the value is less than the minimum specified by some range validation
   */
  RangeUnderflow = "rangeUnderflow",
  StepMismatch = "stepMismatch",
  /**
   * if the value exceeds the specified maxlength
   */
  TooLong = "tooLong",
  /**
   * if the value is less than the specified minlength
   */
  TooShort = "tooShort",
  /**
   * if the value is not in the required syntax (email, url, etc.)
   */
  TypeMismatch = "typeMismatch",
  /**
   * if the value is missing and the field is required
   */
  ValueMissing = "valueMissing",

  /**
   * if the value is not in allowed list of values
   */
  ValueInclusionError = "valueInclusion",
  /**
   * if the value is in disallowed list of values
   */
  ValueExclusionError = "valueExclusion",
}

type ValidatorIssueDetails =
  | {
      code: ValidatorIssueCode.ValueMissing;
    }
  | {
      code: ValidatorIssueCode.CustomError;
    }
  | {
      code: ValidatorIssueCode.PatternMismatch;
      pattern: string;
    }
  | {
      code: ValidatorIssueCode.RangeOverflow;
      max: number;
    }
  | {
      code: ValidatorIssueCode.RangeUnderflow;
      min: number;
    }
  | {
      code: ValidatorIssueCode.StepMismatch;
      step: number;
    }
  | {
      code: ValidatorIssueCode.TooLong;
      maxLength: number;
    }
  | {
      code: ValidatorIssueCode.TooShort;
      minLength: number;
    }
  | {
      code: ValidatorIssueCode.TypeMismatch;
      type: string;
    }
  | {
      code: ValidatorIssueCode.ValueInclusionError;
      allowed: Array<string | number | boolean>;
    }
  | {
      code: ValidatorIssueCode.ValueExclusionError;
      disallowed: Array<string | number | boolean>;
    };

export class ValidatorError extends Error {
  public override readonly name: string = "ValidatorIssue";
  public readonly details: ValidatorIssueDetails;
  public readonly path: string[];

  public constructor(
    details: ValidatorIssueDetails,
    message: string = "",
    path: string[] = []
  ) {
    super(message);
    this.details = details;
    this.path = path;
  }

  public static CustomError(
    message: string = "custom error",
    path: string[] = []
  ): ValidatorError {
    return new ValidatorError(
      { code: ValidatorIssueCode.CustomError },
      message,
      path
    );
  }

  public static PatternMismatch(
    pattern: string,
    message: string = "value does not match the specified pattern",
    path: string[] = []
  ): ValidatorError {
    return new ValidatorError(
      { code: ValidatorIssueCode.PatternMismatch, pattern },
      message,
      path
    );
  }

  public static RangeOverflow(
    max: number,
    message: string = "value is greater than the maximum specified by range validation",
    path: string[] = []
  ): ValidatorError {
    return new ValidatorError(
      { code: ValidatorIssueCode.RangeOverflow, max },
      message,
      path
    );
  }

  public static RangeUnderflow(
    min: number,
    message: string = "value is less than the minimum specified by range validation",
    path: string[] = []
  ): ValidatorError {
    return new ValidatorError(
      { code: ValidatorIssueCode.RangeUnderflow, min },
      message,
      path
    );
  }

  public static StepMismatch(
    step: number,
    message: string = "value does not match the specified step",
    path: string[] = []
  ): ValidatorError {
    return new ValidatorError(
      { code: ValidatorIssueCode.StepMismatch, step },
      message,
      path
    );
  }

  public static TooLong(
    maxLength: number,
    message: string = "value exceeds the specified maxlength",
    path: string[] = []
  ): ValidatorError {
    return new ValidatorError(
      { code: ValidatorIssueCode.TooLong, maxLength },
      message,
      path
    );
  }

  public static TooShort(
    minLength: number,
    message: string = "value is less than the specified minlength",
    path: string[] = []
  ): ValidatorError {
    return new ValidatorError(
      { code: ValidatorIssueCode.TooShort, minLength },
      message,
      path
    );
  }

  public static TypeMismatch(
    type: string,
    message: string = "value is not in the required syntax (email, url, etc.)",
    path: string[] = []
  ): ValidatorError {
    return new ValidatorError(
      { code: ValidatorIssueCode.TypeMismatch, type },
      message,
      path
    );
  }

  public static ValueMissing(
    message: string = "value is required",
    path: string[] = []
  ): ValidatorError {
    return new ValidatorError(
      { code: ValidatorIssueCode.ValueMissing },
      message,
      path
    );
  }

  public static ValueInclusionError(
    allowed: Array<string | number | boolean>,
    message: string = "value is not in allowed list of values",
    path: string[] = []
  ): ValidatorError {
    return new ValidatorError(
      { code: ValidatorIssueCode.ValueInclusionError, allowed },
      message,
      path
    );
  }

  public static ValueExclusionError(
    disallowed: Array<string | number | boolean>,
    message: string = "value is in disallowed list of values",
    path: string[] = []
  ): ValidatorError {
    return new ValidatorError(
      { code: ValidatorIssueCode.ValueExclusionError, disallowed },
      message,
      path
    );
  }

  public static aggregateFromMap(
    errorsMap: Record<string, ValidatorError>
  ): AggregateError {
    return new AggregateError(
      Object.entries(errorsMap).map(([path, error]) => {
        error.path.push(path);
        return error;
      })
    );
  }
}
