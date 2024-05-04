import type {
  LazySchema,
  LazySchemaAsync,
  NonNullableIssue,
  NonNullableSchema,
  NonNullableSchemaAsync,
  NullishSchema,
  NullishSchemaAsync,
  OptionalSchema,
  OptionalSchemaAsync,
} from '../schemas/index.ts';
import type { InferInput } from './infer.ts';
import type { BaseIssue } from './issue.ts';
import type { BaseSchema, BaseSchemaAsync } from './schema.ts';
import type { MaybePromise } from './utils.ts';

/**
 * Error message type.
 */
export type ErrorMessage<TIssue extends BaseIssue<unknown>> =
  | ((issue: TIssue) => string)
  | string;

/**
 * Function reference type.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionReference<TArgs extends any[], TReturn> = (
  ...args: TArgs
) => TReturn;

/**
 * Default type.
 */
export type Default<
  TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
> = InferInput<TSchema> | (() => InferInput<TSchema> | undefined) | undefined;

/**
 * Default async type.
 */
export type DefaultAsync<
  TSchema extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> =
  | InferInput<TSchema>
  | (() => MaybePromise<InferInput<TSchema> | undefined>)
  | undefined;

/**
 * Base question mark schema type.
 */
type BaseQuestionMarkSchema =
  | NullishSchema<
      BaseSchema<unknown, unknown, BaseIssue<unknown>>,
      Default<BaseSchema<unknown, unknown, BaseIssue<unknown>>>
    >
  | OptionalSchema<
      BaseSchema<unknown, unknown, BaseIssue<unknown>>,
      Default<BaseSchema<unknown, unknown, BaseIssue<unknown>>>
    >;

/**
 * Question mark schema type.
 */
export type QuestionMarkSchema =
  | BaseQuestionMarkSchema
  // @ts-expect-error
  | LazySchema<QuestionMarkSchema>
  | NonNullableSchema<
      // @ts-expect-error
      QuestionMarkSchema,
      ErrorMessage<NonNullableIssue> | undefined
    >;

/**
 * Base question mark schema async type.
 */
type BaseQuestionMarkSchemaAsync =
  | NullishSchemaAsync<
      | BaseSchema<unknown, unknown, BaseIssue<unknown>>
      | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
      DefaultAsync<
        | BaseSchema<unknown, unknown, BaseIssue<unknown>>
        | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
      >
    >
  | OptionalSchemaAsync<
      | BaseSchema<unknown, unknown, BaseIssue<unknown>>
      | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
      DefaultAsync<
        | BaseSchema<unknown, unknown, BaseIssue<unknown>>
        | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
      >
    >;

/**
 * Question mark schema async type.
 */
export type QuestionMarkSchemaAsync =
  | BaseQuestionMarkSchemaAsync
  // @ts-expect-error
  | LazySchemaAsync<QuestionMarkSchema | QuestionMarkSchemaAsync>
  | NonNullableSchemaAsync<
      // @ts-expect-error
      QuestionMarkSchema | QuestionMarkSchemaAsync,
      ErrorMessage<NonNullableIssue> | undefined
    >;
