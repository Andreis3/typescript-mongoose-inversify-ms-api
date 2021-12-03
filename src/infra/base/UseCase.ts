import { injectable } from 'inversify';

@injectable()
export abstract class UseCase<Request, Response> {
    abstract execute(request: Request): Promise<Response>;
}
