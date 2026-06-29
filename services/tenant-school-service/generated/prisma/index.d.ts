
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model School
 * 
 */
export type School = $Result.DefaultSelection<Prisma.$SchoolPayload>
/**
 * Model ServiceStatus
 * 
 */
export type ServiceStatus = $Result.DefaultSelection<Prisma.$ServiceStatusPayload>
/**
 * Model Membership
 * 
 */
export type Membership = $Result.DefaultSelection<Prisma.$MembershipPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model IdentityAccount
 * 
 */
export type IdentityAccount = $Result.DefaultSelection<Prisma.$IdentityAccountPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Schools
 * const schools = await prisma.school.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Schools
   * const schools = await prisma.school.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.school`: Exposes CRUD operations for the **School** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schools
    * const schools = await prisma.school.findMany()
    * ```
    */
  get school(): Prisma.SchoolDelegate<ExtArgs>;

  /**
   * `prisma.serviceStatus`: Exposes CRUD operations for the **ServiceStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceStatuses
    * const serviceStatuses = await prisma.serviceStatus.findMany()
    * ```
    */
  get serviceStatus(): Prisma.ServiceStatusDelegate<ExtArgs>;

  /**
   * `prisma.membership`: Exposes CRUD operations for the **Membership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Memberships
    * const memberships = await prisma.membership.findMany()
    * ```
    */
  get membership(): Prisma.MembershipDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.identityAccount`: Exposes CRUD operations for the **IdentityAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IdentityAccounts
    * const identityAccounts = await prisma.identityAccount.findMany()
    * ```
    */
  get identityAccount(): Prisma.IdentityAccountDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    School: 'School',
    ServiceStatus: 'ServiceStatus',
    Membership: 'Membership',
    AuditLog: 'AuditLog',
    IdentityAccount: 'IdentityAccount'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "school" | "serviceStatus" | "membership" | "auditLog" | "identityAccount"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      School: {
        payload: Prisma.$SchoolPayload<ExtArgs>
        fields: Prisma.SchoolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SchoolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SchoolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          findFirst: {
            args: Prisma.SchoolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SchoolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          findMany: {
            args: Prisma.SchoolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          create: {
            args: Prisma.SchoolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          createMany: {
            args: Prisma.SchoolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SchoolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          delete: {
            args: Prisma.SchoolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          update: {
            args: Prisma.SchoolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          deleteMany: {
            args: Prisma.SchoolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SchoolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SchoolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          aggregate: {
            args: Prisma.SchoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchool>
          }
          groupBy: {
            args: Prisma.SchoolGroupByArgs<ExtArgs>
            result: $Utils.Optional<SchoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.SchoolCountArgs<ExtArgs>
            result: $Utils.Optional<SchoolCountAggregateOutputType> | number
          }
        }
      }
      ServiceStatus: {
        payload: Prisma.$ServiceStatusPayload<ExtArgs>
        fields: Prisma.ServiceStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceStatusPayload>
          }
          findFirst: {
            args: Prisma.ServiceStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceStatusPayload>
          }
          findMany: {
            args: Prisma.ServiceStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceStatusPayload>[]
          }
          create: {
            args: Prisma.ServiceStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceStatusPayload>
          }
          createMany: {
            args: Prisma.ServiceStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceStatusPayload>[]
          }
          delete: {
            args: Prisma.ServiceStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceStatusPayload>
          }
          update: {
            args: Prisma.ServiceStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceStatusPayload>
          }
          deleteMany: {
            args: Prisma.ServiceStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ServiceStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceStatusPayload>
          }
          aggregate: {
            args: Prisma.ServiceStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceStatus>
          }
          groupBy: {
            args: Prisma.ServiceStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceStatusCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceStatusCountAggregateOutputType> | number
          }
        }
      }
      Membership: {
        payload: Prisma.$MembershipPayload<ExtArgs>
        fields: Prisma.MembershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MembershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MembershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          findFirst: {
            args: Prisma.MembershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MembershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          findMany: {
            args: Prisma.MembershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>[]
          }
          create: {
            args: Prisma.MembershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          createMany: {
            args: Prisma.MembershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MembershipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>[]
          }
          delete: {
            args: Prisma.MembershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          update: {
            args: Prisma.MembershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          deleteMany: {
            args: Prisma.MembershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MembershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MembershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          aggregate: {
            args: Prisma.MembershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMembership>
          }
          groupBy: {
            args: Prisma.MembershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<MembershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.MembershipCountArgs<ExtArgs>
            result: $Utils.Optional<MembershipCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      IdentityAccount: {
        payload: Prisma.$IdentityAccountPayload<ExtArgs>
        fields: Prisma.IdentityAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IdentityAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdentityAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IdentityAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdentityAccountPayload>
          }
          findFirst: {
            args: Prisma.IdentityAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdentityAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IdentityAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdentityAccountPayload>
          }
          findMany: {
            args: Prisma.IdentityAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdentityAccountPayload>[]
          }
          create: {
            args: Prisma.IdentityAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdentityAccountPayload>
          }
          createMany: {
            args: Prisma.IdentityAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IdentityAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdentityAccountPayload>[]
          }
          delete: {
            args: Prisma.IdentityAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdentityAccountPayload>
          }
          update: {
            args: Prisma.IdentityAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdentityAccountPayload>
          }
          deleteMany: {
            args: Prisma.IdentityAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IdentityAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.IdentityAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdentityAccountPayload>
          }
          aggregate: {
            args: Prisma.IdentityAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIdentityAccount>
          }
          groupBy: {
            args: Prisma.IdentityAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<IdentityAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.IdentityAccountCountArgs<ExtArgs>
            result: $Utils.Optional<IdentityAccountCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SchoolCountOutputType
   */

  export type SchoolCountOutputType = {
    Memberships: number
    AuditLogs: number
  }

  export type SchoolCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Memberships?: boolean | SchoolCountOutputTypeCountMembershipsArgs
    AuditLogs?: boolean | SchoolCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolCountOutputType
     */
    select?: SchoolCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model School
   */

  export type AggregateSchool = {
    _count: SchoolCountAggregateOutputType | null
    _avg: SchoolAvgAggregateOutputType | null
    _sum: SchoolSumAggregateOutputType | null
    _min: SchoolMinAggregateOutputType | null
    _max: SchoolMaxAggregateOutputType | null
  }

  export type SchoolAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type SchoolSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type SchoolMinAggregateOutputType = {
    schoolId: string | null
    name: string | null
    status: string | null
    latitude: number | null
    longitude: number | null
  }

  export type SchoolMaxAggregateOutputType = {
    schoolId: string | null
    name: string | null
    status: string | null
    latitude: number | null
    longitude: number | null
  }

  export type SchoolCountAggregateOutputType = {
    schoolId: number
    name: number
    status: number
    latitude: number
    longitude: number
    _all: number
  }


  export type SchoolAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type SchoolSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type SchoolMinAggregateInputType = {
    schoolId?: true
    name?: true
    status?: true
    latitude?: true
    longitude?: true
  }

  export type SchoolMaxAggregateInputType = {
    schoolId?: true
    name?: true
    status?: true
    latitude?: true
    longitude?: true
  }

  export type SchoolCountAggregateInputType = {
    schoolId?: true
    name?: true
    status?: true
    latitude?: true
    longitude?: true
    _all?: true
  }

  export type SchoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which School to aggregate.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schools
    **/
    _count?: true | SchoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SchoolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SchoolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SchoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SchoolMaxAggregateInputType
  }

  export type GetSchoolAggregateType<T extends SchoolAggregateArgs> = {
        [P in keyof T & keyof AggregateSchool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchool[P]>
      : GetScalarType<T[P], AggregateSchool[P]>
  }




  export type SchoolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolWhereInput
    orderBy?: SchoolOrderByWithAggregationInput | SchoolOrderByWithAggregationInput[]
    by: SchoolScalarFieldEnum[] | SchoolScalarFieldEnum
    having?: SchoolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SchoolCountAggregateInputType | true
    _avg?: SchoolAvgAggregateInputType
    _sum?: SchoolSumAggregateInputType
    _min?: SchoolMinAggregateInputType
    _max?: SchoolMaxAggregateInputType
  }

  export type SchoolGroupByOutputType = {
    schoolId: string
    name: string
    status: string
    latitude: number | null
    longitude: number | null
    _count: SchoolCountAggregateOutputType | null
    _avg: SchoolAvgAggregateOutputType | null
    _sum: SchoolSumAggregateOutputType | null
    _min: SchoolMinAggregateOutputType | null
    _max: SchoolMaxAggregateOutputType | null
  }

  type GetSchoolGroupByPayload<T extends SchoolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SchoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SchoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SchoolGroupByOutputType[P]>
            : GetScalarType<T[P], SchoolGroupByOutputType[P]>
        }
      >
    >


  export type SchoolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    schoolId?: boolean
    name?: boolean
    status?: boolean
    latitude?: boolean
    longitude?: boolean
    ServiceStatus?: boolean | School$ServiceStatusArgs<ExtArgs>
    Memberships?: boolean | School$MembershipsArgs<ExtArgs>
    AuditLogs?: boolean | School$AuditLogsArgs<ExtArgs>
    _count?: boolean | SchoolCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    schoolId?: boolean
    name?: boolean
    status?: boolean
    latitude?: boolean
    longitude?: boolean
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectScalar = {
    schoolId?: boolean
    name?: boolean
    status?: boolean
    latitude?: boolean
    longitude?: boolean
  }

  export type SchoolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ServiceStatus?: boolean | School$ServiceStatusArgs<ExtArgs>
    Memberships?: boolean | School$MembershipsArgs<ExtArgs>
    AuditLogs?: boolean | School$AuditLogsArgs<ExtArgs>
    _count?: boolean | SchoolCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SchoolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SchoolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "School"
    objects: {
      ServiceStatus: Prisma.$ServiceStatusPayload<ExtArgs> | null
      Memberships: Prisma.$MembershipPayload<ExtArgs>[]
      AuditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      schoolId: string
      name: string
      status: string
      latitude: number | null
      longitude: number | null
    }, ExtArgs["result"]["school"]>
    composites: {}
  }

  type SchoolGetPayload<S extends boolean | null | undefined | SchoolDefaultArgs> = $Result.GetResult<Prisma.$SchoolPayload, S>

  type SchoolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SchoolFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SchoolCountAggregateInputType | true
    }

  export interface SchoolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['School'], meta: { name: 'School' } }
    /**
     * Find zero or one School that matches the filter.
     * @param {SchoolFindUniqueArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SchoolFindUniqueArgs>(args: SelectSubset<T, SchoolFindUniqueArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one School that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SchoolFindUniqueOrThrowArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SchoolFindUniqueOrThrowArgs>(args: SelectSubset<T, SchoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first School that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindFirstArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SchoolFindFirstArgs>(args?: SelectSubset<T, SchoolFindFirstArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first School that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindFirstOrThrowArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SchoolFindFirstOrThrowArgs>(args?: SelectSubset<T, SchoolFindFirstOrThrowArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Schools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schools
     * const schools = await prisma.school.findMany()
     * 
     * // Get first 10 Schools
     * const schools = await prisma.school.findMany({ take: 10 })
     * 
     * // Only select the `schoolId`
     * const schoolWithSchoolIdOnly = await prisma.school.findMany({ select: { schoolId: true } })
     * 
     */
    findMany<T extends SchoolFindManyArgs>(args?: SelectSubset<T, SchoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a School.
     * @param {SchoolCreateArgs} args - Arguments to create a School.
     * @example
     * // Create one School
     * const School = await prisma.school.create({
     *   data: {
     *     // ... data to create a School
     *   }
     * })
     * 
     */
    create<T extends SchoolCreateArgs>(args: SelectSubset<T, SchoolCreateArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Schools.
     * @param {SchoolCreateManyArgs} args - Arguments to create many Schools.
     * @example
     * // Create many Schools
     * const school = await prisma.school.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SchoolCreateManyArgs>(args?: SelectSubset<T, SchoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Schools and returns the data saved in the database.
     * @param {SchoolCreateManyAndReturnArgs} args - Arguments to create many Schools.
     * @example
     * // Create many Schools
     * const school = await prisma.school.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Schools and only return the `schoolId`
     * const schoolWithSchoolIdOnly = await prisma.school.createManyAndReturn({ 
     *   select: { schoolId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SchoolCreateManyAndReturnArgs>(args?: SelectSubset<T, SchoolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a School.
     * @param {SchoolDeleteArgs} args - Arguments to delete one School.
     * @example
     * // Delete one School
     * const School = await prisma.school.delete({
     *   where: {
     *     // ... filter to delete one School
     *   }
     * })
     * 
     */
    delete<T extends SchoolDeleteArgs>(args: SelectSubset<T, SchoolDeleteArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one School.
     * @param {SchoolUpdateArgs} args - Arguments to update one School.
     * @example
     * // Update one School
     * const school = await prisma.school.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SchoolUpdateArgs>(args: SelectSubset<T, SchoolUpdateArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Schools.
     * @param {SchoolDeleteManyArgs} args - Arguments to filter Schools to delete.
     * @example
     * // Delete a few Schools
     * const { count } = await prisma.school.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SchoolDeleteManyArgs>(args?: SelectSubset<T, SchoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schools
     * const school = await prisma.school.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SchoolUpdateManyArgs>(args: SelectSubset<T, SchoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one School.
     * @param {SchoolUpsertArgs} args - Arguments to update or create a School.
     * @example
     * // Update or create a School
     * const school = await prisma.school.upsert({
     *   create: {
     *     // ... data to create a School
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the School we want to update
     *   }
     * })
     */
    upsert<T extends SchoolUpsertArgs>(args: SelectSubset<T, SchoolUpsertArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolCountArgs} args - Arguments to filter Schools to count.
     * @example
     * // Count the number of Schools
     * const count = await prisma.school.count({
     *   where: {
     *     // ... the filter for the Schools we want to count
     *   }
     * })
    **/
    count<T extends SchoolCountArgs>(
      args?: Subset<T, SchoolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SchoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SchoolAggregateArgs>(args: Subset<T, SchoolAggregateArgs>): Prisma.PrismaPromise<GetSchoolAggregateType<T>>

    /**
     * Group by School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SchoolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SchoolGroupByArgs['orderBy'] }
        : { orderBy?: SchoolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SchoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the School model
   */
  readonly fields: SchoolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for School.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SchoolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ServiceStatus<T extends School$ServiceStatusArgs<ExtArgs> = {}>(args?: Subset<T, School$ServiceStatusArgs<ExtArgs>>): Prisma__ServiceStatusClient<$Result.GetResult<Prisma.$ServiceStatusPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    Memberships<T extends School$MembershipsArgs<ExtArgs> = {}>(args?: Subset<T, School$MembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany"> | Null>
    AuditLogs<T extends School$AuditLogsArgs<ExtArgs> = {}>(args?: Subset<T, School$AuditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the School model
   */ 
  interface SchoolFieldRefs {
    readonly schoolId: FieldRef<"School", 'String'>
    readonly name: FieldRef<"School", 'String'>
    readonly status: FieldRef<"School", 'String'>
    readonly latitude: FieldRef<"School", 'Float'>
    readonly longitude: FieldRef<"School", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * School findUnique
   */
  export type SchoolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School findUniqueOrThrow
   */
  export type SchoolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School findFirst
   */
  export type SchoolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schools.
     */
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School findFirstOrThrow
   */
  export type SchoolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schools.
     */
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School findMany
   */
  export type SchoolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which Schools to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School create
   */
  export type SchoolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The data needed to create a School.
     */
    data: XOR<SchoolCreateInput, SchoolUncheckedCreateInput>
  }

  /**
   * School createMany
   */
  export type SchoolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schools.
     */
    data: SchoolCreateManyInput | SchoolCreateManyInput[]
  }

  /**
   * School createManyAndReturn
   */
  export type SchoolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Schools.
     */
    data: SchoolCreateManyInput | SchoolCreateManyInput[]
  }

  /**
   * School update
   */
  export type SchoolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The data needed to update a School.
     */
    data: XOR<SchoolUpdateInput, SchoolUncheckedUpdateInput>
    /**
     * Choose, which School to update.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School updateMany
   */
  export type SchoolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schools.
     */
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyInput>
    /**
     * Filter which Schools to update
     */
    where?: SchoolWhereInput
  }

  /**
   * School upsert
   */
  export type SchoolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The filter to search for the School to update in case it exists.
     */
    where: SchoolWhereUniqueInput
    /**
     * In case the School found by the `where` argument doesn't exist, create a new School with this data.
     */
    create: XOR<SchoolCreateInput, SchoolUncheckedCreateInput>
    /**
     * In case the School was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SchoolUpdateInput, SchoolUncheckedUpdateInput>
  }

  /**
   * School delete
   */
  export type SchoolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter which School to delete.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School deleteMany
   */
  export type SchoolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schools to delete
     */
    where?: SchoolWhereInput
  }

  /**
   * School.ServiceStatus
   */
  export type School$ServiceStatusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceStatus
     */
    select?: ServiceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceStatusInclude<ExtArgs> | null
    where?: ServiceStatusWhereInput
  }

  /**
   * School.Memberships
   */
  export type School$MembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    cursor?: MembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * School.AuditLogs
   */
  export type School$AuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * School without action
   */
  export type SchoolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
  }


  /**
   * Model ServiceStatus
   */

  export type AggregateServiceStatus = {
    _count: ServiceStatusCountAggregateOutputType | null
    _min: ServiceStatusMinAggregateOutputType | null
    _max: ServiceStatusMaxAggregateOutputType | null
  }

  export type ServiceStatusMinAggregateOutputType = {
    schoolId: string | null
    serviceStatus: string | null
    reasonCode: string | null
    reasonText: string | null
    updatedAt: Date | null
  }

  export type ServiceStatusMaxAggregateOutputType = {
    schoolId: string | null
    serviceStatus: string | null
    reasonCode: string | null
    reasonText: string | null
    updatedAt: Date | null
  }

  export type ServiceStatusCountAggregateOutputType = {
    schoolId: number
    serviceStatus: number
    reasonCode: number
    reasonText: number
    updatedAt: number
    _all: number
  }


  export type ServiceStatusMinAggregateInputType = {
    schoolId?: true
    serviceStatus?: true
    reasonCode?: true
    reasonText?: true
    updatedAt?: true
  }

  export type ServiceStatusMaxAggregateInputType = {
    schoolId?: true
    serviceStatus?: true
    reasonCode?: true
    reasonText?: true
    updatedAt?: true
  }

  export type ServiceStatusCountAggregateInputType = {
    schoolId?: true
    serviceStatus?: true
    reasonCode?: true
    reasonText?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceStatus to aggregate.
     */
    where?: ServiceStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceStatuses to fetch.
     */
    orderBy?: ServiceStatusOrderByWithRelationInput | ServiceStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceStatuses
    **/
    _count?: true | ServiceStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceStatusMaxAggregateInputType
  }

  export type GetServiceStatusAggregateType<T extends ServiceStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceStatus[P]>
      : GetScalarType<T[P], AggregateServiceStatus[P]>
  }




  export type ServiceStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceStatusWhereInput
    orderBy?: ServiceStatusOrderByWithAggregationInput | ServiceStatusOrderByWithAggregationInput[]
    by: ServiceStatusScalarFieldEnum[] | ServiceStatusScalarFieldEnum
    having?: ServiceStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceStatusCountAggregateInputType | true
    _min?: ServiceStatusMinAggregateInputType
    _max?: ServiceStatusMaxAggregateInputType
  }

  export type ServiceStatusGroupByOutputType = {
    schoolId: string
    serviceStatus: string
    reasonCode: string | null
    reasonText: string | null
    updatedAt: Date
    _count: ServiceStatusCountAggregateOutputType | null
    _min: ServiceStatusMinAggregateOutputType | null
    _max: ServiceStatusMaxAggregateOutputType | null
  }

  type GetServiceStatusGroupByPayload<T extends ServiceStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceStatusGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceStatusGroupByOutputType[P]>
        }
      >
    >


  export type ServiceStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    schoolId?: boolean
    serviceStatus?: boolean
    reasonCode?: boolean
    reasonText?: boolean
    updatedAt?: boolean
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceStatus"]>

  export type ServiceStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    schoolId?: boolean
    serviceStatus?: boolean
    reasonCode?: boolean
    reasonText?: boolean
    updatedAt?: boolean
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceStatus"]>

  export type ServiceStatusSelectScalar = {
    schoolId?: boolean
    serviceStatus?: boolean
    reasonCode?: boolean
    reasonText?: boolean
    updatedAt?: boolean
  }

  export type ServiceStatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type ServiceStatusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }

  export type $ServiceStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceStatus"
    objects: {
      School: Prisma.$SchoolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      schoolId: string
      serviceStatus: string
      reasonCode: string | null
      reasonText: string | null
      updatedAt: Date
    }, ExtArgs["result"]["serviceStatus"]>
    composites: {}
  }

  type ServiceStatusGetPayload<S extends boolean | null | undefined | ServiceStatusDefaultArgs> = $Result.GetResult<Prisma.$ServiceStatusPayload, S>

  type ServiceStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ServiceStatusFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ServiceStatusCountAggregateInputType | true
    }

  export interface ServiceStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceStatus'], meta: { name: 'ServiceStatus' } }
    /**
     * Find zero or one ServiceStatus that matches the filter.
     * @param {ServiceStatusFindUniqueArgs} args - Arguments to find a ServiceStatus
     * @example
     * // Get one ServiceStatus
     * const serviceStatus = await prisma.serviceStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceStatusFindUniqueArgs>(args: SelectSubset<T, ServiceStatusFindUniqueArgs<ExtArgs>>): Prisma__ServiceStatusClient<$Result.GetResult<Prisma.$ServiceStatusPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ServiceStatus that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ServiceStatusFindUniqueOrThrowArgs} args - Arguments to find a ServiceStatus
     * @example
     * // Get one ServiceStatus
     * const serviceStatus = await prisma.serviceStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceStatusClient<$Result.GetResult<Prisma.$ServiceStatusPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ServiceStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceStatusFindFirstArgs} args - Arguments to find a ServiceStatus
     * @example
     * // Get one ServiceStatus
     * const serviceStatus = await prisma.serviceStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceStatusFindFirstArgs>(args?: SelectSubset<T, ServiceStatusFindFirstArgs<ExtArgs>>): Prisma__ServiceStatusClient<$Result.GetResult<Prisma.$ServiceStatusPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ServiceStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceStatusFindFirstOrThrowArgs} args - Arguments to find a ServiceStatus
     * @example
     * // Get one ServiceStatus
     * const serviceStatus = await prisma.serviceStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceStatusClient<$Result.GetResult<Prisma.$ServiceStatusPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ServiceStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceStatuses
     * const serviceStatuses = await prisma.serviceStatus.findMany()
     * 
     * // Get first 10 ServiceStatuses
     * const serviceStatuses = await prisma.serviceStatus.findMany({ take: 10 })
     * 
     * // Only select the `schoolId`
     * const serviceStatusWithSchoolIdOnly = await prisma.serviceStatus.findMany({ select: { schoolId: true } })
     * 
     */
    findMany<T extends ServiceStatusFindManyArgs>(args?: SelectSubset<T, ServiceStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceStatusPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ServiceStatus.
     * @param {ServiceStatusCreateArgs} args - Arguments to create a ServiceStatus.
     * @example
     * // Create one ServiceStatus
     * const ServiceStatus = await prisma.serviceStatus.create({
     *   data: {
     *     // ... data to create a ServiceStatus
     *   }
     * })
     * 
     */
    create<T extends ServiceStatusCreateArgs>(args: SelectSubset<T, ServiceStatusCreateArgs<ExtArgs>>): Prisma__ServiceStatusClient<$Result.GetResult<Prisma.$ServiceStatusPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ServiceStatuses.
     * @param {ServiceStatusCreateManyArgs} args - Arguments to create many ServiceStatuses.
     * @example
     * // Create many ServiceStatuses
     * const serviceStatus = await prisma.serviceStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceStatusCreateManyArgs>(args?: SelectSubset<T, ServiceStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceStatuses and returns the data saved in the database.
     * @param {ServiceStatusCreateManyAndReturnArgs} args - Arguments to create many ServiceStatuses.
     * @example
     * // Create many ServiceStatuses
     * const serviceStatus = await prisma.serviceStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceStatuses and only return the `schoolId`
     * const serviceStatusWithSchoolIdOnly = await prisma.serviceStatus.createManyAndReturn({ 
     *   select: { schoolId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceStatusPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ServiceStatus.
     * @param {ServiceStatusDeleteArgs} args - Arguments to delete one ServiceStatus.
     * @example
     * // Delete one ServiceStatus
     * const ServiceStatus = await prisma.serviceStatus.delete({
     *   where: {
     *     // ... filter to delete one ServiceStatus
     *   }
     * })
     * 
     */
    delete<T extends ServiceStatusDeleteArgs>(args: SelectSubset<T, ServiceStatusDeleteArgs<ExtArgs>>): Prisma__ServiceStatusClient<$Result.GetResult<Prisma.$ServiceStatusPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ServiceStatus.
     * @param {ServiceStatusUpdateArgs} args - Arguments to update one ServiceStatus.
     * @example
     * // Update one ServiceStatus
     * const serviceStatus = await prisma.serviceStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceStatusUpdateArgs>(args: SelectSubset<T, ServiceStatusUpdateArgs<ExtArgs>>): Prisma__ServiceStatusClient<$Result.GetResult<Prisma.$ServiceStatusPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ServiceStatuses.
     * @param {ServiceStatusDeleteManyArgs} args - Arguments to filter ServiceStatuses to delete.
     * @example
     * // Delete a few ServiceStatuses
     * const { count } = await prisma.serviceStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceStatusDeleteManyArgs>(args?: SelectSubset<T, ServiceStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceStatuses
     * const serviceStatus = await prisma.serviceStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceStatusUpdateManyArgs>(args: SelectSubset<T, ServiceStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ServiceStatus.
     * @param {ServiceStatusUpsertArgs} args - Arguments to update or create a ServiceStatus.
     * @example
     * // Update or create a ServiceStatus
     * const serviceStatus = await prisma.serviceStatus.upsert({
     *   create: {
     *     // ... data to create a ServiceStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceStatus we want to update
     *   }
     * })
     */
    upsert<T extends ServiceStatusUpsertArgs>(args: SelectSubset<T, ServiceStatusUpsertArgs<ExtArgs>>): Prisma__ServiceStatusClient<$Result.GetResult<Prisma.$ServiceStatusPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ServiceStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceStatusCountArgs} args - Arguments to filter ServiceStatuses to count.
     * @example
     * // Count the number of ServiceStatuses
     * const count = await prisma.serviceStatus.count({
     *   where: {
     *     // ... the filter for the ServiceStatuses we want to count
     *   }
     * })
    **/
    count<T extends ServiceStatusCountArgs>(
      args?: Subset<T, ServiceStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceStatusAggregateArgs>(args: Subset<T, ServiceStatusAggregateArgs>): Prisma.PrismaPromise<GetServiceStatusAggregateType<T>>

    /**
     * Group by ServiceStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceStatusGroupByArgs['orderBy'] }
        : { orderBy?: ServiceStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceStatus model
   */
  readonly fields: ServiceStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    School<T extends SchoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolDefaultArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServiceStatus model
   */ 
  interface ServiceStatusFieldRefs {
    readonly schoolId: FieldRef<"ServiceStatus", 'String'>
    readonly serviceStatus: FieldRef<"ServiceStatus", 'String'>
    readonly reasonCode: FieldRef<"ServiceStatus", 'String'>
    readonly reasonText: FieldRef<"ServiceStatus", 'String'>
    readonly updatedAt: FieldRef<"ServiceStatus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceStatus findUnique
   */
  export type ServiceStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceStatus
     */
    select?: ServiceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceStatusInclude<ExtArgs> | null
    /**
     * Filter, which ServiceStatus to fetch.
     */
    where: ServiceStatusWhereUniqueInput
  }

  /**
   * ServiceStatus findUniqueOrThrow
   */
  export type ServiceStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceStatus
     */
    select?: ServiceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceStatusInclude<ExtArgs> | null
    /**
     * Filter, which ServiceStatus to fetch.
     */
    where: ServiceStatusWhereUniqueInput
  }

  /**
   * ServiceStatus findFirst
   */
  export type ServiceStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceStatus
     */
    select?: ServiceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceStatusInclude<ExtArgs> | null
    /**
     * Filter, which ServiceStatus to fetch.
     */
    where?: ServiceStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceStatuses to fetch.
     */
    orderBy?: ServiceStatusOrderByWithRelationInput | ServiceStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceStatuses.
     */
    cursor?: ServiceStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceStatuses.
     */
    distinct?: ServiceStatusScalarFieldEnum | ServiceStatusScalarFieldEnum[]
  }

  /**
   * ServiceStatus findFirstOrThrow
   */
  export type ServiceStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceStatus
     */
    select?: ServiceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceStatusInclude<ExtArgs> | null
    /**
     * Filter, which ServiceStatus to fetch.
     */
    where?: ServiceStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceStatuses to fetch.
     */
    orderBy?: ServiceStatusOrderByWithRelationInput | ServiceStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceStatuses.
     */
    cursor?: ServiceStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceStatuses.
     */
    distinct?: ServiceStatusScalarFieldEnum | ServiceStatusScalarFieldEnum[]
  }

  /**
   * ServiceStatus findMany
   */
  export type ServiceStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceStatus
     */
    select?: ServiceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceStatusInclude<ExtArgs> | null
    /**
     * Filter, which ServiceStatuses to fetch.
     */
    where?: ServiceStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceStatuses to fetch.
     */
    orderBy?: ServiceStatusOrderByWithRelationInput | ServiceStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceStatuses.
     */
    cursor?: ServiceStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceStatuses.
     */
    skip?: number
    distinct?: ServiceStatusScalarFieldEnum | ServiceStatusScalarFieldEnum[]
  }

  /**
   * ServiceStatus create
   */
  export type ServiceStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceStatus
     */
    select?: ServiceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceStatusInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceStatus.
     */
    data: XOR<ServiceStatusCreateInput, ServiceStatusUncheckedCreateInput>
  }

  /**
   * ServiceStatus createMany
   */
  export type ServiceStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceStatuses.
     */
    data: ServiceStatusCreateManyInput | ServiceStatusCreateManyInput[]
  }

  /**
   * ServiceStatus createManyAndReturn
   */
  export type ServiceStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceStatus
     */
    select?: ServiceStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ServiceStatuses.
     */
    data: ServiceStatusCreateManyInput | ServiceStatusCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceStatusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceStatus update
   */
  export type ServiceStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceStatus
     */
    select?: ServiceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceStatusInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceStatus.
     */
    data: XOR<ServiceStatusUpdateInput, ServiceStatusUncheckedUpdateInput>
    /**
     * Choose, which ServiceStatus to update.
     */
    where: ServiceStatusWhereUniqueInput
  }

  /**
   * ServiceStatus updateMany
   */
  export type ServiceStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceStatuses.
     */
    data: XOR<ServiceStatusUpdateManyMutationInput, ServiceStatusUncheckedUpdateManyInput>
    /**
     * Filter which ServiceStatuses to update
     */
    where?: ServiceStatusWhereInput
  }

  /**
   * ServiceStatus upsert
   */
  export type ServiceStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceStatus
     */
    select?: ServiceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceStatusInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceStatus to update in case it exists.
     */
    where: ServiceStatusWhereUniqueInput
    /**
     * In case the ServiceStatus found by the `where` argument doesn't exist, create a new ServiceStatus with this data.
     */
    create: XOR<ServiceStatusCreateInput, ServiceStatusUncheckedCreateInput>
    /**
     * In case the ServiceStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceStatusUpdateInput, ServiceStatusUncheckedUpdateInput>
  }

  /**
   * ServiceStatus delete
   */
  export type ServiceStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceStatus
     */
    select?: ServiceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceStatusInclude<ExtArgs> | null
    /**
     * Filter which ServiceStatus to delete.
     */
    where: ServiceStatusWhereUniqueInput
  }

  /**
   * ServiceStatus deleteMany
   */
  export type ServiceStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceStatuses to delete
     */
    where?: ServiceStatusWhereInput
  }

  /**
   * ServiceStatus without action
   */
  export type ServiceStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceStatus
     */
    select?: ServiceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceStatusInclude<ExtArgs> | null
  }


  /**
   * Model Membership
   */

  export type AggregateMembership = {
    _count: MembershipCountAggregateOutputType | null
    _min: MembershipMinAggregateOutputType | null
    _max: MembershipMaxAggregateOutputType | null
  }

  export type MembershipMinAggregateOutputType = {
    membershipId: string | null
    userId: string | null
    identityId: string | null
    schoolId: string | null
    role: string | null
    status: string | null
  }

  export type MembershipMaxAggregateOutputType = {
    membershipId: string | null
    userId: string | null
    identityId: string | null
    schoolId: string | null
    role: string | null
    status: string | null
  }

  export type MembershipCountAggregateOutputType = {
    membershipId: number
    userId: number
    identityId: number
    schoolId: number
    role: number
    status: number
    _all: number
  }


  export type MembershipMinAggregateInputType = {
    membershipId?: true
    userId?: true
    identityId?: true
    schoolId?: true
    role?: true
    status?: true
  }

  export type MembershipMaxAggregateInputType = {
    membershipId?: true
    userId?: true
    identityId?: true
    schoolId?: true
    role?: true
    status?: true
  }

  export type MembershipCountAggregateInputType = {
    membershipId?: true
    userId?: true
    identityId?: true
    schoolId?: true
    role?: true
    status?: true
    _all?: true
  }

  export type MembershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Membership to aggregate.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Memberships
    **/
    _count?: true | MembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MembershipMaxAggregateInputType
  }

  export type GetMembershipAggregateType<T extends MembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMembership[P]>
      : GetScalarType<T[P], AggregateMembership[P]>
  }




  export type MembershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithAggregationInput | MembershipOrderByWithAggregationInput[]
    by: MembershipScalarFieldEnum[] | MembershipScalarFieldEnum
    having?: MembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MembershipCountAggregateInputType | true
    _min?: MembershipMinAggregateInputType
    _max?: MembershipMaxAggregateInputType
  }

  export type MembershipGroupByOutputType = {
    membershipId: string
    userId: string
    identityId: string
    schoolId: string
    role: string
    status: string
    _count: MembershipCountAggregateOutputType | null
    _min: MembershipMinAggregateOutputType | null
    _max: MembershipMaxAggregateOutputType | null
  }

  type GetMembershipGroupByPayload<T extends MembershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MembershipGroupByOutputType[P]>
            : GetScalarType<T[P], MembershipGroupByOutputType[P]>
        }
      >
    >


  export type MembershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    membershipId?: boolean
    userId?: boolean
    identityId?: boolean
    schoolId?: boolean
    role?: boolean
    status?: boolean
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membership"]>

  export type MembershipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    membershipId?: boolean
    userId?: boolean
    identityId?: boolean
    schoolId?: boolean
    role?: boolean
    status?: boolean
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membership"]>

  export type MembershipSelectScalar = {
    membershipId?: boolean
    userId?: boolean
    identityId?: boolean
    schoolId?: boolean
    role?: boolean
    status?: boolean
  }

  export type MembershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type MembershipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }

  export type $MembershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Membership"
    objects: {
      School: Prisma.$SchoolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      membershipId: string
      userId: string
      identityId: string
      schoolId: string
      role: string
      status: string
    }, ExtArgs["result"]["membership"]>
    composites: {}
  }

  type MembershipGetPayload<S extends boolean | null | undefined | MembershipDefaultArgs> = $Result.GetResult<Prisma.$MembershipPayload, S>

  type MembershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MembershipFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MembershipCountAggregateInputType | true
    }

  export interface MembershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Membership'], meta: { name: 'Membership' } }
    /**
     * Find zero or one Membership that matches the filter.
     * @param {MembershipFindUniqueArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MembershipFindUniqueArgs>(args: SelectSubset<T, MembershipFindUniqueArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Membership that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MembershipFindUniqueOrThrowArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MembershipFindUniqueOrThrowArgs>(args: SelectSubset<T, MembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Membership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindFirstArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MembershipFindFirstArgs>(args?: SelectSubset<T, MembershipFindFirstArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Membership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindFirstOrThrowArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MembershipFindFirstOrThrowArgs>(args?: SelectSubset<T, MembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Memberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Memberships
     * const memberships = await prisma.membership.findMany()
     * 
     * // Get first 10 Memberships
     * const memberships = await prisma.membership.findMany({ take: 10 })
     * 
     * // Only select the `membershipId`
     * const membershipWithMembershipIdOnly = await prisma.membership.findMany({ select: { membershipId: true } })
     * 
     */
    findMany<T extends MembershipFindManyArgs>(args?: SelectSubset<T, MembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Membership.
     * @param {MembershipCreateArgs} args - Arguments to create a Membership.
     * @example
     * // Create one Membership
     * const Membership = await prisma.membership.create({
     *   data: {
     *     // ... data to create a Membership
     *   }
     * })
     * 
     */
    create<T extends MembershipCreateArgs>(args: SelectSubset<T, MembershipCreateArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Memberships.
     * @param {MembershipCreateManyArgs} args - Arguments to create many Memberships.
     * @example
     * // Create many Memberships
     * const membership = await prisma.membership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MembershipCreateManyArgs>(args?: SelectSubset<T, MembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Memberships and returns the data saved in the database.
     * @param {MembershipCreateManyAndReturnArgs} args - Arguments to create many Memberships.
     * @example
     * // Create many Memberships
     * const membership = await prisma.membership.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Memberships and only return the `membershipId`
     * const membershipWithMembershipIdOnly = await prisma.membership.createManyAndReturn({ 
     *   select: { membershipId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MembershipCreateManyAndReturnArgs>(args?: SelectSubset<T, MembershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Membership.
     * @param {MembershipDeleteArgs} args - Arguments to delete one Membership.
     * @example
     * // Delete one Membership
     * const Membership = await prisma.membership.delete({
     *   where: {
     *     // ... filter to delete one Membership
     *   }
     * })
     * 
     */
    delete<T extends MembershipDeleteArgs>(args: SelectSubset<T, MembershipDeleteArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Membership.
     * @param {MembershipUpdateArgs} args - Arguments to update one Membership.
     * @example
     * // Update one Membership
     * const membership = await prisma.membership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MembershipUpdateArgs>(args: SelectSubset<T, MembershipUpdateArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Memberships.
     * @param {MembershipDeleteManyArgs} args - Arguments to filter Memberships to delete.
     * @example
     * // Delete a few Memberships
     * const { count } = await prisma.membership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MembershipDeleteManyArgs>(args?: SelectSubset<T, MembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Memberships
     * const membership = await prisma.membership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MembershipUpdateManyArgs>(args: SelectSubset<T, MembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Membership.
     * @param {MembershipUpsertArgs} args - Arguments to update or create a Membership.
     * @example
     * // Update or create a Membership
     * const membership = await prisma.membership.upsert({
     *   create: {
     *     // ... data to create a Membership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Membership we want to update
     *   }
     * })
     */
    upsert<T extends MembershipUpsertArgs>(args: SelectSubset<T, MembershipUpsertArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Memberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipCountArgs} args - Arguments to filter Memberships to count.
     * @example
     * // Count the number of Memberships
     * const count = await prisma.membership.count({
     *   where: {
     *     // ... the filter for the Memberships we want to count
     *   }
     * })
    **/
    count<T extends MembershipCountArgs>(
      args?: Subset<T, MembershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Membership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MembershipAggregateArgs>(args: Subset<T, MembershipAggregateArgs>): Prisma.PrismaPromise<GetMembershipAggregateType<T>>

    /**
     * Group by Membership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MembershipGroupByArgs['orderBy'] }
        : { orderBy?: MembershipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Membership model
   */
  readonly fields: MembershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Membership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MembershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    School<T extends SchoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolDefaultArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Membership model
   */ 
  interface MembershipFieldRefs {
    readonly membershipId: FieldRef<"Membership", 'String'>
    readonly userId: FieldRef<"Membership", 'String'>
    readonly identityId: FieldRef<"Membership", 'String'>
    readonly schoolId: FieldRef<"Membership", 'String'>
    readonly role: FieldRef<"Membership", 'String'>
    readonly status: FieldRef<"Membership", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Membership findUnique
   */
  export type MembershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership findUniqueOrThrow
   */
  export type MembershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership findFirst
   */
  export type MembershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memberships.
     */
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership findFirstOrThrow
   */
  export type MembershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memberships.
     */
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership findMany
   */
  export type MembershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Memberships to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership create
   */
  export type MembershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The data needed to create a Membership.
     */
    data: XOR<MembershipCreateInput, MembershipUncheckedCreateInput>
  }

  /**
   * Membership createMany
   */
  export type MembershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Memberships.
     */
    data: MembershipCreateManyInput | MembershipCreateManyInput[]
  }

  /**
   * Membership createManyAndReturn
   */
  export type MembershipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Memberships.
     */
    data: MembershipCreateManyInput | MembershipCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Membership update
   */
  export type MembershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The data needed to update a Membership.
     */
    data: XOR<MembershipUpdateInput, MembershipUncheckedUpdateInput>
    /**
     * Choose, which Membership to update.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership updateMany
   */
  export type MembershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Memberships.
     */
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyInput>
    /**
     * Filter which Memberships to update
     */
    where?: MembershipWhereInput
  }

  /**
   * Membership upsert
   */
  export type MembershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The filter to search for the Membership to update in case it exists.
     */
    where: MembershipWhereUniqueInput
    /**
     * In case the Membership found by the `where` argument doesn't exist, create a new Membership with this data.
     */
    create: XOR<MembershipCreateInput, MembershipUncheckedCreateInput>
    /**
     * In case the Membership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MembershipUpdateInput, MembershipUncheckedUpdateInput>
  }

  /**
   * Membership delete
   */
  export type MembershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter which Membership to delete.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership deleteMany
   */
  export type MembershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Memberships to delete
     */
    where?: MembershipWhereInput
  }

  /**
   * Membership without action
   */
  export type MembershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    auditLogId: string | null
    schoolId: string | null
    actorUserId: string | null
    action: string | null
    targetType: string | null
    targetId: string | null
    payload: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    auditLogId: string | null
    schoolId: string | null
    actorUserId: string | null
    action: string | null
    targetType: string | null
    targetId: string | null
    payload: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    auditLogId: number
    schoolId: number
    actorUserId: number
    action: number
    targetType: number
    targetId: number
    payload: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    auditLogId?: true
    schoolId?: true
    actorUserId?: true
    action?: true
    targetType?: true
    targetId?: true
    payload?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    auditLogId?: true
    schoolId?: true
    actorUserId?: true
    action?: true
    targetType?: true
    targetId?: true
    payload?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    auditLogId?: true
    schoolId?: true
    actorUserId?: true
    action?: true
    targetType?: true
    targetId?: true
    payload?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    auditLogId: string
    schoolId: string
    actorUserId: string
    action: string
    targetType: string
    targetId: string
    payload: string
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    auditLogId?: boolean
    schoolId?: boolean
    actorUserId?: boolean
    action?: boolean
    targetType?: boolean
    targetId?: boolean
    payload?: boolean
    createdAt?: boolean
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    auditLogId?: boolean
    schoolId?: boolean
    actorUserId?: boolean
    action?: boolean
    targetType?: boolean
    targetId?: boolean
    payload?: boolean
    createdAt?: boolean
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    auditLogId?: boolean
    schoolId?: boolean
    actorUserId?: boolean
    action?: boolean
    targetType?: boolean
    targetId?: boolean
    payload?: boolean
    createdAt?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      School: Prisma.$SchoolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      auditLogId: string
      schoolId: string
      actorUserId: string
      action: string
      targetType: string
      targetId: string
      payload: string
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `auditLogId`
     * const auditLogWithAuditLogIdOnly = await prisma.auditLog.findMany({ select: { auditLogId: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `auditLogId`
     * const auditLogWithAuditLogIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { auditLogId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    School<T extends SchoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolDefaultArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly auditLogId: FieldRef<"AuditLog", 'String'>
    readonly schoolId: FieldRef<"AuditLog", 'String'>
    readonly actorUserId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly targetType: FieldRef<"AuditLog", 'String'>
    readonly targetId: FieldRef<"AuditLog", 'String'>
    readonly payload: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model IdentityAccount
   */

  export type AggregateIdentityAccount = {
    _count: IdentityAccountCountAggregateOutputType | null
    _min: IdentityAccountMinAggregateOutputType | null
    _max: IdentityAccountMaxAggregateOutputType | null
  }

  export type IdentityAccountMinAggregateOutputType = {
    identityId: string | null
    provider: string | null
    idToken: string | null
    userId: string | null
  }

  export type IdentityAccountMaxAggregateOutputType = {
    identityId: string | null
    provider: string | null
    idToken: string | null
    userId: string | null
  }

  export type IdentityAccountCountAggregateOutputType = {
    identityId: number
    provider: number
    idToken: number
    userId: number
    _all: number
  }


  export type IdentityAccountMinAggregateInputType = {
    identityId?: true
    provider?: true
    idToken?: true
    userId?: true
  }

  export type IdentityAccountMaxAggregateInputType = {
    identityId?: true
    provider?: true
    idToken?: true
    userId?: true
  }

  export type IdentityAccountCountAggregateInputType = {
    identityId?: true
    provider?: true
    idToken?: true
    userId?: true
    _all?: true
  }

  export type IdentityAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IdentityAccount to aggregate.
     */
    where?: IdentityAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IdentityAccounts to fetch.
     */
    orderBy?: IdentityAccountOrderByWithRelationInput | IdentityAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IdentityAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IdentityAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IdentityAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IdentityAccounts
    **/
    _count?: true | IdentityAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IdentityAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IdentityAccountMaxAggregateInputType
  }

  export type GetIdentityAccountAggregateType<T extends IdentityAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateIdentityAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIdentityAccount[P]>
      : GetScalarType<T[P], AggregateIdentityAccount[P]>
  }




  export type IdentityAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IdentityAccountWhereInput
    orderBy?: IdentityAccountOrderByWithAggregationInput | IdentityAccountOrderByWithAggregationInput[]
    by: IdentityAccountScalarFieldEnum[] | IdentityAccountScalarFieldEnum
    having?: IdentityAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IdentityAccountCountAggregateInputType | true
    _min?: IdentityAccountMinAggregateInputType
    _max?: IdentityAccountMaxAggregateInputType
  }

  export type IdentityAccountGroupByOutputType = {
    identityId: string
    provider: string
    idToken: string
    userId: string
    _count: IdentityAccountCountAggregateOutputType | null
    _min: IdentityAccountMinAggregateOutputType | null
    _max: IdentityAccountMaxAggregateOutputType | null
  }

  type GetIdentityAccountGroupByPayload<T extends IdentityAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IdentityAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IdentityAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IdentityAccountGroupByOutputType[P]>
            : GetScalarType<T[P], IdentityAccountGroupByOutputType[P]>
        }
      >
    >


  export type IdentityAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identityId?: boolean
    provider?: boolean
    idToken?: boolean
    userId?: boolean
  }, ExtArgs["result"]["identityAccount"]>

  export type IdentityAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identityId?: boolean
    provider?: boolean
    idToken?: boolean
    userId?: boolean
  }, ExtArgs["result"]["identityAccount"]>

  export type IdentityAccountSelectScalar = {
    identityId?: boolean
    provider?: boolean
    idToken?: boolean
    userId?: boolean
  }


  export type $IdentityAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IdentityAccount"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identityId: string
      provider: string
      idToken: string
      userId: string
    }, ExtArgs["result"]["identityAccount"]>
    composites: {}
  }

  type IdentityAccountGetPayload<S extends boolean | null | undefined | IdentityAccountDefaultArgs> = $Result.GetResult<Prisma.$IdentityAccountPayload, S>

  type IdentityAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<IdentityAccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: IdentityAccountCountAggregateInputType | true
    }

  export interface IdentityAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IdentityAccount'], meta: { name: 'IdentityAccount' } }
    /**
     * Find zero or one IdentityAccount that matches the filter.
     * @param {IdentityAccountFindUniqueArgs} args - Arguments to find a IdentityAccount
     * @example
     * // Get one IdentityAccount
     * const identityAccount = await prisma.identityAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IdentityAccountFindUniqueArgs>(args: SelectSubset<T, IdentityAccountFindUniqueArgs<ExtArgs>>): Prisma__IdentityAccountClient<$Result.GetResult<Prisma.$IdentityAccountPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one IdentityAccount that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {IdentityAccountFindUniqueOrThrowArgs} args - Arguments to find a IdentityAccount
     * @example
     * // Get one IdentityAccount
     * const identityAccount = await prisma.identityAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IdentityAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, IdentityAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IdentityAccountClient<$Result.GetResult<Prisma.$IdentityAccountPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first IdentityAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdentityAccountFindFirstArgs} args - Arguments to find a IdentityAccount
     * @example
     * // Get one IdentityAccount
     * const identityAccount = await prisma.identityAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IdentityAccountFindFirstArgs>(args?: SelectSubset<T, IdentityAccountFindFirstArgs<ExtArgs>>): Prisma__IdentityAccountClient<$Result.GetResult<Prisma.$IdentityAccountPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first IdentityAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdentityAccountFindFirstOrThrowArgs} args - Arguments to find a IdentityAccount
     * @example
     * // Get one IdentityAccount
     * const identityAccount = await prisma.identityAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IdentityAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, IdentityAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__IdentityAccountClient<$Result.GetResult<Prisma.$IdentityAccountPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more IdentityAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdentityAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IdentityAccounts
     * const identityAccounts = await prisma.identityAccount.findMany()
     * 
     * // Get first 10 IdentityAccounts
     * const identityAccounts = await prisma.identityAccount.findMany({ take: 10 })
     * 
     * // Only select the `identityId`
     * const identityAccountWithIdentityIdOnly = await prisma.identityAccount.findMany({ select: { identityId: true } })
     * 
     */
    findMany<T extends IdentityAccountFindManyArgs>(args?: SelectSubset<T, IdentityAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IdentityAccountPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a IdentityAccount.
     * @param {IdentityAccountCreateArgs} args - Arguments to create a IdentityAccount.
     * @example
     * // Create one IdentityAccount
     * const IdentityAccount = await prisma.identityAccount.create({
     *   data: {
     *     // ... data to create a IdentityAccount
     *   }
     * })
     * 
     */
    create<T extends IdentityAccountCreateArgs>(args: SelectSubset<T, IdentityAccountCreateArgs<ExtArgs>>): Prisma__IdentityAccountClient<$Result.GetResult<Prisma.$IdentityAccountPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many IdentityAccounts.
     * @param {IdentityAccountCreateManyArgs} args - Arguments to create many IdentityAccounts.
     * @example
     * // Create many IdentityAccounts
     * const identityAccount = await prisma.identityAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IdentityAccountCreateManyArgs>(args?: SelectSubset<T, IdentityAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IdentityAccounts and returns the data saved in the database.
     * @param {IdentityAccountCreateManyAndReturnArgs} args - Arguments to create many IdentityAccounts.
     * @example
     * // Create many IdentityAccounts
     * const identityAccount = await prisma.identityAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IdentityAccounts and only return the `identityId`
     * const identityAccountWithIdentityIdOnly = await prisma.identityAccount.createManyAndReturn({ 
     *   select: { identityId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IdentityAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, IdentityAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IdentityAccountPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a IdentityAccount.
     * @param {IdentityAccountDeleteArgs} args - Arguments to delete one IdentityAccount.
     * @example
     * // Delete one IdentityAccount
     * const IdentityAccount = await prisma.identityAccount.delete({
     *   where: {
     *     // ... filter to delete one IdentityAccount
     *   }
     * })
     * 
     */
    delete<T extends IdentityAccountDeleteArgs>(args: SelectSubset<T, IdentityAccountDeleteArgs<ExtArgs>>): Prisma__IdentityAccountClient<$Result.GetResult<Prisma.$IdentityAccountPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one IdentityAccount.
     * @param {IdentityAccountUpdateArgs} args - Arguments to update one IdentityAccount.
     * @example
     * // Update one IdentityAccount
     * const identityAccount = await prisma.identityAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IdentityAccountUpdateArgs>(args: SelectSubset<T, IdentityAccountUpdateArgs<ExtArgs>>): Prisma__IdentityAccountClient<$Result.GetResult<Prisma.$IdentityAccountPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more IdentityAccounts.
     * @param {IdentityAccountDeleteManyArgs} args - Arguments to filter IdentityAccounts to delete.
     * @example
     * // Delete a few IdentityAccounts
     * const { count } = await prisma.identityAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IdentityAccountDeleteManyArgs>(args?: SelectSubset<T, IdentityAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IdentityAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdentityAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IdentityAccounts
     * const identityAccount = await prisma.identityAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IdentityAccountUpdateManyArgs>(args: SelectSubset<T, IdentityAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one IdentityAccount.
     * @param {IdentityAccountUpsertArgs} args - Arguments to update or create a IdentityAccount.
     * @example
     * // Update or create a IdentityAccount
     * const identityAccount = await prisma.identityAccount.upsert({
     *   create: {
     *     // ... data to create a IdentityAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IdentityAccount we want to update
     *   }
     * })
     */
    upsert<T extends IdentityAccountUpsertArgs>(args: SelectSubset<T, IdentityAccountUpsertArgs<ExtArgs>>): Prisma__IdentityAccountClient<$Result.GetResult<Prisma.$IdentityAccountPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of IdentityAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdentityAccountCountArgs} args - Arguments to filter IdentityAccounts to count.
     * @example
     * // Count the number of IdentityAccounts
     * const count = await prisma.identityAccount.count({
     *   where: {
     *     // ... the filter for the IdentityAccounts we want to count
     *   }
     * })
    **/
    count<T extends IdentityAccountCountArgs>(
      args?: Subset<T, IdentityAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IdentityAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IdentityAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdentityAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IdentityAccountAggregateArgs>(args: Subset<T, IdentityAccountAggregateArgs>): Prisma.PrismaPromise<GetIdentityAccountAggregateType<T>>

    /**
     * Group by IdentityAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdentityAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IdentityAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IdentityAccountGroupByArgs['orderBy'] }
        : { orderBy?: IdentityAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IdentityAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdentityAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IdentityAccount model
   */
  readonly fields: IdentityAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IdentityAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IdentityAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IdentityAccount model
   */ 
  interface IdentityAccountFieldRefs {
    readonly identityId: FieldRef<"IdentityAccount", 'String'>
    readonly provider: FieldRef<"IdentityAccount", 'String'>
    readonly idToken: FieldRef<"IdentityAccount", 'String'>
    readonly userId: FieldRef<"IdentityAccount", 'String'>
  }
    

  // Custom InputTypes
  /**
   * IdentityAccount findUnique
   */
  export type IdentityAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdentityAccount
     */
    select?: IdentityAccountSelect<ExtArgs> | null
    /**
     * Filter, which IdentityAccount to fetch.
     */
    where: IdentityAccountWhereUniqueInput
  }

  /**
   * IdentityAccount findUniqueOrThrow
   */
  export type IdentityAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdentityAccount
     */
    select?: IdentityAccountSelect<ExtArgs> | null
    /**
     * Filter, which IdentityAccount to fetch.
     */
    where: IdentityAccountWhereUniqueInput
  }

  /**
   * IdentityAccount findFirst
   */
  export type IdentityAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdentityAccount
     */
    select?: IdentityAccountSelect<ExtArgs> | null
    /**
     * Filter, which IdentityAccount to fetch.
     */
    where?: IdentityAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IdentityAccounts to fetch.
     */
    orderBy?: IdentityAccountOrderByWithRelationInput | IdentityAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IdentityAccounts.
     */
    cursor?: IdentityAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IdentityAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IdentityAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IdentityAccounts.
     */
    distinct?: IdentityAccountScalarFieldEnum | IdentityAccountScalarFieldEnum[]
  }

  /**
   * IdentityAccount findFirstOrThrow
   */
  export type IdentityAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdentityAccount
     */
    select?: IdentityAccountSelect<ExtArgs> | null
    /**
     * Filter, which IdentityAccount to fetch.
     */
    where?: IdentityAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IdentityAccounts to fetch.
     */
    orderBy?: IdentityAccountOrderByWithRelationInput | IdentityAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IdentityAccounts.
     */
    cursor?: IdentityAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IdentityAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IdentityAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IdentityAccounts.
     */
    distinct?: IdentityAccountScalarFieldEnum | IdentityAccountScalarFieldEnum[]
  }

  /**
   * IdentityAccount findMany
   */
  export type IdentityAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdentityAccount
     */
    select?: IdentityAccountSelect<ExtArgs> | null
    /**
     * Filter, which IdentityAccounts to fetch.
     */
    where?: IdentityAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IdentityAccounts to fetch.
     */
    orderBy?: IdentityAccountOrderByWithRelationInput | IdentityAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IdentityAccounts.
     */
    cursor?: IdentityAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IdentityAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IdentityAccounts.
     */
    skip?: number
    distinct?: IdentityAccountScalarFieldEnum | IdentityAccountScalarFieldEnum[]
  }

  /**
   * IdentityAccount create
   */
  export type IdentityAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdentityAccount
     */
    select?: IdentityAccountSelect<ExtArgs> | null
    /**
     * The data needed to create a IdentityAccount.
     */
    data: XOR<IdentityAccountCreateInput, IdentityAccountUncheckedCreateInput>
  }

  /**
   * IdentityAccount createMany
   */
  export type IdentityAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IdentityAccounts.
     */
    data: IdentityAccountCreateManyInput | IdentityAccountCreateManyInput[]
  }

  /**
   * IdentityAccount createManyAndReturn
   */
  export type IdentityAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdentityAccount
     */
    select?: IdentityAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many IdentityAccounts.
     */
    data: IdentityAccountCreateManyInput | IdentityAccountCreateManyInput[]
  }

  /**
   * IdentityAccount update
   */
  export type IdentityAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdentityAccount
     */
    select?: IdentityAccountSelect<ExtArgs> | null
    /**
     * The data needed to update a IdentityAccount.
     */
    data: XOR<IdentityAccountUpdateInput, IdentityAccountUncheckedUpdateInput>
    /**
     * Choose, which IdentityAccount to update.
     */
    where: IdentityAccountWhereUniqueInput
  }

  /**
   * IdentityAccount updateMany
   */
  export type IdentityAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IdentityAccounts.
     */
    data: XOR<IdentityAccountUpdateManyMutationInput, IdentityAccountUncheckedUpdateManyInput>
    /**
     * Filter which IdentityAccounts to update
     */
    where?: IdentityAccountWhereInput
  }

  /**
   * IdentityAccount upsert
   */
  export type IdentityAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdentityAccount
     */
    select?: IdentityAccountSelect<ExtArgs> | null
    /**
     * The filter to search for the IdentityAccount to update in case it exists.
     */
    where: IdentityAccountWhereUniqueInput
    /**
     * In case the IdentityAccount found by the `where` argument doesn't exist, create a new IdentityAccount with this data.
     */
    create: XOR<IdentityAccountCreateInput, IdentityAccountUncheckedCreateInput>
    /**
     * In case the IdentityAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IdentityAccountUpdateInput, IdentityAccountUncheckedUpdateInput>
  }

  /**
   * IdentityAccount delete
   */
  export type IdentityAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdentityAccount
     */
    select?: IdentityAccountSelect<ExtArgs> | null
    /**
     * Filter which IdentityAccount to delete.
     */
    where: IdentityAccountWhereUniqueInput
  }

  /**
   * IdentityAccount deleteMany
   */
  export type IdentityAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IdentityAccounts to delete
     */
    where?: IdentityAccountWhereInput
  }

  /**
   * IdentityAccount without action
   */
  export type IdentityAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdentityAccount
     */
    select?: IdentityAccountSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SchoolScalarFieldEnum: {
    schoolId: 'schoolId',
    name: 'name',
    status: 'status',
    latitude: 'latitude',
    longitude: 'longitude'
  };

  export type SchoolScalarFieldEnum = (typeof SchoolScalarFieldEnum)[keyof typeof SchoolScalarFieldEnum]


  export const ServiceStatusScalarFieldEnum: {
    schoolId: 'schoolId',
    serviceStatus: 'serviceStatus',
    reasonCode: 'reasonCode',
    reasonText: 'reasonText',
    updatedAt: 'updatedAt'
  };

  export type ServiceStatusScalarFieldEnum = (typeof ServiceStatusScalarFieldEnum)[keyof typeof ServiceStatusScalarFieldEnum]


  export const MembershipScalarFieldEnum: {
    membershipId: 'membershipId',
    userId: 'userId',
    identityId: 'identityId',
    schoolId: 'schoolId',
    role: 'role',
    status: 'status'
  };

  export type MembershipScalarFieldEnum = (typeof MembershipScalarFieldEnum)[keyof typeof MembershipScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    auditLogId: 'auditLogId',
    schoolId: 'schoolId',
    actorUserId: 'actorUserId',
    action: 'action',
    targetType: 'targetType',
    targetId: 'targetId',
    payload: 'payload',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const IdentityAccountScalarFieldEnum: {
    identityId: 'identityId',
    provider: 'provider',
    idToken: 'idToken',
    userId: 'userId'
  };

  export type IdentityAccountScalarFieldEnum = (typeof IdentityAccountScalarFieldEnum)[keyof typeof IdentityAccountScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type SchoolWhereInput = {
    AND?: SchoolWhereInput | SchoolWhereInput[]
    OR?: SchoolWhereInput[]
    NOT?: SchoolWhereInput | SchoolWhereInput[]
    schoolId?: StringFilter<"School"> | string
    name?: StringFilter<"School"> | string
    status?: StringFilter<"School"> | string
    latitude?: FloatNullableFilter<"School"> | number | null
    longitude?: FloatNullableFilter<"School"> | number | null
    ServiceStatus?: XOR<ServiceStatusNullableRelationFilter, ServiceStatusWhereInput> | null
    Memberships?: MembershipListRelationFilter
    AuditLogs?: AuditLogListRelationFilter
  }

  export type SchoolOrderByWithRelationInput = {
    schoolId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    ServiceStatus?: ServiceStatusOrderByWithRelationInput
    Memberships?: MembershipOrderByRelationAggregateInput
    AuditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type SchoolWhereUniqueInput = Prisma.AtLeast<{
    schoolId?: string
    AND?: SchoolWhereInput | SchoolWhereInput[]
    OR?: SchoolWhereInput[]
    NOT?: SchoolWhereInput | SchoolWhereInput[]
    name?: StringFilter<"School"> | string
    status?: StringFilter<"School"> | string
    latitude?: FloatNullableFilter<"School"> | number | null
    longitude?: FloatNullableFilter<"School"> | number | null
    ServiceStatus?: XOR<ServiceStatusNullableRelationFilter, ServiceStatusWhereInput> | null
    Memberships?: MembershipListRelationFilter
    AuditLogs?: AuditLogListRelationFilter
  }, "schoolId">

  export type SchoolOrderByWithAggregationInput = {
    schoolId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    _count?: SchoolCountOrderByAggregateInput
    _avg?: SchoolAvgOrderByAggregateInput
    _max?: SchoolMaxOrderByAggregateInput
    _min?: SchoolMinOrderByAggregateInput
    _sum?: SchoolSumOrderByAggregateInput
  }

  export type SchoolScalarWhereWithAggregatesInput = {
    AND?: SchoolScalarWhereWithAggregatesInput | SchoolScalarWhereWithAggregatesInput[]
    OR?: SchoolScalarWhereWithAggregatesInput[]
    NOT?: SchoolScalarWhereWithAggregatesInput | SchoolScalarWhereWithAggregatesInput[]
    schoolId?: StringWithAggregatesFilter<"School"> | string
    name?: StringWithAggregatesFilter<"School"> | string
    status?: StringWithAggregatesFilter<"School"> | string
    latitude?: FloatNullableWithAggregatesFilter<"School"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"School"> | number | null
  }

  export type ServiceStatusWhereInput = {
    AND?: ServiceStatusWhereInput | ServiceStatusWhereInput[]
    OR?: ServiceStatusWhereInput[]
    NOT?: ServiceStatusWhereInput | ServiceStatusWhereInput[]
    schoolId?: StringFilter<"ServiceStatus"> | string
    serviceStatus?: StringFilter<"ServiceStatus"> | string
    reasonCode?: StringNullableFilter<"ServiceStatus"> | string | null
    reasonText?: StringNullableFilter<"ServiceStatus"> | string | null
    updatedAt?: DateTimeFilter<"ServiceStatus"> | Date | string
    School?: XOR<SchoolRelationFilter, SchoolWhereInput>
  }

  export type ServiceStatusOrderByWithRelationInput = {
    schoolId?: SortOrder
    serviceStatus?: SortOrder
    reasonCode?: SortOrderInput | SortOrder
    reasonText?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    School?: SchoolOrderByWithRelationInput
  }

  export type ServiceStatusWhereUniqueInput = Prisma.AtLeast<{
    schoolId?: string
    AND?: ServiceStatusWhereInput | ServiceStatusWhereInput[]
    OR?: ServiceStatusWhereInput[]
    NOT?: ServiceStatusWhereInput | ServiceStatusWhereInput[]
    serviceStatus?: StringFilter<"ServiceStatus"> | string
    reasonCode?: StringNullableFilter<"ServiceStatus"> | string | null
    reasonText?: StringNullableFilter<"ServiceStatus"> | string | null
    updatedAt?: DateTimeFilter<"ServiceStatus"> | Date | string
    School?: XOR<SchoolRelationFilter, SchoolWhereInput>
  }, "schoolId">

  export type ServiceStatusOrderByWithAggregationInput = {
    schoolId?: SortOrder
    serviceStatus?: SortOrder
    reasonCode?: SortOrderInput | SortOrder
    reasonText?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: ServiceStatusCountOrderByAggregateInput
    _max?: ServiceStatusMaxOrderByAggregateInput
    _min?: ServiceStatusMinOrderByAggregateInput
  }

  export type ServiceStatusScalarWhereWithAggregatesInput = {
    AND?: ServiceStatusScalarWhereWithAggregatesInput | ServiceStatusScalarWhereWithAggregatesInput[]
    OR?: ServiceStatusScalarWhereWithAggregatesInput[]
    NOT?: ServiceStatusScalarWhereWithAggregatesInput | ServiceStatusScalarWhereWithAggregatesInput[]
    schoolId?: StringWithAggregatesFilter<"ServiceStatus"> | string
    serviceStatus?: StringWithAggregatesFilter<"ServiceStatus"> | string
    reasonCode?: StringNullableWithAggregatesFilter<"ServiceStatus"> | string | null
    reasonText?: StringNullableWithAggregatesFilter<"ServiceStatus"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceStatus"> | Date | string
  }

  export type MembershipWhereInput = {
    AND?: MembershipWhereInput | MembershipWhereInput[]
    OR?: MembershipWhereInput[]
    NOT?: MembershipWhereInput | MembershipWhereInput[]
    membershipId?: StringFilter<"Membership"> | string
    userId?: StringFilter<"Membership"> | string
    identityId?: StringFilter<"Membership"> | string
    schoolId?: StringFilter<"Membership"> | string
    role?: StringFilter<"Membership"> | string
    status?: StringFilter<"Membership"> | string
    School?: XOR<SchoolRelationFilter, SchoolWhereInput>
  }

  export type MembershipOrderByWithRelationInput = {
    membershipId?: SortOrder
    userId?: SortOrder
    identityId?: SortOrder
    schoolId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    School?: SchoolOrderByWithRelationInput
  }

  export type MembershipWhereUniqueInput = Prisma.AtLeast<{
    membershipId?: string
    AND?: MembershipWhereInput | MembershipWhereInput[]
    OR?: MembershipWhereInput[]
    NOT?: MembershipWhereInput | MembershipWhereInput[]
    userId?: StringFilter<"Membership"> | string
    identityId?: StringFilter<"Membership"> | string
    schoolId?: StringFilter<"Membership"> | string
    role?: StringFilter<"Membership"> | string
    status?: StringFilter<"Membership"> | string
    School?: XOR<SchoolRelationFilter, SchoolWhereInput>
  }, "membershipId">

  export type MembershipOrderByWithAggregationInput = {
    membershipId?: SortOrder
    userId?: SortOrder
    identityId?: SortOrder
    schoolId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    _count?: MembershipCountOrderByAggregateInput
    _max?: MembershipMaxOrderByAggregateInput
    _min?: MembershipMinOrderByAggregateInput
  }

  export type MembershipScalarWhereWithAggregatesInput = {
    AND?: MembershipScalarWhereWithAggregatesInput | MembershipScalarWhereWithAggregatesInput[]
    OR?: MembershipScalarWhereWithAggregatesInput[]
    NOT?: MembershipScalarWhereWithAggregatesInput | MembershipScalarWhereWithAggregatesInput[]
    membershipId?: StringWithAggregatesFilter<"Membership"> | string
    userId?: StringWithAggregatesFilter<"Membership"> | string
    identityId?: StringWithAggregatesFilter<"Membership"> | string
    schoolId?: StringWithAggregatesFilter<"Membership"> | string
    role?: StringWithAggregatesFilter<"Membership"> | string
    status?: StringWithAggregatesFilter<"Membership"> | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    auditLogId?: StringFilter<"AuditLog"> | string
    schoolId?: StringFilter<"AuditLog"> | string
    actorUserId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    targetType?: StringFilter<"AuditLog"> | string
    targetId?: StringFilter<"AuditLog"> | string
    payload?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    School?: XOR<SchoolRelationFilter, SchoolWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    auditLogId?: SortOrder
    schoolId?: SortOrder
    actorUserId?: SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
    School?: SchoolOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    auditLogId?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    schoolId?: StringFilter<"AuditLog"> | string
    actorUserId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    targetType?: StringFilter<"AuditLog"> | string
    targetId?: StringFilter<"AuditLog"> | string
    payload?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    School?: XOR<SchoolRelationFilter, SchoolWhereInput>
  }, "auditLogId">

  export type AuditLogOrderByWithAggregationInput = {
    auditLogId?: SortOrder
    schoolId?: SortOrder
    actorUserId?: SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    auditLogId?: StringWithAggregatesFilter<"AuditLog"> | string
    schoolId?: StringWithAggregatesFilter<"AuditLog"> | string
    actorUserId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    targetType?: StringWithAggregatesFilter<"AuditLog"> | string
    targetId?: StringWithAggregatesFilter<"AuditLog"> | string
    payload?: StringWithAggregatesFilter<"AuditLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type IdentityAccountWhereInput = {
    AND?: IdentityAccountWhereInput | IdentityAccountWhereInput[]
    OR?: IdentityAccountWhereInput[]
    NOT?: IdentityAccountWhereInput | IdentityAccountWhereInput[]
    identityId?: StringFilter<"IdentityAccount"> | string
    provider?: StringFilter<"IdentityAccount"> | string
    idToken?: StringFilter<"IdentityAccount"> | string
    userId?: StringFilter<"IdentityAccount"> | string
  }

  export type IdentityAccountOrderByWithRelationInput = {
    identityId?: SortOrder
    provider?: SortOrder
    idToken?: SortOrder
    userId?: SortOrder
  }

  export type IdentityAccountWhereUniqueInput = Prisma.AtLeast<{
    identityId?: string
    provider_idToken?: IdentityAccountProviderIdTokenCompoundUniqueInput
    AND?: IdentityAccountWhereInput | IdentityAccountWhereInput[]
    OR?: IdentityAccountWhereInput[]
    NOT?: IdentityAccountWhereInput | IdentityAccountWhereInput[]
    provider?: StringFilter<"IdentityAccount"> | string
    idToken?: StringFilter<"IdentityAccount"> | string
    userId?: StringFilter<"IdentityAccount"> | string
  }, "identityId" | "provider_idToken">

  export type IdentityAccountOrderByWithAggregationInput = {
    identityId?: SortOrder
    provider?: SortOrder
    idToken?: SortOrder
    userId?: SortOrder
    _count?: IdentityAccountCountOrderByAggregateInput
    _max?: IdentityAccountMaxOrderByAggregateInput
    _min?: IdentityAccountMinOrderByAggregateInput
  }

  export type IdentityAccountScalarWhereWithAggregatesInput = {
    AND?: IdentityAccountScalarWhereWithAggregatesInput | IdentityAccountScalarWhereWithAggregatesInput[]
    OR?: IdentityAccountScalarWhereWithAggregatesInput[]
    NOT?: IdentityAccountScalarWhereWithAggregatesInput | IdentityAccountScalarWhereWithAggregatesInput[]
    identityId?: StringWithAggregatesFilter<"IdentityAccount"> | string
    provider?: StringWithAggregatesFilter<"IdentityAccount"> | string
    idToken?: StringWithAggregatesFilter<"IdentityAccount"> | string
    userId?: StringWithAggregatesFilter<"IdentityAccount"> | string
  }

  export type SchoolCreateInput = {
    schoolId: string
    name: string
    status: string
    latitude?: number | null
    longitude?: number | null
    ServiceStatus?: ServiceStatusCreateNestedOneWithoutSchoolInput
    Memberships?: MembershipCreateNestedManyWithoutSchoolInput
    AuditLogs?: AuditLogCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateInput = {
    schoolId: string
    name: string
    status: string
    latitude?: number | null
    longitude?: number | null
    ServiceStatus?: ServiceStatusUncheckedCreateNestedOneWithoutSchoolInput
    Memberships?: MembershipUncheckedCreateNestedManyWithoutSchoolInput
    AuditLogs?: AuditLogUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUpdateInput = {
    schoolId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    ServiceStatus?: ServiceStatusUpdateOneWithoutSchoolNestedInput
    Memberships?: MembershipUpdateManyWithoutSchoolNestedInput
    AuditLogs?: AuditLogUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateInput = {
    schoolId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    ServiceStatus?: ServiceStatusUncheckedUpdateOneWithoutSchoolNestedInput
    Memberships?: MembershipUncheckedUpdateManyWithoutSchoolNestedInput
    AuditLogs?: AuditLogUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolCreateManyInput = {
    schoolId: string
    name: string
    status: string
    latitude?: number | null
    longitude?: number | null
  }

  export type SchoolUpdateManyMutationInput = {
    schoolId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type SchoolUncheckedUpdateManyInput = {
    schoolId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ServiceStatusCreateInput = {
    serviceStatus: string
    reasonCode?: string | null
    reasonText?: string | null
    updatedAt: Date | string
    School: SchoolCreateNestedOneWithoutServiceStatusInput
  }

  export type ServiceStatusUncheckedCreateInput = {
    schoolId: string
    serviceStatus: string
    reasonCode?: string | null
    reasonText?: string | null
    updatedAt: Date | string
  }

  export type ServiceStatusUpdateInput = {
    serviceStatus?: StringFieldUpdateOperationsInput | string
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    reasonText?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    School?: SchoolUpdateOneRequiredWithoutServiceStatusNestedInput
  }

  export type ServiceStatusUncheckedUpdateInput = {
    schoolId?: StringFieldUpdateOperationsInput | string
    serviceStatus?: StringFieldUpdateOperationsInput | string
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    reasonText?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceStatusCreateManyInput = {
    schoolId: string
    serviceStatus: string
    reasonCode?: string | null
    reasonText?: string | null
    updatedAt: Date | string
  }

  export type ServiceStatusUpdateManyMutationInput = {
    serviceStatus?: StringFieldUpdateOperationsInput | string
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    reasonText?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceStatusUncheckedUpdateManyInput = {
    schoolId?: StringFieldUpdateOperationsInput | string
    serviceStatus?: StringFieldUpdateOperationsInput | string
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    reasonText?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipCreateInput = {
    membershipId: string
    userId: string
    identityId: string
    role: string
    status: string
    School: SchoolCreateNestedOneWithoutMembershipsInput
  }

  export type MembershipUncheckedCreateInput = {
    membershipId: string
    userId: string
    identityId: string
    schoolId: string
    role: string
    status: string
  }

  export type MembershipUpdateInput = {
    membershipId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    identityId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    School?: SchoolUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type MembershipUncheckedUpdateInput = {
    membershipId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    identityId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type MembershipCreateManyInput = {
    membershipId: string
    userId: string
    identityId: string
    schoolId: string
    role: string
    status: string
  }

  export type MembershipUpdateManyMutationInput = {
    membershipId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    identityId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type MembershipUncheckedUpdateManyInput = {
    membershipId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    identityId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogCreateInput = {
    auditLogId: string
    actorUserId: string
    action: string
    targetType: string
    targetId: string
    payload: string
    createdAt: Date | string
    School: SchoolCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    auditLogId: string
    schoolId: string
    actorUserId: string
    action: string
    targetType: string
    targetId: string
    payload: string
    createdAt: Date | string
  }

  export type AuditLogUpdateInput = {
    auditLogId?: StringFieldUpdateOperationsInput | string
    actorUserId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    School?: SchoolUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    auditLogId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    actorUserId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    auditLogId: string
    schoolId: string
    actorUserId: string
    action: string
    targetType: string
    targetId: string
    payload: string
    createdAt: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    auditLogId?: StringFieldUpdateOperationsInput | string
    actorUserId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    auditLogId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    actorUserId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IdentityAccountCreateInput = {
    identityId: string
    provider: string
    idToken: string
    userId: string
  }

  export type IdentityAccountUncheckedCreateInput = {
    identityId: string
    provider: string
    idToken: string
    userId: string
  }

  export type IdentityAccountUpdateInput = {
    identityId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    idToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type IdentityAccountUncheckedUpdateInput = {
    identityId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    idToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type IdentityAccountCreateManyInput = {
    identityId: string
    provider: string
    idToken: string
    userId: string
  }

  export type IdentityAccountUpdateManyMutationInput = {
    identityId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    idToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type IdentityAccountUncheckedUpdateManyInput = {
    identityId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    idToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ServiceStatusNullableRelationFilter = {
    is?: ServiceStatusWhereInput | null
    isNot?: ServiceStatusWhereInput | null
  }

  export type MembershipListRelationFilter = {
    every?: MembershipWhereInput
    some?: MembershipWhereInput
    none?: MembershipWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MembershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SchoolCountOrderByAggregateInput = {
    schoolId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type SchoolAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type SchoolMaxOrderByAggregateInput = {
    schoolId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type SchoolMinOrderByAggregateInput = {
    schoolId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type SchoolSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SchoolRelationFilter = {
    is?: SchoolWhereInput
    isNot?: SchoolWhereInput
  }

  export type ServiceStatusCountOrderByAggregateInput = {
    schoolId?: SortOrder
    serviceStatus?: SortOrder
    reasonCode?: SortOrder
    reasonText?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceStatusMaxOrderByAggregateInput = {
    schoolId?: SortOrder
    serviceStatus?: SortOrder
    reasonCode?: SortOrder
    reasonText?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceStatusMinOrderByAggregateInput = {
    schoolId?: SortOrder
    serviceStatus?: SortOrder
    reasonCode?: SortOrder
    reasonText?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type MembershipCountOrderByAggregateInput = {
    membershipId?: SortOrder
    userId?: SortOrder
    identityId?: SortOrder
    schoolId?: SortOrder
    role?: SortOrder
    status?: SortOrder
  }

  export type MembershipMaxOrderByAggregateInput = {
    membershipId?: SortOrder
    userId?: SortOrder
    identityId?: SortOrder
    schoolId?: SortOrder
    role?: SortOrder
    status?: SortOrder
  }

  export type MembershipMinOrderByAggregateInput = {
    membershipId?: SortOrder
    userId?: SortOrder
    identityId?: SortOrder
    schoolId?: SortOrder
    role?: SortOrder
    status?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    auditLogId?: SortOrder
    schoolId?: SortOrder
    actorUserId?: SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    auditLogId?: SortOrder
    schoolId?: SortOrder
    actorUserId?: SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    auditLogId?: SortOrder
    schoolId?: SortOrder
    actorUserId?: SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
  }

  export type IdentityAccountProviderIdTokenCompoundUniqueInput = {
    provider: string
    idToken: string
  }

  export type IdentityAccountCountOrderByAggregateInput = {
    identityId?: SortOrder
    provider?: SortOrder
    idToken?: SortOrder
    userId?: SortOrder
  }

  export type IdentityAccountMaxOrderByAggregateInput = {
    identityId?: SortOrder
    provider?: SortOrder
    idToken?: SortOrder
    userId?: SortOrder
  }

  export type IdentityAccountMinOrderByAggregateInput = {
    identityId?: SortOrder
    provider?: SortOrder
    idToken?: SortOrder
    userId?: SortOrder
  }

  export type ServiceStatusCreateNestedOneWithoutSchoolInput = {
    create?: XOR<ServiceStatusCreateWithoutSchoolInput, ServiceStatusUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: ServiceStatusCreateOrConnectWithoutSchoolInput
    connect?: ServiceStatusWhereUniqueInput
  }

  export type MembershipCreateNestedManyWithoutSchoolInput = {
    create?: XOR<MembershipCreateWithoutSchoolInput, MembershipUncheckedCreateWithoutSchoolInput> | MembershipCreateWithoutSchoolInput[] | MembershipUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutSchoolInput | MembershipCreateOrConnectWithoutSchoolInput[]
    createMany?: MembershipCreateManySchoolInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutSchoolInput = {
    create?: XOR<AuditLogCreateWithoutSchoolInput, AuditLogUncheckedCreateWithoutSchoolInput> | AuditLogCreateWithoutSchoolInput[] | AuditLogUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutSchoolInput | AuditLogCreateOrConnectWithoutSchoolInput[]
    createMany?: AuditLogCreateManySchoolInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type ServiceStatusUncheckedCreateNestedOneWithoutSchoolInput = {
    create?: XOR<ServiceStatusCreateWithoutSchoolInput, ServiceStatusUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: ServiceStatusCreateOrConnectWithoutSchoolInput
    connect?: ServiceStatusWhereUniqueInput
  }

  export type MembershipUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<MembershipCreateWithoutSchoolInput, MembershipUncheckedCreateWithoutSchoolInput> | MembershipCreateWithoutSchoolInput[] | MembershipUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutSchoolInput | MembershipCreateOrConnectWithoutSchoolInput[]
    createMany?: MembershipCreateManySchoolInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<AuditLogCreateWithoutSchoolInput, AuditLogUncheckedCreateWithoutSchoolInput> | AuditLogCreateWithoutSchoolInput[] | AuditLogUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutSchoolInput | AuditLogCreateOrConnectWithoutSchoolInput[]
    createMany?: AuditLogCreateManySchoolInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ServiceStatusUpdateOneWithoutSchoolNestedInput = {
    create?: XOR<ServiceStatusCreateWithoutSchoolInput, ServiceStatusUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: ServiceStatusCreateOrConnectWithoutSchoolInput
    upsert?: ServiceStatusUpsertWithoutSchoolInput
    disconnect?: ServiceStatusWhereInput | boolean
    delete?: ServiceStatusWhereInput | boolean
    connect?: ServiceStatusWhereUniqueInput
    update?: XOR<XOR<ServiceStatusUpdateToOneWithWhereWithoutSchoolInput, ServiceStatusUpdateWithoutSchoolInput>, ServiceStatusUncheckedUpdateWithoutSchoolInput>
  }

  export type MembershipUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<MembershipCreateWithoutSchoolInput, MembershipUncheckedCreateWithoutSchoolInput> | MembershipCreateWithoutSchoolInput[] | MembershipUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutSchoolInput | MembershipCreateOrConnectWithoutSchoolInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutSchoolInput | MembershipUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: MembershipCreateManySchoolInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutSchoolInput | MembershipUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutSchoolInput | MembershipUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<AuditLogCreateWithoutSchoolInput, AuditLogUncheckedCreateWithoutSchoolInput> | AuditLogCreateWithoutSchoolInput[] | AuditLogUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutSchoolInput | AuditLogCreateOrConnectWithoutSchoolInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutSchoolInput | AuditLogUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: AuditLogCreateManySchoolInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutSchoolInput | AuditLogUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutSchoolInput | AuditLogUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ServiceStatusUncheckedUpdateOneWithoutSchoolNestedInput = {
    create?: XOR<ServiceStatusCreateWithoutSchoolInput, ServiceStatusUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: ServiceStatusCreateOrConnectWithoutSchoolInput
    upsert?: ServiceStatusUpsertWithoutSchoolInput
    disconnect?: ServiceStatusWhereInput | boolean
    delete?: ServiceStatusWhereInput | boolean
    connect?: ServiceStatusWhereUniqueInput
    update?: XOR<XOR<ServiceStatusUpdateToOneWithWhereWithoutSchoolInput, ServiceStatusUpdateWithoutSchoolInput>, ServiceStatusUncheckedUpdateWithoutSchoolInput>
  }

  export type MembershipUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<MembershipCreateWithoutSchoolInput, MembershipUncheckedCreateWithoutSchoolInput> | MembershipCreateWithoutSchoolInput[] | MembershipUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutSchoolInput | MembershipCreateOrConnectWithoutSchoolInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutSchoolInput | MembershipUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: MembershipCreateManySchoolInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutSchoolInput | MembershipUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutSchoolInput | MembershipUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<AuditLogCreateWithoutSchoolInput, AuditLogUncheckedCreateWithoutSchoolInput> | AuditLogCreateWithoutSchoolInput[] | AuditLogUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutSchoolInput | AuditLogCreateOrConnectWithoutSchoolInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutSchoolInput | AuditLogUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: AuditLogCreateManySchoolInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutSchoolInput | AuditLogUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutSchoolInput | AuditLogUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type SchoolCreateNestedOneWithoutServiceStatusInput = {
    create?: XOR<SchoolCreateWithoutServiceStatusInput, SchoolUncheckedCreateWithoutServiceStatusInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutServiceStatusInput
    connect?: SchoolWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SchoolUpdateOneRequiredWithoutServiceStatusNestedInput = {
    create?: XOR<SchoolCreateWithoutServiceStatusInput, SchoolUncheckedCreateWithoutServiceStatusInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutServiceStatusInput
    upsert?: SchoolUpsertWithoutServiceStatusInput
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutServiceStatusInput, SchoolUpdateWithoutServiceStatusInput>, SchoolUncheckedUpdateWithoutServiceStatusInput>
  }

  export type SchoolCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<SchoolCreateWithoutMembershipsInput, SchoolUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutMembershipsInput
    connect?: SchoolWhereUniqueInput
  }

  export type SchoolUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<SchoolCreateWithoutMembershipsInput, SchoolUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutMembershipsInput
    upsert?: SchoolUpsertWithoutMembershipsInput
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutMembershipsInput, SchoolUpdateWithoutMembershipsInput>, SchoolUncheckedUpdateWithoutMembershipsInput>
  }

  export type SchoolCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<SchoolCreateWithoutAuditLogsInput, SchoolUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutAuditLogsInput
    connect?: SchoolWhereUniqueInput
  }

  export type SchoolUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<SchoolCreateWithoutAuditLogsInput, SchoolUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutAuditLogsInput
    upsert?: SchoolUpsertWithoutAuditLogsInput
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutAuditLogsInput, SchoolUpdateWithoutAuditLogsInput>, SchoolUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ServiceStatusCreateWithoutSchoolInput = {
    serviceStatus: string
    reasonCode?: string | null
    reasonText?: string | null
    updatedAt: Date | string
  }

  export type ServiceStatusUncheckedCreateWithoutSchoolInput = {
    serviceStatus: string
    reasonCode?: string | null
    reasonText?: string | null
    updatedAt: Date | string
  }

  export type ServiceStatusCreateOrConnectWithoutSchoolInput = {
    where: ServiceStatusWhereUniqueInput
    create: XOR<ServiceStatusCreateWithoutSchoolInput, ServiceStatusUncheckedCreateWithoutSchoolInput>
  }

  export type MembershipCreateWithoutSchoolInput = {
    membershipId: string
    userId: string
    identityId: string
    role: string
    status: string
  }

  export type MembershipUncheckedCreateWithoutSchoolInput = {
    membershipId: string
    userId: string
    identityId: string
    role: string
    status: string
  }

  export type MembershipCreateOrConnectWithoutSchoolInput = {
    where: MembershipWhereUniqueInput
    create: XOR<MembershipCreateWithoutSchoolInput, MembershipUncheckedCreateWithoutSchoolInput>
  }

  export type MembershipCreateManySchoolInputEnvelope = {
    data: MembershipCreateManySchoolInput | MembershipCreateManySchoolInput[]
  }

  export type AuditLogCreateWithoutSchoolInput = {
    auditLogId: string
    actorUserId: string
    action: string
    targetType: string
    targetId: string
    payload: string
    createdAt: Date | string
  }

  export type AuditLogUncheckedCreateWithoutSchoolInput = {
    auditLogId: string
    actorUserId: string
    action: string
    targetType: string
    targetId: string
    payload: string
    createdAt: Date | string
  }

  export type AuditLogCreateOrConnectWithoutSchoolInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutSchoolInput, AuditLogUncheckedCreateWithoutSchoolInput>
  }

  export type AuditLogCreateManySchoolInputEnvelope = {
    data: AuditLogCreateManySchoolInput | AuditLogCreateManySchoolInput[]
  }

  export type ServiceStatusUpsertWithoutSchoolInput = {
    update: XOR<ServiceStatusUpdateWithoutSchoolInput, ServiceStatusUncheckedUpdateWithoutSchoolInput>
    create: XOR<ServiceStatusCreateWithoutSchoolInput, ServiceStatusUncheckedCreateWithoutSchoolInput>
    where?: ServiceStatusWhereInput
  }

  export type ServiceStatusUpdateToOneWithWhereWithoutSchoolInput = {
    where?: ServiceStatusWhereInput
    data: XOR<ServiceStatusUpdateWithoutSchoolInput, ServiceStatusUncheckedUpdateWithoutSchoolInput>
  }

  export type ServiceStatusUpdateWithoutSchoolInput = {
    serviceStatus?: StringFieldUpdateOperationsInput | string
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    reasonText?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceStatusUncheckedUpdateWithoutSchoolInput = {
    serviceStatus?: StringFieldUpdateOperationsInput | string
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    reasonText?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipUpsertWithWhereUniqueWithoutSchoolInput = {
    where: MembershipWhereUniqueInput
    update: XOR<MembershipUpdateWithoutSchoolInput, MembershipUncheckedUpdateWithoutSchoolInput>
    create: XOR<MembershipCreateWithoutSchoolInput, MembershipUncheckedCreateWithoutSchoolInput>
  }

  export type MembershipUpdateWithWhereUniqueWithoutSchoolInput = {
    where: MembershipWhereUniqueInput
    data: XOR<MembershipUpdateWithoutSchoolInput, MembershipUncheckedUpdateWithoutSchoolInput>
  }

  export type MembershipUpdateManyWithWhereWithoutSchoolInput = {
    where: MembershipScalarWhereInput
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyWithoutSchoolInput>
  }

  export type MembershipScalarWhereInput = {
    AND?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
    OR?: MembershipScalarWhereInput[]
    NOT?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
    membershipId?: StringFilter<"Membership"> | string
    userId?: StringFilter<"Membership"> | string
    identityId?: StringFilter<"Membership"> | string
    schoolId?: StringFilter<"Membership"> | string
    role?: StringFilter<"Membership"> | string
    status?: StringFilter<"Membership"> | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutSchoolInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutSchoolInput, AuditLogUncheckedUpdateWithoutSchoolInput>
    create: XOR<AuditLogCreateWithoutSchoolInput, AuditLogUncheckedCreateWithoutSchoolInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutSchoolInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutSchoolInput, AuditLogUncheckedUpdateWithoutSchoolInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutSchoolInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutSchoolInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    auditLogId?: StringFilter<"AuditLog"> | string
    schoolId?: StringFilter<"AuditLog"> | string
    actorUserId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    targetType?: StringFilter<"AuditLog"> | string
    targetId?: StringFilter<"AuditLog"> | string
    payload?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type SchoolCreateWithoutServiceStatusInput = {
    schoolId: string
    name: string
    status: string
    latitude?: number | null
    longitude?: number | null
    Memberships?: MembershipCreateNestedManyWithoutSchoolInput
    AuditLogs?: AuditLogCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutServiceStatusInput = {
    schoolId: string
    name: string
    status: string
    latitude?: number | null
    longitude?: number | null
    Memberships?: MembershipUncheckedCreateNestedManyWithoutSchoolInput
    AuditLogs?: AuditLogUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutServiceStatusInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutServiceStatusInput, SchoolUncheckedCreateWithoutServiceStatusInput>
  }

  export type SchoolUpsertWithoutServiceStatusInput = {
    update: XOR<SchoolUpdateWithoutServiceStatusInput, SchoolUncheckedUpdateWithoutServiceStatusInput>
    create: XOR<SchoolCreateWithoutServiceStatusInput, SchoolUncheckedCreateWithoutServiceStatusInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutServiceStatusInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutServiceStatusInput, SchoolUncheckedUpdateWithoutServiceStatusInput>
  }

  export type SchoolUpdateWithoutServiceStatusInput = {
    schoolId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    Memberships?: MembershipUpdateManyWithoutSchoolNestedInput
    AuditLogs?: AuditLogUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutServiceStatusInput = {
    schoolId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    Memberships?: MembershipUncheckedUpdateManyWithoutSchoolNestedInput
    AuditLogs?: AuditLogUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolCreateWithoutMembershipsInput = {
    schoolId: string
    name: string
    status: string
    latitude?: number | null
    longitude?: number | null
    ServiceStatus?: ServiceStatusCreateNestedOneWithoutSchoolInput
    AuditLogs?: AuditLogCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutMembershipsInput = {
    schoolId: string
    name: string
    status: string
    latitude?: number | null
    longitude?: number | null
    ServiceStatus?: ServiceStatusUncheckedCreateNestedOneWithoutSchoolInput
    AuditLogs?: AuditLogUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutMembershipsInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutMembershipsInput, SchoolUncheckedCreateWithoutMembershipsInput>
  }

  export type SchoolUpsertWithoutMembershipsInput = {
    update: XOR<SchoolUpdateWithoutMembershipsInput, SchoolUncheckedUpdateWithoutMembershipsInput>
    create: XOR<SchoolCreateWithoutMembershipsInput, SchoolUncheckedCreateWithoutMembershipsInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutMembershipsInput, SchoolUncheckedUpdateWithoutMembershipsInput>
  }

  export type SchoolUpdateWithoutMembershipsInput = {
    schoolId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    ServiceStatus?: ServiceStatusUpdateOneWithoutSchoolNestedInput
    AuditLogs?: AuditLogUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutMembershipsInput = {
    schoolId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    ServiceStatus?: ServiceStatusUncheckedUpdateOneWithoutSchoolNestedInput
    AuditLogs?: AuditLogUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolCreateWithoutAuditLogsInput = {
    schoolId: string
    name: string
    status: string
    latitude?: number | null
    longitude?: number | null
    ServiceStatus?: ServiceStatusCreateNestedOneWithoutSchoolInput
    Memberships?: MembershipCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutAuditLogsInput = {
    schoolId: string
    name: string
    status: string
    latitude?: number | null
    longitude?: number | null
    ServiceStatus?: ServiceStatusUncheckedCreateNestedOneWithoutSchoolInput
    Memberships?: MembershipUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutAuditLogsInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutAuditLogsInput, SchoolUncheckedCreateWithoutAuditLogsInput>
  }

  export type SchoolUpsertWithoutAuditLogsInput = {
    update: XOR<SchoolUpdateWithoutAuditLogsInput, SchoolUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<SchoolCreateWithoutAuditLogsInput, SchoolUncheckedCreateWithoutAuditLogsInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutAuditLogsInput, SchoolUncheckedUpdateWithoutAuditLogsInput>
  }

  export type SchoolUpdateWithoutAuditLogsInput = {
    schoolId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    ServiceStatus?: ServiceStatusUpdateOneWithoutSchoolNestedInput
    Memberships?: MembershipUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutAuditLogsInput = {
    schoolId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    ServiceStatus?: ServiceStatusUncheckedUpdateOneWithoutSchoolNestedInput
    Memberships?: MembershipUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type MembershipCreateManySchoolInput = {
    membershipId: string
    userId: string
    identityId: string
    role: string
    status: string
  }

  export type AuditLogCreateManySchoolInput = {
    auditLogId: string
    actorUserId: string
    action: string
    targetType: string
    targetId: string
    payload: string
    createdAt: Date | string
  }

  export type MembershipUpdateWithoutSchoolInput = {
    membershipId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    identityId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type MembershipUncheckedUpdateWithoutSchoolInput = {
    membershipId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    identityId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type MembershipUncheckedUpdateManyWithoutSchoolInput = {
    membershipId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    identityId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogUpdateWithoutSchoolInput = {
    auditLogId?: StringFieldUpdateOperationsInput | string
    actorUserId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutSchoolInput = {
    auditLogId?: StringFieldUpdateOperationsInput | string
    actorUserId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutSchoolInput = {
    auditLogId?: StringFieldUpdateOperationsInput | string
    actorUserId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use SchoolCountOutputTypeDefaultArgs instead
     */
    export type SchoolCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SchoolCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SchoolDefaultArgs instead
     */
    export type SchoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SchoolDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceStatusDefaultArgs instead
     */
    export type ServiceStatusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceStatusDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MembershipDefaultArgs instead
     */
    export type MembershipArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MembershipDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use IdentityAccountDefaultArgs instead
     */
    export type IdentityAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = IdentityAccountDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}