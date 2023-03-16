export interface UseCase<Request, Response> {
  execute(data: Request): Promise<Response>;
}
