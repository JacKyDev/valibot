import type {
  BaseIssue,
  BaseSchema,
  BaseSchemaAsync,
  DefaultAsync,
  DefaultValue,
  InferOutput,
  NonOptional,
} from '../../types/index.ts';

/**
 * Infer optional output type.
 */
export type InferOptionalOutput<
  TWrapped extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
  TDefault extends DefaultAsync<TWrapped, undefined>,
> = undefined extends TDefault
  ? InferOutput<TWrapped> | undefined
  : // FIXME: For schemas that transform the input to `undefined`, this
    // implementation may result in an incorrect output type
    | NonOptional<InferOutput<TWrapped>>
      | Extract<DefaultValue<TDefault>, undefined>;
