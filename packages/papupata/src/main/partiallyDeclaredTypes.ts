import { DeclaredAPI } from './responderTypes'

export interface PartiallyDeclaredAPIAtEndpoint<RequestOptions, RequestType, RouteOptions> {
  params: <ParamsType extends readonly string[]>(
    params: ParamsType
  ) => PartiallyDeclaredAPIAtParams<ParamsType, RequestOptions, RequestType, RouteOptions>
  query: <QueryType extends readonly string[]>(
    query: QueryType
  ) => PartiallyDeclaredAPIAtQuery<readonly [], QueryType, RequestOptions, RequestType, RouteOptions>
  optionalQuery: <OptionalQueryType extends readonly string[]>(
    optionalQuery: OptionalQueryType
  ) => PartiallyDeclaredAPIAtOptionalQuery<
    readonly [],
    readonly [],
    OptionalQueryType,
    RequestOptions,
    RequestType,
    RouteOptions
  >
  queryBool: <BooleanQueryType extends readonly string[]>(
    boolQuery: BooleanQueryType
  ) => PartiallyDeclaredAPIAtBoolQuery<
    readonly [],
    readonly [],
    readonly [],
    BooleanQueryType,
    RequestOptions,
    RequestType,
    RouteOptions
  >
  body: <BodyType, BodyTypeOnServer = BodyType>() => PartiallyDeclaredAPIAtBody<
    readonly [],
    readonly [],
    readonly [],
    readonly [],
    BodyType,
    BodyTypeOnServer,
    RequestOptions,
    RequestType,
    RouteOptions
  >

  response: <ResponseType, ResponseTypeOnServer = ResponseType>(
    mapper?: (payload: ResponseTypeOnServer) => ResponseType | Promise<ResponseType>
  ) => DeclaredAPI<
    readonly [],
    readonly [],
    readonly [],
    readonly [],
    {},
    {},
    RequestOptions,
    RequestType,
    ResponseType,
    ResponseTypeOnServer,
    RouteOptions
  >
}

export interface PartiallyDeclaredAPIAtParams<
  ParamsType extends readonly string[],
  RequestOptions,
  RequestType,
  RouteOptions
> {
  query: <QueryType extends readonly string[]>(
    query: QueryType
  ) => PartiallyDeclaredAPIAtQuery<ParamsType, QueryType, RequestOptions, RequestType, RouteOptions>
  optionalQuery: <OptionalQueryType extends readonly string[]>(
    optionalQuery: OptionalQueryType
  ) => PartiallyDeclaredAPIAtOptionalQuery<
    ParamsType,
    readonly [],
    OptionalQueryType,
    RequestOptions,
    RequestType,
    RouteOptions
  >
  queryBool: <BooleanQueryType extends readonly string[]>(
    boolQuery: BooleanQueryType
  ) => PartiallyDeclaredAPIAtBoolQuery<
    ParamsType,
    readonly [],
    readonly [],
    BooleanQueryType,
    RequestOptions,
    RequestType,
    RouteOptions
  >
  body: <BodyType, BodyTypeOnServer = BodyType>() => PartiallyDeclaredAPIAtBody<
    ParamsType,
    readonly [],
    readonly [],
    readonly [],
    BodyType,
    BodyTypeOnServer,
    RequestOptions,
    RequestType,
    RouteOptions
  >

  response: <ResponseType, ResponseTypeOnServer = ResponseType>(
    mapper?: (payload: ResponseTypeOnServer) => ResponseType | Promise<ResponseType>
  ) => DeclaredAPI<
    ParamsType,
    readonly [],
    readonly [],
    readonly [],
    {},
    {},
    RequestOptions,
    RequestType,
    ResponseType,
    ResponseTypeOnServer,
    RouteOptions
  >
}

export interface PartiallyDeclaredAPIAtQuery<
  ParamsType extends readonly string[],
  QueryType extends readonly string[],
  RequestOptions,
  RequestType,
  RouteOptions
> {
  optionalQuery: <OptionalQueryType extends readonly string[]>(
    optionalQuery: OptionalQueryType
  ) => PartiallyDeclaredAPIAtOptionalQuery<
    ParamsType,
    QueryType,
    OptionalQueryType,
    RequestOptions,
    RequestType,
    RouteOptions
  >
  queryBool: <BooleanQueryType extends readonly string[]>(
    boolQuery: BooleanQueryType
  ) => PartiallyDeclaredAPIAtBoolQuery<
    ParamsType,
    QueryType,
    readonly [],
    BooleanQueryType,
    RequestOptions,
    RequestType,
    RouteOptions
  >
  body: <BodyType, BodyTypeOnServer = BodyType>() => PartiallyDeclaredAPIAtBody<
    ParamsType,
    QueryType,
    readonly [],
    readonly [],
    BodyType,
    BodyTypeOnServer,
    RequestOptions,
    RequestType,
    RouteOptions
  >

  response: <ResponseType, ResponseTypeOnServer = ResponseType>(
    mapper?: (payload: ResponseTypeOnServer) => ResponseType | Promise<ResponseType>
  ) => DeclaredAPI<
    ParamsType,
    QueryType,
    readonly [],
    readonly [],
    {},
    {},
    RequestOptions,
    RequestType,
    ResponseType,
    ResponseTypeOnServer,
    RouteOptions
  >
}

export interface PartiallyDeclaredAPIAtOptionalQuery<
  ParamsType extends readonly string[],
  QueryType extends readonly string[],
  OptionalQueryType extends readonly string[],
  RequestOptions,
  RequestType,
  RouteOptions
> {
  queryBool: <BooleanQueryType extends readonly string[]>(
    boolQuery: BooleanQueryType
  ) => PartiallyDeclaredAPIAtBoolQuery<
    ParamsType,
    QueryType,
    OptionalQueryType,
    BooleanQueryType,
    RequestOptions,
    RequestType,
    RouteOptions
  >
  body: <BodyType, BodyTypeOnServer = BodyType>() => PartiallyDeclaredAPIAtBody<
    ParamsType,
    QueryType,
    OptionalQueryType,
    readonly [],
    BodyType,
    BodyTypeOnServer,
    RequestOptions,
    RequestType,
    RouteOptions
  >
  response: <ResponseType, ResponseTypeOnServer = ResponseType>(
    mapper?: (payload: ResponseTypeOnServer) => ResponseType | Promise<ResponseType>
  ) => DeclaredAPI<
    ParamsType,
    QueryType,
    OptionalQueryType,
    readonly [],
    {},
    {},
    RequestOptions,
    RequestType,
    ResponseType,
    ResponseTypeOnServer,
    RouteOptions
  >
}

export interface PartiallyDeclaredAPIAtBoolQuery<
  ParamsType extends readonly string[],
  QueryType extends readonly string[],
  OptionalQueryType extends readonly string[],
  BoolQueryType extends readonly string[],
  RequestOptions,
  RequestType,
  RouteOptions
> {
  body: <BodyType, BodyTypeOnServer = BodyType>() => PartiallyDeclaredAPIAtBody<
    ParamsType,
    QueryType,
    OptionalQueryType,
    BoolQueryType,
    BodyType,
    BodyTypeOnServer,
    RequestOptions,
    RequestType,
    RouteOptions
  >

  response: <ResponseType, ResponseTypeOnServer = ResponseType>(
    mapper?: (payload: ResponseTypeOnServer) => ResponseType | Promise<ResponseType>
  ) => DeclaredAPI<
    ParamsType,
    QueryType,
    OptionalQueryType,
    BoolQueryType,
    {},
    {},
    RequestOptions,
    RequestType,
    ResponseType,
    ResponseTypeOnServer,
    RouteOptions
  >
}

export interface PartiallyDeclaredAPIAtBody<
  ParamsType extends readonly string[],
  QueryType extends readonly string[],
  OptionalQueryType extends readonly string[],
  BoolQueryType extends readonly string[],
  BodyType,
  BodyTypeOnServer,
  RequestOptions,
  RequestType,
  RouteOptions
> {
  response: <ResponseType, ResponseTypeOnServer = ResponseType>(
    mapper?: (payload: ResponseTypeOnServer) => ResponseType | Promise<ResponseType>
  ) => DeclaredAPI<
    ParamsType,
    QueryType,
    OptionalQueryType,
    BoolQueryType,
    BodyType,
    BodyTypeOnServer,
    RequestOptions,
    RequestType,
    ResponseType,
    ResponseTypeOnServer,
    RouteOptions
  >
}
