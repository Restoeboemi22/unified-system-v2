
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
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Teacher
 * 
 */
export type Teacher = $Result.DefaultSelection<Prisma.$TeacherPayload>
/**
 * Model Staff
 * 
 */
export type Staff = $Result.DefaultSelection<Prisma.$StaffPayload>
/**
 * Model Principal
 * 
 */
export type Principal = $Result.DefaultSelection<Prisma.$PrincipalPayload>
/**
 * Model Classroom
 * 
 */
export type Classroom = $Result.DefaultSelection<Prisma.$ClassroomPayload>
/**
 * Model AcademicPeriod
 * 
 */
export type AcademicPeriod = $Result.DefaultSelection<Prisma.$AcademicPeriodPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Students
 * const students = await prisma.student.findMany()
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
   * // Fetch zero or more Students
   * const students = await prisma.student.findMany()
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
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs>;

  /**
   * `prisma.teacher`: Exposes CRUD operations for the **Teacher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teachers
    * const teachers = await prisma.teacher.findMany()
    * ```
    */
  get teacher(): Prisma.TeacherDelegate<ExtArgs>;

  /**
   * `prisma.staff`: Exposes CRUD operations for the **Staff** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Staff
    * const staff = await prisma.staff.findMany()
    * ```
    */
  get staff(): Prisma.StaffDelegate<ExtArgs>;

  /**
   * `prisma.principal`: Exposes CRUD operations for the **Principal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Principals
    * const principals = await prisma.principal.findMany()
    * ```
    */
  get principal(): Prisma.PrincipalDelegate<ExtArgs>;

  /**
   * `prisma.classroom`: Exposes CRUD operations for the **Classroom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classrooms
    * const classrooms = await prisma.classroom.findMany()
    * ```
    */
  get classroom(): Prisma.ClassroomDelegate<ExtArgs>;

  /**
   * `prisma.academicPeriod`: Exposes CRUD operations for the **AcademicPeriod** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcademicPeriods
    * const academicPeriods = await prisma.academicPeriod.findMany()
    * ```
    */
  get academicPeriod(): Prisma.AcademicPeriodDelegate<ExtArgs>;
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
    Student: 'Student',
    Teacher: 'Teacher',
    Staff: 'Staff',
    Principal: 'Principal',
    Classroom: 'Classroom',
    AcademicPeriod: 'AcademicPeriod'
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
      modelProps: "student" | "teacher" | "staff" | "principal" | "classroom" | "academicPeriod"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Teacher: {
        payload: Prisma.$TeacherPayload<ExtArgs>
        fields: Prisma.TeacherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeacherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeacherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findFirst: {
            args: Prisma.TeacherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeacherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findMany: {
            args: Prisma.TeacherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          create: {
            args: Prisma.TeacherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          createMany: {
            args: Prisma.TeacherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeacherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          delete: {
            args: Prisma.TeacherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          update: {
            args: Prisma.TeacherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          deleteMany: {
            args: Prisma.TeacherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeacherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeacherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          aggregate: {
            args: Prisma.TeacherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeacher>
          }
          groupBy: {
            args: Prisma.TeacherGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeacherGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeacherCountArgs<ExtArgs>
            result: $Utils.Optional<TeacherCountAggregateOutputType> | number
          }
        }
      }
      Staff: {
        payload: Prisma.$StaffPayload<ExtArgs>
        fields: Prisma.StaffFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findFirst: {
            args: Prisma.StaffFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findMany: {
            args: Prisma.StaffFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          create: {
            args: Prisma.StaffCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          createMany: {
            args: Prisma.StaffCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          delete: {
            args: Prisma.StaffDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          update: {
            args: Prisma.StaffUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          deleteMany: {
            args: Prisma.StaffDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StaffUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          aggregate: {
            args: Prisma.StaffAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaff>
          }
          groupBy: {
            args: Prisma.StaffGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffCountArgs<ExtArgs>
            result: $Utils.Optional<StaffCountAggregateOutputType> | number
          }
        }
      }
      Principal: {
        payload: Prisma.$PrincipalPayload<ExtArgs>
        fields: Prisma.PrincipalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrincipalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrincipalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrincipalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrincipalPayload>
          }
          findFirst: {
            args: Prisma.PrincipalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrincipalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrincipalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrincipalPayload>
          }
          findMany: {
            args: Prisma.PrincipalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrincipalPayload>[]
          }
          create: {
            args: Prisma.PrincipalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrincipalPayload>
          }
          createMany: {
            args: Prisma.PrincipalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrincipalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrincipalPayload>[]
          }
          delete: {
            args: Prisma.PrincipalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrincipalPayload>
          }
          update: {
            args: Prisma.PrincipalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrincipalPayload>
          }
          deleteMany: {
            args: Prisma.PrincipalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrincipalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PrincipalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrincipalPayload>
          }
          aggregate: {
            args: Prisma.PrincipalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrincipal>
          }
          groupBy: {
            args: Prisma.PrincipalGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrincipalGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrincipalCountArgs<ExtArgs>
            result: $Utils.Optional<PrincipalCountAggregateOutputType> | number
          }
        }
      }
      Classroom: {
        payload: Prisma.$ClassroomPayload<ExtArgs>
        fields: Prisma.ClassroomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassroomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassroomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          findFirst: {
            args: Prisma.ClassroomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassroomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          findMany: {
            args: Prisma.ClassroomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>[]
          }
          create: {
            args: Prisma.ClassroomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          createMany: {
            args: Prisma.ClassroomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassroomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>[]
          }
          delete: {
            args: Prisma.ClassroomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          update: {
            args: Prisma.ClassroomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          deleteMany: {
            args: Prisma.ClassroomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassroomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClassroomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          aggregate: {
            args: Prisma.ClassroomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClassroom>
          }
          groupBy: {
            args: Prisma.ClassroomGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassroomGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassroomCountArgs<ExtArgs>
            result: $Utils.Optional<ClassroomCountAggregateOutputType> | number
          }
        }
      }
      AcademicPeriod: {
        payload: Prisma.$AcademicPeriodPayload<ExtArgs>
        fields: Prisma.AcademicPeriodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcademicPeriodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcademicPeriodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>
          }
          findFirst: {
            args: Prisma.AcademicPeriodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcademicPeriodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>
          }
          findMany: {
            args: Prisma.AcademicPeriodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>[]
          }
          create: {
            args: Prisma.AcademicPeriodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>
          }
          createMany: {
            args: Prisma.AcademicPeriodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AcademicPeriodCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>[]
          }
          delete: {
            args: Prisma.AcademicPeriodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>
          }
          update: {
            args: Prisma.AcademicPeriodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>
          }
          deleteMany: {
            args: Prisma.AcademicPeriodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcademicPeriodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AcademicPeriodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>
          }
          aggregate: {
            args: Prisma.AcademicPeriodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademicPeriod>
          }
          groupBy: {
            args: Prisma.AcademicPeriodGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcademicPeriodGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcademicPeriodCountArgs<ExtArgs>
            result: $Utils.Optional<AcademicPeriodCountAggregateOutputType> | number
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
   * Models
   */

  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentMinAggregateOutputType = {
    studentId: string | null
    schoolId: string | null
    studentNumber: string | null
    fullName: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentMaxAggregateOutputType = {
    studentId: string | null
    schoolId: string | null
    studentNumber: string | null
    fullName: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentCountAggregateOutputType = {
    studentId: number
    schoolId: number
    studentNumber: number
    fullName: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentMinAggregateInputType = {
    studentId?: true
    schoolId?: true
    studentNumber?: true
    fullName?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentMaxAggregateInputType = {
    studentId?: true
    schoolId?: true
    studentNumber?: true
    fullName?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentCountAggregateInputType = {
    studentId?: true
    schoolId?: true
    studentNumber?: true
    fullName?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    studentId: string
    schoolId: string
    studentNumber: string
    fullName: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentId?: boolean
    schoolId?: boolean
    studentNumber?: boolean
    fullName?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentId?: boolean
    schoolId?: boolean
    studentNumber?: boolean
    fullName?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    studentId?: boolean
    schoolId?: boolean
    studentNumber?: boolean
    fullName?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      studentId: string
      schoolId: string
      studentNumber: string
      fullName: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `studentId`
     * const studentWithStudentIdOnly = await prisma.student.findMany({ select: { studentId: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `studentId`
     * const studentWithStudentIdOnly = await prisma.student.createManyAndReturn({ 
     *   select: { studentId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
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
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Student model
   */ 
  interface StudentFieldRefs {
    readonly studentId: FieldRef<"Student", 'String'>
    readonly schoolId: FieldRef<"Student", 'String'>
    readonly studentNumber: FieldRef<"Student", 'String'>
    readonly fullName: FieldRef<"Student", 'String'>
    readonly status: FieldRef<"Student", 'String'>
    readonly createdAt: FieldRef<"Student", 'DateTime'>
    readonly updatedAt: FieldRef<"Student", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
  }


  /**
   * Model Teacher
   */

  export type AggregateTeacher = {
    _count: TeacherCountAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  export type TeacherMinAggregateOutputType = {
    teacherId: string | null
    schoolId: string | null
    employeeNumber: string | null
    fullName: string | null
    subjectLabels: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeacherMaxAggregateOutputType = {
    teacherId: string | null
    schoolId: string | null
    employeeNumber: string | null
    fullName: string | null
    subjectLabels: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeacherCountAggregateOutputType = {
    teacherId: number
    schoolId: number
    employeeNumber: number
    fullName: number
    subjectLabels: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeacherMinAggregateInputType = {
    teacherId?: true
    schoolId?: true
    employeeNumber?: true
    fullName?: true
    subjectLabels?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeacherMaxAggregateInputType = {
    teacherId?: true
    schoolId?: true
    employeeNumber?: true
    fullName?: true
    subjectLabels?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeacherCountAggregateInputType = {
    teacherId?: true
    schoolId?: true
    employeeNumber?: true
    fullName?: true
    subjectLabels?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeacherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teacher to aggregate.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teachers
    **/
    _count?: true | TeacherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeacherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeacherMaxAggregateInputType
  }

  export type GetTeacherAggregateType<T extends TeacherAggregateArgs> = {
        [P in keyof T & keyof AggregateTeacher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeacher[P]>
      : GetScalarType<T[P], AggregateTeacher[P]>
  }




  export type TeacherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherWhereInput
    orderBy?: TeacherOrderByWithAggregationInput | TeacherOrderByWithAggregationInput[]
    by: TeacherScalarFieldEnum[] | TeacherScalarFieldEnum
    having?: TeacherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeacherCountAggregateInputType | true
    _min?: TeacherMinAggregateInputType
    _max?: TeacherMaxAggregateInputType
  }

  export type TeacherGroupByOutputType = {
    teacherId: string
    schoolId: string
    employeeNumber: string
    fullName: string
    subjectLabels: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: TeacherCountAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  type GetTeacherGroupByPayload<T extends TeacherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeacherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeacherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeacherGroupByOutputType[P]>
            : GetScalarType<T[P], TeacherGroupByOutputType[P]>
        }
      >
    >


  export type TeacherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    teacherId?: boolean
    schoolId?: boolean
    employeeNumber?: boolean
    fullName?: boolean
    subjectLabels?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    teacherId?: boolean
    schoolId?: boolean
    employeeNumber?: boolean
    fullName?: boolean
    subjectLabels?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectScalar = {
    teacherId?: boolean
    schoolId?: boolean
    employeeNumber?: boolean
    fullName?: boolean
    subjectLabels?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $TeacherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Teacher"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      teacherId: string
      schoolId: string
      employeeNumber: string
      fullName: string
      subjectLabels: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["teacher"]>
    composites: {}
  }

  type TeacherGetPayload<S extends boolean | null | undefined | TeacherDefaultArgs> = $Result.GetResult<Prisma.$TeacherPayload, S>

  type TeacherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TeacherFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TeacherCountAggregateInputType | true
    }

  export interface TeacherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Teacher'], meta: { name: 'Teacher' } }
    /**
     * Find zero or one Teacher that matches the filter.
     * @param {TeacherFindUniqueArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeacherFindUniqueArgs>(args: SelectSubset<T, TeacherFindUniqueArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Teacher that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TeacherFindUniqueOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeacherFindUniqueOrThrowArgs>(args: SelectSubset<T, TeacherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Teacher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeacherFindFirstArgs>(args?: SelectSubset<T, TeacherFindFirstArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Teacher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeacherFindFirstOrThrowArgs>(args?: SelectSubset<T, TeacherFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Teachers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teachers
     * const teachers = await prisma.teacher.findMany()
     * 
     * // Get first 10 Teachers
     * const teachers = await prisma.teacher.findMany({ take: 10 })
     * 
     * // Only select the `teacherId`
     * const teacherWithTeacherIdOnly = await prisma.teacher.findMany({ select: { teacherId: true } })
     * 
     */
    findMany<T extends TeacherFindManyArgs>(args?: SelectSubset<T, TeacherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Teacher.
     * @param {TeacherCreateArgs} args - Arguments to create a Teacher.
     * @example
     * // Create one Teacher
     * const Teacher = await prisma.teacher.create({
     *   data: {
     *     // ... data to create a Teacher
     *   }
     * })
     * 
     */
    create<T extends TeacherCreateArgs>(args: SelectSubset<T, TeacherCreateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Teachers.
     * @param {TeacherCreateManyArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeacherCreateManyArgs>(args?: SelectSubset<T, TeacherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teachers and returns the data saved in the database.
     * @param {TeacherCreateManyAndReturnArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teachers and only return the `teacherId`
     * const teacherWithTeacherIdOnly = await prisma.teacher.createManyAndReturn({ 
     *   select: { teacherId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeacherCreateManyAndReturnArgs>(args?: SelectSubset<T, TeacherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Teacher.
     * @param {TeacherDeleteArgs} args - Arguments to delete one Teacher.
     * @example
     * // Delete one Teacher
     * const Teacher = await prisma.teacher.delete({
     *   where: {
     *     // ... filter to delete one Teacher
     *   }
     * })
     * 
     */
    delete<T extends TeacherDeleteArgs>(args: SelectSubset<T, TeacherDeleteArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Teacher.
     * @param {TeacherUpdateArgs} args - Arguments to update one Teacher.
     * @example
     * // Update one Teacher
     * const teacher = await prisma.teacher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeacherUpdateArgs>(args: SelectSubset<T, TeacherUpdateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Teachers.
     * @param {TeacherDeleteManyArgs} args - Arguments to filter Teachers to delete.
     * @example
     * // Delete a few Teachers
     * const { count } = await prisma.teacher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeacherDeleteManyArgs>(args?: SelectSubset<T, TeacherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeacherUpdateManyArgs>(args: SelectSubset<T, TeacherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Teacher.
     * @param {TeacherUpsertArgs} args - Arguments to update or create a Teacher.
     * @example
     * // Update or create a Teacher
     * const teacher = await prisma.teacher.upsert({
     *   create: {
     *     // ... data to create a Teacher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Teacher we want to update
     *   }
     * })
     */
    upsert<T extends TeacherUpsertArgs>(args: SelectSubset<T, TeacherUpsertArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherCountArgs} args - Arguments to filter Teachers to count.
     * @example
     * // Count the number of Teachers
     * const count = await prisma.teacher.count({
     *   where: {
     *     // ... the filter for the Teachers we want to count
     *   }
     * })
    **/
    count<T extends TeacherCountArgs>(
      args?: Subset<T, TeacherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeacherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TeacherAggregateArgs>(args: Subset<T, TeacherAggregateArgs>): Prisma.PrismaPromise<GetTeacherAggregateType<T>>

    /**
     * Group by Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherGroupByArgs} args - Group by arguments.
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
      T extends TeacherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeacherGroupByArgs['orderBy'] }
        : { orderBy?: TeacherGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TeacherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeacherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Teacher model
   */
  readonly fields: TeacherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Teacher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeacherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Teacher model
   */ 
  interface TeacherFieldRefs {
    readonly teacherId: FieldRef<"Teacher", 'String'>
    readonly schoolId: FieldRef<"Teacher", 'String'>
    readonly employeeNumber: FieldRef<"Teacher", 'String'>
    readonly fullName: FieldRef<"Teacher", 'String'>
    readonly subjectLabels: FieldRef<"Teacher", 'String'>
    readonly status: FieldRef<"Teacher", 'String'>
    readonly createdAt: FieldRef<"Teacher", 'DateTime'>
    readonly updatedAt: FieldRef<"Teacher", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Teacher findUnique
   */
  export type TeacherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findUniqueOrThrow
   */
  export type TeacherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findFirst
   */
  export type TeacherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findFirstOrThrow
   */
  export type TeacherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findMany
   */
  export type TeacherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Filter, which Teachers to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher create
   */
  export type TeacherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * The data needed to create a Teacher.
     */
    data: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
  }

  /**
   * Teacher createMany
   */
  export type TeacherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
  }

  /**
   * Teacher createManyAndReturn
   */
  export type TeacherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
  }

  /**
   * Teacher update
   */
  export type TeacherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * The data needed to update a Teacher.
     */
    data: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
    /**
     * Choose, which Teacher to update.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher updateMany
   */
  export type TeacherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
  }

  /**
   * Teacher upsert
   */
  export type TeacherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * The filter to search for the Teacher to update in case it exists.
     */
    where: TeacherWhereUniqueInput
    /**
     * In case the Teacher found by the `where` argument doesn't exist, create a new Teacher with this data.
     */
    create: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
    /**
     * In case the Teacher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
  }

  /**
   * Teacher delete
   */
  export type TeacherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Filter which Teacher to delete.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher deleteMany
   */
  export type TeacherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teachers to delete
     */
    where?: TeacherWhereInput
  }

  /**
   * Teacher without action
   */
  export type TeacherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
  }


  /**
   * Model Staff
   */

  export type AggregateStaff = {
    _count: StaffCountAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  export type StaffMinAggregateOutputType = {
    staffId: string | null
    schoolId: string | null
    employeeNumber: string | null
    fullName: string | null
    positionTitle: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffMaxAggregateOutputType = {
    staffId: string | null
    schoolId: string | null
    employeeNumber: string | null
    fullName: string | null
    positionTitle: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffCountAggregateOutputType = {
    staffId: number
    schoolId: number
    employeeNumber: number
    fullName: number
    positionTitle: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StaffMinAggregateInputType = {
    staffId?: true
    schoolId?: true
    employeeNumber?: true
    fullName?: true
    positionTitle?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffMaxAggregateInputType = {
    staffId?: true
    schoolId?: true
    employeeNumber?: true
    fullName?: true
    positionTitle?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffCountAggregateInputType = {
    staffId?: true
    schoolId?: true
    employeeNumber?: true
    fullName?: true
    positionTitle?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StaffAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to aggregate.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Staff
    **/
    _count?: true | StaffCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffMaxAggregateInputType
  }

  export type GetStaffAggregateType<T extends StaffAggregateArgs> = {
        [P in keyof T & keyof AggregateStaff]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaff[P]>
      : GetScalarType<T[P], AggregateStaff[P]>
  }




  export type StaffGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffWhereInput
    orderBy?: StaffOrderByWithAggregationInput | StaffOrderByWithAggregationInput[]
    by: StaffScalarFieldEnum[] | StaffScalarFieldEnum
    having?: StaffScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffCountAggregateInputType | true
    _min?: StaffMinAggregateInputType
    _max?: StaffMaxAggregateInputType
  }

  export type StaffGroupByOutputType = {
    staffId: string
    schoolId: string
    employeeNumber: string
    fullName: string
    positionTitle: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: StaffCountAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  type GetStaffGroupByPayload<T extends StaffGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffGroupByOutputType[P]>
            : GetScalarType<T[P], StaffGroupByOutputType[P]>
        }
      >
    >


  export type StaffSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    staffId?: boolean
    schoolId?: boolean
    employeeNumber?: boolean
    fullName?: boolean
    positionTitle?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    staffId?: boolean
    schoolId?: boolean
    employeeNumber?: boolean
    fullName?: boolean
    positionTitle?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectScalar = {
    staffId?: boolean
    schoolId?: boolean
    employeeNumber?: boolean
    fullName?: boolean
    positionTitle?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $StaffPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Staff"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      staffId: string
      schoolId: string
      employeeNumber: string
      fullName: string
      positionTitle: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["staff"]>
    composites: {}
  }

  type StaffGetPayload<S extends boolean | null | undefined | StaffDefaultArgs> = $Result.GetResult<Prisma.$StaffPayload, S>

  type StaffCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StaffFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StaffCountAggregateInputType | true
    }

  export interface StaffDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Staff'], meta: { name: 'Staff' } }
    /**
     * Find zero or one Staff that matches the filter.
     * @param {StaffFindUniqueArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffFindUniqueArgs>(args: SelectSubset<T, StaffFindUniqueArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Staff that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StaffFindUniqueOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffFindFirstArgs>(args?: SelectSubset<T, StaffFindFirstArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Staff that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Staff
     * const staff = await prisma.staff.findMany()
     * 
     * // Get first 10 Staff
     * const staff = await prisma.staff.findMany({ take: 10 })
     * 
     * // Only select the `staffId`
     * const staffWithStaffIdOnly = await prisma.staff.findMany({ select: { staffId: true } })
     * 
     */
    findMany<T extends StaffFindManyArgs>(args?: SelectSubset<T, StaffFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Staff.
     * @param {StaffCreateArgs} args - Arguments to create a Staff.
     * @example
     * // Create one Staff
     * const Staff = await prisma.staff.create({
     *   data: {
     *     // ... data to create a Staff
     *   }
     * })
     * 
     */
    create<T extends StaffCreateArgs>(args: SelectSubset<T, StaffCreateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Staff.
     * @param {StaffCreateManyArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffCreateManyArgs>(args?: SelectSubset<T, StaffCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Staff and returns the data saved in the database.
     * @param {StaffCreateManyAndReturnArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Staff and only return the `staffId`
     * const staffWithStaffIdOnly = await prisma.staff.createManyAndReturn({ 
     *   select: { staffId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Staff.
     * @param {StaffDeleteArgs} args - Arguments to delete one Staff.
     * @example
     * // Delete one Staff
     * const Staff = await prisma.staff.delete({
     *   where: {
     *     // ... filter to delete one Staff
     *   }
     * })
     * 
     */
    delete<T extends StaffDeleteArgs>(args: SelectSubset<T, StaffDeleteArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Staff.
     * @param {StaffUpdateArgs} args - Arguments to update one Staff.
     * @example
     * // Update one Staff
     * const staff = await prisma.staff.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffUpdateArgs>(args: SelectSubset<T, StaffUpdateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Staff.
     * @param {StaffDeleteManyArgs} args - Arguments to filter Staff to delete.
     * @example
     * // Delete a few Staff
     * const { count } = await prisma.staff.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffDeleteManyArgs>(args?: SelectSubset<T, StaffDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffUpdateManyArgs>(args: SelectSubset<T, StaffUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Staff.
     * @param {StaffUpsertArgs} args - Arguments to update or create a Staff.
     * @example
     * // Update or create a Staff
     * const staff = await prisma.staff.upsert({
     *   create: {
     *     // ... data to create a Staff
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Staff we want to update
     *   }
     * })
     */
    upsert<T extends StaffUpsertArgs>(args: SelectSubset<T, StaffUpsertArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffCountArgs} args - Arguments to filter Staff to count.
     * @example
     * // Count the number of Staff
     * const count = await prisma.staff.count({
     *   where: {
     *     // ... the filter for the Staff we want to count
     *   }
     * })
    **/
    count<T extends StaffCountArgs>(
      args?: Subset<T, StaffCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StaffAggregateArgs>(args: Subset<T, StaffAggregateArgs>): Prisma.PrismaPromise<GetStaffAggregateType<T>>

    /**
     * Group by Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffGroupByArgs} args - Group by arguments.
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
      T extends StaffGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffGroupByArgs['orderBy'] }
        : { orderBy?: StaffGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StaffGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Staff model
   */
  readonly fields: StaffFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Staff.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Staff model
   */ 
  interface StaffFieldRefs {
    readonly staffId: FieldRef<"Staff", 'String'>
    readonly schoolId: FieldRef<"Staff", 'String'>
    readonly employeeNumber: FieldRef<"Staff", 'String'>
    readonly fullName: FieldRef<"Staff", 'String'>
    readonly positionTitle: FieldRef<"Staff", 'String'>
    readonly status: FieldRef<"Staff", 'String'>
    readonly createdAt: FieldRef<"Staff", 'DateTime'>
    readonly updatedAt: FieldRef<"Staff", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Staff findUnique
   */
  export type StaffFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findUniqueOrThrow
   */
  export type StaffFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findFirst
   */
  export type StaffFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findFirstOrThrow
   */
  export type StaffFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findMany
   */
  export type StaffFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff create
   */
  export type StaffCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * The data needed to create a Staff.
     */
    data: XOR<StaffCreateInput, StaffUncheckedCreateInput>
  }

  /**
   * Staff createMany
   */
  export type StaffCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
  }

  /**
   * Staff createManyAndReturn
   */
  export type StaffCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
  }

  /**
   * Staff update
   */
  export type StaffUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * The data needed to update a Staff.
     */
    data: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
    /**
     * Choose, which Staff to update.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff updateMany
   */
  export type StaffUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
  }

  /**
   * Staff upsert
   */
  export type StaffUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * The filter to search for the Staff to update in case it exists.
     */
    where: StaffWhereUniqueInput
    /**
     * In case the Staff found by the `where` argument doesn't exist, create a new Staff with this data.
     */
    create: XOR<StaffCreateInput, StaffUncheckedCreateInput>
    /**
     * In case the Staff was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
  }

  /**
   * Staff delete
   */
  export type StaffDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Filter which Staff to delete.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff deleteMany
   */
  export type StaffDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to delete
     */
    where?: StaffWhereInput
  }

  /**
   * Staff without action
   */
  export type StaffDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
  }


  /**
   * Model Principal
   */

  export type AggregatePrincipal = {
    _count: PrincipalCountAggregateOutputType | null
    _min: PrincipalMinAggregateOutputType | null
    _max: PrincipalMaxAggregateOutputType | null
  }

  export type PrincipalMinAggregateOutputType = {
    principalId: string | null
    schoolId: string | null
    appointmentCode: string | null
    fullName: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrincipalMaxAggregateOutputType = {
    principalId: string | null
    schoolId: string | null
    appointmentCode: string | null
    fullName: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrincipalCountAggregateOutputType = {
    principalId: number
    schoolId: number
    appointmentCode: number
    fullName: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PrincipalMinAggregateInputType = {
    principalId?: true
    schoolId?: true
    appointmentCode?: true
    fullName?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrincipalMaxAggregateInputType = {
    principalId?: true
    schoolId?: true
    appointmentCode?: true
    fullName?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrincipalCountAggregateInputType = {
    principalId?: true
    schoolId?: true
    appointmentCode?: true
    fullName?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PrincipalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Principal to aggregate.
     */
    where?: PrincipalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Principals to fetch.
     */
    orderBy?: PrincipalOrderByWithRelationInput | PrincipalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrincipalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Principals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Principals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Principals
    **/
    _count?: true | PrincipalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrincipalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrincipalMaxAggregateInputType
  }

  export type GetPrincipalAggregateType<T extends PrincipalAggregateArgs> = {
        [P in keyof T & keyof AggregatePrincipal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrincipal[P]>
      : GetScalarType<T[P], AggregatePrincipal[P]>
  }




  export type PrincipalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrincipalWhereInput
    orderBy?: PrincipalOrderByWithAggregationInput | PrincipalOrderByWithAggregationInput[]
    by: PrincipalScalarFieldEnum[] | PrincipalScalarFieldEnum
    having?: PrincipalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrincipalCountAggregateInputType | true
    _min?: PrincipalMinAggregateInputType
    _max?: PrincipalMaxAggregateInputType
  }

  export type PrincipalGroupByOutputType = {
    principalId: string
    schoolId: string
    appointmentCode: string | null
    fullName: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: PrincipalCountAggregateOutputType | null
    _min: PrincipalMinAggregateOutputType | null
    _max: PrincipalMaxAggregateOutputType | null
  }

  type GetPrincipalGroupByPayload<T extends PrincipalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrincipalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrincipalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrincipalGroupByOutputType[P]>
            : GetScalarType<T[P], PrincipalGroupByOutputType[P]>
        }
      >
    >


  export type PrincipalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    principalId?: boolean
    schoolId?: boolean
    appointmentCode?: boolean
    fullName?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["principal"]>

  export type PrincipalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    principalId?: boolean
    schoolId?: boolean
    appointmentCode?: boolean
    fullName?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["principal"]>

  export type PrincipalSelectScalar = {
    principalId?: boolean
    schoolId?: boolean
    appointmentCode?: boolean
    fullName?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $PrincipalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Principal"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      principalId: string
      schoolId: string
      appointmentCode: string | null
      fullName: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["principal"]>
    composites: {}
  }

  type PrincipalGetPayload<S extends boolean | null | undefined | PrincipalDefaultArgs> = $Result.GetResult<Prisma.$PrincipalPayload, S>

  type PrincipalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PrincipalFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PrincipalCountAggregateInputType | true
    }

  export interface PrincipalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Principal'], meta: { name: 'Principal' } }
    /**
     * Find zero or one Principal that matches the filter.
     * @param {PrincipalFindUniqueArgs} args - Arguments to find a Principal
     * @example
     * // Get one Principal
     * const principal = await prisma.principal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrincipalFindUniqueArgs>(args: SelectSubset<T, PrincipalFindUniqueArgs<ExtArgs>>): Prisma__PrincipalClient<$Result.GetResult<Prisma.$PrincipalPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Principal that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PrincipalFindUniqueOrThrowArgs} args - Arguments to find a Principal
     * @example
     * // Get one Principal
     * const principal = await prisma.principal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrincipalFindUniqueOrThrowArgs>(args: SelectSubset<T, PrincipalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrincipalClient<$Result.GetResult<Prisma.$PrincipalPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Principal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrincipalFindFirstArgs} args - Arguments to find a Principal
     * @example
     * // Get one Principal
     * const principal = await prisma.principal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrincipalFindFirstArgs>(args?: SelectSubset<T, PrincipalFindFirstArgs<ExtArgs>>): Prisma__PrincipalClient<$Result.GetResult<Prisma.$PrincipalPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Principal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrincipalFindFirstOrThrowArgs} args - Arguments to find a Principal
     * @example
     * // Get one Principal
     * const principal = await prisma.principal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrincipalFindFirstOrThrowArgs>(args?: SelectSubset<T, PrincipalFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrincipalClient<$Result.GetResult<Prisma.$PrincipalPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Principals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrincipalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Principals
     * const principals = await prisma.principal.findMany()
     * 
     * // Get first 10 Principals
     * const principals = await prisma.principal.findMany({ take: 10 })
     * 
     * // Only select the `principalId`
     * const principalWithPrincipalIdOnly = await prisma.principal.findMany({ select: { principalId: true } })
     * 
     */
    findMany<T extends PrincipalFindManyArgs>(args?: SelectSubset<T, PrincipalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrincipalPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Principal.
     * @param {PrincipalCreateArgs} args - Arguments to create a Principal.
     * @example
     * // Create one Principal
     * const Principal = await prisma.principal.create({
     *   data: {
     *     // ... data to create a Principal
     *   }
     * })
     * 
     */
    create<T extends PrincipalCreateArgs>(args: SelectSubset<T, PrincipalCreateArgs<ExtArgs>>): Prisma__PrincipalClient<$Result.GetResult<Prisma.$PrincipalPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Principals.
     * @param {PrincipalCreateManyArgs} args - Arguments to create many Principals.
     * @example
     * // Create many Principals
     * const principal = await prisma.principal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrincipalCreateManyArgs>(args?: SelectSubset<T, PrincipalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Principals and returns the data saved in the database.
     * @param {PrincipalCreateManyAndReturnArgs} args - Arguments to create many Principals.
     * @example
     * // Create many Principals
     * const principal = await prisma.principal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Principals and only return the `principalId`
     * const principalWithPrincipalIdOnly = await prisma.principal.createManyAndReturn({ 
     *   select: { principalId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrincipalCreateManyAndReturnArgs>(args?: SelectSubset<T, PrincipalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrincipalPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Principal.
     * @param {PrincipalDeleteArgs} args - Arguments to delete one Principal.
     * @example
     * // Delete one Principal
     * const Principal = await prisma.principal.delete({
     *   where: {
     *     // ... filter to delete one Principal
     *   }
     * })
     * 
     */
    delete<T extends PrincipalDeleteArgs>(args: SelectSubset<T, PrincipalDeleteArgs<ExtArgs>>): Prisma__PrincipalClient<$Result.GetResult<Prisma.$PrincipalPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Principal.
     * @param {PrincipalUpdateArgs} args - Arguments to update one Principal.
     * @example
     * // Update one Principal
     * const principal = await prisma.principal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrincipalUpdateArgs>(args: SelectSubset<T, PrincipalUpdateArgs<ExtArgs>>): Prisma__PrincipalClient<$Result.GetResult<Prisma.$PrincipalPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Principals.
     * @param {PrincipalDeleteManyArgs} args - Arguments to filter Principals to delete.
     * @example
     * // Delete a few Principals
     * const { count } = await prisma.principal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrincipalDeleteManyArgs>(args?: SelectSubset<T, PrincipalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Principals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrincipalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Principals
     * const principal = await prisma.principal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrincipalUpdateManyArgs>(args: SelectSubset<T, PrincipalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Principal.
     * @param {PrincipalUpsertArgs} args - Arguments to update or create a Principal.
     * @example
     * // Update or create a Principal
     * const principal = await prisma.principal.upsert({
     *   create: {
     *     // ... data to create a Principal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Principal we want to update
     *   }
     * })
     */
    upsert<T extends PrincipalUpsertArgs>(args: SelectSubset<T, PrincipalUpsertArgs<ExtArgs>>): Prisma__PrincipalClient<$Result.GetResult<Prisma.$PrincipalPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Principals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrincipalCountArgs} args - Arguments to filter Principals to count.
     * @example
     * // Count the number of Principals
     * const count = await prisma.principal.count({
     *   where: {
     *     // ... the filter for the Principals we want to count
     *   }
     * })
    **/
    count<T extends PrincipalCountArgs>(
      args?: Subset<T, PrincipalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrincipalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Principal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrincipalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PrincipalAggregateArgs>(args: Subset<T, PrincipalAggregateArgs>): Prisma.PrismaPromise<GetPrincipalAggregateType<T>>

    /**
     * Group by Principal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrincipalGroupByArgs} args - Group by arguments.
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
      T extends PrincipalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrincipalGroupByArgs['orderBy'] }
        : { orderBy?: PrincipalGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PrincipalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrincipalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Principal model
   */
  readonly fields: PrincipalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Principal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrincipalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Principal model
   */ 
  interface PrincipalFieldRefs {
    readonly principalId: FieldRef<"Principal", 'String'>
    readonly schoolId: FieldRef<"Principal", 'String'>
    readonly appointmentCode: FieldRef<"Principal", 'String'>
    readonly fullName: FieldRef<"Principal", 'String'>
    readonly status: FieldRef<"Principal", 'String'>
    readonly createdAt: FieldRef<"Principal", 'DateTime'>
    readonly updatedAt: FieldRef<"Principal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Principal findUnique
   */
  export type PrincipalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Principal
     */
    select?: PrincipalSelect<ExtArgs> | null
    /**
     * Filter, which Principal to fetch.
     */
    where: PrincipalWhereUniqueInput
  }

  /**
   * Principal findUniqueOrThrow
   */
  export type PrincipalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Principal
     */
    select?: PrincipalSelect<ExtArgs> | null
    /**
     * Filter, which Principal to fetch.
     */
    where: PrincipalWhereUniqueInput
  }

  /**
   * Principal findFirst
   */
  export type PrincipalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Principal
     */
    select?: PrincipalSelect<ExtArgs> | null
    /**
     * Filter, which Principal to fetch.
     */
    where?: PrincipalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Principals to fetch.
     */
    orderBy?: PrincipalOrderByWithRelationInput | PrincipalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Principals.
     */
    cursor?: PrincipalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Principals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Principals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Principals.
     */
    distinct?: PrincipalScalarFieldEnum | PrincipalScalarFieldEnum[]
  }

  /**
   * Principal findFirstOrThrow
   */
  export type PrincipalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Principal
     */
    select?: PrincipalSelect<ExtArgs> | null
    /**
     * Filter, which Principal to fetch.
     */
    where?: PrincipalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Principals to fetch.
     */
    orderBy?: PrincipalOrderByWithRelationInput | PrincipalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Principals.
     */
    cursor?: PrincipalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Principals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Principals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Principals.
     */
    distinct?: PrincipalScalarFieldEnum | PrincipalScalarFieldEnum[]
  }

  /**
   * Principal findMany
   */
  export type PrincipalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Principal
     */
    select?: PrincipalSelect<ExtArgs> | null
    /**
     * Filter, which Principals to fetch.
     */
    where?: PrincipalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Principals to fetch.
     */
    orderBy?: PrincipalOrderByWithRelationInput | PrincipalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Principals.
     */
    cursor?: PrincipalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Principals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Principals.
     */
    skip?: number
    distinct?: PrincipalScalarFieldEnum | PrincipalScalarFieldEnum[]
  }

  /**
   * Principal create
   */
  export type PrincipalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Principal
     */
    select?: PrincipalSelect<ExtArgs> | null
    /**
     * The data needed to create a Principal.
     */
    data: XOR<PrincipalCreateInput, PrincipalUncheckedCreateInput>
  }

  /**
   * Principal createMany
   */
  export type PrincipalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Principals.
     */
    data: PrincipalCreateManyInput | PrincipalCreateManyInput[]
  }

  /**
   * Principal createManyAndReturn
   */
  export type PrincipalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Principal
     */
    select?: PrincipalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Principals.
     */
    data: PrincipalCreateManyInput | PrincipalCreateManyInput[]
  }

  /**
   * Principal update
   */
  export type PrincipalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Principal
     */
    select?: PrincipalSelect<ExtArgs> | null
    /**
     * The data needed to update a Principal.
     */
    data: XOR<PrincipalUpdateInput, PrincipalUncheckedUpdateInput>
    /**
     * Choose, which Principal to update.
     */
    where: PrincipalWhereUniqueInput
  }

  /**
   * Principal updateMany
   */
  export type PrincipalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Principals.
     */
    data: XOR<PrincipalUpdateManyMutationInput, PrincipalUncheckedUpdateManyInput>
    /**
     * Filter which Principals to update
     */
    where?: PrincipalWhereInput
  }

  /**
   * Principal upsert
   */
  export type PrincipalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Principal
     */
    select?: PrincipalSelect<ExtArgs> | null
    /**
     * The filter to search for the Principal to update in case it exists.
     */
    where: PrincipalWhereUniqueInput
    /**
     * In case the Principal found by the `where` argument doesn't exist, create a new Principal with this data.
     */
    create: XOR<PrincipalCreateInput, PrincipalUncheckedCreateInput>
    /**
     * In case the Principal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrincipalUpdateInput, PrincipalUncheckedUpdateInput>
  }

  /**
   * Principal delete
   */
  export type PrincipalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Principal
     */
    select?: PrincipalSelect<ExtArgs> | null
    /**
     * Filter which Principal to delete.
     */
    where: PrincipalWhereUniqueInput
  }

  /**
   * Principal deleteMany
   */
  export type PrincipalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Principals to delete
     */
    where?: PrincipalWhereInput
  }

  /**
   * Principal without action
   */
  export type PrincipalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Principal
     */
    select?: PrincipalSelect<ExtArgs> | null
  }


  /**
   * Model Classroom
   */

  export type AggregateClassroom = {
    _count: ClassroomCountAggregateOutputType | null
    _min: ClassroomMinAggregateOutputType | null
    _max: ClassroomMaxAggregateOutputType | null
  }

  export type ClassroomMinAggregateOutputType = {
    classroomId: string | null
    schoolId: string | null
    academicPeriodId: string | null
    gradeLevel: string | null
    classroomName: string | null
    homeroomTeacherId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClassroomMaxAggregateOutputType = {
    classroomId: string | null
    schoolId: string | null
    academicPeriodId: string | null
    gradeLevel: string | null
    classroomName: string | null
    homeroomTeacherId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClassroomCountAggregateOutputType = {
    classroomId: number
    schoolId: number
    academicPeriodId: number
    gradeLevel: number
    classroomName: number
    homeroomTeacherId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClassroomMinAggregateInputType = {
    classroomId?: true
    schoolId?: true
    academicPeriodId?: true
    gradeLevel?: true
    classroomName?: true
    homeroomTeacherId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClassroomMaxAggregateInputType = {
    classroomId?: true
    schoolId?: true
    academicPeriodId?: true
    gradeLevel?: true
    classroomName?: true
    homeroomTeacherId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClassroomCountAggregateInputType = {
    classroomId?: true
    schoolId?: true
    academicPeriodId?: true
    gradeLevel?: true
    classroomName?: true
    homeroomTeacherId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClassroomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classroom to aggregate.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classrooms
    **/
    _count?: true | ClassroomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassroomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassroomMaxAggregateInputType
  }

  export type GetClassroomAggregateType<T extends ClassroomAggregateArgs> = {
        [P in keyof T & keyof AggregateClassroom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClassroom[P]>
      : GetScalarType<T[P], AggregateClassroom[P]>
  }




  export type ClassroomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassroomWhereInput
    orderBy?: ClassroomOrderByWithAggregationInput | ClassroomOrderByWithAggregationInput[]
    by: ClassroomScalarFieldEnum[] | ClassroomScalarFieldEnum
    having?: ClassroomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassroomCountAggregateInputType | true
    _min?: ClassroomMinAggregateInputType
    _max?: ClassroomMaxAggregateInputType
  }

  export type ClassroomGroupByOutputType = {
    classroomId: string
    schoolId: string
    academicPeriodId: string
    gradeLevel: string
    classroomName: string
    homeroomTeacherId: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ClassroomCountAggregateOutputType | null
    _min: ClassroomMinAggregateOutputType | null
    _max: ClassroomMaxAggregateOutputType | null
  }

  type GetClassroomGroupByPayload<T extends ClassroomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassroomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassroomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassroomGroupByOutputType[P]>
            : GetScalarType<T[P], ClassroomGroupByOutputType[P]>
        }
      >
    >


  export type ClassroomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    classroomId?: boolean
    schoolId?: boolean
    academicPeriodId?: boolean
    gradeLevel?: boolean
    classroomName?: boolean
    homeroomTeacherId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["classroom"]>

  export type ClassroomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    classroomId?: boolean
    schoolId?: boolean
    academicPeriodId?: boolean
    gradeLevel?: boolean
    classroomName?: boolean
    homeroomTeacherId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["classroom"]>

  export type ClassroomSelectScalar = {
    classroomId?: boolean
    schoolId?: boolean
    academicPeriodId?: boolean
    gradeLevel?: boolean
    classroomName?: boolean
    homeroomTeacherId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ClassroomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Classroom"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      classroomId: string
      schoolId: string
      academicPeriodId: string
      gradeLevel: string
      classroomName: string
      homeroomTeacherId: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["classroom"]>
    composites: {}
  }

  type ClassroomGetPayload<S extends boolean | null | undefined | ClassroomDefaultArgs> = $Result.GetResult<Prisma.$ClassroomPayload, S>

  type ClassroomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClassroomFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClassroomCountAggregateInputType | true
    }

  export interface ClassroomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Classroom'], meta: { name: 'Classroom' } }
    /**
     * Find zero or one Classroom that matches the filter.
     * @param {ClassroomFindUniqueArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassroomFindUniqueArgs>(args: SelectSubset<T, ClassroomFindUniqueArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Classroom that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClassroomFindUniqueOrThrowArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassroomFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassroomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Classroom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindFirstArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassroomFindFirstArgs>(args?: SelectSubset<T, ClassroomFindFirstArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Classroom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindFirstOrThrowArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassroomFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassroomFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Classrooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classrooms
     * const classrooms = await prisma.classroom.findMany()
     * 
     * // Get first 10 Classrooms
     * const classrooms = await prisma.classroom.findMany({ take: 10 })
     * 
     * // Only select the `classroomId`
     * const classroomWithClassroomIdOnly = await prisma.classroom.findMany({ select: { classroomId: true } })
     * 
     */
    findMany<T extends ClassroomFindManyArgs>(args?: SelectSubset<T, ClassroomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Classroom.
     * @param {ClassroomCreateArgs} args - Arguments to create a Classroom.
     * @example
     * // Create one Classroom
     * const Classroom = await prisma.classroom.create({
     *   data: {
     *     // ... data to create a Classroom
     *   }
     * })
     * 
     */
    create<T extends ClassroomCreateArgs>(args: SelectSubset<T, ClassroomCreateArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Classrooms.
     * @param {ClassroomCreateManyArgs} args - Arguments to create many Classrooms.
     * @example
     * // Create many Classrooms
     * const classroom = await prisma.classroom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassroomCreateManyArgs>(args?: SelectSubset<T, ClassroomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Classrooms and returns the data saved in the database.
     * @param {ClassroomCreateManyAndReturnArgs} args - Arguments to create many Classrooms.
     * @example
     * // Create many Classrooms
     * const classroom = await prisma.classroom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Classrooms and only return the `classroomId`
     * const classroomWithClassroomIdOnly = await prisma.classroom.createManyAndReturn({ 
     *   select: { classroomId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassroomCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassroomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Classroom.
     * @param {ClassroomDeleteArgs} args - Arguments to delete one Classroom.
     * @example
     * // Delete one Classroom
     * const Classroom = await prisma.classroom.delete({
     *   where: {
     *     // ... filter to delete one Classroom
     *   }
     * })
     * 
     */
    delete<T extends ClassroomDeleteArgs>(args: SelectSubset<T, ClassroomDeleteArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Classroom.
     * @param {ClassroomUpdateArgs} args - Arguments to update one Classroom.
     * @example
     * // Update one Classroom
     * const classroom = await prisma.classroom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassroomUpdateArgs>(args: SelectSubset<T, ClassroomUpdateArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Classrooms.
     * @param {ClassroomDeleteManyArgs} args - Arguments to filter Classrooms to delete.
     * @example
     * // Delete a few Classrooms
     * const { count } = await prisma.classroom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassroomDeleteManyArgs>(args?: SelectSubset<T, ClassroomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classrooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classrooms
     * const classroom = await prisma.classroom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassroomUpdateManyArgs>(args: SelectSubset<T, ClassroomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Classroom.
     * @param {ClassroomUpsertArgs} args - Arguments to update or create a Classroom.
     * @example
     * // Update or create a Classroom
     * const classroom = await prisma.classroom.upsert({
     *   create: {
     *     // ... data to create a Classroom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Classroom we want to update
     *   }
     * })
     */
    upsert<T extends ClassroomUpsertArgs>(args: SelectSubset<T, ClassroomUpsertArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Classrooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomCountArgs} args - Arguments to filter Classrooms to count.
     * @example
     * // Count the number of Classrooms
     * const count = await prisma.classroom.count({
     *   where: {
     *     // ... the filter for the Classrooms we want to count
     *   }
     * })
    **/
    count<T extends ClassroomCountArgs>(
      args?: Subset<T, ClassroomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassroomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Classroom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClassroomAggregateArgs>(args: Subset<T, ClassroomAggregateArgs>): Prisma.PrismaPromise<GetClassroomAggregateType<T>>

    /**
     * Group by Classroom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomGroupByArgs} args - Group by arguments.
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
      T extends ClassroomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassroomGroupByArgs['orderBy'] }
        : { orderBy?: ClassroomGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClassroomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassroomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Classroom model
   */
  readonly fields: ClassroomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Classroom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassroomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Classroom model
   */ 
  interface ClassroomFieldRefs {
    readonly classroomId: FieldRef<"Classroom", 'String'>
    readonly schoolId: FieldRef<"Classroom", 'String'>
    readonly academicPeriodId: FieldRef<"Classroom", 'String'>
    readonly gradeLevel: FieldRef<"Classroom", 'String'>
    readonly classroomName: FieldRef<"Classroom", 'String'>
    readonly homeroomTeacherId: FieldRef<"Classroom", 'String'>
    readonly status: FieldRef<"Classroom", 'String'>
    readonly createdAt: FieldRef<"Classroom", 'DateTime'>
    readonly updatedAt: FieldRef<"Classroom", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Classroom findUnique
   */
  export type ClassroomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom findUniqueOrThrow
   */
  export type ClassroomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom findFirst
   */
  export type ClassroomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classrooms.
     */
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom findFirstOrThrow
   */
  export type ClassroomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classrooms.
     */
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom findMany
   */
  export type ClassroomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Filter, which Classrooms to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom create
   */
  export type ClassroomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * The data needed to create a Classroom.
     */
    data: XOR<ClassroomCreateInput, ClassroomUncheckedCreateInput>
  }

  /**
   * Classroom createMany
   */
  export type ClassroomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classrooms.
     */
    data: ClassroomCreateManyInput | ClassroomCreateManyInput[]
  }

  /**
   * Classroom createManyAndReturn
   */
  export type ClassroomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Classrooms.
     */
    data: ClassroomCreateManyInput | ClassroomCreateManyInput[]
  }

  /**
   * Classroom update
   */
  export type ClassroomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * The data needed to update a Classroom.
     */
    data: XOR<ClassroomUpdateInput, ClassroomUncheckedUpdateInput>
    /**
     * Choose, which Classroom to update.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom updateMany
   */
  export type ClassroomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classrooms.
     */
    data: XOR<ClassroomUpdateManyMutationInput, ClassroomUncheckedUpdateManyInput>
    /**
     * Filter which Classrooms to update
     */
    where?: ClassroomWhereInput
  }

  /**
   * Classroom upsert
   */
  export type ClassroomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * The filter to search for the Classroom to update in case it exists.
     */
    where: ClassroomWhereUniqueInput
    /**
     * In case the Classroom found by the `where` argument doesn't exist, create a new Classroom with this data.
     */
    create: XOR<ClassroomCreateInput, ClassroomUncheckedCreateInput>
    /**
     * In case the Classroom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassroomUpdateInput, ClassroomUncheckedUpdateInput>
  }

  /**
   * Classroom delete
   */
  export type ClassroomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Filter which Classroom to delete.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom deleteMany
   */
  export type ClassroomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classrooms to delete
     */
    where?: ClassroomWhereInput
  }

  /**
   * Classroom without action
   */
  export type ClassroomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
  }


  /**
   * Model AcademicPeriod
   */

  export type AggregateAcademicPeriod = {
    _count: AcademicPeriodCountAggregateOutputType | null
    _min: AcademicPeriodMinAggregateOutputType | null
    _max: AcademicPeriodMaxAggregateOutputType | null
  }

  export type AcademicPeriodMinAggregateOutputType = {
    academicPeriodId: string | null
    schoolId: string | null
    yearLabel: string | null
    semesterLabel: string | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcademicPeriodMaxAggregateOutputType = {
    academicPeriodId: string | null
    schoolId: string | null
    yearLabel: string | null
    semesterLabel: string | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcademicPeriodCountAggregateOutputType = {
    academicPeriodId: number
    schoolId: number
    yearLabel: number
    semesterLabel: number
    startDate: number
    endDate: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AcademicPeriodMinAggregateInputType = {
    academicPeriodId?: true
    schoolId?: true
    yearLabel?: true
    semesterLabel?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcademicPeriodMaxAggregateInputType = {
    academicPeriodId?: true
    schoolId?: true
    yearLabel?: true
    semesterLabel?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcademicPeriodCountAggregateInputType = {
    academicPeriodId?: true
    schoolId?: true
    yearLabel?: true
    semesterLabel?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AcademicPeriodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicPeriod to aggregate.
     */
    where?: AcademicPeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicPeriods to fetch.
     */
    orderBy?: AcademicPeriodOrderByWithRelationInput | AcademicPeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcademicPeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicPeriods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicPeriods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcademicPeriods
    **/
    _count?: true | AcademicPeriodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcademicPeriodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcademicPeriodMaxAggregateInputType
  }

  export type GetAcademicPeriodAggregateType<T extends AcademicPeriodAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademicPeriod]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademicPeriod[P]>
      : GetScalarType<T[P], AggregateAcademicPeriod[P]>
  }




  export type AcademicPeriodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicPeriodWhereInput
    orderBy?: AcademicPeriodOrderByWithAggregationInput | AcademicPeriodOrderByWithAggregationInput[]
    by: AcademicPeriodScalarFieldEnum[] | AcademicPeriodScalarFieldEnum
    having?: AcademicPeriodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcademicPeriodCountAggregateInputType | true
    _min?: AcademicPeriodMinAggregateInputType
    _max?: AcademicPeriodMaxAggregateInputType
  }

  export type AcademicPeriodGroupByOutputType = {
    academicPeriodId: string
    schoolId: string
    yearLabel: string
    semesterLabel: string
    startDate: Date
    endDate: Date
    status: string
    createdAt: Date
    updatedAt: Date
    _count: AcademicPeriodCountAggregateOutputType | null
    _min: AcademicPeriodMinAggregateOutputType | null
    _max: AcademicPeriodMaxAggregateOutputType | null
  }

  type GetAcademicPeriodGroupByPayload<T extends AcademicPeriodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcademicPeriodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcademicPeriodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcademicPeriodGroupByOutputType[P]>
            : GetScalarType<T[P], AcademicPeriodGroupByOutputType[P]>
        }
      >
    >


  export type AcademicPeriodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    academicPeriodId?: boolean
    schoolId?: boolean
    yearLabel?: boolean
    semesterLabel?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["academicPeriod"]>

  export type AcademicPeriodSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    academicPeriodId?: boolean
    schoolId?: boolean
    yearLabel?: boolean
    semesterLabel?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["academicPeriod"]>

  export type AcademicPeriodSelectScalar = {
    academicPeriodId?: boolean
    schoolId?: boolean
    yearLabel?: boolean
    semesterLabel?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $AcademicPeriodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcademicPeriod"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      academicPeriodId: string
      schoolId: string
      yearLabel: string
      semesterLabel: string
      startDate: Date
      endDate: Date
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["academicPeriod"]>
    composites: {}
  }

  type AcademicPeriodGetPayload<S extends boolean | null | undefined | AcademicPeriodDefaultArgs> = $Result.GetResult<Prisma.$AcademicPeriodPayload, S>

  type AcademicPeriodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AcademicPeriodFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AcademicPeriodCountAggregateInputType | true
    }

  export interface AcademicPeriodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcademicPeriod'], meta: { name: 'AcademicPeriod' } }
    /**
     * Find zero or one AcademicPeriod that matches the filter.
     * @param {AcademicPeriodFindUniqueArgs} args - Arguments to find a AcademicPeriod
     * @example
     * // Get one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcademicPeriodFindUniqueArgs>(args: SelectSubset<T, AcademicPeriodFindUniqueArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AcademicPeriod that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AcademicPeriodFindUniqueOrThrowArgs} args - Arguments to find a AcademicPeriod
     * @example
     * // Get one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcademicPeriodFindUniqueOrThrowArgs>(args: SelectSubset<T, AcademicPeriodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AcademicPeriod that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodFindFirstArgs} args - Arguments to find a AcademicPeriod
     * @example
     * // Get one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcademicPeriodFindFirstArgs>(args?: SelectSubset<T, AcademicPeriodFindFirstArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AcademicPeriod that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodFindFirstOrThrowArgs} args - Arguments to find a AcademicPeriod
     * @example
     * // Get one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcademicPeriodFindFirstOrThrowArgs>(args?: SelectSubset<T, AcademicPeriodFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AcademicPeriods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcademicPeriods
     * const academicPeriods = await prisma.academicPeriod.findMany()
     * 
     * // Get first 10 AcademicPeriods
     * const academicPeriods = await prisma.academicPeriod.findMany({ take: 10 })
     * 
     * // Only select the `academicPeriodId`
     * const academicPeriodWithAcademicPeriodIdOnly = await prisma.academicPeriod.findMany({ select: { academicPeriodId: true } })
     * 
     */
    findMany<T extends AcademicPeriodFindManyArgs>(args?: SelectSubset<T, AcademicPeriodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AcademicPeriod.
     * @param {AcademicPeriodCreateArgs} args - Arguments to create a AcademicPeriod.
     * @example
     * // Create one AcademicPeriod
     * const AcademicPeriod = await prisma.academicPeriod.create({
     *   data: {
     *     // ... data to create a AcademicPeriod
     *   }
     * })
     * 
     */
    create<T extends AcademicPeriodCreateArgs>(args: SelectSubset<T, AcademicPeriodCreateArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AcademicPeriods.
     * @param {AcademicPeriodCreateManyArgs} args - Arguments to create many AcademicPeriods.
     * @example
     * // Create many AcademicPeriods
     * const academicPeriod = await prisma.academicPeriod.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcademicPeriodCreateManyArgs>(args?: SelectSubset<T, AcademicPeriodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AcademicPeriods and returns the data saved in the database.
     * @param {AcademicPeriodCreateManyAndReturnArgs} args - Arguments to create many AcademicPeriods.
     * @example
     * // Create many AcademicPeriods
     * const academicPeriod = await prisma.academicPeriod.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AcademicPeriods and only return the `academicPeriodId`
     * const academicPeriodWithAcademicPeriodIdOnly = await prisma.academicPeriod.createManyAndReturn({ 
     *   select: { academicPeriodId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AcademicPeriodCreateManyAndReturnArgs>(args?: SelectSubset<T, AcademicPeriodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AcademicPeriod.
     * @param {AcademicPeriodDeleteArgs} args - Arguments to delete one AcademicPeriod.
     * @example
     * // Delete one AcademicPeriod
     * const AcademicPeriod = await prisma.academicPeriod.delete({
     *   where: {
     *     // ... filter to delete one AcademicPeriod
     *   }
     * })
     * 
     */
    delete<T extends AcademicPeriodDeleteArgs>(args: SelectSubset<T, AcademicPeriodDeleteArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AcademicPeriod.
     * @param {AcademicPeriodUpdateArgs} args - Arguments to update one AcademicPeriod.
     * @example
     * // Update one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcademicPeriodUpdateArgs>(args: SelectSubset<T, AcademicPeriodUpdateArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AcademicPeriods.
     * @param {AcademicPeriodDeleteManyArgs} args - Arguments to filter AcademicPeriods to delete.
     * @example
     * // Delete a few AcademicPeriods
     * const { count } = await prisma.academicPeriod.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcademicPeriodDeleteManyArgs>(args?: SelectSubset<T, AcademicPeriodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicPeriods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcademicPeriods
     * const academicPeriod = await prisma.academicPeriod.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcademicPeriodUpdateManyArgs>(args: SelectSubset<T, AcademicPeriodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AcademicPeriod.
     * @param {AcademicPeriodUpsertArgs} args - Arguments to update or create a AcademicPeriod.
     * @example
     * // Update or create a AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.upsert({
     *   create: {
     *     // ... data to create a AcademicPeriod
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcademicPeriod we want to update
     *   }
     * })
     */
    upsert<T extends AcademicPeriodUpsertArgs>(args: SelectSubset<T, AcademicPeriodUpsertArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AcademicPeriods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodCountArgs} args - Arguments to filter AcademicPeriods to count.
     * @example
     * // Count the number of AcademicPeriods
     * const count = await prisma.academicPeriod.count({
     *   where: {
     *     // ... the filter for the AcademicPeriods we want to count
     *   }
     * })
    **/
    count<T extends AcademicPeriodCountArgs>(
      args?: Subset<T, AcademicPeriodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcademicPeriodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcademicPeriod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AcademicPeriodAggregateArgs>(args: Subset<T, AcademicPeriodAggregateArgs>): Prisma.PrismaPromise<GetAcademicPeriodAggregateType<T>>

    /**
     * Group by AcademicPeriod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodGroupByArgs} args - Group by arguments.
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
      T extends AcademicPeriodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcademicPeriodGroupByArgs['orderBy'] }
        : { orderBy?: AcademicPeriodGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AcademicPeriodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademicPeriodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcademicPeriod model
   */
  readonly fields: AcademicPeriodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcademicPeriod.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcademicPeriodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AcademicPeriod model
   */ 
  interface AcademicPeriodFieldRefs {
    readonly academicPeriodId: FieldRef<"AcademicPeriod", 'String'>
    readonly schoolId: FieldRef<"AcademicPeriod", 'String'>
    readonly yearLabel: FieldRef<"AcademicPeriod", 'String'>
    readonly semesterLabel: FieldRef<"AcademicPeriod", 'String'>
    readonly startDate: FieldRef<"AcademicPeriod", 'DateTime'>
    readonly endDate: FieldRef<"AcademicPeriod", 'DateTime'>
    readonly status: FieldRef<"AcademicPeriod", 'String'>
    readonly createdAt: FieldRef<"AcademicPeriod", 'DateTime'>
    readonly updatedAt: FieldRef<"AcademicPeriod", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AcademicPeriod findUnique
   */
  export type AcademicPeriodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Filter, which AcademicPeriod to fetch.
     */
    where: AcademicPeriodWhereUniqueInput
  }

  /**
   * AcademicPeriod findUniqueOrThrow
   */
  export type AcademicPeriodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Filter, which AcademicPeriod to fetch.
     */
    where: AcademicPeriodWhereUniqueInput
  }

  /**
   * AcademicPeriod findFirst
   */
  export type AcademicPeriodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Filter, which AcademicPeriod to fetch.
     */
    where?: AcademicPeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicPeriods to fetch.
     */
    orderBy?: AcademicPeriodOrderByWithRelationInput | AcademicPeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicPeriods.
     */
    cursor?: AcademicPeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicPeriods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicPeriods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicPeriods.
     */
    distinct?: AcademicPeriodScalarFieldEnum | AcademicPeriodScalarFieldEnum[]
  }

  /**
   * AcademicPeriod findFirstOrThrow
   */
  export type AcademicPeriodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Filter, which AcademicPeriod to fetch.
     */
    where?: AcademicPeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicPeriods to fetch.
     */
    orderBy?: AcademicPeriodOrderByWithRelationInput | AcademicPeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicPeriods.
     */
    cursor?: AcademicPeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicPeriods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicPeriods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicPeriods.
     */
    distinct?: AcademicPeriodScalarFieldEnum | AcademicPeriodScalarFieldEnum[]
  }

  /**
   * AcademicPeriod findMany
   */
  export type AcademicPeriodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Filter, which AcademicPeriods to fetch.
     */
    where?: AcademicPeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicPeriods to fetch.
     */
    orderBy?: AcademicPeriodOrderByWithRelationInput | AcademicPeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcademicPeriods.
     */
    cursor?: AcademicPeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicPeriods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicPeriods.
     */
    skip?: number
    distinct?: AcademicPeriodScalarFieldEnum | AcademicPeriodScalarFieldEnum[]
  }

  /**
   * AcademicPeriod create
   */
  export type AcademicPeriodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * The data needed to create a AcademicPeriod.
     */
    data: XOR<AcademicPeriodCreateInput, AcademicPeriodUncheckedCreateInput>
  }

  /**
   * AcademicPeriod createMany
   */
  export type AcademicPeriodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcademicPeriods.
     */
    data: AcademicPeriodCreateManyInput | AcademicPeriodCreateManyInput[]
  }

  /**
   * AcademicPeriod createManyAndReturn
   */
  export type AcademicPeriodCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AcademicPeriods.
     */
    data: AcademicPeriodCreateManyInput | AcademicPeriodCreateManyInput[]
  }

  /**
   * AcademicPeriod update
   */
  export type AcademicPeriodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * The data needed to update a AcademicPeriod.
     */
    data: XOR<AcademicPeriodUpdateInput, AcademicPeriodUncheckedUpdateInput>
    /**
     * Choose, which AcademicPeriod to update.
     */
    where: AcademicPeriodWhereUniqueInput
  }

  /**
   * AcademicPeriod updateMany
   */
  export type AcademicPeriodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcademicPeriods.
     */
    data: XOR<AcademicPeriodUpdateManyMutationInput, AcademicPeriodUncheckedUpdateManyInput>
    /**
     * Filter which AcademicPeriods to update
     */
    where?: AcademicPeriodWhereInput
  }

  /**
   * AcademicPeriod upsert
   */
  export type AcademicPeriodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * The filter to search for the AcademicPeriod to update in case it exists.
     */
    where: AcademicPeriodWhereUniqueInput
    /**
     * In case the AcademicPeriod found by the `where` argument doesn't exist, create a new AcademicPeriod with this data.
     */
    create: XOR<AcademicPeriodCreateInput, AcademicPeriodUncheckedCreateInput>
    /**
     * In case the AcademicPeriod was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcademicPeriodUpdateInput, AcademicPeriodUncheckedUpdateInput>
  }

  /**
   * AcademicPeriod delete
   */
  export type AcademicPeriodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Filter which AcademicPeriod to delete.
     */
    where: AcademicPeriodWhereUniqueInput
  }

  /**
   * AcademicPeriod deleteMany
   */
  export type AcademicPeriodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicPeriods to delete
     */
    where?: AcademicPeriodWhereInput
  }

  /**
   * AcademicPeriod without action
   */
  export type AcademicPeriodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StudentScalarFieldEnum: {
    studentId: 'studentId',
    schoolId: 'schoolId',
    studentNumber: 'studentNumber',
    fullName: 'fullName',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const TeacherScalarFieldEnum: {
    teacherId: 'teacherId',
    schoolId: 'schoolId',
    employeeNumber: 'employeeNumber',
    fullName: 'fullName',
    subjectLabels: 'subjectLabels',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeacherScalarFieldEnum = (typeof TeacherScalarFieldEnum)[keyof typeof TeacherScalarFieldEnum]


  export const StaffScalarFieldEnum: {
    staffId: 'staffId',
    schoolId: 'schoolId',
    employeeNumber: 'employeeNumber',
    fullName: 'fullName',
    positionTitle: 'positionTitle',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StaffScalarFieldEnum = (typeof StaffScalarFieldEnum)[keyof typeof StaffScalarFieldEnum]


  export const PrincipalScalarFieldEnum: {
    principalId: 'principalId',
    schoolId: 'schoolId',
    appointmentCode: 'appointmentCode',
    fullName: 'fullName',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PrincipalScalarFieldEnum = (typeof PrincipalScalarFieldEnum)[keyof typeof PrincipalScalarFieldEnum]


  export const ClassroomScalarFieldEnum: {
    classroomId: 'classroomId',
    schoolId: 'schoolId',
    academicPeriodId: 'academicPeriodId',
    gradeLevel: 'gradeLevel',
    classroomName: 'classroomName',
    homeroomTeacherId: 'homeroomTeacherId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClassroomScalarFieldEnum = (typeof ClassroomScalarFieldEnum)[keyof typeof ClassroomScalarFieldEnum]


  export const AcademicPeriodScalarFieldEnum: {
    academicPeriodId: 'academicPeriodId',
    schoolId: 'schoolId',
    yearLabel: 'yearLabel',
    semesterLabel: 'semesterLabel',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AcademicPeriodScalarFieldEnum = (typeof AcademicPeriodScalarFieldEnum)[keyof typeof AcademicPeriodScalarFieldEnum]


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


  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    studentId?: StringFilter<"Student"> | string
    schoolId?: StringFilter<"Student"> | string
    studentNumber?: StringFilter<"Student"> | string
    fullName?: StringFilter<"Student"> | string
    status?: StringFilter<"Student"> | string
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
  }

  export type StudentOrderByWithRelationInput = {
    studentId?: SortOrder
    schoolId?: SortOrder
    studentNumber?: SortOrder
    fullName?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    studentId?: string
    schoolId_studentNumber?: StudentSchoolIdStudentNumberCompoundUniqueInput
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    schoolId?: StringFilter<"Student"> | string
    studentNumber?: StringFilter<"Student"> | string
    fullName?: StringFilter<"Student"> | string
    status?: StringFilter<"Student"> | string
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
  }, "studentId" | "schoolId_studentNumber">

  export type StudentOrderByWithAggregationInput = {
    studentId?: SortOrder
    schoolId?: SortOrder
    studentNumber?: SortOrder
    fullName?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    studentId?: StringWithAggregatesFilter<"Student"> | string
    schoolId?: StringWithAggregatesFilter<"Student"> | string
    studentNumber?: StringWithAggregatesFilter<"Student"> | string
    fullName?: StringWithAggregatesFilter<"Student"> | string
    status?: StringWithAggregatesFilter<"Student"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
  }

  export type TeacherWhereInput = {
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    teacherId?: StringFilter<"Teacher"> | string
    schoolId?: StringFilter<"Teacher"> | string
    employeeNumber?: StringFilter<"Teacher"> | string
    fullName?: StringFilter<"Teacher"> | string
    subjectLabels?: StringFilter<"Teacher"> | string
    status?: StringFilter<"Teacher"> | string
    createdAt?: DateTimeFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeFilter<"Teacher"> | Date | string
  }

  export type TeacherOrderByWithRelationInput = {
    teacherId?: SortOrder
    schoolId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    subjectLabels?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeacherWhereUniqueInput = Prisma.AtLeast<{
    teacherId?: string
    schoolId_employeeNumber?: TeacherSchoolIdEmployeeNumberCompoundUniqueInput
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    schoolId?: StringFilter<"Teacher"> | string
    employeeNumber?: StringFilter<"Teacher"> | string
    fullName?: StringFilter<"Teacher"> | string
    subjectLabels?: StringFilter<"Teacher"> | string
    status?: StringFilter<"Teacher"> | string
    createdAt?: DateTimeFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeFilter<"Teacher"> | Date | string
  }, "teacherId" | "schoolId_employeeNumber">

  export type TeacherOrderByWithAggregationInput = {
    teacherId?: SortOrder
    schoolId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    subjectLabels?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeacherCountOrderByAggregateInput
    _max?: TeacherMaxOrderByAggregateInput
    _min?: TeacherMinOrderByAggregateInput
  }

  export type TeacherScalarWhereWithAggregatesInput = {
    AND?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    OR?: TeacherScalarWhereWithAggregatesInput[]
    NOT?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    teacherId?: StringWithAggregatesFilter<"Teacher"> | string
    schoolId?: StringWithAggregatesFilter<"Teacher"> | string
    employeeNumber?: StringWithAggregatesFilter<"Teacher"> | string
    fullName?: StringWithAggregatesFilter<"Teacher"> | string
    subjectLabels?: StringWithAggregatesFilter<"Teacher"> | string
    status?: StringWithAggregatesFilter<"Teacher"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Teacher"> | Date | string
  }

  export type StaffWhereInput = {
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    staffId?: StringFilter<"Staff"> | string
    schoolId?: StringFilter<"Staff"> | string
    employeeNumber?: StringFilter<"Staff"> | string
    fullName?: StringFilter<"Staff"> | string
    positionTitle?: StringFilter<"Staff"> | string
    status?: StringFilter<"Staff"> | string
    createdAt?: DateTimeFilter<"Staff"> | Date | string
    updatedAt?: DateTimeFilter<"Staff"> | Date | string
  }

  export type StaffOrderByWithRelationInput = {
    staffId?: SortOrder
    schoolId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    positionTitle?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffWhereUniqueInput = Prisma.AtLeast<{
    staffId?: string
    schoolId_employeeNumber?: StaffSchoolIdEmployeeNumberCompoundUniqueInput
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    schoolId?: StringFilter<"Staff"> | string
    employeeNumber?: StringFilter<"Staff"> | string
    fullName?: StringFilter<"Staff"> | string
    positionTitle?: StringFilter<"Staff"> | string
    status?: StringFilter<"Staff"> | string
    createdAt?: DateTimeFilter<"Staff"> | Date | string
    updatedAt?: DateTimeFilter<"Staff"> | Date | string
  }, "staffId" | "schoolId_employeeNumber">

  export type StaffOrderByWithAggregationInput = {
    staffId?: SortOrder
    schoolId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    positionTitle?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StaffCountOrderByAggregateInput
    _max?: StaffMaxOrderByAggregateInput
    _min?: StaffMinOrderByAggregateInput
  }

  export type StaffScalarWhereWithAggregatesInput = {
    AND?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    OR?: StaffScalarWhereWithAggregatesInput[]
    NOT?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    staffId?: StringWithAggregatesFilter<"Staff"> | string
    schoolId?: StringWithAggregatesFilter<"Staff"> | string
    employeeNumber?: StringWithAggregatesFilter<"Staff"> | string
    fullName?: StringWithAggregatesFilter<"Staff"> | string
    positionTitle?: StringWithAggregatesFilter<"Staff"> | string
    status?: StringWithAggregatesFilter<"Staff"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Staff"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Staff"> | Date | string
  }

  export type PrincipalWhereInput = {
    AND?: PrincipalWhereInput | PrincipalWhereInput[]
    OR?: PrincipalWhereInput[]
    NOT?: PrincipalWhereInput | PrincipalWhereInput[]
    principalId?: StringFilter<"Principal"> | string
    schoolId?: StringFilter<"Principal"> | string
    appointmentCode?: StringNullableFilter<"Principal"> | string | null
    fullName?: StringFilter<"Principal"> | string
    status?: StringFilter<"Principal"> | string
    createdAt?: DateTimeFilter<"Principal"> | Date | string
    updatedAt?: DateTimeFilter<"Principal"> | Date | string
  }

  export type PrincipalOrderByWithRelationInput = {
    principalId?: SortOrder
    schoolId?: SortOrder
    appointmentCode?: SortOrderInput | SortOrder
    fullName?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrincipalWhereUniqueInput = Prisma.AtLeast<{
    principalId?: string
    AND?: PrincipalWhereInput | PrincipalWhereInput[]
    OR?: PrincipalWhereInput[]
    NOT?: PrincipalWhereInput | PrincipalWhereInput[]
    schoolId?: StringFilter<"Principal"> | string
    appointmentCode?: StringNullableFilter<"Principal"> | string | null
    fullName?: StringFilter<"Principal"> | string
    status?: StringFilter<"Principal"> | string
    createdAt?: DateTimeFilter<"Principal"> | Date | string
    updatedAt?: DateTimeFilter<"Principal"> | Date | string
  }, "principalId">

  export type PrincipalOrderByWithAggregationInput = {
    principalId?: SortOrder
    schoolId?: SortOrder
    appointmentCode?: SortOrderInput | SortOrder
    fullName?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PrincipalCountOrderByAggregateInput
    _max?: PrincipalMaxOrderByAggregateInput
    _min?: PrincipalMinOrderByAggregateInput
  }

  export type PrincipalScalarWhereWithAggregatesInput = {
    AND?: PrincipalScalarWhereWithAggregatesInput | PrincipalScalarWhereWithAggregatesInput[]
    OR?: PrincipalScalarWhereWithAggregatesInput[]
    NOT?: PrincipalScalarWhereWithAggregatesInput | PrincipalScalarWhereWithAggregatesInput[]
    principalId?: StringWithAggregatesFilter<"Principal"> | string
    schoolId?: StringWithAggregatesFilter<"Principal"> | string
    appointmentCode?: StringNullableWithAggregatesFilter<"Principal"> | string | null
    fullName?: StringWithAggregatesFilter<"Principal"> | string
    status?: StringWithAggregatesFilter<"Principal"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Principal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Principal"> | Date | string
  }

  export type ClassroomWhereInput = {
    AND?: ClassroomWhereInput | ClassroomWhereInput[]
    OR?: ClassroomWhereInput[]
    NOT?: ClassroomWhereInput | ClassroomWhereInput[]
    classroomId?: StringFilter<"Classroom"> | string
    schoolId?: StringFilter<"Classroom"> | string
    academicPeriodId?: StringFilter<"Classroom"> | string
    gradeLevel?: StringFilter<"Classroom"> | string
    classroomName?: StringFilter<"Classroom"> | string
    homeroomTeacherId?: StringNullableFilter<"Classroom"> | string | null
    status?: StringFilter<"Classroom"> | string
    createdAt?: DateTimeFilter<"Classroom"> | Date | string
    updatedAt?: DateTimeFilter<"Classroom"> | Date | string
  }

  export type ClassroomOrderByWithRelationInput = {
    classroomId?: SortOrder
    schoolId?: SortOrder
    academicPeriodId?: SortOrder
    gradeLevel?: SortOrder
    classroomName?: SortOrder
    homeroomTeacherId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassroomWhereUniqueInput = Prisma.AtLeast<{
    classroomId?: string
    schoolId_academicPeriodId_classroomName?: ClassroomSchoolIdAcademicPeriodIdClassroomNameCompoundUniqueInput
    AND?: ClassroomWhereInput | ClassroomWhereInput[]
    OR?: ClassroomWhereInput[]
    NOT?: ClassroomWhereInput | ClassroomWhereInput[]
    schoolId?: StringFilter<"Classroom"> | string
    academicPeriodId?: StringFilter<"Classroom"> | string
    gradeLevel?: StringFilter<"Classroom"> | string
    classroomName?: StringFilter<"Classroom"> | string
    homeroomTeacherId?: StringNullableFilter<"Classroom"> | string | null
    status?: StringFilter<"Classroom"> | string
    createdAt?: DateTimeFilter<"Classroom"> | Date | string
    updatedAt?: DateTimeFilter<"Classroom"> | Date | string
  }, "classroomId" | "schoolId_academicPeriodId_classroomName">

  export type ClassroomOrderByWithAggregationInput = {
    classroomId?: SortOrder
    schoolId?: SortOrder
    academicPeriodId?: SortOrder
    gradeLevel?: SortOrder
    classroomName?: SortOrder
    homeroomTeacherId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClassroomCountOrderByAggregateInput
    _max?: ClassroomMaxOrderByAggregateInput
    _min?: ClassroomMinOrderByAggregateInput
  }

  export type ClassroomScalarWhereWithAggregatesInput = {
    AND?: ClassroomScalarWhereWithAggregatesInput | ClassroomScalarWhereWithAggregatesInput[]
    OR?: ClassroomScalarWhereWithAggregatesInput[]
    NOT?: ClassroomScalarWhereWithAggregatesInput | ClassroomScalarWhereWithAggregatesInput[]
    classroomId?: StringWithAggregatesFilter<"Classroom"> | string
    schoolId?: StringWithAggregatesFilter<"Classroom"> | string
    academicPeriodId?: StringWithAggregatesFilter<"Classroom"> | string
    gradeLevel?: StringWithAggregatesFilter<"Classroom"> | string
    classroomName?: StringWithAggregatesFilter<"Classroom"> | string
    homeroomTeacherId?: StringNullableWithAggregatesFilter<"Classroom"> | string | null
    status?: StringWithAggregatesFilter<"Classroom"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Classroom"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Classroom"> | Date | string
  }

  export type AcademicPeriodWhereInput = {
    AND?: AcademicPeriodWhereInput | AcademicPeriodWhereInput[]
    OR?: AcademicPeriodWhereInput[]
    NOT?: AcademicPeriodWhereInput | AcademicPeriodWhereInput[]
    academicPeriodId?: StringFilter<"AcademicPeriod"> | string
    schoolId?: StringFilter<"AcademicPeriod"> | string
    yearLabel?: StringFilter<"AcademicPeriod"> | string
    semesterLabel?: StringFilter<"AcademicPeriod"> | string
    startDate?: DateTimeFilter<"AcademicPeriod"> | Date | string
    endDate?: DateTimeFilter<"AcademicPeriod"> | Date | string
    status?: StringFilter<"AcademicPeriod"> | string
    createdAt?: DateTimeFilter<"AcademicPeriod"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicPeriod"> | Date | string
  }

  export type AcademicPeriodOrderByWithRelationInput = {
    academicPeriodId?: SortOrder
    schoolId?: SortOrder
    yearLabel?: SortOrder
    semesterLabel?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcademicPeriodWhereUniqueInput = Prisma.AtLeast<{
    academicPeriodId?: string
    schoolId_yearLabel_semesterLabel?: AcademicPeriodSchoolIdYearLabelSemesterLabelCompoundUniqueInput
    AND?: AcademicPeriodWhereInput | AcademicPeriodWhereInput[]
    OR?: AcademicPeriodWhereInput[]
    NOT?: AcademicPeriodWhereInput | AcademicPeriodWhereInput[]
    schoolId?: StringFilter<"AcademicPeriod"> | string
    yearLabel?: StringFilter<"AcademicPeriod"> | string
    semesterLabel?: StringFilter<"AcademicPeriod"> | string
    startDate?: DateTimeFilter<"AcademicPeriod"> | Date | string
    endDate?: DateTimeFilter<"AcademicPeriod"> | Date | string
    status?: StringFilter<"AcademicPeriod"> | string
    createdAt?: DateTimeFilter<"AcademicPeriod"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicPeriod"> | Date | string
  }, "academicPeriodId" | "schoolId_yearLabel_semesterLabel">

  export type AcademicPeriodOrderByWithAggregationInput = {
    academicPeriodId?: SortOrder
    schoolId?: SortOrder
    yearLabel?: SortOrder
    semesterLabel?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AcademicPeriodCountOrderByAggregateInput
    _max?: AcademicPeriodMaxOrderByAggregateInput
    _min?: AcademicPeriodMinOrderByAggregateInput
  }

  export type AcademicPeriodScalarWhereWithAggregatesInput = {
    AND?: AcademicPeriodScalarWhereWithAggregatesInput | AcademicPeriodScalarWhereWithAggregatesInput[]
    OR?: AcademicPeriodScalarWhereWithAggregatesInput[]
    NOT?: AcademicPeriodScalarWhereWithAggregatesInput | AcademicPeriodScalarWhereWithAggregatesInput[]
    academicPeriodId?: StringWithAggregatesFilter<"AcademicPeriod"> | string
    schoolId?: StringWithAggregatesFilter<"AcademicPeriod"> | string
    yearLabel?: StringWithAggregatesFilter<"AcademicPeriod"> | string
    semesterLabel?: StringWithAggregatesFilter<"AcademicPeriod"> | string
    startDate?: DateTimeWithAggregatesFilter<"AcademicPeriod"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"AcademicPeriod"> | Date | string
    status?: StringWithAggregatesFilter<"AcademicPeriod"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AcademicPeriod"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AcademicPeriod"> | Date | string
  }

  export type StudentCreateInput = {
    studentId: string
    schoolId: string
    studentNumber: string
    fullName: string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type StudentUncheckedCreateInput = {
    studentId: string
    schoolId: string
    studentNumber: string
    fullName: string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type StudentUpdateInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    studentNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    studentNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateManyInput = {
    studentId: string
    schoolId: string
    studentNumber: string
    fullName: string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type StudentUpdateManyMutationInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    studentNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateManyInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    studentNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherCreateInput = {
    teacherId: string
    schoolId: string
    employeeNumber: string
    fullName: string
    subjectLabels: string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type TeacherUncheckedCreateInput = {
    teacherId: string
    schoolId: string
    employeeNumber: string
    fullName: string
    subjectLabels: string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type TeacherUpdateInput = {
    teacherId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    subjectLabels?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherUncheckedUpdateInput = {
    teacherId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    subjectLabels?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherCreateManyInput = {
    teacherId: string
    schoolId: string
    employeeNumber: string
    fullName: string
    subjectLabels: string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type TeacherUpdateManyMutationInput = {
    teacherId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    subjectLabels?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherUncheckedUpdateManyInput = {
    teacherId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    subjectLabels?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffCreateInput = {
    staffId: string
    schoolId: string
    employeeNumber: string
    fullName: string
    positionTitle: string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type StaffUncheckedCreateInput = {
    staffId: string
    schoolId: string
    employeeNumber: string
    fullName: string
    positionTitle: string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type StaffUpdateInput = {
    staffId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    positionTitle?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUncheckedUpdateInput = {
    staffId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    positionTitle?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffCreateManyInput = {
    staffId: string
    schoolId: string
    employeeNumber: string
    fullName: string
    positionTitle: string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type StaffUpdateManyMutationInput = {
    staffId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    positionTitle?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUncheckedUpdateManyInput = {
    staffId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    employeeNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    positionTitle?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrincipalCreateInput = {
    principalId: string
    schoolId: string
    appointmentCode?: string | null
    fullName: string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type PrincipalUncheckedCreateInput = {
    principalId: string
    schoolId: string
    appointmentCode?: string | null
    fullName: string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type PrincipalUpdateInput = {
    principalId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    appointmentCode?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrincipalUncheckedUpdateInput = {
    principalId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    appointmentCode?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrincipalCreateManyInput = {
    principalId: string
    schoolId: string
    appointmentCode?: string | null
    fullName: string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type PrincipalUpdateManyMutationInput = {
    principalId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    appointmentCode?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrincipalUncheckedUpdateManyInput = {
    principalId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    appointmentCode?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassroomCreateInput = {
    classroomId: string
    schoolId: string
    academicPeriodId: string
    gradeLevel: string
    classroomName: string
    homeroomTeacherId?: string | null
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type ClassroomUncheckedCreateInput = {
    classroomId: string
    schoolId: string
    academicPeriodId: string
    gradeLevel: string
    classroomName: string
    homeroomTeacherId?: string | null
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type ClassroomUpdateInput = {
    classroomId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    academicPeriodId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: StringFieldUpdateOperationsInput | string
    classroomName?: StringFieldUpdateOperationsInput | string
    homeroomTeacherId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassroomUncheckedUpdateInput = {
    classroomId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    academicPeriodId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: StringFieldUpdateOperationsInput | string
    classroomName?: StringFieldUpdateOperationsInput | string
    homeroomTeacherId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassroomCreateManyInput = {
    classroomId: string
    schoolId: string
    academicPeriodId: string
    gradeLevel: string
    classroomName: string
    homeroomTeacherId?: string | null
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type ClassroomUpdateManyMutationInput = {
    classroomId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    academicPeriodId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: StringFieldUpdateOperationsInput | string
    classroomName?: StringFieldUpdateOperationsInput | string
    homeroomTeacherId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassroomUncheckedUpdateManyInput = {
    classroomId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    academicPeriodId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: StringFieldUpdateOperationsInput | string
    classroomName?: StringFieldUpdateOperationsInput | string
    homeroomTeacherId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicPeriodCreateInput = {
    academicPeriodId: string
    schoolId: string
    yearLabel: string
    semesterLabel: string
    startDate: Date | string
    endDate: Date | string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AcademicPeriodUncheckedCreateInput = {
    academicPeriodId: string
    schoolId: string
    yearLabel: string
    semesterLabel: string
    startDate: Date | string
    endDate: Date | string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AcademicPeriodUpdateInput = {
    academicPeriodId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    yearLabel?: StringFieldUpdateOperationsInput | string
    semesterLabel?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicPeriodUncheckedUpdateInput = {
    academicPeriodId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    yearLabel?: StringFieldUpdateOperationsInput | string
    semesterLabel?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicPeriodCreateManyInput = {
    academicPeriodId: string
    schoolId: string
    yearLabel: string
    semesterLabel: string
    startDate: Date | string
    endDate: Date | string
    status: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AcademicPeriodUpdateManyMutationInput = {
    academicPeriodId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    yearLabel?: StringFieldUpdateOperationsInput | string
    semesterLabel?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicPeriodUncheckedUpdateManyInput = {
    academicPeriodId?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    yearLabel?: StringFieldUpdateOperationsInput | string
    semesterLabel?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type StudentSchoolIdStudentNumberCompoundUniqueInput = {
    schoolId: string
    studentNumber: string
  }

  export type StudentCountOrderByAggregateInput = {
    studentId?: SortOrder
    schoolId?: SortOrder
    studentNumber?: SortOrder
    fullName?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    studentId?: SortOrder
    schoolId?: SortOrder
    studentNumber?: SortOrder
    fullName?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    studentId?: SortOrder
    schoolId?: SortOrder
    studentNumber?: SortOrder
    fullName?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type TeacherSchoolIdEmployeeNumberCompoundUniqueInput = {
    schoolId: string
    employeeNumber: string
  }

  export type TeacherCountOrderByAggregateInput = {
    teacherId?: SortOrder
    schoolId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    subjectLabels?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeacherMaxOrderByAggregateInput = {
    teacherId?: SortOrder
    schoolId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    subjectLabels?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeacherMinOrderByAggregateInput = {
    teacherId?: SortOrder
    schoolId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    subjectLabels?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffSchoolIdEmployeeNumberCompoundUniqueInput = {
    schoolId: string
    employeeNumber: string
  }

  export type StaffCountOrderByAggregateInput = {
    staffId?: SortOrder
    schoolId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    positionTitle?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffMaxOrderByAggregateInput = {
    staffId?: SortOrder
    schoolId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    positionTitle?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffMinOrderByAggregateInput = {
    staffId?: SortOrder
    schoolId?: SortOrder
    employeeNumber?: SortOrder
    fullName?: SortOrder
    positionTitle?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PrincipalCountOrderByAggregateInput = {
    principalId?: SortOrder
    schoolId?: SortOrder
    appointmentCode?: SortOrder
    fullName?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrincipalMaxOrderByAggregateInput = {
    principalId?: SortOrder
    schoolId?: SortOrder
    appointmentCode?: SortOrder
    fullName?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrincipalMinOrderByAggregateInput = {
    principalId?: SortOrder
    schoolId?: SortOrder
    appointmentCode?: SortOrder
    fullName?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
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

  export type ClassroomSchoolIdAcademicPeriodIdClassroomNameCompoundUniqueInput = {
    schoolId: string
    academicPeriodId: string
    classroomName: string
  }

  export type ClassroomCountOrderByAggregateInput = {
    classroomId?: SortOrder
    schoolId?: SortOrder
    academicPeriodId?: SortOrder
    gradeLevel?: SortOrder
    classroomName?: SortOrder
    homeroomTeacherId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassroomMaxOrderByAggregateInput = {
    classroomId?: SortOrder
    schoolId?: SortOrder
    academicPeriodId?: SortOrder
    gradeLevel?: SortOrder
    classroomName?: SortOrder
    homeroomTeacherId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassroomMinOrderByAggregateInput = {
    classroomId?: SortOrder
    schoolId?: SortOrder
    academicPeriodId?: SortOrder
    gradeLevel?: SortOrder
    classroomName?: SortOrder
    homeroomTeacherId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcademicPeriodSchoolIdYearLabelSemesterLabelCompoundUniqueInput = {
    schoolId: string
    yearLabel: string
    semesterLabel: string
  }

  export type AcademicPeriodCountOrderByAggregateInput = {
    academicPeriodId?: SortOrder
    schoolId?: SortOrder
    yearLabel?: SortOrder
    semesterLabel?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcademicPeriodMaxOrderByAggregateInput = {
    academicPeriodId?: SortOrder
    schoolId?: SortOrder
    yearLabel?: SortOrder
    semesterLabel?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcademicPeriodMinOrderByAggregateInput = {
    academicPeriodId?: SortOrder
    schoolId?: SortOrder
    yearLabel?: SortOrder
    semesterLabel?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
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



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use StudentDefaultArgs instead
     */
    export type StudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TeacherDefaultArgs instead
     */
    export type TeacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TeacherDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StaffDefaultArgs instead
     */
    export type StaffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StaffDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PrincipalDefaultArgs instead
     */
    export type PrincipalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PrincipalDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClassroomDefaultArgs instead
     */
    export type ClassroomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClassroomDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AcademicPeriodDefaultArgs instead
     */
    export type AcademicPeriodArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AcademicPeriodDefaultArgs<ExtArgs>

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