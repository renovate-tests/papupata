import { MakeRequestAdapter as MakeRequestAdapterImpl } from './config'
import { APIDeclaration as APIDeclarationImpl } from './APIDeclaration'

export type TypedRequest<RequestBaseType, Params, Query, Body> = Omit<RequestBaseType, 'params' | 'query' | 'body'> & {
  params: Params
  query: Query
  body: Body
}

export type MakeRequestAdapter<RequestOptions = void> = MakeRequestAdapterImpl<RequestOptions>

export const APIDeclaration = APIDeclarationImpl
